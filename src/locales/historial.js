import languagesArray from '../helpers/languages';

const locales = {
    "ca": {
        title: 'Historial',
        watch: {
            title: 'Historial de visualitzacions',
            noVideos: 'Aquesta llista no té cap vídeo.',
        },
        search: {
            title: 'Historial de cerques',
            noVideos: "L'historial de cerques és buit.",
        },
        manage: {
            inputPlaceholder: "Cerca a l'historial de visualitzacions",
            type: "Tipus d'historial",
            watch: 'Historial de visualitzacions',
            search: 'Historial de cerques',
            comments: 'Comentaris',
            community: 'Comunitat',
            chat: 'Xat en directe',
            buttons: {
                clear: {
                    watch: "Esborra tot l'historial de visualitzacions",
                    search: "Esborra tot l'historial de cerques",
                },
                pause: {
                    watch: "Posa en pausa l'historial de visualitzacions",
                    search: "Posa en pausa l'historial de cerques",
                },
                activity: "Gestiona l'activitat",
            }
        },
        confirmModal: {
            watch: {
                title: "Vols esborrar l'historial de visualitzacions?",
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    S'esborrarà l'historial de visualitzacions de YouTube de totes les aplicacions de YouTube en tots els dispositius.<br /><br />
                    
                    Es restabliran les teves recomanacions de vídeos, però és possible que es continuïn veient influenciades per la teva activitat en altres productes de Google. Per obtenir més informació, visita La meva activitat.`
                },
                confirmButton: "Esborra l'historial de visualitzacions",
            },
            search: {
                title: "Vols esborrar l'historial de visualitzacions?",
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    S'esborrarà l'historial de cerques de YouTube de totes les aplicacions de YouTube en tots els dispositius.<br /><br />
                    
                    Es restabliran les teves recomanacions de vídeos, però és possible que es continuïn veient influenciades per la teva activitat en altres productes de Google. Per obtenir més informació, visita La meva activitat.`
                },
                confirmButton: "Esborra l'historial de cerques",
            }
        },
        itemRemoved: "Aquest element s'ha eliminat del vostre historial"
    },
    "en": {
        title: 'History',
        watch: {
            title: 'Watch history',
            noVideos: "This list has no videos."
        },
        search: {
            title: 'Search history',
            noVideos: "Your search history is empty."
        },
        manage: {
            inputPlaceholder: 'Search watch history',
            type: 'History type',
            watch: 'Watch history',
            search: 'Search history',
            comments: 'Comments',
            community: 'Community',
            chat: 'Live chat',
            buttons: {
                clear: {
                    watch: 'Clear all watch history',
                    search: 'Clear all search history',
                },
                pause: {
                    watch: 'Pause watch history',
                    search: 'Pause search history',
                },
                activity: 'Manage all activity',
            }
        },
        confirmModal: {
            watch: {
                title: '¿Borrar historial de reproducciones?',
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    Your YouTube search history will be cleared from all YouTube apps on all devices.<br /><br />

                    Your video recommendations will be reset, but may still be influenced by activity on other Google products. To learn more, visit My Activity.`
                },
                confirmButton: 'Clear watch history',
            },
            search: {
                title: '¿Borrar historial de búsqueda?',
                description: (username, user_email) => {
                    return `${username} (${user_email})<br /><br />

                    Your YouTube search history will be cleared from all YouTube apps on all devices.<br /><br />

                    Your video recommendations will be reset, but may still be influenced by activity on other Google products. To learn more, visit My Activity.`
                },
                confirmButton: 'Clear search history',
            }
        },
        itemRemoved: 'This item has been removed from your history'
    },
    "fr": {
        title: 'Historique',
        watch: {
            title: 'Historique de visionnage ',
            noVideos: "Cette liste ne contient aucune vidéo."
        },
        search: {
            title: 'Historique des recherches',
            noVideos: "Votre historique des recherches est vide."
        },
        manage: {
            inputPlaceholder: "Recherche dans l'historique",
            type: "Type d'historique",
            watch: 'Historique de visionnage',
            search: 'Historique de recherches',
            comments: 'Commentaires',
            community: 'Communauté',
            chat: 'Chat en direct',
            buttons: {
                clear: {
                    watch: "Effacer tout l'historique des vidéos regardées",
                    search: "Effacer tout l'historique de recherche",
                },
                pause: {
                    watch: "Suspendre l'historique de la montre",
                    search: "Suspendre l'historique de recherche",
                },
                activity: "Gérer l'activité"
            }
        },
        confirmModal: {
            watch: {
                title: "Effacer l'historique des vidéos regardées ?",
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    Votre historique des vidéos regardées sur YouTube sera effacé de toutes les applications YouTube, sur tous les appareils.<br /><br />
                    
                    Vos recommandations de vidéos seront réinitialisées, mais pourront encore être influencées par vos interactions avec d'autres produits Google. Pour en savoir plus, rendez-vous sur Mon activité.`
                },
                confirmButton: "Effacer l'historique des vidéos regardées",
            },
            search: {
                title: "Effacer l'historique de recherches ?",
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    Votre historique de recherches sur YouTube sera effacé de toutes les applications YouTube, sur tous les appareils.<br /><br />
                    
                    Vos recommandations de vidéos seront réinitialisées, mais pourront encore être influencées par vos interactions avec d'autres produits Google. Pour en savoir plus, rendez-vous sur Mon activité.`
                },
                confirmButton: "Effacer l'historique de recherches",
            }
        },
        itemRemoved: 'Cet élément a été supprimé de votre historique'
    },
    "de": {
        title: 'Geschichte',
        watch: {
            title: 'Wiedergabeverlauf',
            noVideos: "In dieser Liste sind keine Videos vorhanden."
        },
        search: {
            title: 'Suchverlauf',
            noVideos: "Dein Suchverlauf ist leer."
        },
        manage: {
            inputPlaceholder: 'In Wiedergabeverlauf suchen',
            type: 'Verlaufstyp',
            watch: 'Wiedergabeverlauf',
            search: 'Suchverlauf',
            comments: 'Kommentare',
            community: 'Community',
            chat: 'Livechat',
            buttons: {
                clear: {
                    watch: 'Gesamten Wiedergabeverlauf löschen',
                    search: 'Gesamten Suchverlauf löschen',
                },
                pause: {
                    watch: 'Wiedergabeverlauf pausieren',
                    search: 'Suchverlauf pausieren',
                },
                activity: 'Verlauf verwalten',
            }
        },
        confirmModal: {
            watch: {
                title: 'Wiedergabeverlauf löschen?',
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    Dein YouTube-Wiedergabeverlauf wird in allen YouTube-Apps auf allen Geräten gelöscht.<br /><br />
                    
                    Deine Videoempfehlungen werden zurückgesetzt, können aber weiterhin durch Aktivitäten in Verbindung mit anderen Google-Produkten beeinflusst werden. Weitere Informationen findest du unter Meine Aktivitäten.`
                },
                confirmButton: 'Wiedergabeverlauf löschen',
            },
            search: {
                title: 'Suchverlauf löschen?',
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    Dein YouTube-Suchverlauf wird in allen YouTube-Apps auf allen Geräten gelöscht.<br /><br />
                    
                    Deine Videoempfehlungen werden zurückgesetzt, können aber weiterhin durch Aktivitäten in Verbindung mit anderen Google-Produkten beeinflusst werden. Weitere Informationen findest du unter Meine Aktivitäten.`
                },
                confirmButton: 'Suchverlauf löschen',
            }
        },
        itemRemoved: 'Dieser Artikel wurde aus Ihrem Verlauf entfernt'
    },
    "es": {
        title: 'Historial',
        watch: {
            title: 'Historial de reproducciones',
            noVideos: "Esta lista no tiene videos."
        },
        search: {
            title: 'Historial de búsqueda',
            noVideos: "Tu historial de búsquedas está vacío."
        },
        manage: {
            inputPlaceholder: 'Buscar en el historial',
            type: 'Tipo de historial',
            watch: 'Historial de reproducciones',
            search: 'Historial de búsqueda',
            comments: 'Comentarios',
            community: 'Comunidad',
            chat: 'Chat en vivo',
            buttons: {
                clear: {
                    watch: 'Borrar todo el historial de reproducciones',
                    search: 'Borrar todo el historial de búsqueda',
                },
                pause: {
                    watch: 'Pausar el historial de reproducciones',
                    search: 'Pausar el historial de búsqueda',
                },
                activity: 'Administrar la actividad',
            }
        },
        confirmModal: {
            watch: {
                title: '¿Borrar historial de reproducciones?',
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    Se borrará el historial de reproducciones de YouTube en todas las apps de YouTube, en todos los dispositivos.<br /><br />
                    
                    Se restablecerán tus recomendaciones de videos, pero es posible que la actividad en otros productos de Google siga influyendo en ellas. Para obtener más información, visita Mi actividad.`
                },
                confirmButton: 'Borrar historial de reproducciones',
            },
            search: {
                title: '¿Deseas borrar el historial de búsqueda?',
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    Se borrará el historial de reproducciones de YouTube en todas las apps de YouTube, en todos los dispositivos.<br /><br />
                    
                    Se restablecerán tus recomendaciones de videos, pero es posible que la actividad en otros productos de Google siga influyendo en ellas. Para obtener más información, visita Mi actividad.`
                },
                confirmButton: 'Borrar historial de búsqueda',
            }
        },
        itemRemoved: 'This item has been removed from your history'
    },
    "it": {
        title: 'Cronologia',
        watch: {
            title: 'Cronologia visualizzazioni',
            noVideos: "Questo elenco non include video."
        },
        search: {
            title: 'Cronologia delle ricerche',
            noVideos: "La tua cronologia delle ricerche è vuota."
        },
        manage: {
            inputPlaceholder: 'Cerca nella cronologia visualizzazioni',
            type: ' Tipo di cronologia',
            watch: 'Cronologia visualizzazioni',
            search: 'Cronologia ricerche',
            comments: 'Commenti',
            community: 'Community',
            chat: 'Chat dal vivo',
            buttons: {
                clear: {
                    watch: 'Cancella tutta la cronologia visualizzazioni',
                    search: 'Cancella tutta la cronologia ricerche',
                },
                pause: {
                    watch: 'Sospendi cronologia visualizzazioni',
                    search: 'Sospendi cronologia ricerche',
                },
                activity: 'Gestisci attività',
            }
        },
        confirmModal: {
            watch: {
                title: 'Cancellare la cronologia delle visualizzazioni?',
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    La tua cronologia delle visualizzazioni di YouTube sarà cancellata da tutte le app YouTube su tutti i dispositivi.<br /><br />
                    
                    I consigli sui video verranno reimpostati, ma potrebbero ancora essere influenzati dalle attività effettuate su altri prodotti Google. Per ulteriori informazioni consulta Le mie attività.`
                },
                confirmButton: 'Cancella cronologia delle visualizzazioni',
            },
            search: {
                title: 'Cancellare la cronologia delle ricerche?',
                description: (username, user_email) =>{
                    return `${username} (${user_email})<br /><br />

                    La tua cronologia delle ricerche di YouTube sarà cancellata da tutte le app YouTube su tutti i dispositivi.<br /><br />
                    
                    I consigli sui video verranno reimpostati, ma potrebbero ancora essere influenzati dalle attività effettuate su altri prodotti Google. Per ulteriori informazioni consulta Le mie attività.`
                },
                confirmButton: 'Cancella cronologia delle ricerche',
            }
        },
        itemRemoved: 'Questo elemento è stato rimosso'
    }
}

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];