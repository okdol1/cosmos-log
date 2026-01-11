import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
        {t("notFoundPage.title")}
      </h1>
      <p className="text-base text-gray-600 dark:text-gray-300 mb-6 max-w-sm">
        {t("notFoundPage.message")}
      </p>
    </div>
  );
};

export default NotFound;
