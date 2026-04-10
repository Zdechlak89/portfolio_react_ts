import React from "react";

export const splitTextIntoWords = (text: string) => {
  return text.split(" ").map((word, index) => (
    <span key={index} className="word">
      {word}
    </span>
  ));
};
