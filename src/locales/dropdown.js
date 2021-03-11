import languagesArray from '../helpers/languages';

const locales = {
    "ca": {
        manageAccount: 'Gestiona el teu Compte de Google',
        account: 'Compte',
        portfolio: 'La meva cartera',
        github: 'El meu GitHub',
        linkedin: 'El meu LinkedIn',
        youtube: 'El meu canal de YouTube',
        signOut: 'Tanca la sessió',
        appareance: {
            title: 'Aparença',
            dark: 'Tema fosc',
            light: 'Tema clar',
            descriptionOne: "Aquest tema enfosqueix les zones de llum de la pàgina i proporciona una experiència nocturna ideal.",
            descriptionTwo: "La configuració del tema fosc només s'aplicarà en aquest navegador."
        },
        language: {
            title: 'Idioma',
            subtitle: 'Tria el teu idioma'
        }
    },
    "de": {
        manageAccount: 'Gestisci il tuo account Google',
        account: 'Konto',
        portfolio: 'Mein Portfolio',
        github: 'Mein GitHub',
        linkedin: 'Mein LinkedIn',
        youtube: 'Mein Youtube-Kanal',
        signOut: 'Abmelden',
        appareance: {
            title: 'Darstellung',
            dark: 'Dunkles Design',
            light: 'Helles Design',
            descriptionOne: "Dieses Thema verdunkelt die hellen Bereiche der Seite und bietet ein ideales Abenderlebnis.",
            descriptionTwo: "Ihre dunklen Themeneinstellungen werden nur in diesem Browser angewendet."
        },
        language: {
            title: 'Sprache',
            subtitle: 'Sprache auswählen '
        }
    },
    "en": {
        manageAccount: 'Manage your Google account',
        account: 'Account',
        portfolio: 'My portfolio',
        github: 'My GitHub',
        linkedin: 'My LinkedIn',
        youtube: 'My YouTube channel',
        signOut: 'Sign out',
        appareance: {
            title: 'Appearance',
            dark: 'Dark theme',
            light: 'Light theme',
            descriptionOne: "This theme darkens the light areas of the page, providing an ideal evening experience.",
            descriptionTwo: "Your dark theme settings will only be applied in this browser."
        },
        language: {
            title: 'Language',
            subtitle: 'Choose your language'
        }
    },
    "es": {
        manageAccount: 'Administra tu cuenta de Google',
        account: 'Cuenta',
        portfolio: 'Mi portfolio',
        github: 'Mi GitHub',
        linkedin: 'Mi LinkedIn',
        youtube: 'Mi canal de YouTube',
        signOut: 'Salir',
        appareance: {
            title: 'Aspecto',
            dark: 'Tema oscuro',
            light: 'Tema claro',
            descriptionOne: "Este tema oscurece las áreas claras de la página, proporcionando una experiencia nocturna ideal.",
            descriptionTwo: "La configuración de su tema oscuro solo se aplicará en este navegador."
        },
        language: {
            title: 'Idioma',
            subtitle: 'Selecciona tu idioma'
        }
    },
    "it": {
        manageAccount: 'Gestisci il tuo account Google',
        account: 'Account',
        portfolio: 'Il mio portfolio',
        github: 'Il mio GitHub',
        linkedin: 'Il mio LinkedIn',
        youtube: 'Il mio canale YouUube',
        signOut: 'Esci',
        appareance: {
            title: 'Aspetto',
            dark: 'Tema oscuro',
            light: 'Tema chiaro',
            descriptionOne: "Questo tema scurisce le aree chiare della pagina, offrendo un'esperienza serale ideale.",
            descriptionTwo: "Le impostazioni del tuo tema scuro verranno applicate solo in questo browser."
        },
        language: {
            title: 'Lingua',
            subtitle: 'Scegli la tua lingua'
        }
    },
    "fr": {
        manageAccount: 'Gérer votre compte Google',
        account: 'Compte',
        portfolio: 'Mon portfolio',
        github: 'Mon GitHub',
        linkedin: 'Mon LinkedIn',
        youtube: 'Ma chaîne YouTube',
        signOut: 'Se déconnecter',
        appareance: {
            title: 'Apparence',
            dark: 'Thème foncé',
            light: 'Thème clair',
            descriptionOne: "Este tema oscurece las áreas claras de la página, proporcionando una experiencia nocturna ideal.",
            descriptionTwo: "La configuración de su tema oscuro solo se aplicará en este navegador."
        },
        language: {
            title: 'Langue',
            subtitle: 'Choix de la langue'
        }
    },
}

const currentLanguage = languagesArray[1];
export default locales[currentLanguage];