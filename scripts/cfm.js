document.addEventListener('DOMContentLoaded', function () {

  function processGoogleFonts() {
    const fontSet = new Set();
    const re = /g\(\s*([^)]+?)\s*\)/gi;

    document.querySelectorAll('[cx]').forEach(el => {
      const cx = el.getAttribute('cx') || '';
      let m;
      while ((m = re.exec(cx))) {
        fontSet.add(m[1].trim());
      }
    });
    if (fontSet.size === 0) return;

    const families = Array.from(fontSet).map(name =>
      encodeURIComponent(name).replace(/%20/g, '+')
    );
    const href =
      'https://fonts.googleapis.com/css2?' +
      families.map(f => `family=${f}`).join('&') +
      '&display=swap';

    if (!document.querySelector(`link[data-google-fonts][href="${href}"]`)) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', href);
      link.setAttribute('data-google-fonts', 'true');
      document.head.appendChild(link);
    }
  }

  const FONT_FORMATS = {
    '.woff2': 'woff2',
    '.woff': 'woff',
    '.ttf': 'truetype',
    '.otf': 'opentype',
    '.eot': 'embedded-opentype',
    '.svg': 'svg'
  };

  const usedNames = new Set();
  function slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
  }
  function getFileName(url) {
    const m = url.match(/([^\/?#]+)(?:[?#].*)?$/);
    return m ? m[1] : '';
  }
  function getNiceFontFamily(base) {
    let name = slugify(base) || 'webfont';
    const orig = name;
    let idx = 1;
    while (usedNames.has(name)) {
      name = `${orig}-${++idx}`;
    }
    usedNames.add(name);
    return name;
  }

  const urlToFamily = Object.create(null);
  const familyToFont = Object.create(null);

  function registerFontFromURL(url, fallbackName) {
    if (urlToFamily[url]) return urlToFamily[url];
    let familyName;
    if (fallbackName) {
      let fb = fallbackName
        .split(',')[0]
        .trim()
        .replace(/^['"]|['"]$/g, '');
      if (fb && !/url\(/i.test(fb)) {
        familyName = getNiceFontFamily(fb);
      }
    }
    if (!familyName) {
      const fn = getFileName(url);
      familyName = getNiceFontFamily(
        fn.replace(/\.[a-z0-9]+$/i, '') || 'webfont'
      );
    }
    urlToFamily[url] = familyName;

    let format = 'truetype';
    const ext = url.match(/\.[a-z0-9]+(\?.*)?$/i);
    if (ext) {
      const key = ext[0].split('?')[0].toLowerCase();
      if (FONT_FORMATS[key]) format = FONT_FORMATS[key];
    }
    familyToFont[familyName] = { url, format };
    injectFontFaces();
    return familyName;
  }

  function injectFontFaces() {
    if (!Object.keys(familyToFont).length) return;
    let css = '';
    for (const family in familyToFont) {
      const { url, format } = familyToFont[family];
      css +=
        `@font-face{font-family:'${family}';` +
        `src:url('${url}') format('${format}');` +
        `font-display:swap;}\n`;
    }
    let style = document.querySelector('style[data-url-font-manager]');
    if (!style) {
      style = document.createElement('style');
      style.setAttribute('data-url-font-manager', 'true');
      document.head.appendChild(style);
    }
    style.textContent = css;
  }

  function processCatciFontFamilies() {
    const style = document.getElementById('catci');
    if (!style) return;

    let cssText = style.textContent;
    cssText = cssText.replace(
      /(\.catci-[\w-]+\s*\{[^}]*?)font-family\s*:\s*([^;]+);/gi,
      function (whole, ruleStart, fontFamilyValue) {
        const parts = [];
        const re = /url\((['"]?)(.*?)\1\)|[^,]+/g;
        let m;
        while ((m = re.exec(fontFamilyValue))) {
          if (m[0].startsWith('url(')) {
            parts.push(m[0]);
          } else if (m[0].trim()) {
            parts.push(m[0].trim());
          }
        }

        let familyName = null;
        let fallback = null;
        if (parts.length) {
          if (/^url\(/i.test(parts[0])) {
            const urlMatch = parts[0].match(/url\((['"]?)(.*?)\1\)/i);
            if (urlMatch) {
              familyName = registerFontFromURL(urlMatch[2],
                fontFamilyValue);
            }
            for (let i = 1; i < parts.length; ++i) {
              let p = parts[i].trim().replace(/^['"]|['"]$/g, '');
              if (
                /^(sans-serif|serif|monospace|cursive|fantasy|system-ui)$/i
                  .test(p)
              ) {
                fallback = p;
                break;
              }
            }
          } else {
            familyName = parts[0];
          }
        }

        const newRule =
          `font-family: '${familyName}';` +
          (fallback ? ` font-style: ${fallback};` : '');
        return ruleStart + newRule;
      }
    );
    style.textContent = cssText;
  }

  function processCxFontFamilies() {
    document.querySelectorAll('[cx]').forEach(el => {
      const cx = el.getAttribute('cx') || '';
      cx.split(';')
        .map(s => s.trim())
        .filter(Boolean)
        .forEach(decl => {
          const [prop, val] = decl.split(':').map(s => s.trim());
          if (prop !== 'ff') return;

          const googleMatch = val.match(/^g\(\s*(.+?)\s*\)$/i);
          if (googleMatch) {
            const fontName = googleMatch[1];
            el.style.setProperty('font-family', `'${fontName}'`);
            return;
          }

          if (/^url\(/i.test(val)) {
            const urlM = val.match(/url\((['"]?)(.*?)\1\)/i);
            if (urlM) {
              const fam = registerFontFromURL(urlM[2]);
              el.style.setProperty('font-family', `'${fam}'`);
            }
            return;
          }

          el.style.setProperty('font-family', val);
        });
    });
  }

  processGoogleFonts();
  processCatciFontFamilies();
  processCxFontFamilies();
});
