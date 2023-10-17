import { Inter } from "next/font/google";
import ProviderChakraUi from "./lib/chakra_ui/provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Flex } from "@chakra-ui/react";
import { SWRProvider } from "./swr/swr-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Selamat Datang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRProvider>
          <ProviderChakraUi>
            <Flex h={"100%"} direction={"column"}>
              <Navbar />
              {children}
              <Footer />
            </Flex>
          </ProviderChakraUi>
        </SWRProvider>
      </body>
    </html>
  );
}
