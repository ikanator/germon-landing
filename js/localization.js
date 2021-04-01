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

  const pathname = location.replace("/", "");
  if (pathname !== lang && isLanguageValid(pathname)) {
    location = pathname;
  }
}

/**
 * @function redirectToLanguage
 * @describe redirect user to saved language version
 */
function redirectToLanguage() {
  const localization = localStorage.getItem("localization");
  if (!localization) {
    switchLanguage("ua");
  }
  location = localization || "ua";
}

/**
 * @function setSelectedLanguage
 * @describe set current language as language switcher value
 */
function setSelectedLanguage() {
  const pathname = location.pathname.replaceAll("/", "");
  const lang = localStorage.getItem("localization");

  // Handle redirects from outside
  if (pathname !== lang) {
    localStorage.setItem("localization", pathname);
  }

  const radioButtons = document.querySelectorAll('input[name="language"]');

  if (isLanguageValid(lang)) {
    const radioButton = [...radioButtons].find(
      (radio) => radio.id === pathname
    );
    if (radioButton) {
      radioButton.checked = true;
    }
  }
}
