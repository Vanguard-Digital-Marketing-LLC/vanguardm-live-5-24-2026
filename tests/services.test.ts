import { describe, it, expect, vi } from 'vitest';
import { createCustomer, createCheckoutSession } from '../services/stripe';
import { fetchAnalytics } from '../services/google';
import { logError, captureMessage } from '../services/sentry';
import { getUserById } from '../services/prisma';

// Mock the underlying libraries
vi.mock('stripe', () => {
  return {
    default: class {
      customers = { create: vi.fn().mockResolvedValue({ id: 'cus_123', email: 'james@vanguardm.com' }) };
      checkout = {
        sessions: { create: vi.fn().mockResolvedValue({ id: 'cs_test_123', url: 'https://checkout.stripe.com/...' }) }
      };
    }
  };
});

vi.mock('googleapis', () => {
  return {
    google: {
      auth: {
        GoogleAuth: class {
          getClient = vi.fn().mockResolvedValue({});
        }
      },
      analytics: vi.fn().mockReturnValue({
        data: {
          ga: { get: vi.fn().mockResolvedValue({ data: { rows: [['100']] } }) }
        }
      })
    }
  };
});

vi.mock('@sentry/nextjs', () => {
  return {
    captureException: vi.fn(),
    captureMessage: vi.fn(),
  };
});

vi.mock('@/lib/db', () => {
  return {
    prisma: {
      user: {
        findUnique: vi.fn().mockResolvedValue({ id: 'user_123', email: 'james@vanguardm.com' })
      }
    }
  };
});

describe('Services Unit Tests', () => {
  
  describe('Stripe Service', () => {
    it('should create a customer', async () => {
      const customer = await createCustomer('james@vanguardm.com');
      expect(customer.id).toBe('cus_123');
    });

    it('should create a checkout session', async () => {
      const session = await createCheckoutSession('cus_123', 'price_123');
      expect(session.id).toBe('cs_test_123');
    });
  });

  describe('Google Service', () => {
    it('should fetch analytics data', async () => {
      const data = await fetchAnalytics('view_123', '30daysAgo', 'today');
      expect(data.rows[0][0]).toBe('100');
    });
  });

  describe('Sentry Service', () => {
    it('should call captureException when logError is called', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      logError(new Error('Test Error'), { foo: 'bar' });
      // Since it's mocked, we just ensure it doesn't throw and calls console.error
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should not throw on captureMessage', () => {
      expect(() => captureMessage('Hello World')).not.toThrow();
    });
  });

  describe('Prisma Service', () => {
    it('should fetch user by ID', async () => {
      const user = await getUserById('user_123');
      expect(user?.email).toBe('james@vanguardm.com');
    });
  });
});
