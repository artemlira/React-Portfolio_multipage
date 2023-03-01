// eslint-disable-next-line import/no-extraneous-dependencies
import i18n from "i18next";
// eslint-disable-next-line import/no-extraneous-dependencies
import Backend from "i18next-http-backend";
// eslint-disable-next-line import/no-extraneous-dependencies
import { initReactI18next } from "react-i18next";
// eslint-disable-next-line import/no-extraneous-dependencies
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    whiteList: ["ua", "en"],
    debug: false,
    detection: {
      order: ["localStorage", "cookie"],
      cache: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
