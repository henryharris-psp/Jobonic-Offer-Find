import { Inter } from "next/font/google";
import "./globals.css";
import NavbarComponent from "../components/NavBar";
import Footer from "../components/footer";
import ChatBox from "../components/ChatBox"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarComponent/>
        <main>
          {children}
        </main>
        <Footer/>
        <ChatBox/>
      </body>
    </html>
  );
}
