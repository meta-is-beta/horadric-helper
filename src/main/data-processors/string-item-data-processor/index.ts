import { PoeItem } from "@/types";
import processGameData from "../../utils/data-processors/string-item-data-processor/game";
import processPobData from "./pob";

export default (rawData: String): PoeItem => {
  return rawDataIsFromPob(rawData)
    ? processPobData(rawData)
    : processGameData(rawData);
};

const rawDataIsFromPob = (rawData: String) =>
  /^\s*Rarity:/g.test(rawData as string);
