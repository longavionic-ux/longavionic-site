function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Please enter username and password");
    return;
  }

  // 使用你之前的账号规则：用户名 = 密码
  if (user !== pass) {
    alert("Invalid username or password");
    return;
  }

  // 记录登录用户
  sessionStorage.setItem("memberUser", user);

  // 直接进入聊天
  window.location.href = "chat.html?group=setnix";
}
