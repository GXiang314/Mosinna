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
              <input type="radio" id="yes" name="scammed" value="yes" />
              <label for="yes">是</label>
              <input type="radio" id="no" name="scammed" value="no" />
              <label for="no">否</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>詐騙管道</legend>
            <div class="fraud-container">
              <div
                v-for="source in fraudSources"
                :key="source.id"
                class="fraud-item"
              >
                <input
                  type="radio"
                  :id="source.id"
                  name="fraudSource"
                  :value="source.content"
                />
                <label :for="source.id">{{ source.content }}</label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>詐騙手法</legend>
            <div class="fraud-container">
              <div
                v-for="source in fraudTypes"
                :key="source.id"
                class="fraud-item"
              >
                <input type="radio" id="no" name="fraudSource" value="no" />
                <label>{{ source.content }}</label>
              </div>
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
      <div class="form-btn">
        <button type="submit">送出</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";

const fraudSources = ref([]);
const fraudTypes = ref([]);
const errorMessage = ref("");

const getFraudSources = async () => {
  const url = "http://localhost:5000/api/list/fraudSources";

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP 錯誤！狀態：${response.status}`);
    }
    console.log(result.data);
    const { status, data, message } = result;

    if (status === 200) {
      fraudSources.value = data;
      console.log("詐騙來源:", fraudSources.value);
    } else {
      console.error("API錯誤:", message);
      errorMessage.value = message;
    }
  } catch (error) {
    console.error("Fetch 錯誤: ", error);
    errorMessage.value = "獲取失敗";
  }
};
const getFraudTypes = async () => {
  const url = "http://localhost:5000/api/list/fraudTypes";

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const fraudTypesresult = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP 錯誤！狀態：${response.status}`);
    }
    console.log(fraudTypesresult.data);
    const { status, data, message } = fraudTypesresult;

    if (status === 200) {
      fraudTypes.value = data;
      console.log("詐騙來源:", fraudTypes.value);
    } else {
      console.error("API錯誤:", message);
      errorMessage.value = message;
    }
  } catch (error) {
    console.error("Fetch 錯誤: ", error);
    errorMessage.value = "獲取失敗";
  }
};

onMounted(() => {
  getFraudSources();
  getFraudTypes();
});
</script>

<style>
.fraud-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1px;
  max-width: 100%;
}

.fraud-item {
  display: flex;
  align-items: center;
  min-width: 200px;
  padding: 3px;
}

@media (min-width: 900px) {
  .fraud-container {
    max-width: 900px;
  }
}

.container-notification {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 90vh;
  margin-top: 10px;
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
  padding: 15px 15px 0 10px;
  text-align: left;
  color: #765273;
  font-size: 20px;
  border-radius: 10px 10px 0 0;
}

.content-section-notification {
  display: flex;
  flex-direction: column;
  padding: 10px;
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
.form-btn button {
  background-color: #c8698a;
  border: none;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  margin: 5px;
  color: #fff;
  font-size: 15px;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.form-btn button:hover {
  background-color: #ac355f;
}
.post-close {
  font-size: 22px;
  color: #5f5f5f;
  display: flex;
  justify-content: end;
  cursor: pointer;
}
.post-close:hover {
  color: #000;
}
.share-title {
  color: black;
  text-align: center;
  font-size: 20px;
}
.share-msg {
  border-top: 1px solid #6b5276;
  border-bottom: 1px solid #6b5276;
  height: 80%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 3px;
}
.share-content {
  color: #322055;
}
.share-tag {
  color: #765273;
}
.modal-content-back {
  width: 60%;
  height: 80%;
  background-color: hsla(256, 100%, 96%, 0.9);
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  z-index: 99;
}
.share-msg textarea,
.share-msg input[type="tag"] {
  border-radius: 5px;
  border: none;
  background-color: transparent;
  height: 30px;
  padding: 5px;
  font-size: 16px;
  outline: none;
}
.share-msg textarea {
  height: 95%;
  resize: none;
}
.share-text {
  display: flex;
}
.share-text a {
  font-size: 20px;
  padding: 3px;
}
.share-to {
  padding: 5px;
}
.post-end {
  display: flex;
  justify-content: space-between;
}
img {
  width: 45px;
}
</style>
