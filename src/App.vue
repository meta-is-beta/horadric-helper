<template>
  <div id="app">
    <div class="poe-demo">
      <div class="poe-item-showcase-demo">
        <div>
          <poe-item-showcase
            reference="demo-1"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
          <poe-item-showcase
            reference="demo-2"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
        </div>
        <div>
          <poe-item-showcase
            reference="demo-3"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
          <poe-item-showcase
            reference="demo-4"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
        </div>
        <div>
          <poe-item-showcase
            reference="demo-5"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
          <poe-item-showcase
            reference="demo-6"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
        </div>
        <div>
          <poe-item-showcase
            reference="demo-7"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
          <poe-item-showcase
            reference="demo-8"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
        </div>
        <div>
          <poe-item-showcase
            reference="demo-9"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
          <poe-item-showcase
            reference="demo-10"
            displayMode="showcase"
            labelText=""
            :showIconInShowcase="true"
          />
        </div>
      </div>
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
        window.HoradricHelper.applyConfig("demo-9", {
          rawData: `
Item Class: Active Skill Gems
Rarity: Gem
Flammability
--------
Spell, AoE, Duration, Fire, Curse, Hex
Level: 20 (Max)
Cost: 50 Mana
Cast Time: 0.50 sec
--------
Requirements:
Level: 70
Str: 68
Int: 98
--------
Curses all targets in an area, lowering their fire resistance and giving them a chance to be ignited when hit.
--------
Base duration is 10.90 seconds
Curse gains 10 Doom per second if you Cast this Spell yourself
+10 to radius
Cursed enemies have -44% to Fire Resistance
Hits against Cursed Enemies have +25% chance to Ignite
--------
Place into an item socket of the right colour to gain this skill. Right click to remove from a socket.
`,
        });

        window.HoradricHelper.applyConfig("demo-10", {
          rawData: `
Item Class: Support Skill Gems
Rarity: Gem
Divergent Multiple Totems Support
--------
Totem, Support
Level: 19
Cost & Reservation Multiplier: 150%
Quality: +20% (augmented)
Alternate Quality
--------
Requirements:
Level: 69
Str: 69
Int: 48
--------
Supports skills which summon totems.
--------
10% increased Totem Damage
Supported Skills have +2 to maximum number of Summoned Totems
Supported Skills Summon two Totems instead of one
Supported Skills deal 22% less Damage
--------
This is a Support Gem. It does not grant a bonus to your character, but to skills in sockets connected to it. Place into an item socket connected to a socket containing the Active Skill Gem you wish to augment. Right click to remove from a socket.
`,
        });

        window.HoradricHelper.applyConfig("demo-7", {
          rawData: `
Item Class: Trinkets
Rarity: Rare
Pandemonium Creed
Thief's Trinket
--------
Requirements:
Level: 40
--------
Item Level: 76
--------
2% chance to receive additional Blight items when opening a Reward Chest in a Heist
Heist Chests have a 5% chance to contain more valuable Uniques
7% increased Quantity of Items dropped in Heists
16% increased Rarity of Items dropped in Heists
--------
You must find the sculpture The Catch in a Smuggler's Den or Underbelly Blueprint to be able to equip this
--------
Corrupted

`,
        });

        window.HoradricHelper.applyConfig("demo-8", {
          rawData: `
Item Class: Amulets
Rarity: Rare
Plague Charm
Ashscale Talisman
--------
Requirements:
Level: 43
--------
Item Level: 73
--------
Talisman Tier: 1
--------
Allocates Nimbleness (enchant)
--------
26% increased Fire Damage (implicit)
--------
13% increased Fire Damage
11% increased Cast Speed
+89 to maximum Life
+23% to Cold Resistance
--------
The fire of the hearth is a docile dog,
leashed and tamed.
The fire of the First Ones is a ravening wolf,
wild and free.
- The Wolven King

--------
Corrupted
`,
        });

        window.HoradricHelper.applyConfig("demo-5", {
          rawData: `
Item Class: Critical Utility Flasks
Rarity: Magic
Chemist's Diamond Flask of Staunching
--------
Quality: +20% (augmented)
Lasts 4.8 (augmented) Seconds
Consumes 15 (augmented) of 40 Charges on use
Currently has 40 Charges
Your Critical Strike Chance is Lucky
--------
Requirements:
Level: 27
--------
Item Level: 59
--------
22% reduced Charges used
Immunity to Bleeding and Corrupted Blood during Flask effect
Removes Bleeding and Corrupted Blood on use
--------
Lucky means that a number is rolled twice and the best result is picked. Right click to drink. Can only hold charges while in belt. Refills as you kill monsters.
`,
        });

        window.HoradricHelper.applyConfig("demo-6", {
          rawData: `
Item Class: Utility Flasks
Rarity: Unique
Rumi's Concoction
Granite Flask
--------
Quality: +20% (augmented)
Lasts 4.8 (augmented) Seconds
Consumes 30 of 60 Charges on use
Currently has 60 Charges
+3000 to Armour
--------
Requirements:
Level: 68
--------
Item Level: 76
--------
+17% Chance to Block Attack Damage during Flask effect
+6% Chance to Block Spell Damage during Flask effect
--------
"Yesterday I was clever, so I wanted to change the world.
Today I am wise, so I am changing myself."
-Rumi of the Vaal
--------
Right click to drink. Can only hold charges while in belt. Refills as you kill monsters.
`,
        });

        window.HoradricHelper.applyConfig("demo-4", {
          rawData: `
Item Class: Jewel
Rarity: Normal
Crimson Jewel
--------
Item Level: 49
--------
Place into an allocated Jewel Socket on the Passive Skill Tree. Right click to remove from the Socket.
`,
        });

        window.HoradricHelper.applyConfig("demo-3", {
          rawData: `
Item Class: Rings
Rarity: Unique
Mark of the Shaper
Opal Ring
--------
Quality (Elemental Damage Modifiers): +7% (augmented)
--------
Requirements:
Level: 80
--------
Item Level: 86
--------
26% increased Elemental Damage (implicit)
--------
20% chance to Trigger Level 20 Summon Volatile Anomaly on Kill
Adds 16 to 59 Lightning Damage to Spells
8% increased maximum Energy Shield
8% increased maximum Life
73% increased Spell Damage if your other Ring is an Elder Item
Cannot be Stunned by Spells if your other Ring is a Shaper Item
--------
Let madness take control.
--------
Shaper Item
`,
        });
        window.HoradricHelper.applyConfig("demo-2", {
          rawData: `
Item Class: Rings
Rarity: Magic
Rotund Unset Ring of Haast
--------
Quality (Critical Modifiers): +3% (augmented)
--------
Requirements:
Level: 67
Dex: 90
--------
Sockets: G
--------
Item Level: 84
--------
Has 1 Socket (implicit)
--------
+63 to maximum Life
+48% to Cold Resistance
--------
Elder Item
-------

Corrupted
`,
        });
        window.HoradricHelper.applyConfig("demo-1", {
          rawData: `
Item Class: Boots
Rarity: Rare
Woe Road
Hydrascale Boots
--------
Quality: +20% (augmented)
Armour: 161 (augmented)
Evasion Rating: 175 (augmented)
--------
Requirements:
Level: 70
Str: 155
Dex: 56
Int: 68
--------
Sockets: R-R R-R
--------
Item Level: 73
--------
70% increased Mana Regeneration Rate if you've cast a Spell Recently (enchant)
--------
+27 to Dexterity
+28 to Armour
+40 to Evasion Rating
+82 to maximum Life
+42% to Lightning Resistance
30% increased Movement Speed
24% increased Stun and Block Recovery`,
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
.poe-demo {
  display: flex;
  flex-direction: column;
  width: 100%;
  left: 100px;

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
    flex-direction: column;
    align-items: center;
    min-height: 250px;
    margin-top: 20px;
    margin-bottom: 20px;

    & .poe-node-showcase,
    & .poe-item-showcase {
      margin-left: auto;
      margin-right: auto;

      & .poe-item-showcase-wrapper {
        margin: 20px;
      }
    }
  }
}
</style>
