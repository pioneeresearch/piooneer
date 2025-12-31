export default function sitemap() {
  const baseUrl = "https://www.pioneerws.in";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/About`, lastModified: new Date() },
    { url: `${baseUrl}/Services`, lastModified: new Date() },
    { url: `${baseUrl}/Products`, lastModified: new Date() },
    { url: `${baseUrl}/Insurance`, lastModified: new Date() },
    { url: `${baseUrl}/financial-planning`, lastModified: new Date() },
    { url: `${baseUrl}/Calculators/sip-return`, lastModified: new Date() },
    { url: `${baseUrl}/Goal_Planners/Dream-home`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/login`, lastModified: new Date() },
  ];
}
