import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-Br">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="mx-auto  sm:max-w-2xl px-6 max-w-full">
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  );
}
