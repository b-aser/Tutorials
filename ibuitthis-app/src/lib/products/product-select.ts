import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";

export async function getFeaturedProducts() {
  "use cache";
  const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
  return productsData;
}

export async function getAllProducts() {
  const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
  return productsData;
}

export async function getRecentlyLaunchedProducts() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const productsData = await getAllProducts();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return productsData.filter(
    (product) => product.createdAt && product.createdAt >= oneWeekAgo,
  );
}
