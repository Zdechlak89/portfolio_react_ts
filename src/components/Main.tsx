import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
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
  description: string;
}

const STACK_TECHNOLOGIES: Technology[] = [
  { name: "JavaScript", level: 5, description: "Used in: [project name]" },
  { name: "Typescript", level: 4, description: "Used in: [project name]" },
  { name: "React", level: 3, description: "Used in: [project name]" },
  { name: "Vue.js", level: 2, description: "Used in: [project name]" },
  { name: "AEM", level: 4, description: "Used in: [project name]" },
  { name: "Node.js", level: 3, description: "Used in: [project name]" },
  { name: "PHP", level: 1, description: "Used in: [project name]" },
  { name: "Sass", level: 5, description: "Used in: [project name]" },
  { name: "Playwright", level: 4, description: "Used in: [project name]" },
  { name: "Cypress", level: 4, description: "Used in: [project name]" },
  { name: "Jest", level: 4, description: "Used in: [project name]" },
  { name: "Docker", level: 3, description: "Used in: [project name]" },
  { name: "Webpack", level: 4, description: "Used in: [project name]" },
  { name: "Vite", level: 3, description: "Used in: [project name]" },
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
  const [selectedSkill, setSelectedSkill] = useState<Technology | null>(null);
  const skillModalRef = useRef<HTMLDivElement>(null);
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
    if (!selectedSkill) return;

    const modalElement = skillModalRef.current;
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modalElement
      ? Array.from(
          modalElement.querySelectorAll<HTMLElement>(focusableSelector),
        )
      : [];

    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setSelectedSkill(null);
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      skillTriggerRef.current?.focus();
    };
  }, [selectedSkill]);

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
      <main id="main-content" tabIndex={-1}>
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
                <div
                  className="skill-modal-overlay"
                  onClick={handleCloseSkillModal}
                >
                  <div
                    className="skill-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedSkill.name}
                    ref={skillModalRef}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="skill-modal__close"
                      onClick={handleCloseSkillModal}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <h3 className="skill-modal__title">{selectedSkill.name}</h3>
                    <p className="skill-modal__description">
                      {selectedSkill.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
        <Section id="contact">
          <div className="container">
            <div className="col col-sm-5">
              <h2>Contact</h2>
              <p className="form-hint">All fields are required.</p>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={
                      formErrors.name ? "name-error" : undefined
                    }
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                  {formErrors.name && (
                    <span id="name-error" role="alert">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={
                      formErrors.email ? "email-error" : undefined
                    }
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <span id="email-error" role="alert">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={
                      formErrors.message ? "message-error" : undefined
                    }
                    value={formValues.message}
                    onChange={handleInputChange}
                  />
                  {formErrors.message && (
                    <span id="message-error" role="alert">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <button type="submit">Send message</button>
                {isSubmitted && (
                  <p className="success-message" role="status">
                    Your message has been sent successfully.
                  </p>
                )}
              </form>
            </div>
            <div className="col col-sm-5 col-offset-sm-2 contact-intro">
              <h2>Let&rsquo;s create something great</h2>
              <p>
                I can&rsquo;t wait to dive into a new project — there&rsquo;s
                nothing quite like turning a blank page into something people
                actually use. If you&rsquo;ve got an idea sitting in a notebook,
                a product that needs an extra pair of hands, or a problem you
                haven&rsquo;t quite cracked yet, I&rsquo;d love to hear about
                it.
              </p>
              <p>
                Let&rsquo;s talk about how we can bring your idea to life — drop
                me a message and I&rsquo;ll get back to you soon.
              </p>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default MainSection;
