import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationKg from "../assets/locales/translationKg.json";
import translationRu from "../assets/locales/translationRu.json";
import translationEn from "../assets/locales/translationEn.json";

const lng = localStorage.getItem("i18nextLng");

i18n.use(initReactI18next).init({
  resources: {
    EN: { translation: translationEn },
    RU: { translation: translationRu },
    KG: { translation: translationKg },
  },
  lng: lng ? lng : "KG",
  interpolation: { escapeValue: false },
});

export default i18n;
