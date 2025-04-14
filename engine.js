(function () {
    const globalJson = {
        name: "John Doe",
        user: {
            name: "Jane Doe",
            age: 28,
            avatar: "https://via.placeholder.com/150",
            profileUrl: "https://example.com",
        },
    };

    const CATCI_ALIASES = ["data-catci", "data-cen"];

    const styleMapping = {
        "flex-row": { display: "flex", flexDirection: "row" },
        "flex-col": { display: "flex", flexDirection: "column" },
        "inline-flex-row": {
            display: "inline-flex",
            flexDirection: "row",
        },
        "inline-flex-col": {
            display: "inline-flex",
            flexDirection: "column",
        },
        fullwidth: { width: "100%" },
        fw: { width: "100%" },
        fullheight: { height: "100%" },
        fh: { height: "100%" },
        screenwidth: { width: "100vw" },
        sw: { width: "100vw" },
        screenheight: { height: "100vh" },
        sh: { height: "100vh" },
        autowidth: { width: "auto" },
        aw: { width: "auto" },
        autoheight: { height: "auto" },
        ah: { height: "auto" },
        nomargin: { margin: "0" },
        nm: { margin: "0" },
        automargin: { margin: "auto" },
        am: { margin: "auto" },

        "text-center": { textAlign: "center" },
        "text-left": { textAlign: "left" },
        "text-right": { textAlign: "right" },
        bold: { fontWeight: "bold" },
        italic: { fontStyle: "italic" },
        underline: { textDecoration: "underline" },

        relative: { position: "relative" },
        absolute: { position: "absolute" },
        fixed: { position: "fixed" },

        "justify-center": { justifyContent: "center" },
        "justify-between": { justifyContent: "space-between" },
        "justify-around": { justifyContent: "space-around" },
        "items-center": { alignItems: "center" },
        "items-start": { alignItems: "flex-start" },
        "items-end": { alignItems: "flex-end" },
    };

    const aliasMap = {
        fr: "flex-row",
        fc: "flex-col",
        ifr: "inline-flex-row",
        ifc: "inline-flex-col",
        fw: "fullwidth",
        fh: "fullheight",
    };

    function parseDirectives(attrValue) {
        return attrValue.split(/[\s;]+/).filter(Boolean);
    }

    function getNestedValue(obj, path) {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    }

    function withUnits(value) {
        return isNaN(value) ? value : value + "px";
    }

    function applyStyleDirectives(el, directive) {

        if (aliasMap[directive]) {
            directive = aliasMap[directive];
        }

        if (styleMapping[directive]) {
            Object.assign(el.style, styleMapping[directive]);
            return;
        }

        if (directive.startsWith("bg-")) {
            el.style.backgroundColor = directive.slice(3);
            return;
        }

        if (directive.startsWith("c-")) {
            el.style.color = directive.slice(2);
            return;
        }

        if (directive.startsWith("p-")) {
            let value = directive.slice(2);
            el.style.padding = withUnits(value);
            return;
        }

        if (directive.startsWith("pt-")) {
            let value = directive.slice(3);
            el.style.paddingTop = withUnits(value);
            return;
        }
        if (directive.startsWith("pr-")) {
            let value = directive.slice(3);
            el.style.paddingRight = withUnits(value);
            return;
        }
        if (directive.startsWith("pb-")) {
            let value = directive.slice(3);
            el.style.paddingBottom = withUnits(value);
            return;
        }
        if (directive.startsWith("pl-")) {
            let value = directive.slice(3);
            el.style.paddingLeft = withUnits(value);
            return;
        }

        if (directive.startsWith("m-")) {
            let value = directive.slice(2);
            el.style.margin = withUnits(value);
            return;
        }

        if (directive.startsWith("mt-")) {
            let value = directive.slice(3);
            el.style.marginTop = withUnits(value);
            return;
        }
        if (directive.startsWith("mr-")) {
            let value = directive.slice(3);
            el.style.marginRight = withUnits(value);
            return;
        }
        if (directive.startsWith("mb-")) {
            let value = directive.slice(3);
            el.style.marginBottom = withUnits(value);
            return;
        }
        if (directive.startsWith("ml-")) {
            let value = directive.slice(3);
            el.style.marginLeft = withUnits(value);
            return;
        }

        if (directive.startsWith("border-")) {
            let value = directive.slice(7);
            el.style.border = value;
            return;
        }

        if (directive === "rounded") {
            el.style.borderRadius = "0.5rem";
            return;
        }
        if (directive.startsWith("rounded-")) {
            let value = directive.slice(8);
            el.style.borderRadius = withUnits(value);
            return;
        }

        if (directive === "shadow") {
            el.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.2)";
            return;
        }

        if (directive === "no-select") {
            el.style.userSelect = "none";
            return;
        }
    }

    function processCloneDirective(el, token) {

        const isTwin = token.startsWith("twinclone:");
        const selector = token
            .substring(isTwin ? "twinclone:".length : "clone:".length)
            .trim();
        const sourceEl = document.querySelector(selector);
        if (!sourceEl) return;

        const cloneEl = sourceEl.cloneNode(true);
        if (isTwin) {

            const computed = getComputedStyle(sourceEl);
            for (let prop of computed) {
                cloneEl.style[prop] = computed.getPropertyValue(prop);
            }
        }
        el.innerHTML = "";
        el.appendChild(cloneEl);
    }

    function processMergeDirective(el, token) {

        const parts = token.substring("merge:".length).trim().split(/\s+/);
        if (!parts.length) return;
        const mergeType = parts[0];
        const sourceSelector = parts[1];
        const position = parts[2] || "atbottom";

        const sourceEl = document.querySelector(sourceSelector);
        if (!sourceEl) return;

        if (mergeType.includes("style")) {
            const computed = window.getComputedStyle(sourceEl);
            for (let prop of computed) {
                el.style[prop] = computed.getPropertyValue(prop);
            }
        }
        if (mergeType.includes("content")) {
            const content = sourceEl.innerHTML;
            if (position === "attop") {
                el.innerHTML = content + el.innerHTML;
            } else if (position === "replace") {
                el.innerHTML = content;
            } else {
                el.innerHTML += content;
            }
        }
    }

    async function processJsonExtractDirective(el, token, fullTokenString) {
        const match = token.match(/jsonextract:'([^']+)'/);
        if (!match) return;

        let [urlOrPath, nestedPath] = match[1].split(/\s*->\s*/);
        let dataValue;

        try {

            if (
                urlOrPath.startsWith("http://") ||
                urlOrPath.startsWith("https://")
            ) {
                const response = await fetch(urlOrPath);
                const json = await response.json();
                dataValue = nestedPath ? getNestedValue(json, nestedPath) : json;
            } else {

                dataValue = getNestedValue(globalJson, urlOrPath);
            }
        } catch (err) {
            console.warn("jsonextract failed:", err);
            return;
        }

        if (dataValue === undefined) return;

        const pushRegex = /push([a-zA-Z-]+)?\(([^)]+)\)/g;
        let m;
        while ((m = pushRegex.exec(fullTokenString)) !== null) {
            let attr = m[1] || "";
            const target = m[2];
            let targetEl =
                target === "self" ? el : document.querySelector(target);
            if (!targetEl) continue;

            switch (attr) {
                case "":
                case "text":
                    targetEl.textContent = dataValue;
                    break;
                case "src":
                case "href":
                case "alt":
                    targetEl.setAttribute(attr, dataValue);
                    break;
                default:
                    targetEl.setAttribute(attr, dataValue);
                    break;
            }
        }
    }

    function processCatciDirectives(el, attrValue) {
        const tokens = parseDirectives(attrValue);

        const fullDirectiveStr = attrValue;

        tokens.forEach((token) => {

            if (token.startsWith("ignore:")) return;

            if (
                token.startsWith("flex-") ||
                token === "fr" ||
                token === "fc" ||
                token === "fw" ||
                token === "fh" ||
                token === "fullwidth" ||
                token === "fullheight" ||
                token === "sw" ||
                token === "sh" ||
                token.startsWith("bg-") ||
                token.startsWith("c-") ||
                token.startsWith("p-") ||
                token.startsWith("pt-") ||
                token.startsWith("pr-") ||
                token.startsWith("pb-") ||
                token.startsWith("pl-") ||
                token.startsWith("m-") ||
                token.startsWith("mt-") ||
                token.startsWith("mr-") ||
                token.startsWith("mb-") ||
                token.startsWith("ml-") ||
                token === "rounded" ||
                token.startsWith("rounded-") ||
                token === "shadow" ||
                token === "no-select"
            ) {
                applyStyleDirectives(el, token);
            }

            else if (
                token.startsWith("clone:") ||
                token.startsWith("twinclone:")
            ) {
                processCloneDirective(el, token);
            }

            else if (token.startsWith("merge:")) {
                processMergeDirective(el, token);
            }

            else if (token.startsWith("jsonextract:")) {
                processJsonExtractDirective(el, token, fullDirectiveStr);
            }

        });
    }

    function initCatci() {

        CATCI_ALIASES.forEach((attrName) => {
            document
                .querySelectorAll("[" + attrName + "]")
                .forEach((el) => {
                    const attrValue = el.getAttribute(attrName);
                    if (attrValue) {
                        processCatciDirectives(el, attrValue);
                    }
                });
        });
    }

    window.addEventListener("DOMContentLoaded", initCatci);

})();