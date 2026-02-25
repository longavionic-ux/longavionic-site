function login() {
  // 与 portal.html / index.html 中的 input id 对齐
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!user || !pass) {
    alert("Please enter username and password");
    return;
  }

  // ===== 统一密码（后续只需要改这一行）=====
  const MASTER_PASSWORD = "cats2026";

  if (pass !== MASTER_PASSWORD) {
    alert("Invalid username or password");
    return;
  }

  // ===== 账号 → 页面映射（核心规则）=====
  const USER_ROUTE_MAP = {
    "Longavionic1": "member-cats.html",
    "CATSSupport1": "member-cats.html",
    "Setnix1": "member-setnix.html",
    "Aero1": "member-aero.html",
    "Skysmart1": "member-skysmart.html"
  };

  const targetPage = USER_ROUTE_MAP[user];

  if (!targetPage) {
    alert("Account not configured");
    return;
  }

  // 记录登录用户（将来如需显示 welcome 信息可用）
  sessionStorage.setItem("memberUser", user);

  // 跳转到对应页面
  window.location.href = targetPage;
}