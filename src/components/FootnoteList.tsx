import { useTranslation } from "react-i18next";
import type { Footnote } from "../utils/parseFootnotes";

interface FootnoteListProps {
  footnotes: Footnote[];
}

const FootnoteList: React.FC<FootnoteListProps> = ({ footnotes }) => {
  const { t } = useTranslation();

  if (footnotes.length === 0) {
    return null;
  }

  const handleBackToRef = (id: number) => {
    // Find all footnote refs with this id and scroll to the first one
    const refs = document.querySelectorAll(`[data-footnote-id="${id}"]`);
    if (refs.length > 0) {
      refs[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-space-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {t("footnotes.title")}
      </h2>
      <ol className="space-y-3">
        {footnotes.map((footnote) => (
          <li
            key={footnote.id}
            id={`footnote-${footnote.id}`}
            className="footnote-item flex gap-3 text-sm text-gray-600 dark:text-space-300 transition-colors duration-300"
          >
            <button
              onClick={() => handleBackToRef(footnote.id)}
              className="flex-shrink-0 text-space-500 hover:text-space-600 dark:hover:text-space-400 font-medium"
            >
              [{footnote.id}]
            </button>
            <span>{footnote.content}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default FootnoteList;
