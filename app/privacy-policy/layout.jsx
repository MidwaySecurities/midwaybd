export const metadata = {
  title: "Privacy Policy",
  description:
    "Read Midway Securities Limited's Privacy Policy to learn how we collect, use, protect, and manage your personal information and data.",
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