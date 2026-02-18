function login() {
  const user = document.getElementById("memberUser").value.trim();
  const pass = document.getElementById("memberPass").value.trim();

  if (!user || !pass) {
    alert("Please enter username and password");
    return;
  }

  if (user !== pass) {
    alert("Invalid credentials");
    return;
  }

  let access = [];
  let redirect = "";

  switch (user.toLowerCase()) {
    case "cats support1":
    case "longavionic1":
      access = ["setnix", "aero", "skysmart"];
      redirect = "member-cats.html";
      break;

    case "setnix1":
      access = ["setnix"];
      redirect = "member-setnix.html";
      break;

    case "aero instruments1":
      access = ["aero"];
      redirect = "member-aero.html";
      break;

    case "skysmart1":
      access = ["skysmart"];
      redirect = "member-skysmart.html";
      break;

    default:
      alert("No permission assigned");
      return;
  }

  sessionStorage.setItem("memberUser", user);
  sessionStorage.setItem("memberAccess", JSON.stringify(access));

  window.location.href = redirect;
}
