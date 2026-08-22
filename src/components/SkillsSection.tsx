import { useEffect, useRef, type ReactElement } from "react";
import { gsap } from "../lib/gsap";

interface SkillTier {
  label: string;
  note: string;
  items: string[];
}

const TIERS: SkillTier[] = [
  {
    label: "Every day",
    note: "Core of my work for years.",
    items: ["JavaScript", "TypeScript", "React", "Sass", "AEM"],
  },
  {
    label: "Confident",
    note: "Shipped in production projects.",
    items: ["Playwright", "Cypress", "Jest", "Webpack", "Vue.js"],
  },
  {
    label: "Familiar",
    note: "Used where the project needed it.",
    items: ["Node.js", "Docker", "Vite", "PHP"],
  },
];

const SkillsSection = (): ReactElement => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const tiers = section?.querySelectorAll<HTMLElement>(".skill-tier");

    if (!section || !tiers || tiers.length === 0) return;

    const animation = gsap.fromTo(
      tiers,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      },
    );

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section id="skills" className="section-inner" ref={sectionRef}>
      <span className="eyebrow">02 — Skills</span>
      <h2>What I reach for</h2>
      <div className="skill-tiers">
        {TIERS.map((tier) => (
          <div className="skill-tier" key={tier.label}>
            <div>
              <span className="skill-tier__label">{tier.label}</span>
              <span className="skill-tier__note">{tier.note}</span>
            </div>
            <div className="skill-tier__items">
              {tier.items.map((skill) => (
                <span className="skill-tier__item" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
