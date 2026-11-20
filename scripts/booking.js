/* Author: Ousmana Tunkara · github.com/Kodelack47 · National Parks USA */
/* Tour booking form: validates each field, then shows a confirmation.
   This is a front-end demo, so nothing is sent to a server. */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const confirmation = document.getElementById("confirmation");
  const date = document.getElementById("date");
  const tour = document.getElementById("tour");

  // Offer every mountain as a guided-hike option
  [...mountainsArray]
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((m) => tour.add(new Option(`Guided hike: ${m.name}`, m.name)));

  // Tours can be booked from tomorrow onward
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  date.min = iso(tomorrow);

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Please enter a valid email address."),
    phone: (v) => (v.replace(/\D/g, "").length >= 10 ? "" : "Please enter a phone number with at least 10 digits."),
    tour: (v) => (v ? "" : "Please choose a tour."),
    date: (v) => (v && v >= date.min ? "" : "Please pick a date from tomorrow onward."),
    guests: (v) => (Number(v) >= 1 && Number(v) <= 12 ? "" : "Groups can be 1 to 12 people."),
  };

  function check(field) {
    const message = rules[field.name](field.value);
    const error = document.getElementById(`${field.name}-error`);
    error.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  Object.keys(rules).forEach((name) => {
    form.elements[name].addEventListener("blur", (e) => check(e.target));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = Object.keys(rules).map((name) => form.elements[name]);
    const valid = fields.map(check).every(Boolean);
    if (!valid) {
      fields.find((f) => f.getAttribute("aria-invalid") === "true").focus();
      return;
    }

    const when = new Date(form.elements.date.value + "T12:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const guests = Number(form.elements.guests.value);
    confirmation.replaceChildren();
    const title = document.createElement("strong");
    title.textContent = `Thanks, ${form.elements.name.value.trim()}! Your request is in.`;
    const detail = document.createElement("p");
    detail.style.margin = "6px 0 0";
    detail.textContent = `${tour.selectedOptions[0].text} on ${when} for ${guests} ${guests === 1 ? "person" : "people"}. We'll confirm by email at ${form.elements.email.value}.`;
    confirmation.append(title, detail);
    confirmation.hidden = false;
    confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
    form.reset();
  });
});
