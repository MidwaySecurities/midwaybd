export default function robots() {
  const isPreview =
    process.env.VERCEL_ENV !== "production";

  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

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