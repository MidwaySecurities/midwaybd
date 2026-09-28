export const siteConfig = {
  name: "Midway Securities",
  // Set NEXT_PUBLIC_SITE_URL in .env.local (e.g. https://www.yourdomain.com)
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com").replace(
    /\/$/,
    ""
  ),
  locale: "en_BD",
};