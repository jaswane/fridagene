import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Analytics } from "@/components/Analytics";
import { SITE } from "@/lib/site";
import { getCurrentYear } from "@/lib/currentYear";
import {
  jsonLdScript,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Fridagene.no — Helligdager, langhelger og fridager i Norge",
    template: "%s · Fridagene.no",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: SITE.url,
    siteName: SITE.name,
    title: "Fridagene.no — Helligdager, langhelger og fridager i Norge",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fridagene.no",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F1" },
    { media: "(prefers-color-scheme: dark)", color: "#12161E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = getCurrentYear();
  return (
    <html
      lang="nb"
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([organizationSchema(), websiteSchema()]),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SiteHeader currentYear={currentYear} />
        <main className="flex-1">{children}</main>
        <SiteFooter currentYear={currentYear} />
        <Analytics />
      </body>
    </html>
  );
}
