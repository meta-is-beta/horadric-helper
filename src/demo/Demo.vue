<template>
  <div id="app">
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Load multiple items" active>
          <b-container style="max-width: unset; padding: 40px">
            <b-card>
              <h1>Load from the game</h1>
              <b-row>
                <b-col style="display: flex; justify-content: center">
                  <b-form-input
                    style="width: 200px; margin: 6px"
                    v-model="accountName"
                    placeholder="Account name"
                    id="accountname"
                  ></b-form-input>
                  <b-form-input
                    style="width: 200px; margin: 6px"
                    v-model="characterName"
                    placeholder="Character name"
                    id="charactername"
                  ></b-form-input>
                  <b-button
                    @click="loadDataFromTheGame"
                    style="margin: 6px"
                    :disabled="disableButton"
                    >Load</b-button
                  >
                </b-col>
              </b-row>
              <h1>Load from JSON</h1>
              <b-row style="padding-left: 8px; padding-right: 8px">
                <b-form-textarea
                  v-model="jsonData"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-row>
            </b-card>
            <br />
            <b-card v-show="itemsFromJson.length > 0">
              <b-tabs content-class="mt-3">
                <b-tab title="All items" active>
                  <b-row style="overflow: auto">
                    <b-table :fields="fields" :items="itemsFromJson">
                      <template #cell(item)="data">
                        <div>
                          <poe-item
                            as-icon
                            show-sockets
                            show-sockets-in-showcase
                            :reference="data.item.reference"
                          />
                        </div>
                      </template>
                      <template #cell(name)="data">
                        <span>
                          {{ data.item.data.name }}
                        </span>
                      </template>
                      <template #cell(base)="data">
                        <span>
                          {{ data.item.data.baseName }}
                        </span>
                      </template>
                      <template #cell(type)="data">
                        <span style="text-transform: capitalize">
                          {{ data.item.data.type }}
                        </span>
                      </template>
                      <template #cell(tag)="data">
                        <pre><code>{{ generateTag(data.item.reference) }}</code></pre>
                      </template>
                    </b-table>
                  </b-row>
                </b-tab>
                <b-tab title="Equipment">
                  <b-row>
                    <div
                      class="section-container"
                      v-show="equipment.length > 0"
                    >
                      <div class="section">
                        <poe-item
                          v-for="(item, index) in equipment"
                          :key="`eq-${index}`"
                          :reference="item.reference"
                          as-icon
                          show-sockets
                        ></poe-item>
                      </div>
                      <div class="section-code">
                        <pre><code>{{equipmentCode}}</code></pre>
                      </div>
                    </div>
                  </b-row>
                </b-tab>
                <b-tab title="Flasks">
                  <b-row>
                    <div class="section-container" v-show="flasks.length > 0">
                      <div class="section">
                        <poe-item
                          v-for="(item, index) in flasks"
                          :key="`flask-${index}`"
                          :reference="item.reference"
                          as-icon
                        ></poe-item>
                      </div>
                      <div class="section-code">
                        <pre><code>{{flasksCode}}</code></pre>
                      </div>
                    </div>
                  </b-row>
                </b-tab>
                <b-tab title="Jewels">
                  <b-row>
                    <div class="section-container" v-show="jewels.length > 0">
                      <div class="section">
                        <poe-item
                          v-for="(item, index) in jewels"
                          :key="`jewel-${index}`"
                          :reference="item.reference"
                          as-icon
                        ></poe-item>
                      </div>
                      <div class="section-code">
                        <pre><code>{{jewelsCode}}</code></pre>
                      </div>
                    </div>
                  </b-row>
                </b-tab>
                <b-tab title="Links">
                  <b-row>
                    <div class="section-container" v-show="jewels.length > 0">
                      <div
                        v-for="(link, index) in links"
                        :key="`link-${index}`"
                      >
                        <div v-if="link.length > 0">
                          <div class="section gems-section">
                            <div
                              v-for="(gem, index) in link"
                              :key="`gem-${index}`"
                            >
                              <poe-item
                                v-if="gem && gem.reference"
                                :reference="gem.reference"
                                as-text
                                icon-inside
                                :label-text="getGemLabelName(gem)"
                              ></poe-item>
                              <div
                                v-if="
                                  index + 1 != link.length && link[index + 1]
                                "
                                class="gem-link"
                              >
                                ┄
                              </div>
                            </div>
                          </div>
                          <pre><code>{{ generateLinksTags(link) }}</code></pre>
                        </div>
                        <br />
                      </div>
                    </div>
                  </b-row>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-container>
        </b-tab>
        <b-tab title="Load single item">
          <b-container style="max-width: unset; padding: 40px">
            <b-card style="overflow: auto">
              <h1>Load from the game or PoB</h1>
              <br />
              <b-row>
                <b-col sm="6">
                  <h2>Item data</h2>
                  <b-form-textarea
                    v-model="singleItemData"
                    rows="10"
                  ></b-form-textarea>
                  <br />
                  <h2>Icon url</h2>
                  <b-form-textarea
                    v-model="singleItemIconUrl"
                    rows="1"
                  ></b-form-textarea>
                  <br />
                  <b-button @click="loadItemIcon" :disabled="disableButton"
                    >Load icon from poedb</b-button
                  >
                </b-col>
                <b-col sm="6" style="display: flex">
                  <div style="margin-left: auto; margin-right: auto">
                    <poe-item
                      reference="single-item-demo"
                      as-showcase
                      icon-outside
                      show-sockets-in-showcase
                    />
                  </div>
                </b-col>
              </b-row>
            </b-card>
            <br />
            <b-card style="overflow: auto" v-show="singleItemConfig">
              <h2>Code</h2>
              <pre
                style="margin-left: unset"
              ><code>{{ singleItemConfig }}</code></pre>
              <pre
                style="margin-left: unset"
              ><code>{{ singleItemTag }}</code></pre>
            </b-card>
          </b-container>
        </b-tab>
        <b-tab title="Preloaded demos">
          <h1>Poe items</h1>
          <br />
          <div class="poe-demo">
            <poe-item-demo />
          </div>
          <h1>Poe passives</h1>
          <br />
          <div class="poe-demo">
            <poe-passive-demo />
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import PoeItem from "@/main/components/item/poe-item.vue";
import axios from "axios";
import PoeItemDemo from "../main/components/item/demo/poe-item.demo.vue";
import PoePassiveDemo from "../main/components/passive/demo/poe-passive.demo.vue";

export default {
  name: "Demo",
  components: { PoeItem, PoeItemDemo, PoePassiveDemo },
  data: function () {
    return {
      accountName: "",
      characterName: "",
      jsonData: "",
      fields: ["Item", "Name", "Base", "Type", "Tag"],
      itemsFromJson: [],
      singleItemData: "",
      singleItemIconUrl: void 0,
      disableButton: false,
      singleItemConfig: "",
      singleItemTag: "",
    };
  },
  created() {
    window.HoradricHelper.PathOfExile.defaults = {
      bordered: true,
    };
  },
  watch: {
    jsonData: function (value) {
      try {
        const itemsFromJson = JSON.parse(value);
        window.HoradricHelper.PathOfExile.applyConfig(itemsFromJson);
        this.itemsFromJson = itemsFromJson;
      } catch {
        // no-op
      }

      this.$forceUpdate();
    },
    singleItemData: function (value) {
      try {
        const config = {
          reference: "single-item-demo",
          data: value,
          iconUrl: this.singleItemIconUrl,
        };

        window.HoradricHelper.PathOfExile.applyConfig(config);

        this.generateSingleItemHelpers(config);
      } catch {
        // no-op
      }
    },
    singleItemIconUrl: function (value) {
      try {
        const config = {
          reference: "single-item-demo",
          data: this.singleItemData,
          iconUrl: value,
        };

        window.HoradricHelper.PathOfExile.applyConfig(config);

        this.generateSingleItemHelpers(config);
      } catch {
        // no-op
      }
    },
  },
  methods: {
    generateSingleItemHelpers(config) {
      const newReference = window.HoradricHelper.PathOfExile.showcases[
        "single-item-demo"
      ].data.name
        .toLowerCase()
        .replace(/ /g, "-");

      this.singleItemConfig = JSON.stringify(
        {
          ...config,
          reference: newReference,
        },
        null,
        2
      );
      this.singleItemTag = this.generateSingleItemTag(newReference);
    },
    generateSingleItemTag(reference) {
      return `<poe-item reference="${reference}"></poe-item>`;
    },
    generateLinksTags(links) {
      if (!links) {
        return "";
      }

      let linksTags = "";
      links.forEach((gem, index) => {
        if (!gem || !gem.reference) {
          return;
        }
        const labelName = this.getGemLabelName(gem);
        linksTags += `<poe-item icon-inside label-text="${labelName}" reference="${gem.reference}"></poe-item>`;
        if (index + 1 != links.length) {
          linksTags += " ┄ \n";
        }
      });

      return linksTags;
    },
    generateTag(reference) {
      return `<poe-item reference="${reference}"></poe-item>`;
    },
    loadDataFromTheGame: async function () {
      this.disableButton = true;
      axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";

      const response = await axios.get(
        `http://localhost:3000/character?accountName=${this.accountName}&characterName=${this.characterName}`
      );

      this.jsonData = JSON.stringify(response.data);
      this.disableButton = false;
    },
    loadItemIcon: async function () {
      this.disableButton = true;
      const itemObject =
        window.HoradricHelper.PathOfExile.showcases["single-item-demo"];

      if (!itemObject || !itemObject.data) {
        return;
      }

      const itemIconName =
        itemObject.data.rarity.toLowerCase() === "unique"
          ? itemObject.data.name
          : itemObject.data.baseName;

      axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";

      const response = await axios.get(
        `http://localhost:3000/icon?itemName=${itemIconName}`
      );

      this.singleItemIconUrl = response.data;
      this.disableButton = false;
    },
    getGemLabelName(gem) {
      const isSupport = (g) =>
        g.data.baseName.includes("Support") ||
        g.data.sections.properties.find((x) => x === "Support");

      return isSupport(gem)
        ? `◎ ${gem.data.name.replace("Support", "").trim()}`
        : `◉ ${gem.data.name}`;
    },
  },
  computed: {
    itemsFromJsonComputed() {
      return this.itemsFromJson;
    },
    flasks() {
      return this.itemsFromJson.length > 0
        ? this.itemsFromJson.filter((i) => i.data.type === "flask")
        : [];
    },
    flasksCode() {
      if (this.flasks.length === 0) {
        return "";
      }

      let code = "";

      this.flasks.forEach((flask) => {
        code += `<poe-item as-icon reference="${flask.reference}"></poe-item>\n`;
      });

      return code;
    },
    jewels() {
      return this.itemsFromJson.length > 0
        ? this.itemsFromJson.filter((i) => i.data.type === "jewel")
        : [];
    },
    jewelsCode() {
      if (this.jewels.length === 0) {
        return "";
      }

      let code = "";

      this.jewels.forEach((jewel) => {
        code += `<poe-item as-icon reference="${jewel.reference}"></poe-item>\n`;
      });

      return code;
    },
    equipment() {
      return this.itemsFromJson.length > 0
        ? this.itemsFromJson.filter((i) => i.data.type === "equipment")
        : [];
    },
    equipmentCode() {
      if (this.equipment.length === 0) {
        return "";
      }

      let code = "";

      const sortedEq = this.equipment;

      sortedEq.forEach((eq) => {
        if (
          eq.extensions &&
          eq.extensions.socketReferences &&
          Object.keys(eq.extensions.socketReferences).length > 0
        ) {
          code += `<poe-item as-icon show-sockets reference="${eq.reference}"></poe-item>\n`;
        } else {
          code += `<poe-item as-icon reference="${eq.reference}"></poe-item>\n`;
        }
      });

      return code;
    },
    links() {
      if (this.itemsFromJson.length === 0) {
        return [];
      }

      const itemsWithGems = this.itemsFromJson.filter(
        (i) => !!i.extensions && !!i.extensions.socketReferences
      );

      let gems = [];

      itemsWithGems.forEach((item) => {
        const sockets = item.data.sockets.match(/[A-Z]/gm);
        const links = item.data.sockets.match(/[ -]/gm);

        let allLinks = [];
        let currentLink = [];

        sockets.forEach((s, i) => {
          if (i === 0 || links[i - 1] === "-") {
            const referencedGem = this.itemsFromJson.find(
              (x) =>
                x.reference ===
                Object.values(item.extensions.socketReferences)[i]
            );

            currentLink.push(referencedGem);
          } else if (links[i - 1] === " ") {
            allLinks.push(currentLink);
            currentLink = [];
            const referencedGem = this.itemsFromJson.find(
              (x) =>
                x.reference ===
                Object.values(item.extensions.socketReferences)[i]
            );

            currentLink.push(referencedGem);
          }

          if (i + 1 === sockets.length) {
            allLinks.push(currentLink.filter((x) => x != null));
          }
        });

        gems.push(allLinks);
      });

      return gems.flat(1).filter((x) => x != null);
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #1a1c1e;
}
html,
body {
  height: 100%;
}
h1 {
  text-align: center;
  color: #b9b9b9;
}
h2 {
  color: #b9b9b9;
}
.poe-demo,
.poe-demo > div {
  display: flex;
  align-items: baseline;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;
}

textarea,
input {
  background-color: #212529 !important;
  color: white !important;
}

.nav-link {
  color: white !important;

  &.active {
    background-color: transparent !important;
    border-bottom: 1px solid #131516 !important;
  }
}

th[role="columnheader"] {
  div {
    color: white;
  }
  &[aria-colindex="1"],
  &[aria-colindex="5"] {
    div {
      text-align: center;
    }
  }
}

td {
  color: white;
  & > div {
    margin-left: auto !important;
    margin-right: auto !important;
    display: flex !important;
    width: fit-content;
  }
}

td,
th {
  border-color: #535353 !important;
}

table {
  background-color: #232323 !important;
  border: 1px solid #535353;
}

pre {
  background-color: #1a1c1e;
  border-radius: 4px;
  padding: 12px;
  padding-left: 18px;
  padding-right: 18px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

code {
  color: #e83e8c !important;
}

.card {
  background-color: #131516;
}

.tab-content {
  margin-left: 16px;
  margin-right: 16px;
}

.section {
  background-color: #232323 !important;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #5d5d5d;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  & .poe-item-showcase {
    margin: 10px;
  }
}

.gems-section {
  margin-bottom: 16px;
  & > div {
    display: flex;
    color: white;
    align-content: center;
    align-items: baseline;
  }
  & .gem-link {
    height: fit-content;
  }
}

.section-container {
  margin-left: auto;
  margin-right: auto;
}

.section-code {
  margin-top: 20px;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #222527;
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  background: rgb(136, 136, 136);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(100, 100, 100);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:active {
  background: rgb(68, 68, 68);
  border-radius: 10px;
}
</style>
