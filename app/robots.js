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
    sitemap: "https://midwaybd.com/sitemap.xml",
  };
}