<template>
  <div id="app">
    <div class="poe-item-showcase-demo">
      <poe-item-showcase
        reference="item-demo"
        displayMode="icon"
        labelText=""
        :showIconInShowcase="false"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import PoeItemShowcase from "@/path-of-exile/components/poe-item-showcase.vue";
import PoeNodeShowcase from "@/path-of-exile/components/poe-node-showcase.vue";

export default {
  name: "App",
  components: {
    PoeItemShowcase,
    PoeNodeShowcase,
  },
  methods: {
    nodeDataUpdate() {
      if (window.HoradricHelper.nodeShowcases) {
        window.HoradricHelper.nodeShowcases.applyOptionsByReference(
          "node-demo",
          this.nodeOptions
        );
      }
    },
    itemDataUpdate() {
      if (window.HoradricHelper) {
        window.HoradricHelper.applyConfig("item-demo", {
          iconSrc:
            "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/5/56/Harlequin_Mask_inventory_icon.png",
          rawData: `
Item Class: Jewel
Rarity: Normal
Crimson Jewel
--------
Item Level: 49
--------
Place into an allocated Jewel Socket on the Passive Skill Tree. Right click to remove from the Socket.

Item Class: Support Skill Gems
Rarity: Gem
Controlled Destruction Support
--------
Spell, Support
Level: 20 (Max)
Cost & Reservation Multiplier: 130%
--------
Requirements:
Level: 70
Int: 111
--------
Supports attack skills, or spell skills that deal damage.
--------
Supported Skills have 100% reduced Critical Strike Chance
Supported Skills deal 44% more Spell Damage
--------
This is a Support Gem. It does not grant a bonus to your character, but to skills in sockets connected to it. Place into an item socket connected to a socket containing the Active Skill Gem you wish to augment. Right click to remove from a socket.`,
        });
      }
    },
  },
  mounted() {
    this.nodeDataUpdate();
    this.itemDataUpdate();
  },
};
</script>

<style lang="scss">
html,
body {
  background-color: rgb(39, 39, 39);
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: row;
  & input[type="checkbox"],
  & input[type="radio"] {
    vertical-align: middle;
    position: relative;
    bottom: 1px;
  }
  & textarea {
    resize: vertical;
  }
}
.poe-node-demo {
  display: flex;
  flex-direction: column;
  width: 50%;

  & .poe-node-demo-control-panel,
  & .poe-item-demo-control-panel {
    margin-left: 25px;
    margin-right: 25px;
    padding: 20px;
    background-color: #313131;
    border-radius: 16px;
    box-shadow: 1px 1px 20px 0px rgb(0 0 0 / 20%);

    & h2 {
      font-size: 22px !important;
      margin-top: 10px;
      text-transform: uppercase;
    }
    & label,
    & h2 {
      color: white;
      font: 400 13.3333px Arial;
    }
    & textarea {
      width: 100%;
    }
    & textarea,
    & select {
      margin-top: 10px;
      background-color: rgb(39, 39, 39);
      color: white;
    }
  }
  & .poe-node-showcase-demo,
  & .poe-item-showcase-demo {
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 250px;
    margin-top: 20px;
    margin-bottom: 20px;

    & .poe-node-showcase,
    & .poe-item-showcase {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
