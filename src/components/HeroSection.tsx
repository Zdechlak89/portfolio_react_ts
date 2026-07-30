import { useEffect, useRef, type ReactElement } from "react";
import { gsap } from "../lib/gsap";
import Section from "./Section";
import { splitTextIntoWords } from "../utils/textAnimation";

const HeroSection = (): ReactElement => {
  const mainSectionRef = useRef<HTMLElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = mainSectionRef.current;
    const textContainer = mainTextRef.current;
    const image = mainImageRef.current;

    if (!section || !textContainer || !image) return;

    const heading = textContainer.querySelector("h1");
    const paragraphs = textContainer.querySelectorAll("p");

    if (!heading) return;

    // Animate heading words from bottom to top
    const headingWords = heading.querySelectorAll(".word");
    const headingTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: mainTextRef.current,
        start: "top center",
        end: "top center",
      },
    });

    headingWords.forEach((word) => {
      gsap.set(word, {
        opacity: 0,
        y: 30,
      });
    });

    headingWords.forEach((word) => {
      headingTimeline.to(
        word,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0,
      );
    });

    // Animate paragraph words from left to right
    const paraTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: mainTextRef.current,
        start: "top center",
        end: "top center",
      },
    });

    paragraphs.forEach((para) => {
      gsap.set(para, {
        opacity: 0,
        x: -100,
      });

      paraTimeline.to(
        para,
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        1.2,
      );
    });

    const textScroll = gsap.to(textContainer, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    const imageScroll = gsap.to(image, {
      y: -410,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      headingTimeline.kill();
      paraTimeline.kill();
      textScroll.kill();
      imageScroll.kill();
    };
  }, []);

  return (
    <Section id="main" ref={mainSectionRef}>
      <div className="container">
        <div className="col col-lg-7">
          <div className="main-text" ref={mainTextRef}>
            <h1 className="main-heading">
              {splitTextIntoWords("Emil Augustynowicz")}
            </h1>
            <div className="main-subheading">
              <p>Web Developer</p>
            </div>
          </div>
        </div>
        <div className="col col-lg-5 main-image-container">
          <img
            ref={mainImageRef}
            src="/DAD_0409.jpg"
            className="main-image"
            alt="Emil Augustynowicz photo"
            width={3198}
            height={4446}
          />
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
