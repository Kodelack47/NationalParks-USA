# The Eco-Life: National Parks USA

A responsive website for exploring America's outdoors: search more than 350 U.S. national parks,
browse a guide to New Hampshire's 48 four-thousand-foot peaks, and request a guided hike.

**[View the live site →](https://kodelack47.github.io/NationalParks-USA/)**

## Features

- **National park search:** filter all 359 parks, monuments, and historic sites by state or
  territory, park type, and keyword. Results update as you type and include the address, phone,
  official website, and a map link.
- **Mountains guide:** all 48 White Mountain peaks over 4,000 feet. Pick one or tap a card to see
  its photo, elevation, effort level, and description. Sort by name or elevation.
- **Tour booking:** a validated form (name, email, phone, group size, hike, date) with clear
  error messages and a confirmation. It's a front-end demo, so nothing is sent to a server.
- **Works on any screen:** one shared stylesheet with layouts for phones, tablets, and desktops,
  plus a Menu button for phone navigation.

## Pages

| Page | File |
|---|---|
| Home (hero, eco vlogs, photo gallery) | `index.html` |
| Find a national park | `nationalParks.html` |
| Mountains guide | `mountains.html` |
| Book a tour | `booking.html` |
| About | `about.html` |
| Terms and conditions | `terms.html` |

## How it's built

- **HTML, CSS, and vanilla JavaScript**, with no frameworks or build step.
- Data lives in plain JavaScript files: `nationalParksData.js` (359 parks), `mountainsData.js`
  (48 peaks), `locationData.js` (states and territories), and `parkTypeData.js`.
- Each page has a small script (`parks.js`, `mountains.js`, `booking.js`) and shares `site.js`
  for the phone menu.
- Park and mountain data is inserted with `textContent`, never as raw HTML.
- Photos are sized for the web (the two large photos went from 6.4 MB to under 1 MB).

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Author

**Ousmana Tunkara** · [GitHub @Kodelack47](https://github.com/Kodelack47)

Licensed under the [MIT License](LICENSE).
