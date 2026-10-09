import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  LayoutDashboard,
  LineChart,
  Package,
  PlayCircle,
  FileText,
  Rocket,
  ShieldCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { MarketingPageShell } from "@/src/components/marketing/MarketingPageShell";
import { TutorialVideo } from "@/src/components/landing/TutorialVideo";
import { cn } from "@/src/lib/utils";

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

type Accent = "blue" | "green";

const accentStyles: Record<
  Accent,
  { card: string; icon: string; eyebrow: string }
> = {
  blue: {
    card: "border-blue-200/70 bg-gradient-to-br from-blue-50/90 to-white hover:border-blue-300",
    icon: "bg-blue-600 text-white",
    eyebrow: "text-blue-700",
  },
  green: {
    card: "border-emerald-200/70 bg-gradient-to-br from-emerald-50/90 to-white hover:border-emerald-300",
    icon: "bg-emerald-600 text-white",
    eyebrow: "text-emerald-700",
  },
};

const HERO_FACTS: { icon: LucideIcon; label: string }[] = [
  { icon: Clock, label: "10-minute walkthrough" },
  { icon: Rocket, label: "Beginner friendly" },
  { icon: ShieldCheck, label: "Free to watch" },
];

const WHAT_YOU_WILL_LEARN: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: Accent;
}[] = [
  {
    icon: UserPlus,
    title: "Create your workspace",
    description:
      "Sign up, add your company details and invite your team in a few clicks.",
    accent: "blue",
  },
  {
    icon: LayoutDashboard,
    title: "Master the dashboard",
    description:
      "Navigate sales, projects, HR and inventory from one unified home screen.",
    accent: "green",
  },
  {
    icon: Users,
    title: "Manage CRM & customers",
    description:
      "Track leads, contacts and deals through a visual sales pipeline.",
    accent: "blue",
  },
  {
    icon: FileText,
    title: "Invoices & payments",
    description:
      "Create quotes and invoices, then monitor payments and cash flow.",
    accent: "green",
  },
  {
    icon: Package,
    title: "Track inventory",
    description:
      "Control stock, purchase orders and multi-location warehouses with alerts.",
    accent: "blue",
  },
  {
    icon: LineChart,
    title: "Reports & analytics",
    description:
      "Turn live business data into clear dashboards and make faster decisions.",
    accent: "green",
  },
];

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
];

const WHY_WATCH = [
  "Learn visually in minutes instead of reading long documentation",
  "See real workflows performed inside a live BizTrack workspace",
  "Follow along step by step with your own free trial",
  "Understand every core module end to end",
];

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
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VideoObject",
      name: "BizTrack Tutorial – Complete Video Walkthrough",
      description:
        "Official BizTrack tutorial showing how to manage projects, sales, HR, inventory and reports from a single business management dashboard.",
      thumbnailUrl: [
        "https://i.ytimg.com/vi/6A9UKNtX6jQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/6A9UKNtX6jQ/hqdefault.jpg",
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

      <div className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/60 px-5 py-12 shadow-sm sm:px-10 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-blue-300/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl"
          />

          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800">
              <PlayCircle className="h-4 w-4" />
              Video Tutorial
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              See How BizTrack Works
              <span className="block bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent">
                in One Quick Video
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Watch the official BizTrack walkthrough and discover how to manage
              customers, projects, staff, inventory and reports from a single,
              clean dashboard.
            </p>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {HERO_FACTS.map((fact) => (
                <li
                  key={fact.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
                >
                  <fact.icon className="h-4 w-4 text-emerald-600" />
                  {fact.label}
                </li>
              ))}
            </ul>
          </div>

          <TutorialVideo />
        </section>

        <section className="mt-14" aria-labelledby="what-you-learn">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Tutorial Overview
            </p>
            <h2
              id="what-you-learn"
              className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              What You&apos;ll Learn
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              The video covers the complete workflow a growing business needs
              every day — all inside one connected platform.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_YOU_WILL_LEARN.map((item) => {
              const styles = accentStyles[item.accent];
              return (
                <Card
                  key={item.title}
                  className={cn(
                    "border shadow-sm transition-all duration-300 hover:shadow-md",
                    styles.card,
                  )}
                >
                  <CardHeader className="pb-2">
                    <div
                      className={cn(
                        "mb-3 flex h-11 w-11 items-center justify-center rounded-xl",
                        styles.icon,
                      )}
                    >
                      <item.icon className="h-5 w-5" aria-hidden />
                    </div>
                    <CardTitle className="text-lg text-slate-900">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="getting-started">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Step by Step
            </p>
            <h2
              id="getting-started"
              className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Getting Started with BizTrack
            </h2>
          </div>

          <ol className="relative mt-8 space-y-4">
            {GETTING_STARTED_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="why-watch">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/50 p-6 sm:p-8">
            <h2
              id="why-watch"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Why Watch the BizTrack Tutorial?
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <p className="leading-relaxed text-slate-600">
                Reading documentation is useful, but watching the product in
                action is the fastest way to understand it. This tutorial gives
                you a realistic look at the interface, the navigation and the
                reports you will use every day — so you can decide in minutes
                whether BizTrack is right for your business.
              </p>
              <ul className="space-y-3">
                {WHY_WATCH.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="faq">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              FAQ
            </p>
            <h2
              id="faq"
              className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md"
              >
                <h3 className="flex items-start gap-2 font-semibold text-slate-900">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  {faq.question}
                </h3>
                <p className="mt-2 pl-7 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-emerald-600 p-8 text-center text-white shadow-lg sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          />
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to try it yourself?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-50">
            Start your free trial and follow the tutorial inside your own live
            workspace — no credit card required.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-auto bg-white px-8 py-4 text-base text-blue-800 hover:bg-blue-50"
            >
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto border-white/60 bg-transparent px-8 py-4 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Book a Demo</Link>
            </Button>
          </div>
        </section>
      </div>
    </MarketingPageShell>
  );
}
