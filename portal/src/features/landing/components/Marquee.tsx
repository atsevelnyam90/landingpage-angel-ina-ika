"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const phrases = ["Нэг санаа", "Нэг баг", "Нэг цогц шийдэл"];

export function Marquee() {
  const group = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const measure = () => {
      const width = group.current?.getBoundingClientRect().width ?? 0;
      track.current?.style.setProperty("--marquee-duration", `${width / 40}s`);
    };
    const observer = new ResizeObserver(measure);
    if (group.current) observer.observe(group.current);
    measure();
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className={`flow-marquee ${paused ? "is-paused" : ""}`}
      aria-label="Нэг санаа. Нэг баг. Нэг цогц шийдэл."
    >
      <div className="marquee-window" aria-hidden="true">
        <div ref={track} className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} ref={copy === 0 ? group : undefined} className="marquee-group">
              {phrases.map((phrase) => (
                <div key={phrase} className="marquee-item">
                  <span data-hover={phrase}>{phrase}</span>
                  <Image src="/eventflow/images/icon/star-icon.png" alt="" width={80} height={80} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="marquee-control"
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
      >
        {paused ? "Хөдөлгөөн үргэлжлүүлэх" : "Хөдөлгөөн зогсоох"}
      </button>
    </section>
  );
}
