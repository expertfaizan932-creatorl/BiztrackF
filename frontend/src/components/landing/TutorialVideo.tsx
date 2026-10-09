"use client";

import { PlayCircle, Youtube } from "lucide-react";
import { Button } from "../ui/button";

export const TUTORIAL_VIDEO_ID = "6A9UKNtX6jQ";
export const TUTORIAL_VIDEO_URL = `https://youtu.be/${TUTORIAL_VIDEO_ID}`;
export const TUTORIAL_WATCH_URL = `https://www.youtube.com/watch?v=${TUTORIAL_VIDEO_ID}`;

export function TutorialVideo() {
  return (
    <figure className="relative mx-auto mt-10 w-full max-w-3xl sm:mt-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-r from-blue-500/25 via-emerald-400/25 to-blue-500/25 blur-xl"
      />

      <div className="relative overflow-hidden rounded-3xl border border-slate-700/40 bg-slate-900 shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/80 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
          <span className="ml-2 truncate text-xs font-medium text-slate-300">
            BizTrack Tutorial — Full Walkthrough
          </span>
        </div>

        <div className="relative aspect-video w-full">
          <iframe
            src="https://www.youtube-nocookie.com/embed/6A9UKNtX6jQ?autoplay=1&rel=0&modestbranding=1&playsinline=1"
            title="BizTrack Tutorial – Complete Video Walkthrough"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      <figcaption className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <p className="text-sm text-slate-500">
          Watch the full BizTrack video tutorial below.
        </p>
        <Button
          asChild
          size="sm"
          className="bg-red-600 text-white hover:bg-red-700"
        >
          <a
            href={TUTORIAL_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open BizTrack tutorial video on YouTube"
          >
            <Youtube className="mr-2 h-4 w-4" />
            Watch on YouTube
            <PlayCircle className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </figcaption>
    </figure>
  );
}
