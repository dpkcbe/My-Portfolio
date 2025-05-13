import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Deepak Radhakrishnan | Portfolio',
  description: 'Creative portfolio showcasing my work and expertise',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon_32x32.png" sizes="32x32" />
      </head>
      <body className="bg-white dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
} 