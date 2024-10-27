<template>
  <div class="all-content">
    <div class="image-container"></div>
    <div class="content-wrapper">
      <div class="content-box">
        <h2>輸入連結</h2>
        <div class="url-upload" style="display: flex">
          <input id="url-input" type="url-text" />
          <button class="btn" @click="triggerUrlUpload">
            點擊送出
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <h2>上傳影片</h2>
        <div class="upload-area" @click="triggerFileUpload">
          <div v-if="uploadedFile" class="upload-video">
            <p>
              檔案名稱:
              <a :href="uploadedFileUrl" target="_blank">{{
                uploadedFile.name
              }}</a>
            </p>
          </div>
          <label v-if="!uploadedFile" class="upload-label">
            點擊按鈕或拖曳檔案上傳
          </label>
          <input
            id="file-upload"
            type="file"
            class="file-input"
            @change="handleFileChange"
          />
          <button class="upload-button btn">
            點擊上傳
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const uploadedFile = ref(null);
const uploadedFileUrl = ref("");
const isVideoFile = ref(false);
const videoData = ref("");
const isLoading = ref(false);
const router = useRouter();

const triggerFileUpload = () => {
  document.getElementById("file-upload").click();
};

const triggerUrlUpload = () => {
  const url = document.getElementById("url-input").value;
  postDataByUrl(url);
};

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    uploadedFile.value = file;

    isVideoFile.value = file.type.startsWith("video");

    if (isVideoFile.value) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        uploadedFileUrl.value = e.target.result;
        videoData.value = uploadedFileUrl.value;

        console.log("Base64 影片資料:", videoData.value);
        await postData();
      };

      reader.readAsDataURL(file);
    }
  }
};

const postData = async () => {
  const url = `${process.env.VUE_APP_BACKEND_HOST}/api/check`;
  const data = {
    videoData: videoData.value,
  };

  isLoading.value = true;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP 錯誤！狀態：${response.status}`);
    }

    const jsonData = await response.json();
    console.log("伺服器回應:", jsonData);

    localStorage.setItem("apiResponseData", JSON.stringify(jsonData.data));

    const storedData = localStorage.getItem("apiResponseData");
    console.log("儲存在 localStorage 的資料:", JSON.parse(storedData));

    alert("檢測完畢！前往結果頁面。");

    router.push({ path: "/UserReport" });
  } catch (error) {
    console.error("Fetch 錯誤: ", error);
  } finally {
    isLoading.value = false;
  }
};

const postDataByUrl = async (checkUrl) => {
  const url = `${process.env.VUE_APP_BACKEND_HOST}/api/check/url`;
  const data = {
    checkUrl,
  };

  isLoading.value = true;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP 錯誤！狀態：${response.status}`);
    }

    const jsonData = await response.json();
    console.log("伺服器回應:", jsonData);

    localStorage.setItem("apiResponseData", JSON.stringify(jsonData.data));

    const storedData = localStorage.getItem("apiResponseData");
    console.log("儲存在 localStorage 的資料:", JSON.parse(storedData));

    alert("檢測完畢！前往結果頁面。");

    router.push({ path: "/UserReport" });
  } catch (error) {
    console.error("Fetch 錯誤: ", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.url-upload input[type="url-text"] {
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: rgba(255, 255, 255, 0.729);
  padding: 10px;
  font-size: 16px;
  outline: none;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
.url-upload button {
  border-radius: 10px;
}
.url-upload button:hover {
  background-color: #ac355f;
}
.btn {
  display: inline-block;
  position: relative;
  z-index: 1;
  min-width: 200px;
  background: #c8698a;
  border: 2px solid #c8698a;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
  transition: 0.5s;
  padding: 10px 20px;
}

.btn span {
  position: absolute;
  width: 25%;
  height: 100%;
  background-color: #c8698a;
  transform: translateY(150%);
  border-radius: 50%;
  left: calc((var(--n) - 1) * 25%);
  transition: 0.5s;
  transition-delay: calc((var(--n) - 1) * 0.1s);
  z-index: -1;
}

.btn:hover {
  color: rgb(255, 255, 255);
}

.btn:focus {
  color: #c8698a;
}

.btn:hover span {
  transform: translateY(0) scale(2);
}

.btn span:nth-child(1) {
  --n: 1;
}

.btn span:nth-child(2) {
  --n: 2;
}

.btn span:nth-child(3) {
  --n: 3;
}

.btn span:nth-child(4) {
  --n: 4;
}

.all-content {
  height: 90vh;
}

img {
  width: auto;
  max-height: 100%;
}

.image-container {
  height: 400px;
  background-image: url("/src/assets/image/vision.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.content-box {
  background-color: hsla(282, 18%, 39%, 0.7);
  border: #f1ecff 1px solid;
  border-bottom: none;
  width: 100%;
  padding: 30px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0;
  padding: 15px;
  text-align: left;
  color: #f1ecff;
}

.upload-area {
  border: 2px dashed #f1ecff;
  padding: 70px;
  text-align: center;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
}

.upload-video {
  color: #f1ecff;
}

.upload-video a {
  color: #acd0ff;
}

.upload-video a:hover {
  color: #fffeec;
}

.upload-label {
  display: block;
  color: #f1ecff;
  font-size: 16px;
}

.file-input {
  display: none;
}

.upload-button:hover {
  background-color: #ac355f;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(256, 100%, 86%, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 200px;
  height: 200px;
  position: relative;
}

.loading-spinner div {
  border-width: 5px;
  border-style: solid;
  border-left-color: #fff;
  border-right-color: #fff;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  position: absolute;
  animation: spin 2s ease infinite;
}

.loading-spinner div:nth-child(1) {
  width: 50px;
  height: 50px;
  left: 70px;
  top: 70px;
}

.loading-spinner div:nth-child(2) {
  width: 70px;
  height: 70px;
  left: 60px;
  top: 60px;
  animation-delay: 0.1s;
}

.loading-spinner div:nth-child(3) {
  width: 90px;
  height: 90px;
  left: 50px;
  top: 50px;
  animation-delay: 0.2s;
}

.loading-spinner div:nth-child(4) {
  width: 110px;
  height: 110px;
  left: 40px;
  top: 40px;
}

@keyframes spin {
  50% {
    transform: rotate(100deg);
  }

  100% {
    transform: rotate(0);
  }
}

@media (max-width: 768px) {
  .image-container {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .image-container {
    height: 200px;
  }

  .upload-area {
    padding-top: 210px;
    padding-bottom: 210px;
  }
}
</style>
