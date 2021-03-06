import {
  PoeConfig,
  PoeItem,
  PoeItemInfluence,
  PoeItemRarity,
  PoeItemStatus,
  PoeItemType,
} from "../types";
import { PoeItemData } from "./poe-api-types";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36";

export default (http: any) =>
  async (acountName: String, characterName: String) => {
    const characterData = await http.get(
      `https://www.pathofexile.com/character-window/get-items?accountName=${acountName.trim()}&character=${characterName.trim()}`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    );

    const passiveData = await http.get(
      `https://www.pathofexile.com/character-window/get-passive-skills?accountName=${acountName.trim()}&character=${characterName.trim()}`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    );

    const itemsData: PoeItemData[] = [
      ...characterData.data.items,
      ...passiveData.data.items,
    ];

    const poeItemConfigs: PoeConfig[] = itemsData.map((item) =>
      mapItemConfig(item)
    );

    itemsData.forEach((item) => {
      if (item.socketedItems) {
        item.socketedItems.forEach((socketedItem) => {
          poeItemConfigs.push(mapItemConfig(socketedItem));
        });
      }
    });

    return poeItemConfigs;
  };

const mapItemConfig = (itemData: PoeItemData): PoeConfig => {
  const poeItem = mapItemData(itemData);

  const item: PoeConfig = {
    reference: getItemReference(itemData),
    iconUrl: itemData.icon,
    data: poeItem,
  };

  if (itemData.socketedItems && itemData.socketedItems.length > 0) {
    item.extensions = {
      socketReferences: getItemSocketedItems(itemData),
    };
  }

  return item;
};

const mapItemData = (itemData: PoeItemData): PoeItem =>
  ({
    rarity: getItemRarity(itemData),
    name: getItemName(itemData),
    type: getItemType(itemData),
    baseName: itemData.baseType,
    influences: getItemInfluences(itemData),
    sockets: getItemSockets(itemData),
    sections: {
      enchants: breakLines(itemData.enchantMods),
      implicits: breakLines(itemData.implicitMods),
      scourgeMods: getItemScourgeMods(itemData),
      modifiers: getItemModifiers(itemData),
      properties: breakLines(getItemProperties(itemData)),
      gemDescription: breakLines(
        itemData.frameType === 4 ? [itemData.secDescrText] : []
      ),
      itemLevel: itemData.ilvl && itemData.ilvl > 0 ? `${itemData.ilvl}` : null,
      requirements: getItemRequirements(itemData),
      statuses: getItemStatuses(itemData),
      talismanTier: itemData.talismanTier ? `${itemData.talismanTier}` : null,
      flavourText: getItemFlavorText(itemData),
    },
  } as PoeItem);

const getItemReference = (itemData: PoeItemData): String => {
  const name = itemData.name ? itemData.name : itemData.typeLine;

  return `${name.replace(/ /g, "-").replace(/'/g, "")}-${itemData.id.substring(
    0,
    5
  )}`;
};

const breakLines = (lines: String[]) =>
  lines ? lines.map((line) => line.split("\n")).flat() : [];

const getItemSocketedItems = (
  itemData: PoeItemData
): { [id: string]: string } => {
  const socketedItems: any = {};

  itemData.socketedItems.forEach((item) => {
    socketedItems[item.socket + 1] = getItemReference(item);
  });

  return socketedItems;
};

const getItemName = (itemData: PoeItemData): String =>
  itemData.name ? itemData.name : itemData.typeLine;

const getItemStatuses = (itemData: PoeItemData): PoeItemStatus[] => {
  const statuses: PoeItemStatus[] = [];

  if (itemData.corrupted) {
    statuses.push(`corrupted`);
  }

  if (itemData.mirrored) {
    statuses.push("mirrored");
  }

  if (itemData.split) {
    statuses.push(`split`);
  }

  return statuses;
};

const getItemRarity = (itemData: PoeItemData): PoeItemRarity => {
  switch (itemData.frameType) {
    case 0:
      return "normal";
    case 1:
      return "magic";
    case 2:
      return `rare`;
    case 3:
    default:
      return "unique";
    case 4:
      return `gem`;
  }
};

const getItemRequirements = (itemData: PoeItemData): String[] =>
  itemData.requirements
    ? itemData.requirements.map(
        (reqirement) => `${reqirement.name}: ${reqirement.values[0][0]}`
      )
    : [];

const getItemProperties = (itemData: PoeItemData): String[] =>
  itemData.properties
    ? itemData.properties
        .filter((property) =>
          property.values.length > 0 && property.values[0].length > 0
            ? property.values[0][0] !== "Alternate Quality"
            : true
        )
        .map((property) => {
          if (!property.values || property.values.length <= 0) {
            return property.name;
          }

          if (property.name.includes("{")) {
            return (property.name as any).replace(
              /\{([0-9]+)\}/g,
              (_: any, index: any) => property.values[index][0]
            );
          }

          let value = Array.isArray(property.values[0])
            ? `${property.values[0][0]}`
            : `${property.values[0]}`;

          const isAugmented = Array.isArray(property.values[0])
            ? property.values[0][1] === 1
            : false;

          if (isAugmented) {
            value += " (augmented)";
          }

          return `${property.name}: ${value}`;
        })
    : [];

const getItemType = (itemData: PoeItemData): PoeItemType => {
  if (itemData.typeLine.includes("Flask")) return "flask";
  if (itemData.frameType === 4) return "gem";
  if (itemData.baseType.includes("Jewel")) return "jewel";

  return "equipment";
};

const getItemModifiers = (itemData: PoeItemData): String[] => {
  let modifiers: String[] = [];

  if (itemData.explicitMods && itemData.explicitMods.length > 0) {
    modifiers = itemData.explicitMods;
  }

  if (itemData.craftedMods && itemData.craftedMods.length > 0) {
    modifiers = modifiers.concat(
      itemData.craftedMods.map((m) => m + " (crafted)")
    );
  }

  return breakLines(modifiers);
};

const getItemScourgeMods = (itemData: PoeItemData): String[] =>
  breakLines(itemData.scourgeMods);

const getItemInfluences = (itemData: PoeItemData): PoeItemInfluence[] => {
  let influences: PoeItemInfluence[] = [];

  if (itemData.influences) {
    influences = Object.keys(itemData.influences) as PoeItemInfluence[];
  }

  if (itemData.replica) {
    influences.push("replica");
  }

  return influences;
};

const getItemSockets = (itemData: PoeItemData): string | undefined => {
  if (!itemData.sockets) {
    return void 0;
  }

  let socketsString = "";
  let currentGroup = 0;

  itemData.sockets.forEach((socket, index) => {
    if (index === 0) {
      socketsString += socket.sColour;
    } else {
      if (socket.group === currentGroup) {
        socketsString += `-${socket.sColour}`;
      } else {
        socketsString += ` ${socket.sColour}`;
      }
    }

    currentGroup = socket.group;
  });

  return socketsString;
};

const getItemFlavorText = (itemData: PoeItemData): string[] | null => {
  return itemData.flavourText
    ? itemData.flavourText.map((t) => t.replace("\r", ""))
    : null;
};
