import characterDataFetchFactory from "./fetch-character-data";
const http = require("axios");
const fs = require("fs");

const ACCOUNT_NAME = "ank993";
const CHARACTER_NAME = "Vicious_Delirious";

(async () => {
  const dataFetch = characterDataFetchFactory(http);

  const poeItemConfigs = await dataFetch(ACCOUNT_NAME, CHARACTER_NAME);

  fs.writeFile(
    "character-data.json",
    JSON.stringify(poeItemConfigs),
    function (err: string) {
      if (err) {
        console.log(err);
      }
    }
  );
})();
