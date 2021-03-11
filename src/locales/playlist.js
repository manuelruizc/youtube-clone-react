import datesLocales from './dates';
import languagesArray from '../helpers/languages';

const locales = {
    "ca": {
        updated: (date) => {
            if(date === 'today') {
                return `Actualitzada avui`;
            }
            else {
                date = date.split(' ');
                date = date[0] + ' ' + datesLocales[date[1]].es;
                return `Es va actualitzar per última vegada fa ${date}`;
            }
        },
        playlistsType: [
            'Pública',
            'Oculta',
            'Privada'
        ],
        delete: 'Suprimeix la llista',
        noVideos: "Aquesta llista de reproducció encara no conté cap vídeo.",
        smallModal: {
            queue: 'Afegeis a la cua',
            watchLater: 'Desa a Visualitza més tard',
            playlist: 'Desa en una llista de reproducció',
            remove: (playlist) => `Suprimeix de la llista ${playlist}`,
            portfolio: 'Visita mi portafolio',
        },
        confirmModal: {
            title: 'Suprimeix la llista',
            description: (playlist) => {
                return `Confirmes que vols suprimir la llista de reproducció <b>${playlist}</b>?<br /><br />Nota: l'eliminació de llistes de reproducció és una acció permanent i no es pot desfer.`;
            },
            button: 'Suprimeix'
        },
        defaultPlaylists: {
            LL: "Videos que m'agraden",
            WatchLater: "Visualitza més tard"
        }
    },
    "en": {
        updated: (date) => {
            if(date === 'today') {
                return `Updated today`;
            }
            else {
                return `Updated ${date}`;
            }
        },
        playlistsType: [
            'Public',
            'Private',
            'Not Listed'
        ],
        delete: 'Delete',
        noVideos: "No videos in this playlist yet",
        smallModal: {
            queue: 'Add to queue',
            watchLater: 'Save to Watch later',
            playlist: 'Save to playlist',
            remove: (playlist) => `Remove from ${playlist}`,
            portfolio: 'Visit my portfolio',
        },
        confirmModal: {
            title: 'Delete playlist',
            description: (playlist) => {
                return `Are you sure you want to delete <b>${playlist}</b>?<br /><br />Note: Deleting playlists is a permanent action and cannot be undone.`;
            },
            button: 'Delete'
        },
        defaultPlaylists: {
            LL: 'Liked videos',
            WatchLater: 'Watch later'
        }
    },
    "fr": {
        updated: (date) => {
            if(date === 'today') {
                return `Mise à jour aujourd'hui`;
            }
            else {
                date = date.split(' ');
                date = date[0] + ' ' + datesLocales[date[1]].es;
                return `Dernière modification le ${date}`;
            }
        },
        numberOfVideos: (number) => `${number} vidéos`,
        playlistsType: [
            'Publique',
            'Priveé',
            'Non répertoriée'
        ],
        delete: 'Supprimer la playlist',
        noVideos: "Cette playlist ne contient aucune vidéo pour le moment.",
        smallModal: {
            queue: "Ajouter à la file d'attente",
            watchLater: `Enregistrer dans la playlist "À regarder plus tard"`,
            playlist: "Enregistrer dans une playlist",
            remove: (playlist) => `Supprimer de ${playlist}`,
            portfolio: 'Visita mi portafolio',
        },
        confirmModal: {
            title: 'Supprimer la playlist',
            description: (playlist) => {
                return `Voulez-vous vraiment supprimer <b>${playlist}</b> ?<br /><br />Remarque : La suppression de playlists est une opération définitive et irréversible.`;
            },
            button: 'Supprimer'
        },
        defaultPlaylists: {
            LL: `Vidéos "J'aime"`,
            WatchLater: 'À regarder plus tard'
        }
    },
    "de": {
        updated: (date) => {
            if(date === 'today') {
                return "Heute aktualisiert";
            }
            else {
                date = date.split(' ');
                date = date[0] + ' ' + datesLocales[date[1]].es;
                return `Zuletzt am ${date}`;
            }
        },
        playlistsType: [
            'Öffentlich',
            'Privat',
            'Nicht gelistet'
        ],
        delete: 'Playlist löschen',
        noVideos: "Noch keine Videos in dieser Playlist",
        smallModal: {
            queue: 'In die Wiedergabeliste',
            watchLater: 'Zu "Später ansehen" hinzufügene',
            playlist: 'Zu Playlist hinzufügen',
            remove: (playlist) => `Aus ${playlist} entfernen`,
            portfolio: 'Visita mi portafolio',
        },
        confirmModal: {
            title: 'Playlist löschen',
            description: (playlist) => {
                return `Bist du dir sicher, dass du <b>${playlist}</b> löschen möchtest?<br /><br />Hinweis: Das Löschen von Playlists ist endgültig und kann nicht rückgängig gemacht werden.`;
            },
            button: 'Löschen'
        },
        defaultPlaylists: {
            LL: 'Videos, die ich mag',
            WatchLater: 'Später ansehen'
        }
    },
    "es": {
        updated: (date) => {
            if(date === 'today') {
                return `Actualizada hoy`;
            }
            else {
                date = date.split(' ');
                date = date[0] + ' ' + datesLocales[date[1]].es;
                return `Se actualizó por última vez hace ${date}`;
            }
        },
        playlistsType: [
            'Pública',
            'Privada',
            'No listada'
        ],
        delete: 'Borrar lista de reproducción',
        noVideos: "Aún no hay videos en esta lista de reproducción.",
        smallModal: {
            queue: 'Agregar a la fila',
            watchLater: 'Guardar en Ver más tarde',
            playlist: 'Guardar en lista de reproducción',
            remove: (playlist) => `Eliminar de ${playlist}`,
            portfolio: 'Visita mi portafolio',
        },
        confirmModal: {
            title: 'Borrar lista de reproducción',
            description: (playlist) => {
                return `¿Estás seguro de que deseas borrar <b>${playlist}</b>?<br /><br />Nota: Eliminar una lista de reproducción es una acción permanente y no se puede deshacer.`;
            },
            button: 'Borrar'
        },
        defaultPlaylists: {
            LL: 'Videos que me gustan',
            WatchLater: 'Ver más tarde'
        }
    },
    "it": {
        updated: (date) => {
            if(date === 'today') {
                return `Aggiornata oggi`;
            }
            else {
                date = date.split(' ');
                date = date[0] + ' ' + datesLocales[date[1]].es;
                return `Ultimo aggiornamento in data ${date}`;
            }
        },
        playlistsType: [
            'Pubblica',
            'Non in elenco',
            'Privata',
        ],
        delete: 'Elimina playlist',
        noVideos: "Ancora nessun video in questa playlist",
        smallModal: {
            queue: 'Aggiungi alla coda',
            watchLater: 'Salva in Guarda più tardi',
            playlist: 'Salva in una playlist',
            remove: (playlist) => `Rimuovi da ${playlist}`,
            portfolio: 'Visita mi portafolio',
        },
        confirmModal: {
            title: 'Elimina playlist',
            description: (playlist) => {
                return `Vuoi eliminare <b>${playlist}</b>?<br /><br /> Nota. L'eliminazione delle playlist è un'azione definitiva e non può essere annullata.`;
            },
            button: 'Elimina'
        },
        defaultPlaylists: {
            LL: 'Video piaciuti',
            WatchLater: 'Guarda più tardi'
        }
    }
}

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];