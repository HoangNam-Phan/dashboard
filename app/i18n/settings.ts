export const fallbackLang = 'en';
export const languages = [fallbackLang, 'de'];
export const defaultNS = 'translation';
export const cookieName = 'i18next';

export function getOptions(lang = fallbackLang, ns = defaultNS) {
  return {
    supportedLangs: languages,
    fallbackLang,
    lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
