"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Financial District, Bandra West", "Mumbai, Maharashtra 400050"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 22 1234 5678"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@pioneerws.in", "support@pioneerws.in"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"],
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    const form = e.currentTarget;
    const payload = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage("Thank you. Your message has been sent successfully.");
        form.reset();
      } else {
        setStatusMessage(data?.error || "Unable to submit right now. Please try again.");
      }
    } catch {
      setStatusMessage("Unable to submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-700 to-blue-900 px-6 py-14 text-center text-white shadow-xl sm:px-10">
          <h1 className="text-3xl font-bold sm:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-sky-100 sm:text-base">
            Share your requirements and our team will connect within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_INFO.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Icon size={20} />
                </div>
                <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  {item.details.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
            <p className="mt-2 text-sm text-slate-600">Fill in your details and we will respond promptly.</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" type="text" required placeholder="Full Name" className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
                <input name="phone" type="tel" required placeholder="Phone Number" className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
              </div>
              <input name="email" type="email" required placeholder="Email Address" className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
              <input name="subject" type="text" placeholder="Subject" className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
              <textarea name="message" rows={4} required placeholder="Your message" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {statusMessage ? <p className="text-sm text-slate-600">{statusMessage}</p> : null}
            </form>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Our location</h2>
            <p className="mt-2 text-sm text-slate-600">Visit our office in Mumbai for one-on-one advisory discussions.</p>
            <div className="mt-5 grid h-80 place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              Map integration area
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
