import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quellsystems.com"),
  title: {
    default: "Quell Systems — Software de gestión a medida y por suscripción",
    template: "%s · Quell Systems",
  },
  description:
    "Quell Supply, Clinic y Coach: sistemas por suscripción para abastecimiento, salud y fitness. Más ERP y SaaS a medida y landing pages. Construimos el sistema que tu equipo ya está improvisando en planillas.",
  keywords: [
    "Quell Systems",
    "Quell Supply",
    "Quell Clinic",
    "Quell Coach",
    "software a medida",
    "ERP a medida",
    "software de stock y compras",
    "historia clínica digital",
    "software para entrenadores personales",
    "landing page",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Quell Systems",
    title: "Quell Systems — Software de gestión a medida y por suscripción",
    description:
      "Quell Supply, Clinic y Coach: sistemas por suscripción para abastecimiento, salud y fitness. Más software a medida y landing pages.",
  },
  icons: {
    icon: "/brand/quell-simbolo-navy.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
