import type { Metadata } from 'next';
import { Caveat, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const caveat = Caveat({
  variable: '--font-hand',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://avery-rowan-portfolio.xd-jasonc-c.chatgpt.site'),
  title: 'Vicky Yan — Product Designer / Human-AI Interaction',
  description: 'Multidisciplinary designer exploring how AI and emerging technologies reshape interactions with products and environments.',
  openGraph: {
    title: 'Vicky Yan — Product Designer / Human-AI Interaction',
    description: 'Multidisciplinary designer exploring how AI and emerging technologies reshape interactions with products and environments.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vicky Yan — Product Designer / Human-AI Interaction',
    description: 'Multidisciplinary designer exploring how AI and emerging technologies reshape interactions with products and environments.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
