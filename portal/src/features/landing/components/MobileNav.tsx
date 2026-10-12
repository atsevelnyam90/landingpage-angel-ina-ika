import { site } from "@/config/site";

export function MobileNav() {
  return (
    <nav className="mobile-section-tabs" aria-label="Гар утасны цэс">
      {site.nav.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
