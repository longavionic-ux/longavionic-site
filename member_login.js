function login() {
  // 与 index.html 的 id 对齐
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!user || !pass) {
    alert("Please enter username and password");
    return;
  }

  // ===== 统一密码（集中在这里，后续只改这一行）=====
  const MASTER_PASSWORD = "cats2026";  // ← 你可以随时改

  if (pass !== MASTER_PASSWORD) {
    alert("Invalid username or password");
    return;
  }

  // 记录登录用户
  sessionStorage.setItem("memberUser", user);

  // ===== 登录后跳转规则（只做跳转，不做权限）=====
  if (user === "Longavionic1" || user === "CATSSupport1") {
    window.location.href = "member-cats.html";
  } else if (user === "Setnix1") {
    window.location.href = "member-setnix.html";
  } else if (user === "Aero1") {
    window.location.href = "member-aero.html";
  } else if (user === "Skysmart1") {
    window.location.href = "member-skysmart.html";
  } else {
    alert("Account not configured");
  }
}
