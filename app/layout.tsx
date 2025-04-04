import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider as ProviderChakra } from "@/components/ui/provider";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Box } from "@chakra-ui/react";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Products App",
  description: "App for managing products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="root-container">
          <StoreProvider>
            <ProviderChakra>
              <Header />
              <Box
                as="main"
                width={"100%"}
                p="4"
                display={"flex"}
                alignItems={"flex-start"}
                justifyContent={"center"}
                flexGrow={1}
              >
                {children}
              </Box>
              <Footer />
            </ProviderChakra>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
