import languagesArray from "../helpers/languages";

const locales = {
  ca: {
    nav: {
      inputPlaceholder: "Cerca",
      signIn: "Inicia la sessió",
      signInMessage:
        "Inicieu la sessió per agradar els vídeos, fer comentaris i subscriure-us.",
      tooltips: {
        inputButton: "Cerca",
      },
    },
    sidenav: {
      home: "Inici",
      trending: "Tendències",
      subscriptions: "Subscripcions",
      library: "Biblioteca",
      history: "Historial",
      likedVideos: "Videos que m'agraden",
      watchLater: "Visualitza més tard",
      favorites: "Favorits",
      portfolio: "Qui ha fet això?",
    },
    titles: {
      subscriptions: "Subscripcions",
      showMore: "Mostra'n més",
      showLess: "Mostra'n menys",
      signIn: "Inicia la sessió",
    },
    bottomNav: {
      home: "Inici",
      trending: "Tendències",
      subscriptions: "Subscripcions",
      library: "Biblioteca",
    },
  },
  en: {
    nav: {
      inputPlaceholder: "Search",
      signIn: "Sign in",
      signInMessage: "Sign in to like videos, comment, and subscribe.",
      tooltips: {
        inputButton: "Search",
      },
    },
    sidenav: {
      home: "Home",
      trending: "Trending",
      subscriptions: "Subscriptions",
      library: "Library",
      history: "History",
      likedVideos: "Liked videos",
      watchLater: "Watch later",
      favorites: "Favorites",
      portfolio: "Who made this?",
    },
    titles: {
      subscriptions: "Subscriptions",
      showMore: "Show more",
      showLess: "Show less",
      signIn: "Sign in",
    },
    bottomNav: {
      home: "Home",
      trending: "Trending",
      subscriptions: "Subscriptions",
      library: "Library",
    },
  },
  fr: {
    nav: {
      inputPlaceholder: "Rechercher",
      signIn: "Se connecter",
      signInMessage:
        "Connectez-vous pour aimer des vidéos, commenter et vous abonner.",
      tooltips: {
        inputButton: "Rechercher",
      },
    },
    sidenav: {
      home: "Accueil",
      trending: "Tendances",
      subscriptions: "Abbonements",
      library: "Bibliothèque",
      history: "Historique",
      likedVideos: `Vidéos "J'aime"`,
      watchLater: "À regarder plus tard",
      favorites: "Favoris",
      portfolio: "Qui a fait cette?",
    },
    titles: {
      subscriptions: "Abbonements",
      showMore: "Plus",
      showLess: "Moins",
      signIn: "Se connecter",
    },
    bottomNav: {
      home: "Accueil",
      trending: "Tendances",
      subscriptions: "Abbonements",
      library: "Bibliothèque",
    },
  },
  de: {
    nav: {
      inputPlaceholder: "Suchen",
      signIn: "Anmelden",
      signInMessage:
        "Melden Sie sich an, um Videos zu mögen, zu kommentieren und zu abonnieren.",
      tooltips: {
        inputButton: "Suchen",
      },
    },
    sidenav: {
      home: "Start",
      trending: "Trends",
      subscriptions: "Abos",
      library: "Mediathek",
      history: "Verlauf",
      likedVideos: "Videos, die ich mag",
      watchLater: "Später ansehen",
      favorites: "Favoriten",
      portfolio: "Wer hat das gemacht?",
    },
    titles: {
      subscriptions: "Abos",
      showMore: "Mehr ansehen",
      showLess: "Weniger anzeigen",
      signIn: "Anmelden",
    },
    bottomNav: {
      home: "Start",
      trending: "Trends",
      subscriptions: "Abos",
      library: "Mediathek",
    },
  },
  es: {
    nav: {
      inputPlaceholder: "Buscar",
      signIn: "Acceder",
      signInMessage:
        "Inicie sesión para dar me gusta a los videos, comentar y suscribirse.",
      tooltips: {
        inputButton: "Buscar",
      },
    },
    sidenav: {
      home: "Principal",
      trending: "Tendencias",
      subscriptions: "Suscripciones",
      library: "Biblioteca",
      history: "Historial",
      likedVideos: "Videos que me gustan",
      watchLater: "Ver más tarde",
      favorites: "Favoritos",
      portfolio: "¿Quien hizo esto?",
    },
    titles: {
      subscriptions: "Suscripciones",
      showMore: "Mostrar más",
      showLess: "Mostrar menos",
      signIn: "Acceder",
    },
    bottomNav: {
      home: "Principal",
      trending: "Tendencias",
      subscriptions: "Suscripciones",
      library: "Biblioteca",
    },
  },
  it: {
    nav: {
      inputPlaceholder: "Cerca",
      signIn: "Accedi",
      signInMessage:
        "Accedi per mettere Mi piace ai video, commentare e iscriverti.",
      tooltips: {
        inputButton: "Cerca",
      },
    },
    sidenav: {
      home: "Home",
      trending: "Tendenze",
      subscriptions: "Iscrizioni",
      library: "Raccolta",
      history: "Cronologia",
      likedVideos: "Video piaciuti",
      watchLater: "Guarda più tardi",
      favorites: "Preferiti",
      portfolio: "Chi l'ha fatto?",
    },
    titles: {
      subscriptions: "Iscrizioni",
      showMore: "Mostra altro",
      showLess: "Mostra meno",
      signIn: "Accedi",
    },
    bottomNav: {
      home: "Home",
      trending: "Tendenze",
      subscriptions: "Iscrizioni",
      library: "Raccolta",
    },
  },
};

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];
