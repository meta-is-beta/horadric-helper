const fetch = require("node-fetch");
const cheerio = require("cheerio");
var decode = require("decode-html");
const fs = require("fs");

const GET_GEM_DATA_QUERY =
  "https://pathofexile.fandom.com/api.php?action=cargoquery&tables=items,skill_gems,skill&join_on=items._pageID=skill_gems._pageID,items.name=skill.active_skill_name&fields=items.name,skill.html,skill.active_skill_name,skill.skill_id,skill_gems.gem_tags&group_by=items.name&format=json&where=skill_id!=%22%22&limit=500";
const GEMS_ICONS_CDN_BASE_URL =
  "https://web.poecdn.com/image/Art/2DItems/Gems/";

const getRawDataJson = async () => {
  const response = await fetch(GET_GEM_DATA_QUERY);
  return (await response.json()).cargoquery;
};

const mapData = (rawData) => {
  return rawData
    .map((entry) => {
      const gemData = entry.title;
      const name = gemData["active skill name"];
      if (!name) {
        return;
      }
      const skillId = gemData["skill id"];
      const $ = cheerio.load(decode(gemData.html));
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
          modifiers: ($(".tc.-mod").html() || "").split("<br>"),
          properties: [
            gemData["gem tags"].split(",").join(", "),
            ...Array.from(
              propSections.map(
                (_, e) => `${$(e).find("th").text()}: ${$(e).find("td").text()}`
              )
            ),
          ],
        },
        iconSrc: skillId
          ? skillId.includes("Support")
            ? `${GEMS_ICONS_CDN_BASE_URL}passives/${skillId}.png`
            : `${GEMS_ICONS_CDN_BASE_URL}${skillId}.png`
          : "",
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
