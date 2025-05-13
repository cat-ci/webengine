function catciColorManager() {

    const base500 = {
        slate: [100, 116, 139],
        gray: [107, 114, 128],
        zinc: [113, 113, 122],
        neutral: [115, 115, 115],
        stone: [120, 113, 108],
        red: [239, 68, 68],
        orange: [249, 115, 22],
        amber: [245, 158, 11],
        yellow: [234, 179, 8],
        lime: [132, 204, 22],
        green: [34, 197, 94],
        emerald: [16, 185, 129],
        teal: [20, 184, 166],
        cyan: [6, 182, 212],
        sky: [14, 165, 233],
        blue: [59, 130, 246],
        indigo: [99, 102, 241],
        violet: [139, 92, 246],
        purple: [168, 85, 247],
        fuchsia: [217, 70, 239],
        pink: [236, 72, 153],
        rose: [244, 63, 94],
    };

    const shadeMultipliers = {
        50: 2.48,
        100: 2.41,
        200: 2.26,
        300: 2.03,
        400: 1.48,
        500: 1,
        600: 0.71,
        700: 0.51,
        800: 0.3,
        900: 0.15,
        950: 0.02,
    };

    const modifiers = [
        {
            flag: "o",
            css: "opacity",
            apply: (state, value) => {
                if (!isNaN(value)) state.alpha = value;
            },
        },
        {
            flag: "b",
            css: "brightness",
            apply: (state, value) => {
                if (!isNaN(value))
                    state.rgb = state.rgb.map((c) =>
                        Math.max(0, Math.min(255, Math.round(c * value)))
                    );
            },
        },
        {
            flag: "h",
            css: "hue-rotate",
            apply: (state, value) => {
                if (!isNaN(value))
                    state.filters.push(`hue-rotate(${value}deg)`);
            },
        },
        {
            flag: "s",
            css: "saturate",
            apply: (state, value) => {
                if (!isNaN(value)) {
                    state.filters.push(`saturate(${value})`);
                }
            },
        },
        {
            flag: "c",
            css: "contrast",
            apply: (state, value) => {
                if (!isNaN(value)) {
                    state.filters.push(`contrast(${value})`);
                }
            },
        },
        {
            flag: "g",
            css: "grayscale",
            apply: (state, value) => {
                if (!isNaN(value)) {
                    state.filters.push(`grayscale(${value})`);
                }
            },
        },
        {
            flag: "i",
            css: "invert",
            apply: (state, value) => {
                if (!isNaN(value)) {
                    state.filters.push(`invert(${value})`);
                }
            },
        },
        {
            flag: "p",
            css: "sepia",
            apply: (state, value) => {
                if (!isNaN(value)) {
                    state.filters.push(`sepia(${value})`);
                }
            },
        }

    ];
    const modifierMap = Object.fromEntries(
        modifiers.map((m) => [m.flag, m])
    );

    const globalVariables = {};

    const clamp = (val) => Math.max(0, Math.min(255, Math.round(val)));

    function getShade(color, shade) {
        const base = base500[color];
        const multiplier = shadeMultipliers[shade];
        if (!base) throw new Error(`Unknown color: ${color}`);
        if (!multiplier) throw new Error(`Unknown shade: ${shade}`);
        return base.map((c) => clamp(c * multiplier));
    }

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, "");
        if (hex.length === 3) hex = hex.split("").map((x) => x + x).join("");
        if (hex.length !== 6) throw new Error("Invalid hex color");
        return [
            parseInt(hex.slice(0, 2), 16),
            parseInt(hex.slice(2, 4), 16),
            parseInt(hex.slice(4, 6), 16),
        ];
    }

    function parseColorString(str, localVars = {}) {

        const regex =
            /^(?<base>([a-zA-Z][\w-]*|\#[0-9a-fA-F]{3,6}))(?:(?:-(?<shade>\d{2,3})))?(?<mods>(?:-[a-z][^-\s]+)*)$/;
        const match = str.match(regex);
        if (!match) throw new Error(`Invalid color string: ${str}`);
        let { base, shade, mods } = match.groups;

        if (localVars[base]) {
            let varStr = localVars[base];
            if (shade) varStr += `-${shade}`;
            if (mods) varStr += mods;
            if (varStr === str) throw new Error("Recursive variable reference");
            return parseColorString(varStr, localVars);
        }
        if (base.startsWith("g-") && globalVariables[base.slice(2)]) {
            let varStr = globalVariables[base.slice(2)];
            if (shade) varStr += `-${shade}`;
            if (mods) varStr += mods;
            if (varStr === str) throw new Error("Recursive variable reference");
            return parseColorString(varStr, localVars);
        }

        let rgb;
        if (base.startsWith("#")) {
            rgb = hexToRgb(base);
            if (shade) rgb = rgb.map((c) => clamp(c * (shadeMultipliers[shade] || 1)));
        } else if (base500[base]) {
            rgb = getShade(base, shade || "500");
        } else {

            const colorShadeMatch = base.match(/^([a-zA-Z]+)-(\d{2,3})$/);
            if (colorShadeMatch) {
                rgb = getShade(colorShadeMatch[1], colorShadeMatch[2]);
            } else {
                throw new Error(`Unknown color: ${base}`);
            }
        }

        const state = { rgb, alpha: null, filters: [] };
        if (mods) {
            const modRegex = /-([a-z])(\d*\.?\d+)/g;
            let modMatch;
            while ((modMatch = modRegex.exec(mods)) !== null) {
                const flag = modMatch[1];
                const value = parseFloat(modMatch[2]);
                const modifier = modifierMap[flag];
                if (modifier && !isNaN(value)) modifier.apply(state, value);
            }
        }

        let colorString =
            state.alpha !== null
                ? `rgba(${state.rgb.join(", ")}, ${state.alpha})`
                : `rgb(${state.rgb.join(", ")})`;
        if (state.filters.length)
            colorString += `; filter: ${state.filters.join(" ")};`;
        return colorString;
    }

    function parseGradientString(gradientStr) {
        const stops = gradientStr.split(",").map((s) => s.trim());
        const localVars = {};

        for (const stop of stops) {
            let m = stop.match(/^g-([a-zA-Z][\w-]*)=(.+)$/);
            if (m) {
                globalVariables[m[1]] = m[2];
                continue;
            }
            m = stop.match(/^([a-zA-Z][\w-]*)=(.+)$/);
            if (m) localVars[m[1]] = m[2];
        }

        return stops
            .filter((stop) => !stop.includes("="))
            .map((stop) => {
                try {
                    return parseColorString(stop, localVars);
                } catch (e) {
                    return ``;
                }
            });
    }

    return {
        parseColorString,
        parseGradientString,
        setGlobalVariable: (name, value) => (globalVariables[name] = value),
        getGlobalVariable: (name) => globalVariables[name],
        clearGlobalVariables: () => Object.keys(globalVariables).forEach((k) => delete globalVariables[k]),
        modifiers,
        globalVariables,
    };
}

const ccm = catciColorManager();
function applyColors(ccm) {
    const ccmColorRegex =
        /^([a-zA-Z][\w-]*|\#[0-9a-fA-F]{3,6})(?:-\d{2,3})?(?:-[a-z][^-\s]+)*$/;

    function isStandardCSSColor(val) {
        val = val.trim().toLowerCase();
        if (
            val.startsWith("var(") ||
            val.startsWith("rgb(") ||
            val.startsWith("rgba(") ||
            val.startsWith("hsl(") ||
            val.startsWith("hsla(") ||
            /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(val)
        ) {
            return true;
        }
        const d = document.createElement("div");
        d.style.color = "";
        d.style.color = val;
        return !!d.style.color;
    }

    const colorProps = [
        "color", "background-color", "border-color",
        "border-top-color", "border-right-color",
        "border-bottom-color", "border-left-color",
        "outline-color", "text-decoration-color",
        "column-rule-color", "box-shadow", "text-shadow"
    ];

    const shorthandMap = { c: "color", bgc: "background-color" };
    const pseudoMap = {
        hover: ":hover",
        active: ":active",
        focus: ":focus",
        visited: ":visited",
        checked: ":checked",
        disabled: ":disabled"
    };

    function parseCCMDeclarations(declText) {
        let res = [];
        for (let prop of colorProps) {
            let rx = new RegExp(
                `(?<!-)${prop.replace(/-/g, "\\-")}\\s*:\\s*([^;]+);`,
                "gi"
            );
            let m;
            while ((m = rx.exec(declText))) {
                let raw = m[1].trim();
                if (!isStandardCSSColor(raw) && ccmColorRegex.test(raw)) {
                    res.push({ prop, raw });
                }
            }
        }
        return res;
    }

    function ensureSheet() {
        let tag = document.getElementById("catciColors");
        if (!tag) {
            tag = document.createElement("style");
            tag.id = "catciColors";
            document.head.appendChild(tag);
        }
        tag.textContent = "";
        return tag.sheet;
    }

    function processAll() {
        const sheet = ensureSheet();
        let cxCount = 0;

        document.querySelectorAll("style").forEach(styleTag => {
            const blockRegex = /([^{]+)\{([^}]+)\}/g;
            let match;
            while ((match = blockRegex.exec(styleTag.textContent))) {
                const selector = match[1].trim();
                const decls = parseCCMDeclarations(match[2]);
                if (!decls.length) continue;
                const body = decls
                    .map(d => `${d.prop}: ${ccm.parseColorString(d.raw)};`)
                    .join(" ");
                try {
                    sheet.insertRule(`${selector} { ${body} }`, sheet.cssRules.length);
                } catch { }
            }
        });

        document.querySelectorAll("[cx]").forEach(el => {
            const rawCx = el.getAttribute("cx") || "";

            const blockRegex = /([a-zA-Z][\w-:]+)\s*\{([^}]+)\}/g;
            let blocks = [], m;
            while ((m = blockRegex.exec(rawCx))) {
                blocks.push({ name: m[1].toLowerCase(), inner: m[2] });
            }

            const leftover = rawCx.replace(blockRegex, "");
            const simpleParts = leftover
                .split(";")
                .map(s => s.trim())
                .filter(Boolean);

            let actions = [];

            for (let { name, inner } of blocks) {
                const decls = parseCCMDeclarations(inner);
                if (!decls.length) continue;

                const parts = name.split(":");
                if (parts[0] === "dark" && parts[1] && pseudoMap[parts[1]]) {
                    actions.push({ type: "dark-pseudo", pseudo: parts[1], decls });
                } else if (name === "dark") {
                    actions.push({ type: "dark", decls });
                } else if (pseudoMap[name]) {
                    actions.push({ type: "pseudo", pseudo: name, decls });
                }
            }

            for (let part of simpleParts) {
                let sm = part.match(/^([a-zA-Z]+)\s*:\s*([^;]+)$/);
                if (!sm) continue;
                const short = sm[1].toLowerCase(), raw = sm[2].trim();
                const prop = shorthandMap[short];
                if (!prop) continue;
                if (isStandardCSSColor(raw) || !ccmColorRegex.test(raw)) continue;
                actions.push({ type: "shorthand", prop, raw });
            }

            if (!actions.length) return;

            const cls = `catci-cx-${++cxCount}`;
            el.classList.add(cls);

            for (let act of actions) {
                if (act.type === "shorthand") {
                    const real = ccm.parseColorString(act.raw);
                    sheet.insertRule(
                        `.${cls} { ${act.prop}: ${real}; }`,
                        sheet.cssRules.length
                    );
                } else if (act.type === "dark") {
                    const body = act.decls
                        .map(d => `${d.prop}: ${ccm.parseColorString(d.raw)};`)
                        .join(" ");
                    sheet.insertRule(
                        `#cess-dm:checked ~ .${cls} { ${body} }`,
                        sheet.cssRules.length
                    );
                } else if (act.type === "pseudo") {
                    const body = act.decls
                        .map(d => `${d.prop}: ${ccm.parseColorString(d.raw)};`)
                        .join(" ");
                    sheet.insertRule(
                        `.${cls}${pseudoMap[act.pseudo]} { ${body} }`,
                        sheet.cssRules.length
                    );
                } else if (act.type === "dark-pseudo") {
                    const body = act.decls
                        .map(d => `${d.prop}: ${ccm.parseColorString(d.raw)};`)
                        .join(" ");
                    sheet.insertRule(
                        `#cess-dm:checked ~ .${cls}${pseudoMap[act.pseudo]} { ${body} }`,
                        sheet.cssRules.length
                    );
                }
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", processAll);
    } else {
        processAll();
    }
}

applyColors(ccm);
