import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { MarketingPageShell } from "@/src/components/marketing/MarketingPageShell";
import { TutorialVideo } from "@/src/components/landing/TutorialVideo";

export const metadata: Metadata = {
  title: "BizTrack Tutorial – Video Guide & Walkthrough | BizTrack",
  description:
    "Watch the official BizTrack tutorial video and read our step-by-step guide to learn how to manage projects, sales, HR, inventory and reports in one business management platform.",
  keywords: [
    "BizTrack tutorial",
    "BizTrack video guide",
    "business management software tutorial",
    "ERP demo video",
    "project management tutorial",
    "how to use BizTrack",
    "BizTrack walkthrough",
  ],
  openGraph: {
    title: "BizTrack Tutorial – Video Guide & Walkthrough",
    description:
      "Watch the official BizTrack tutorial video and learn how to run your entire business from one dashboard.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizTrack Tutorial – Video Guide & Walkthrough",
    description:
      "Watch the official BizTrack tutorial video and learn how to run your entire business from one dashboard.",
  },
};

const WHAT_YOU_WILL_LEARN = [
  "How to create your BizTrack workspace and invite your team members",
  "Navigating the unified dashboard for sales, projects, HR and inventory",
  "Managing customers, leads and deals with the built-in CRM",
  "Creating invoices, tracking payments and monitoring cash flow",
  "Running reports and business analytics to make data-driven decisions",
] as const;

const GETTING_STARTED_STEPS = [
  {
    title: "Create your free account",
    description:
      "Start your free trial from the signup page and verify your email address to activate your workspace.",
  },
  {
    title: "Set up your workspace",
    description:
      "Add your company name, logo, currency and tax settings so everything matches your business.",
  },
  {
    title: "Invite your team",
    description:
      "Add employees, assign roles and permissions, and let everyone collaborate in real time.",
  },
  {
    title: "Add your data",
    description:
      "Import customers, products, inventory and existing invoices to get a complete picture on day one.",
  },
  {
    title: "Explore the modules",
    description:
      "Switch between CRM, projects, HR, POS, accounting and reports — all included in your plan.",
  },
] as const;

const FAQS = [
  {
    question: "Is the BizTrack tutorial video free to watch?",
    answer:
      "Yes. The BizTrack tutorial is completely free. You can watch it on this page or open it directly on YouTube — no account or subscription is required.",
  },
  {
    question: "How long does it take to learn BizTrack?",
    answer:
      "Most teams are up and running in under 30 minutes. The tutorial walks you through signup, workspace setup and the core modules step by step.",
  },
  {
    question: "Do I need any technical skills to use BizTrack?",
    answer:
      "No. BizTrack is a no-code, cloud-based platform. If you can use a browser, you can manage sales, projects, HR and inventory with BizTrack.",
  },
  {
    question: "Can I try BizTrack after watching the tutorial?",
    answer:
      "Absolutely. Every plan starts with a free trial, so you can follow along with the tutorial inside your own live workspace.",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VideoObject",
      name: "BizTrack Tutorial – Complete Video Walkthrough",
      description:
        "Official BizTrack tutorial showing how to manage projects, sales, HR, inventory and reports from a single business management dashboard.",
      thumbnailUrl: [
        `https://i.ytimg.com/vi/6A9UKNtX6jQ/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/6A9UKNtX6jQ/hqdefault.jpg`,
      ],
      uploadDate: "2024-01-01",
      duration: "PT10M",
      embedUrl: "https://www.youtube-nocookie.com/embed/6A9UKNtX6jQ",
      contentUrl: "https://www.youtube.com/watch?v=6A9UKNtX6jQ",
      publisher: {
        "@type": "Organization",
        name: "BizTrack",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Tutorial" },
      ],
    },
  ],
};

export default function TutorialPage() {
  return (
    <MarketingPageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Video Tutorial
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          BizTrack Tutorial: See How BizTrack Works
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          New to BizTrack? This official video tutorial shows you exactly how
          the platform works — from creating your workspace to managing
          customers, projects, staff, inventory and reports from one clean
          dashboard. Watch the video below, then follow the written guide to get
          the most out of your free trial.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {WHAT_YOU_WILL_LEARN.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700"
            >
              {item}
            </li>
          ))}
        </ul>

        <TutorialVideo />

        <section className="mt-12" aria-labelledby="what-you-learn">
          <h2
            id="what-you-learn"
            className="text-2xl font-semibold text-slate-900"
          >
            What You&apos;ll Learn in This Tutorial
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            The BizTrack walkthrough covers the complete workflow a growing
            business needs day to day. Instead of juggling spreadsheets and
            disconnected tools, you&apos;ll see how a single platform connects
            your sales pipeline, delivery teams and finances.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {WHAT_YOU_WILL_LEARN.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <h3 className="font-semibold text-slate-900">{item}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Follow along in the video to see each step performed live
                  inside a real BizTrack workspace.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="getting-started">
          <h2
            id="getting-started"
            className="text-2xl font-semibold text-slate-900"
          >
            Step-by-Step: Getting Started with BizTrack
          </h2>
          <ol className="mt-4 space-y-4">
            {GETTING_STARTED_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12" aria-labelledby="why-watch">
          <h2 id="why-watch" className="text-2xl font-semibold text-slate-900">
            Why Watch the BizTrack Video Tutorial?
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Reading documentation is useful, but watching the product in action
            is the fastest way to understand it. This tutorial gives you a
            realistic look at the interface, the navigation and the reports you
            will use every day — so you can decide in minutes whether BizTrack
            is the right fit for your business.
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">
            Prefer reading? Explore our{" "}
            <Link
              href="/about"
              className="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-800"
            >
              company page
            </Link>{" "}
            to learn more about our mission, or{" "}
            <Link
              href="/contact"
              className="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-800"
            >
              contact our team
            </Link>{" "}
            for a personalised demo.
          </p>
        </section>

        <section className="mt-12" aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-semibold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Ready to try it yourself?
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Start your free trial and follow the tutorial inside your own
              workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </article>
    </MarketingPageShell>
  );
}
