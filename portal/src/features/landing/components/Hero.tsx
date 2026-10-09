"use client";

import { ArrowRight, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { image: "/images/events/event-after.jpg", alt: "Балетын тоглолтын агшин" },
  { image: "/images/events/leaders.jpg", alt: "Leaders шинэ жилийн баярын агшин" },
  { image: "/images/events/bsg.jpg", alt: "Тайзны тоглолтын агшин" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || reduced) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 8000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, reduced]);
  return (
    <section
      className="main-slider angel-template-hero"
      id="home"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      aria-label="Angel Event танилцуулга"
    >
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
          <div className="template-hero-art">
            <Image
              className="template-orbit"
              src="/eventflow/images/shapes/main-slider-shape-1.png"
              alt=""
              width={870}
              height={600}
            />
            <Image
              className="template-dots"
              src="/eventflow/images/shapes/main-slider-shape-2.png"
              alt=""
              width={280}
              height={210}
            />
            <div className="hero-photo-stack">
              {slides.map((slide, index) => (
                <Image
                  key={slide.image}
                  className={`template-photo ${active === index ? "photo-active" : ""}`}
                  src={slide.image}
                  alt={active === index ? slide.alt : ""}
                  aria-hidden={active !== index}
                  width={555}
                  height={600}
                  priority={index === 0}
                  sizes="(max-width: 767px) 90vw, 45vw"
                />
              ))}
            </div>
            <Image
              className="template-star star-one"
              src="/eventflow/images/shapes/main-slider-star-1.png"
              alt=""
              width={50}
              height={50}
            />
            <Image
              className="template-star star-two"
              src="/eventflow/images/shapes/main-slider-star-3.png"
              alt=""
              width={50}
              height={50}
            />
          </div>
        </div>
        <button
          className="hero-motion-control"
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
        >
          {paused ? "Зураг солих хөдөлгөөн үргэлжлүүлэх" : "Зураг солих хөдөлгөөн зогсоох"}
        </button>
        <nav className="template-pagination" aria-label="Зураг сонгох">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Зураг ${index + 1}`}
              aria-pressed={active === index}
              className={active === index ? "is-active" : ""}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
