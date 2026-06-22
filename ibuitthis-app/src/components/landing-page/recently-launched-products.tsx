import { CalendarIcon, RocketIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import ProductCard from "../products/product-card";
import EmptyState from "../common/empty-state";
import { getRecentlyLaunchedProducts } from "@/lib/products/product-select";



export default async function RecentlyLaunchedProducts() {
    const recentlyLaunchedProducts = await getRecentlyLaunchedProducts();
  return (
    <div className="py-20 bg-muted/20">
      <div className="wrapper space-y-12">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Recently Launched Products"
            description="Discover the latest products from our community"
            icon={RocketIcon}
          />
        </div>

        {recentlyLaunchedProducts.length > 0 ? (
          <div className="grid-wrapper">
            {recentlyLaunchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No recently launched products found"
            icon={CalendarIcon}
          />
        )}
      </div>
    </div>
  );
}
