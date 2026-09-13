export const metadata = {
  title: 'Withdraw Funds | Midway Securities',
  description: 'Withdraw funds securely from your Midway Securities brokerage account to your registered bank account.',

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