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
  const characterDataFetch = characterDataFetchFactory(axios);
  const characterData = await characterDataFetch(
    req.query.accountName,
    req.query.characterName
  );

  res.send(characterData);
});

app.listen(port, () => {
  console.log(`Demo server running at http://localhost:${port}`);
});
