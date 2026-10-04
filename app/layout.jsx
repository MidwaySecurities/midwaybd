export const metadata = {
  title: 'My Next.js App',
  description: 'Built with the App Router in JavaScript',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Midway Securities Ltd.</h1>
        </header>
        
        <main>{children}</main>
        
        <footer>
          <p>© 2026 My Company</p>
        </footer>
      </body>
    </html>
  );
}