const isProduction = process.env.VERCEL_ENV === "production"
export const metadata = {
  title: 'New investors',
  description: 'Lets start your journey with Midway Securities Ltd.',

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