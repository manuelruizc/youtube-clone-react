import languagesArray from "../helpers/languages";

const locales = {
  ca: {
    title: "Tendències",
  },
  en: {
    title: "Trending",
  },
  es: {
    title: "Tendencias",
  },
  fr: {
    title: "Tendances",
  },
  de: {
    title: "Trends",
  },
  it: {
    title: "Tendenze",
  },
};

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];
