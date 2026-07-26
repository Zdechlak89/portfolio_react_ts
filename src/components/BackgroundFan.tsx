import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BackgroundFan.scss";

gsap.registerPlugin(ScrollTrigger);

const BLADE_ANGLES: Array<{ closed: number; open: number }> = [
  { closed: 4, open: -78 },
  { closed: 4, open: -52 },
  { closed: 4, open: -26 },
  { closed: 4, open: 0 },
  { closed: 4, open: 26 },
  { closed: 4, open: 52 },
  { closed: 4, open: 78 },
];

function BackgroundFan(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blades = gsap.utils.toArray<HTMLElement>(
      ".bg-fan__blade",
      container,
    );
    const tweens: gsap.core.Tween[] = [];

    blades.forEach((blade, index) => {
      const angles = BLADE_ANGLES[index % BLADE_ANGLES.length];
      gsap.set(blade, { rotation: angles.closed });

      tweens.push(
        gsap.to(blade, {
          rotation: angles.open,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }),
      );
    });

    tweens.push(
      gsap.to(container, {
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.6,
        },
      }),
    );

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <div className="bg-fan" ref={containerRef} aria-hidden="true">
      <div className="bg-fan__pivot">
        {BLADE_ANGLES.map((_, index) => (
          <span className="bg-fan__blade" key={index} />
        ))}
      </div>
      <div className="bg-fan__glow" />
    </div>
  );
}

export default BackgroundFan;
