// Filter by category
function filterCategory(category) {
  window.location.href = 'lost.html?category=' + category;
}

// Search items
function searchItems() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    alert('Please type something to search!');
    return;
  }
  window.location.href = 'lost.html?search=' + query;
}

// ========================
// SAMPLE DATA
// ========================

const sampleItems = [
  {
    id: 1,
    type: 'lost',
    title: 'Black Leather Wallet',
    category: 'Wallet',
    description: 'Lost near City Mall food court. Contains ID cards and some cash.',
    location: 'City Mall, MG Road',
    date: '2025-03-10',
    icon: '👛',
    resolved: false
  },
  {
    id: 2,
    type: 'found',
    title: 'iPhone 13 Blue',
    category: 'Electronics',
    description: 'Found at the bus stop near Central Park. Screen has a small crack.',
    location: 'Central Park Bus Stop',
    date: '2025-03-11',
    icon: '📱',
    resolved: false
  },
  {
    id: 3,
    type: 'lost',
    title: 'Golden Retriever - Max',
    category: 'Pets',
    description: 'My dog Max went missing from Indiranagar. He is friendly with a blue collar.',
    location: 'Indiranagar, Bengaluru',
    date: '2025-03-12',
    icon: '🐾',
    resolved: false
  },
  {
    id: 4,
    type: 'found',
    title: 'Set of House Keys',
    category: 'Keys',
    description: 'Found a keychain with 4 keys and a small Doraemon keyring.',
    location: 'Cubbon Park',
    date: '2025-03-13',
    icon: '🔑',
    resolved: true
  },
  {
    id: 5,
    type: 'lost',
    title: 'Blue JanSport Backpack',
    category: 'Bags',
    description: 'Left my backpack on the metro. Contains laptop and notebooks.',
    location: 'Majestic Metro Station',
    date: '2025-03-14',
    icon: '🎒',
    resolved: false
  },
  {
    id: 6,
    type: 'found',
    title: 'Driving License',
    category: 'Documents',
    description: 'Found a wallet with important documents near Brigade Road.',
    location: 'Brigade Road',
    date: '2025-03-15',
    icon: '📄',
    resolved: false
  }
];

// ========================
// RENDER ITEM CARDS
// ========================

function renderItems(items) {
  const grid = document.getElementById('itemsGrid');

  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = '<p style="text-align:center; color:#6B7280; padding:2rem;">No items found.</p>';
    return;
  }

  grid.innerHTML = items.map(function(item) {
    return '<a href="item.html?id=' + item.id + '" class="item-card">' +
      '<div class="card-image">' + item.icon + '</div>' +
      '<div class="card-body">' +
        '<div class="card-tags">' +
          '<span class="tag tag-' + item.type + '">' +
            (item.type === 'lost' ? '🔴 Lost' : '🟢 Found') +
          '</span>' +
          '<span class="tag tag-category">' + item.category + '</span>' +
          (item.resolved ? '<span class="resolved-badge">✅ Resolved</span>' : '') +
        '</div>' +
        '<div class="card-title">' + item.title + '</div>' +
        '<div class="card-desc">' + item.description + '</div>' +
        '<div class="card-meta">' +
          '<span>📍 ' + item.location + '</span>' +
          '<span>📅 ' + formatDate(item.date) + '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }).join('');
}

// ========================
// FORMAT DATE
// ========================

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// ========================
// SWITCH TABS
// ========================

function switchTab(filter, btn) {
  // Remove active from all tabs
  document.querySelectorAll('.tab').forEach(function(tab) {
    tab.classList.remove('active');
  });

  // Add active to clicked tab
  btn.classList.add('active');

  // Filter items
  if (filter === 'all') {
    renderItems(sampleItems);
  } else {
    const filtered = sampleItems.filter(function(item) {
      return item.type === filter;
    });
    renderItems(filtered);
  }
}

// ========================
// ON PAGE LOAD
// ========================

document.addEventListener('DOMContentLoaded', function() {
  renderItems(sampleItems);
});
