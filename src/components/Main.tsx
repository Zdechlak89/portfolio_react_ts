import Section from "./Section";

const MainSection = () => {
  return (
    <>
      <main>
        <Section id="main">
          <h1 className="main-heading">Emil Augustynowicz</h1>
          <p>- Web Developer</p>
          <p>- Photographer</p>
        </Section>
        <Section id="story">
          <h2>Story</h2>
          <p>Web Developer</p>
          <p>Photographer</p>
        </Section>
        <Section id="skills">
          <h2>Skills</h2>
          <p>Web Developer</p>
          <p>Photographer</p>
        </Section>
        <Section id="contact">
          <h2>Contact</h2>
          <p>Web Developer</p>
          <p>Photographer</p>
        </Section>
      </main>
    </>
  );
};

export default MainSection;
