const FONT_FORMATS = {
  '.ttf': 'truetype',
  '.otf': 'opentype',
  '.woff': 'woff',
  '.woff2': 'woff2',
  '.eot': 'embedded-opentype',
  '.svg': 'svg',
};

function getFontFormat(url) {
  const ext = url.match(/\.\w+$/);
  if (!ext) return '';
  return FONT_FORMATS[ext[0].toLowerCase()] || '';
}

function parseFontDef(str) {

  const font = {
    name: '',
    url: '',
    stretch: 'normal',
    style: 'normal',
    weight: 'normal',
  };

  const nameMatch = str.match(/'([^']+)'/);
  const urlMatch = str.match(/url\(([^)]+)\)/);

  if (nameMatch) font.name = nameMatch[1];
  if (urlMatch) font.url = urlMatch[1];

  const stretchMatch = str.match(/stretch:\s*([^;]+)/);
  const styleMatch = str.match(/style:\s*([^;]+)/);
  const weightMatch = str.match(/weight:\s*([^;]+)/);

  if (stretchMatch) font.stretch = stretchMatch[1].trim();
  if (styleMatch) font.style = styleMatch[1].trim();
  if (weightMatch) font.weight = weightMatch[1].trim();

  return font;
}

function fontFaceCSS(font) {
  const format = getFontFormat(font.url);
  const formatStr = format ? ` format('${format}')` : '';
  return `
@font-face {
  font-family: '${font.name}';
  src: url('${font.url}')${formatStr};
  font-stretch: ${font.stretch};
  font-style: ${font.style};
  font-weight: ${font.weight};
}
`.trim();
}

function injectFontsFromConfig() {

  const fontDefs = Array.from(
    document.querySelectorAll('define[font]')
  );

  if (!fontDefs.length) return;

  const css = fontDefs
    .map((el) => parseFontDef(el.getAttribute('font')))
    .map(fontFaceCSS)
    .join('\n\n');

  let styleTag = document.getElementById('fonts');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'fonts';
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = css;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectFontsFromConfig);
} else {
  injectFontsFromConfig();
}
