import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { RETELL_ENHANCED_INFRASTRUCTURE } from "@/lib/retell-enhanced";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Coccinelle.ai - Call Center IA Multi-Secteurs | Retell Enhanced",
  description: "Coccinelle.ai - Centre d'appels IA multi-secteurs. L'Intelligence Artificielle au service de TOUS les métiers. Fast Tier OpenAI, Retell Enhanced, Chat Widget adaptatif.",
  keywords: [
    "call center IA",
    "intelligence artificielle",
    "centre d'appels",
    "e-commerce",
    "santé",
    "finance",
    "immobilier",
    "Retell Enhanced",
    "Fast Tier OpenAI",
    "Chat Widget",
    "Custom Functions",
    "France",
    "SaaS"
  ],
  authors: [{ name: "Coccinelle.ai Team" }],
  creator: "Coccinelle.ai",
  publisher: "Coccinelle.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://coccinelle.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Coccinelle.ai - Call Center IA Multi-Secteurs",
    description: "L'Intelligence Artificielle au service de TOUS les métiers. Transformez votre entreprise avec notre centre d'appels IA qui s'adapte automatiquement à votre secteur d'activité.",
    url: 'https://coccinelle.ai',
    siteName: 'Coccinelle.ai',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coccinelle.ai - Call Center IA Multi-Secteurs',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coccinelle.ai - Call Center IA Multi-Secteurs',
    description: 'L\'Intelligence Artificielle au service de TOUS les métiers',
    images: ['/twitter-image.jpg'],
    creator: '@coccinelle_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#2563EB" />
        <meta name="msapplication-TileColor" content="#2563EB" />
        
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Coccinelle.ai",
              "description": "Call Center IA Multi-Secteurs avec Retell Enhanced",
              "url": "https://coccinelle.ai",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "description": "Essai gratuit 14 jours"
              },
              "provider": {
                "@type": "Organization",
                "name": "Coccinelle.ai",
                "url": "https://coccinelle.ai"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Analytics (à configurer) */}
        {/* <GoogleAnalytics /> */}
        
        {/* Main content */}
        <main>
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-neutral-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Coccinelle.ai</h3>
                <p className="text-neutral-400 text-sm">
                  L&apos;Intelligence Artificielle au service de TOUS les métiers.
                  Call Center IA multi-secteurs avec Retell Enhanced.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Secteurs</h4>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li>🛒 E-commerce & Retail</li>
                  <li>🏥 Santé & Médical</li>
                  <li>💰 Finance & Banque</li>
                  <li>🏠 Immobilier</li>
                  <li>🚗 Automobile</li>
                  <li>🎓 Éducation</li>
                  <li>🏢 B2B Services</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Fonctionnalités</h4>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li>⚡ Fast Tier OpenAI</li>
                  <li>💬 Chat Widget Multi-Secteurs</li>
                  <li>🔧 Custom Functions Enhanced</li>
                  <li>📊 Analytics Sectorielles</li>
                  <li>🔒 Compliance Multi-Secteurs</li>
                  <li>📞 Support 7j/7</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li>📞 {RETELL_ENHANCED_INFRASTRUCTURE.twilioNumber}</li>
                  <li>📧 contact@coccinelle.ai</li>
                  <li>🌐 coccinelle.ai</li>
                  <li>📍 France</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
              <p>&copy; 2024 Coccinelle.ai. Tous droits réservés. Propulsé par Retell Enhanced.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
