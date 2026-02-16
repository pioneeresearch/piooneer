"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ChartNoAxesCombined, Filter } from "lucide-react";

const FUNDS = [
  { id: 1, name: "HDFC Equity Fund", house: "HDFC MF", category: "Equity", returns: "18.5%", risk: "High" },
  { id: 2, name: "SBI Bluechip Fund", house: "SBI MF", category: "Large Cap", returns: "14.2%", risk: "Moderate" },
  { id: 3, name: "Axis Small Cap Fund", house: "Axis MF", category: "Small Cap", returns: "22.1%", risk: "High" },
];

const FAQS = [
  {
    id: 1,
    question: "What are mutual funds?",
    answer:
      "Mutual funds pool capital from investors and deploy it across diversified assets managed by professional fund managers.",
  },
  {
    id: 2,
    question: "Why invest in mutual funds?",
    answer:
      "They offer diversification, liquidity, professional management, and a structured path for long-term goal investing.",
  },
  {
    id: 3,
    question: "Are mutual funds risky?",
    answer:
      "Risk levels vary by category. Proper asset allocation and horizon alignment help control risk effectively.",
  },
];

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [fundHouseFilter, setFundHouseFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFunds = useMemo(() => {
    return FUNDS.filter((fund) => {
      const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || fund.category === categoryFilter;
      const matchesHouse = fundHouseFilter === "All" || fund.house === fundHouseFilter;
      return matchesSearch && matchesCategory && matchesHouse;
    });
  }, [searchTerm, categoryFilter, fundHouseFilter]);

  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-700 to-blue-900 px-6 py-14 text-center text-white shadow-xl sm:px-10">
          <h1 className="text-3xl font-bold sm:text-5xl">Mutual fund products</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-sky-100 sm:text-base">
            Explore curated fund options and shortlist schemes aligned with your goals and risk comfort.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-slate-700">
            <Filter size={16} />
            <p className="text-sm font-semibold">Search and filter</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search fund name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              <option>All</option>
              <option>Equity</option>
              <option>Large Cap</option>
              <option>Small Cap</option>
            </select>
            <select
              value={fundHouseFilter}
              onChange={(e) => setFundHouseFilter(e.target.value)}
              className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              <option>All</option>
              <option>HDFC MF</option>
              <option>SBI MF</option>
              <option>Axis MF</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {filteredFunds.map((fund) => (
            <article key={fund.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-sky-700">
                    <ChartNoAxesCombined size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">{fund.name}</h2>
                    <p className="text-sm text-slate-500">{fund.house}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm lg:min-w-[360px]">
                  <div>
                    <p className="text-slate-500">Category</p>
                    <p className="font-semibold text-slate-800">{fund.category}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">1Y Returns</p>
                    <p className="font-semibold text-emerald-600">{fund.returns}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Risk</p>
                    <p className="font-semibold text-slate-800">{fund.risk}</p>
                  </div>
                </div>

                <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-800">
                  Invest Now
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}

          {filteredFunds.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-600">
              No fund matched your selected filters.
            </p>
          ) : null}
        </div>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Mutual fund basics</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.id} className="rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800"
                >
                  {faq.question}
                  <span>{openFaq === faq.id ? "-" : "+"}</span>
                </button>
                {openFaq === faq.id ? <p className="px-4 pb-4 text-sm leading-6 text-slate-600">{faq.answer}</p> : null}
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
