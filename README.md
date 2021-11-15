# 💀 Horadric Helper 💀

[![Release Horadric Helper](https://github.com/meta-is-beta/horadric-helper/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/meta-is-beta/horadric-helper/actions/workflows/release.yml)

A JavaScript WebComponents library that allows you to display tooltips from ARPG games on your website using Html tags.
To see more examples checkout [this](https://meta-is-beta.com/?p=40) post on my [blog](https://meta-is-beta.com/).

**Currently supported games**
- Path of Exile

## Table of Content

- [How-to TLDR](#how-to-tldr)
- [Installation](#installation)
- [Html Components](#html-components)
- [Html Component Props](#html-component-props)
- [Configuration object](#configuration-object)
- [Showcase sections](#showcase-sections)
- [Skills and Passives data](#skills-and-passives-data)
- [Contribution](#contribution)

## How-to TLDR

Short example of library usage.
More complex examples with explanations can be found in the rest of the documentation.
You can also check it out live on [Codepen](https://codepen.io/meta-is-beta/pen/mdWXzBY).

#### 1. Include `js` and `css` files on your site.

```html
<script src="https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@v0.10/dist/poe/horadric-helper-poe.umd.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@v0.10/dist/poe/horadric-helper-poe.css"/>
```

#### 2. Add a component to your website's Html.

```html
<p>
  <poe-item as-icon reference="example-item"></poe-item>
</p>
```

#### 3. Initialize config for referenced item.

```html
<script>
  window.HoradricHelper.PathOfExile.applyConfig({
    reference: "example-item",
    iconUrl: "https://web.poecdn.com/image/Art/2DItems/Armours/Gloves/GlovesStrDex1.png",
    data: `
      Item Class: Gloves
      Rarity: Magic
      Frosted Fishscale Gauntlets of Skill
      --------
      Armour: 9
      Energy Rating: 9
      --------
      Requirements:
      Level: 2
      Str: 4
      Dex: 4
      --------
      Item Level: 5
      --------
      Adds 1 to 2 Cold Damage to Attacks
      6% Increased Attack Speed
    `,
  });
</script>
```

#### 4. Item should be displayed on the page.

You can see how it works here: [Codepen](https://codepen.io/meta-is-beta/pen/mdWXzBY).

## Installation

To enable Horadric Helper you simply need to include JavaScript and CSS files on your website (same as any other js library).

You can get both `js` and `css` files from jsDelivr CND:

```url
https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@v0.10/dist/poe/horadric-helper-poe.umd.min.js
https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@v0.10/dist/poe/horadric-helper-poe.css
```

_You can specify a version of the library by changing `@v0.10` to the desired version. You can also set it to `latest` to always get newest version._

**OR**

You can get them from this repo's `/dist/poe` folder.

**Notes**

- This library supports only newer browsers such as Chrome, Firefox or Opera. IE11 is **not** supported.
- There is also a non-minified version of JS available under `horadric-helper-poe.umd.js`.
- There are source-map files for both minified and non-minified versions.

## Html Components

Package `horadric-helper-poe` contains 2 components:

- `<poe-item>` - This component can render equipment, gems, jewels, flasks, currency and maps
- `<poe-passive>` - This component can render passives, including ascendancy nodes

To activate components you need to assign a `reference` prop to them.
This will allow you to later load configuration objects for that reference.
_(More about this in [Configuration](#configuration-object) section.)_

```html
<poe-item reference="Headhunter"></poe-item>
```

**Notes**

- Multiple components with the same reference can exist - any config applied to that reference will work for all matching components.
- Components can be used as any other Html element - this is thanks to [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard.
- This library does **NOT** utilize shadow DOM - this means that collisions between website's styles and component's styles can occur and needs to be solved on a case-by-case basis _(In other words - your website's css can conflict with this library's css)_.

## Html Component Props

You can apply props to set or change behaviour for individual components.
| Prop | Type | Description |
|:-------:|:----------:|:------|
| `reference` | `String` | **Required**. Name used to target components with the same reference when loading configs. See [Configuration](#configuration-object) section for details. |
| `classes` | `String` | Additional classes that will be applied to the root component.|
| `popover-classes` | `String` | Additional classes that will be applied to popover. |
| `bordered` | `Boolean` | Always show borders around showcase |
| `borderless` | `Boolean` | Never show borders around showcase |
| `label-text` | `String` | By default items will be labeled by their name. You can override that with this prop and assign your own text. |
| `as-text` | `Bool` | Display item as text. Showcase popover will appear on hover. (_This is the default settings_) |
| `as-icon` | `Bool` | Displays item as icon with label. Showcase popover will appear on hover. |
| `as-showcase` | `Bool` | Displays an item as a showcase. Showcase popover will **not** appear on hover. |
| `icon-inside` | `Bool` | Show icon inside of showcase. (_Only works if `iconUrl` was provided in config_) |
| `icon-outside` | `Bool` | Show icon outside of showcase. (_Only works if `iconUrl` was provided in config_) |
| `icon-size` | `string` | Available values: `auto\|sm\|md\|lg\|xlg`. Allows to set the size of the icon. Default is `auto`. |
| `show-stacks` | `Bool` | Displays the amount of stacks when in `as-icon` mode as the number above icon. _(Stacks are defined in ether "stacks'' section of Item Config or in raw data copied from the game)_ |
| `show-stacks-in-label` | `Bool` | Displays amount of stacks when in `as-icon` or `as-text` mode as number in label. _(Stacks are defined in ether "stacks'' section of Item Config or in raw data copied from the game)_|
| `show-sockets` | `Bool` | Displays sockets under icon when in `as-icon` mode. |
| `show-sockets-in-showcase` | `Bool` | Displays sockets inside of the showcase. |
| `dim-sections` | `String` | List of sections to be greyed-out. More about this in [Sections](#showcase-sections) chapter. |
| `hide-sections` | `String` | List of sections to be hidden. More about this in [Sections](#showcase-sections) chapter. |

#### Examples

`Headhunter` as a small icon, with the `properties` section hidden.

```html
<poe-item
  reference="Headhunter"
  as-icon
  hide-sections="properties"
  icon-size="sm"
></poe-item>
```

`Beef` passive as a showcase, with an icon displayed inside.

```html
<poe-passive reference="Beef" as-text icon-inside></poe-passive>
```

## Configuration object

When the library is loaded it will register a global object called `HoradricHelper`.
You can use the `HoradricHelper.PathOfExile.applyConfig` method to load either a single `PoeConfig` object or an array of `PoeConfig` objects.

### `PoeConfig` object

```typescript
type PoeConfig = {
  // Required
  // Reference name of components to which this config should apply to.
  // Eg: If you set this value to "Headhunter" this config will be
  // applied to all components with <poe-item reference="Headhunter">.
  reference: String;

  // Optional
  // Url of icon that will be displayed if any of the icon props are set.
  iconUrl?: String;

  // Required
  // Object which describes all properties of item or passive you want to display or string with raw item data.
  data: PoeItem | PoePassive | String;

  // Optional
  // Object with extension data for config that does not fit into "data" field
  extensions?: {
    // Optional
    // Dictionary that assigns item references to sockets.
    // Referenced items need to also have their config defined.
    // More about this in Sockets section
    // Eg:
    // socketReferences: {
    //    1: "Shield Charge",
    //    2: "Fortify"
    //    3: "Increased Duration Support"
    //  }
    socketReferences?: { [Number]: String };
  };
};
```

### Getting item data

`data` property of `PoeConfig` object accepts data of type `PoeItem`, `PoePassive` and `String`.
`PoeItem` and `PoePassive` are objects with structure described in their respective sections and allow you to define your own configurations.

In case of PoE items you can also pass raw item data from different sources and the library will try to parse and display them.
Raw item data can be acquired from:

- **The game** - To copy an item's data to clipboard press CTRL+C while hovering over an item in-game.
- **PoE Trade** - Each search result has a "Copy Item" button. This will behave in the same way as copying data from the game.
- **Path of Building (PoB)** - To copy item's data to clipboard navigate to "Items" tab, select item you want to copy and press CTRL+C. (Do not copy item's data from "Edit Item" popup - it is incomplete and won't work).

### `PoeItem` object

```typescript
type PoeItem = {
  // Required
  // Item's rarity
  rarity: "normal" | "rare" | "magic" | "unique" | "gem";

  // Required
  // Item type
  type: "equipment" | "gem" | "jewel" | "flask" | "currency" | "map";

  // Required
  // Item name
  name: String;

  // Optional
  // Name of item's base - eg. "Leather Belt" for Headhunter
  baseName?: String;

  // Optional
  // List of influences on an item
  // Eg: ["elder", "shaper"]
  influences:
    | (
        | "crusader"
        | "warlord"
        | "hunter"
        | "redeemer"
        | "elder"
        | "shaper"
        | "replica"
      )[]
    | null;

  // All sections are optional
  sections: {
    // List of item's properties text lines
    // Eg: ["Armour: 9", "Energy Rating: 9"]
    properties?: String[];

    // Item's level
    // Eg: "42"
    level?: String;

    // List of item's requirement text lines
    // Eg: ["Dex: 12", "Str: 12"]
    requirements?: String[];

    // List of item's enchants text lines
    // Eg: ["Allocates Beef"]
    enchants?: String[];

    // List of item's implicits text lines
    // Eg: ["Has 1 Socket"]
    implicits?: String[];

    // List of item's Scourge Modifiers text lines
    // Eg: ["Adds 5 to 6 Physical Damage to Attacks"]
    scourgeMods?: String[];

    // List of item's modifiers text lines
    // Eg: ["Adds 1 to 2 Cold Damage to Attacks", "6% Increased Attack Speed"]
    modifiers?: String[];

    // List of item's statuses
    // Eg: ["corrupted", "split"]
    statuses?: ("corrupted" | "mirrored" | "split")[];

    // List of item's gem description text lines
    // Eg: ["Supports any skill that has a duration."]
    gemDescription?: String[];

    // Numerical value of talisman tier.
    // Eg: "1"
    talismanTier?: String;

    // List of item's floavur text lines.
    // Eg: ["You are slow, foolish and ignorant.", "I am not."]
    flavourText?: String;
  };
};
```

### `PoePassive` object

```typescript
type PoePassive = {
  // Required
  // Passives's name
  // Eg: "Beef"
  name: String;

  // Required
  // Passives's type
  // Eg: "notable"
  type:
    | "basic"
    | "notable"
    | "keystone"
    | "ascendancy basic"
    | "ascendancy notable";

  // All sections are optional
  sections: {
    // List of passives's description text lines
    // Eg. for "Arcane Blessing":
    // [
    //   "50% increased Effect of Arcane Surge on you",
    //   "Gain Arcane Surge when you or your Totems Hit an Enemy with a Spell"
    // ]
    description: String[];

    // List of passives's flavour text lines
    // Eg. for "Ancestral Bond"
    // [
    //   "A wooden construct, mute and blind.",
    //   "But fear the wrath of shackled mind."
    // ]
    flavourText: String[];
  };
};
```

### Examples of loading configs

#### 1. Item loaded from data object

As icon, with modified label text and medium icon.
_(Live on [Codepen](https://codepen.io/meta-is-beta/pen/VwpQVvZ))_

```html
<!-- Html --->
<body>
  <div>
    <poe-item
      reference="custom-item"
      as-icon
      icon-size="md"
      label-text="Spell block amulet"
    ></poe-item>
  </div>
</body>

<!-- JavaScript --->
<script>
  window.HoradricHelper.PathOfExile.applyConfig({
    reference: "custom-item",
    iconUrl: "https://web.poecdn.com/image/Art/2DItems/Amulets/Amulet5Unique.png",
    data: {
      rarity: "Unique",
      type: "Equipment",
      name: "Stone of Lazhwar",
      baseName: "Lapis Amulet",
      sections: {
        requirements: ["Level 5"],
        implicits: ["+22 to Intelligence"],
        modifiers: [
          "14% Chance to Block Spell Damage",
          "12% increased Cast Speed",
          "+45 to maximum Mana",
        ],
        flavourText: [
          "You are slow, foolish and ignorant.",
          "I am not."
        ],
      },
    },
  });
</script>
```

#### 2. Item loaded from raw data from the game

As a showcase, with icon inside and with item level hidden.
_(Live on [Codepen](https://codepen.io/meta-is-beta/pen/VwpQVeZ))_

```html
<!-- Html --->
<body>
  <div>
    <poe-item
      reference="ingame-item"
      as-showcase
      icon-inside
      hide-sections="item-level"
    ></poe-item>
  </div>
</body>

<!-- JavaScript --->
<script>
  window.HoradricHelper.PathOfExile.applyConfig({
    reference: "ingame-item",
    iconUrl: "https://web.poecdn.com/image/Art/2DItems/Armours/Helmets/HelmetDexUnique2.png",
    data: `
      Item Class: Helmets
      Rarity: Unique
      Goldrim
      Leather Cap
      --------
      Evasion Rating: 54 (augmented)
      --------
      Sockets: G-G-B-G
      --------
      Item Level: 60
      --------
      +35 to Evasion Rating
      10% increased Rarity of Items found
      +36% to all Elemental Resistances
      Reflects 4 Physical Damage to Melee Attackers
      --------
      No metal slips as easily through the fingers as gold.
    `,
  });
</script>
```

#### 3. Item loaded from raw data from Path of Building

As a showcase, with icon outside and with sockets displayed.
_(Live on [Codepen](https://codepen.io/meta-is-beta/pen/KKWjKKp))_

```html
<!-- Html --->
<body>
  <div>
    <poe-item
      reference="pob-item"
      show-sockets-in-showcase
      as-showcase
      icon-outside
    ></poe-item>
  </div>
</body>

<!-- JavaScript --->
<script>
  window.HoradricHelper.PathOfExile.applyConfig({
    reference: "pob-item",
    iconUrl: "https://web.poecdn.com/image/Art/2DItems/Armours/BodyArmours/BodyStr3C.png",
    data: `
      Rarity: RARE
      New Glorious Plate
      Glorious Plate
      Shaper Item
      Elder Item
      Crafted: true
      Prefix: {range:0.972}LocalIncreasedPhysicalDamageReductionRatingPercent6
      Prefix: {range:0.746}LocalBaseArmourAndLife3
      Prefix: {range:1}DelveBodyArmourAvoidFire1_
      Suffix: {range:0.5}DelveBodyArmourSocketedSkillsSupportedByArcaneSurge1_
      Suffix: {range:0.5}DelveStrengthGemLevel1
      Suffix: {range:0.113}DelveArmourPhysDamageTakenv2_3
      Quality: 20
      Sockets: R-R-R-R-R-R
      LevelReq: 68
      Implicits: 2
      {tags:damage}{range:0.5}(40-50)% increased Damage
      {tags:resistance}+1% to all maximum Resistances
      +1 to Level of Socketed Strength Gems
      Socketed Gems are Supported by Level 1 Arcane Surge
      +82 to Armour
      91% increased Armour
      +32 to maximum Life
      -72 Physical Damage taken from Hits
      10% chance to Avoid Fire Damage from Hits
      Corrupted
    `,
  });
</script>
```

#### 4. Passive loaded from data object

As text, with an icon outside.
_(Live on [Codepen](https://codepen.io/meta-is-beta/pen/LYWQXGK))_

```html
<!-- Html --->
<body>
  <div>
    <poe-passive
      reference="magnifier-passive"
      as-text
      icon-outside
    ></poe-passive>
  </div>
</body>

<!-- JavaScript --->
<script>
  window.HoradricHelper.PathOfExile.applyConfig({
    reference: "magnifier-passive",
    iconUrl: "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/2/2e/AreaDmgNotable_passive_skill_icon.png",
    data: {
      name: "Magnifier",
      type: "Notable",
      sections: {
        description: [
          "10% increased Area of Effect",
          "10% increased Area Damage",
          "+10% to Critical Strike Multiplier",
        ],
      },
    },
  });
</script>
```

## Showcase sections

- Showcases are split into sections such as `modifiers`, `implicits`, etc.
- You can choose which sections you want to load if you are using `data` as a data source.
- You can also grey-out or hide specific lines or entire sections using `dim-sections` and `hide-sections` props.

### `PoeItem` sections

|       Name       |     Prop name     |    Type    | Description                                                                                                                                              |
| :--------------: | :---------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `itemLevel`    |   `item-level`    |  `String`  | Item's level ([wiki](https://pathofexile.fandom.com/wiki/Item_level)) _(do not confuse with item's level requirement)_.                                  |
|  `requirements`  |  `requirements`   | `String[]` | List of item's requirement text lines.                                                                                                                   |
|    `sockets`     |     `sockets`     |  `String`  | String representing sockets and their links. _(More about sockets in [Sockets](#sockets) section.)_                                                      |
|    `enchants`    |    `enchants`     | `String[]` | List of item's enchants text lines ([wiki](https://pathofexile.fandom.com/wiki/Modifiers#Enchantments)).                                                 |
|   `implicits`    |    `implicits`    | `String[]` | List of item's implicits text lines ([wiki](https://pathofexile.fandom.com/wiki/Modifiers#Implicit_modifiers)).                                          |
|   `scourgeMods`    |    `scourge-mods`    | `String[]` | List of item's Scourge mods. |
|   `modifiers`    |    `modifiers`    | `String[]` | List of item's modifiers text lines ([wiki](https://pathofexile.fandom.com/wiki/Modifiers#Explicit_modifiers)) _(also known as **explicit modifiers**)_. |
|    `statuses`    |    `statuses`     | `String[]` | Available statuses: `corrupted`, `mirrored`, `split`.                                                                                                    |
| `gemDescription` | `gem-description` | `String[]` | List of item's gem description text lines.                                                                                                               |
|  `talismanTier`  |  `talisman-tier`  |  `String`  | String of numerical value of talisman tier.                                                                                                              |
|     `stacks`     |     `stacks`      |  `Number`  | Numerical value of how many given items there are. _(More about stacks in [Stacks](#stacks) section.)_                                                   |
|  `flavourText`   |  `flavour-text`   |  `String`  | List of item's flavour text lines.                                                                                                                       |

### `PoePassive` sections

|     Name      |    Type    | Description                               |
| :-----------: | :--------: | :---------------------------------------- |
| `description` | `String[]` | List of passive's description text lines. |
| `flavourText` | `String[]` | List of passive's flavour text lines.     |

### Sockets

_Full live example of sockets usage on [CodePen](https://codepen.io/meta-is-beta/pen/NWpQgjZ)_

Sockets are defined by the `sockets` section of Config Object or are provided by raw item data from the game or from PoB (with line "`Sockets: {socket string}`"). You can display them through `show-sockets` and `show-sockets-in-showcase` props.

#### Socket notation

There are 6 types of sockets available:

- `R`, `G`, `B`, `W` - Reb, blue, green and white. Usually found on normal items.
- `A` - "Abyssal" sockets found on abyssal items.
- `D` - "Delve" sockets found on resonators.

Socket string is a list of socket symbols separated by "`-`" if they are linked or by "` `" (whitespace) if they are not linked.

For example:

- 3 linked red sockets: `R-R-R`
- 6 sockets (3 blue, 3 green), 5 of them linked: `G-G-B-G-B B`
- 3 white linked sockets and one abyssal socket: `W-W-W A`
- 3-socketed resonator: `D D D`

#### Socketing items

By default sockets will be empty. To place items into them you have to:

- Make sure that items you want to socket have their config defined.
- Add them to the `extensions.socketReferences` section of config.

Example:

```javascript

{
  "reference": "Fortify Shield",
  "extensions": {
    "socketReferences": {
      "1": "Shield Charge",
      "2": "Fortify Support",
      "3": "Increased Duration Support",
    }
  },
  "data": `...`
}
```

### Stacks

_Full live example of stacks usage on [CodePen](https://codepen.io/meta-is-beta/pen/vYxowbZ)_

- Stacks can display how many of given item or passive there are.
- They are defined by `stacks` section of Config Object or by line on raw item data (`Stack Size: {current stacks}/{max stacks}`)
- They can be displayed as either a number above the item's icon (through `show-stacks` prop) or as a prefix before the item's name in it's label (through `show-stacks-in-label` prop).

### Flavour text

- When creating items with Config Object you can add flavour text by passing it to `flavourText` section.
- Only `unique` items compied from the game will have their flavour text copied. If you want to add flavour text to non-unique items prepend it with "`Flavour Text:`" in item's raw data string.

`Unique` item example:

<pre><code>
Item Class: Amulets
Rarity: Unique
Stone of Lazhwar
Lapis Amulet
--------
...
--------
<b>You are slow, foolish and ignorant.
I am not.</b>
</code></pre>

`Non-unique` item example:

<pre><code>
Item Class: Amulets
Rarity: Rare
Cataclysm Locket
Horned Talisman
--------
...
--------
<b>Flavour Text: The Empire hides lies and falsehoods
Behind a mask of politeness and civility.
The First Ones teach us to look through the lies,
And that no beast can truly cover their tracks.
- The Wolven King</b>
--------
Corrupted
</code></pre>

### Dimming and hiding sections

You can dim or hide either entire sections or specific lines of showcase using `dim‑sections` and `hide‑sections` props. _(Section names are in `kebab-case`)_

#### Targeting entire sections

You can target entire sections by passing section names separated by `;`.

**Format**

```js
hide-section="section1;section2;section3";
```

or

```js
hide-sections="section1:all;section2:all;section3:all";
```

**Example**

```html
<!-- Hiding all implicits and requirements -->
<poe-item reference="Headhunter" hide-sections="implicits;requirements"></poe-item>

<!-- Dimming entire description -->
<poe-passive reference="Beef" dim-sections="description"></poe-passive>
```

<p align="center">
  <img src="https://meta-is-beta.com/wp-content/uploads/2021/06/HideSections2.png" />
</p>

#### Targeting specific lines

To target specific lines you can pass numbers of lines separated by `,` after the section's name.

**Format**

```js
hide-sections="section1:1,2;section2:4,5,6;section3:1";
```

**Example**

```html
<!-- Hiding 1st and 2nd line of modifiers and 1st line of properties -->
<poe-item reference="Headhunter" hide-sections="modifiers:1,2;properties:1"></poe-item>

<!-- Dimming 3rd and 4th line of description -->
<poe-passive reference="Lethality" dim-sections="description:3,4"></poe-passive>
```

<p align="center">
  <img src="https://meta-is-beta.com/wp-content/uploads/2021/06/HideLines2.png" />
</p>

## Skills and Passives data

There are premade configs for skill gems and passive that you can use.

- In `/src/path-of-exile/tools/data` you will find two json files:
  - `gem-data.json` - This file holds premade configs for all skill gems in the game as of patch 3.14
  - `passive-node-data.json` - This file holds premade configs for all passives in the game as of patch 3.14
- In `/src/path-of-exile/tools/` you will find two script files:
  - `get-poe-gems-data.js` - This script can pull the newest config data for all gems. It will produce a file similar to `gem-data.json`
  - `get_poe_passive_node_data.py` - This script can pull the newest passives data. It will produce a file similar to `passive-node-data.json`

## Contribution

- Please file bug reports here, on github
- If you have any questions or suggestions feel free to message me at meta.is.beta@gmail.com or on reddit at `/u/Meta_Is_Beta`.

### About library setup

- This library is built using Vue v2.
- WebComponents implementation done using [vue-custom-element](https://github.com/karol-f/vue-custom-element).
- Popover handling is done using [v-tooltip](https://www.npmjs.com/package/v-tooltip) (Vue implementation of [popper.js](https://popper.js.org/)).
- Typescript support is enabled, but only a few files are in typescript (where I decided that strong typing will be most useful).
- `/src` is split into different folders for each target:
  - Each game has it's own folder.
  - `demo` folder holds the entry point for the demo.
  - `shared` folder holds all modules common to all games.

### Local development

Installing dependencies

```sh
npm install
```

Running demo

```sh
npm run serve
```

Building production libraries to `/dist/`

```sh
npm run build
```

Running linter

```sh
npm run lint
npm run lint:fix
```

Running tests

```sh
npm run test:unit
```
