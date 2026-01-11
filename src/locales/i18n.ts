import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ko from "./ko.json";
import en from "./en.json";

const userLanguage = navigator.language.startsWith("ko") ? "ko" : "en";

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
  lng: userLanguage, // 초기 언어 설정
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
