import { Poppins, Architects_Daughter } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const isProduction = process.env.VERCEL_ENV === "production"
export const metadata = {
  title: 'New investors',
  description: 'Lets start your journey with Midway Securities Ltd.',

  robots: {
    index: isProduction,
    follow: isProduction,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}