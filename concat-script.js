// Añadir en el package.json
// "build:component": "ng build --prod --output-hashing none && node build-web-cp.js"
const fs = require("fs-extra");
const concat = require("concat");

build = async () => {
  const files = [
    "./dist/media-file/scripts.js",
    "./dist/media-file/polyfills.js",
    "./dist/media-file/main.js",
  ];

  await fs.ensureDir("custom-elements");
  await concat(files, "custom-elements/transcription-file.js");
};
build();
