// app/sitemap.js

export default async function sitemap() {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.midwaybd.com/api";

  const siteUrl = "https://midwaybd.vercel.app";

  const response = await fetch(`${apiBaseUrl}/seo/blogs`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch blogs: ${response.status} ${response.statusText}`
    );
  }

  const blogs = await response.json();

  const blogUrls = blogs.map((blog) => ({
    url: `${siteUrl}/blogs/${blog.slug}`,
    lastModified: blog.updated_at
      ? new Date(blog.updated_at)
      : new Date(blog.created_at),
  }));

  const staticUrls = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/deposit`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/withdraw`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/client-services`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/our-branches`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: new Date(),
    },
  ];

  return [...staticUrls, ...blogUrls];
}