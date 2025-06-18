import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Globe, Heart } from "lucide-react";
import ContactSection from "@/components/main/ContactSection";
import IndexNav from "@/components/main/IndexNav";
import HeroSection from "@/components/main/HeroSection";
import FeaturesSection from "@/components/main/FeaturesSection";
import ModesSection from "@/components/main/ModesSection";
import DeveloperSection from "@/components/main/DeveloperSection";
import WatchDemoSection from "@/components/main/WatchDemoSection";
import CTA from "@/components/main/CTA";
import FooterSection from "@/components/main/FooterSection";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <IndexNav />

      <main className="relative">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        </div>

        <HeroSection isLoaded={isLoaded} />

        <FeaturesSection isLoaded={isLoaded} />

        <ModesSection isLoaded={isLoaded} />

        <DeveloperSection isLoaded={isLoaded} />

        <WatchDemoSection isLoaded={isLoaded} />

        <CTA isLoaded={isLoaded} />

        <ContactSection />
      </main>

      <FooterSection />
    </div>
  );
};

export default Index;
