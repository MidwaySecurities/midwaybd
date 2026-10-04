export const metadata = {
  title: 'Deposit Funds',
  description: 'Deposit funds securely into your Midway Securities brokerage account for live stock trading.',

  robots: {
    index: false,
    follow: false,
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