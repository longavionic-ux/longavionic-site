function login() {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!user || !pass) {
    alert("Please enter username and password");
    return;
  }

  // 统一密码
  const MASTER_PASSWORD = "cats2026";

  if (pass !== MASTER_PASSWORD) {
    alert("Invalid username or password");
    return;
  }

  // 记录登录用户（可选，方便以后审计）
  sessionStorage.setItem("memberUser", user);

  // ===== Discord 群跳转 =====
  if (user === "Longavionic1" || user === "CATSSupport1") {
    // 内部 / CATS
    window.location.href = "https://discord.gg/7cERtwaH";
  } 
  else if (user === "Setnix1") {
    window.location.href = "https://discord.gg/7cERtwaH";
  } 
  else if (user === "Aero1") {
    window.location.href = "https://discord.gg/QtQSEhPPZ";
  } 
  else if (user === "Skysmart1") {
    window.location.href = "https://discord.gg/TjHjXW7fD";
  } 
  else {
    alert("Account not configured");
  }
}