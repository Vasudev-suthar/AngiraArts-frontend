
import AboutUsSection from "@/components/AboutUsSection";
import ContactUsSection from "@/components/ContectUsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Homepage from "@/components/Homepage";
import OurProducts from "@/components/OurProducts";
import { fetchDataFromApi } from "@/utils/api";



export default async function Home() {

  const homeImg = await fetchDataFromApi('/api/homepageimg');
  const mobileImg = await fetchDataFromApi('/api/mobileimg');
  const featuredProducts = await fetchDataFromApi('/api/products/featured');
  const categoriesList = await fetchDataFromApi('/api/category');

  const homepageImg = homeImg?.data
  const mobilepageImg = mobileImg?.data
  const categories = categoriesList?.categoryList

  return (
    <div className="3xl:container 3xl:mx-auto overflow-x-hidden">

      <Homepage homepageImg={homepageImg} mobilepageImg={mobilepageImg} />

      <div id="featured-products" className="hidden sm:block">
        <FeaturedProducts featuredProducts={featuredProducts} />
      </div>

      <div id="our-products" className="hidden sm:block">
        <OurProducts categories={categories} />
      </div>

      <div id="about-us">
        <AboutUsSection />
      </div>

      <div id="contact-us">
        <ContactUsSection />
      </div>
    </div>
  );
}
