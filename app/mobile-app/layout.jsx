const isProduction = process.env.VERCEL_ENV === "production"
export const metadata = {
  title: 'Midway Mobile App',
  description: 'Midway Mobile App for live stock trading and convenient access to your brokerage account.',

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