import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { CursorProvider } from '@/components/providers/cursor-provider';
import { AudioProvider } from '@/components/providers/audio-provider';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Infotsav 2025 - Annual Techno-Cultural Festival',
  description: 'Join us for Infotsav 2025 - The biggest techno-cultural festival of the year. Experience immersive tech showcases, cultural performances, workshops, and much more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-montserrat`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AudioProvider>
            <CursorProvider>
              {children}
              <Toaster />
            </CursorProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}