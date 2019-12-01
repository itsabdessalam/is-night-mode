const DEFAULT_OPTIONS = {
  day: 6,
  night: 20,
  checkLocalStorage: false,
  itemName: "night-mode",
  checkOSTheme: false
};

/**
 * Checks if the given value is an integer
 *
 * @param {*} value Value to check
 * @returns {boolean}
 */
function isInteger(value) {
  return (
    typeof value === "number" && isFinite(value) && Math.floor(value) === value
  );
}

/**
 * Checks if the given value is a boolean
 *
 * @param {*} value Value to check
 * @returns {boolean}
 */
function isBoolean(value) {
  return typeof value === "boolean";
}

/**
 * Checks if the given value is a string
 *
 * @param {*} value Value to check
 * @returns {boolean}
 */
function isString(value) {
  return typeof value === "string";
}

/**
 * Checks if the current runtime environment is a browser
 *
 * @returns {boolean}
 */
function isBrowser() {
  return ![typeof window, typeof document].some(e => e === "undefined");
}

/**
 * Returns an item from localStorage based in key
 *
 * @param {*} key Key value to retrieve from localStorage
 * @returns
 */
function getLocalStorageData(key) {
  if (!isBrowser() || !key) {
    return;
  }
  const item = window.localStorage.getItem(key);
  if (!item) {
    return;
  }
  return JSON.parse(item);
}

/**
 * Checks if cuurent browser has prefers-color-scheme: dark
 *
 * @returns {boolean}
 */
function isOSNightMode() {
  if (!isBrowser()) {
    return;
  }
  return (
    window.matchMedia("(prefers-color-scheme)").media !== "not all" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/**
 * Checks if options object has valid properties
 *
 * @param {*} options
 */
function checkOptionsObject(options) {
  if (!isInteger(options.day) || options.day == null) {
    throw new TypeError(
      `Expected day option to be an integer, instead got type ${typeof options.day} not integer`
    );
  }
  if (!isInteger(options.night) || options.night == null) {
    throw new TypeError(
      `Expected night option to be an integer, instead got type ${typeof options.night} not integer`
    );
  }
  if (
    !isBoolean(options.checkLocalStorage) ||
    options.checkLocalStorage == null
  ) {
    throw new TypeError(
      `Expected checkLocalStorage option to be a boolean, instead got type ${typeof options.checkLocalStorage}`
    );
  }
  if (!isBoolean(options.checkOSTheme) || options.checkOSTheme == null) {
    throw new TypeError(
      `Expected checkOSTheme option to be a boolean, instead got type ${typeof options.checkOSTheme}`
    );
  }
  if (!isString(options.itemName) || options.itemName == null) {
    throw new TypeError(
      `Expected itemName option to be a string, instead got type ${typeof options.itemName}`
    );
  }
}

/**
 * Checks night mode
 *
 * @param {object} options Options object
 * @returns {boolean}
 */
function isNightMode(options) {
  if (!isBrowser()) {
    return;
  }
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  checkOptionsObject(options);

  const currentTime = new Date().getHours();
  const isNightTime = currentTime > options.night || currentTime < options.day;
  const isNightModeEnabled = options.checkLocalStorage
    ? getLocalStorageData(options.itemName)
    : false;
  const isNightOSTheme = isOSNightMode();
  return [isNightTime, isNightModeEnabled, isNightOSTheme].some(Boolean);
}

module.exports = isNightMode;
