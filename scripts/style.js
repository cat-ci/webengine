document.addEventListener("DOMContentLoaded", () => {
    function e() {
        let e = new Set,
            t = getComputedStyle(document.documentElement);
        for (let i = 0; i < t.length; i++) {
            let o = t[i];
            o.startsWith("--") && e.add(o.slice(2))
        }
        for (let l of document.styleSheets) {
            let n;
            try {
                n = l.cssRules
            } catch (r) {
                continue
            }
            for (let a of n)
                if (a.selectorText && a.selectorText.toLowerCase().split(",").some(e => ":root" === e.trim()))
                    for (let s = 0; s < a.style.length; s++) {
                        let c = a.style[s];
                        c.startsWith("--") && e.add(c.slice(2))
                    }
        }
        return e
    }
    let t = e(),
        i = {
            p: "padding",
            pt: "paddingTop",
            pr: "paddingRight",
            pb: "paddingBottom",
            pl: "paddingLeft",
            px: ["paddingLeft", "paddingRight"],
            py: ["paddingTop", "paddingBottom"],
            m: "margin",
            mt: "marginTop",
            mr: "marginRight",
            mb: "marginBottom",
            ml: "marginLeft",
            mx: ["marginLeft", "marginRight"],
            my: ["marginTop", "marginBottom"],
            w: "width",
            h: "height",
            minW: "minWidth",
            maxW: "maxWidth",
            minH: "minHeight",
            maxH: "maxHeight",
            boxS: "boxSizing",
            z: "zIndex",
            pos: "position",
            top: "top",
            right: "right",
            bottom: "bottom",
            left: "left",
            inset: "inset",
            display: "display",
            float: "float",
            clear: "clear",
            flex: "flex",
            fd: "flexDirection",
            fg: "flexGrow",
            fsh: "flexShrink",
            fb: "flexBasis",
            fwr: "flexWrap",
            order: "order",
            ai: "alignItems",
            ac: "alignContent",
            as: "alignSelf",
            jc: "justifyContent",
            jis: "justifyItems",
            js: "justifySelf",
            gtc: "gridTemplateColumns",
            gtr: "gridTemplateRows",
            gac: "gridAutoColumns",
            gar: "gridAutoRows",
            gaf: "gridAutoFlow",
            gc: "gridColumn",
            gr: "gridRow",
            gap: "gap",
            rg: "rowGap",
            cg: "columnGap",
            c: "color",
            fs: "fontSize",
            ff: "fontFamily",
            fwght: "fontWeight",
            fst: "fontStretch",
            fa: "fontStyle",
            fv: "fontVariant",
            lh: "lineHeight",
            ti: "textIndent",
            ta: "textAlign",
            tt: "textTransform",
            td: "textDecoration",
            tdc: "textDecorationColor",
            tdl: "textDecorationLine",
            tds: "textDecorationStyle",
            tdt: "textDecorationThickness",
            tuo: "textUnderlineOffset",
            ts: "textShadow",
            ls: "letterSpacing",
            ws: "wordSpacing",
            wbrk: "wordBreak",
            wrp: "whiteSpace",
            tr: "textRendering",
            to: "textOrientation",
            bg: "background",
            bgc: "backgroundColor",
            bgi: "backgroundImage",
            bgp: "backgroundPosition",
            bgs: "backgroundSize",
            bgr: "backgroundRepeat",
            bga: "backgroundAttachment",
            bgo: "backgroundOrigin",
            bgcp: "backgroundClip",
            bd: "border",
            bs: "borderStyle",
            bw: "borderWidth",
            bc: "borderColor",
            br: "borderRadius",
            bdt: "borderTop",
            bdr: "borderRight",
            bdb: "borderBottom",
            bdl: "borderLeft",
            btw: "borderTopWidth",
            brw: "borderRightWidth",
            bbw: "borderBottomWidth",
            blw: "borderLeftWidth",
            btc: "borderTopColor",
            brc: "borderRightColor",
            bbc: "borderBottomColor",
            blc: "borderLeftColor",
            bts: "borderTopStyle",
            brs: "borderRightStyle",
            bbs: "borderBottomStyle",
            bls: "borderLeftStyle",
            o: "outline",
            ow: "outlineWidth",
            oc: "outlineColor",
            os: "outlineStyle",
            oo: "outlineOffset",
            bxsh: "boxShadow",
            filter: "filter",
            bdf: "backdropFilter",
            transition: "transition",
            tp: "transitionProperty",
            tdur: "transitionDuration",
            tf: "transitionTimingFunction",
            tdly: "transitionDelay",
            animation: "animation",
            an: "animationName",
            adur: "animationDuration",
            afn: "animationTimingFunction",
            adel: "animationDelay",
            adir: "animationDirection",
            ait: "animationIterationCount",
            aplay: "animationPlayState",
            afill: "animationFillMode",
            tfm: "transform",
            tfo: "transformOrigin",
            persp: "perspective",
            perspO: "perspectiveOrigin",
            visibility: "visibility",
            cur: "cursor",
            op: "opacity",
            pe: "pointerEvents",
            touch: "touchAction",
            udrag: "userDrag",
            us: "userSelect",
            sb: "scrollBehavior",
            snap: "scrollSnapType",
            snapA: "scrollSnapAlign",
            ov: "overflow",
            ofx: "overflowX",
            ofy: "overflowY",
            ovw: "overflowWrap",
            of: "objectFit",
            opos: "objectPosition",
            ls: "listStyle",
            lstt: "listStyleType",
            lsti: "listStyleImage",
            lstp: "listStylePosition",
            bcsp: "borderCollapse",
            bscp: "borderSpacing",
            tsl: "tableLayout",
            cap: "captionSide",
            ec: "emptyCells",
            col: "columns",
            colC: "columnCount",
            colF: "columnFill",
            cr: "columnRule",
            crc: "columnRuleColor",
            crs: "columnRuleStyle",
            crw: "columnRuleWidth",
            cosp: "columnSpan",
            dir: "direction",
            ub: "unicodeBidi",
            wm: "writingMode",
            cp: "clipPath",
            mask: "mask",
            sh: "shapeOutside",
            maskC: "maskClip",
            maskO: "maskOrigin",
            maskS: "maskSize",
            iso: "isolation",
            blend: "mixBlendMode",
            will: "willChange",
            contain: "contain",
            fill: "fill",
            stroke: "stroke",
            strokeW: "strokeWidth",
            cp: "clip-path",
            ts: ["-webkit-text-stroke", "text-stroke"],
        },
        o = {
            dn: [
                ["display", "none"]
            ],
            db: [
                ["display", "block"]
            ],
            di: [
                ["display", "inline"]
            ],
            dib: [
                ["display", "inline-block"]
            ],
            dg: [
                ["display", "grid"]
            ],
            dig: [
                ["display", "inline-grid"]
            ],
            dt: [
                ["display", "table"]
            ],
            dtr: [
                ["display", "table-row"]
            ],
            dtc: [
                ["display", "table-cell"]
            ],
            "bs-bb": [
                ["box-sizing", "border-box"]
            ],
            "bs-cb": [
                ["box-sizing", "content-box"]
            ],
            r: [
                ["display", "flex"],
                ["flex-direction", "row"]
            ],
            c: [
                ["display", "flex"],
                ["flex-direction", "column"]
            ],
            ir: [
                ["display", "inline-flex"],
                ["flex-direction", "row"]
            ],
            ic: [
                ["display", "inline-flex"],
                ["flex-direction", "column"]
            ],
            js: [
                ["justify-content", "flex-start"]
            ],
            je: [
                ["justify-content", "flex-end"]
            ],
            jc: [
                ["justify-content", "center"]
            ],
            jsb: [
                ["justify-content", "space-between"]
            ],
            jsa: [
                ["justify-content", "space-around"]
            ],
            jse: [
                ["justify-content", "space-evenly"]
            ],
            ais: [
                ["align-items", "stretch"]
            ],
            aie: [
                ["align-items", "flex-end"]
            ],
            aic: [
                ["align-items", "center"]
            ],
            aib: [
                ["align-items", "baseline"]
            ],
            acfs: [
                ["align-content", "flex-start"]
            ],
            ace: [
                ["align-content", "flex-end"]
            ],
            acc: [
                ["align-content", "center"]
            ],
            acsb: [
                ["align-content", "space-between"]
            ],
            acsa: [
                ["align-content", "space-around"]
            ],
            acse: [
                ["align-content", "space-evenly"]
            ],
            asfs: [
                ["align-self", "flex-start"]
            ],
            asfe: [
                ["align-self", "flex-end"]
            ],
            asc: [
                ["align-self", "center"]
            ],
            asb: [
                ["align-self", "baseline"]
            ],
            ass: [
                ["align-self", "stretch"]
            ],
            fnw: [
                ["flex-wrap", "nowrap"]
            ],
            fw: [
                ["flex-wrap", "wrap"]
            ],
            fwr: [
                ["flex-wrap", "wrap-reverse"]
            ],
            rel: [
                ["position", "relative"]
            ],
            abs: [
                ["position", "absolute"]
            ],
            fix: [
                ["position", "fixed"]
            ],
            stk: [
                ["position", "sticky"]
            ],
            fl: [
                ["float", "left"]
            ],
            fr: [
                ["float", "right"]
            ],
            fn: [
                ["float", "none"]
            ],
            cl: [
                ["clear", "left"]
            ],
            cr: [
                ["clear", "right"]
            ],
            cb: [
                ["clear", "both"]
            ],
            oh: [
                ["overflow", "hidden"]
            ],
            oa: [
                ["overflow", "auto"]
            ],
            os: [
                ["overflow", "scroll"]
            ],
            ov: [
                ["overflow", "visible"]
            ],
            ocl: [
                ["overflow", "clip"]
            ],
            resize: [
                ["resize", "both"]
            ],
            "resize-n": [
                ["resize", "none"]
            ],
            vs: [
                ["visibility", "visible"]
            ],
            vh: [
                ["visibility", "hidden"]
            ],
            vc: [
                ["visibility", "collapse"]
            ],
            ce: [
                ["contentEditable", "true"]
            ],
            "ce-n": [
                ["contentEditable", "false"]
            ],
            tw: [
                ["overflow-wrap", "break-word"],
                ["word-break", "break-word"]
            ],
            "to-e": [
                ["text-overflow", "ellipsis"],
                ["overflow", "hidden"],
                ["white-space", "nowrap"]
            ],
            tu: [
                ["text-transform", "uppercase"]
            ],
            tl: [
                ["text-transform", "lowercase"]
            ],
            tc: [
                ["text-transform", "capitalize"]
            ],
            "ta-left": [
                ["text-align", "left"]
            ],
            "ta-center": [
                ["text-align", "center"]
            ],
            "ta-right": [
                ["text-align", "right"]
            ],
            "ta-justify": [
                ["text-align", "justify"]
            ],
            "td-u": [
                ["text-decoration", "underline"]
            ],
            "td-lt": [
                ["text-decoration", "line-through"]
            ],
            "td-n": [
                ["text-decoration", "none"]
            ],
            "ws-nw": [
                ["white-space", "nowrap"]
            ],
            "ws-n": [
                ["white-space", "normal"]
            ],
            "ws-pre": [
                ["white-space", "pre"]
            ],
            "ws-pw": [
                ["white-space", "pre-wrap"]
            ],
            "ws-pl": [
                ["white-space", "pre-line"]
            ],
            b: [
                ["font-weight", "bold"]
            ],
            i: [
                ["font-style", "italic"]
            ],
            "bg-none": [
                ["background", "none"]
            ],
            "bg-init": [
                ["background", "initial"]
            ],
            "b-none": [
                ["border", "none"]
            ],
            "b-init": [
                ["border", "initial"]
            ],
            "o-none": [
                ["outline", "none"]
            ],
            "o-init": [
                ["outline", "initial"]
            ],
            "cur-p": [
                ["cursor", "pointer"]
            ],
            "cur-d": [
                ["cursor", "default"]
            ],
            "cur-na": [
                ["cursor", "not-allowed"]
            ],
            "op-0": [
                ["opacity", "0"]
            ],
            "op-1": [
                ["opacity", "1"]
            ],
            "ls-n": [
                ["list-style", "none"]
            ],
            "ls-i": [
                ["list-style", "initial"]
            ],
            "us-n": [
                ["user-select", "none"]
            ],
            "us-a": [
                ["user-select", "auto"]
            ],
            "us-t": [
                ["user-select", "text"]
            ],
            "us-all": [
                ["user-select", "all"]
            ],
            "pe-n": [
                ["pointer-events", "none"]
            ],
            "pe-a": [
                ["pointer-events", "auto"]
            ],
            df: [
                ["display", "flex"]
            ],
            dgap0: [
                ["gap", "0"]
            ],
            dgap1: [
                ["gap", "1rem"]
            ],
            fg1: [
                ["flex-grow", "1"]
            ],
            fs1: [
                ["flex-shrink", "1"]
            ],
            fb0: [
                ["flex-basis", "0"]
            ],
            ac: [
                ["align-content", "center"]
            ],
            as: [
                ["align-self", "stretch"]
            ],
            ai: [
                ["align-items", "initial"]
            ],
            jcfs: [
                ["justify-content", "flex-start"]
            ],
            jcfe: [
                ["justify-content", "flex-end"]
            ],
            nowrap: [
                ["white-space", "nowrap"]
            ],
            break: [
                ["word-break", "break-all"]
            ],
            pre: [
                ["white-space", "pre"]
            ],
            ellipsis: [
                ["text-overflow", "ellipsis"],
                ["overflow", "hidden"],
                ["white-space", "nowrap"]
            ],
            pointer: [
                ["cursor", "pointer"]
            ],
            notallowed: [
                ["cursor", "not-allowed"]
            ],
            auto: [
                ["cursor", "auto"]
            ],
            hidden: [
                ["visibility", "hidden"]
            ],
            visible: [
                ["visibility", "visible"]
            ],
            scroll: [
                ["overflow", "scroll"]
            ],
            clip: [
                ["overflow", "clip"]
            ],
            sticky: [
                ["position", "sticky"]
            ],
            fixed: [
                ["position", "fixed"]
            ],
            absolute: [
                ["position", "absolute"]
            ],
            relative: [
                ["position", "relative"]
            ],
            static: [
                ["position", "static"]
            ],
            sronly: [
                ["position", "absolute"],
                ["width", "1px"],
                ["height", "1px"],
                ["padding", "0"],
                ["margin", "-1px"],
                ["overflow", "hidden"],
                ["clip", "rect(0,0,0,0)"],
                ["white-space", "nowrap"],
                ["border", "0"]
            ],
            clearfix: [
                ["content", '""'],
                ["display", "table"],
                ["clear", "both"]
            ],
            dflex: [
                ["display", "flex"]
            ],
            dgrid: [
                ["display", "grid"]
            ],
            dcontents: [
                ["display", "contents"]
            ],
            fdr: [
                ["display", "flex"],
                ["flex-direction", "row"]
            ],
            fdc: [
                ["display", "flex"],
                ["flex-direction", "column"]
            ],
            fjc: [
                ["justify-content", "center"]
            ],
            faci: [
                ["align-items", "center"]
            ],
            fac: [
                ["align-content", "center"]
            ],
            fas: [
                ["align-self", "stretch"]
            ],
            gac: [
                ["grid-auto-columns", "auto"]
            ],
            gar: [
                ["grid-auto-rows", "auto"]
            ],
            gaf: [
                ["grid-auto-flow", "row"]
            ],
            oxh: [
                ["overflow-x", "hidden"]
            ],
            oxy: [
                ["overflow-y", "hidden"]
            ],
            oxa: [
                ["overflow-x", "auto"]
            ],
            oya: [
                ["overflow-y", "auto"]
            ],
            "select-none": [
                ["user-select", "none"]
            ],
            "select-text": [
                ["user-select", "text"]
            ],
            "select-all": [
                ["user-select", "all"]
            ],
            "select-auto": [
                ["user-select", "auto"]
            ],
            "sr-only": [
                ["position", "absolute"],
                ["width", "1px"],
                ["height", "1px"],
                ["padding", "0"],
                ["margin", "-1px"],
                ["overflow", "hidden"],
                ["clip", "rect(0,0,0,0)"],
                ["white-space", "nowrap"],
                ["border", "0"]
            ],
            truncate: [
                ["text-overflow", "ellipsis"],
                ["overflow", "hidden"],
                ["white-space", "nowrap"]
            ]
        },
        l = {
            cx: [...Object.keys(i), ...Object.keys(o)],
            font: ["fs", "fwght", "c", "ff", "lh", "ti"],
            bg: ["bg", "bgc", "bgi", "bgp", "bgs", "bgr"],
            layout: ["df", "dg", "pos", "row", "col", "inline-row", "inline-col"],
            bd: ["br", "bw", "bc", "bs", "o"],
            size: ["w", "h", "minW", "maxW", "minH", "maxH", "z"],
            spacing: ["m", "mt", "mr", "mb", "ml", "mx", "my", "p", "pt", "pr", "pb", "pl", "px", "py"],
            flex: ["fd", "fg", "fb", "fa", "fw", "jc", "jsb", "jsa", "jse", "ais", "aie", "aic", "aib", "acfs", "ace", "acc", "acsb", "acsa", "acse", "asfs", "asfe", "asc", "asb", "ass"],
            grid: ["gtc", "gtr", "gap", "ga", "gc", "gr"],
            effect: ["bxsh", "filter", "op"],
            misc: ["cur", "op", "ls", "us", "pe", "ov"]
        },
        n = Object.keys(l),
        r = /([a-zA-Z0-9-]+)\s*:\s*([^;]+)\s*(?:;|$)/g,
        a = /\b(hover|focus|active|disabled|checked)\s*{([^}]*)}/gi,
        s = document.getElementById("catci");
    s || ((s = document.createElement("style")).id = "catci", document.head.appendChild(s));
    let c = s.sheet;

    function d(e) {
        let t = [],
            i = "",
            o = 0,
            l = !1,
            n = !1,
            r = !1;
        for (let a of e) {
            if (r) {
                i += a, r = !1;
                continue
            }
            if ("\\" === a) {
                i += a, r = !0;
                continue
            }
            l || n || "(" !== a ? l || n || ")" !== a ? l || '"' !== a ? n || "'" !== a || (l = !l) : n = !n : o-- : o++, !/\s/.test(a) || l || n || 0 !== o ? i += a : i && (t.push(i), i = "")
        }
        return i && t.push(i), t
    }

    function f(e) {
        return d(e.trim()).map(e => t.has(e) ? `var(--${e})` : e).join(" ")
    }

    function p(e, t) {
        let o = [],
            l;
        for (r.lastIndex = 0; l = r.exec(e);) {
            let n = l[1].trim(),
                a = l[2].trim();
            if (!t.has(n)) continue;
            let s = i[n];
            if (!s) continue;
            let c = a,
                d = !1;
            c.endsWith("!") && (d = !0, c = c.slice(0, -1).trim());
            let p = f(c),
                g = Array.isArray(s) ? s : [s];
            g.forEach(e => {
                let t = e.replace(/([A-Z])/g, "-$1").toLowerCase(),
                    i = "background-image" !== t || /^url\(/i.test(p) ? p : `url(${p})`;
                o.push(`${t}: ${i}${d ? " !important" : ""}`)
            })
        }
        return o
    }

    function g(e, t) {
        return e.split(/\s+/).filter(e => t.has(e) && o[e]).flatMap(e => o[e].map(([e, t]) => `${e}: ${t}`))
    }

    function u(e, t) {
        let i = p(e, t),
            o = e.replace(r, " "),
            l = g(o, t);
        return [...l, ...i]
    }

    function b(e, t) {
        let i = [],
            o = [],
            l = 0,
            n = "";
        for (; l < e.length;)
            if (">" === e[l]) {
                n && (o.push(n), n = "");
                let r = l + 1;
                for (;
                    /\s/.test(e[r]);) r++;
                let a = r;
                for (; r < e.length && "{" !== e[r];) r++;
                let s = e.slice(a, r).trim(),
                    c = 0,
                    d = r;
                do "{" === e[d] ? c++ : "}" === e[d] && c--, d++; while (d < e.length && c > 0);
                let f = e.slice(r + 1, d - 1),
                    p = b(f, t),
                    g = u(p.cleaned.join(""), t);
                g.length && i.push({
                    suffix: ` > ${s}`,
                    decls: g
                }), p.rules.forEach(e => {
                    i.push({
                        suffix: ` > ${s}` + e.suffix,
                        decls: e.decls
                    })
                }), l = d
            } else n += e[l++];
        return n && o.push(n), {
            cleaned: o,
            rules: i
        }
    }
    let h = 0;
    document.querySelectorAll("[cx], [font], [bg], [layout], [bd], [size], [spacing], [flex], [grid], [effect], [misc]").forEach(e => {
        let t = e.getAttributeNames(),
            i = t.filter(e => n.includes(e));
        if (!i.length || i.length > 1 && (e.removeAttribute(i[0]), !(i = i.slice(1)).length)) return;
        let o = new Set;
        i.forEach(e => l[e].forEach(e => o.add(e)));
        let r = i.map(t => e.getAttribute(t)).join(" "),
            s = {
                hover: [],
                focus: [],
                active: [],
                disabled: [],
                checked: []
            },
            d;
        for (a.lastIndex = 0; d = a.exec(r);) s[d[1].toLowerCase()].push(d[2]);
        let f = r.replace(a, ""),
            {
                cleaned: p,
                rules: g
            } = b(f, o),
            m = p.join(""),
            w = u(m, o);
        if (!w.length && !g.length && !Object.values(s).some(e => e.length)) return;
        h++;
        let x = `catci-${h}`;
        e.classList.add(x), w.length && c.insertRule(`.${x} { ${w.join("; ")} }`, c.cssRules.length), g.forEach(e => {
            c.insertRule(`.${x}${e.suffix} { ${e.decls.join("; ")} }`, c.cssRules.length)
        }), Object.entries(s).forEach(([e, t]) => {
            t.forEach(t => {
                let i = u(t, o);
                i.length && c.insertRule(`.${x}:${e} { ${i.join("; ")} }`, c.cssRules.length)
            })
        })
    }), window.extractbuiltcss = () => {
        let e = document.getElementById("catci");
        if (!e) return console.warn("no #catci sheet");
        let t = "";
        for (let i of e.sheet.cssRules) t += i.cssText + "\n";
        console.log(t.trim())
    }
});
