const test = require("ava");
const jsdom = require("jsdom");
const isNightMode = require(".");
const { JSDOM } = jsdom;
const { window } = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/"
});
const { document, navigator } = window;
const options = {
  day: 6,
  night: 20,
  checkLocalStorage: true,
  itemName: "night-mode",
  checkOSTheme: true
};

window.localStorage.setItem("night-mode", true);
window.matchMedia =
  window.matchMedia ||
  function(media) {
    return {
      media: media || "all",
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };
global.document = document;
global.window = window;
global.navigator = navigator;

test("day option is not well set", t => {
  const opts = Object.assign({}, options);
  opts.day = "";
  const message = `Expected day option to be an integer, instead got type ${typeof opts.day} not integer`;
  const error = t.throws(() => {
    isNightMode(opts);
  }, TypeError);

  t.is(error.message, message);
});

test("night option is not well set", t => {
  const opts = Object.assign({}, options);
  opts.night = "";
  const message = `Expected night option to be an integer, instead got type ${typeof opts.night} not integer`;
  const error = t.throws(() => {
    isNightMode(opts);
  }, TypeError);

  t.is(error.message, message);
});

test("checkLocalStorage option is not well set", t => {
  const opts = Object.assign({}, options);
  opts.checkLocalStorage = 1;
  const message = `Expected checkLocalStorage option to be a boolean, instead got type ${typeof opts.checkLocalStorage}`;
  const error = t.throws(() => {
    isNightMode(opts);
  }, TypeError);

  t.is(error.message, message);
});

test("itemName option is not well set", t => {
  const opts = Object.assign({}, options);
  opts.itemName = [];
  const message = `Expected itemName option to be a string, instead got type ${typeof opts.itemName}`;
  const error = t.throws(() => {
    isNightMode(opts);
  }, TypeError);

  t.is(error.message, message);
});

test("checkOSTheme option is not well set", t => {
  const opts = Object.assign({}, options);
  opts.checkOSTheme = 0;
  const message = `Expected checkOSTheme option to be a boolean, instead got type ${typeof opts.checkOSTheme}`;
  const error = t.throws(() => {
    isNightMode(opts);
  }, TypeError);

  t.is(error.message, message);
});

test("night mode", t => {
  const currentTime = new Date().getHours();
  let night = currentTime - 1;
  let day = currentTime + 1;

  t.true(isNightMode(options));
  t.true(isNightMode(Object.assign(options, { day })));
  t.true(isNightMode(Object.assign(options, { night })));

  window.localStorage.setItem("night-mode", false);

  t.false(
    isNightMode(
      Object.assign(options, {
        day: currentTime,
        night: currentTime
      })
    )
  );
  t.false(
    isNightMode(
      Object.assign(options, {
        day: currentTime,
        night: currentTime,
        checkLocalStorage: false,
        checkOSTheme: false
      })
    )
  );
});
