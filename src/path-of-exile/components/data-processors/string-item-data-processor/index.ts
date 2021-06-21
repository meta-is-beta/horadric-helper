import processGameData from "./game";
import processPobData from "./pob";

export default (rawData: String): PoeItem => {
  return rawDataIsFromPob(rawData)
    ? processPobData(rawData)
    : processGameData(rawData);
};

const rawDataIsFromPob = (rawData: String) => rawData.startsWith("Rarity:");
