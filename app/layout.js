import { Inter } from "next/font/google";
import ProviderChakraUi from "./lib/chakra_ui/provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Flex } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderChakraUi>
          <Flex h={"100vh"} direction={"column"}>
            <Navbar />
            {children}
            <Footer />
          </Flex>
        </ProviderChakraUi>
      </body>
    </html>
  );
}
