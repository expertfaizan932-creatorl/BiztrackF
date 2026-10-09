"use client";

import { PlayCircle, Youtube } from "lucide-react";
import { Button } from "../ui/button";

export const TUTORIAL_VIDEO_ID = "6A9UKNtX6jQ";
export const TUTORIAL_VIDEO_URL = `https://youtu.be/${TUTORIAL_VIDEO_ID}`;
export const TUTORIAL_WATCH_URL = `https://www.youtube.com/watch?v=${TUTORIAL_VIDEO_ID}`;

export function TutorialVideo() {
  return (
    <figure className="mt-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lg">
        <iframe
          src="https://www.youtube-nocookie.com/embed/6A9UKNtX6jQ?autoplay=1&rel=0&modestbranding=1&playsinline=1"
          title="BizTrack Tutorial – Complete Video Walkthrough"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <figcaption className="mt-3 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500">
          Watch the full BizTrack walkthrough video tutorial.
        </p>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-red-200 text-red-700 hover:bg-red-50"
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
