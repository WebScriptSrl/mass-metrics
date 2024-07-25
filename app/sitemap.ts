import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.PUBLIC_BASE_URL
  ? `https://${process.env.PUBLIC_BASE_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [""].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString(),
  }));

  const dataRoute = `${baseUrl}/data/address`;
  const allCredits = `${baseUrl}/all-credits`;

  routesMap.push(
    {
      url: dataRoute,
      lastModified: new Date().toISOString(),
    },
    {
      url: allCredits,
      lastModified: new Date().toISOString(),
    }
  );

  return [...routesMap];
}
