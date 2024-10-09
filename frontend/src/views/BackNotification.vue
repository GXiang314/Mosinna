<template>
  <div class="container-notification">
    <div class="content-box-notification">
      <div class="title-section-notification">
        <p>基本資料</p>
      </div>
      <div class="content-section-notification"><p>123</p></div>
    </div>
    <div class="content-box-notification">
      <div class="title-section-notification">
        <p>案情資料</p>
      </div>
      <div class="content-section-notification"><p>123</p></div>
    </div>
    <div class="content-box-notification">
      <div class="title-section-notification">
        <p>註解說明(限輸入500個字)</p>
      </div>
      <div class="content-section-notification"><p>123</p></div>
    </div>
  </div>
</template>
<style>
.container-notification {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.content-box-notification {
  background-color: hsla(256, 100%, 96%, 0.9);
  border-radius: 10px;
  width: 80%;
  max-width: 900px;
  margin-bottom: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
.title-section-notification {
  margin: 0;
  padding: 15px;
  text-align: left;
  color: #765273;
  font-size: 20px;
  border-radius: 10px 10px 0 0;
}

.content-section-notification {
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: start;
}
</style>
