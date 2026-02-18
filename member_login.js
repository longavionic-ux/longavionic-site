function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Please enter username and password");
    return;
  }

  // 当前阶段：密码 = 账号
  if (user !== pass) {
    alert("Invalid credentials");
    return;
  }

  // 权限表（核心）
  const permissionMap = {
    "CATS Support1": ["cats", "aero", "setnix", "skysmart"],
    "Longavionic1": ["cats", "aero", "setnix", "skysmart"],

    "Aero Instruments 1": ["aero"],
    "Setnix 1": ["setnix"],
    "Skysmart 1": ["skysmart"]
  };

  const access = permissionMap[user];

  if (!access) {
    alert("No permission assigned");
    return;
  }

  // 写入 session
  sessionStorage.setItem("memberUser", user);
  sessionStorage.setItem("memberAccess", JSON.stringify(access));

  // 自动跳转到第一个可访问页面
  const redirectMap = {
    "cats": "member-cats.html",
    "aero": "member-aero.html",
    "setnix": "member-setnix.html",
    "skysmart": "member-skysmart.html"
  };

  for (let role of access) {
    if (redirectMap[role]) {
      window.location.href = redirectMap[role];
      return;
    }
  }

  alert("No valid page to redirect");
}
