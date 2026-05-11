import localFont from 'next/font/local';
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

import { ModalCloseProvider } from "./components/close-button-provider";
import NavigationBar from "./components/navigation";
import { BottomModalCloseProvider } from "./context/firstApproachModalContext";
import { DeviceDetectContextProvider } from "./context/deviceDetectContext";
import Footer from "./components/Home/footer/footer";
import { BlogTabProvider } from "./context/blogTabContext";
import Script from "next/script";


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
  verification: {
    google: "google343367b96d01cfa8.html",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];
          w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T89TGQ8B');
        `,
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T89TGQ8B"
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>

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
