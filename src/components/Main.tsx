import type { ReactElement } from "react";
import Section from "./Section";
import VerticalContainer from "./VerticalContainer";
import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";

const MainSection = (): ReactElement => {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <Section id="story">
        <div className="container">
          <div className="col">
            <h2>Story</h2>
            <VerticalContainer />
          </div>
        </div>
      </Section>
      <SkillsSection />
      <ContactSection />
    </main>
  );
};

export default MainSection;
