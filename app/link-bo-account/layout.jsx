const isProduction = process.env.VERCEL_ENV === "production";
export const metadata = {
  title: 'Link BO Account',
  description: 'Link your existing BO account with Midway Securities to access your brokerage account and live stock trading services.',

  robots: {
    index: isProduction,
    follow: isProduction,
  }
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}