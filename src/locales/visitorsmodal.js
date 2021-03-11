import languagesArray from "../helpers/languages";

const locales = {
  ca: {
    title: "Heu d’iniciar sessió per utilitzar aquesta opció.",
    buttons: {
      cancel: "Tanca",
      confirm: "Inicieu la sessió",
    },
  },
  de: {
    title: "Sie müssen sich anmelden, um diese Option nutzen zu können.",
    buttons: {
      cancel: "Schließen",
      confirm: "Einloggen",
    },
  },
  en: {
    title: "You need to log in to use this option.",
    buttons: {
      cancel: "Close",
      confirm: "Sign in",
    },
  },
  es: {
    title: "Necesita iniciar sesión para usar esta opción.",
    buttons: {
      cancel: "Cerrar",
      confirm: "Inicia sesión",
    },
  },
  it: {
    title: "Devi accedere per utilizzare questa opzione.",
    buttons: {
      cancel: "Vicino",
      confirm: "Registrati",
    },
  },
  fr: {
    title: "Vous devez vous connecter pour utiliser cette option.",
    buttons: {
      cancel: "Fermer",
      confirm: "S'identifier",
    },
  },
};

const currentLanguage = languagesArray[1];
export default locales[currentLanguage];
