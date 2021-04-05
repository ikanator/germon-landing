const { pathname } = window.location;

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
  if (urlLang !== lang && isLanguageValid(urlLang)) {
    location = urlLang;
  }
}

/**
 * @function redirectToLanguage
 * @describe redirect user to saved language version
 */
function redirectToLanguage() {
  const localization = localStorage.getItem("localization") || "ua";
  switchLanguage("ua");

  location = localization;
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
