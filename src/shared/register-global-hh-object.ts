(window as any).HoradricHelper = (window as any).HoradricHelper || {
  showcases: {},
  applyConfig(config: ShowcaseConfig) {
    if (Array.isArray(config)) {
      applyConfigFromArray(config);
    } else {
      applyConfigFromObject(config);
    }
  },
};

const applyConfigFromArray = (configArray: ShowcaseConfig[]): void => {
  configArray.forEach((configObject) => applyConfigFromObject(configObject));
};

const applyConfigFromObject = ({
  reference,
  data,
  iconUrl,
  extensions,
}: ShowcaseConfig): void => {
  const referencedShowcase = (window as any).HoradricHelper.showcases[
    reference
  ] as Showcase;

  if (!referencedShowcase) {
    throw new Error(`Showcase for ${reference} was not registered.`);
  }

  if (typeof data === "string") {
    if (!referencedShowcase.processStringData) {
      throw new Error(
        `String data processor is not plemented for showcase of type "${referencedShowcase.type}"`
      );
    }
    referencedShowcase.data = referencedShowcase.processStringData(data);
  } else if (typeof data === "object") {
    if (!referencedShowcase.processDataObject) {
      referencedShowcase.processDataObject = (data: object) => data;
    }
    referencedShowcase.data = referencedShowcase.processDataObject(data);
  } else {
    throw new Error("Showcase data was not provided");
  }

  referencedShowcase.iconUrl = iconUrl;
  referencedShowcase.extensions = extensions;

  referencedShowcase.applyConfigCallbacks.forEach(
    (callback: (arg: Showcase) => void) => {
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
