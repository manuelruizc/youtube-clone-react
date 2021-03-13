const availableLanguages = [
    'ar',
    'ca',
    'de',
    'en',
    'es',
    'fr',
    'it',
    'nl',
    'pt',
];
let language = localStorage.getItem('language');
language = JSON.parse(language);
language = language ? language : navigator.languages;
let languageCode = language[1];
if (!availableLanguages.includes(languageCode)) {
    languageCode = 'en';
    language = ['en', 'en'];
}

export default language;
