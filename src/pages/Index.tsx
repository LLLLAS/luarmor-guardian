import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import PowerfulFeatures from "@/components/PowerfulFeatures";
import StatsSection from "@/components/StatsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <PowerfulFeatures />
      <StatsSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;