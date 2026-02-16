"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BriefcaseBusiness, HeartPulse, PiggyBank, ShieldCheck, Target, Wallet } from "lucide-react";

const SERVICE_CATEGORIES = ["All", "Investment", "Insurance", "Tax", "Advisory"];

const SERVICES = [
  {
    id: 1,
    title: "Mutual Fund Advisory",
    description: "Evidence-based fund selection and disciplined allocation for long-term wealth growth.",
    icon: Wallet,
    category: "Investment",
  },
  {
    id: 2,
    title: "Life Insurance Planning",
    description: "Right coverage structure for family protection, liabilities, and life-stage priorities.",
    icon: ShieldCheck,
    category: "Insurance",
  },
  {
    id: 3,
    title: "Health Insurance Planning",
    description: "Comprehensive protection strategy with family floater and critical rider evaluation.",
    icon: HeartPulse,
    category: "Insurance",
  },
  {
    id: 4,
    title: "Tax Planning",
    description: "Tax-aware investing and deduction optimization aligned with your annual financial goals.",
    icon: Target,
    category: "Tax",
  },
  {
    id: 5,
    title: "Wealth Advisory",
    description: "Goal-based planning, risk profiling, and periodic reviews to keep execution on track.",
    icon: BriefcaseBusiness,
    category: "Advisory",
  },
  {
    id: 6,
    title: "Retirement Planning",
    description: "Structured retirement corpus planning with inflation-aware accumulation and drawdown strategy.",
    icon: PiggyBank,
    category: "Advisory",
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = useMemo(() => {
    if (activeCategory === "All") return SERVICES;
    return SERVICES.filter((service) => service.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-700 to-blue-900 px-6 py-14 text-center text-white shadow-xl sm:px-10">
          <h1 className="text-3xl font-bold sm:text-5xl">Professional financial services</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-sky-100 sm:text-base">
            Comprehensive advisory solutions covering investments, insurance, tax planning, and long-term wealth strategy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {SERVICE_CATEGORIES.map((category) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-sky-700 bg-sky-700 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{service.title}</h2>
                <p className="mt-2 flex-grow text-sm leading-6 text-slate-600">{service.description}</p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-800"
                >
                  Enquire Now
                  <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
