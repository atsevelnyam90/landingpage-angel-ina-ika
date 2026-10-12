"use client";

import { ArrowUpRight, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { videoCategories, videos } from "@/config/videos";

type Video = (typeof videos)[number];

export function VideoGallery() {
  const [selected, setSelected] = useState<Video | null>(null);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);

  return (
    <>
      {videoCategories.map((category) => (
        <section
          className="video-category"
          key={category.id}
          aria-labelledby={`video-category-${category.id}`}
        >
          <h3 className="video-category-title" id={`video-category-${category.id}`}>
            {category.title}
          </h3>
          <div className="portfolio-grid">
            {category.videoIds
              .map((id) => videos.find((video) => video.id === id))
              .filter((video): video is Video => Boolean(video))
              .map((video, index) => (
                <button
                  className="film-card"
                  key={video.id}
                  type="button"
                  onClick={() => {
                    setFailed(false);
                    setSelected(video);
                  }}
                  aria-label={`${video.title} — видео үзэх`}
                >
                  <div className="film-image">
                    <Image
                      className="film-photo"
                      src={video.poster}
                      alt=""
                      fill
                      sizes="(max-width: 720px) 90vw, (max-width: 1050px) 45vw, 30vw"
                    />
                    <div className="film-hover-caption">
                      <span>{category.title}</span>
                      <strong>{video.title}</strong>
                    </div>
                    <span className="film-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="play-icon">
                      <Play size={23} fill="currentColor" />
                    </span>
                    <span className="film-tag">{category.title}</span>
                  </div>
                  <div className="film-caption">
                    <h4>{video.title}</h4>
                    <ArrowUpRight size={22} />
                  </div>
                </button>
              ))}
          </div>
        </section>
      ))}
      <dialog
        ref={dialog}
        className="video-dialog"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <>
            <div className="dialog-heading">
              <h3>{selected.title}</h3>
              <button type="button" onClick={() => setSelected(null)} aria-label="Хаах">
                <X />
              </button>
            </div>
            {selected.isDemo && (
              <p className="demo-note">Түр демо видео · Бодит бичлэг удахгүй нэмэгдэнэ.</p>
            )}
            {/* biome-ignore lint/a11y/useMediaCaption: No caption transcripts were supplied for this footage. Add verified captions when available. */}
            <video
              key={selected.id}
              controls
              autoPlay
              playsInline
              preload="none"
              onError={() => setFailed(true)}
              aria-label={selected.title}
            >
              <source src={selected.src} type="video/mp4" />
              Таны хөтөч видео тоглуулах боломжгүй байна.
            </video>
            {failed && <p role="alert">Видео ачаалсангүй. Дахин оролдоно уу.</p>}
          </>
        )}
      </dialog>
    </>
  );
}
