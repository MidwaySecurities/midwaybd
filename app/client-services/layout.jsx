export const metadata = {
  title: 'Client Services',
  description: 'Access Midway Securities client services, including account management, deposits, withdrawals, BO account services, and live stock trading support.',

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