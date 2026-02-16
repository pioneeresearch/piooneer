import Image from "next/image";
import { Award, ShieldCheck, Target, Users } from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Transparent advice and responsible financial decision-making at every step.",
  },
  {
    icon: Users,
    title: "Client First",
    description: "Plans are designed around your family goals, risk comfort, and timelines.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Disciplined process, regular reviews, and data-backed recommendations.",
  },
  {
    icon: Target,
    title: "Long-Term Focus",
    description: "Sustainable wealth strategies built for life milestones, not short-term noise.",
  },
];

const TEAM = [
  { image: "/anu.jpg", name: "Rajesh Mehta", role: "Founder and CEO" },
  { image: "/item33.jpg", name: "Anjali Desai", role: "Head of Investments" },
  { image: "/item45.jpg", name: "Vikram Singh", role: "Insurance Specialist" },
  { image: "/item44.jpg", name: "Sneha Reddy", role: "Tax Consultant" },
];

export const metadata = {
  title: "About",
  description:
    "Learn about Pioneer Wealth Solutions, our advisory philosophy, values, and the team helping families build long-term financial confidence.",
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-sky-700 to-blue-900 px-6 py-14 text-white shadow-xl sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">About Pioneer Wealth</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Built on trust, discipline, and long-term thinking</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-sky-100 sm:text-base">
            Since 2009, we have helped clients simplify financial decisions through structured planning, risk protection,
            and goal-driven investing.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Who we are</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Pioneer Wealth Solutions is a professional advisory team focused on practical financial planning. We combine
            personalized strategy, portfolio discipline, and regular tracking so clients can move toward their goals with
            confidence.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            From wealth creation and insurance planning to tax-aware investing, our recommendations are built for clarity,
            consistency, and measurable progress.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-lg">
          <Image src="/neww.jpg" alt="Pioneer Wealth team collaboration" width={1200} height={800} className="h-[360px] w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Our core values</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Meet the team</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <article key={member.name} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <Image
                src={member.image}
                alt={member.name}
                width={180}
                height={180}
                className="mx-auto h-24 w-24 rounded-full border-4 border-sky-100 object-cover"
              />
              <h3 className="mt-4 text-base font-semibold text-slate-900">{member.name}</h3>
              <p className="text-sm text-slate-500">{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
