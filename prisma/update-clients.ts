import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://vanguard_app:EffC8hw8n4_Fs-G@localhost:5432/vanguardm_vanguard_app";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface ClientUpdate {
  name: string;
  monthlyRetainer: number;
  phone?: string;
  address?: string;
  notes?: string;
  domain?: string;
  email?: string;
  services?: ("SMA" | "PPC" | "WEB" | "SEO" | "REPORTING" | "SUPPORT")[];
  isNew?: boolean;
  gtmContainerId?: string;
}

const updates: ClientUpdate[] = [
  {
    name: "ABWMS",
    monthlyRetainer: 300,
    phone: "(717) 549-2527",
    address: "127 River Road, Gettysburg, PA 17325",
    notes: "Ad budget: $10/day, ~$90/mo spend",
  },
  {
    name: "Brazos Valley AC Services",
    monthlyRetainer: 1950,
    phone: "(979) 213-8737",
    address: "13590 Garrett Ln, Bryan, TX 77808",
    notes: "Ad budget: $65/day + $15 Pmax, ~$500/mo spend. Tracking: (979) 977-6155",
  },
  {
    name: "Century Home Services",
    monthlyRetainer: 750,
    phone: "(979) 330-4544",
    address: "4438 Texas 6 Frontage Rd Suite 401, College Station, TX 77845",
    notes: "Ad budget: $25/day, $0/mo spend — account spend errors, no conversions. Tracking: (979) 985-3289",
  },
  {
    name: "Cinnaholic",
    monthlyRetainer: 540,
    phone: "(979) 588-3769",
    address: "1623 Texas Ave S, College Station, TX 77840",
    domain: "locations.cinnaholic.com",
    notes: "Ad budget: $18/day, ~$162/mo spend. No SMA, no SEO.",
    services: ["PPC", "WEB"],
  },
  {
    name: "Guard My Practice",
    isNew: true,
    monthlyRetainer: 330,
    domain: "guardmypracticevideos.com",
    notes: "Ad budget: $11/day, ~$50/mo spend. Shopify site. Target all of USA.",
    services: ["PPC", "WEB"],
  },
  {
    name: "Hospice Brazos Valley",
    monthlyRetainer: 600,
    phone: "(979) 821-2266",
    address: "502 W 26th St, Bryan, TX 77803",
    notes: "Ad budget: $20/day, ~$180/mo spend. Tracking: (979) 977-6112",
  },
  {
    name: "Howdy Garage Doors",
    monthlyRetainer: 4500,
    phone: "(979) 977-2504",
    address: "3206 Longmire Dr Suite A53, College Station, TX 77845",
    notes: "Ad budget: $150/day, ~$500/mo spend",
  },
  {
    name: "LM2",
    isNew: true,
    monthlyRetainer: 450,
    domain: "lm2biz.com",
    phone: "512-937-2883",
    address: "Regus coworking spaces — target BCS, Austin, Houston",
    notes: "Ad budget: $15/day, ~$135/mo spend. Call or text primary. Tracking: (407) 220-1936. No PPC.",
    services: ["WEB", "SEO"],
  },
  {
    name: "Need Travel Now",
    monthlyRetainer: 450,
    phone: "(720) 884-6058",
    address: "8810 Welsh Ln, Longmont, CO 80504",
    notes: "Ad budget: $15/day, ~$135/mo spend. Tracking: (979) 337-8515",
  },
  {
    name: "Oakwood Counseling",
    monthlyRetainer: 450,
    phone: "(979) 229-7636",
    address: "1100 Briarcrest Dr, Bryan, TX 77802",
    notes: "Ad budget: $15/day, ~$135/mo spend. NOTE: Google Ads shows $51/day instead of $15/day — investigate",
  },
  {
    name: "Orlando BP",
    monthlyRetainer: 750,
    phone: "(407) 564-3375",
    address: "2435 Lee Rd, Winter Park, FL 32789",
    notes: "Ad budget: $25/day, ~$225/mo spend",
  },
  {
    name: "Peas in a Pod",
    monthlyRetainer: 1050,
    phone: "(979) 703-1816",
    address: "2775 Barron Rd, College Station, TX 77845",
    notes: "Ad budget: $35/day, ~$315/mo spend. Tracking: (979) 337-8505",
  },
  {
    name: "Pet Care Club of Aggieland",
    monthlyRetainer: 390,
    phone: "(979) 635-0787",
    address: "No physical address",
    notes: "Ad budget: $13/day, ~$117/mo spend. Squarespace site. Tracking: (979) 337-8538",
  },
  {
    name: "Raymond's Roofing",
    monthlyRetainer: 900,
    phone: "(979) 324-8994",
    address: "4842 Whispering Oaks Dr, College Station, TX 77845",
    notes: "Ad budget: $30/day, ~$270/mo spend. Tracking: (979) 337-8516",
  },
  {
    name: "Real Clean Team",
    monthlyRetainer: 450,
    phone: "(979) 446-1650",
    address: "8701 Sandstone Dr, College Station, TX 77845",
    notes: "Ad budget: $15/day, ~$135/mo spend. WIX site. No SEO.",
  },
  {
    name: "SDS Plumbing",
    monthlyRetainer: 5310,
    phone: "(979) 255-3166",
    address: "1013 Sun Meadow Ct, College Station, TX 77845",
    notes: "Ad budget: $177/day, ~$500/mo spend. Need Google reimbursement.",
  },
  {
    name: "TexGreen Lawn & Landscape",
    monthlyRetainer: 390,
    phone: "(979) 985-8760",
    address: "920 Clear Leaf Drive Unit 48, Bryan, TX 77803",
    notes: "Ad budget: $13/day, ~$117/mo spend",
  },
  {
    name: "Top Point Tree",
    monthlyRetainer: 450,
    phone: "(979) 773-3242",
    address: "7443 Shirley Rd Building C, Bryan, TX 77808",
    notes: "Ad budget: $15/day, ~$135/mo spend",
  },
];

async function main() {
  console.log("Updating client data...\n");

  let updated = 0;
  let created = 0;
  let failed = 0;

  for (const u of updates) {
    if (u.isNew) {
      // Create new client
      try {
        const client = await prisma.client.create({
          data: {
            agencyId: 'vanguard-seed',
            name: u.name,
            domain: u.domain || null,
            phone: u.phone || null,
            email: u.email || null,
            address: u.address || null,
            status: "ACTIVE",
            monthlyRetainer: u.monthlyRetainer,
            billingCycle: "MONTHLY",
            slaResponseHours: 24,
            gtmContainerId: u.gtmContainerId || null,
            notes: u.notes || null,
            ...(u.services?.length && {
              services: {
                create: u.services.map((s) => ({ serviceType: s })),
              },
            }),
          },
        });
        console.log(`  NEW: ${client.name} ($${u.monthlyRetainer}/mo)`);
        created++;
      } catch (e: any) {
        console.log(`  FAIL (create): ${u.name} — ${e.message}`);
        failed++;
      }
      continue;
    }

    // Update existing client
    const existing = await prisma.client.findFirst({
      where: { name: u.name },
      include: { services: true },
    });

    if (!existing) {
      console.log(`  NOT FOUND: ${u.name}`);
      failed++;
      continue;
    }

    const data: Record<string, unknown> = {
      monthlyRetainer: u.monthlyRetainer,
    };
    if (u.phone) data.phone = u.phone;
    if (u.address) data.address = u.address;
    if (u.notes) data.notes = u.notes;
    if (u.domain) data.domain = u.domain;
    if (u.email) data.email = u.email;

    await prisma.client.update({
      where: { id: existing.id },
      data,
    });

    // Add any missing services
    if (u.services) {
      const existingTypes = existing.services.map((s) => s.serviceType);
      for (const svc of u.services) {
        if (!existingTypes.includes(svc)) {
          await prisma.clientService.create({
            data: { clientId: existing.id, serviceType: svc },
          });
          console.log(`    + Added ${svc} service to ${u.name}`);
        }
      }
    }

    console.log(`  OK: ${u.name} → $${u.monthlyRetainer}/mo`);
    updated++;
  }

  console.log(`\nDone. Updated: ${updated}, Created: ${created}, Failed: ${failed}`);
  console.log(`Total monthly retainer: $${updates.reduce((sum, u) => sum + u.monthlyRetainer, 0).toLocaleString()}`);
}

main()
  .catch((e) => {
    console.error("Update failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
