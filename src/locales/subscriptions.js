import languagesArray from '../helpers/languages';

const locales = {
    ca: {
        title: 'Llista de canals',
        subscribeButton: {
            subscribed: 'Suscrit',
            unsubscribed: 'Subscriu-me',
        },
        confirmModal: {
            confirmButton: 'Cancel·la la subscripció',
            cancelButton: 'Cancel·la',
            description: (channel_name) =>
                `Vols cancel·lar la subscripció a ${channel_name} ?`,
        },
        toast: {
            subscribed: "S'ha afegit la subscripció.",
            unsubscribed: "S'ha eliminat la subscripció",
        },
    },
    en: {
        title: 'Channel list',
        subscribeButton: {
            subscribed: 'Subscribed',
            unsubscribed: 'Subscribe',
        },
        confirmModal: {
            confirmButton: 'Unsubscribe',
            cancelButton: 'Cancel',
            description: (channel_name) => `Unsubscribe from ${channel_name}?`,
        },
        toast: {
            subscribed: 'Subscription added',
            unsubscribed: 'Subscription removed',
        },
    },
    es: {
        title: 'Lista de canales',
        subscribeButton: {
            subscribed: 'Suscrito',
            unsubscribed: 'Suscribirse',
        },
        confirmModal: {
            confirmButton: 'Anular suscripción',
            cancelButton: 'Cancelar',
            description: (channel_name) =>
                `¿Deseas anular tu suscripción a ${channel_name}?`,
        },
        toast: {
            subscribed: 'Suscripción agregada',
            unsubscribed: 'Se eliminó la suscripción',
        },
    },
    fr: {
        title: 'Liste des chaînes',
        subscribeButton: {
            subscribed: 'Abonné',
            unsubscribed: `S'abonner`,
        },
        confirmModal: {
            confirmButton: 'Se désabonner',
            cancelButton: 'Annuler',
            description: (channel_name) => `Se désabonner de ${channel_name} ?`,
        },
        toast: {
            subscribed: 'Abonnement ajouté',
            unsubscribed: 'Abonnement supprimé',
        },
    },
    de: {
        title: 'Kanalliste',
        subscribeButton: {
            subscribed: 'Abonniert',
            unsubscribed: 'Suscribirse',
        },
        confirmModal: {
            confirmButton: 'Abo beenden',
            cancelButton: 'Abbrechen',
            description: (channel_name) => `Abo für ${channel_name} beenden?`,
        },
        toast: {
            subscribed: 'Abo hinzugefügt',
            unsubscribed: 'Abo entfernt',
        },
    },
    it: {
        title: 'Elenco canali',
        subscribeButton: {
            subscribed: 'Iscritto',
            unsubscribed: 'Iscriviti',
        },
        confirmModal: {
            confirmButton: 'Anulla iscrizione',
            cancelButton: 'Anulla',
            description: (channel_name) =>
                `Vuoi annullare l'iscrizione a ${channel_name}?`,
        },
        toast: {
            subscribed: 'Iscrizione aggiunta',
            unsubscribed: 'Iscrizione rimossa',
        },
    },
};

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];
