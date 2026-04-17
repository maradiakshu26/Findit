const BASE_URL = "http://localhost:5000";

// default type
let itemType = "lost";

// ✅ set lost / found type with UI update
function setType(type) {
  itemType = type;
  console.log("Selected type:", itemType);

  // reset buttons UI (important for user feedback)
  const lostBtn = document.getElementById("btn-lost");
  const foundBtn = document.getElementById("btn-found");

  if (lostBtn && foundBtn) {
    lostBtn.classList.remove("active");
    foundBtn.classList.remove("active");

    if (type === "lost") {
      lostBtn.classList.add("active");
    } else {
      foundBtn.classList.add("active");
    }
  }
}

// ✅ MAIN SUBMIT FUNCTION
async function submitPost() {

  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();
  const location = document.getElementById("location").value.trim();
  const date = document.getElementById("date").value;
  const contact = document.getElementById("contact").value.trim();
  const image = document.getElementById("photo").files[0];

  const token = localStorage.getItem("token");

  // 🔐 auth check
  if (!token) {
    alert("⚠️ Please login first!");
    return;
  }

  // 🧾 validation
  if (!title || !category || !description || !location || !date || !contact) {
    alert("⚠️ Please fill all required fields");
    return;
  }

  // 🔥 IMPORTANT: ensure type is valid
  if (!itemType || (itemType !== "lost" && itemType !== "found")) {
    alert("⚠️ Please select Lost or Found");
    return;
  }

  // 📦 form data
  const formData = new FormData();
  formData.append("type", itemType);
  formData.append("title", title);
  formData.append("category", category);
  formData.append("description", description);
  formData.append("location", location);
  formData.append("date", date);
  formData.append("contact", contact);

  if (image) {
    formData.append("image", image);
  }

  try {
    const res = await fetch(`${BASE_URL}/api/items`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formData
    });

    const data = await res.json();

    console.log("Server response:", data);

    if (res.ok && data.success !== false) {
      alert("✅ Item posted successfully!");
      window.location.href = "index.html";
    } else {
      alert("❌ " + (data.message || "Failed to post item"));
    }

  } catch (err) {
    console.error("Error:", err);
    alert("❌ Cannot connect to server");
  }
}