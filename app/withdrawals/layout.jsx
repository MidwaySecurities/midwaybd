const isProduction = process.env.VERCEL_ENV === "production";

export const metadata = {
  title: 'Withdraw Funds',
  description: 'Withdraw funds securely from your Midway Securities brokerage account to your registered bank account.',

  robots: {
    index: isProduction,
    follow: isProduction,
  },
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