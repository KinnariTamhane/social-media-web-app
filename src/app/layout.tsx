import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutContent from '@/components/layout/LayoutContent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Connect People - Social Media App',
  description: 'Connect with friends and share your moments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
