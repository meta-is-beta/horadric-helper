type ShowcaseConfig = {
  reference: string;
  data: DataObject;
  extensions?: object;
  iconUrl?: string;
};

type DataObject = {};

type Showcase = {
  data: object;
  iconUrl?: string;
  extensions?: object;
  type: string;

  processStringData: (data: string) => object;
  processDataObject: (data: object) => object;
  applyConfigCallbacks: ((arg: Showcase) => void)[];
};
