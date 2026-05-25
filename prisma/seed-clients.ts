import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set — add it to .env");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface SeedClient {
  name: string;
  domain?: string;
  phone?: string;
  email?: string;
  address?: string;
  status: "ACTIVE" | "PROSPECT" | "PAUSED" | "CHURNED";
  monthlyRetainer?: number;
  billingCycle?: "MONTHLY" | "QUARTERLY" | "ANNUAL";
  slaResponseHours?: number;
  nimbataProjectId?: string;
  gtmContainerId?: string;
  services: { serviceType: "SMA" | "PPC" | "WEB" | "SUPPORT" | "SEO" | "REPORTING"; monthlyBudget?: number }[];
  contacts?: { name: string; email: string; phone?: string; role?: string; isPrimary?: boolean }[];
}

const clients: SeedClient[] = [
  {
    name: "Howdy Garage Doors",
    domain: "howdygarage.com",
    phone: "(979) 627-4861",
    email: "info@howdygarage.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-MW3FMX33",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
      { serviceType: "SEO" },
    ],
  },
  {
    name: "Brazos Valley AC Services",
    domain: "bvacservices.com",
    phone: "(979) 213-8737",
    email: "office@bvacservices.com",
    address: "3204 Longmire Dr Suite B, College Station, TX 77845",
    status: "ACTIVE",
    gtmContainerId: "GTM-MN4FDB8",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
      { serviceType: "SEO" },
      { serviceType: "SMA" },
    ],
    contacts: [
      { name: "Jose Gonzales", email: "office@bvacservices.com", phone: "(979) 213-8737", role: "Owner", isPrimary: true },
    ],
  },
  {
    name: "ADVTECH Detailing",
    domain: "advtechdetailing.com",
    phone: "(936) 358-6500",
    email: "info@advtechdetailing.com",
    address: "Conroe, TX",
    status: "ACTIVE",
    services: [
      { serviceType: "WEB" },
    ],
  },
  {
    name: "ABWMS",
    domain: "abwmsonline.org",
    phone: "(717) 549-2527",
    email: "info@abwms.org",
    status: "ACTIVE",
    gtmContainerId: "GTM-K4QN8M8",
    services: [
      { serviceType: "WEB" },
      { serviceType: "SEO" },
    ],
  },
  {
    name: "Century Home Services",
    domain: "centuryhomecarepartners.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-5JRM8S7P",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
    ],
  },
  {
    name: "Hospice Brazos Valley",
    domain: "hospicebv.org",
    status: "ACTIVE",
    gtmContainerId: "GTM-M6WHVHSB",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
      { serviceType: "SMA" },
    ],
  },
  {
    name: "Need Travel Now",
    domain: "needtravelnow.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-P42D4FMS",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
    ],
  },
  {
    name: "Oakwood Counseling",
    domain: "oakwoodcounseling.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-TJLF5TQ2",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
      { serviceType: "SEO" },
    ],
  },
  {
    name: "Orlando BP",
    domain: "orlandodbp.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-NDQ3TN5T",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
    ],
  },
  {
    name: "Peas in a Pod",
    domain: "peasinapodbcs.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-W5Q7T2MW",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
      { serviceType: "SMA" },
    ],
  },
  {
    name: "Pet Care Club of Aggieland",
    domain: "petcareclubofaggieland.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-NRLBZKZB",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
      { serviceType: "SMA" },
    ],
  },
  {
    name: "Raymond's Roofing",
    domain: "raymondsroofingbcs.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-5XB7SVDW",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
    ],
  },
  {
    name: "Real Clean Team",
    domain: "realcleanteam.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-WWTKV9BK",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
      { serviceType: "SMA" },
    ],
  },
  {
    name: "SDS Plumbing",
    domain: "sds-plumbing.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-NG3CJP7X",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
    ],
  },
  {
    name: "TexGreen Lawn & Landscape",
    domain: "texgreenlawnscapestx.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-N54FD6F4",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
      { serviceType: "SMA" },
    ],
  },
  {
    name: "Top Point Tree",
    domain: "toppointtree.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-PVVS8P8",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
    ],
  },
  {
    name: "12th Man Technology",
    domain: "12thmantechnology.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-TZ2Q5GND",
    services: [
      { serviceType: "WEB" },
      { serviceType: "SMA" },
    ],
  },
  {
    name: "BCS Laundry Mom",
    domain: "bcslaundrymom.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-WZPZZVH2",
    services: [
      { serviceType: "PPC" },
      { serviceType: "WEB" },
    ],
  },
  {
    name: "Cinnaholic",
    domain: "cinnaholic.com",
    status: "ACTIVE",
    services: [
      { serviceType: "SMA" },
    ],
  },
  {
    name: "MENT Services",
    domain: "mentservices.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-K6CXPNL4",
    services: [
      { serviceType: "WEB" },
      { serviceType: "SEO" },
      { serviceType: "SMA" },
    ],
  },
  {
    name: "Texas Best Web Host",
    domain: "texasbestwebhost.com",
    status: "ACTIVE",
    gtmContainerId: "GTM-MRWJT5TK",
    services: [
      { serviceType: "WEB" },
      { serviceType: "SEO" },
    ],
  },
];

async function main() {
  console.log("Seeding clients...\n");

  let created = 0;
  let skipped = 0;

  for (const c of clients) {
    // Check if client already exists by name
    const existing = await prisma.client.findFirst({
      where: { name: c.name },
    });

    if (existing) {
      console.log(`  SKIP: ${c.name} (already exists)`);
      skipped++;
      continue;
    }

    const client = await prisma.client.create({
      data: {
        agencyId: 'vanguard-seed',
        name: c.name,
        domain: c.domain || null,
        phone: c.phone || null,
        email: c.email || null,
        address: c.address || null,
        status: c.status,
        monthlyRetainer: c.monthlyRetainer || null,
        billingCycle: c.billingCycle || "MONTHLY",
        slaResponseHours: c.slaResponseHours || 24,
        nimbataProjectId: c.nimbataProjectId || null,
        gtmContainerId: c.gtmContainerId || null,
        services: {
          create: c.services.map((s) => ({
            serviceType: s.serviceType,
            monthlyBudget: s.monthlyBudget || null,
          })),
        },
        ...(c.contacts?.length && {
          contacts: {
            create: c.contacts.map((ct) => ({
              name: ct.name,
              email: ct.email,
              phone: ct.phone || null,
              role: ct.role || "primary",
              isPrimary: ct.isPrimary ?? false,
            })),
          },
        }),
      },
    });

    console.log(`  OK: ${client.name} (${c.services.length} services)`);
    created++;
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
