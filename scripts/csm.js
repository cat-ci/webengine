function catciRenderer(shorthandMap, booleanMap) {
  let uid = 0
  const baseStyleMap = Object.create(null)
  const blockRuleSet = new Set()
  const ruleList = []

  let styleEl = document.getElementById("catci")
  if (!styleEl) {
    styleEl = document.createElement("style")
    styleEl.id = "catci"
    document.head.appendChild(styleEl)
  }

  const reWhitespace = /\s/
  const reBlock = /^([^{]+)\{([^}]*)\}$/
  const reFlatToken = /[\s;]/

  const reDark = /^dark($|[\s>:\[])/

  function tokenize(cxStr) {
    const tokens = []
    let i = 0,
      N = cxStr.length
    while (i < N) {
      while (i < N && (reWhitespace.test(cxStr[i]) || cxStr[i] === ";")) {
        i++
      }
      if (i >= N) break

      const braceIdx = cxStr.indexOf("{", i)
      if (braceIdx > i && !reFlatToken.test(cxStr.slice(i, braceIdx))) {
        const endBrace = cxStr.indexOf("}", braceIdx + 1)
        if (endBrace === -1) break
        tokens.push(cxStr.slice(i, endBrace + 1).trim())
        i = endBrace + 1
      } else {
        let j = i
        while (j < N && !reFlatToken.test(cxStr[j])) j++
        tokens.push(cxStr.slice(i, j).trim())
        i = j
      }
    }
    return tokens
  }

  function parseDecls(decls, outObj) {
    let i = 0,
      N = decls.length
    while (i < N) {
      let j = decls.indexOf(";", i)
      if (j === -1) j = N
      const d = decls.slice(i, j).trim()
      if (d) {
        const idx = d.indexOf(":")
        if (idx !== -1) {
          const k = d.slice(0, idx).trim()
          const v = d.slice(idx + 1).trim()
          outObj[shorthandMap[k] || k] = v
        } else if (booleanMap[d]) {
          for (const [p, v] of booleanMap[d]) outObj[p] = v
        }
      }
      i = j + 1
    }
  }

  function process() {
    const elements = document.querySelectorAll(
      "[cx]:not([data-cx-processed])"
    )
    if (!elements.length) return
    const newRules = []

    for (const el of elements) {
      const cx = el.getAttribute("cx")
      if (!cx) {
        el.setAttribute("data-cx-processed", "")
        continue
      }

      const tokens = tokenize(cx)
      const flat = []
      const blocks = []
      for (const t of tokens) {
        if (t && t.includes("{") && t.endsWith("}")) blocks.push(t)
        else if (t) flat.push(t)
      }

      const baseObj = Object.create(null)
      for (const tk of flat) {

        if (booleanMap[tk]) {
          for (const [p, v] of booleanMap[tk]) baseObj[p] = v
        } else if (tk.includes(":")) {
          const idx = tk.indexOf(":")
          const k = tk.slice(0, idx).trim()
          const v = tk.slice(idx + 1).trim()
          baseObj[shorthandMap[k] || k] = v
        }
      }

      let baseClass = null
      const baseProps = Object.keys(baseObj)
      if (baseProps.length) {
        baseProps.sort()
        let baseText = ""
        for (let i = 0; i < baseProps.length; i++) {
          const p = baseProps[i]
          baseText += `${p}: ${baseObj[p]};`
        }
        if (baseStyleMap[baseText]) {
          baseClass = baseStyleMap[baseText]
        } else {
          uid++
          baseClass = `catci-${uid}`
          baseStyleMap[baseText] = baseClass
          newRules.push(`.${baseClass} { ${baseText} }`)
        }
        el.classList.add(baseClass)
      } else if (blocks.length) {
        uid++
        baseClass = `catci-${uid}`
        el.classList.add(baseClass)
      }

      for (const blk of blocks) {
        const m = reBlock.exec(blk)
        if (!m || !baseClass) continue
        const selRaw = m[1].trim()
        const declsRaw = m[2].trim()

        const obj = Object.create(null)
        parseDecls(declsRaw, obj)

        const props = Object.keys(obj)
        if (!props.length) continue
        props.sort()
        let blkText = ""
        for (let i = 0; i < props.length; i++) {
          const p = props[i]
          blkText += `${p}: ${obj[p]};`
        }

        let fullSel
        if (reDark.test(selRaw)) {
          const inner = selRaw.length > 4 ? selRaw.slice(4) : ""
          fullSel = `#cess-dm:checked ~ .${baseClass}${inner}`
        } else if (selRaw[0] === ":" || selRaw[0] === ">") {
          fullSel = `.${baseClass}${selRaw}`
        } else {
          fullSel = `.${baseClass} ${selRaw}`
        }

        const ruleKey = `${fullSel}|${blkText}`
        if (!blockRuleSet.has(ruleKey)) {
          blockRuleSet.add(ruleKey)
          newRules.push(`${fullSel} { ${blkText} }`)
        }
      }

      el.setAttribute("data-cx-processed", "")
    }

    if (newRules.length) {
      ruleList.push(...newRules)
      styleEl.textContent = ruleList.join("\n")
    }
  }

  function exportAll() {
    function download(fname, content, type) {
      const blob = new Blob([content], { type })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fname
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
    download("catci.css", styleEl.textContent, "text/css")

    const docType = "<!DOCTYPE html>\n"
    const head = document.head.innerHTML
    const body = document.body.innerHTML
    const html =
      docType +
      "<html>\n<head>\n" +
      head +
      "\n</head>\n<body>\n" +
      body +
      "\n</body>\n</html>"
    download("export.html", html, "text/html")
  }

  function ready(fn) {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", fn, { once: true })
    else fn()
  }
  ready(() => {
    process()
    window.cxexport = exportAll
  })

  return { process, export: exportAll }
}

const shorthandMap = {
  a: "align",
  ai: "align-items",
  ac: "align-content",
  as: "align-self",
  all: "all",
  anim: "animation",
  animD: "animation-delay",
  animDir: "animation-direction",
  animDur: "animation-duration",
  animFill: "animation-fill-mode",
  animIt: "animation-iteration-count",
  animName: "animation-name",
  animPlay: "animation-play-state",
  animTF: "animation-timing-function",
  b: "border",
  bB: "border-bottom",
  bBC: "border-bottom-color",
  bBLR: "border-bottom-left-radius",
  bBRR: "border-bottom-right-radius",
  bBS: "border-bottom-style",
  bBW: "border-bottom-width",
  bC: "border-color",
  bCollapse: "border-collapse",
  bImg: "border-image",
  bImgO: "border-image-outset",
  bImgR: "border-image-repeat",
  bImgS: "border-image-slice",
  bImgSrc: "border-image-source",
  bImgW: "border-image-width",
  bL: "border-left",
  bLC: "border-left-color",
  bLS: "border-left-style",
  bLW: "border-left-width",
  bR: "border-right",
  bRC: "border-right-color",
  bRS: "border-right-style",
  bRW: "border-right-width",
  bRad: "border-radius",
  bS: "border-style",
  bSpacing: "border-spacing",
  bT: "border-top",
  bTC: "border-top-color",
  bTLR: "border-top-left-radius",
  bTRR: "border-top-right-radius",
  bTS: "border-top-style",
  bTW: "border-top-width",
  bW: "border-width",
  bg: "background",
  bgA: "background-attachment",
  bgB: "background-blend-mode",
  bgc: "background-color",
  bgClip: "background-clip",
  bgImg: "background-image",
  bgO: "background-origin",
  bgP: "background-position",
  bgPX: "background-position-x",
  bgPY: "background-position-y",
  bgR: "background-repeat",
  bgS: "background-size",
  bxsh: "box-shadow",
  boxSizing: "box-sizing",
  c: "color",
  cl: "clear",
  clip: "clip",
  clipPath: "clip-path",
  col: "column",
  colC: "column-count",
  colF: "column-fill",
  colG: "column-gap",
  colR: "column-rule",
  colRC: "column-rule-color",
  colRS: "column-rule-style",
  colRW: "column-rule-width",
  colS: "column-span",
  colW: "column-width",
  cont: "content",
  cur: "cursor",
  d: "display",
  dir: "direction",
  e: "empty-cells",
  f: "float",
  fB: "flex-basis",
  fD: "flex-direction",
  fF: "flex-flow",
  fG: "flex-grow",
  fS: "flex-shrink",
  fW: "flex-wrap",
  fs: "font-size",
  ff: "font-family",
  fw: "font-weight",
  fst: "font-style",
  fv: "font-variant",
  fh: "font-height",
  gap: "gap",
  gA: "grid-area",
  gAC: "grid-auto-columns",
  gAF: "grid-auto-flow",
  gAR: "grid-auto-rows",
  gC: "grid-column",
  gCE: "grid-column-end",
  gCS: "grid-column-start",
  gR: "grid-row",
  gRE: "grid-row-end",
  gRS: "grid-row-start",
  gT: "grid-template",
  gTC: "grid-template-columns",
  gTR: "grid-template-rows",
  gTA: "grid-template-areas",
  h: "height",
  lh: "line-height",
  ls: "letter-spacing",
  lsp: "list-style-position",
  lst: "list-style-type",
  lsi: "list-style-image",
  m: "margin",
  mB: "margin-bottom",
  mL: "margin-left",
  mR: "margin-right",
  mT: "margin-top",
  maxH: "max-height",
  maxW: "max-width",
  minH: "min-height",
  minW: "min-width",
  o: "opacity",
  of: "overflow",
  ofX: "overflow-x",
  ofY: "overflow-y",
  oi: "outline",
  oiC: "outline-color",
  oiO: "outline-offset",
  oiS: "outline-style",
  oiW: "outline-width",
  ord: "order",
  orph: "orphans",
  p: "padding",
  pB: "padding-bottom",
  pL: "padding-left",
  pR: "padding-right",
  pT: "padding-top",
  persp: "perspective",
  perspO: "perspective-origin",
  pos: "position",
  q: "quotes",
  r: "right",
  resize: "resize",
  rowG: "row-gap",
  t: "top",
  ta: "text-align",
  td: "text-decoration",
  tdC: "text-decoration-color",
  tdL: "text-decoration-line",
  tdS: "text-decoration-style",
  tf: "text-transform",
  ti: "text-indent",
  txsh: "text-shadow",
  ts: "text-stroke",
  tsC: "text-stroke-color",
  tsW: "text-stroke-width",
  tr: "transform",
  trO: "transform-origin",
  trS: "transform-style",
  trT: "transform",
  tt: "table-layout",
  tr: "transition",
  trD: "transition-delay",
  trDur: "transition-duration",
  trP: "transition-property",
  trTF: "transition-timing-function",
  u: "unicode-bidi",
  vA: "vertical-align",
  v: "visibility",
  w: "width",
  wB: "word-break",
  wS: "white-space",
  wW: "word-wrap",
  z: "z-index",
  accC: "accent-color",
  app: "appearance",
  bf: "backdrop-filter",
  caretC: "caret-color",
  contn: "contain",
  ftr: "filter",
  hyph: "hyphens",
  imgR: "image-rendering",
  iso: "isolation",
  in: "inset",
  inB: "inset-block",
  inBE: "inset-block-end",
  inBS: "inset-block-start",
  inI: "inset-inline",
  inIE: "inset-inline-end",
  inIS: "inset-inline-start",
  objF: "object-fit",
  objP: "object-position",
  osb: "overscroll-behavior",
  osbX: "overscroll-behavior-x",
  osbY: "overscroll-behavior-y",
  pc: "place-content",
  pi: "place-items",
  ps: "place-self",
  pe: "pointer-events",
  sa: "scroll-behavior",
  sm: "scroll-margin",
  smB: "scroll-margin-bottom",
  smL: "scroll-margin-left",
  smR: "scroll-margin-right",
  smT: "scroll-margin-top",
  smBlk: "scroll-margin-block",
  smBlkE: "scroll-margin-block-end",
  smBlkS: "scroll-margin-block-start",
  smInl: "scroll-margin-inline",
  smInlE: "scroll-margin-inline-end",
  smInlS: "scroll-margin-inline-start",
  sp: "scroll-padding",
  spB: "scroll-padding-bottom",
  spL: "scroll-padding-left",
  spR: "scroll-padding-right",
  spT: "scroll-padding-top",
  spBlk: "scroll-padding-block",
  spBlkE: "scroll-padding-block-end",
  spBlkS: "scroll-padding-block-start",
  spInl: "scroll-padding-inline",
  spInlE: "scroll-padding-inline-end",
  spInlS: "scroll-padding-inline-start",
  ssA: "scroll-snap-align",
  ssS: "scroll-snap-stop",
  ssT: "scroll-snap-type",
  shO: "shape-outside",
  shM: "shape-margin",
  shIT: "shape-image-threshold",
  tAL: "text-align-last",
  tJ: "text-justify",
  tO: "text-orientation",
  tOU: "text-overflow",
  tCU: "text-combine-upright",
  tEM: "text-emphasis",
  tEMC: "text-emphasis-color",
  tEMS: "text-emphasis-style",
  tEMP: "text-emphasis-position",
  tJ: "text-justify",
  tm: "touch-action",
  uc: "user-select",
  wM: "writing-mode",
  wc: "will-change",
  tabS: "tab-size",
  mask: "mask",
  maskI: "mask-image",
  maskM: "mask-mode",
  maskP: "mask-position",
  maskR: "mask-repeat",
  maskS: "mask-size",
  maskT: "mask-type",
  brA: "break-after",
  brB: "break-before",
  brI: "break-inside",
  pbA: "page-break-after",
  pbB: "page-break-before",
  pbI: "page-break-inside",
  mbm: "mix-blend-mode",
  foFS: "font-feature-settings",
  foK: "font-kerning",
  foLO: "font-language-override",
  foOS: "font-optical-sizing",
  foSA: "font-size-adjust",
  foST: "font-stretch",
  foSY: "font-synthesis",
  foVA: "font-variant-alternates",
  foVC: "font-variant-caps",
  foVE: "font-variant-east-asian",
  foVL: "font-variant-ligatures",
  foVN: "font-variant-numeric",
  foVP: "font-variant-position",
  foVS: "font-variation-settings",
  bb: "border-block",
  bbC: "border-block-color",
  bbE: "border-block-end",
  bbEC: "border-block-end-color",
  bbES: "border-block-end-style",
  bbEW: "border-block-end-width",
  bbS: "border-block-start",
  bbSC: "border-block-start-color",
  bbSS: "border-block-start-style",
  bbSW: "border-block-start-width",
  bbSt: "border-block-style",
  bbW: "border-block-width",
  bi: "border-inline",
  biC: "border-inline-color",
  biE: "border-inline-end",
  biEC: "border-inline-end-color",
  biES: "border-inline-end-style",
  biEW: "border-inline-end-width",
  biS: "border-inline-start",
  biSC: "border-inline-start-color",
  biSS: "border-inline-start-style",
  biSW: "border-inline-start-width",
  biSt: "border-inline-style",
  biW: "border-inline-width",
  bSSR: "border-start-start-radius",
  bSER: "border-start-end-radius",
  bESR: "border-end-start-radius",
  bEER: "border-end-end-radius"
};

const booleanMap = {
  dn: [["display", "none"]],
  db: [["display", "block"]],
  dib: [["display", "inline-block"]],
  di: [["display", "inline"]],
  flex: [["display", "flex"]],
  iflex: [["display", "inline-flex"]],
  g: [["display", "grid"]],
  ig: [["display", "inline-grid"]],
  abs: [["position", "absolute"]],
  rel: [["position", "relative"]],
  fix: [["position", "fixed"]],
  stc: [["position", "static"]],
  stky: [["position", "sticky"]],
  va: [["visibility", "auto"]],
  vn: [["visibility", "hidden"]],
  oa: [["overflow", "auto"]],
  oh: [["overflow", "hidden"]],
  os: [["overflow", "scroll"]],
  oaX: [["overflow-x", "auto"]],
  ohX: [["overflow-x", "hidden"]],
  oaY: [["overflow-y", "auto"]],
  ohY: [["overflow-y", "hidden"]],
  mn: [["margin", "0"]],
  pn: [["padding", "0"]],
  bn: [["border", "none"]],
  ma: [["margin", "auto"]],
  pa: [["padding", "auto"]],
  bgn: [["background", "none"]],
  bga: [["background", "auto"]],
  wa: [["width", "auto"]],
  ha: [["height", "auto"]],
  wA: [["width", "auto"]],
  hA: [["height", "auto"]],
  ctn: [["content", "none"]],
  cta: [["content", "auto"]],
  tna: [["text-align", "auto"]],
  tnc: [["text-align", "center"]],
  tnl: [["text-align", "left"]],
  tnr: [["text-align", "right"]],
  tnj: [["text-align", "justify"]],
  tdn: [["text-decoration", "none"]],
  tdu: [["text-decoration", "underline"]],
  tdl: [["text-decoration", "line-through"]],
  tdo: [["text-decoration", "overline"]],
  tta: [["text-transform", "uppercase"]],
  ttl: [["text-transform", "lowercase"]],
  ttc: [["text-transform", "capitalize"]],
  ttn: [["text-transform", "none"]],
  fwn: [["font-weight", "normal"]],
  fwb: [["font-weight", "bold"]],
  fsn: [["font-style", "normal"]],
  fsi: [["font-style", "italic"]],
  uan: [["user-select", "none"]],
  uaa: [["user-select", "auto"]],
  pea: [["pointer-events", "auto"]],
  pen: [["pointer-events", "none"]],
  cda: [["cursor", "default"]],
  cdp: [["cursor", "pointer"]],
  cdt: [["cursor", "text"]],
  cdm: [["cursor", "move"]],
  cda: [["cursor", "auto"]],
  bsa: [["box-sizing", "border-box"]],
  bsc: [["box-sizing", "content-box"]],
  wba: [["word-break", "auto"]],
  wbn: [["word-break", "normal"]],
  wbb: [["word-break", "break-all"]],
  wbk: [["word-break", "keep-all"]],
  wsN: [["white-space", "normal"]],
  wsP: [["white-space", "pre"]],
  wsPW: [["white-space", "pre-wrap"]],
  wsPL: [["white-space", "pre-line"]],
  wsNW: [["white-space", "nowrap"]],
  row: [
    ["display", "flex"],
    ["flex-direction", "row"]
  ],
  col: [
    ["display", "flex"],
    ["flex-direction", "column"]
  ],
  irow: [
    ["display", "inline-flex"],
    ["flex-direction", "row"]
  ],
  icol: [
    ["display", "inline-flex"],
    ["flex-direction", "column"]
  ],
  wrap: [["flex-wrap", "wrap"]],
  nowrap: [["flex-wrap", "nowrap"]],
  wrapr: [["flex-wrap", "wrap-reverse"]],
  jcC: [["justify-content", "center"]],
  jcS: [["justify-content", "start"]],
  jcE: [["justify-content", "end"]],
  jcSB: [["justify-content", "space-between"]],
  jcSA: [["justify-content", "space-around"]],
  jcSE: [["justify-content", "space-evenly"]],
  aiC: [["align-items", "center"]],
  aiS: [["align-items", "start"]],
  aiE: [["align-items", "end"]],
  aiB: [["align-items", "baseline"]],
  acC: [["align-content", "center"]],
  acS: [["align-content", "start"]],
  acE: [["align-content", "end"]],
  acSB: [["align-content", "space-between"]],
  acSA: [["align-content", "space-around"]],
  acSE: [["align-content", "space-evenly"]],
  gtcN: [["grid-template-columns", "none"]],
  gtrN: [["grid-template-rows", "none"]],
  gtcA: [["grid-template-columns", "auto"]],
  gtrA: [["grid-template-rows", "auto"]],
  mTn: [["margin-top", "0"]],
  mTa: [["margin-top", "auto"]],
  mBn: [["margin-bottom", "0"]],
  mBa: [["margin-bottom", "auto"]],
  mLn: [["margin-left", "0"]],
  mLa: [["margin-left", "auto"]],
  mRn: [["margin-right", "0"]],
  mRa: [["margin-right", "auto"]],
  pTn: [["padding-top", "0"]],
  pTa: [["padding-top", "auto"]],
  pBn: [["padding-bottom", "0"]],
  pBa: [["padding-bottom", "auto"]],
  pLn: [["padding-left", "0"]],
  pLa: [["padding-left", "auto"]],
  pRn: [["padding-right", "0"]],
  pRa: [["padding-right", "auto"]],
  bTn: [["border-top", "none"]],
  bTa: [["border-top", "auto"]],
  bBn: [["border-bottom", "none"]],
  bBa: [["border-bottom", "auto"]],
  bLn: [["border-left", "none"]],
  bLa: [["border-left", "auto"]],
  bRn: [["border-right", "none"]],
  bRa: [["border-right", "auto"]],
  bTLRn: [["border-top-left-radius", "0"]],
  bTRRn: [["border-top-right-radius", "0"]],
  bBLRn: [["border-bottom-left-radius", "0"]],
  bBRRn: [["border-bottom-right-radius", "0"]]
};

const catci = catciRenderer(shorthandMap, booleanMap)

catci.process()

