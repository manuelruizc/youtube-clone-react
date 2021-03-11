import languagesArray from "../helpers/languages";

const locales = {
  ca: {
    title: {
      totalComments: (total) => total + " comentaris",
    },
    form: {
      placeholder: "Afegeix un comentari públic…",
      buttons: {
        cancel: "Cancel·la",
        confirm: "Comenta",
      },
    },
    modal: {
      options: {
        delete: "Suprimeix",
      },
    },
  },
  de: {
    title: {
      totalComments: (total) => total + " Kommentare",
    },
    form: {
      placeholder: "Öffentlich kommentieren…",
      buttons: {
        cancel: "Abbrechen",
        confirm: "Kommentieren",
      },
    },
    modal: {
      options: {
        delete: "Löschen",
      },
    },
  },
  en: {
    title: {
      totalComments: (total) => total + " comments",
    },
    form: {
      placeholder: "Add a public comment...",
      buttons: {
        cancel: "Cancel",
        confirm: "Comment",
      },
    },
    modal: {
      options: {
        delete: "Delete",
      },
    },
  },
  es: {
    title: {
      totalComments: (total) => total + " comentarios",
    },
    form: {
      placeholder: "Agrega un comentario público…",
      buttons: {
        cancel: "Cancelar",
        confirm: "Comentar",
      },
    },
    modal: {
      options: {
        delete: "Borrar",
      },
    },
  },
  it: {
    title: {
      totalComments: (total) => total + " commenti",
    },
    form: {
      placeholder: "Aggiungi un commento pubblico...",
      buttons: {
        cancel: "Annulla",
        confirm: "Commenta",
      },
    },
    modal: {
      options: {
        delete: "Elimina",
      },
    },
  },
  fr: {
    title: {
      totalComments: (total) => total + " commentaires",
    },
    form: {
      placeholder: "Ajouter un commentaire public...",
      buttons: {
        cancel: "Annuler",
        confirm: "Ajouter un commentaire",
      },
    },
    modal: {
      options: {
        delete: "Supprimer",
      },
    },
  },
};

const currentLanguage = languagesArray[1];
export default locales[currentLanguage];
