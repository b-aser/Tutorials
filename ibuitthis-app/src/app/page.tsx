import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroSection from "@/components/landing-page/hero-section";
import FeaturedProducts from "@/components/landing-page/featured-product";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <FeaturedProducts />
      <Suspense
        fallback={
          <div className="wrapper flex items-center gap-2">
            Loading...Recently Launched Products
            <LoaderIcon className="size-4 animate-spin" />
          </div>
        }
      >
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}
