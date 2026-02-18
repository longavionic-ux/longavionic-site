function login() {
  // 与 index.html 的 id 对齐
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!user || !pass) {
    alert("Please enter username and password");
    return;
  }

  // 账号规则：用户名 = 密码
  if (user !== pass) {
    alert("Invalid username or password");
    return;
  }

  // 记录登录用户
  sessionStorage.setItem("memberUser", user);

  // 进入聊天页面（默认 setnix 群）
  window.location.href = "chat.html?group=setnix";
}
