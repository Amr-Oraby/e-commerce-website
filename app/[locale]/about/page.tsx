import AboutUsBriefSection from "@/components/AboutUsBriefSection";
import AboutUsSection from "@/components/AboutUsSection";
import Features from "@/components/Features";
import JourneySection from "@/components/JourneySection";
import MissionVisionSection from "@/components/MissionVisionSection";
import MomentsSection from "@/components/MomentsSection";
import StatsSection from "@/components/StatsSection";

function page() {
  return (
    <div>
      <AboutUsSection />
      <StatsSection />
      <MissionVisionSection />
      <AboutUsBriefSection />
      <MomentsSection />
      <JourneySection />
      <Features />
    </div>
  );
}

export default page;
