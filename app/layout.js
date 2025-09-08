// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Roboto, Dancing_Script } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google'
import "./globals.css";

import { ModalCloseProvider, useModalClose } from "./components/close-button-provider";
import NavigationBar from './components/navigation';
import { BottomModalCloseProvider } from './context/firstApproachModalContext';
import { DeviceDetectContextProvider } from './context/deviceDetectContext';
import Footer from './components/Home/footer/footer';
import { BlogTabProvider } from './context/blogTabContext';
const inter = Inter({
  subsets: ['latin'], // Specify the character sets you need
  variable: '--font-inter', // Optional: Define a CSS variable for easy access
});

const dancingScript = Dancing_Script({
  subsets: ['latin'], // Specify the character sets you need
  variable: '--font-dancing-script', // Optional: Define a CSS variable for easy access
})

const roboto = Roboto({
  subsets: ['latin'], // Specify the character sets you need
  variable: '--font-roboto', // Optional: Define a CSS variable for easy access
})
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Midway Securities Ltd.",
  description: "Trade shares seamlessly at Dhaka Stock Exchange with Midway Securities Ltd. Trade with our own Mobile Trading App - QuickTrade Pro - Open BO accounts online, fund via bKash/Nagad/Rocket, enjoy fast withdrawals, and expert support. Open your BO account onl",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <GoogleTagManager gtmId='' />
      <ModalCloseProvider>
        <BottomModalCloseProvider>
          <DeviceDetectContextProvider>
            <BlogTabProvider>
              <body
                className={`${roboto.className} ${inter.className} ${dancingScript.className} antialiased`}
              >
                <NavigationBar />
                {children}
                <div className="section-gap px-2 bg-white py-1 font-bold">
                  <Footer />
                </div>
              </body>
            </BlogTabProvider>
          </DeviceDetectContextProvider>
        </BottomModalCloseProvider>
      </ModalCloseProvider>
    </html>
  );
}
