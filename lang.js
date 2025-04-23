function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function parseCSV(text) {
  return text
    .trim()
    .split("\n")
    .map(row => row.split(",").map(cell => cell.trim()));
}
function arrayToTable(arr) {
  const table = document.createElement("table");
  arr.forEach((row, i) => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const cellEl = i === 0 ? document.createElement("th")
                             : document.createElement("td");
      cellEl.textContent = cell;
      tr.appendChild(cellEl);
    });
    table.appendChild(tr);
  });
  return table;
}

(async function () {

  const mdScripts = [
    "https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js",
    "https://cdn.jsdelivr.net/npm/markdown-it-footnote/dist/markdown-it-footnote.min.js",
    "https://cdn.jsdelivr.net/npm/markdown-it-deflist/dist/markdown-it-deflist.min.js",
    "https://cdn.jsdelivr.net/npm/markdown-it-task-lists/dist/markdown-it-task-lists.min.js",
    "https://cdn.jsdelivr.net/npm/markdown-it-emoji/dist/markdown-it-emoji.min.js"
  ];
  for (const src of mdScripts) {
    try {
      await loadScript(src);
    } catch (err) {
      console.error("Failed to load script:", src, err);
      return;
    }
  }
  const md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true
  })
    .use(window.markdownitFootnote)
    .use(window.markdownitDeflist)
    .use(window.markdownitTaskLists, { enabled: true, label: true })
    .use(window.markdownitEmoji);

  const mdEls = document.querySelectorAll('ext[lang="markdown"]');
  await Promise.all(Array.from(mdEls).map(async el => {
    let markdown;
    const src = el.getAttribute("src");
    if (src) {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(res.statusText);
        markdown = await res.text();
      } catch (e) {
        console.error("Failed to fetch markdown:", src, e);
        markdown = `Error loading ${src}: ${e.message}`;
      }
    } else {
      markdown = el.textContent;
    }
    el.innerHTML = md.render(markdown);
    el.querySelectorAll("a").forEach(a => {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  }));

  const csvEls = document.querySelectorAll('ext[lang="csv"]');
  await Promise.all(Array.from(csvEls).map(async el => {
    let csvText = "";
    const src = el.getAttribute("src");
    if (src) {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(res.statusText);
        csvText = await res.text();
      } catch (e) {
        console.error("Failed to load CSV:", src, e);
        el.innerHTML = '<span style="color:red">Failed to load CSV</span>';
        return;
      }
    } else {
      csvText = el.textContent;
    }
    const data = parseCSV(csvText);
    const table = arrayToTable(data);
    el.innerHTML = "";
    el.appendChild(table);
  }));

  const tagMap = {
    description(node) {
      const p = document.createElement("p");
      p.textContent = node.textContent;
      return p;
    },
    author(node) {
      const addr = document.createElement("address");
      addr.textContent = node.textContent;
      return addr;
    },
    category(node) {
      const span = document.createElement("span");
      span.className = "rss-category";
      span.textContent = node.textContent;
      return span;
    },
    comments(node) {
      const a = document.createElement("a");
      a.href = node.textContent;
      a.textContent = "Comments";
      return a;
    },
    enclosure(node) {
      const url = node.getAttribute("url") || "";
      const type = node.getAttribute("type") || "";
      if (type.startsWith("audio")) {
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = url;
        return audio;
      }
      if (type.startsWith("video")) {
        const video = document.createElement("video");
        video.controls = true;
        video.src = url;
        return video;
      }
      return document.createElement("span");
    },
    guid(node) {
      const meta = document.createElement("meta");
      meta.name = "rss-guid";
      meta.content = node.textContent;
      return meta;
    },
    pubDate(node) {
      const time = document.createElement("time");
      time.dateTime = new Date(node.textContent).toISOString();
      time.textContent = node.textContent;
      return time;
    },
    source(node) {
      const cite = document.createElement("cite");
      const href = node.getAttribute("url");
      if (href) {
        const a = document.createElement("a");
        a.href = href;
        a.textContent = node.textContent;
        cite.appendChild(a);
      } else {
        cite.textContent = node.textContent;
      }
      return cite;
    }
  };
  function renderItem(item) {
    const wrap = document.createElement("div");
    wrap.className = "rss-item";

    const t = item.querySelector("title");
    const l = item.querySelector("link");
    if (t) {
      const h3 = document.createElement("h3");
      const a = document.createElement("a");
      a.textContent = t.textContent;
      a.href = l ? l.textContent : "#";
      h3.appendChild(a);
      wrap.appendChild(h3);
    }

    Array.from(item.children).forEach(c => {
      const n = c.nodeName.toLowerCase();
      if (n === "title" || n === "link") return;
      const fn = tagMap[n];
      if (fn) wrap.appendChild(fn(c));
    });
    wrap.querySelectorAll("a").forEach(a => {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
    return wrap;
  }

  const rssEls = document.querySelectorAll('ext[lang="rss"]');
  rssEls.forEach(feed => {
    const loadFeed = () => {
      const url = feed.getAttribute("src");
      if (!url) return;
      const nonce = Math.random().toString(36).slice(2);
      fetch(`${url}?=${nonce}`)
        .then(r => r.text())
        .then(xml => {
          const doc = new DOMParser()
            .parseFromString(xml, "application/xml");
          const items = Array.from(doc.querySelectorAll("item"));
          feed.innerHTML = "";
          items.forEach(it => {
            feed.appendChild(renderItem(it));
          });
        })
        .catch(e => {
          console.error("RSS load error:", e);
          feed.textContent = "Failed to load RSS feed.";
        });
    };
    loadFeed();
    setInterval(loadFeed, 15000);
  });
})();