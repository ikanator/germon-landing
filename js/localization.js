const { pathname } = window.location;
const LOCALIZATION_SWITCH = {
  en: "ua",
  ua: "en",
};

/**
 * @function getLanguageFromURL
 * @returns {string} language pathname
 */
function getLanguageFromURL() {
  return pathname?.replace(/\/$/, "")?.split("/")?.pop() || "ua";
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
  if (lang !== urlLang && isLanguageValid(lang)) {
    const newLocation = pathname
      .split("/")
      .map((path) => LOCALIZATION_SWITCH[path] || path)
      .join("/");
    location.replace(newLocation);
  }
}

/**
 * @function redirectToLanguage
 * @describe redirect user to saved language version
 */
function redirectToLanguage() {
  const localization = localStorage.getItem("localization") || "ua";
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
