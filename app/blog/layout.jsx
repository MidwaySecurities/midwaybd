export const metadata = {
  title: 'Blogs',
  description: 'Read the latest stock market insights, investment information, BO account guidance, and updates from Midway Securities.',

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