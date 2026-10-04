export const metadata = {
  title: 'Form Download',
  description: 'Download BO account, trading, and other necessary forms from Midway Securities for your brokerage and investment services.',

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