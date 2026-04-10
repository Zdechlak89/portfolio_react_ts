import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./Section";
import { splitTextIntoWords } from "../utils/textAnimation";

gsap.registerPlugin(ScrollTrigger);

const MainSection = () => {
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
        0
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
        1.2
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
      textScroll.kill();
      imageScroll.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <main>
        <Section id="main" ref={mainSectionRef}>
          <div className="container">
            <div className="col col-lg-7">
              <div className="main-text" ref={mainTextRef}>
                <h1 className="main-heading">
                  {splitTextIntoWords("Emil Augustynowicz")}
                </h1>
                <p>Web Developer</p>
                <p>Photographer</p>
              </div>
            </div>
            <div className="col col-lg-5">
              <img
                ref={mainImageRef}
                src="./public/DAD_0409.jpg"
                className="main-image"
                alt="Emil Augustynowicz photo"
              />
            </div>
          </div>
        </Section>
        <Section id="story">
          <div className="container">
            <div className="col">
              <h2>Story</h2>
              <h3>Web Developer</h3>
              <p>Information about the Web Developer</p>
              <h3>Photographer</h3>
              <p>Information about the Photographer</p>
            </div>
          </div>
        </Section>
        <Section id="skills">
          <div className="container">
            <div className="col">
              <h2>Skills</h2>
              <h3>Web Developer</h3>
              <p>Information about the Web Developer's skills</p>
              <h3>Photographer</h3>
              <p>Information about the Photographer's skills</p>
            </div>
          </div>
        </Section>
        <Section id="contact">
          <div className="container">
            <div className="col">
              <h2>Contact</h2>
              <h3>Web Developer</h3>
              <p>Contact information for Web Developer</p>
              <h3>Photographer</h3>
              <p>Contact information for Photographer</p>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default MainSection;
