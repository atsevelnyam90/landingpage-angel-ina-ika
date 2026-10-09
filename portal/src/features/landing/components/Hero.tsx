"use client";

import { ArrowRight, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { heroVideo } from "@/config/videos";

export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (paused || reduced || failed) {
      element.pause();
      return;
    }
    let frame: number | undefined;
    const loopOpening = () => {
      if (element.currentTime >= heroVideo.endSeconds) {
        element.currentTime = 0;
        void element.play().catch(() => setPaused(true));
      }
      if (element.requestVideoFrameCallback) frame = element.requestVideoFrameCallback(loopOpening);
    };
    void element.play().catch(() => setPaused(true));
    if (element.requestVideoFrameCallback) frame = element.requestVideoFrameCallback(loopOpening);
    return () => {
      if (frame !== undefined) element.cancelVideoFrameCallback(frame);
      element.pause();
    };
  }, [paused, reduced, failed]);

  return (
    <section
      className="main-slider angel-template-hero video-hero"
      id="home"
      aria-label="Angel Event танилцуулга"
    >
      <div
        className="hero-video-background"
        style={{ backgroundImage: `url('${heroVideo.poster}')` }}
      >
        {!reduced && !failed && (
          <video
            ref={video}
            className={`hero-background-video ${ready ? "is-ready" : ""}`}
            muted
            autoPlay
            playsInline
            preload="metadata"
            poster={heroVideo.poster}
            aria-hidden="true"
            tabIndex={-1}
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
            onTimeUpdate={(event) => {
              if (event.currentTarget.currentTime >= heroVideo.endSeconds)
                event.currentTarget.currentTime = 0;
            }}
            onEnded={(event) => {
              event.currentTarget.currentTime = 0;
              if (!paused) void event.currentTarget.play().catch(() => setPaused(true));
            }}
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero-video-overlay" />
      <div className="swiper-slide swiper-slide-active">
        <div className="container template-hero-grid">
          <div className="main-slider__content">
            <p className="main-slider__sub-title">ANGEL EVENT</p>
            <h1 className="main-slider__title">
              Таны баярыг
              <br />
              <span>дурсамж болгоно.</span>
            </h1>
            <p className="main-slider__text">
              Таны мөч. Бидний санаа. Нандин дурсамж.
              <br />
              Арга хэмжээний санаанаас хэрэгжүүлэлт хүртэлх бүхнийг нэг дор.
            </p>
            <ul className="main-slider__address">
              <li>
                <MapPin size={16} />
                <span>Улаанбаатар, Монгол</span>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+97699108525">9910-8525</a>
              </li>
            </ul>
            <div className="main-slider__btn-box">
              <a href="#contact" className="thm-btn">
                Хамтдаа төлөвлөе <ArrowRight size={21} />
              </a>
            </div>
          </div>
        </div>
        {!reduced && !failed && (
          <button
            className="hero-motion-control"
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
          >
            {paused ? "Видео үргэлжлүүлэх" : "Видео зогсоох"}
          </button>
        )}
      </div>
    </section>
  );
}
