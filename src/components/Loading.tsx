import { useTranslation } from "react-i18next";
import { Rocket } from "lucide-react";

const Loading: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Rocket size={32} className="text-space-500 animate-bounce" />
      <p className="mt-4 text-gray-600 dark:text-gray-300 font-mono">
        {t("common.loading")}
      </p>
    </div>
  );
};

export default Loading;
