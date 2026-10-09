import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import "../../styles/eventflow.css";
import "../../styles/eventflow-responsive.css";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  openGraph: { title: site.name, description: site.description, type: "website" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn">
      <body className="body-bg-color-1">{children}</body>
    </html>
  );
}
