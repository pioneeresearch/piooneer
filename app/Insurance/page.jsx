"use client";

import { useState } from "react";
import { ArrowRight, Check, HeartPulse, Shield } from "lucide-react";

const INSURANCE_PLANS = {
  life: [
    {
      name: "HDFC Life Click 2 Protect",
      company: "HDFC Life",
      coverage: "INR 1 Cr",
      premium: "INR 8,500 per year",
      features: ["Pure term plan", "Online discount", "Return of premium option", "Critical illness rider"],
    },
    {
      name: "ICICI Pru iProtect Smart",
      company: "ICICI Prudential",
      coverage: "INR 1 Cr",
      premium: "INR 9,200 per year",
      features: ["Life cover", "Accidental death benefit", "Premium waiver", "Flexible payout options"],
    },
    {
      name: "SBI Life eShield",
      company: "SBI Life",
      coverage: "INR 1 Cr",
      premium: "INR 8,800 per year",
      features: ["Affordable premiums", "Tax benefits", "Terminal illness cover", "Income benefit option"],
    },
  ],
  health: [
    {
      name: "Star Health Comprehensive",
      company: "Star Health",
      coverage: "INR 25 Lakh",
      premium: "INR 10,500 per year",
      features: ["Cashless hospitalization", "Pre and post hospitalization", "No-claim bonus", "Health check-up"],
    },
    {
      name: "HDFC ERGO Health Suraksha",
      company: "HDFC ERGO",
      coverage: "INR 20 Lakh",
      premium: "INR 9,800 per year",
      features: ["Family floater", "Ambulance covered", "AYUSH treatment", "Unlimited restoration"],
    },
    {
      name: "Care Health Insurance",
      company: "Care Health",
      coverage: "INR 15 Lakh",
      premium: "INR 8,600 per year",
      features: ["Large cashless network", "Health check-ups", "No room rent limit", "Section 80D benefits"],
    },
  ],
};

export default function InsurancePage() {
  const [activeTab, setActiveTab] = useState("life");

  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-700 to-blue-900 px-6 py-14 text-center text-white shadow-xl sm:px-10">
          <h1 className="text-3xl font-bold sm:text-5xl">Insurance planning</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-sky-100 sm:text-base">
            Protect your family, health, and long-term goals with properly structured insurance coverage.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center">
          <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("life")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "life" ? "bg-sky-700 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Life Insurance
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("health")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "health" ? "bg-sky-700 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Health Insurance
            </button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INSURANCE_PLANS[activeTab].map((plan) => (
            <article key={plan.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                {activeTab === "life" ? <Shield size={22} /> : <HeartPulse size={22} />}
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{plan.name}</h2>
              <p className="text-sm text-slate-500">{plan.company}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-500">Coverage</p>
                  <p className="font-semibold text-slate-800">{plan.coverage}</p>
                </div>
                <div>
                  <p className="text-slate-500">Premium</p>
                  <p className="font-semibold text-slate-800">{plan.premium}</p>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 text-sky-700" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-800">
                Get Quote
                <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
