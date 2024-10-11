<template>
  <div class="background-container">
    <nav class="navbar">
      <div class="logo">魔聲仔</div>
      <ul class="nav-links">
        <li><router-link to="/">上傳影片</router-link></li>
        <li><router-link to="/UserReport">結果分析</router-link></li>
        <li><router-link to="/UserHistory">歷史紀錄</router-link></li>
      </ul>
      <button class="menu">&#9776;</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
// function showSidebar() {
//   const sidebar = document.querySelector(".sidebar");
//   sidebar.style.display = "flex";
// }
// function hideSidebar() {
//   const sidebar = document.querySelector(".sidebar");
//   sidebar.style.display = "none";
// }
</script>

<style>
@font-face {
  font-family: "ttt";
  src: url(../src/assets/font-size/JasonHandwriting4.woff) format("woff");
}
* {
  margin: 0;
  padding: 0;
  font-family: "ttt";
  letter-spacing: 3px;
}
body {
  background-image: url("./assets/image/starry\ sky.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: hsla(282, 18%, 39%, 0.7);
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-links li {
  text-transform: uppercase;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  border-bottom: 2px solid white;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #ffebb7;
  border-bottom: 2px solid #ffebb7;
}
.menu {
  display: none;
}
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    background-color: #333;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 1rem 0;
  }

  .nav-links.open {
    display: flex;
  }

  .menu {
    display: block;
    background-color: transparent;
    color: white;
    font-size: 30px;
    position: absolute;
    right: 20px;
    border: none;
    cursor: pointer;
  }
}
</style>
