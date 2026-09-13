export const metadata = {
  title: 'Pricing | Midway Securities',
  description: 'View Midway Securities brokerage fees, account charges, trading costs, and other pricing information for investors.',

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