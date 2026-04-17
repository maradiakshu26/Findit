// ===========================
//  FINDIT — API HELPER
// ===========================

const API_URL = "http://localhost:5000/api";

// ===========================
//  TOKEN
// ===========================

function getToken() {
  return localStorage.getItem('token');
}

function saveUser(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '../index.html';
}

function isLoggedIn() {
  return getToken() !== null;
}

// ===========================
//  AUTH
// ===========================

async function apiRegister(name, email, password) {
  try {
    const res = await fetch(API_URL + '/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    return await res.json();
  } catch {
    return { success: false, message: "Server error" };
  }
}

async function apiLogin(email, password) {
  try {
    const res = await fetch(API_URL + '/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch {
    return { success: false, message: "Server error" };
  }
}

// ===========================
//  ITEMS
// ===========================

async function apiGetItems(filters = {}) {
  let query = new URLSearchParams(filters).toString();
  try {
    const res = await fetch(API_URL + '/items?' + query);
    return await res.json();
  } catch {
    return { success: false };
  }
}

async function apiGetItem(id) {
  try {
    const res = await fetch(API_URL + '/items/' + id);
    return await res.json();
  } catch {
    return { success: false };
  }
}

async function apiCreateItem(formData) {
  try {
    const res = await fetch(API_URL + '/items', {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken()
      },
      body: formData
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}

// ===========================
//  NAVBAR
// ===========================

function updateNavbar() {
  const user = getUser();
  const loginLink = document.querySelector('.btn-login');

  if (!loginLink) return;

  if (user) {
    loginLink.textContent = '👤 ' + user.name;
    loginLink.onclick = () => {
      if (confirm("Logout?")) logoutUser();
    };
  }
}

document.addEventListener("DOMContentLoaded", updateNavbar);