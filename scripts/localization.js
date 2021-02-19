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
  window.localStorage.setItem("localization", lang);

  const pathname = window.location.replace("/", "");
  if (pathname !== lang && isLanguageValid(pathname)) {
    window.location = pathname;
  }
}

/**
 * @function redirectToLanguage
 * @describe redirect user to saved language version
 */
function redirectToLanguage() {
  const localization = window.localStorage.getItem("localization");
  if (!localization) {
    switchLanguage("ua");
  }
  window.location = localization || "ua";
}

/**
 * @function setSelectedLanguage
 * @describe set current language as language switcher value
 */
function setSelectedLanguage() {
  const lang = window.localStorage.getItem("localization");

  if (isLanguageValid(lang)) {
    const selectElement = document.getElementById("switch-language-select");
    selectElement.value = lang;
  }
}
