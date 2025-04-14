# Catci's web Engine

V 0.2 avaliable (somewhat finished -- json, animations, normal mapped images arent yet functional)

*Catci'web Engine* is a lightweight web engine that allows you to embed CSS, JavaScript, animations, and JSON-driven content directly into your HTML using custom data attributes. This engine aims to simplify styling and interactive behavior with shorthand syntax and built-in helpers.

---

## Table of Contents

1. [Overview](#overview)
2. [Data Attributes](#data-attributes)
3. [CSS Shortcuts](#css-shortcuts)
   - [Display](#display)
   - [Margin](#margin)
   - [Padding](#padding)
   - [Position](#position)
   - [Border](#border)
   - [Background](#background)
   - [Font](#font)
   - [Size](#size)
   - [Color](#color)
4. [JSON Integration](#json-integration)
5. [Normal Map Image Support](#normal-map-image-support)
6. [Pre-defined Animations](#pre-defined-animations)
7. [Stroke Effects](#stroke-effects)
8. [Example Document](#example-document)
9. [Additional Notes](#additional-notes)

---

## Overview

Catci'web Engine allows you to embed CSS and JavaScript directly into your HTML using custom data attributes. It provides simplified syntax (acronyms) that maps quickly to standard CSS properties and JavaScript behaviors. Among its features are:

- **Easy CSS shorthand** for common properties such as display, margin, padding, and more.
- **Extra functionalities** like JSON data pushing, normal map rendering, and stroke effects.
- **Built-in pre-defined animations** (spin, fade, slide, zoom, etc.) with customizable durations.

---

## Data Attributes

Use these attributes to control where your inline CSS/JS/animations go:

- **Primary Attributes:**  
  `data-catci`, `data-cen`, `data-cx`, `data-ce`
- **Scripts and Styles:**  
  `data-catci-scripts` (scripts),  
  `data-catci-styles` (styles),  
  `data-catci-animations` (animations),  
  `data-catci-styles-global` (global styles)
- **Low-end Devices:**  
  `data-catci-lowend`

---

## CSS Shortcuts

The engine uses shorthand syntax to define properties. Each shortcut corresponds to one or more CSS rules.

### Display

| Shortcut                               | Resulting CSS                                   |
|----------------------------------------|-------------------------------------------------|
| `flex-row` or `fr`                     | `display: flex; flex-direction: row;`           |
| `flex-col` or `fc`                     | `display: flex; flex-direction: column;`        |
| `inline-flex-row` or `ifr`             | `display: inline-flex; flex-direction: row;`    |
| `inline-flex-col` or `ifc`             | `display: inline-flex; flex-direction: column;` |
| `block` or `db`                        | `display: block;`                               |
| `inline-block` or `idb`                | `display: inline-block;`                        |
| `none` or `dn`                         | `display: none;`                                |
| `inline` or `di`                       | `display: inline;`                              |
| `grid` or `dg`                         | `display: grid;`                                |
| `inline-grid` or `dig`                 | `display: inline-grid;`                         |
| `contents` or `dc`                     | `display: contents;`                            |
| `table` or `dt`                        | `display: table;`                               |
| `table-row` or `dtr`                   | `display: table-row;`                           |
| `table-cell` or `dtc`                  | `display: table-cell;`                          |
| *(Additional table-related shortcuts)* | *(e.g., `dtcap`, `dtcol`, etc.)*                |

### Margin

| Shortcut                | Usage         | Resulting CSS             |
|-------------------------|---------------|---------------------------|
| `margin` or `m`         | `m:{value};`  | `margin: {value};`        |
| `auto-margin` or `am`   |               | `margin: auto;`           |
| `no-margin` or `nm`     |               | `margin: 0;`              |
| `margin-top` or `mt`    | `mt:{value};` | `margin-top: {value};`    |
| `margin-right` or `mr`  | `mr:{value};` | `margin-right: {value};`  |
| `margin-bottom` or `mb` | `mb:{value};` | `margin-bottom: {value};` |
| `margin-left` or `ml`   | `ml:{value};` | `margin-left: {value};`   |

### Padding

| Shortcut                 | Usage         | Resulting CSS              |
|--------------------------|---------------|----------------------------|
| `padding` or `p`         | `p:{value};`  | `padding: {value};`        |
| `auto-padding` or `ap`   |               | `padding: auto;`           |
| `no-padding` or `np`     |               | `padding: 0;`              |
| `padding-top` or `pt`    | `pt:{value};` | `padding-top: {value};`    |
| `padding-right` or `pr`  | `pr:{value};` | `padding-right: {value};`  |
| `padding-bottom` or `pb` | `pb:{value};` | `padding-bottom: {value};` |
| `padding-left` or `pl`   | `pl:{value};` | `padding-left: {value};`   |

### Position

| Shortcut            | Resulting CSS         |
|---------------------|-----------------------|
| `relative` or `rel` | `position: relative;` |
| `absolute` or `abs` | `position: absolute;` |
| `fixed` or `fix`    | `position: fixed;`    |
| `sticky` or `stk`   | `position: sticky;`   |
| `static` or `sta`   | `position: static;`   |

### Border

| Shortcut                | Usage         | Resulting CSS             |
|-------------------------|---------------|---------------------------|
| `border` or `b`         | `b:{value};`  | `border: {value};`        |
| `border-top` or `bt`    | `bt:{value};` | `border-top: {value};`    |
| `border-right` or `br`  | `br:{value};` | `border-right: {value};`  |
| `border-bottom` or `bb` | `bb:{value};` | `border-bottom: {value};` |
| `border-left` or `bl`   | `bl:{value};` | `border-left: {value};`   |
| `border-radius`         | `br:{value};` | `border-radius: {value};` |
| `border-color`          | `bc:{value};` | `border-color: {value};`  |
| `border-style`          | `bs:{value};` | `border-style: {value};`  |
| `border-width`          | `bw:{value};` | `border-width: {value};`  |

### Background

| Shortcut                         | Usage          | Resulting CSS                     |
|----------------------------------|----------------|-----------------------------------|
| `background` or `bg`             | `bg:{value};`  | `background: {value};`            |
| `background-color` or `bgc`      | `bgc:{value};` | `background-color: {value};`      |
| `background-image` or `bgi`      | `bgi:{value};` | `background-image: {value};`      |
| `background-repeat` or `bgr`     | `bgr:{value};` | `background-repeat: {value};`     |
| `background-position` or `bgp`   | `bgp:{value};` | `background-position: {value};`   |
| `background-size` or `bgs`       | `bgs:{value};` | `background-size: {value};`       |
| `background-attachment` or `bga` | `bga:{value};` | `background-attachment: {value};` |

### Font

| Shortcut               | Usage         | Resulting CSS                    |
|------------------------|---------------|----------------------------------|
| `font` or `f`          | `f:{value};`  | `font: {value};`                 |
| `font-family` or `ff`  | `ff:{value};` | `font-family: {value};`          |
| `font-size` or `fs`    | `fs:{value};` | `font-size: {value};`            |
| `font-weight` or `fw`  | `fw:{value};` | `font-weight: {value};`          |
| `font-style` or `fs`   | `fs:{value};` | `font-style: {value};`           |
| `font-variant` or `fv` | `fv:{value};` | `font-variant: {value};`         |
| `font-stretch`         | `fs:{value};` | `font-stretch: {value};`         |
| `bold` or `b`          |               | `font-weight: bold;`             |
| `italic` or `i`        |               | `font-style: italic;`            |
| `underline` or `u`     |               | `text-decoration: underline;`    |
| `line-through` or `lt` |               | `text-decoration: line-through;` |

### Size

| Shortcut                | Usage         | Resulting CSS          |
|-------------------------|---------------|------------------------|
| `width` or `w`          | `w:{value};`  | `width: {value};`      |
| `height` or `h`         | `h:{value};`  | `height: {value};`     |
| `max-width` or `mw`     | `mw:{value};` | `max-width: {value};`  |
| `max-height` or `mh`    | `mh:{value};` | `max-height: {value};` |
| `min-width` or `mw`     | `mw:{value};` | `min-width: {value};`  |
| `min-height` or `mh`    | `mh:{value};` | `min-height: {value};` |
| `screen-width` or `sw`  |               | `width: 100vw;`        |
| `screen-height` or `sh` |               | `height: 100vh;`       |
| `full-width` or `fw`    |               | `width: 100%;`         |
| `full-height` or `fh`   |               | `height: 100%;`        |
| `auto-width` or `aw`    |               | `width: auto;`         |
| `auto-height` or `ah`   |               | `height: auto;`        |

### Color

| Shortcut                    | Usage          | Resulting CSS                |
|-----------------------------|----------------|------------------------------|
| `color` or `c`              | `c:{value};`   | `color: {value};`            |
| `background-color` or `bgc` | `bgc:{value};` | `background-color: {value};` |

---

## JSON Integration

Catci'web Engine allows you to push JSON data directly into HTML elements. This is especially useful for dynamic content updates.

- **Syntax example:**  
  ```html
  <div data-cx="json:first('name')
      from(https://example.com/example.json)
      push(self, content);">
  </div>
  ```
  
- **Keywords explained:**
  - `json:{path}` – specifies the JSON path.
  - `from()` – defines the source URL for JSON.
  - `first({value})` / `last({value})` – returns the first or last instance of a key/value.
  - `push(.element)` – pushes the JSON data to the specified element which can be:
    - `self` – the current element.
    - `.class` – target element by class.
    - `#id` – target element by ID.
    - `child` – target a child element.
    - `src`, `href`, `content` – attributes to push data into.

---

## Normal Map Image Support

You can add normal and color maps, as well as light properties for advanced image effects:

- **Syntax example:**
  ```html
  <div data-cx="normal-map:/path-to-normal-map;
      color-map:/path-to-color-map;
      light-color:#ffffff;
      light-intensity:0.5;
      light-direction:0,0,1;">
  </div>
  ```
  
- **Attributes:**
  - `normal-map:{path}`
  - `color-map:{path}`
  - `light-color:{value}`
  - `light-intensity:{value}`
  - `light-direction:{value}`

---

## Pre-defined Animations

Animate your elements with a set of pre-built animations. Simply include the duration (or intensity for random effects):

- **Spin Animations:**
  - `spin:{duration}`  
  - `spin-reverse:{duration}`
  
- **Fade Animations:**
  - `fade-in:{duration}`  
  - `fade-out:{duration}`
  
- **Flicker Effects:**
  - `flicker:{duration}`  
  - `flicker-random:{intensity}` *(Uses JavaScript for random flicker effect)*
  
- **Slide Animations:**
  - `slide-in-left:{duration}`
  - `slide-in-right:{duration}`
  - `slide-in-top:{duration}`
  - `slide-in-bottom:{duration}`
  - `slide-out-left:{duration}`
  - `slide-out-right:{duration}`
  - `slide-out-top:{duration}`
  - `slide-out-bottom:{duration}`
  
- **Zoom Animations:**
  - `zoom-in:{duration}`
  - `zoom-out:{duration}`

---

## Stroke Effects

Add multi-layered stroke effects to text or other elements. Each stroke can have its own layer, color, width, and opacity.

- **Syntax example:**
  ```html
  <h2 data-cx="stroke: layer(1) color(#fff) width(4px) opacity(1);
      stroke: layer(2) color(#000) width(6px) opacity(0.5);">
    Hello world!
  </h2>
  ```
  
  In this example:
  - The text has two stroke layers:
    - The first stroke (layer 1) is white, 4px wide.
    - The second stroke (layer 2) is black, 6px wide with 50% opacity.

---

## Example Document

Here's a complete HTML example to get you started using Catci'web Engine:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Catci'web Engine Example</title>
    <script src="https://catci.net/engine.js"></script>
  </head>
  <body>
    <!-- Animated Div -->
    <div data-cx="spin:1s; fade-in:1s; slide-in-left:1s; zoom-in:1s;">
      <p>Hello world!</p>
    </div>

    <!-- JSON Data Integration -->
    <div data-cx="json:first('name') from(https://example.com/example.json) push(self, content);">
      <!-- Dynamic content will be inserted here -->
    </div>

    <!-- Normal Map Image Example -->
    <div data-cx="normal-map:/images/normal-map.png; color-map:/images/color-map.png;
      light-color:#ffffff; light-intensity:0.5; light-direction:0,0,1;">
    </div>

    <!-- Stroke Effect Example -->
    <h2 data-cx="stroke: layer(1) color(#fff) width(4px) opacity(1);
      stroke: layer(2) color(#000) width(6px) opacity(0.5);">
      Styled Text
    </h2>
  </body>
</html>
```

---
