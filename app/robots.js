export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login"],
    },
    sitemap: "https://www.pioneerws.in/sitemap.xml",
  };
}
