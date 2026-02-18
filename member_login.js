// ===================================================
// Advanced Member Login & Routing
// DO NOT REMOVE OR MODIFY WITHOUT CONFIRMATION
// ===================================================

// Account & permission definition
const memberUsers = {
  "CATS Support1": {
    password: "CATS Support1",
    redirect: "member-cats.html"
  },
  "Longavionic1": {
    password: "Longavionic1",
    redirect: "member-cats.html"
  },
  "Aero Instruments 1": {
    password: "Aero Instruments 1",
    redirect: "member-aero.html"
  },
  "Setnix 1": {
    password: "Setnix 1",
    redirect: "member-setnix.html"
  },
  "Skysmart 1": {
    password: "Skysmart 1",
    redirect: "member-skysmart.html"
  }
};

// Login function
function memberLogin() {
  const usernameInput = document.getElementById("member-username");
  const passwordInput = document.getElementById("member-password");

  if (!usernameInput || !passwordInput) {
    alert("Login fields not found.");
    return;
  }

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!memberUsers[username]) {
    alert("Invalid account.");
    return;
  }

  if (memberUsers[username].password !== password) {
    alert("Invalid password.");
    return;
  }

  // Login success → redirect to dedicated member page
  window.location.href = memberUsers[username].redirect;
}
