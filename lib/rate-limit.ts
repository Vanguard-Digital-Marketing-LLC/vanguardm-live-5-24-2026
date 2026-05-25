import Redis from "ioredis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  try {
    redis = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      maxRetriesPerRequest: 1,
      lazyConnect: true,
    });
    redis.connect().catch(() => {
      redis = null;
    });
    return redis;
  } catch {
    return null;
  }
}

// ── In-memory fallback (used if Redis is unavailable) ──
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const memStore = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of memStore) {
    if (entry.resetAt <= now) memStore.delete(key);
  }
}, 5 * 60 * 1000);

function memRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = memStore.get(key);

  if (!entry || entry.resetAt <= now) {
    memStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetIn: windowMs };
  }

  entry.count++;
  const remaining = Math.max(0, limit - entry.count);
  const resetIn = entry.resetAt - now;

  return { allowed: entry.count <= limit, remaining, resetIn };
}

// ── Redis sliding window rate limiter ──

/**
 * Async Redis rate limiter — sliding window. Falls back to in-memory if
 * Redis is unavailable or unconfigured.
 */
export async function rateLimitAsync(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const client = getRedis();
  if (!client || client.status !== "ready") {
    return memRateLimit(key, limit, windowMs);
  }

  const now = Date.now();
  const windowStart = now - windowMs;
  const redisKey = `rl:${key}`;

  try {
    const pipeline = client.pipeline();
    // Remove expired entries
    pipeline.zremrangebyscore(redisKey, 0, windowStart);
    // Add current request
    pipeline.zadd(redisKey, now, `${now}:${Math.random().toString(36).slice(2, 8)}`);
    // Count requests in window
    pipeline.zcard(redisKey);
    // Set TTL
    pipeline.pexpire(redisKey, windowMs);

    const results = await pipeline.exec();
    const count = (results?.[2]?.[1] as number) || 0;
    const remaining = Math.max(0, limit - count);

    return {
      allowed: count <= limit,
      remaining,
      resetIn: windowMs,
    };
  } catch {
    return memRateLimit(key, limit, windowMs);
  }
}

// ── Global daily budget for the paid AI chat endpoint ──

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Enforces a global, per-day ceiling on calls to the paid Anthropic chat API.
 * Independent of client IP (so it can't be bypassed by header spoofing), this
 * caps total cost/abuse. Returns true when the call is within budget.
 * Limit is configurable via AI_CHAT_DAILY_LIMIT (default 5000).
 */
export async function checkAiChatBudget(): Promise<boolean> {
  const limit = parseInt(process.env.AI_CHAT_DAILY_LIMIT || "5000", 10);
  const day = new Date().toISOString().slice(0, 10);
  const key = `ai:budget:chat:${day}`;

  const client = getRedis();
  if (client && client.status === "ready") {
    try {
      const count = await client.incr(key);
      if (count === 1) await client.pexpire(key, DAY_MS);
      return count <= limit;
    } catch {
      // fall through to in-memory
    }
  }

  const now = Date.now();
  const entry = memStore.get(key);
  if (!entry || entry.resetAt <= now) {
    memStore.set(key, { count: 1, resetAt: now + DAY_MS });
    return 1 <= limit;
  }
  entry.count++;
  return entry.count <= limit;
}
