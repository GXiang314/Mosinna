<template>
  <form>
    <div class="container-notification">
      <div class="content-box-notification">
        <div class="title-section-notification">
          <p>基本資料</p>
        </div>
        <div class="basic">
          <div class="content-section-notification">
            <label><span>*</span>姓名</label>
            <input type="text" required />
          </div>
          <div class="content-section-notification">
            <label><span>*</span>聯絡電話</label>
            <input type="number" required />
          </div>
        </div>
      </div>
      <div class="content-box-notification">
        <div class="title-section-notification">
          <p>案情資料</p>
        </div>
        <div class="content-section-notification">
          <fieldset>
            <legend>是否已受騙</legend>
            <div>
              <input type="radio" />
              <label for="contactChoice1">是</label>
              <input type="radio" />
              <label for="contactChoice2">否</label>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="content-box-notification">
        <div class="title-section-notification">
          <p>註解說明(限輸入500個字)</p>
        </div>
        <div class="content-section-notification">
          <textarea required></textarea>
        </div>
      </div>
    </div>
    <div>
      <button type="submit">提交</button>
    </div>
  </form>
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
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.1);
}
.title-section-notification {
  margin: 0;
  padding: 15px 15px 0 15px;
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
.basic {
  display: flex;
}
.basic label {
  padding-bottom: 6px;
}
span {
  color: #c8698a;
}
input[type="text"],
input[type="number"] {
  border-radius: 5px;
  border: none;
  border-left: 8px solid #e7c1ce;
  height: 30px;
  padding: 5px;
}
fieldset {
  border: none;
  border-radius: 5px;
}
legend {
  display: inline-block;
  border-radius: 5px;
  color: #c8698a;
}
textarea {
  border-radius: 5px;
  border: none;
  border-left: 8px solid #e7c1ce;
  height: 150px;
  width: 95%;
  padding: 5px;
}
</style>
