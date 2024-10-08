<template>
  <div class="all-content">
    <div class="image-container"></div>
    <div class="content-wrapper">
      <div class="content-box">
        <h2>上傳影片</h2>
        <div class="upload-area" @click="triggerFileUpload">
          <div v-if="uploadedFile" class="upload-video">
            <p>
              檔案名稱:
              <a :href="uploadedFileUrl" target="_blank">{{
                uploadedFile.name
              }}</a>
            </p>

            <!-- 檢視影片<video
              v-if="isVideoFile"
              :src="uploadedFileUrl"
              controls
              width="100%"
              height="auto"
            ></video> -->
          </div>
          <label v-if="!uploadedFile" for="file-upload" class="upload-label">
            點擊這裡或拖曳檔案上傳
          </label>
          <input
            id="file-upload"
            type="file"
            class="file-input"
            @change="handleFileChange"
            accept="video/*"
          />
          <button class="upload-button">選擇檔案</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadedFile: null,
      uploadedFileUrl: "",
      isVideoFile: false,
    };
  },
  methods: {
    triggerFileUpload() {
      document.getElementById("file-upload").click();
    },
    handleFileChange(event) {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];
        this.uploadedFile = file;
        this.uploadedFileUrl = URL.createObjectURL(file);
        this.isVideoFile = file.type.startsWith("video");
      }
    },
  },
};
</script>

<style>
.all-content {
  height: 90vh;
}
.image-container {
  width: 100%;
  height: 50%;
  background-image: url("/src/assets/image/vision.png");
  background-size: cover;
  background-position: center;
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
  padding: 20px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0;
  padding-bottom: 15px;
  text-align: left;
  color: #f1ecff;
}

.upload-area {
  border: 2px dashed #f1ecff;
  padding: 30px;
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
.upload-button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #c8698a;
  color: #f1ecff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #ac355f;
}
</style>
