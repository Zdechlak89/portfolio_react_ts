import { useRef, type MouseEvent, type ReactElement, type RefObject } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import type { Technology } from "./SkillsSection";

interface SkillModalProps {
  technology: Technology;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
}

const SkillModal = ({
  technology,
  onClose,
  triggerRef,
}: SkillModalProps): ReactElement => {
  const modalRef = useRef<HTMLDivElement>(null);

  useFocusTrap(modalRef, true, onClose, triggerRef);

  const stopPropagation = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  return (
    <div className="skill-modal-overlay" onClick={onClose}>
      <div
        className="skill-modal"
        role="dialog"
        aria-modal="true"
        aria-label={technology.name}
        ref={modalRef}
        onClick={stopPropagation}
      >
        <button
          type="button"
          className="skill-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="skill-modal__title">{technology.name}</h3>
        <p className="skill-modal__description">{technology.description}</p>
      </div>
    </div>
  );
};

export default SkillModal;
