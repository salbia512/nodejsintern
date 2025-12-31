if (window.location.pathname.includes("dashboard")) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}

function login() {
  // 1. Get values user typed
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 2. Send request to backend
  fetch("https://nodejsintern.vercel.app/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    // 3. Handle backend response
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("message").innerText = data.message;
    }
  })
  .catch(error => {
    console.error(error);
  });
}
function loadProfile() {
  const token = localStorage.getItem("token");

  fetch("https://nodejsintern.vercel.app/api/profile", {
    method: "GET",
    headers: {
      Authorization: token
    }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("output").innerText =
      JSON.stringify(data, null, 2);
  });
}
function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://nodejsintern.vercel.app/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("message").innerText = data.message;
  });
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
