
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import CategorySection from "@/components/home/CategorySection";
import RankingSection from "@/components/home/RankingSection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedSection />
      <RankingSection />
      <CategorySection />
    </MainLayout>
  );
};

export default Index;
