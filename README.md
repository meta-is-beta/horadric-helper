# Horadric Helper 💀

[![Release Horadric Helper](https://github.com/meta-is-beta/horadric-helper/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/meta-is-beta/horadric-helper/actions/workflows/release.yml)

A JavaScript WebComponents library that allows you to display tooltips from ARPG games on you webstie using Html tags. See it in action on my [blog](https://meta-is-beta.com/?p=40).

**Currently supported games** (Version 0.6 Beta)
- Path of Exile

## Table of Content
- [How-to TLDR](#how-to-tldr)
- [Installation](#installation)
- [Html Components](#html-components)
- [Html Component Props](#html-component-props)
- [Configuration object](#configuration-object)

## How-to TLDR
Short example of library usage.
More complex examples with explanations can be found in the rest of the documentation.

#### 1. Include `js` and `css` files on your site.

```html
<script src="https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@latest/dist/poe/horadric-helper-poe.umd.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@latest/dist/poe/horadric-helper-poe.css" />
```

#### 2. Add component to your website's Html.

```html
<p>
  <poe-item as-icon reference="Frosted Fishscale Gauntlets of Skill"></poe-item>
</p>
```

#### 3. Initialize config for referenced item.

```html
<script>
  let itemConfig = {
    reference: "Frosted Fishscale Gauntlets of Skill",
    iconSrc:
      "https://web.poecdn.com/image/Art/2DItems/Armours/Gloves/GlovesStrDex1.png",
    rawData: `
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
  };

  window.HoradricHelper.applyConfig(itemConfig);
</script>
```

#### 4. Item should be displayed on the page.

![DangYo2](https://meta-is-beta.com/wp-content/uploads/2021/05/de7b6ac2f1887243b844b831f4263347.gif)

## Installation
To enable Horadric Helper you simply need to include JavaScript and CSS files on your website (same as other js libraries).

You can get both `js` and `css` files from jsDelivr CND:

```url
https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@latest/dist/poe/horadric-helper-poe.umd.min.js
https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@latest/dist/poe/horadric-helper-poe.css
```
**OR**

You can get them from this repo's `/dist/poe` folder.

**Notes**
- This library supports only newer browsers such as Chrome, Firefox or Opera. IE11 is **not** supported.
- There is also unminified version of JS available under `horadric-helper-poe.umd.js`.
- There are source-map files for both minified and normal versions.

## Html Components
Package `horadric-helper-poe` contains 2 components:
- `<poe-item>` - Can render equipment, gems, jewels, flasks, currency and maps
- `<poe-passive>` - Can render passives, including ascendancy nodes

To activate components you need to assign `reference` prop to them.
This will allow you to later load configuration object for that reference.
*(More about this in [Configuration](#configuration-object) section.)*
```html
<poe-item reference="Headhunter">
```

**Notes**
 - Multiple components with the same reference can exist - any config applied to that reference will work for all of them.
 - Components can be used as any other Html element - this is thanks to [Web Components
](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard.

## Html Component Props

You can apply props to set or change behaviour for individual components.
| Prop | Type | Description |
|:-------:|:----------:|:------|
| `reference` | `String` | Name used to target components with the same reference when loading configs. See **Item config** section for details. |
| `classes` | `String` | Additional classes that will be applied to root component.|
| `popover‑classes` | `String` | Additional classes that will be applied to popover. |
| `label‑text` | `String` | By default items will be labeled by their name. You can override that with this prop and assign your own text. |
| `as‑text` | `Bool` | Display item as text. Showcase popover will appear on hover. (*This is the default settings*) |
| `as‑icon` | `Bool` | Displays item as icon with label. Showcase popover will appear on hover. |
| `as‑showcase` | `Bool` | Displays item as showcase. Showcase popover will **not** appear on hover. |
| `icon‑inside` | `Bool` | Show icon inside of showcase. (*Only works if `iconSrc` was provided in config*) |
| `icon‑outside` | `Bool` | Show icon outside of showcase. (*Only works if `iconSrc` was provided in config*) |
| `icon‑size` | `string` | Available values: `auto\|sm\|md\|lg\|xlg`. Allows to set size of icon. Default is `auto`. |
| `dim‑sections` | `String` | List of sections to be greyed-out. More about this in **Item sections** section. |
| `hide‑sections` | `String` | List of sections to be hidden. More about this in **Item sections** section. |

#### Examples
Headhunter as small icon, with `properties` section hidden.
```html
<poe-item
  reference="Headhunter"
  as-icon
  hide-sections="properties"
  icon-size="sm"
></poe-item>
```

Beef passive as showcase, with icon displayed inside.
```html
<poe-passive
  reference="Beef"
  as-text
  icon-inside
></poe-passive>
```

## Configuration object

When library is loaded it will register global object called `HoradricHelper`.
You can use `HoradricHelper.applyConfig` method to load either single `PoeConfig` object or array of `PoeConfig` objects.

### ``PoeConfig`` object

```typescript
type PoeConfig = {
  // Required
  // Reference name of components to which this config should apply to.
  // Eg: If you set this value to "Headhunter", this config will be applied to all components with <poe-item reference="Headhunter">.
  reference: String;

  // Optional
  // Url of icon that will be displayed if any of icon props are set.
  iconSrc: String | null;

  // Required (exclusive with 'rawData' - use only one of them)
  // Object which describes all properties of item or passive you want to display.
  // Exact structure of that object is described in 'PoeItem' and 'PoePassive' sections.
  dataObject: PoeItem | PoePassive | null;

  // Required (exclusive with 'dataObject' - use only one of them)
  // Raw item data pulled from the game.
  // So far this only works for items from Path of Exile.
  // (To copy item's data press crl+c while hovering over an item in-game)
  rawData: String | null;
};
```
### `PoeItem` object
```typescript
type PoeItem = {
  // Required
  // Item's rarity
  rarity: "normal" | "rare" | "magic" | "unique" | "gem";

  // Required
  // Item's type
  type: "equipment" | "gem" | "jewel" | "flask" | "currency" | "map";

  // Required
  // Item's name
  name: String;

  // Optional
  // Name of item's base - eg. "Leather Belt" for Headhunter
  baseName: String | null;

  // Optional
  // List of influences on an item
  // Eg: ["elder", "shaper"]
  influences: ("crusader" | "warlord" | "hunter" | "redeemer" | "elder" | "shaper" | "replica")[] | null;

  // Optional
  // List of item's properties text lines
  // Eg: ["Armour: 9", "Energy Rating: 9"]
  properties: String[] | null;

  // Optional
  // Item's level
  level: String | null;

  // Optional
  // List of item's requirement text lines
  // Eg: ["Dex: 12", "Str: 12"]
  requirements: String[] | null;

  // Optional
  // List of item's enchants text lines
  // Eg: ["Allocates Beef"]
  enchants: String[] | null;

  // Optional
  // List of item's implicits text lines
  // Eg: ["Has 1 Socket"]
  implicits: String[] | null;

  // Optional
  // List of item's modifiers text lines
  // Eg: ["Adds 1 to 2 Cold Damage to Attacks", "6% Increased Attack Speed"]
  modifiers: String[] | null;

  // Optional
  // List of item's gem description text lines
  // Only applies to items with type "Gem"
  // Eg (for Increased Duration Support): ["Supports any skill that has a duration."]
  gemDescription: String[] | null;

  // Optional
  // List of item's statuses
  // Eg: ["corrupted", "split"]
  statuses: ("corrupted" | "mirrored" | "split")[] | null;
}
```
### `PoePassive` object
```typescript
type PoePassive = {
  // Required
  // Passives's name
  name: String;

  // Required
  // Passives's type
  type: "basic" | "notable" | "keystone" | "ascendancy basic" | "ascendancy notable";

  // Required
  // List of passives's description text lines
  // Eg. for "Arcane Blessing":
  // [
  //   "50% increased Effect of Arcane Surge on you"
  //   "Gain Arcane Surge when you or your Totems Hit an Enemy with a Spell"
  // ]
  description: String[];
};
```

### Examples of loading configs

#### 1. Item loaded from dataObject
As icon, with modified label text.
```html
<!-- Html --->
<body>
  <div>
    <poe-item
      reference="Stone of Lazhwar"
      as-icon
      label-text="Spell block amulet"
    ></poe-item>
  </div>
</body>

<!-- JavaScript --->
<script>
// Declaration of PoeItem object
let amuletDataObject = {
  rarity: "Unique",
  type: "Equipment",
  name: "Stone of Lazhwar",
  baseName: "Lapis Amulet",
  level: "57",
  requirements: ["Level 5"],
  implicits: ["+22 to Intelligence"],
  modifiers: [
    "14% Chance to Block Spell Damage",
    "12% increased Cast Speed",
    "+45 to maximum Mana"
  ]
};

// Declaration of PoeConfig object
let amuletConfig = {
  reference: "Stone of Lazhwar",
  iconSrc: "https://web.poecdn.com/image/Art/2DItems/Amulets/Amulet5Unique.png",
  // Assignment of PoeItem to PoeConfig
  dataObject: amuletDataObject
};

// Loading config for <poe-item reference="Stone of Lazhwar"> component
window.HoradricHelper.applyConfig(amuletConfig);

</script>
```

#### 2. Item loaded from rawData
As showcase, with icon inside and with item level hidden.
```html
<!-- Html --->
<body>
  <div>
    <poe-item
      reference="Goldrim"
      as-showcase
      icon-inside
      hide-sections="item-level"
    ></poe-item>
  </div>
</body>

<!-- JavaScript --->
<script>
// Declaration of PoeConfig object
let helmConfig = {
  reference: "Goldrim",
  iconSrc: "https://web.poecdn.com/image/Art/2DItems/Armours/Helmets/HelmetDexUnique2.png",
  // Assignemnt of raw item data copied from the game
  rawData: `
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
  `
};

// Loading config for <poe-item reference="Goldrim"> component
window.HoradricHelper.applyConfig(helmConfig);

</script>
```

#### 3. Passive loaded from dataObject
As text, with icon outside.
```html
<!-- Html --->
<body>
  <div>
    <poe-passive
      reference="Magnifier"
      as-text
      icon-outside
      hide-sections="item-level"
    ></poe-passive>
  </div>
</body>

<!-- JavaScript --->
<script>
// Declaration of PoePassive object
let magnifierDataObject = {
  name: "Magnifier",
  type: "Notable",
  description: [
    "10% increased Area of Effect",
    "10% increased Area Damage",
    "+10% to Critical Strike Multiplier"
  ]
};

// Declaration of PoeConfig object
let helmConfig = {
  reference: "Magnifier",
  iconSrc: "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/2/2e/AreaDmgNotable_passive_skill_icon.png",
  // Assignment of PoePassive to PoeConfig
  dataObject: magnifierDataObject
};

// Loading config for <poe-passive reference="Magnifier"> component
window.HoradricHelper.applyConfig(helmConfig);

</script>
```


## Item sections

## Packages

## Nerd stuff
