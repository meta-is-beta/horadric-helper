import processDataObject from "./data-processors/data-object-data-processor";
import processStringData from "../data-processors/string-item-data-processor";
import {
  PoeItem,
  PoePassive,
  PoeShowcase,
  PoeShowcaseConfig,
} from "../../types";

(window as any).HoradricHelper = (window as any).HoradricHelper || {};

(window as any).HoradricHelper.PathOfExile = {
  showcases: {},
  applyConfig(config: PoeShowcaseConfig) {
    if (Array.isArray(config)) {
      applyConfigFromArray(config);
    } else {
      applyConfigFromObject(config);
    }
  },
};

const applyConfigFromArray = (configArray: PoeShowcaseConfig[]): void => {
  configArray.forEach((configObject) => applyConfigFromObject(configObject));
};

const applyConfigFromObject = ({
  reference,
  data,
  iconUrl,
  extensions,
}: PoeShowcaseConfig): void => {
  const hhObject = (window as any).HoradricHelper.PathOfExile;
  let referencedShowcase = hhObject.showcases[reference] as PoeShowcase;
  if (!referencedShowcase) {
    hhObject.showcases[reference] = {
      applyConfigCallbacks: [],
    };
    referencedShowcase = hhObject.showcases[reference];
  }

  if (typeof data === "string") {
    referencedShowcase.data = processStringData(data);
  } else if (typeof data === "object") {
    referencedShowcase.data = processDataObject(data as PoeItem | PoePassive);
  } else {
    throw new Error("Showcase data was not provided");
  }

  referencedShowcase.iconUrl = iconUrl;
  referencedShowcase.extensions = extensions;
  referencedShowcase.applyConfigCallbacks.forEach(
    (callback: (arg: PoeShowcase) => void) => {
      if (!callback || typeof callback !== "function") {
        return;
      }
      try {
        callback(referencedShowcase);
      } catch {
        // no-op
      }
    }
  );
};
