import Section from "./Section";

const MainSection = () => {
  return (
    <>
      <main>
        <Section id="main">
          <div className="main-image"></div>
          <div className="main-text">
            <h1 className="main-heading">Emil Augustynowicz</h1>
            <p>Web Developer</p>
            <p>Photographer</p>
          </div>
        </Section>
        <Section id="story">
          <h2>Story</h2>
          <h3>Web Developer</h3>
          <p>Information about the Web Developer</p>
          <h3>Photographer</h3>
          <p>Information about the Photographer</p>
        </Section>
        <Section id="skills">
          <h2>Skills</h2>
          <h3>Web Developer</h3>
          <p>Information about the Web Developer's skills</p>
          <h3>Photographer</h3>
          <p>Information about the Photographer's skills</p>
        </Section>
        <Section id="contact">
          <h2>Contact</h2>
          <h3>Web Developer</h3>
          <p>Contact information for Web Developer</p>
          <h3>Photographer</h3>
          <p>Contact information for Photographer</p>
        </Section>
      </main>
    </>
  );
};

export default MainSection;
