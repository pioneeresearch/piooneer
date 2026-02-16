"use client";

import { useMemo, useState } from "react";
import { Calculator, Target } from "lucide-react";

function formatInr(value) {
  return `INR ${Math.round(value).toLocaleString("en-IN")}`;
}

export default function FinancialPlanningPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const { totalInvestment, estimatedReturns, maturityValue } = useMemo(() => {
    const P = Number(monthlyInvestment);
    const n = 12;
    const R = Number(rate) / 100;
    const t = Number(years);

    const maturity = (P * ((Math.pow(1 + R / n, n * t) - 1) * (1 + R / n))) / (R / n);
    const total = P * n * t;
    const returns = maturity - total;

    return {
      totalInvestment: total,
      estimatedReturns: returns,
      maturityValue: maturity,
    };
  }, [monthlyInvestment, years, rate]);

  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-700 to-blue-900 px-6 py-14 text-center text-white shadow-xl sm:px-10">
          <h1 className="text-3xl font-bold sm:text-5xl">Financial planning tools</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-sky-100 sm:text-base">
            Test your SIP strategy and review expected outcomes with transparent assumptions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2 text-slate-900">
              <Calculator size={20} className="text-sky-700" />
              <h2 className="text-xl font-semibold">SIP Calculator</h2>
            </div>

            <div className="space-y-7">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Monthly Investment</label>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full accent-sky-700"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                  <span>INR 500</span>
                  <span>INR 100,000</span>
                </div>
                <p className="mt-1 text-right text-sm font-semibold text-sky-700">{formatInr(monthlyInvestment)}</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Investment Tenure</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-sky-700"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
                <p className="mt-1 text-right text-sm font-semibold text-sky-700">{years} years</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Expected Return (annual)</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-sky-700"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                  <span>1%</span>
                  <span>20%</span>
                </div>
                <p className="mt-1 text-right text-sm font-semibold text-sky-700">{rate}% p.a.</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Projection summary</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Total Investment</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{formatInr(totalInvestment)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Estimated Returns</p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">{formatInr(estimatedReturns)}</p>
              </div>
              <div className="rounded-xl bg-sky-700 p-4 text-white">
                <p className="text-sm text-sky-100">Maturity Value</p>
                <p className="mt-1 text-2xl font-bold">{formatInr(maturityValue)}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">Returns are indicative and may vary based on market performance.</p>
          </article>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Talk to our planning team</h2>
          <p className="mt-2 text-sm text-slate-600">
            Share your goals and get a personalized allocation and protection strategy from our advisors.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <Target className="mt-0.5 text-sky-700" size={18} />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Goal-based planning</h3>
                  <p className="text-sm text-slate-600">Build a practical strategy around your milestones and timelines.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <Calculator className="mt-0.5 text-sky-700" size={18} />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Portfolio optimization</h3>
                  <p className="text-sm text-slate-600">Review return potential and risk structure before investing.</p>
                </div>
              </div>
            </div>

            <form className="space-y-3">
              <input type="text" placeholder="Full Name" className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
              <input type="tel" placeholder="Phone Number" className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
              <input type="email" placeholder="Email Address" className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
              <textarea rows={3} placeholder="Your Financial Goals" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
              <button type="button" className="w-full rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-800">
                Request Free Consultation
              </button>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
}
