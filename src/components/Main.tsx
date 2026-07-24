import {
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./Section";
import VerticalContainer from "./VerticalContainer";
import { splitTextIntoWords } from "../utils/textAnimation";

type FormInputElement = HTMLInputElement | HTMLTextAreaElement;

interface Technology {
  name: string;
  level: number;
}

const STACK_TECHNOLOGIES: Technology[] = [
  { name: "JavaScript", level: 5 },
  { name: "Typescript", level: 4 },
  { name: "React", level: 3 },
  { name: "Vue.js", level: 2 },
  { name: "AEM", level: 4 },
  { name: "Node.js", level: 3 },
  { name: "PHP", level: 1 },
  { name: "Sass", level: 5 },
  { name: "Playwright", level: 4 },
  { name: "Cypress", level: 4 },
  { name: "Jest", level: 4 },
  { name: "Docker", level: 3 },
  { name: "Webpack", level: 4 },
  { name: "Vite", level: 3 },
];

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

gsap.registerPlugin(ScrollTrigger);

const MainSection = (): ReactElement => {
  const mainSectionRef = useRef<HTMLElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (values: ContactFormValues): ContactFormErrors => {
    const errors: ContactFormErrors = {};

    if (!values.name.trim()) {
      errors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim()) {
      errors.message = "Please enter your message.";
    } else if (values.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters long.";
    }

    return errors;
  };

  const isContactFormField = (
    name: string,
  ): name is keyof ContactFormValues => {
    return name === "name" || name === "email" || name === "message";
  };

  const handleInputChange = (event: ChangeEvent<FormInputElement>): void => {
    const { name, value } = event.target;

    if (!isContactFormField(name)) {
      return;
    }

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const errors = validateForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
    setFormValues({
      name: "",
      email: "",
      message: "",
    });
  };

  useEffect(() => {
    const section = mainSectionRef.current;
    const textContainer = mainTextRef.current;
    const image = mainImageRef.current;
    const skillsSection = document.getElementById("skills");
    const skillItems =
      document.querySelectorAll<HTMLElement>(".tech-stack__item");

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

    if (skillsSection && skillItems.length > 0) {
      gsap.fromTo(
        skillItems,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsSection,
            start: "top 80%",
            once: true,
          },
        },
      );
    }

    return () => {
      headingTimeline.kill();
      paraTimeline.kill();
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
                src="/DAD_0409.jpg"
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
              <VerticalContainer />
            </div>
          </div>
        </Section>
        <Section id="skills">
          <div className="container">
            <div className="col">
              <h2>Skills</h2>
              <div className="tech-stack">
                {STACK_TECHNOLOGIES.map((technology) => (
                  <span key={technology.name} className="tech-stack__item">
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
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>
        <Section id="contact">
          <div className="container">
            <div className="col">
              <h2>Contact</h2>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                  {formErrors.name && <span>{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && <span>{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formValues.message}
                    onChange={handleInputChange}
                  />
                  {formErrors.message && <span>{formErrors.message}</span>}
                </div>

                <button type="submit">Send message</button>
                {isSubmitted && (
                  <p className="success-message">
                    Your message has been sent successfully.
                  </p>
                )}
              </form>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default MainSection;
