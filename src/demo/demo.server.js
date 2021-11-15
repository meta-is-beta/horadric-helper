import axios from "axios";
import cors from "cors";
import express from "express";
import characterDataFetchFactory from "../path-of-exile/tools/fetch-character-data";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = 3000;

app.get("/character", cors(), async (req, res) => {
  try {
    const characterDataFetch = characterDataFetchFactory(axios);
    const characterData = await characterDataFetch(
      req.query.accountName,
      req.query.characterName
    );

    res.send(characterData);
  } catch (e) {
    console.log(e);
    res.send({});
  }
});

app.get("/icon", cors(), async (req, res) => {
  try {
    if (!req.query.itemName) {
      res.send({});
      return;
    }

    const itemName = req.query.itemName
      .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase())
      .replace(/Of/g, "of")
      .replace(/And/g, "and")
      .replace(/(?!^)The/g, "the")
      .replace(/ /g, "_")
      .replace(/'/g, "");

    console.log(`Requesting: https://poedb.tw/us/${itemName}`);
    const response = await axios.get(`https://poedb.tw/us/${itemName}`);

    const match = response.data.match(
      /<div class='itemboximage'>[\\n\n "']*<img src="([^"]+)"/
    );

    if (match[1]) {
      res.send(match[1].replace(/amp;/g, ""));
    } else {
      res.send({});
    }
  } catch {
    res.send({});
  }
});

app.listen(port, () => {
  console.log(`Demo server running at http://localhost:${port}`);
});
