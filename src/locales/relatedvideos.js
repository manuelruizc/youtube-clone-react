import languagesArray from '../helpers/languages';

const locales = {
    "ca": {
        autoplay: 'Reproducció automática',
        next: 'A continuació',
        modal: {
            saveToWatchLater: 'Desa a Visualitza més tard',
            saveToPlaylist: 'Desa en una llista de reproducció',
        }
    },
    "en": {
        autoplay: 'Autoplay',
        next: 'Up next',
        modal: {
            saveToWatchLater: 'Save to Watch later',
            saveToPlaylist: 'Save to playlist',
        }
    },
    "de": {
        autoplay: 'Autoplay',
        next: 'Nächste Titel',
        modal: {
            saveToWatchLater: 'Zu "Später ansehen" hinzufügen',
            saveToPlaylist: 'Zu Playlist hinzufügen',
        }
    },
    "fr": {
        autoplay: 'Lecture automatique',
        next: 'À suivre',
        modal: {
            saveToWatchLater: 'Enregistrer dans la playlist "À regarder plus tard"',
            saveToPlaylist: 'Enregistrer dans une playlist',
        }
    },
    "es": {
        autoplay: 'Reproducción automática',
        next: 'A continuación',
        modal: {
            saveToWatchLater: 'Guardar en Ver más tarde',
            saveToPlaylist: 'Guardar en una lista de reproducción',
        }
    },
    "it": {
        autoplay: 'Riproduzione automatica',
        next: 'Prossimi video',
        modal: {
            saveToWatchLater: 'Salva in Guarda più tardi',
            saveToPlaylist: 'Salva in una playlist',
        }
    }
}

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];