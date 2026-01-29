import { useState, useRef, useEffect } from "react";

interface FootnoteProps {
  id: number;
  content: string;
}

const Footnote: React.FC<FootnoteProps> = ({ id, content }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">("top");
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (showTooltip && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      // Show tooltip below if not enough space above
      if (spaceAbove < 100 && spaceBelow > spaceAbove) {
        setTooltipPosition("bottom");
      } else {
        setTooltipPosition("top");
      }
    }
  }, [showTooltip]);

  const handleClick = () => {
    const footnoteElement = document.getElementById(`footnote-${id}`);
    if (footnoteElement) {
      footnoteElement.scrollIntoView({ behavior: "smooth", block: "center" });
      footnoteElement.classList.add("highlight");
      setTimeout(() => {
        footnoteElement.classList.remove("highlight");
      }, 2000);
    }
  };

  return (
    <sup
      ref={triggerRef}
      className="footnote-ref relative cursor-pointer text-space-500 hover:text-space-600 dark:hover:text-space-400 select-none ml-0.5"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
    >
      [{id}]
      {showTooltip && (
        <span
          ref={tooltipRef}
          className={`footnote-tooltip absolute z-50 w-64 p-3 text-xs font-normal leading-relaxed text-left normal-case tracking-normal bg-gray-900 dark:bg-space-800 text-white rounded-lg shadow-lg ${
            tooltipPosition === "top"
              ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
              : "top-full mt-2 left-1/2 -translate-x-1/2"
          }`}
        >
          {content}
          <span
            className={`absolute w-2 h-2 bg-gray-900 dark:bg-space-800 rotate-45 left-1/2 -translate-x-1/2 ${
              tooltipPosition === "top" ? "-bottom-1" : "-top-1"
            }`}
          />
        </span>
      )}
    </sup>
  );
};

export default Footnote;
