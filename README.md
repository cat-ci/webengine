# CWE (Catcis' Web Engine)

## Contents

- [CSM: CSS Manager](#csm-css-manager)
- [CCM: Color Manager](#ccm-color-manager)
- [CFM: Font Manager](#cfm-font-manager)
- [CTM: Text Effect Manager](#ctm-text-effect-manager)
- [Usage](#usage)

---

## Usage

All managers use the `cx` attribute.

**Example:**

```html
<div
  cx="p:20px; bg:sky-50-o0.8; c:black; ff:g(Roboto);
      dark:hover{bg:slate-800; c:white;}
      text-effect{glitch speed:30; reveal:1000; trigger:scrollin;}"
>
  Hello, World!
</div>
```

---

## CSM: CSS Manager

CSM uses the `cx` attribute and *containers* to manage CSS, including shorthands and full CSS properties.

- For all shorthands, see the [shorthand list](/shorthands.txt).
- If you forget a shorthand, you can always use the full CSS property.

### Containers

Containers affect pseudo-classes and states:

| Container      | Description                                 |
|----------------|---------------------------------------------|
| `dark{}`       | Applies in dark mode                        |
| `hover{}`      | Applies on hover                            |
| `active{}`     | Applies when active                         |
| `focus{}`      | Applies when focused                        |
| `dark:hover{}` | Applies in dark mode on hover               |

**Example:**

```html
<div
  cx="p:20px; bg:sky-50-o0.8; c:black; ff:g(Roboto);
      dark:hover{bg:slate-800; c:white;}
      text-effect{glitch speed:30; reveal:1000; trigger:scrollin;}"
>
  Example
</div>
```

---

## CCM: Color Manager

CCM allows you to manage colors easily with advanced attributes.

### Supported Colors

- slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

### Attributes

You can apply tone, opacity, saturation, brightness, hue, and contrast:

| Attribute   | Syntax         | Example             |
|-------------|----------------|---------------------|
| Tone        | `-{tone}`      | `sky-500`           |
| Opacity     | `-o{opacity}`  | `sky-500-o0.5`      |
| Saturation  | `-s{saturation}`| `sky-500-s80`      |
| Brightness  | `-b{brightness}`| `sky-500-b120`     |
| Hue         | `-h{hue}`      | `sky-500-h180`      |
| Contrast    | `-c{contrast}` | `sky-500-c20`       |

**Example:**

```css
color: sky-500-o0.5-c20;
```

---

## CFM: Font Manager

CFM makes font management easy. It automatically declares fonts and Google links.

### Attributes

- `url()` — Link from a path or URL
- `g()` — Link from Google Fonts

**Example:**

```css
font-family: url(fonts/roboto.ttf) g(Roboto);
```

---

## CTM: Text Effect Manager

CTM lets you easily manage and animate text effects on your web elements.

### Types

- **glitch**: Animated glitch effect (uses baffle.js)
- **typein**: Typewriter effect, revealing text one character at a time
- **cursor**: Shows a blinking cursor after the text
- **typeswitch**: Cycles through multiple texts with typewriter and delete effects

### Options

| Option      | Type      | Default   | Description                                                                 |
|-------------|-----------|-----------|-----------------------------------------------------------------------------|
| `type`      | String    | "glitch"  | Animation type: "glitch", "typein", "cursor", "typeswitch"                  |
| `speed`     | Number    | 20        | Animation speed (ms per step/char)                                          |
| `char`      | String    | "|"       | Cursor character (for "cursor" type)                                        |
| `reveal`    | Number    | 1200      | Reveal duration (ms, for "glitch" type)                                     |
| `trigger`   | String    | "load"    | When to trigger: "load", "scrollin", "click", "hover", "focus", "manual"    |
| `pause`     | Number    | 700       | Pause after typing (ms, for "typeswitch")                                   |
| `delpause`  | Number    | 400       | Pause before deleting (ms, for "typeswitch")                                |
| `once`      | Boolean   | false     | Only animate once (for "typeswitch")                                        |
| `infinite`  | Boolean   | false     | Loop animation infinitely (for "typeswitch")                                |
| `random`    | Boolean   | false     | Randomize text order (for "typeswitch")                                     |

#### For `typeswitch`  
Add numbered keys (`"0"`, `"1"`, ...) to the options object for each text to cycle.

---

### Triggers

- **load**: On page load (default)
- **scrollin**: When element enters viewport
- **click**: On click
- **hover**: On mouse hover (repeats every hover)
- **focus**: On focus
- **manual**: Only when `.runTextAnimation()` is called

---

### Usage

```html
<div
  cx="text-effect{glitch speed:30; reveal:1000; trigger:scrollin;}"
>
  Hello, World!
</div>
```

---

### Methods

- **element.runTextAnimation()**  
  Manually trigger the animation (useful with `trigger: "manual"`).
