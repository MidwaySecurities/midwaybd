import localFont from 'next/font/local';
import { Poppins, Roboto } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

import { ModalCloseProvider } from "./components/close-button-provider";
import NavigationBar from "./components/navigation";
import { BottomModalCloseProvider } from "./context/firstApproachModalContext";
import { DeviceDetectContextProvider } from "./context/deviceDetectContext";
import Footer from "./components/Home/footer/footer";
import { BlogTabProvider } from "./context/blogTabContext";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// use sonarbangla font like className={sonarBangla.className} in any element to apply the font

export const metadata = {
  title: "Midway Securities Ltd.",
  description:
    "Trade shares seamlessly at Dhaka Stock Exchange with Midway Securities Ltd. Use our own Mobile Trading App - QuickTrade Pro. Open BO accounts online, fund via bKash/Nagad/Rocket, enjoy fast withdrawals, and expert support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-XXXXXXX" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ModalCloseProvider>
          <BottomModalCloseProvider>
            <DeviceDetectContextProvider>
              <BlogTabProvider>
                <NavigationBar />
                {children}
                <div className="section-gap bg-white font-bold">
                  <Footer />
                </div>
              </BlogTabProvider>
            </DeviceDetectContextProvider>
          </BottomModalCloseProvider>
        </ModalCloseProvider>
        <div id="delete-modal"></div>
      </body>
    </html>
  );
}
