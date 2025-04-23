# Catci Web Engine Documentation

## Overview

Catci is a modern, attribute-driven web engine for rapid prototyping, theming, and content rendering. It features:

- **Attribute-based styling** (utility-first, inspired by Tailwind)
- **Dynamic content rendering** (`<ext lang="...">` for Markdown, CSV, RSS)
- **Configurable tooltips**
- **3D-lit images with `<normal-img>`**
- **Quickload CSS** for instant, JS-agnostic fallback styling

---

## Implementation

Make sure these are in your head tag:
Main script:
```
https://cdn.jsdelivr.net/gh/cat-ci/webengine/main.js
```
Quickload.css for FOUC and fallback:
```
https://cdn.jsdelivr.net/gh/cat-ci/webengine/quickload.css
```

## 1. Style System (`[cx]` and Related Attributes)

### 1.1. Attribute-Driven Styling

Style elements by adding attributes like `cx`, `font`, `bg`, etc. Each attribute can take **utility shorthands** or **CSS-like property-value pairs**.

#### Example: Basic Usage

```html
<div cx="dn">This is hidden (display: none)</div>
<div cx="db">This is block (display: block)</div>
<div font="fs:1.5rem;fwght:bold">Big bold text</div>
<div bg="bgc:slate-100;">Gray background</div>
```

#### Example: Multiple Attributes

```html
<div font="fs:1.2rem;fwght:600" bg="bgc:slate-100;" spacing="p:1rem;m:2rem">
  Custom font, background, and spacing
</div>
```

### 1.2. Utility Shorthands

The `cx` attribute (and others) accept **utility shorthands**.  
For example:

| Shorthand | CSS Output                |
|-----------|---------------------------|
| `dn`      | `display: none`           |
| `db`      | `display: block`          |
| `r`       | `display: flex; flex-direction: row` |
| `jc`      | `justify-content: center` |
| `aic`     | `align-items: center`     |
| `rel`     | `position: relative`      |
| `abs`     | `position: absolute`      |

#### Example: Flexbox Centering

```html
<div cx="r jc aic" style="height:200px">
  <span>Centered!</span>
</div>
```

### 1.3. Property-Value Pairs

You can use property-value pairs in any attribute:

```html
<div font="fs:2rem;fwght:700;c:slate-100;">
  Large, bold, slate-100 color (uses --slate-100 variable)
</div>
```

### 1.4. Pseudo-Classes (`hover { ... }`, `focus { ... }`, etc.)

You can write inline pseudo-classes inside your attribute values:

```html
<button font="c:slate-100;hover { c:white; bgc:blue-700; }">
  Hover me!
</button>
```

**How it works:**  
- The parser looks for `hover { ... }`, `focus { ... }`, `active { ... }`, `disabled { ... }`, `checked { ... }` inside the attribute value.
- The CSS inside the braces is applied only on that pseudo-class.

#### Example: Multiple Pseudo-Classes

```html
<input
  size="w:200px"
  font="c:slate-700;focus { c:blue-700; bw:2px; bc:blue-700; }"
  spacing="p:0.5rem"
  bd="bw:1px;bc:slate-300;bs:solid"
>
```

### 1.5. Nested Selectors (`> child`)

You can target direct children using `> selector { ... }`:

```html
<div cx="r jc aic > span { c:red; fwght:bold; }">
  <span>Red child</span>
  <span>Another red child</span>
</div>
```

### 1.6. Using CSS Variables

If you use a value that matches a CSS variable (e.g., `slate-100`), it will be replaced with `var(--slate-100)` if defined.

```html
<div font="c:slate-100;">Uses var(--slate-100) for color</div>
```

### 1.7. Color Variables: Tailwind-Compatible

Catci uses the **same color variable names as Tailwind CSS**.  
All the familiar colors like `slate-100`, `gray-500`, `blue-700`, etc., are available as CSS variables (e.g., `--slate-100`).

**Example:**

```css
:root {
  --slate-100: #f1f5f9;
  --blue-700: #1d4ed8;
  --red-500: #ef4444;
  /* ...and so on for all Tailwind colors */
}
```

**Use in attributes (no spaces!):**

```html
<div font="c:slate-100;" bg="bgc:blue-700;">
  Text is slate-100, background is blue-700.
</div>
```

### 1.8. Direct Colors

You can use direct color values like `rgba(0,0,0,0.5)` in some cases, but for best compatibility and theming, **prefer the Tailwind variable names**.

---

### ⚠️ About `hover { ... }` and No-JS Compatibility

- The `hover { ... }` and other pseudo-class features in Catci’s attribute-based style system **require JavaScript** to work.  
- **If JavaScript is disabled**, these dynamic hover/focus/active styles **will not be applied**.

#### If you need full no-JS compatibility:

- **Define your hover styles in a regular CSS stylesheet** using standard CSS selectors:

    ```css
    .my-btn:hover {
      background-color: var(--blue-700);
    }
    ```

    ```html
    <button class="my-btn">Button</button>
    ```

- This ensures your hover styles work even if JavaScript is off.

#### Should you worry about no-JS users?

- **For most modern web projects, it’s not necessary to optimize for the small percentage of users with JavaScript disabled.**
- Catci’s engine is designed for rapid development and dynamic theming, which assumes JavaScript is available.
- **Quickload CSS** ensures your site is readable and themed before JS loads, but advanced interactivity (like hover via attributes) is JS-powered.

---

## 2. Quickload CSS: Fallback Styling

### 2.1. Purpose

**Quickload CSS** is a minimal, fast-loading stylesheet that ensures your site is readable and themed before the JavaScript-powered style system takes over. It is especially important for:

- **Fast first paint:** Users see a styled page immediately.
- **No-JS fallback:** The site remains usable and themed if JavaScript is disabled or fails to load.

### 2.2. How to Use

**Include it early in your HTML:**

```html
<link rel="stylesheet" href="quickload.css">
```

### 2.3. Color Formatting and Variable Usage

- **No spaces:**  
  Always write color values in your attributes without spaces.  
  **Correct:** `c:slate-100;`  
  **Incorrect:** `c: slate-100;`

- **Use Catci’s (Tailwind’s) color variables:**  
  When you write `c:slate-100;`, the system will resolve it to `var(--slate-100)`.

- **Limited direct color support:**  
  Quickload CSS supports a few direct color values (like `rgba(0,0,0,0.5)`), but for best compatibility, **always use the provided variables**.

#### Example: Using Colors in Attributes

```html
<!-- Good: Uses Catci variable, no spaces -->
<div font="c:slate-100;bgc:blue-700;">
  Text is slate-100, background is blue-700.
</div>

<!-- Good: Uses a supported rgba value -->
<div font="c:rgba(0,0,0,0.5);">
  Semi-transparent black text.
</div>

<!-- Bad: Spaces in value (may not work in quickload) -->
<div font="c: slate-100;">
  <!-- This may not be styled correctly in quickload mode -->
</div>
```

#### Example: Migrating from Tailwind

If you’re used to Tailwind classes like:

```html
<div class="text-slate-100 bg-blue-700"></div>
```

**In Catci, write:**

```html
<div font="c:slate-100;" bg="bgc:blue-700;"></div>
```

---

## 3. Lang System (`<ext lang="...">`)

### 3.1. Markdown

**Write Markdown directly:**

```html
<ext lang="markdown">
# Welcome

- This is a list
- **Bold** and _italic_
- [Link](https://example.com)
</ext>
```

**Or load from a file:**

```html
<ext lang="markdown" src="about.md"></ext>
```

**Features:**
- Footnotes, definition lists, task lists, emoji (via plugins)
- All links open in a new tab

### 3.2. CSV

**Inline CSV:**

```html
<ext lang="csv">
Name,Score
Alice,10
Bob,8
</ext>
```

**Remote CSV:**

```html
<ext lang="csv" src="scores.csv"></ext>
```

**Renders as:**

| Name  | Score |
|-------|-------|
| Alice | 10    |
| Bob   | 8     |

### 3.3. RSS

**Show an RSS feed:**

```html
<ext lang="rss" src="https://example.com/feed.xml"></ext>
```

- Items are rendered with title, description, author, date, and media if present.
- Updates every 15 seconds.

---

## 4. Tooltip System

### 4.1. Writing Tooltip Configs

**Define in a `<config>` block:**

```html
<config>
  <define feature="tooltip" name="default">
    <style name="tooltip">
      tooltip {
        background: #222;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.9em;
        box-shadow: 0 2px 8px #0003;
        pointer-events: none;
        z-index: 1000;
        position: fixed;
        transition: opacity 0.15s;
      }
    </style>
    <placement mode="follow"></placement>
  </define>
  <define feature="tooltip" name="fancy">
    <style name="tooltip">
      tooltip {
        background: linear-gradient(90deg, #ff8, #f0f);
        color: #222;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 1.1em;
        border: 2px solid #f0f;
      }
    </style>
    <placement mode="above"></placement>
  </define>
</config>
```

- **name:** The config name (use with `tooltip-config="..."`)
- **style:** CSS for the tooltip (use `tooltip { ... }`)
- **placement:** One of `follow`, `above`, `under`, `left`, `right`

### 4.2. Using Tooltips

**Basic:**

```html
<button tooltip="Click to submit">Submit</button>
```

**With a custom config:**

```html
<button tooltip="Fancy!" tooltip-config="fancy">Fancy Tooltip</button>
```

**Using ARIA label:**

```html
<button aria-label="Delete this item" tooltip="{aria}">🗑️</button>
```

### 4.3. Placement Modes

- `follow`: Tooltip follows the mouse
- `above`: Tooltip appears above the element
- `under`: Tooltip appears below
- `left`: Tooltip to the left
- `right`: Tooltip to the right

---

## 5. `<normal-img>` Custom Element

### 5.1. Basic Usage

```html
<normal-img
  color-src="diffuse.jpg"
  normal-src="normal.png"
  style="width:300px;height:300px"
></normal-img>
```

### 5.2. Advanced Attributes

- **light:** Light position, e.g. `1,1,2`
- **intensity:** Normal map intensity, e.g. `0.7`
- **opacity:** Opacity of the shading, e.g. `0.3`
- **light-color:** Light color, e.g. `#fff`
- **roughness:** Material roughness, e.g. `0.8`
- **metalness:** Material metalness, e.g. `0.2`

#### Example: Custom Lighting

```html
<normal-img
  color-src="wood.jpg"
  normal-src="wood-normal.png"
  light="2,2,3"
  intensity="0.5"
  opacity="0.4"
  light-color="#ffe"
  roughness="0.6"
  metalness="0.1"
  style="width:400px;height:200px"
></normal-img>
```

### 5.3. How It Works

- Loads both color and normal map images.
- Uses Three.js to render a plane with a normal-mapped material.
- Lighting and material properties are fully configurable.

---

## 6. Advanced Examples

### 6.1. Complex Attribute Styling

```html
<button
  cx="db"
  font="fs:1.1rem;fwght:600;c:slate-700;hover { c:white; bgc:blue-700; }"
  spacing="p:0.75rem 1.5rem"
  bd="bw:2px;bc:blue-700;bs:solid;hover { bc:blue-800; }"
>
  Stylish Button
</button>
```

### 6.2. Nested Selectors

```html
<div cx="r jc aic > span { c:red; fwght:bold; }">
  <span>Red child</span>
  <span>Another red child</span>
</div>
```

### 6.3. Pseudo-Classes

```html
<input
  font="c:slate-700;focus { c:blue-700; bw:2px; bc:blue-700; }"
  bd="bw:1px;bc:slate-300;bs:solid"
  spacing="p:0.5rem"
>
```

---

## 7. Writing Your Own Configs

### 7.1. Tooltip Config Example

```html
<config>
  <define feature="tooltip" name="mytheme">
    <style name="tooltip">
      tooltip {
        background: #333;
        color: #ff0;
        border-radius: 6px;
        padding: 6px 12px;
        font-family: monospace;
      }
    </style>
    <placement mode="right"></placement>
  </define>
</config>
```

**Use it:**

```html
<span tooltip="Custom tooltip" tooltip-config="mytheme">Hover me</span>
```

---

## 8. Summary Table

| System         | Purpose                                      | Usage Example                |
|----------------|----------------------------------------------|------------------------------|
| Style System   | Utility-first, attribute-driven CSS          | `<div cx="dn"></div>`        |
| Lang System    | Render Markdown, CSV, RSS in `<ext>`         | `<ext lang="markdown">...</ext>` |
| Tooltip        | Configurable tooltips via attributes/config   | `<button tooltip="..."></button>` |
| Normal Image   | 3D-lit images with normal maps               | `<normal-img ...></normal-img>`   |
| Quickload CSS  | Fallback CSS for fast/JS-off theming         | `<link rel="stylesheet" href="quickload.css">` |

---

## 9. Best Practices

- **Always include `quickload.css`** for graceful degradation.
- **Use attribute-based styling** for rapid prototyping and theming.
- **Configure tooltips** in a `<config>` block for consistent UX.
- **Use `<normal-img>`** for interactive, visually rich images.
- **Use Tailwind-compatible color variables** (e.g., `slate-100`, `blue-700`) in your attributes, with no spaces.
- **For critical hover/focus styles that must work without JS, define them in your CSS.**
- **For most projects, you can safely rely on Catci’s JS-powered system.**

---
