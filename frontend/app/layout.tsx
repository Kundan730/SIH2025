import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "../components/Theme-provider";
import Navbar from '@/components/NavBar';
import WalletProviderWrapper from '../components/WalletAdapter';
import '@solana/wallet-adapter-react-ui/styles.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProviderWrapper>
            <Navbar />
            {children}
          </WalletProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
