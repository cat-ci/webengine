function loadBaffle() {
    return new Promise((resolve, reject) => {
        if (window.baffle) {

            resolve(window.baffle);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/baffle@0.3.6/dist/baffle.min.js';
        script.onload = () => resolve(window.baffle);
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
loadBaffle()
async function animateText(element, options = {}) {
    const {
        type = "glitch",
        speed = 20,
        char = "|",
        reveal = 1200,
        trigger = "load",
        pause = 700,    
        delpause = 400, 
        once = false,   
        infinite = false, 
        random = false    
    } = options;

    let switchTexts = [];
    if (type === "typeswitch") {
        switchTexts = Object.keys(options)
            .filter(key => /^\d+$/.test(key))
            .sort((a, b) => Number(a) - Number(b))
            .map(key => options[key]);
        if (switchTexts.length === 0) {
            switchTexts = [element.textContent];
        }
    }

    const runAnimation = async () => {
        if (!element._originalText) {
            element._originalText = element.textContent;
        }
        element.textContent = element._originalText;
        element.style.visibility = "visible";

        if (element._animationInterval) {
            clearInterval(element._animationInterval);
            element._animationInterval = null;
        }
        if (element._baffleInstance) {
            element._baffleInstance.stop();
            element._baffleInstance = null;
        }
        if (element._cursorSpan) {
            element._cursorSpan.remove();
            element._cursorSpan = null;
        }

        if (type === "glitch") {
            const baffle = await loadBaffle();
            const text = baffle(element);
            text.set({
                characters: "█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█ ░█▒/ ▒▓░ █<░▒ ▓/░>",
                speed: speed
            });
            element._baffleInstance = text;
            text.reveal(0);
            text.start();
            text.reveal(reveal);
        } else if (type === "typein") {
            element.textContent = "";
            let i = 0;
            element._animationInterval = setInterval(() => {
                element.textContent = element._originalText.slice(0, i + 1);
                i++;
                if (i >= element._originalText.length) {
                    clearInterval(element._animationInterval);
                    element._animationInterval = null;
                }
            }, speed);
        } else if (type === "cursor") {
            element.textContent = element._originalText;
            const cursor = document.createElement("span");
            cursor.textContent = char;
            cursor.style.display = "inline-block";
            cursor.style.animation = `blink ${speed}ms steps(1) infinite`;
            element.appendChild(cursor);
            element._cursorSpan = cursor;

            if (!document.getElementById("blink-keyframes")) {
                const style = document.createElement("style");
                style.id = "blink-keyframes";
                style.textContent = `
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
        } else if (type === "typeswitch") {
            let idx = 0;
            let prevIdx = -1;
            let running = true;

            const typeText = (text, cb) => {
                element.style.visibility = "visible";
                let i = 0;
                element.textContent = "";
                element._animationInterval = setInterval(() => {
                    element.textContent = text.slice(0, i + 1);
                    i++;
                    if (i >= text.length) {
                        clearInterval(element._animationInterval);
                        element._animationInterval = null;
                        setTimeout(cb, pause);
                    }
                }, speed);
            };

            const deleteText = (cb) => {
                let i = element.textContent.length;
                element._animationInterval = setInterval(() => {
                    element.textContent = element.textContent.slice(0, i - 1);
                    i--;
                    if (i <= 0) {
                        clearInterval(element._animationInterval);
                        element._animationInterval = null;
                        element.style.visibility = "hidden";
                        setTimeout(cb, delpause);
                    }
                }, speed);
            };

            const getNextIdx = () => {
                if (random && switchTexts.length > 1) {
                    let next;
                    do {
                        next = Math.floor(Math.random() * switchTexts.length);
                    } while (next === idx);
                    return next;
                } else if (infinite) {
                    return (idx + 1) % switchTexts.length;
                } else {
                    return idx + 1;
                }
            };

            const next = () => {
                if (!running) return;
                typeText(switchTexts[idx], () => {

                    if (once && idx === switchTexts.length - 1) {
                        element.style.visibility = "visible";
                        return;
                    }

                    if (!infinite && !random && idx === switchTexts.length - 1) {
                        element.style.visibility = "visible";
                        return;
                    }
                    deleteText(() => {
                        prevIdx = idx;
                        idx = getNextIdx();
                        next();
                    });
                });
            };
            next();
        }
    };

    element.runTextAnimation = runAnimation;

    switch (trigger) {
        case "load":
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", runAnimation);
            } else {
                runAnimation();
            }
            break;
        case "scrollin":
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        runAnimation();
                        obs.disconnect();
                    }
                });
            });
            observer.observe(element);
            break;
        case "click":
            element.addEventListener("click", runAnimation, { once: true });
            break;
        case "hover":
            element.addEventListener("mouseenter", runAnimation, { once: true });
            break;
        case "focus":
            element.addEventListener("focus", runAnimation, { once: true });
            break;
        case "manual":

            break;
        default:
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", runAnimation);
            } else {
                runAnimation();
            }
    }
}

function parseTextEffectParams(str) {
    const res = {};
    str.split(';').forEach(part => {
      let p = part.trim();
      if (!p) return;

      const m = /^(\w+)\s+(.+)$/.exec(p);
      if (m && m[2].includes(':')) {
        if (!res.type) res.type = m[1];
        p = m[2];
      }

      if (!p.includes(':')) {
        if (!res.type) res.type = p;
        return;
      }

      const idx = p.indexOf(':');
      const key = p.slice(0, idx).trim();
      let val = p.slice(idx + 1).trim();

      if (/^-?\d+(\.\d+)?$/.test(val)) {
        val = Number(val);
      }

      else if (/^(true|false)$/i.test(val)) {
        val = val.toLowerCase() === 'true';
      }
      res[key] = val;
    });
    return res;
  }

  function initCsmTextEffects() {
    document
      .querySelectorAll('[cx*="text-effect{"]')
      .forEach(el => {
        const cx = el.getAttribute('cx');
        const m = /text-effect\{([^}]+)\}/.exec(cx);
        if (!m) return;
        const opts = parseTextEffectParams(m[1]);
        animateText(el, opts);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCsmTextEffects);
  } else {
    initCsmTextEffects();
  }
