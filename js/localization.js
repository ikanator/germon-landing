const { pathname } = window.location;
const LOCALIZATION_SWITCH = {
  en: "ua",
  ua: "en",
};
const isLocalized = pathname.includes("ua") || pathname.includes("en");

window.addEventListener("DOMContentLoaded", () => {
  if (isLocalized) setSelectedLanguage();
  else redirectToLanguage();
});

/**
 * @function getLanguageFromURL
 * @returns {string} language pathname
 */
function getLanguageFromURL() {
  return pathname?.replace(/\/$/, "")?.split("/")?.pop();
}

/**
 * @function isLanguageValid
 * @param {string} lang Localization language
 * @returns {boolean} is language valid
 */
function isLanguageValid(lang) {
  return ["en", "ua"].includes(lang);
}

/**
 * @function switchLanguage
 * @param {string} lang Language to be set
 * @describe set language in localStorage
 */
function switchLanguage(lang = "ua") {
  localStorage.setItem("localization", lang);

  const urlLang = getLanguageFromURL();
  console.log("switch", urlLang, lang);
  if (lang !== urlLang && isLanguageValid(lang)) {
    let newPathname = "";
    if (!isLocalized) {
      newPathname = `${pathname}${lang}`;
    } else {
      newPathname = pathname.replace(LOCALIZATION_SWITCH[lang], lang);
    }

    location.replace(newPathname);
  }
}

/**
 * @function redirectToLanguage
 * @describe redirect user to saved language version
 */
function redirectToLanguage() {
  const localization = localStorage.getItem("localization") || "ua";

  if (getLanguageFromURL() === localization) return;
  switchLanguage(localization);
}

/**
 * @function setSelectedLanguage
 * @describe set current language as language switcher value
 */
function setSelectedLanguage() {
  const urlLang = getLanguageFromURL();
  const lang = localStorage.getItem("localization");

  // Handle redirects from outside
  if (urlLang !== lang) {
    localStorage.setItem("localization", urlLang);
  }

  const radioButtons = document.querySelectorAll('input[name="language"]');

  if (isLanguageValid(lang)) {
    const radioButton = [...radioButtons].find((radio) => radio.id === urlLang);
    if (radioButton) {
      radioButton.checked = true;
    }
  }
}
