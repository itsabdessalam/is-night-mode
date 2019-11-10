# is-night-mode

> Check if is night mode

## Install

```bash
$ npm install is-night-mode
# or
$ yarn add is-night-mode
```

## Usage

```js
const isNightMode = require("is-night-mode");
// default options
const options = {
  day: 6,
  night: 20,
  checkLocalStorage: false,
  itemName: "night-mode",
  checkOSTheme: false
};

isNightMode(options); // should return a boolean
```

## License

MIT © [Abdessalam BENHARIRA](https://abdessalam.dev)
