// app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/dashboard/",
        "/api/",
      ],
    },
    sitemap: "https://midwaybd.vercel.app/sitemap.xml",
  };
}