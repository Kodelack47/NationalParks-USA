/* Author: Ousmana Tunkara · github.com/Kodelack47 · National Parks USA */
/* Mountains guide: pick a peak from the list (or click a card) to see its details.
   Data comes from mountainsData.js. */

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("mountain");
  const detail = document.getElementById("mountain-detail");
  const grid = document.getElementById("peaks");
  const sort = document.getElementById("sort");

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  const feet = (n) => `${Number(n).toLocaleString()} ft`;

  // Fill the dropdown in alphabetical order
  [...mountainsArray]
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((m) => select.add(new Option(`${m.name} (${feet(m.elevation)})`, m.name)));

  function showMountain(name, scroll) {
    const m = mountainsArray.find((x) => x.name === name);
    if (!m) {
      detail.hidden = true;
      return;
    }
    select.value = m.name;

    const img = el("img");
    img.src = `images/${m.img}`;
    img.alt = `View of ${m.name}`;
    img.width = 335;
    img.height = 220;

    const info = el("div");
    info.append(el("h2", "", m.name));
    const stats = el("div", "stats");
    stats.append(el("span", "badge", `Elevation: ${feet(m.elevation)}`), el("span", "badge", `Effort: ${m.effort}`));
    info.append(stats, el("p", "", m.desc));
    if (m.coords) {
      const map = el("a", "btn btn-primary", "View on map ↗");
      map.href = `https://www.google.com/maps/search/?api=1&query=${m.coords.lat},${m.coords.lng}`;
      map.target = "_blank";
      map.rel = "noopener";
      info.append(map);
    }

    detail.replaceChildren(img, info);
    detail.hidden = false;
    if (scroll) detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderGrid() {
    const list = [...mountainsArray];
    if (sort.value === "high") list.sort((a, b) => b.elevation - a.elevation);
    else if (sort.value === "low") list.sort((a, b) => a.elevation - b.elevation);
    else list.sort((a, b) => a.name.localeCompare(b.name));

    grid.replaceChildren(
      ...list.map((m) => {
        const card = el("button", "card peak-card");
        card.type = "button";
        const img = el("img");
        img.src = `images/${m.img}`;
        img.alt = "";
        img.loading = "lazy";
        const body = el("div", "card-body");
        body.append(el("h3", "", m.name), el("p", "meta", `${feet(m.elevation)} · ${m.effort}`));
        card.append(img, body);
        card.addEventListener("click", () => showMountain(m.name, true));
        return card;
      })
    );
  }

  select.addEventListener("change", () => showMountain(select.value, false));
  sort.addEventListener("change", renderGrid);
  renderGrid();
});
