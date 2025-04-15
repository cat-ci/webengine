(() => {

    function loadThreeJs(callback) {
        if (window.THREE) {

            callback();
        } else {
            const script = document.createElement("script");
            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
            script.onload = () => {
                console.log("Three.js loaded.");
                callback();
            };
            script.onerror = () => {
                console.error("Failed to load Three.js library.");
            };
            document.head.appendChild(script);
        }
    }

    const booleanCssShortcuts = {

        b: "font-weight: bold;",
        bold: "font-weight: bold;",
        i: "font-style: italic;",
        italic: "font-style: italic;",
        u: "text-decoration: underline;",
        underline: "text-decoration: underline;",
        lt: "text-decoration: line-through;",
        "line-through": "text-decoration: line-through;",

        sw: "width: 100vw;",
        "screen-width": "width: 100vw;",
        sh: "height: 100vh;",
        "screen-height": "height: 100vh;",
        fw: "width: 100%;",
        "full-width": "width: 100%;",
        jh: "height: 100%;",
        "full-height": "height: 100%;"
    };

    const cssShortcuts = {

        "flex-row": "display: flex; flex-direction: row;",
        fr: "display: flex; flex-direction: row;",
        "flex-col": "display: flex; flex-direction: column;",
        fc: "display: flex; flex-direction: column;",
        "inline-flex-row": "display: inline-flex; flex-direction: row;",
        ifr: "display: inline-flex; flex-direction: row;",
        "inline-flex-col": "display: inline-flex; flex-direction: column;",
        ifc: "display: inline-flex; flex-direction: column;",
        block: "display: block;",
        db: "display: block;",
        "inline-block": "display: inline-block;",
        idb: "display: inline-block;",
        none: "display: none;",
        dn: "display: none;",
        inline: "display: inline;",
        di: "display: inline;",
        grid: "display: grid;",
        dg: "display: grid;",
        "inline-grid": "display: inline-grid;",
        dig: "display: inline-grid;",
        contents: "display: contents;",
        dc: "display: contents;",
        table: "display: table;",
        dt: "display: table;",
        "table-row": "display: table-row;",
        dtr: "display: table-row;",
        "table-cell": "display: table-cell;",
        dtc: "display: table-cell;",

        margin: "margin: {value};",
        m: "margin: {value};",
        "auto-margin": "margin: auto;",
        am: "margin: auto;",
        "no-margin": "margin: 0;",
        nm: "margin: 0;",
        "margin-top": "margin-top: {value};",
        mt: "margin-top: {value};",
        "margin-right": "margin-right: {value};",
        mr: "margin-right: {value};",
        "margin-bottom": "margin-bottom: {value};",
        mb: "margin-bottom: {value};",
        "margin-left": "margin-left: {value};",
        ml: "margin-left: {value};",

        padding: "padding: {value};",
        p: "padding: {value};",
        "auto-padding": "padding: auto;",
        ap: "padding: auto;",
        "no-padding": "padding: 0;",
        np: "padding: 0;",
        "padding-top": "padding-top: {value};",
        pt: "padding-top: {value};",
        "padding-right": "padding-right: {value};",
        pr: "padding-right: {value};",
        "padding-bottom": "padding-bottom: {value};",
        pb: "padding-bottom: {value};",
        "padding-left": "padding-left: {value};",
        pl: "padding-left: {value};",

        relative: "position: relative;",
        rel: "position: relative;",
        absolute: "position: absolute;",
        abs: "position: absolute;",
        fixed: "position: fixed;",
        fix: "position: fixed;",
        sticky: "position: sticky;",
        stk: "position: sticky;",
        static: "position: static;",
        sta: "position: static;",

        border: "border: {value};",
        b: "border: {value};", 
        "border-top": "border-top: {value};",
        bt: "border-top: {value};",
        "border-right": "border-right: {value};",
        br: "border-right: {value};",
        "border-bottom": "border-bottom: {value};",
        bb: "border-bottom: {value};",
        "border-left": "border-left: {value};",
        bl: "border-left: {value};",
        "border-radius": "border-radius: {value};",
        "border-color": "border-color: {value};",
        bc: "border-color: {value};",
        "border-style": "border-style: {value};",
        bs: "border-style: {value};",
        "border-width": "border-width: {value};",
        bw: "border-width: {value};",

        background: "background: {value};",
        bg: "background: {value};",
        "background-color": "background-color: {value};",
        bgc: "background-color: {value};",
        "background-image": "background-image: {value};",
        bgi: "background-image: {value};",
        "background-repeat": "background-repeat: {value};",
        bgr: "background-repeat: {value};",
        "background-position": "background-position: {value};",
        bgp: "background-position: {value};",
        "background-size": "background-size: {value};",
        bgs: "background-size: {value};",
        "background-attachment": "background-attachment: {value};",
        bga: "background-attachment: {value};",

        font: "font: {value};",
        f: "font: {value};",
        "font-family": "font-family: {value};",
        ff: "font-family: {value};",
        "font-size": "font-size: {value};",
        fs: "font-size: {value};",
        "font-weight": "font-weight: {value};",
        fw: "font-weight: {value};",
        "font-style": "font-style: {value};",
        fv: "font-variant: {value};",
        "font-stretch": "font-stretch: {value};",

        width: "width: {value};",
        w: "width: {value};",
        height: "height: {value};",
        h: "height: {value};",
        "max-width": "max-width: {value};",
        mw: "max-width: {value};",
        "max-height": "max-height: {value};",
        mh: "max-height: {value};",
        "min-width": "min-width: {value};",
        "min-height": "min-height: {value};",
        "auto-width": "width: auto;",
        aw: "width: auto;",
        "auto-height": "height: auto;",
        ah: "height: auto;",

        color: "color: {value};",
        c: "color: {value};",

        transition: "transition: {value};",
        t: "transition: {value};"
    };

    const predefinedAnimations = {
        spin: (duration) => `animation: spin ${duration} linear infinite;`,
        "spin-reverse": (duration) =>
            `animation: spin-reverse ${duration} linear infinite;`,
        "fade-in": (duration) =>
            `animation: fade-in ${duration} ease-in forwards;`,
        "fade-out": (duration) =>
            `animation: fade-out ${duration} ease-out forwards;`,
        flicker: (duration) =>
            `animation: flicker ${duration} ease-in-out infinite;`,
        "flicker-random": (intensity) =>
            `animation: flicker-random ${intensity} ease-in-out infinite;`,
        "slide-in-left": (duration) =>
            `animation: slide-in-left ${duration} ease-out forwards;`,
        "slide-in-right": (duration) =>
            `animation: slide-in-right ${duration} ease-out forwards;`,
        "slide-in-top": (duration) =>
            `animation: slide-in-top ${duration} ease-out forwards;`,
        "slide-in-bottom": (duration) =>
            `animation: slide-in-bottom ${duration} ease-out forwards;`,
        "slide-out-left": (duration) =>
            `animation: slide-out-left ${duration} ease-out forwards;`,
        "slide-out-right": (duration) =>
            `animation: slide-out-right ${duration} ease-out forwards;`,
        "slide-out-top": (duration) =>
            `animation: slide-out-top ${duration} ease-out forwards;`,
        "slide-out-bottom": (duration) =>
            `animation: slide-out-bottom ${duration} ease-out forwards;`,
        "zoom-in": (duration) =>
            `animation: zoom-in ${duration} ease-out forwards;`,
        "zoom-out": (duration) =>
            `animation: zoom-out ${duration} ease-out forwards;`
    };

    function injectAnimationKeyframes() {
        if (document.getElementById("catci-animation-keyframes")) return;
        const keyframes = `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 22%, 24%, 55% { opacity: 0; }
        }
        @keyframes flicker-random {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-in-top {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes slide-in-bottom {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slide-out-left {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes slide-out-right {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes slide-out-top {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
        @keyframes slide-out-bottom {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
        @keyframes zoom-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @keyframes zoom-out {
          from { transform: scale(1); }
          to { transform: scale(0); }
        }
      `;
        const styleEl = document.createElement("style");
        styleEl.id = "catci-animation-keyframes";
        styleEl.innerHTML = keyframes;
        document.head.appendChild(styleEl);
    }

    function getDataInstructions(elem) {
        const attributes = ["data-catci", "data-cen", "data-cx", "data-ce"];
        let instructions = "";
        attributes.forEach((attr) => {
            const value = elem.getAttribute(attr);
            if (value) {
                instructions += value.trim();
                if (!value.trim().endsWith(";")) {
                    instructions += ";";
                }
                instructions += " ";
            }
        });
        return instructions.trim();
    }

    function parseInstructions(instructions) {
        const commandsArray = [];
        const fragments = instructions
            .split(";")
            .map((frag) => frag.trim())
            .filter(Boolean);
        for (const frag of fragments) {
            if (frag.indexOf(" ") >= 0) {
                const parts = frag.split(/\s+/);
                if (parts[0].includes(":")) {
                    commandsArray.push(frag);
                } else {
                    parts.forEach((part) => {
                        if (part.length) commandsArray.push(part);
                    });
                }
            } else {
                commandsArray.push(frag);
            }
        }
        const commands = {};
        commandsArray.forEach((cmd) => {
            if (cmd.includes(":")) {
                const index = cmd.indexOf(":");
                const key = cmd.slice(0, index).trim();
                const value = cmd.slice(index + 1).trim();
                commands[key] = value;
            } else {
                commands[cmd] = true;
            }
        });
        return commands;
    }

    function handleNormalMap(elem, commands) {
        let normalMapPath = null;
        let colorMapPath = null;

        for (const key in commands) {
            if (key.startsWith("normal-map(")) {
                const match = key.match(/^normal-map\((['"]?)(.+?)\1\)$/);
                if (match) {
                    normalMapPath = match[2];
                } else {
                    console.warn("Invalid normal-map format: " + key);
                }
            }
            if (key.startsWith("color-map(")) {
                const match = key.match(/^color-map\((['"]?)(.+?)\1\)$/);
                if (match) {
                    colorMapPath = match[2];
                } else {
                    console.warn("Invalid color-map format: " + key);
                }
            }
        }

        const lightColor = commands["light-color"] || "#ffffff";
        const lightIntensity = parseFloat(commands["light-intensity"] || "0.5");
        const lightDirection = commands["light-direction"]
            ? commands["light-direction"].split(",").map(parseFloat)
            : [0, 0, 1];
        const context = commands["context"] || null;

        if (!normalMapPath && !colorMapPath) {
            return;
        }
        setupNormalMapScene(elem, {
            normalMapPath,
            colorMapPath,
            lightColor,
            lightIntensity,
            lightDirection,
            context
        });
    }

    function setupNormalMapScene(elem, options) {
        const width = elem.offsetWidth || 300;
        const height = elem.offsetHeight || 300;
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
            width / -2,
            width / 2,
            height / 2,
            height / -2,
            0.1,
            1000
        );
        camera.position.z = 2;
        const textureLoader = new THREE.TextureLoader();
        let colorTexture = options.colorMapPath
            ? textureLoader.load(options.colorMapPath)
            : null;
        let normalTexture = options.normalMapPath
            ? textureLoader.load(options.normalMapPath)
            : null;
        const materialOptions = {};
        if (colorTexture) materialOptions.map = colorTexture;
        if (normalTexture) materialOptions.normalMap = normalTexture;
        const material = new THREE.MeshStandardMaterial(materialOptions);
        const geometry = new THREE.PlaneGeometry(width, height);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        const light = new THREE.PointLight(options.lightColor, options.lightIntensity);
        const ld = new THREE.Vector3(...options.lightDirection);
        ld.normalize();
        ld.multiplyScalar(100);
        light.position.copy(ld);
        scene.add(light);

        elem.innerHTML = "";
        elem.appendChild(renderer.domElement);
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    }

    function applyCssShortcuts(elem, commands) {
        let cssRules = "";
        for (const key in commands) {
            const value = commands[key];

            if (value === true && booleanCssShortcuts.hasOwnProperty(key)) {
                cssRules += booleanCssShortcuts[key] + " ";
                continue;
            }

            if (predefinedAnimations.hasOwnProperty(key)) {
                if (value === true) {
                    console.warn(
                        `Animation shortcut "${key}" requires a duration/intensity value; skipping it.`
                    );
                    continue;
                }
                cssRules += predefinedAnimations[key](value) + " ";
                continue;
            }

            if (cssShortcuts.hasOwnProperty(key)) {
                let ruleTemplate = cssShortcuts[key];
                if (ruleTemplate.includes("{value}")) {
                    if (value === true) {
                        console.warn(
                            `The CSS shortcut "${key}" requires a value; skipping it.`
                        );
                        continue;
                    }
                    ruleTemplate = ruleTemplate.replace("{value}", value);
                }
                cssRules += ruleTemplate + " ";
            }
        }
        if (cssRules.trim()) {
            elem.style.cssText += cssRules;
        }
    }

    function processElement(elem) {
        const instructions = getDataInstructions(elem);
        if (instructions) {
            const commands = parseInstructions(instructions);
            console.log("Processing element:", elem);
            console.log("Commands:", commands);
            applyCssShortcuts(elem, commands);
            if (commands.clone) {
                handleCloneCommand(elem, commands.clone);
            }

            if (
                Object.keys(commands).some(
                    (k) =>
                        k.startsWith("normal-map(") ||
                        k.startsWith("color-map(") ||
                        k === "light-color" ||
                        k === "light-intensity" ||
                        k === "light-direction"
                )
            ) {
                handleNormalMap(elem, commands);
            }
        }
    }

    function handleCloneCommand(elem, cloneCommandValue) {
        const match = cloneCommandValue.match(/^(\w+)\(([^)]+)\)$/);
        if (!match) {
            console.warn(
                `Invalid clone command format: "${cloneCommandValue}". Expected format: clone:action(target)`
            );
            return;
        }
        const action = match[1]; 
        const targetSelector = match[2];
        const source = document.querySelector(targetSelector);
        if (!source) {
            console.warn(`Clone target not found for selector: ${targetSelector}`);
            return;
        }
        if (action === "content") {
            elem.innerHTML = source.innerHTML;
        } else if (action === "styles") {
            elem.style.cssText += source.style.cssText;
        } else if (action === "full") {
            elem.innerHTML = source.innerHTML;
            elem.style.cssText += source.style.cssText;
        } else {
            console.warn(`Unknown clone action: "${action}" in clone command.`);
        }
    }

    function initCatciEngine() {
        injectAnimationKeyframes();
        const selector = "[data-catci], [data-cen], [data-cx], [data-ce]";
        const elements = document.querySelectorAll(selector);
        elements.forEach((elem) => processElement(elem));
    }

    loadThreeJs(initCatciEngine);
})();
