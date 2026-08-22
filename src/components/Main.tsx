import type { ReactElement } from "react";
import HeroSection from "./HeroSection";
import VerticalContainer from "./VerticalContainer";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";

const MainSection = (): ReactElement => {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <VerticalContainer />
      <SkillsSection />
      <ContactSection />
    </main>
  );
};

export default MainSection;
