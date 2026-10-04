export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to frequently asked questions about Midway Securities, BO accounts, stock trading, deposits, withdrawals, fees, and client services.',

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