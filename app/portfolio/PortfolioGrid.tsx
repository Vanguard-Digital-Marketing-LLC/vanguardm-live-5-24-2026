"use client";

import { useState } from "react";

const categories = ["All", "Web Design"];

const projects = [
  {
    name: "ADVTECH Detailing",
    category: "Web Design",
    desc: "Custom Next.js website with booking management system, service catalog, and integrated review system for a Conroe, TX auto detailing business.",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    result: "Full BMS + online presence from zero",
    link: "https://advtechdetailing.com",
  },
  {
    name: "Howdy Garage Doors",
    category: "Web Design",
    desc: "Static marketing site with admin panel for a Houston-area garage door service company. Google Ads integration with Nimbata call tracking.",
    tech: ["HTML/CSS", "Next.js Admin"],
    result: "Lead gen + call tracking from day one",
    link: "https://howdygaragedoors.com",
  },
  {
    name: "BVAC Services",
    category: "Web Design",
    desc: "16-page static site with dedicated admin panel, Podium integration, and Nimbata call tracking for an HVAC and plumbing company.",
    tech: ["HTML/CSS", "Next.js Admin"],
    result: "16 service pages + full tracking stack",
    link: "https://bvacservices.com",
  },
  {
    name: "Coffee Break Events",
    category: "Web Design",
    desc: "Next.js event planning website for a coffee-themed catering and events business.",
    tech: ["Next.js", "Tailwind CSS"],
    result: "Modern event booking platform",
    link: "https://coffeebreakevents.com",
  },
  {
    name: "360° Vastgoed Presentatie",
    category: "Web Design",
    desc: "Next.js website with admin CMS for a Dutch real estate photography and virtual tour company. Multi-language support.",
    tech: ["Next.js", "Admin CMS", "PostgreSQL"],
    result: "Custom CMS + portfolio management",
    link: "https://360vastgoedpresentatie.nl",
  },
  {
    name: "ABWMS Online",
    category: "Web Design",
    desc: "Next.js certification platform with course management, quiz system, and digital certificate generation for a women's ministry organization.",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    result: "Full certification + learning platform",
    link: "https://abwmsonline.org",
  },
  {
    name: "Ferg Repair",
    category: "Web Design",
    desc: "Clean single-page marketing site for an appliance repair service business with contact integration.",
    tech: ["HTML/CSS", "Cloudflare"],
    result: "Professional online presence",
    link: "https://fergrepair.com",
  },
];

export default function PortfolioGrid() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="pb-12 md:pb-20 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full font-display text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                active === cat
                  ? "bg-emerald text-slate-950"
                  : "glass text-slate-300 hover:text-emerald"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((project) => (
            <div
              key={project.name}
              className="glass rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:border-emerald/20 hover:shadow-lg hover:shadow-emerald/5 group flex flex-col"
            >
              <div className="mb-3 text-center">
                <span className="px-3 py-1 rounded-full bg-emerald/10 text-emerald font-display text-[10px] font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-center group-hover:text-emerald transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4 text-center">{project.desc}</p>

              <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 text-[11px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-amber font-display text-sm font-semibold">{project.result}</span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald text-sm font-semibold hover:text-emerald/80 transition-colors whitespace-nowrap ml-3"
                >
                  Visit Site &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
