import { useEffect, useRef, type ReactElement } from "react";
import { gsap } from "../lib/gsap";
import { splitTextIntoWords } from "../utils/textAnimation";

const STATS = [
  { value: "10 yrs", label: "Commercial work" },
  { value: "5", label: "Companies" },
  { value: "AEM", label: "Core specialism" },
];

const HeroSection = (): ReactElement => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textContainer = textContainerRef.current;
    if (!textContainer) return;

    const heading = textContainer.querySelector("h1");
    if (!heading) return;

    const headingWords = heading.querySelectorAll(".word");
    gsap.set(headingWords, { opacity: 0, y: 24 });

    const timeline = gsap.to(headingWords, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.out",
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section id="main">
      <div className="hero">
        <div className="hero__copy" ref={textContainerRef}>
          <div className="hero__status">
            <span className="hero__status-dot" aria-hidden="true"></span>
            <span>Open to full-time and B2B · Lublin, Poland · Remote</span>
          </div>
          <h1 className="main-heading">
            {splitTextIntoWords("Emil Augustynowicz")}
          </h1>
          <p className="hero__lede">
            Frontend developer, ten years in. I build and maintain large
            content platforms — banking, pharma, e-commerce — mostly in
            JavaScript, React and AEM.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="hero__cta">
              Get in touch
            </a>
          </div>
          <div className="hero__stats">
            {STATS.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__portrait">
          <img
            src="/DAD_0409.jpg"
            alt="Emil Augustynowicz photo"
            width={3198}
            height={4446}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
