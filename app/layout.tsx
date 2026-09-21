import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
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
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
