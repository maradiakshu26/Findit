const BASE_URL = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", function () {

  const searchEl = document.getElementById('searchFilter');
  const categoryEl = document.getElementById('categoryFilter');
  const sortEl = document.getElementById('sortFilter');
  const grid = document.getElementById('itemsGrid');

  if (!grid) return;

  async function applyFilters() {
    const search = searchEl.value.trim();
    const category = categoryEl.value;
    const sort = sortEl.value;

    grid.innerHTML = '<p style="text-align:center;">Loading...</p>';

    try {
      const query = new URLSearchParams({
        type: 'found',
        search,
        category,
        sort
      });

      const res = await fetch(`${BASE_URL}/api/items?${query}`);
      const data = await res.json();

      if (!data.success) {
        grid.innerHTML = '<p style="color:red;">❌ ' + data.message + '</p>';
        return;
      }

      renderFoundItems(data.items);

    } catch (err) {
      console.error(err);
      grid.innerHTML = '<p style="color:red;">❌ Failed to load items</p>';
    }
  }

  function renderFoundItems(items) {
    if (items.length === 0) {
      grid.innerHTML = "<p>No items found</p>";
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="item-card">

        ${item.image_url 
          ? `<img src="${BASE_URL}${item.image_url}" style="width:100%; height:200px; object-fit:cover;">`
          : `<div style="height:200px; display:flex; align-items:center; justify-content:center;">📦</div>`
        }

        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <p>📍 ${item.location}</p>
        <p>📅 ${item.date}</p>

      </div>
    `).join('');
  }

  searchEl.addEventListener("input", applyFilters);
  categoryEl.addEventListener("change", applyFilters);
  sortEl.addEventListener("change", applyFilters);

  applyFilters();
});