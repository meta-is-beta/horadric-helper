import "./types";

export default (
  objectType: PoeObjectType,
  dataObject: PoeItem | PoeNode,
  iconSrc: URL | String
) => {
  if (iconSrc === "api") {
    if (objectType === PoeObjectType.Item) {
      return getItemIconFromApi(dataObject as PoeItem);
    }
    if (objectType === PoeObjectType.Node) {
      return getNodeIconFromApi(dataObject as PoeNode);
    }
  }

  return iconSrc;
};

const getItemIconFromApi = (dataObject: PoeItem) => {
  return "https://www.pathofexile.com/api/trade/data/static";
};

const getNodeIconFromApi = (dataObject: PoeNode) => {
  return "";
};
