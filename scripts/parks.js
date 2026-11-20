/* Author: Ousmana Tunkara · github.com/Kodelack47 · National Parks USA */
/* National Parks search: filter all parks by state, park type, and keyword.
   Data comes from nationalParksData.js, locationData.js and parkTypeData.js. */

document.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("state");
  const typeSelect = document.getElementById("parkType");
  const keywordInput = document.getElementById("keyword");
  const resetButton = document.getElementById("reset");
  const results = document.getElementById("results");
  const count = document.getElementById("count");

  // Fill the dropdowns
  locationsArray.forEach((state) => stateSelect.add(new Option(state, state)));
  parkTypesArray.forEach((type) => typeSelect.add(new Option(type, type)));

  // Small helper so park data is always inserted as text, never as HTML
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function parkCard(park) {
    const card = el("article", "card");
    const body = el("div", "card-body");

    body.append(el("h3", "", park.LocationName));

    const address = [park.Address, `${park.City}, ${park.State} ${park.ZipCode || ""}`.trim()]
      .filter((line) => line && String(line).trim() && line !== 0)
      .join("\n");
    const addr = el("p", "meta", address);
    addr.style.whiteSpace = "pre-line";
    body.append(addr);

    if (park.Phone) {
      const phone = el("p", "meta");
      const link = el("a", "", park.Phone);
      link.href = "tel:" + park.Phone.replace(/[^0-9+]/g, "");
      phone.append("Phone: ", link);
      body.append(phone);
    }

    const links = el("p", "");
    if (park.Visit) {
      const visit = el("a", "", "Official website ↗");
      visit.href = park.Visit;
      visit.target = "_blank";
      visit.rel = "noopener";
      links.append(visit);
    }
    if (park.Latitude && park.Longitude) {
      if (links.childNodes.length) links.append("  ·  ");
      const map = el("a", "", "Map ↗");
      map.href = `https://www.google.com/maps/search/?api=1&query=${park.Latitude},${park.Longitude}`;
      map.target = "_blank";
      map.rel = "noopener";
      links.append(map);
    }
    if (links.childNodes.length) body.append(links);

    card.append(body);
    return card;
  }

  function render() {
    const state = stateSelect.value;
    const type = typeSelect.value.toLowerCase();
    const keyword = keywordInput.value.trim().toLowerCase();

    const matches = nationalParksArray.filter((park) => {
      if (state && park.State !== state) return false;
      if (type && !park.LocationName.toLowerCase().includes(type)) return false;
      if (keyword) {
        const haystack = [park.LocationName, park.City, park.State, park.Address, park.LocationID]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(keyword)) return false;
      }
      return true;
    });

    results.replaceChildren(...matches.map(parkCard));
    const total = nationalParksArray.length;
    count.textContent = matches.length
      ? `Showing ${matches.length} of ${total} parks`
      : "No parks match those filters. Try a different state, type, or keyword.";
  }

  // Re-filter as soon as anything changes
  stateSelect.addEventListener("change", render);
  typeSelect.addEventListener("change", render);
  let typingTimer;
  keywordInput.addEventListener("input", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(render, 150);
  });
  resetButton.addEventListener("click", () => {
    stateSelect.value = "";
    typeSelect.value = "";
    keywordInput.value = "";
    render();
  });

  render();
});
