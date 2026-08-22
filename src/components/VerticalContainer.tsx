import { useRef, useState, type ReactElement, type UIEvent } from "react";

interface Job {
  num: string;
  dates: string;
  role: string;
  company: string;
  project: string;
  points: string[];
  stack: string[];
}

const STORY: Job[] = [
  {
    num: "01",
    dates: "Dec 2022 — Jun 2026",
    role: "Frontend Developer",
    company: "Sii Poland, Lublin (remote)",
    project:
      "Developing and maintaining a banking institution portal that comprehensively provides information on products and their solutions.",
    points: [
      "Planning and developing JS features and component structure, creating styles and animations in projects based mainly on AEM (Adobe Experience Manager).",
      "Optimizing and analyzing page performance; code reviewing.",
      "Writing unit tests as well as scenarios in Playwright.",
      "Part of an international team, working in Scrum.",
    ],
    stack: ["JavaScript", "React", "Sass", "Webpack", "Jest", "AEM 6.5"],
  },
  {
    num: "02",
    dates: "May 2020 — Nov 2022",
    role: "Lead Frontend Developer",
    company: "Transition Technologies MS, Lublin (hybrid/remote)",
    project:
      "Migrating, developing and maintaining the watch manufacturer's portal, which brought the product and its stories to life.",
    points: [
      "Leading a team of frontend developers, assigning tasks, and gathering feedback.",
      "Daily cooperation with other teams; recruiting developers.",
      "Plus responsibilities from the previous role.",
    ],
    stack: ["Vue.js", "Sass", "Webpack", "AEM"],
  },
  {
    num: "03",
    dates: "Dec 2019 — Apr 2020",
    role: "Frontend Developer",
    company: "Transition Technologies MS, Lublin",
    project:
      "Delivering product webpages for a global pharmaceutical company, with special sensitivity to the needs of people with disabilities.",
    points: [
      "Planning and designing features; creating new responsive websites based on the AEM platform.",
      "Developing JS features and component structure; creating styles and animations.",
      "Taking part in creating UX/UI design by external agencies; code reviewing.",
    ],
    stack: ["JavaScript", "TypeScript", "jQuery", "Sass", "Webpack", "Cypress", "AEM"],
  },
  {
    num: "04",
    dates: "Oct 2016 — Dec 2019",
    role: "Web Developer",
    company: "InteliWISE.com, Lublin",
    project: "AI-based chatbot solution.",
    points: [
      "Customizing the appearance of the product according to the client's recommendations.",
      "Writing automated tests in Cypress.",
    ],
    stack: ["JavaScript", "React", "Node.js", "Cypress", "Docker", "PHP"],
  },
  {
    num: "05",
    dates: "Mar 2016 — May 2016",
    role: "Web Developer",
    company: "Avrio Interactive, Warsaw",
    project: "Creating websites based on the company's CMS system.",
    points: ["Building client sites on an in-house CMS."],
    stack: ["JavaScript", "jQuery", "PHP"],
  },
];

const CARD_STEP = 464;

function VerticalContainer(): ReactElement {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(4);

  const scrollBy = (direction: 1 | -1): void => {
    railRef.current?.scrollBy({
      left: direction * CARD_STEP,
      behavior: "smooth",
    });
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>): void => {
    const el = event.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    const percent = max > 0 ? (el.scrollLeft / max) * 100 : 0;
    setProgress(Math.max(4, Math.round(percent)));
  };

  return (
    <section id="story" className="section-inner">
      <div className="story__head">
        <div>
          <span className="eyebrow">01 — Story</span>
          <h2>Where I have worked</h2>
        </div>
        <div className="story__nav">
          <button
            type="button"
            className="story__nav-button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous role"
          >
            ←
          </button>
          <button
            type="button"
            className="story__nav-button"
            onClick={() => scrollBy(1)}
            aria-label="Next role"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={handleScroll}
        className="story__rail"
        role="list"
      >
        {STORY.map((job) => (
          <article className="job-card" role="listitem" key={job.num}>
            <div className="job-card__meta">
              <span className="job-card__num">{job.num}</span>
              <span className="job-card__dates">{job.dates}</span>
            </div>
            <div className="job-card__heading">
              <h3>{job.role}</h3>
              <span className="job-card__company">{job.company}</span>
            </div>
            <p className="job-card__project">{job.project}</p>
            <ul className="job-card__points">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="job-card__stack">
              {job.stack.map((tech) => (
                <span className="job-card__tech" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
        <div className="story__spacer"></div>
      </div>

      <div className="story__progress" aria-hidden="true">
        <div
          className="story__progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </section>
  );
}

export default VerticalContainer;
