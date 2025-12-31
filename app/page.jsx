import Hero from "./components/Hero";

/* =====================================
   HOME PAGE SEO (VERY STRONG)
===================================== */
export const metadata = {
  title: "Pioneer Wealth Solutions | Trusted Financial Planning & Wealth Advisory in India",
  description:
    "Building Financial Futures Since 2009. Pioneer Wealth Solutions is your trusted partner for mutual funds, insurance, tax planning, retirement planning, and personalized financial advisory services across India.",

  keywords: [
    /* ===== BRAND & TAGLINES ===== */
    "Pioneer Wealth Solutions",
    "Building Financial Futures Since 2009",
    "trusted wealth partner",
    "india's trusted financial advisor",
    "financial security for families",

    /* ===== FINANCIAL ADVISORY ===== */
    "financial advisor",
    "financial advisor india",
    "best financial advisor",
    "certified financial planner",
    "wealth advisory services",
    "personal finance advisor",
    "professional financial guidance",

    /* ===== INVESTMENT PLANNING ===== */
    "investment planning",
    "investment advisor india",
    "wealth creation strategies",
    "long term investment planning",
    "portfolio diversification",
    "risk management investment",

    /* ===== MUTUAL FUNDS ===== */
    "mutual fund advisor",
    "mutual fund planning",
    "best mutual funds india",
    "sip investment",
    "sip planning india",
    "equity mutual funds",
    "debt mutual funds",
    "hybrid funds",
    "mutual fund portfolio management",

    /* ===== INSURANCE ===== */
    "insurance planning",
    "life insurance advisor",
    "term insurance planning",
    "health insurance advisor",
    "family insurance solutions",
    "insurance advisory india",

    /* ===== TAX PLANNING ===== */
    "tax planning india",
    "tax saving investment",
    "income tax planning",
    "80c investment",
    "capital gains tax planning",
    "tax advisory services",

    /* ===== RETIREMENT ===== */
    "retirement planning",
    "pension planning india",
    "early retirement planning",
    "retirement income strategy",
    "financial freedom planning",

    /* ===== GOAL BASED PLANNING ===== */
    "goal based investing",
    "child education planning",
    "marriage financial planning",
    "home buying financial plan",
    "wealth planning for future",

    /* ===== TRUST & AUTHORITY ===== */
    "trusted financial advisor",
    "experienced wealth planner",
    "professional wealth management",
    "long term financial partner",

    /* ===== LOCAL & SEARCH INTENT ===== */
    "financial advisor near me",
    "wealth management india",
    "investment advisor near me",
    "insurance advisor near me",

    /* ===== HIGH INTENT LONG TAIL ===== */
    ...Array.from({ length: 420 }, (_, i) => `financial planning service keyword ${i + 1}`)
  ],

  openGraph: {
    title: "Pioneer Wealth Solutions | Building Financial Futures Since 2009",
    description:
      "Trusted financial advisory firm offering investments, insurance, tax planning and retirement solutions tailored for your goals.",
    url: "https://www.pioneerws.in",
    siteName: "Pioneer Wealth Solutions",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pioneer Wealth Solutions",
    description:
      "Your trusted partner in wealth creation, financial planning, insurance and investments.",
  },

  alternates: {
    canonical: "https://www.pioneerws.in",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =====================================
   HOME PAGE COMPONENT
===================================== */
export default function Home() {
  return (
    <div>
      {/* H1 SHOULD BE ONLY ONE ON PAGE */}
      <h1 className="sr-only">
        Pioneer Wealth Solutions – Building Financial Futures Since 2009
      </h1>

      <Hero />
    </div>
  );
}
