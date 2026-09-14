
// app/sitemap.js

const PREVIEW_URL = "https://midwaybd.vercel.app";
const PRODUCTION_URL = "https://midwaybd.com";

export default async function sitemap() {
  const siteUrl =
    process.env.VERCEL_ENV === "production"
      ? PRODUCTION_URL
      : PREVIEW_URL;

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_PORTAL_URL ||
    "https://portal.midwaybd.com/api";

  const now = new Date();

  const staticUrls = [
    "/",
    "/deposit",
    "/withdraw",
    "/about-us",
    "/contact-us",
    "/client-services",
    "/our-branches",
    "/pricing",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  let blogUrls = [];

  try {
    const response = await fetch(`${apiBaseUrl}/seo/blogs`, {
      next: {
        revalidate: 3600,
      },
    });

    if (response.ok) {
      const data = await response.json();

      blogUrls = (data?.blogs ?? [])
        .filter((blog) => blog?.slug)
        .map((blog) => ({
          url: `${siteUrl}/blogs/${blog.slug}`,
          lastModified: blog.updated_at
            ? new Date(blog.updated_at)
            : new Date(blog.created_at),
        }));
    } else {
      console.error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  return [...staticUrls, ...blogUrls];
}
