<template>
  <div class="h-[90vh]">
    <div
      class="h-[300px] md:h-[300px] sm:h-[200px] bg-contain bg-no-repeat bg-center flex justify-center items-center"
      style="background-image: url('/assets/image/vision.png')"
    ></div>

    <div class="bottom-0 w-full flex justify-center">
      <div
        class="w-full bg-[hsla(282,18%,39%,0.7)] border border-[#f1ecff] border-b-0 rounded-t-[20px] p-8 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
      >
        <!-- URL Upload Section -->
        <p class="text-2xl font-bold m-0 py-4 px-4 text-left text-[#f1ecff]">
          輸入連結
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <input
            id="url-input"
            type="url"
            class="flex-1 rounded-[10px] border-none bg-[rgba(255,255,255,0.729)] p-3 text-base outline-none shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
          />
          <button class="btn w-full sm:w-auto" @click="handleUrlSubmit">
            點擊送出
          </button>
        </div>

        <!-- File Upload Section -->
        <p class="text-2xl font-bold m-0 py-4 px-4 text-left text-[#f1ecff]">
          上傳影片
        </p>
        <div
          @click="triggerFileUpload"
          class="border-2 border-dashed border-[#f1ecff] px-4 py-12 text-center rounded-[10px] bg-transparent cursor-pointer"
        >
          <div v-if="file" class="text-[#f1ecff]">
            <p>
              檔案名稱:
              <a
                :href="fileUrl"
                target="_blank"
                class="text-[#acd0ff] hover:text-[#fffeec]"
              >
                {{ file.name }}
              </a>
            </p>
          </div>
          <label v-else class="block text-[#f1ecff] text-base">
            點擊按鈕或拖曳檔案上傳
          </label>
          <input
            id="file-upload"
            type="file"
            class="hidden"
            @change="handleFileChange"
            accept="video/*"
          />
          <button class="btn mt-4">點擊上傳</button>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-[hsla(256,100%,86%,0.8)] flex justify-center items-center z-50"
    >
      <div class="w-[200px] h-[200px] relative">
        <div
          v-for="(_, index) in 4"
          :key="index"
          class="absolute border-[5px] border-solid border-l-white border-r-white border-t-transparent border-b-transparent rounded-full animate-spin"
          :style="{
            width: `${50 + index * 20}px`,
            height: `${50 + index * 20}px`,
            left: `${70 - index * 10}px`,
            top: `${70 - index * 10}px`,
            animationDelay: `${index * 0.1}s`
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// State
const file = ref(null)
const fileUrl = ref('')
const isLoading = ref(false)
const router = useRouter()

// Methods
const triggerFileUpload = () => {
  document.getElementById('file-upload').click()
}

const handleUrlSubmit = () => {
  const url = document.getElementById('url-input').value
  if (!url) return
  postDataByUrl(url)
}

const handleFileChange = (event) => {
  const selectedFile = event.target.files?.[0]
  if (!selectedFile || !selectedFile.type.startsWith('video/')) return

  file.value = selectedFile
  const reader = new FileReader()

  reader.onload = async (e) => {
    fileUrl.value = e.target.result
    await postData(e.target.result)
  }

  reader.readAsDataURL(selectedFile)
}

const handleAPIResponse = async (response) => {
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`)

  const { data } = await response.json()
  localStorage.setItem('apiResponseData', JSON.stringify(data))

  alert('檢測完畢！前往結果頁面。')
  router.push('/UserReport')
}

const postData = async (videoData) => {
  isLoading.value = true

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/api/check`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoData })
      }
    )
    await handleAPIResponse(response)
  } catch (error) {
    console.error('Upload error:', error)
    alert('上傳失敗，請稍後再試')
  } finally {
    isLoading.value = false
    router.go(0)
  }
}

const postDataByUrl = async (checkUrl) => {
  isLoading.value = true

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/api/check/url`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkUrl })
      }
    )
    await handleAPIResponse(response)
  } catch (error) {
    console.error('URL check error:', error)
    alert('檢查失敗，請稍後再試')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* 保留特殊按鈕動畫效果 */
.btn {
  @apply inline-block relative z-10 min-w-[200px] bg-[#c8698a] border-2 border-[#c8698a] rounded text-white 
         text-base font-bold uppercase text-center no-underline overflow-hidden transition-all duration-500 px-5 py-2.5;
}

.btn:hover {
  @apply text-white bg-[#ac355f];
}

.btn:focus {
  @apply text-[#c8698a];
}

.btn span {
  position: absolute;
  width: 25%;
  height: 100%;
  background-color: #c8698a;
  transform: translateY(150%);
  border-radius: 50%;
  transition: 0.5s;
  z-index: -1;
}

.btn:hover span {
  transform: translateY(0) scale(2);
}

.btn span:nth-child(1) {
  left: 0%;
  transition-delay: 0s;
}
.btn span:nth-child(2) {
  left: 25%;
  transition-delay: 0.1s;
}
.btn span:nth-child(3) {
  left: 50%;
  transition-delay: 0.2s;
}
.btn span:nth-child(4) {
  left: 75%;
  transition-delay: 0.3s;
}

@keyframes spin {
  50% {
    transform: rotate(100deg);
  }
  100% {
    transform: rotate(0);
  }
}

.animate-spin {
  animation: spin 2s ease infinite;
}
</style>
