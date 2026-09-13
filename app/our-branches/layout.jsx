export const metadata = {
  title: 'Our Branches | Midway Securities',
  description: 'Find Midway Securities branches and office locations across Bangladesh and get the support you need for your brokerage and trading services.',

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