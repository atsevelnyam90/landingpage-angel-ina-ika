import {
  ArrowUpRight,
  Building2,
  Check,
  Crown,
  Heart,
  Mail,
  MapPin,
  Music2,
  Palette,
  Phone,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/config/site";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { MotionEffects } from "./MotionEffects";
import { VideoGallery } from "./VideoGallery";

const icons = {
  heart: Heart,
  building: Building2,
  sparkles: Sparkles,
  crown: Crown,
  music: Music2,
  palette: Palette,
};

const serviceArtwork: Record<string, string> = {
  heart: "/images/icons/wedding.png",
  building: "/images/icons/company-event.png",
  sparkles: "/images/icons/birthday.png",
};

function Heading({ label, title }: { label: string; title: string }) {
  return (
    <div className="section-title">
      <div className="section-title__tagline-box">
        <span className="section-title__tagline">{label}</span>
      </div>
      <h2 className="section-title__title" aria-label={title}>
        {title.split(" ").map((word, wordIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Static text characters never reorder.
          <span className="heading-word" aria-hidden="true" key={`${wordIndex}-${word}`}>
            {Array.from(word).map((character, index) => (
              <span
                className="heading-char"
                // biome-ignore lint/suspicious/noArrayIndexKey: Static character offsets identify repeated letters.
                key={`${index}-${character}`}
                style={
                  {
                    "--char-delay": `${(title.split(" ").slice(0, wordIndex).join(" ").length + index) * 20}ms`,
                  } as CSSProperties
                }
              >
                {character}
              </span>
            ))}{" "}
          </span>
        ))}
      </h2>
    </div>
  );
}

export function LandingScreen() {
  return (
    <>
      <MotionEffects />
      <a className="skip-link" href="#main">
        Үндсэн агуулга руу
      </a>
      <header className="angel-header main-header">
        <div className="container header-inner">
          <a className="angel-brand" href="#home" aria-label="Angel Event нүүр">
            <Image src="/images/brand/angel-emblem.png" alt="" width={52} height={52} />
            <span>
              ANGEL <b>EVENT</b>
              <small>ANGEL INA ICA LLC</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Үндсэн цэс">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-phone thm-btn" href="#contact">
            Захиалга өгөх <ArrowUpRight size={20} />
          </a>
          <details className="mobile-nav">
            <summary>Цэс</summary>
            <nav aria-label="Гар утасны цэс">
              {site.nav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>
      <main id="main">
        <Hero />
        <section className="angel-section services-one services-area" id="services">
          <div className="container">
            <div className="center-heading">
              <Heading label="Бидний үйлчилгээ" title="БҮХНИЙГ НЭГ ДОР. БҮХНИЙГ АНЖЕЛ EVENT." />
            </div>
            <div className="service-grid">
              {site.services.map((service) => {
                const Icon = icons[service.icon as keyof typeof icons];
                return (
                  <article className="services-one__single" key={service.title}>
                    <div className="services-one__icon">
                      {serviceArtwork[service.icon] ? (
                        <Image
                          className="service-artwork"
                          src={serviceArtwork[service.icon]}
                          alt=""
                          width={30}
                          height={30}
                        />
                      ) : (
                        <Icon size={30} />
                      )}
                    </div>
                    <h3 className="services-one__title">{service.title}</h3>
                    <p className="services-one__text">{service.text}</p>
                    <a className="services-one__read-more" href="#contact">
                      Дэлгэрэнгүй харах <ArrowUpRight size={18} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <Marquee />
        <section className="angel-section" id="portfolio">
          <div className="container">
            <div className="section-top">
              <Heading label="Эвентүүд" title="Мөч өнгөрнө. Дурсамж үлдэнэ." />
              <p>
                Баяр, тоглолт, байгууллагын арга хэмжээний
                <br />
                онцлох агшнуудтай танилцаарай.
              </p>
            </div>
            <VideoGallery />
          </div>
        </section>
        <section className="angel-section why-section" id="benefits">
          <div className="container">
            <div className="event-one__inner">
              <div className="customer-values benefits-philosophy">
                <Heading
                  label="БИДНИЙ ДАВУУ ТАЛ"
                  title="БИДНИЙ ФИЛОСОФИ “EVENT IS NOT JUST AN EVENT.”"
                />
                <p>
                  Арга хэмжээ нэг өдөр үргэлжилж болно. Харин тэр өдрийн мэдрэмж, инээмсэглэл,
                  догдлол, дурсамж олон жил хадгалагдана.
                </p>
                <p>
                  Хөтлөгчөө хаанаас хайх вэ? Хамтлагаа хэн сонгох вэ? Тайз, чимэглэлээ хэн хийх вэ?
                  Зочдоо хэн угтах вэ? Видео, фото багийг хэн хариуцах вэ?
                </p>
                <p>
                  Та санаа зовох шаардлагагүй.{" "}
                  <strong>БҮХНИЙГ НЭГ ДОР. БҮХНИЙГ АНЖЕЛ EVENT.</strong>
                </p>
              </div>
              <div className="production-list">
                {[
                  "Хөтлөгч",
                  "Хамтлаг & дуучин",
                  "DJ & хөгжмийн шийдэл",
                  "Тайз & чимэглэл",
                  "Зочин угталт & welcome service",
                  "Фото & видео баг",
                  "Гэрэл, дуу, дэлгэц",
                  "Шоу хөтөлбөр & entertainment",
                  "Event planning & зохион байгуулалт",
                ].map((item) => (
                  <span key={item}>
                    <Check size={15} />
                    {item}
                  </span>
                ))}
              </div>
              <Heading
                label="ЯАГААД ANGEL EVENT-Г СОНГОХ ВЭ?"
                title="ТАНЫ МӨЧ. БИДНИЙ САНАА. НАНДИН ДУРСАМЖ."
              />
              <div className="benefit-grid">
                {site.benefits.map((benefit, index) => (
                  <article key={benefit.title}>
                    <span className="benefit-number">0{index + 1}</span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </article>
                ))}
              </div>
              <p className="benefits-closing">
                Бид бүхэл бүтэн арга хэмжээг нэг баг, нэг стандарт, нэг хариуцлагаар удирдан зохион
                байгуулна. Та зөвхөн зочдоо угтаж, баяраа тэмдэглэж, мөчөө мэдрэхэд анхаар. Харин
                үлдсэн бүхнийг — <strong>АНЖЕЛ EVENT ХАРИУЦНА.</strong>
              </p>
            </div>
          </div>
        </section>
        <section className="angel-section" id="event-hall">
          <div className="container">
            <Heading label="Event hall" title="Арга хэмжээний танхим" />
            <a className="thm-btn" href="#contact">
              Танхимын талаар лавлах <ArrowUpRight size={20} />
            </a>
          </div>
        </section>
        <section className="angel-section event-one customer-about" id="about">
          <div className="container">
            <div className="event-one__inner">
              <div className="event-one__top">
                <Heading label="Бидний тухай" title="Анжел Ина Ика компаний танилцуулга" />
              </div>
              <div className="customer-introduction">
                <p>
                  Анжел Event нь хурим, найр, байгууллагын ойн баяр, хүлээн авалт, төрсөн өдөр,
                  нээлт, VIP болон тусгай арга хэмжээг мэргэжлийн түвшинд төлөвлөж, зохион
                  байгуулдаг эвент менежментийн компани юм.
                </p>
                <p>
                  Бид үйлчлүүлэгчийнхээ хүсэл, хэрэгцээ, онцлогт тулгуурлан санаанаас хэрэгжүүлэлт
                  хүртэлх бүх үйл явцыг нэг дор шийдэж, үйл явдал бүрт өөрийн гэсэн өнгө төрх, үнэ
                  цэнэ, дурсамжийг бүтээнэ.
                </p>
              </div>
              <div className="customer-values">
                <article>
                  <h3>БИДНИЙ ҮНЭ ЦЭН</h3>
                  <p>
                    Бидний хувьд эвент гэдэг нь зөвхөн тайз, хөгжим, чимэглэл биш. Энэ бол хүмүүсийн
                    инээмсэглэл, догдлол, хамтдаа өнгөрүүлсэн мөч, олон жилийн дараа ч дурсан ярих
                    дурсамж юм. Тиймээс бид арга хэмжээ бүрийг үйлчлүүлэгчийнхээ онцлогт тохируулан
                    санаачилгатай, нарийн төлөвлөлттэй, чанартай гүйцэтгэлтэйгээр бүтээдэг.
                  </p>
                </article>
                <article>
                  <h3>БИДНИЙ ЗОРИЛГО</h3>
                  <p>
                    Үйлчлүүлэгч бүрийн хүсэл мөрөөдлийг бодит болгон, өвөрмөц концепц, бүтээлч
                    санаа, мэргэжлийн зохион байгуулалт, чанартай үйлчилгээгээр үнэ цэнтэй арга
                    хэмжээг бүтээх.
                  </p>
                </article>
                <article>
                  <h3>БИДНИЙ АЛСЫН ХАРАА</h3>
                  <p>
                    Монголын эвент менежментийн салбарт чанар, бүтээлч байдал, шинэ санаа,
                    мэргэжлийн зохион байгуулалтаараа тэргүүлэгч, үйлчлүүлэгчдийнхээ итгэлт түнш
                    болсон Монголын анхны ISO чанарын шаардлага хангасан эвент компани байх.
                  </p>
                </article>
              </div>
              <div className="event-one__img-box customer-event-image">
                <Image
                  src="/images/events/bsg-poster.jpg"
                  alt="Ballet Stars Gala тоглолтын постер"
                  width={1920}
                  height={945}
                  sizes="(max-width: 767px) 90vw, 80vw"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="angel-section contact-area" id="contact">
          <div className="container contact-grid">
            <div>
              <p className="hero-kicker">Анжел Event - Дурсамжийг бүтээхийн төлөө ажиллана.</p>
              <h2>
                Та баяраа мэдэр.
                <br />
                <span>Бид бүхнийг зохицуулъя.</span>
              </h2>
              <p>Таны арга хэмжээний санаа, хүсэл, төлөвлөгөөг сонсоход бэлэн байна.</p>
            </div>
            <address>
              <a href="tel:+97699108525">
                <Phone />
                <span>
                  <small>Утас</small>9910-8525
                </span>
                <ArrowUpRight />
              </a>
              <a href="tel:+97688106464">
                <Phone />
                <span>
                  <small>Утас</small>8810-6464
                </span>
                <ArrowUpRight />
              </a>
              <a href={`mailto:${site.email}`}>
                <Mail />
                <span>
                  <small>И-мэйл</small>
                  {site.email}
                </span>
                <ArrowUpRight />
              </a>
              <div>
                <MapPin />
                <span>
                  <small>Манай хаяг</small>
                  {site.address}
                </span>
              </div>
            </address>
          </div>
        </section>
      </main>
      <footer className="angel-footer">
        <div className="container">
          <a className="angel-brand" href="#home">
            <Image src="/images/brand/angel-emblem.png" alt="" width={42} height={42} />
            ANGEL <b>EVENT</b>
          </a>
          <p>© {new Date().getFullYear()} Анжел Ина Ика ХХК.</p>
          <a href="#home">Эхлэл рүү ↑</a>
        </div>
      </footer>
    </>
  );
}
