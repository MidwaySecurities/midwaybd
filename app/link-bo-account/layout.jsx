export const metadata = {
  title: 'Link BO Account',
  description: 'Link your existing BO account with Midway Securities to access your brokerage account and live stock trading services.',

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