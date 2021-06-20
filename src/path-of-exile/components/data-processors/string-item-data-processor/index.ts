import processGameData from "./game";
import processPobData from "./pob";

export default (rawData: String): PoeItem => {
  return rawDataIsFromGame(rawData)
    ? processGameData(rawData)
    : processPobData(rawData);
};

const rawDataIsFromGame = (rawData: String) => rawData.includes("---");
