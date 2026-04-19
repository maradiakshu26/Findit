const BASE_URL = "http://localhost:5000";

// Show message
function showMsg(type, message) {
  const errorEl = document.getElementById('errorMsg');
  const successEl = document.getElementById('successMsg');

  errorEl.textContent = '';
  successEl.textContent = '';

  if (type === 'error') {
    errorEl.textContent = message;
  } else {
    successEl.textContent = message;
  }
}

// Handle register
async function handleRegister() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;

  if (!name) return showMsg('error', '⚠️ Please enter your name.');
  if (!email || !email.includes('@')) return showMsg('error', '⚠️ Enter valid email.');
  if (password.length < 6) return showMsg('error', '⚠️ Password too short.');
  if (password !== confirmPassword) return showMsg('error', '⚠️ Password mismatch.');
  if (!terms) return showMsg('error', '⚠️ Accept terms.');

  const btn = document.querySelector('.btn-submit');
  btn.disabled = true;
  btn.textContent = 'Creating account...';

  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);

      showMsg('success', '✅ Account created! Redirecting...');

      setTimeout(() => {
        window.location.href = "/login.html";
      }, 1500);

    } else {
      showMsg('error', data.message || "Registration failed");
    }

  } catch (err) {
    console.error(err);
    showMsg('error', '❌ Cannot connect to server');
  }

  // ✅ Always reset button
  btn.disabled = false;
  btn.textContent = 'Create Account';
}

// Google signup placeholder
function googleRegister() {
  alert("Google signup not implemented yet");
}
