import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "YouTube",
  description: "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0f0f0f] text-white">
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
