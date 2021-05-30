# Horadric Helper 💀

[![Release Horadric Helper](https://github.com/meta-is-beta/horadric-helper/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/meta-is-beta/horadric-helper/actions/workflows/release.yml)

A JavaScript WebComponents library that allows you to display tooltips from ARPG games\* on you webstie using HTML tags. See it in action on my [blog](https://meta-is-beta.com/?p=40).

_\*In this Beta version only Path of Exile theme is avalible. Working on more._

## Packages

You can get both `js` and `css` package from jsDelivr CND:

```url
https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@latest/dist/poe/poe-showcase.umd.min.js
https://cdn.jsdelivr.net/gh/meta-is-beta/horadric-helper@latest/dist/poe/poe-showcase.css
```

More about diffrent package types, self-hosting and versions in "Packages" section.

## Usage TL:DR

#### 1. Include `js` and `css` files on your site.

```html
<script src="poe-showcase.umd.min.js"></script>
<link rel="stylesheet" href="poe-showcase.css" />
```

#### 2. Add component to your HTML.

```html
<p>
  <poe-item as-icon reference="Frosted Fishscale Gauntlets of Skill"></poe-item>
</p>
```

#### 3. Initialize config for referenced item.

```html
<script>
  window.HoradricHelper.applyConfig({
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
  });
</script>
```

#### 4. Item should be displayed on the page as icon.

![DangYo2](https://meta-is-beta.com/wp-content/uploads/2021/05/de7b6ac2f1887243b844b831f4263347.gif)

## Props

You can apply props to change behaviour for individual components.
| Prop | Type | Description | PoE Items | PoE Passives |
|:-------:|:----------:|:------|:-----:|:-----:|
| `reference` | `String` | Name used to target component when loading configs. See **Item config** section for details. | :heavy_check_mark: | :heavy_check_mark: |
| `classes` | `String` | Additional classes that will be applied to component.| :heavy_check_mark: | :heavy_check_mark: |
| `popover-classes` | `String` | Additional classes that will be applied to popover. | :heavy_check_mark: | :heavy_check_mark: |
| `label-text` | `String` | By default items will be labeled by their name. You can override that with this prop. | :heavy_check_mark: | :heavy_check_mark: |
| `as-text` | `Bool` | Display item as text. Showcase popover will appear on hover. (\_This is the default settings.\*) | :heavy_check_mark: | :heavy_check_mark: |
| `as-icon` | `Bool` | Displays item as icon with label. Showcase popover will appear on hover. | :heavy_check_mark: | :heavy_check_mark: |
| `as-showcase` | `Bool` | Displays item as showcase. Showcase popover will **not** appear on hover. | :heavy_check_mark: | :heavy_check_mark: |
| `icon-inside` | `Bool` | Show icon inside of showcase. (Only works if `iconSrc` was provided in config.) | :heavy_check_mark: | :heavy_check_mark: |
| `icon-outside` | `Bool` | Show icon outside of showcase. (Only works if `iconSrc` was provided in config.) | :heavy_check_mark: | :heavy_check_mark: |
| `icon-size` | `string` | Available values: `auto\|sm\|md\|lg\|xlg`. Allows to set size of icon. Default is `auto`. | :heavy_check_mark: | :x: |
| `dim-sections` | `String` | List of sections to be greyed-out. More about this in **Item sections** section. | :heavy_check_mark: | :heavy_check_mark: |
| `hide-sections` | `String` | List of sections to be hidden. More about this in **Item sections** section. | :heavy_check_mark: | :heavy_check_mark: |

#### Usage examples

```html
<poe-item
  reference="Headhunter"
  as-item
  dim-sections="properties:1,2"
  icon-size="sm"
></poe-item>
```

```html
<poe-passive
  reference="Beef"
  as-showcase
  label-text="Best passive"
></poe-passive>
```

## Item config

When library is loaded it will register global object called `HoradricHelper`.
You can use `HoradricHelper.applyConfig` method to load either single `config` object or array of `config` objects.

_In the future there will be diffrent configs for diffrent games, following configs are for Path of Exile only._

#### Config object

```typescript
type PoeConfig = {
  // Required
  // Reference name of components to which this config should apply to.
  reference: String;

  // Optional
  // Url of icon that will be displayed if any of icon props is set.
  iconSrc: String | null;

  // Required (exclusive with 'rawData' - use only one of them)
  // Object which describest all properties of item you want to display.
  // Exact structure of that object is described below.
  dataObject: PoeItem | PoePassive;

  // Required (exclusive with 'dataObject' - use only one of them)
  // Raw item data pulled from the game.
  // So far this only works for items from Path of Exile.
  // (To copy item's data press crl+c while hovering over item in game)
  rawData: String | null;
};
```

#### Data object
`dataObject` object will be diffrent depending on the type of item you want  to show.

- Data object for ``poe-item`` components:
```typescript
type PoeItem = {
  rarity: "normal" | "rare" | "magic" | "unique" | "gem" | "";
  class: String | null;
  type: String | null;
  name: String | null;
  baseName: String | null;
  influences: ("crusader" | "warlord" | "hunter" | "redeemer" | "elder" | "shaper" | "replica" | "")[];
  level: String | null;
  requirements: String[] | null;
  sockets: String[] | null;
  properties: String[] | null;
  enchants: String[] | null;
  implicits: String[] | null;
  modifiers: String[] | null;
  gemDescription: String[] | null;
  statuses: ("corrupted" | "mirrored" | "split")[];
}
```
- Data object for `poe-passive` components:
```typescript
type PoePassive = {
  name: String;
  type: "basic" | "notable" | "keystone";
  description: String[];
};
```
## Item sections

## Packages

## Nerd stuff
