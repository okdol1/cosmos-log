import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SectionHeaderProps {
  title: string;
  linkTo: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkTo }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between border-b border-gray-100 dark:border-space-800 pb-3 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <Link
        to={linkTo}
        className="flex items-center gap-1 text-sm text-gray-500 dark:text-space-400 hover:text-space-500 dark:hover:text-space-400 transition-colors"
      >
        {t("home.viewAll")}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default SectionHeader;
