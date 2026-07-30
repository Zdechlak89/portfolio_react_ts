import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactElement,
} from "react";
import { gsap } from "../lib/gsap";
import Section from "./Section";
import SkillModal from "./SkillModal";

export interface Technology {
  name: string;
  level: number;
  description: string;
}

const STACK_TECHNOLOGIES: Technology[] = [
  {
    name: "JavaScript",
    level: 5,
    description:
      "The baseline language of my career, the core stack I’ve relied on since day one.",
  },
  {
    name: "Typescript",
    level: 4,
    description:
      "Used in several projects with React and also as a standalone technology — the safety net that catches my typos before the browser does.",
  },
  {
    name: "React",
    level: 3,
    description:
      "Implemented across three projects — from modernizing a large legacy application to crafting a polished website for a doors & windows manufacturer, adapting patterns and performance optimizations to each context.",
  },
  {
    name: "Vue.js",
    level: 2,
    description:
      "I actually enjoy Vue more than React. I had one project for a watch manufacturer where I maintained and evolved the website, and Vue’s clarity and flexibility made it a pleasure to work with.",
  },
  {
    name: "AEM",
    level: 4,
    description:
      "AEM is great for large projects built for global brands. I’ve picked up a fair share of tricks along the way, having worked in the AEM environment for over six years.",
  },
  {
    name: "Node.js",
    level: 2,
    description:
      "I’ve only written backend code in Node.js for one project, but I enjoyed every bit of it.",
  },
  {
    name: "Sass",
    level: 5,
    description:
      "A frontend must-have, though it’s slowly losing ground to vanilla CSS and Tailwind.",
  },
  {
    name: "Playwright",
    level: 4,
    description: "Used in my last project for end-to-end testing.",
  },
  {
    name: "Cypress",
    level: 4,
    description: "Used at TTMS a few times and at InteliWISE.",
  },
  {
    name: "Jest",
    level: 4,
    description: "Used in almost every project I’ve touched.",
  },
  {
    name: "Docker",
    level: 3,
    description: "Used in two projects: InteliWISE and TTMS.",
  },
  {
    name: "Webpack",
    level: 4,
    description:
      "Configured and maintained build pipelines across several AEM and React projects.",
  },
  {
    name: "Vite",
    level: 3,
    description:
      "My go-to bundler for fast, modern React projects — this portfolio is built with it.",
  },
];

const SkillsSection = (): ReactElement => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Technology | null>(null);
  const skillTriggerRef = useRef<HTMLElement | null>(null);

  const handleSkillClick = (
    technology: Technology,
    event: MouseEvent<HTMLButtonElement>,
  ): void => {
    skillTriggerRef.current = event.currentTarget;
    setSelectedSkill(technology);
  };

  const handleCloseSkillModal = (): void => {
    setSelectedSkill(null);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const skillItems =
      section?.querySelectorAll<HTMLElement>(".tech-stack__item");

    if (!section || !skillItems || skillItems.length === 0) return;

    const animation = gsap.fromTo(
      skillItems,
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
    <Section id="skills" ref={sectionRef}>
      <div className="container">
        <div className="col">
          <h2>Skills</h2>
          <div className="tech-stack">
            {STACK_TECHNOLOGIES.map((technology) => (
              <button
                key={technology.name}
                type="button"
                className="tech-stack__item"
                onClick={(event) => handleSkillClick(technology, event)}
              >
                <span>{technology.name}</span>
                <span
                  className="tech-stack__stars"
                  aria-label={`${technology.level} out of 5`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < technology.level
                          ? "tech-stack__star tech-stack__star--filled"
                          : "tech-stack__star"
                      }
                    >
                      ★
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>
          {selectedSkill && (
            <SkillModal
              technology={selectedSkill}
              onClose={handleCloseSkillModal}
              triggerRef={skillTriggerRef}
            />
          )}
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;
