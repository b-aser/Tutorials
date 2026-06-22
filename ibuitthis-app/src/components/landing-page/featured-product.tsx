"use cache";
import SectionHeader from "../common/section-header";
import { ArrowUpRightIcon, RocketIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../products/product-card";
import { getFeaturedProducts } from "@/lib/products/product-select";



export default async function FeaturedProducts() {
    const featuredProducts = await getFeaturedProducts();
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Products"
            description="Top picks from our community this week"
            icon={RocketIcon}
          />
          <Button asChild variant="outline" size="lg" className="hidden sm:block">
            <Link href="/explore">
              
              View All
              <ArrowUpRightIcon />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {
            featuredProducts.map((product) => 
            <ProductCard key={product.id} product={product} />
            )
          }
        </div>
      </div>
    </section>
  );
}
