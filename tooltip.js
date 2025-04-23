(function() {
    function getAllTooltipConfigs() {
        const configTag = document.querySelector("config");
        if (!configTag) return {};
        const configs = {};
        configTag.querySelectorAll('define[feature="tooltip"]').forEach((def) => {
            const name = def.getAttribute("name") || "default";
            const styleTag = def.querySelector('style[name="tooltip"]');
            let styleText = "";
            if (styleTag) {
                styleText = styleTag.textContent.replace(/tooltip\s*{/, `.tooltip-${name} {`).replace(/}/, "}");
            }
            const placementTag = def.querySelector("placement[mode]");
            const placement = placementTag?.getAttribute("mode") || "follow";
            configs[name] = {
                styleText,
                placement
            };
        });
        return configs;
    }

    function injectTooltipStyles(configs) {
        Object.entries(configs).forEach(([name, cfg]) => {
            if (!cfg.styleText) return;
            const styleId = `tooltip-style-${name}`;
            if (document.getElementById(styleId)) return;
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = cfg.styleText;
            document.head.appendChild(style);
        });
    }

    function positionTooltip(tooltip, target, event, placement) {
        const rect = target.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        if (placement === "follow" && event) {
            tooltip.style.left = event.pageX + 10 + "px";
            tooltip.style.top = event.pageY + 10 + "px";
        } else if (placement === "above") {
            tooltip.style.left = scrollX + rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
            tooltip.style.top = scrollY + rect.top - tooltip.offsetHeight - 8 + "px";
        } else if (placement === "under") {
            tooltip.style.left = scrollX + rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
            tooltip.style.top = scrollY + rect.bottom + 8 + "px";
        } else if (placement === "left") {
            tooltip.style.left = scrollX + rect.left - tooltip.offsetWidth - 8 + "px";
            tooltip.style.top = scrollY + rect.top + rect.height / 2 - tooltip.offsetHeight / 2 + "px";
        } else if (placement === "right") {
            tooltip.style.left = scrollX + rect.right + 8 + "px";
            tooltip.style.top = scrollY + rect.top + rect.height / 2 - tooltip.offsetHeight / 2 + "px";
        }
    }
    document.addEventListener("DOMContentLoaded", function() {
        const configs = getAllTooltipConfigs();
        if (!configs.default) return;
        injectTooltipStyles(configs);
        document.querySelectorAll("[tooltip]").forEach((el) => {
            let tooltip = null;
            const configName = el.getAttribute("tooltip-config") || "default";
            const config = configs[configName] || configs.default;
            const tooltipClass = `tooltip-${configName}`;

            function getTooltipText() {
                const attr = el.getAttribute("tooltip");
                if (attr === "{aria}") {
                    return el.getAttribute("aria-label") || "";
                }
                return attr;
            }

            function showTooltip(event) {
                const text = getTooltipText();
                if (!text) return;
                if (tooltip) return;
                tooltip = document.createElement("div");
                tooltip.className = `tooltip ${tooltipClass}`;
                tooltip.textContent = text;
                document.body.appendChild(tooltip);
                positionTooltip(tooltip, el, event, config.placement);
                if (config.placement === "follow") {
                    document.addEventListener("mousemove", moveTooltip);
                }
            }

            function moveTooltip(event) {
                if (tooltip) {
                    positionTooltip(tooltip, el, event, config.placement);
                }
            }

            function hideTooltip() {
                if (tooltip) {
                    if (config.placement === "follow") {
                        document.removeEventListener("mousemove", moveTooltip);
                    }
                    tooltip.remove();
                    tooltip = null;
                }
            }
            el.addEventListener("mouseenter", showTooltip);
            el.addEventListener("mouseleave", hideTooltip);
            el.addEventListener("focus", showTooltip);
            el.addEventListener("blur", hideTooltip);
        });
    });
})();