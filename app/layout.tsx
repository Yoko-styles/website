import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import Image from 'next/image';

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yoko Styles',
  description: 'Submit your inquiry and we\'ll get back to you',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}