import languagesArray from '../helpers/languages';

const locales = {
    ca: {
        title: 'Biblioteca',
        headers: {
            history: 'Historial',
            watchLater: 'Visualitza més tard',
            playlists: 'Llistes de reproducció',
            likedVideos: "Vídeos que m'agraden",
            buttons: {
                seeAll: 'Mostra-ho tot',
            },
        },
        user: {
            data: {
                subscriptions: 'Subscripcions',
                uploads: 'Pujades',
                likes: "M'agrada",
            },
        },
    },
    en: {
        title: 'Library',
        headers: {
            history: 'History',
            watchLater: 'Watch later',
            playlists: 'Playlists',
            likedVideos: 'Liked videos',
            buttons: {
                seeAll: 'See all',
            },
        },
        user: {
            data: {
                subscriptions: 'Subscriptions',
                uploads: 'Uploads',
                likes: 'Likes',
            },
        },
    },
    de: {
        title: 'Mediathek',
        headers: {
            history: 'Verlauf',
            watchLater: 'Später ansehen',
            playlists: 'Playlists',
            likedVideos: 'Videos, die ich mag',
            buttons: {
                seeAll: 'Alle',
            },
        },
        user: {
            data: {
                subscriptions: 'Abos',
                uploads: 'Uploads',
                likes: '"Mag ich"-Bewertungen',
            },
        },
    },
    fr: {
        title: 'Bibliothèque',
        headers: {
            history: 'Historique',
            watchLater: 'À regarder plus tard',
            playlists: 'Playlists',
            likedVideos: `Vidéos "J'aime"`,
            buttons: {
                seeAll: 'Tout voir',
            },
        },
        user: {
            data: {
                subscriptions: 'Abonnements',
                uploads: 'Vidéos mises en ligne',
                likes: "J'aime",
            },
        },
    },
    es: {
        title: 'Biblioteca',
        headers: {
            history: 'Historial',
            watchLater: 'Ver más tarde',
            playlists: 'Listas de reproducción',
            likedVideos: 'Videos que me gustan',
            buttons: {
                seeAll: 'Ver todo',
            },
        },
        user: {
            data: {
                subscriptions: 'Suscripciones',
                uploads: 'Videos subidos',
                likes: 'Me gusta',
            },
        },
    },
    it: {
        title: 'Raccolta',
        headers: {
            history: 'Cronologia',
            watchLater: 'Guarda più tardi',
            playlists: 'Playlist',
            likedVideos: 'Video piaciuti',
            buttons: {
                seeAll: 'Vedi tutto',
            },
        },
        user: {
            data: {
                subscriptions: 'Iscrizioni',
                uploads: 'Video caricati',
                likes: 'Mi piace',
            },
        },
    },
};

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];
