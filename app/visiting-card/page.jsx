"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { Building2, MessageCircle, Phone, Sparkles, UserRound } from "lucide-react";

const COMPANY = {
  name: "Pioneer Wealth",
  subtitle: "Financial Planning & Mutual Funds",
  role: "Wealth Advisor",
  phone: "+91 98765 43210",
  email: "advisory@pioneerwealth.in",
  website: "www.pioneerwealth.in",
  address: "Mumbai, India",
};

async function waitForAssets(node) {
  if (!node) return;

  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  if (typeof document !== "undefined" && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font readiness failures; capture should continue.
    }
  }
}

export default function VisitingCardPage() {
  const [showPopup, setShowPopup] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [previewReady, setPreviewReady] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const cardRef = useRef(null);

  const cleanPhone = useMemo(() => phone.replace(/[^\d+\-\s()]/g, ""), [phone]);
  const validPhone = useMemo(() => /^[0-9+\-\s()]{7,20}$/.test(cleanPhone), [cleanPhone]);

  const handleCreateCard = (e) => {
    e.preventDefault();

    if (!name.trim() || !cleanPhone.trim()) {
      alert("Please enter your name and mobile number.");
      return;
    }

    if (!validPhone) {
      alert("Please enter a valid mobile number.");
      return;
    }

    setPreviewReady(true);
    setShowPopup(false);
  };

  const triggerDownload = (blob, filename) => {
    const link = document.createElement("a");
    link.download = filename;

    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      return;
    }

    link.href = "";
  };

  const handleDownload = async () => {
    if (!previewReady) {
      setShowPopup(true);
      return;
    }

    if (!cardRef.current) {
      alert("Card preview is not ready yet.");
      return;
    }

    try {
      setIsDownloading(true);
      setSaveStatus("");

      let savedToAdmin = false;
      let saveErrorMessage = "";

      try {
        const res = await fetch("/api/visiting-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: name.trim(),
            userPhone: cleanPhone.trim(),
            companyName: COMPANY.name,
            subtitle: COMPANY.subtitle,
            companyPhone: COMPANY.phone,
          }),
        });

        let payload = {};
        try {
          payload = await res.json();
        } catch {
          payload = {};
        }

        if (res.ok && payload.success) {
          savedToAdmin = true;
        } else {
          saveErrorMessage = payload?.error || payload?.message || "Admin save failed.";
        }
      } catch (error) {
        saveErrorMessage = error.message || "Admin save failed.";
      }

      await waitForAssets(cardRef.current);

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#ffffff",
        scale: Math.min(window.devicePixelRatio || 2, 3),
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const filename = `${name.trim().replace(/\s+/g, "-").toLowerCase()}-visiting-card.png`;

      if (canvas.toBlob) {
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 1));
        if (blob) {
          triggerDownload(blob, filename);
        } else {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      } else {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      if (savedToAdmin) {
        setSaveStatus("Downloaded successfully. Data saved in admin.");
      } else {
        const hint = saveErrorMessage ? ` ${saveErrorMessage}` : "";
        setSaveStatus(`Card downloaded, but admin save failed.${hint}`);
      }
    } catch (error) {
      alert(error.message || "Unable to download right now.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      style={{ background: "radial-gradient(circle at top right, #E0F2FE 0%, #F8FAFC 36%, #EFF6FF 100%)", color: "#0F172A" }}
      className="relative min-h-screen overflow-x-hidden lg:h-screen lg:overflow-hidden"
    >
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(14, 116, 144, 0.16)" }} />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(15, 23, 42, 0.12)" }} />

      <section className="mx-3 mt-4 rounded-3xl px-4 py-7 shadow-xl sm:mx-6 sm:px-8 lg:mt-3 lg:py-6" style={{ background: "linear-gradient(132deg, #0B132B 0%, #1B2A41 52%, #255E7E 100%)", color: "#fff" }}>
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs tracking-wide text-slate-100">
            <Sparkles size={14} />
            Premium Visiting Card Studio
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Design Your Visiting Card</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
            Professional card preview, personalized with your name and number. Download image instantly and keep leads in admin panel.
          </p>
          <div className="mt-4 text-xs text-slate-300 sm:text-sm">
            <Link href="/">Home</Link> <span className="mx-1">/</span> <span>Visiting Card</span>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-5 px-3 pb-10 pt-5 sm:px-6 lg:h-[calc(100vh-230px)] lg:grid-cols-2 lg:pb-6 lg:pt-4">
        <section className="rounded-2xl border p-4 shadow-sm sm:p-6 lg:h-full" style={{ background: "rgba(255,255,255,0.92)", borderColor: "#D6E3EE" }}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold sm:text-xl">Card Preview</h2>
            <button
              onClick={() => setShowPopup(true)}
              className="rounded-lg border px-3 py-2 text-xs font-medium transition hover:bg-slate-100 sm:text-sm"
              style={{ borderColor: "#CBD5E1", color: "#334155" }}
            >
              Edit Details
            </button>
          </div>

          <div className="rounded-xl p-1">
            <div className="relative mx-auto max-w-[560px]">
              <div
                ref={cardRef}
                className="relative z-10 aspect-[1.78/1] w-full overflow-hidden rounded-2xl border"
                style={{ borderColor: "#BFD0DD", backgroundColor: "#FFFFFF", boxShadow: "0 16px 30px rgba(15,23,42,0.16)" }}
              >
                <div className="absolute inset-y-0 left-0 w-[54%]" style={{ background: "linear-gradient(180deg, #12569B 0%, #0D4B8D 100%)" }} />
                <div className="absolute -right-[11%] top-[-20%] h-[70%] w-[62%] rounded-full border-[10px]" style={{ borderColor: "#FFFFFF", backgroundColor: "#1C5EA4" }} />
                <div className="absolute -right-[8%] top-[-12%] h-[62%] w-[54%] rounded-full border-[8px]" style={{ borderColor: "#173E74", backgroundColor: "#FFFFFF" }} />
                <div className="absolute -left-[14%] bottom-[-60%] h-[120%] w-[66%] rounded-full" style={{ backgroundColor: "#0D4B8D" }} />

                <div className="relative z-10 grid h-full grid-cols-12">
                  <div className="col-span-7 flex h-full flex-col justify-between px-4 py-5 text-white sm:px-5 sm:py-6">
                    <div>
                      <p className="text-xl font-bold leading-tight tracking-wide sm:text-2xl">
                        {previewReady && name.trim() ? name.trim().toUpperCase() : "YOUR NAME"}
                      </p>
                      <p className="mt-1 text-sm text-blue-100 sm:text-base">{COMPANY.role}</p>
                    </div>

                    <div className="space-y-2 text-[11px] sm:text-sm">
                      <p className="flex items-center gap-2.5">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-[#123F72]">
                          <Phone size={12} />
                        </span>
                        <span>{previewReady && cleanPhone.trim() ? cleanPhone.trim() : "+00 123 456 789"}</span>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-[#123F72]">
                          <UserRound size={12} />
                        </span>
                        <span>{COMPANY.email}</span>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-[#123F72]">
                          <Building2 size={12} />
                        </span>
                        <span>{COMPANY.website}</span>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-[#123F72]">
                          <MessageCircle size={12} />
                        </span>
                        <span>{COMPANY.address}</span>
                      </p>
                    </div>
                  </div>

                  <div className="col-span-5 flex h-full flex-col items-center justify-center px-3 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#0D4B8D] bg-white shadow-md sm:h-16 sm:w-16">
                      {/* Keep native img for stable html2canvas rendering in download output */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/newlogo.png" alt="Pioneer Logo" width={40} height={40} className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
                    </div>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#0F172A" }}>
                      
                    </p>
                    <p className="mt-3 text-lg font-bold leading-tight sm:text-2xl" style={{ color: "#0F172A" }}>
                      {COMPANY.name.toUpperCase()}
                    </p>
                    <p className="mt-1 text-[11px] sm:text-xs" style={{ color: "#334155" }}>
                      {COMPANY.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border p-4 shadow-sm sm:p-6 lg:h-full" style={{ background: "rgba(255,255,255,0.92)", borderColor: "#D6E3EE" }}>
          <h2 className="text-lg font-semibold sm:text-xl">Download & Save</h2>
          <p className="mt-2 text-sm" style={{ color: "#4D6378" }}>
            Fill details from popup, then download. Card image creates instantly and attempt to save lead in admin panel.
          </p>

          <div className="mt-6 space-y-3 rounded-xl border p-4" style={{ borderColor: "#D4E2EC", background: "linear-gradient(180deg, #FAFCFF 0%, #F1F7FC 100%)" }}>
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm" style={{ color: "#4F667A" }}>Name</span>
              <span className="text-right text-sm font-semibold text-slate-900">{name || "-"}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm" style={{ color: "#4F667A" }}>Mobile</span>
              <span className="text-right text-sm font-semibold text-slate-900">{cleanPhone || "-"}</span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "linear-gradient(120deg, #0E2A47 0%, #256D85 100%)", boxShadow: "0 12px 24px rgba(14,42,71,0.22)" }}
          >
            {isDownloading ? "Saving & Downloading..." : "Download Visiting Card"}
          </button>

          {saveStatus ? <p className="mt-3 text-xs" style={{ color: "#3E5870" }}>{saveStatus}</p> : null}

          <p className="mt-3 text-xs" style={{ color: "#4D6378" }}>
            Admin page: <code className="rounded px-1 py-0.5" style={{ backgroundColor: "#EAF2F8", color: "#17324B" }}>/admin/visiting-cards</code>
          </p>
        </section>
      </main>

      <button
        type="button"
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
        style={{ background: "linear-gradient(120deg, #0E2A47 0%, #256D85 100%)", boxShadow: "0 12px 22px rgba(14,42,71,0.28)" }}
      >
        <MessageCircle className="h-5 w-5" />
        Edit Card
      </button>

      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-3 py-6"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.65)" }}
          onClick={() => setShowPopup(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border bg-white p-5 shadow-2xl sm:p-6"
            style={{ borderColor: "#D6E3EE", background: "linear-gradient(180deg, #FFFFFF 0%, #F7FBFF 100%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full text-white shadow-md" style={{ background: "linear-gradient(120deg, #0E2A47 0%, #256D85 100%)" }}>
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Create Your Card</h3>
                <p className="text-sm" style={{ color: "#4D6378" }}>Enter details to personalize the card.</p>
              </div>
            </div>

            <form onSubmit={handleCreateCard} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium" style={{ color: "#294159" }}>Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2"
                  style={{ borderColor: "#C8D7E3", backgroundColor: "#FFFFFF" }}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium" style={{ color: "#294159" }}>Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2"
                  style={{ borderColor: "#C8D7E3", backgroundColor: "#FFFFFF" }}
                />
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100"
                  style={{ borderColor: "#C8D7E3", color: "#294159" }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition"
                  style={{ background: "linear-gradient(120deg, #0E2A47 0%, #256D85 100%)" }}
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
