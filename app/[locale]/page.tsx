import Categories from "@/components/Catigories";
import Hero from "@/components/Hero";
import PromoBanners from "@/components/PromoBanners";
import dynamic from 'next/dynamic';

const MostSelled = dynamic(() => import('@/app/features/products/MostSelled'));
const NewArrivalsSection = dynamic(() => import('@/app/features/products/NewArrivalsSection'));
const PerfumeBanner = dynamic(() => import('@/components/PerfumeBanner'));
const SpecialOffersSection = dynamic(() => import('@/app/features/products/SpecialOffersSection'));
const SunProtectionBanner = dynamic(() => import('@/components/SunProtectionBanner'));
const FeaturedBanner = dynamic(() => import('@/components/FeaturedBanner'));
const Features = dynamic(() => import('@/components/Features'));

import { apiFetch } from "@/lib/api/fetcher";

async function page() {
  const data: any = await apiFetch({ 
    endpoint: "guest/home",
    next: { revalidate: 60 }
  });

  return (
    <div>
      {/* Real sliders => .slice(1, 4) */}
      <Hero sliders={data?.data?.sliders} />
      <Categories categories={data?.data?.categories?.slice(0, 6)} />
      <PromoBanners banners={data?.data?.banners} />
      <NewArrivalsSection recentProducts={data?.data?.recent_products} />
      <SunProtectionBanner />
      <MostSelled products={data?.data?.best_selling_products} />
      <FeaturedBanner />
      <SpecialOffersSection products={data?.data?.flash_sale_products} />
      <PerfumeBanner />
      <Features />
    </div>
  );
}

export default page;
