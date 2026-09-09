// app/sitemap.js

export default async function sitemap() {

  const apiBaseUrl = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://midwaybd.vercel.app';
  const response = await fetch(
    `${apiBaseUrl}/seo/blogs`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
   const blogs = await response.blogs.json();
  const blogUrls = blogs.map((blog) => ({
    url: `https://midwaybd.vercel.app/blogs/${blog.slug}`,
    lastModified: new Date(blog.created_at),
  }));

  return [
    {
      url: 'https://midwaybd.vercel.app/',
      lastModified: new Date(),
    },
    {
        url: 'https://midwaybd.vercel.app/deposit',
        lastModified: new Date(),
    },
    {
        url: 'https://midwaybd.vercel.app/withdraw',
        lastModified: new Date(),
    },
    {
      url: 'https://midwaybd.vercel.app/about-us',
      lastModified: new Date(),
    },
    {
      url: 'https://midwaybd.vercel.app/contact-us',
      lastModified: new Date(),
    },
    {
        url: 'https://midwaybd.vercel.app/client-services',
        lastModified: new Date(),
    },
    {
        url: 'https://midwaybd.vercel.app/our-branches',
        lastModified: new Date(),
    },
    {
        url: 'https://midwaybd.vercel.app/pricing',
        lastModified: new Date(),
    },
    ...blogUrls
  ];
}