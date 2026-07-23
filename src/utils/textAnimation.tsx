import type { ReactElement } from "react";

export const splitTextIntoWords = (text: string): ReactElement[] => {
  return text.split(" ").map((word, index) => (
    <span key={index} className="word">
      {word}
    </span>
  ));
};
