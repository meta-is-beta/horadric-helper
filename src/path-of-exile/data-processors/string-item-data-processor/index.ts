import { PoeItem } from "@/path-of-exile/types";
import processGameData from "./game";
import processPobData from "./pob";

export default (rawData: String): PoeItem => {
  return rawDataIsFromPob(rawData)
    ? processPobData(rawData)
    : processGameData(rawData);
};

const rawDataIsFromPob = (rawData: String) =>
  /^\s*Rarity:/g.test(rawData as string);
