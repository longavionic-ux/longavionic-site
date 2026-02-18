function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "" || pass === "") {
    alert("Please enter username and password");
    return;
  }

  if (user !== pass) {
    alert("Invalid credentials");
    return;
  }

  // 权限矩阵
  const accessMap = {
    "CATS Support1": ["cats", "aero", "setnix", "skysmart"],
    "Longavionic1": ["cats", "aero", "setnix", "skysmart"],

    "Aero Instruments 1": ["aero"],
    "Setnix 1": ["setnix"],
    "Skysmart 1": ["skysmart"]
  };

  if (!accessMap[user]) {
    alert("Account not authorized");
    return;
  }

  // 保存会话
  sessionStorage.setItem("memberUser", user);
  sessionStorage.setItem("memberAccess", JSON.stringify(accessMap[user]));

  // 登录后跳转规则
  if (accessMap[user].length > 1) {
    window.location.href = "member-cats.html"; 
  } else {
    const target = accessMap[user][0];
    window.location.href = `member-${target}.html`;
  }
}
