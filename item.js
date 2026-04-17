const BASE_URL = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("detailContent");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p>❌ Item not found</p>";
    return;
  }

  container.innerHTML = "<p>⏳ Loading...</p>";

  try {
    const res = await fetch(`${BASE_URL}/api/items/${id}`);

    if (!res.ok) {
      throw new Error("Server error: " + res.status);
    }

    const data = await res.json();

    if (!data.success) {
      container.innerHTML = `<p>❌ ${data.message}</p>`;
      return;
    }

    const item = data.item;

    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = item.title;

    const desc = document.createElement("p");
    desc.textContent = item.description;

    const location = document.createElement("p");
    location.textContent = `📍 ${item.location}`;

    const date = document.createElement("p");
    date.textContent = `📅 ${item.date}`;

    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(location);
    container.appendChild(date);

    if (item.image_url) {
      const img = document.createElement("img");
      img.src = BASE_URL + item.image_url;
      img.width = 300;
      container.appendChild(img);
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>❌ Failed to load item</p>";
  }
});