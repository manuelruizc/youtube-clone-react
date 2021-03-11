import languagesArray from '../helpers/languages';

const locales = {
    "ca": {
        overlay: {
            text: "S'està reproduint"
        },
        tooltip: {
            verified: 'Verificat',
            music: "Canal oficial d'artista",
        }
    },
    "en": {
        overlay: {
            text: 'Now playing'
        },
        tooltip: {
            verified: 'Verified',
            music: 'Official Artist Channel',
        }
    },
    "de": {
        overlay: {
            text: 'Läuft gerade'
        },
        tooltip: {
            verified: 'Bestätigt',
            music: 'Offizieller Künstlerkanal',
        }
    },
    "fr": {
        overlay: {
            text: 'En course de lecture'
        },
        tooltip: {
            verified: 'Validé',
            music: "Chaîne d'artiste officielle",
        }
    },
    "es": {
        overlay: {
            text: 'Reproduciendo'
        },
        tooltip: {
            verified: 'Verificada',
            music: 'Canal oficial de artista',
        }
    },
    "it": {
        overlay: {
            text: 'Ora in riproduzione'
        },
        tooltip: {
            verified: 'Verificato',
            music: "Canalle ufficiale dell'artista",
        }
    }
}

const currentLanguage = languagesArray[1];

export default locales[currentLanguage];