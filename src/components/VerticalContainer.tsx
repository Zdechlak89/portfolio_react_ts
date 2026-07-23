import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

function VerticalContainer() {
  useEffect(() => {
    const horizontalSections = document.querySelectorAll(".timeline-item");

    if (horizontalSections.length === 0) {
      return;
    }

    const timelineAnimation = gsap.to(horizontalSections, {
      xPercent: -100 * (horizontalSections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#story",
        pin: true,
        scrub: 1,
        end: "+=3000",
      },
    });

    return () => {
      timelineAnimation.kill();
    };
  }, []);

  return (
    <ul className="timeline-list">
      <li className="timeline-item">
        <h3>Sii Poland, Lublin (remote) — Frontend Developer</h3>
        <p className="timeline-date">December 2022 — June 2026</p>
        <p>
          <span>Project: </span>Developing and maintaining a banking institution
          portal that comprehensively provides information on products and their
          solutions.
        </p>
        <p>
          <span>Responsibilities: </span>Planning and developing JS features and
          component structure, creating styles and animations in projects based
          mainly on the AEM (Adobe Experience Manager) platform; maintaining
          webpages; optimizing and analyzing page performance; daily cooperation
          with other teams and departments; code reviewing; writing unit tests
          as well as scenarios in Playwright.
        </p>
        <p>Being part of an international team, working in Scrum.</p>
        <p>
          <span>Stack:</span> JavaScript, React, Sass, Webpack, Jest, AEM 6.5
        </p>
      </li>
      <li className="timeline-item">
        <h3>
          Transition Technologies MS, Lublin (hybrid/remote) — Lead Frontend
          Developer
        </h3>
        <p className="timeline-date">May 2020 — November 2022</p>
        <p>
          <span>Project: </span>Migrating, developing and maintaining the watch
          manufacturer's portal, which brought the product and its stories to
          life in a rich and interactive way.
        </p>
        <p>
          <span>Responsibilities: </span>Leading a team of frontend developers,
          assigning tasks, and gathering feedback; daily cooperation with other
          teams and departments; taking part in recruiting developers; plus
          responsibilities from the previous role.
        </p>
        <p>
          <span>Stack:</span> Vue.js, Sass, Webpack, AEM
        </p>
      </li>
      <li className="timeline-item">
        <h3>Transition Technologies MS, Lublin — Frontend Developer</h3>
        <p className="timeline-date">December 2019 — April 2020</p>
        <p>
          <span>Project: </span>Delivering product webpages for a global
          pharmaceutical company, with special sensitivity to the needs of
          people with disabilities.
        </p>
        <p>
          <span>Responsibilities: </span>Planning and designing features;
          creating new responsive websites based on the AEM platform; developing
          JS features and component structure; creating styles and animations;
          maintaining webpages; optimizing page performance; taking part in
          creating UX/UI design by external agencies; code reviewing.
        </p>
        <p>Being part of an international team, working in Scrum.</p>
        <p>
          <span>Stack:</span> JavaScript, jQuery, Typescript, Sass, Webpack,
          Cypress, AEM
        </p>
      </li>
      <li className="timeline-item">
        <h3>InteliWISE.com, Lublin — Web Developer</h3>
        <p className="timeline-date">October 2016 — December 2019</p>
        <p>
          <span>Project: </span>AI-based chatbot solution.
        </p>
        <p>
          <span>Responsibilities: </span>Customizing the appearance of the
          product according to the client's recommendations and developing
          additional full-stack functionalities; creating automated tests in
          Cypress.
        </p>
        <p>
          <span>Stack:</span> JavaScript, React, Node.js, Cypress, Docker, PHP
        </p>
      </li>
      <li className="timeline-item">
        <h3>Avrio Interactive, Warsaw — Web Developer</h3>
        <p className="timeline-date">March 2016 — May 2016</p>
        <p>
          <span>Project: </span>Creating websites based on the company's CMS
          system.
        </p>
        <p>
          <span>Stack:</span> JavaScript, jQuery, PHP
        </p>
      </li>
    </ul>
  );
}

export default VerticalContainer;
