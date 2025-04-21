# Catci's Web Engine

## Introduction
Catci's Web Engine is a lightweight set of tools that allow you to create a website with ease.

---

## Features
- Multi markup language support straight into your HTML (RSS, Markdown, CSV etc.)
- Extended tailwind like CSS
- Inline JSON extraction from path
- Font Awsome icons support
- Element cloning, positioning (within DOM), and more
- Boolean styling support
- Normal mapped images support (Via THREE.js)
- Automatic semantic reformatting
- Better tooltips
- Better audio player
- Lowend attributes definition (Automatically detects if a users computer is lowend or struggling)
- Theme attributes definition (Automatic to users browser preference light/dark mode)
- Prebuilt animations
- Prebuilt Common Javascript functions
- Automatic sitemap.xml generation (if not present -- based on your HTML anchors)
- Automatic interpretation for other browsers (e.g. Safari, Firefox, Chrome, Edge, Opera) changing styling to work on all browsers

---

## Usage

### Multi markup language support, use the EXT(External) tag:
```
<ext lang="markdown" src="/README.md">
```
### Json extraction:
```
<div cx="json:first('name') from(https://example.com/example.json) push(self, content) fallback('No name found');"></div> <- Will extract the first name from the json and push it to the content of the div

<ul cx="json:all('name') from(https://example.com/example.json) push(child, content) fallback('No names available');"></ul> <- Will extract all names from the json and push them as children to the ul

<div cx="json:filter({role: 'admin'}) from(https://example.com/users.json) push(.admin-list, content) fallback('No admins found');"></div> <- Will extract all users with the role of admin and push them to the content of .admin-list

<img cx="json:map('image_url') from(https://example.com/products.json) push(self, src) fallback('default.jpg');" /> <- Will extract the image_url from the json and push it to the src of the img

<div cx="json:first('title') from(https://example.com/blog.json) push(self, content) error('Failed to load blog title');"></div> <- Handle errors

<div cx="json:$.store.book[0].title from(https://example.com/example.json) push(self, content) fallback('No title available');"></div> <- Use an actual JSON path
```

### Font Awsome icons support:
```
<icon name="cat" weight="regular"></icon> <- if not specified, defaults to solid
```

### Element cloning, positioning (within DOM), and more:
```
<div cx="clone:all(.element);"></div> <- Will clone the first element with the class of element cloning the content, styling, and CWE attributes to itself

<div cx="clone:style(#element);"></div> <- Will clone the element with the id element cloning the styling to itself 

<div cx="clone:content([type="search"] ~ 3);"> <- Will clone the third element with the type of search cloning the content to itself
```

### Normal mapped images support:
```
<normal height-src="/normal.png" color-src="/texture.png"></normal>
```

### Lowend attributes definition:
```
<div cx="animation:spin; copy-on-click(self) lowend{animation:none; block(javascript)};"></div> 
```

### Theme attributes definition:
```
<div cx="theme:light{background-color: #fff; color: #000;} dark{background-color: #000; color: #fff;};"></div>
```
---


#### 1. Layout: Padding & Margin
| Shortcut                         | Usage           | Result                      |
|----------------------------------|-----------------|-----------------------------|
| np, padding-0                    | —               | padding: 0;                 |
| ap, padding-auto                 | —               | padding: auto;              |
| p-{size}, padding-{size}         | size (e.g. 8px) | padding: {size};            |
| pt, padding-top-0                | —               | padding-top: 0;             |
| pt-{size}, padding-top-{size}    | size            | padding-top: {size};        |
| pr, padding-right-0              | —               | padding-right: 0;           |
| pr-{size}, padding-right-{size}  | size            | padding-right: {size};      |
| pb, padding-bottom-0             | —               | padding-bottom: 0;          |
| pb-{size}, padding-bottom-{size} | size            | padding-bottom: {size};     |
| pl, padding-left-0               | —               | padding-left: 0;            |
| pl-{size}, padding-left-{size}   | size            | padding-left: {size};       |
| px-{size}, padding-x-{size}      | size            | padding-left/right: {size}; |
| py-{size}, padding-y-{size}      | size            | padding-top/bottom: {size}; |
| nm, margin-0                     | —               | margin: 0;                  |
| am, margin-auto                  | —               | margin: auto;               |
| m-{size}, margin-{size}          | size            | margin: {size};             |
| mt, margin-top-0                 | —               | margin-top: 0;              |
| mt-{size}, margin-top-{size}     | size            | margin-top: {size};         |
| mr, margin-right-0               | —               | margin-right: 0;            |
| mr-{size}, margin-right-{size}   | size            | margin-right: {size};       |
| mb, margin-bottom-0              | —               | margin-bottom: 0;           |
| mb-{size}, margin-bottom-{size}  | size            | margin-bottom: {size};      |
| ml, margin-left-0                | —               | margin-left: 0;             |
| ml-{size}, margin-left-{size}    | size            | margin-left: {size};        |
| mx-{size}, margin-x-{size}       | size            | margin-left/right: {size};  |
| my-{size}, margin-y-{size}       | size            | margin-top/bottom: {size};  |
| w-{size}, width-{size}           | size            | width: {size};              |
| h-{size}, height-{size}          | size            | height: {size};             |
| min-w-{size}, min-width-{size}   | size            | min-width: {size};          |
| max-w-{size}, max-width-{size}   | size            | max-width: {size};          |
| min-h-{size}, min-height-{size}  | size            | min-height: {size};         |
| max-h-{size}, max-height-{size}  | size            | max-height: {size};         |
| z-{index}, z-index-{index}       | integer         | z-index: {index};           |

#### 2. Display & Box Model
| Shortcut                      | Usage | Result                   |
|-------------------------------|-------|--------------------------|
| dn, display-none              | —     | display: none;           |
| db, display-block             | —     | display: block;          |
| di, display-inline            | —     | display: inline;         |
| dib, display-inline-block     | —     | display: inline-block;   |
| dg, display-grid              | —     | display: grid;           |
| dig, display-inline-grid      | —     | display: inline-grid;    |
| dt, display-table             | —     | display: table;          |
| dtr, display-table-row        | —     | display: table-row;      |
| dtc, display-table-cell       | —     | display: table-cell;     |
| bs-bb, box-sizing-border-box  | —     | box-sizing: border-box;  |
| bs-cb, box-sizing-content-box | —     | box-sizing: content-box; |

#### 3. Flexbox & Alignment
| Shortcut                          | Usage | Result                                         |
|-----------------------------------|-------|------------------------------------------------|
| r, flex-row                       | —     | display:flex;<br>flex-direction:row;           |
| c, flex-column                    | —     | display:flex;<br>flex-direction:column;        |
| ir, inline-flex-row               | —     | display:inline-flex;<br>flex-direction:row;    |
| ic, inline-flex-column            | —     | display:inline-flex;<br>flex-direction:column; |
| js, justify-start                 | —     | justify-content:flex-start;                    |
| je, justify-end                   | —     | justify-content:flex-end;                      |
| jc, justify-center                | —     | justify-content:center;                        |
| jsb, justify-space-between        | —     | justify-content:space-between;                 |
| jsa, justify-space-around         | —     | justify-content:space-around;                  |
| jse, justify-space-evenly         | —     | justify-content:space-evenly;                  |
| ais, align-items-stretch          | —     | align-items:stretch;                           |
| aie, align-items-end              | —     | align-items:flex-end;                          |
| aic, align-items-center           | —     | align-items:center;                            |
| aib, align-items-baseline         | —     | align-items:baseline;                          |
| acfs, align-content-start         | —     | align-content:flex-start;                      |
| ace, align-content-end            | —     | align-content:flex-end;                        |
| acc, align-content-center         | —     | align-content:center;                          |
| acsb, align-content-space-between | —     | align-content:space-between;                   |
| acsa, align-content-space-around  | —     | align-content:space-around;                    |
| acse, align-content-space-evenly  | —     | align-content:space-evenly;                    |
| asfs, align-self-start            | —     | align-self:flex-start;                         |
| asfe, align-self-end              | —     | align-self:flex-end;                           |
| asc, align-self-center            | —     | align-self:center;                             |
| asb, align-self-baseline          | —     | align-self:baseline;                           |
| ass, align-self-stretch           | —     | align-self:stretch;                            |
| fnw, flex-nowrap                  | —     | flex-wrap:nowrap;                              |
| fw, flex-wrap                     | —     | flex-wrap:wrap;                                |
| fwr, flex-wrap-reverse            | —     | flex-wrap:wrap-reverse;                        |

#### 4. Position & Float
| Shortcut               | Usage | Result             |
|------------------------|-------|--------------------|
| rel, position-relative | —     | position:relative; |
| abs, position-absolute | —     | position:absolute; |
| fix, position-fixed    | —     | position:fixed;    |
| stk, position-sticky   | —     | position:sticky;   |
| fl, float-left         | —     | float:left;        |
| fr, float-right        | —     | float:right;       |
| fn, float-none         | —     | float:none;        |
| cl, clear-left         | —     | clear:left;        |
| cr, clear-right        | —     | clear:right;       |
| cb, clear-both         | —     | clear:both;        |

#### 5. Overflow & Resize
| Shortcut                     | Usage | Result            |
|------------------------------|-------|-------------------|
| oh, overflow-hidden          | —     | overflow:hidden;  |
| oa, overflow-auto            | —     | overflow:auto;    |
| os, overflow-scroll          | —     | overflow:scroll;  |
| ov, overflow-visible         | —     | overflow:visible; |
| ocl, overflow-clip           | —     | overflow:clip;    |
| ov-{value}, overflow-{value} | value | overflow:{value}; |
| resize, resize-both          | —     | resize:both;      |
| resize-n, resize-none        | —     | resize:none;      |

#### 6. Visibility & Contenteditable
| Shortcut                        | Usage      | Result                   |
|---------------------------------|------------|--------------------------|
| vs, visibility-visible          | —          | visibility:visible;      |
| vh, visibility-hidden           | —          | visibility:hidden;       |
| vc, visibility-collapse         | —          | visibility:collapse;     |
| ce, contenteditable-true        | —          | contenteditable:true;    |
| ce-n, contenteditable-false     | —          | contenteditable:false;   |
| ce-{value}, contenteditable-{v} | true/false | contenteditable:{value}; |

#### 7. Text & Typography
| Shortcut                            | Usage         | Result                                                             |
|-------------------------------------|---------------|--------------------------------------------------------------------|
| tw, text-wrap                       | —             | overflow-wrap:break-word;<br>word-break:break-word;                |
| to-e, text-overflow-ellipsis        | —             | text-overflow:ellipsis;<br>overflow:hidden;<br>white-space:nowrap; |
| tu, text-transform-uppercase        | —             | text-transform:uppercase;                                          |
| tl, text-transform-lowercase        | —             | text-transform:lowercase;                                          |
| tc, text-transform-capitalize       | —             | text-transform:capitalize;                                         |
| ta-left, text-align-left            | —             | text-align:left;                                                   |
| ta-center, text-align-center        | —             | text-align:center;                                                 |
| ta-right, text-align-right          | —             | text-align:right;                                                  |
| ta-justify, text-align-justify      | —             | text-align:justify;                                                |
| td-u, text-decoration-underline     | —             | text-decoration:underline;                                         |
| td-lt, text-decoration-line-through | —             | text-decoration:line-through;                                      |
| td-n, text-decoration-none          | —             | text-decoration:none;                                              |
| ws-nw, white-space-nowrap           | —             | white-space:nowrap;                                                |
| ws-n, white-space-normal            | —             | white-space:normal;                                                |
| ws-pre, white-space-pre             | —             | white-space:pre;                                                   |
| ws-pw, white-space-pre-wrap         | —             | white-space:pre-wrap;                                              |
| ws-pl, white-space-pre-line         | —             | white-space:pre-line;                                              |
| c-{color}, color-{color}            | color         | color:{color};                                                     |
| fs-{size}, font-size-{size}         | size          | font-size:{size};                                                  |
| ff-{family}, font-family-{family}   | family        | font-family:{family};                                              |
| lh-{value}, line-height-{value}     | number/length | line-height:{value};                                               |
| ti-{size}, text-indent-{size}       | size          | text-indent:{size};                                                |
| b, font-weight-bold                 | —             | font-weight:bold;                                                  |
| i, font-style-italic                | —             | font-style:italic;                                                 |

#### 8. Backgrounds
| Shortcut                           | Usage            | Result                       |
|------------------------------------|------------------|------------------------------|
| bg-none, background-none           | —                | background:none;             |
| bg-init, background-initial        | —                | background:initial;          |
| bg-{v}, background-{v}             | any bg shorthand | background:{v};              |
| bgc-{color}, background-color-{c}  | color            | background-color:{color};    |
| bgi-{url}, background-image-{u}    | URL (no quotes)  | background-image:url({url}); |
| bgp-{pos}, background-position-{p} | position         | background-position:{pos};   |
| bgs-{size}, background-size-{s}    | size             | background-size:{size};      |
| bgr-{r}, background-repeat-{r}     | repeat value     | background-repeat:{r};       |

#### 9. Border & Outline
| Shortcut                       | Usage       | Result                  |
|--------------------------------|-------------|-------------------------|
| b-none, border-none            | —           | border:none;            |
| b-init, border-initial         | —           | border:initial;         |
| br-{radius}, border-radius-{r} | radius      | border-radius:{radius}; |
| bw-{w}, border-width-{w}       | width       | border-width:{w};       |
| bc-{color}, border-color-{c}   | color       | border-color:{color};   |
| bs-{style}, border-style-{s}   | style       | border-style:{style};   |
| o-none, outline-none           | —           | outline:none;           |
| o-init, outline-initial        | —           | outline:initial;        |
| o-{value}, outline-{value}     | any outline | outline:{value};        |

#### 10. Miscellaneous
| Shortcut                   | Usage      | Result               |
|----------------------------|------------|----------------------|
| cur-p, cursor-pointer      | —          | cursor:pointer;      |
| cur-d, cursor-default      | —          | cursor:default;      |
| cur-na, cursor-not-allowed | —          | cursor:not-allowed;  |
| cur-{v}, cursor-{v}        | any cursor | cursor:{v};          |
| op-0, opacity-0            | —          | opacity:0;           |
| op-1, opacity-1            | —          | opacity:1;           |
| op-{v}, opacity-{v}        | 0–1 or %   | opacity:{v};         |
| ls-n, list-style-none      | —          | list-style:none;     |
| ls-i, list-style-initial   | —          | list-style:initial;  |
| ls-{v}, list-style-{v}     | any value  | list-style:{v};      |
| us-n, user-select-none     | —          | user-select:none;    |
| us-a, user-select-auto     | —          | user-select:auto;    |
| us-t, user-select-text     | —          | user-select:text;    |
| us-all, user-select-all    | —          | user-select:all;     |
| us-{v}, user-select-{v}    | any value  | user-select:{v};     |
| pe-n, pointer-events-none  | —          | pointer-events:none; |
| pe-a, pointer-events-auto  | —          | pointer-events:auto; |
| pe-{v}, pointer-events-{v} | any value  | pointer-events:{v};  |
