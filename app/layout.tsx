import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://avery-rowan-portfolio.xd-jasonc-c.chatgpt.site'),
  title: 'Vicky Yan — Human-Centered Designer',
  description: 'Portfolio of Vicky Yan, a human-centered designer.',
  openGraph: {
    title: 'Vicky Yan — Human-Centered Designer',
    description: 'Portfolio of Vicky Yan, a human-centered designer.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vicky Yan — Human-Centered Designer',
    description: 'Portfolio of Vicky Yan, a human-centered designer.',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
