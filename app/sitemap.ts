import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticRoutes = ["", "/knowledge-hub", "/calculators", "/about", "/pricing", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  try {
    const knowledgeItems = await prisma.taxKnowledgeItem.findMany({
      select: {
        slug: true,
        category: true,
        updatedAt: true,
      },
      where: {
        reviewStatus: {
          in: ["VERIFIED", "NEEDS_REVIEW"]
        }
      }
    });

    const dynamicRoutes = knowledgeItems.map((item) => ({
      url: `${baseUrl}/${item.category === "DIRECT_TAX" ? "direct-tax" : "indirect-tax"}/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap", error);
    return staticRoutes;
  }
}
