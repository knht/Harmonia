# Harmonia

Harmonia is an easy to use osu! API wrapper.

## Getting Started
First step to getting started is to grab your api key: https://osu.ppy.sh/p/api

### Installing

Installing is rather simple, just use the line below to install.

```
npm i harmonia-osu
```

### Basic Usage

Basic example of how Harmonia works

```js
const harmonia = require('harmonia-osu');

let osu = new harmonia.Harmonia('api-key');
let user = osu.getUser('Kisei Denma', harmonia.Modes.STD).then((data) => {
  // do something with the data
});
```

## Documentation
Documentation can be found [here](https://kotowaru.github.io/slate/)

## Built With

* [Typescript](https://www.typescriptlang.org/docs/home.html/) - Language Used
* [Axios](https://github.com/axios/axios) - HTTP Client

## Authors

* **Kotowaru (Kisei)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
