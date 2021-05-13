const fetch = require("node-fetch");
const cheerio = require("cheerio");
var decode = require("decode-html");
const fs = require("fs");

const GET_GEM_DATA_QUERY =
  "https://pathofexile.fandom.com/api.php?action=cargoquery&tables=items,skill_gems,skill&join_on=skill.active_skill_name=items.name,items._pageID=skill_gems._pageID&fields=items.name,skill.html,skill.active_skill_name,skill.skill_id,skill_gems.gem_tags&format=json&order_by=name";
const GEMS_ICONS_CDN_BASE_URL =
  "https://web.poecdn.com/image/Art/2DItems/Gems/";

const getRawDataJson = async () => {
  const pageSize = 500;
  let page = 0;
  let response = {};
  let requestGemData = [];
  let totalGemData = [];

  do {
    response = await fetch(
      `${GET_GEM_DATA_QUERY}&limit=${pageSize}&&offset=${page * pageSize}`
    );
    requestGemData = (await response.json()).cargoquery;
    if (requestGemData.length > 0) {
      totalGemData = totalGemData.concat(requestGemData);
    }
    page++;
  } while (requestGemData.length > 0);
  return totalGemData;
};

const mapData = (rawData) => {
  return rawData
    .map((entry) => {
      const gemData = entry.title;
      const $ = cheerio.load(decode(gemData.html));

      const name =
        gemData["active skill name"] ||
        $("tr")
          .filter((_, el) => $(el).find("th").text() == "Skill Id")
          .find("td")
          .text()
          .match(/\[\[([A-z- ]+)|[A-z -]+\]\]/)[1];
      if (!name) {
        return;
      }
      const skillId = gemData["skill id"];
      const propSections = $("tr").filter(
        (_, e) =>
          $(e).find("th").length &&
          $(e).find("th").text() !== "Name" &&
          $(e).find("th").text() !== "Level Req." &&
          !$(e).find("td").text().includes("[[")
      );
      const mappedEntry = {
        reference: name,
        dataObject: {
          name: name,
          baseName: name,
          rarity: "Gem",
          class: "Skill Gems",
          gemDescription: ($(".tc.-gemdesc").html() || "").split("<br>"),
          modifiers: ($(".tc.-mod").html() || "")
            .split("<br>")
            .filter((p) => p != ""),
          properties: [
            gemData["gem tags"].split(",").join(", "),
            ...Array.from(
              propSections.map(
                (_, e) => `${$(e).find("th").text()}: ${$(e).find("td").text()}`
              )
            ),
          ].filter((p) => p != ""),
        },
        iconSrc: ((skillId) => {
          if (!skillId) return "";

          if (skillId.includes("Support")) {
            if (skillId.includes("Plus")) {
              return `${GEMS_ICONS_CDN_BASE_URL}Support/SupportPlus/${skillId.replace(
                "Support",
                ""
              )}.png`;
            }

            return `${GEMS_ICONS_CDN_BASE_URL}Support/${skillId.replace(
              "Support",
              ""
            )}.png`;
          }

          if (skillId.includes("Vaal")) {
            return `${GEMS_ICONS_CDN_BASE_URL}VaalGems/${skillId}.png`;
          }

          return `${GEMS_ICONS_CDN_BASE_URL}${skillId}.png`;
        })(skillId),
      };
      return mappedEntry;
    })
    .filter((x) => x != null);
};

const saveMappedJsonToFile = (mappedData) => {
  fs.writeFile("gem-data.json", JSON.stringify(mappedData), function (err) {
    if (err) {
      console.log(err);
    }
  });
};

(async () => {
  const rawData = await getRawDataJson();
  const mappedData = mapData(rawData);
  saveMappedJsonToFile(mappedData);
})();
