import languagesArray from '../helpers/languages';

const locales = {
    "ca": {
        toast: {
            added: (playlist) => `S'ha afegit a ${playlist}`,
            removed: (playlist) => `S'ha suprimit de la llista de reproducció ${playlist}`,
            error: 'Hi havia un error',
        },
        modal: {
            add: 'Crea una llista de reproducció',
            title: 'Desa-ho a...'
        },
        newPlaylistModal: {
            privacy: {
                title: 'Privadesa',
            },
            name: {
                title: 'Privadesa ',
                placeholder: 'Escriu el nom de la llista de reproducció'
            },
            confirmButton: 'Crea'
        },
        customPlaylists: {
            "WatchLater": 'Visualitza més tard',
            "Favorites": 'Favorits',
        },
        playlistsPrivacy: [
            {title: "Pública", value: 1},
            {title: "Oculta", value: 2},
            {title: "Privada", value: 3},
        ],
    },
    "en": {
        toast: {
            added: (playlist) => `Added to ${playlist}`,
            removed: (playlist) => `Removed from ${playlist}`,
            error: 'There was an error',
        },
        modal: {
            add: 'Create new playlist',
            title: 'Save to...'
        },
        newPlaylistModal: {
            privacy: {
                title: 'Privacy',
            },
            name: {
                title: 'Name',
                placeholder: 'Enter playlist name...'
            },
            confirmButton: 'Create'
        },
        customPlaylists: {
            "WatchLater": 'Watch later',
            "Favorites": 'Favorites',
        },
        playlistsPrivacy: [
            {title: "Public", value: 1},
            {title: "No listed", value: 2},
            {title: "Private", value: 3},
        ],
        
    },
    "de": {
        toast: {
            added: (playlist) => `Zu ${playlist} hinzugefügt`,
            removed: (playlist) => `Aus ${playlist} entfernt`,
            error: 'Es gab einen Fehler',
        },
        modal: {
            add: 'Neue Playlist erstellen',
            title: 'Speichern unter...'
        },
        newPlaylistModal: {
            privacy: {
                title: 'Datenschutz',
            },
            name: {
                title: 'Name',
                placeholder: 'Titel der Playlist eingeben...'
            },
            confirmButton: 'Erstellen'
        },
        customPlaylists: {
            "WatchLater": 'Später ansehen',
            "Favorites": 'Favoriten',
        },
        playlistsPrivacy: [
            {title: "Öffentlich", value: 1},
            {title: "Nicht gelistet", value: 2},
            {title: "Privat", value: 3},
        ],
    },
    "fr": {
        toast: {
            added: (playlist) => `Ajoutée à la playlist ${playlist}`,
            removed: (playlist) => `Supprimée de ${playlist}`,
            error: 'Il y a eu une erreur',
        },
        modal: {
            add: 'Créer une playlist',
            title: 'Enregistrer dans...'
        },
        newPlaylistModal: {
            privacy: {
                title: 'Confidentialité',
            },
            name: {
                title: 'Supprimée de',
                placeholder: 'Saisissez le nom de la playlist'
            },
            confirmButton: 'Créer'
        },
        customPlaylists: {
            "WatchLater": 'À regarder plus tard',
            "Favorites": 'Favoris',
        },
        playlistsPrivacy: [
            {title: "Publique", value: 1},
            {title: "Non repertoriée", value: 2},
            {title: "Privée", value: 3},
        ],
    },
    "es": {
        toast: {
            added: (playlist) => `Se agregó ${playlist}`,
            removed: (playlist) => `Se quitó ${playlist}`,
            error: 'Hubo un error',
        },
        modal: {
            add: 'Nueva lista de reproducción',
            title: 'Guardar en...'
        },
        newPlaylistModal: {
            privacy: {
                title: 'Privacidad',
            },
            name: {
                title: 'Nombre',
                placeholder: 'Escribe el nombre de la lista'
            },
            confirmButton: 'Crear'
        },
        customPlaylists: {
            "WatchLater": 'Ver más tarde',
            "Favorites": 'Favoritos',
        },
        playlistsPrivacy: [
            {title: "Pública", value: 1},
            {title: "No listada", value: 2},
            {title: "Privada", value: 3},
        ],
    },
    "it": {
        toast: {
            added: (playlist) => `Aggiunto a ${playlist}`,
            removed: (playlist) => `Rimosso da ${playlist}`,
            error: "C'era un errore",
        },
        modal: {
            add: 'Crea nuova playlist',
            title: 'Salva in...'
        },
        newPlaylistModal: {
            privacy: {
                title: 'Privacy',
            },
            name: {
                title: 'Nome',
                placeholder: 'Inserisci il nome della playlist…'
            },
            confirmButton: 'Crea'
        },
        customPlaylists: {
            "WatchLater": 'Guarda più tardi',
            "Favorites": 'Preferiti',
        },
        playlistsPrivacy: [
            {title: "Pubblica", value: 1},
            {title: "Non in elenco", value: 2},
            {title: "Privata", value: 3},
        ],
    }
};

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];