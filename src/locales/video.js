import languagesArray from "../helpers/languages";

const locales = {
  ca: {
    uploaderInfo: {
      tooltips: {
        like: {
          active: "Ja no m'agrada",
          unactive: "M'agrada'",
        },
        dislike: "No m'agrada",
        share: "Comparteix",
        save: "Desa",
      },
      toast: {
        subscription: {
          subscribed: "Se eliminó la suscripción.",
          unsubscribed: "Suscripción agregada.",
        },
        likes: {
          liked: "S'ha afegit a Vídeos que m'agraden",
          unliked: "S'ha tret de Vídeos que m'agraden",
          disliked: "Aquest vídeo no t'agrada",
          undisliked: "S'ha suprimit el no m'agrada",
        },
      },
      unsubscribeModal: {
        description: (channel) =>
          `Vols cancel·lar la subscripció a ${channel}?`,
        confirmButton: "Cancel·la la subscripció",
      },
      subscribers: "subscriptors",
      subscribeButton: {
        subscribed: "Subscrit",
        unsubscribed: "Subscriu-me",
      },
      description: {
        showMore: "Mostra'n més",
        showLess: "Mostra'n menys",
      },
    },
    videoPlayer: {
      modal: {
        autoplay: "Reproducció automática",
        annotations: "Anotacions",
        playbackSpeed: "Velocitat de reproducció",
        normal: "Normal",
        custom: "Personalitzat",
      },
      tooltips: {
        controls: {
          cc: "Subtítols (c)",
          settings: "Configuració",
          mini: "Minireproductor (i)",
          theaterMode: {
            active: "Visualització predeterminada (t)",
            unactive: "Mode cinema (t)",
          },
          fullscreen: "Pantalla completa (f)",
        },
      },
    },
  },
  en: {
    uploaderInfo: {
      tooltips: {
        like: {
          active: "Unlike",
          unactive: "I like this",
        },
        dislike: "I dislike this",
        share: "Share",
        save: "Save",
      },
      toast: {
        subscription: {
          subscribed: "Subscription removed",
          unsubscribed: "Subscription added",
        },
        likes: {
          liked: "Added to Liked videos",
          unliked: "Removed from Liked videos",
          disliked: "You disliked this video",
          undisliked: "Dislike removed",
        },
      },
      unsubscribeModal: {
        description: (channel) => `Unsubscribe from ${channel}?`,
        confirmButton: "Unsubscribe",
      },
      subscribers: "subscribers",
      subscribeButton: {
        subscribed: "Subscribed",
        unsubscribed: "Subscribe",
      },
      description: {
        showMore: "Show more",
        showLess: "Show less",
      },
    },
    videoPlayer: {
      modal: {
        autoplay: "Autoplay",
        annotations: "Annotations",
        playbackSpeed: "Playback speed",
        normal: "Normal",
        custom: "Custom",
      },
      tooltips: {
        controls: {
          cc: "Subtitles/closed captions (cc)",
          settings: "Settings",
          mini: "Miniplayer (i)",
          theaterMode: {
            active: "Default view (t)",
            unactive: "Theater mode (t)",
          },
          fullscreen: "Fullscreen (f)",
        },
      },
    },
  },
  de: {
    uploaderInfo: {
      tooltips: {
        like: {
          active: "Mag ich nicht mehr",
          unactive: "Mag ich",
        },
        dislike: "Mag ich nicht",
        share: "Teilen",
        save: "Speichern",
      },
      toast: {
        subscription: {
          subscribed: "Abo entfernt",
          unsubscribed: "Abo hinzugefügt",
        },
        likes: {
          liked: 'Zu "Videos, die ich mag" hinzugefügt',
          unliked: 'Aus "Videos, die ich mag" entfernt',
          disliked: "Du magst das Video nicht",
          undisliked: '"Mag ich nicht"-Bewertung entfernt',
        },
      },
      unsubscribeModal: {
        description: (channel) => `Abo für ${channel} beenden?`,
        confirmButton: "Abo beenden",
      },
      subscribers: "Abonnenten",
      subscribeButton: {
        subscribed: "Abonniert",
        unsubscribed: "Abonnieren",
      },
      description: {
        showMore: "Mehr ansehen",
        showLess: "Weniger anzeigen",
      },
    },
    videoPlayer: {
      modal: {
        autoplay: "Autplay",
        annotations: "Anmerkungen",
        playbackSpeed: "Wiedergabegeschwindigkeit",
        normal: "Standard",
        custom: "Benutzerdefiniert",
      },
      tooltips: {
        controls: {
          cc: "Untertitel (c)",
          settings: "Einstenllungen",
          mini: "Miniplayer (i)",
          theaterMode: {
            active: "Standardansicht (t)",
            unactive: "Kinomodus (t)",
          },
          fullscreen: "Vollbild (f)",
        },
      },
    },
  },
  fr: {
    uploaderInfo: {
      tooltips: {
        like: {
          active: "Je n'aime plus",
          unactive: "J'aime ce contenu",
        },
        dislike: "Je n'aime pas ce contenu",
        share: "Partager",
        save: "Enregister",
      },
      toast: {
        subscription: {
          subscribed: "Abonnement supprimé",
          unsubscribed: "Abonnement ajouté",
        },
        likes: {
          liked: `Ajoutée aux vidéos "J'aime"`,
          unliked: `Supprimée des vidéos "J'aime"`,
          disliked: `Vous n'aimez pas cette vidéo`,
          undisliked: `Mention "Je n'aime pas" supprimée`,
        },
      },
      unsubscribeModal: {
        description: (channel) => `Se désabonner de ${channel} ?`,
        confirmButton: "Se désabonner",
      },
      subscribers: "abonnés",
      subscribeButton: {
        subscribed: "Abonné",
        unsubscribed: "S'abonner",
      },
      description: {
        showMore: "Plus",
        showLess: "Moins",
      },
    },
    videoPlayer: {
      modal: {
        autoplay: "Lecture automatique",
        annotations: "Annotations",
        playbackSpeed: "Vitesse de lecture",
        normal: "Normale",
        custom: "Personnalisé",
      },
      tooltips: {
        controls: {
          cc: "Sous-titres (c)",
          settings: "Paramètres",
          mini: "Lecteur réduit (i)",
          theaterMode: {
            active: "Affichage par défaut (t)",
            unactive: "Modo cinéma (t)",
          },
          fullscreen: "Plein écran (f)",
        },
      },
    },
  },
  es: {
    uploaderInfo: {
      tooltips: {
        like: {
          active: "Ya no me gusta",
          unactive: "Me gusta",
        },
        dislike: "No me gusta",
        share: "Compartir",
        save: "Guardar",
      },
      toast: {
        subscription: {
          subscribed: "Se eliminó la suscripción.",
          unsubscribed: "Suscripción agregada.",
        },
        likes: {
          liked: "Se agregó a los videos que te gustaron.",
          unliked: "Se eliminó de los videos que te gustaron.",
          disliked: "No te gusta este video.",
          undisliked: "Se quitó el no me gusta",
        },
      },
      unsubscribeModal: {
        description: (channel) => `¿Deseas anular tu suscripción a ${channel}?`,
        confirmButton: "Anular suscripción",
      },
      subscribers: "suscriptores",
      subscribeButton: {
        subscribed: "Suscrito",
        unsubscribed: "Suscribirse",
      },
      description: {
        showMore: "Mostrar más",
        showLess: "Mostrar menos",
      },
    },
    videoPlayer: {
      modal: {
        autoplay: "Reproducción automática",
        annotations: "Anotaciones",
        playbackSpeed: "Velocidad de reproducción",
        normal: "Normal",
        custom: "Personzalizar",
      },
      tooltips: {
        controls: {
          cc: "Subtítulos (c)",
          settings: "Configuración",
          mini: "Reproductor en miniatura (i)",
          theaterMode: {
            active: "Vista predeterminada (t)",
            unactive: "Modo cine (t)",
          },
          fullscreen: "Pantalla completa (f)",
        },
      },
    },
  },
  it: {
    uploaderInfo: {
      tooltips: {
        like: {
          active: "Non mi piace più",
          unactive: "Mi piace",
        },
        dislike: "Non mi piace",
        share: "Condividi",
        save: "Salva",
      },
      toast: {
        subscription: {
          subscribed: "Iscrizione rimossa",
          unsubscribed: "Iscrizione aggiunta",
        },
        likes: {
          liked: "Aggiunto ai video piaciuti",
          unliked: "Rimosso dai video piaciuti",
          disliked: "Questo video non ti piace",
          undisliked: "Non mi piace rimosso",
        },
      },
      unsubscribeModal: {
        description: (channel) => `Vuoi annullare l'iscrizione a ${channel}?`,
        confirmButton: "Anulla iscrizione",
      },
      subscribers: "iscritti",
      subscribeButton: {
        subscribed: "Iscritto",
        unsubscribed: "Iscriviti",
      },
      description: {
        showMore: "Mostra altro",
        showLess: "Mostra meno",
      },
    },
    videoPlayer: {
      modal: {
        autoplay: "Lecture automatique",
        annotations: "Annotations",
        playbackSpeed: "Vitesse de lecture",
        normal: "Normale",
        custom: "Personnalisé",
      },
      tooltips: {
        controls: {
          cc: "Sottotitoli (c)",
          settings: "Impostazioni",
          mini: "Mini player (i)",
          theaterMode: {
            active: "Visualizzazione predefinita (t)",
            unactive: "Modalità cinema (t)",
          },
          fullscreen: "Schermo intero (f)",
        },
      },
    },
  },
};

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];
