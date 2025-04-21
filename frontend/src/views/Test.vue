<template>
  <div class="p-4 space-y-4">
    <p class="text-2xl font-bold m-0 py-4 px-4 text-left text-[#f1ecff]">輸入連結</p>

    <!-- 🔗 URL 輸入欄位＋送出按鈕 -->
    <div class="flex flex-col sm:flex-row gap-4">
      <input
        id="url-input"
        v-model="urlInput"
        type="url"
        placeholder="請輸入影片連結"
        class="flex-1 rounded-[10px] border-none bg-[rgba(255,255,255,0.729)] p-3 text-base outline-none shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
      />
      <button
        class="btn w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        @click="handleUrlSubmit"
      >
        🔗 送出連結
      </button>
    </div>

    <!-- 📁 檔案上傳 -->
    <input type="file" accept="video/*" @change="handleFileChange" />

    <!-- 📺 預覽影片 -->
    <div v-if="fileUrl" class="mt-4">
      <video :src="fileUrl" controls class="w-full max-w-md rounded shadow" />
    </div>

    <!-- 📈 進度條 -->
    <div v-if="progress > 0" class="mt-4">
      <div class="bg-gray-200 h-4 rounded overflow-hidden">
        <div class="bg-blue-500 h-4 transition-all" :style="{ width: progress + '%' }" />
      </div>
      <p class="text-sm mt-1">進度：{{ progress }}%</p>
    </div>

    <!-- 🔴 中斷按鈕 -->
    <div class="mt-4 space-x-2">
      <button
        v-if="sseRunning"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        @click="cancelSSE"
      >
        🔴 取消檢查
      </button>
    </div>

    <!-- 📜 訊息紀錄 -->
    <div class="mt-4">
      <h3 class="text-lg font-semibold">事件紀錄：</h3>
      <ul class="list-disc list-inside text-sm">
        <li v-for="(msg, idx) in messages" :key="idx">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { fetchEventSource } from '@microsoft/fetch-event-source'

const file = ref(null)
const fileUrl = ref('')
const messages = ref([])
const sseRunning = ref(false)
const progress = ref(0)
const controller = ref(null)
const urlInput = ref('')

const handleFileChange = (event) => {
  const selectedFile = event.target.files?.[0]
  if (!selectedFile || !selectedFile.type.startsWith('video/')) return

  file.value = selectedFile
  const reader = new FileReader()

  reader.onload = async (e) => {
    fileUrl.value = e.target.result
    startSSE(e.target.result, 'file')
  }

  reader.readAsDataURL(selectedFile)
}

const handleUrlSubmit = () => {
  if (!urlInput.value || !urlInput.value.startsWith('http')) {
    messages.value.push('⚠️ 請輸入正確的影片連結')
    return
  }

  fileUrl.value = urlInput.value
  startSSE(urlInput.value, 'url')
}

const startSSE = (input, type) => {
  controller.value = new AbortController()
  sseRunning.value = true
  progress.value = 0
  messages.value = []

  const apiEndpoint = type === 'url'
    ? `${import.meta.env.VITE_BACKEND_HOST}/api/check/url`
    : `${import.meta.env.VITE_BACKEND_HOST}/api/check/`

  const payload = type === 'url'
    ? { url: input }
    : { videoData: input }

  fetchEventSource(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: controller.value.signal,
    onopen(response) {
      if (!response.ok) throw new Error('❌ 連接失敗')
      if (!response.headers.get('content-type')?.includes('text/event-stream')) throw new Error('❌ 不是 SSE')
      messages.value.push('✅ SSE 已連接')
    },
    onmessage(ev) {
      try {
        const data = JSON.parse(ev.data)
        messages.value.push(`📩 ${data.type}`)

        switch (data.type) {
          case 'VideoUploaded':
            messages.value.push('🚀 影片上傳成功，開始檢測中...')
            progress.value = 30
            break
          case 'VideoCheckFinished':
            messages.value.push(`✅ 檢測完成：${data.data.result}`)
            progress.value = 100
            sseRunning.value = false
            break
          case 'ValidationError':
            messages.value.push(`❗ 錯誤：${data.data.message}`)
            progress.value = 0
            sseRunning.value = false
            break
        }
      } catch (e) {
        messages.value.push('⚠️ JSON 錯誤')
      }
    },
    onerror(err) {
      messages.value.push(`❌ SSE 錯誤：${err.message}`)
      sseRunning.value = false
      progress.value = 0
      controller.value?.abort()
    },
    onclose() {
      messages.value.push('🔚 SSE 關閉')
      sseRunning.value = false
    }
  })
}

const cancelSSE = () => {
  if (controller.value) {
    controller.value.abort()
    messages.value.push('🛑 使用者中斷 SSE')
    sseRunning.value = false
    progress.value = 0
  }
}
</script>


<style scoped>
video {
  max-height: 300px;
}
</style>
