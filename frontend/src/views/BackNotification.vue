<template>
  <form>
    <div class="flex flex-col justify-start items-center h-[90vh] mt-2.5">
      <div class="bg-[hsla(256,100%,96%,0.9)] rounded-lg w-4/5 max-w-[900px] mb-5 shadow-[15px_15px_15px_rgba(0,0,0,0.1)]">
        <div class="m-0 py-2 px-2 text-left text-[#765273] text-xl rounded-t-lg">
          <p>基本資料</p>
        </div>
        <div class="flex flex-col md:flex-row p-2.5">
          <div class="flex flex-col items-start p-2.5">
            <label class="pb-1.5"><span class="text-[#c8698a]">*</span>姓名</label>
            <input 
              v-model="formData.name"
              type="text" 
              class="rounded border-l-8 border-l-[#e7c1ce] h-[30px] p-1.5"
              required 
            />
          </div>
          <div class="flex flex-col items-start p-2.5">
            <label class="pb-1.5"><span class="text-[#c8698a]">*</span>聯絡電話</label>
            <input 
              v-model="formData.phone"
              type="text" 
              class="rounded border-l-8 border-[#e7c1ce] h-[30px] p-1.5"
              required 
            />
          </div>
        </div>
      </div>

      <div class="bg-[hsla(256,100%,96%,0.9)] rounded-lg w-4/5 max-w-[900px] mb-5 shadow-[15px_15px_15px_rgba(0,0,0,0.1)]">
        <div class="m-0 py-[15px] px-[10px] text-left text-[#765273] text-xl rounded-t-lg">
          <p>案情資料</p>
        </div>
        <div class="flex flex-col p-2.5 items-start">
          <fieldset class="border-none rounded">
            <legend class="inline-block rounded text-[#c8698a]">是否已受騙</legend>
            <div class="mt-2">
              <input 
                v-model="formData.isScammed"
                type="radio" 
                id="yes" 
                name="scammed" 
                value="yes"
                class="mr-2" 
              />
              <label for="yes" class="mr-4">是</label>
              <input 
                v-model="formData.isScammed"
                type="radio" 
                id="no" 
                name="scammed" 
                value="no"
                class="mr-2" 
              />
              <label for="no">否</label>
            </div>
          </fieldset>

          <fieldset class="border-none rounded mt-4">
            <legend class="inline-block rounded text-[#c8698a]">詐騙管道</legend>
            <div class="flex flex-wrap justify-start gap-px max-w-full md:max-w-[900px] mt-2">
              <div
                v-for="source in fraudSources"
                :key="source.id"
                class="flex items-center min-w-[200px] p-[3px]"
              >
                <input
                  v-model="formData.fraudSource"
                  type="radio"
                  :id="source.id"
                  name="fraudSource"
                  :value="source.content"
                  class="mr-2"
                />
                <label :for="source.id">{{ source.content }}</label>
              </div>
            </div>
          </fieldset>

          <fieldset class="border-none rounded mt-4">
            <legend class="inline-block rounded text-[#c8698a]">詐騙手法</legend>
            <div class="flex flex-wrap justify-start gap-px max-w-full md:max-w-[900px] mt-2">
              <div
                v-for="type in fraudTypes"
                :key="type.id"
                class="flex items-center min-w-[200px] p-[3px]"
              >
                <input
                  v-model="formData.fraudType"
                  type="radio"
                  :id="type.id"
                  name="fraudType"
                  :value="type.content"
                  class="mr-2"
                />
                <label :for="type.id">{{ type.content }}</label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="bg-[hsla(256,100%,96%,0.9)] rounded-lg w-4/5 max-w-[900px] mb-5 shadow-[15px_15px_15px_rgba(0,0,0,0.1)]">
        <div class="m-0 py-[15px] px-[10px] text-left text-[#765273] text-xl rounded-t-lg">
          <p>註解說明(限輸入500個字)</p>
        </div>
        <div class="flex flex-col p-2.5">
          <textarea 
            v-model="formData.comment"
            maxlength="500"
            class="rounded border-none border-l-8 border-[#e7c1ce] h-[150px] w-[95%] p-1.5"
            required
          ></textarea>
        </div>
      </div>

      <div class="form-btn">
        <button 
          @click.prevent="handleSubmit"
          class="bg-[#c8698a] border-none shadow-[-2px_0_5px_rgba(0,0,0,0.5)] m-[5px] text-white text-[15px] px-[15px] py-[5px] rounded cursor-pointer hover:bg-[#ac355f]"
        >
          送出
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fraudSources = ref([])
const fraudTypes = ref([])
const errorMessage = ref('')

const formData = ref({
  name: '',
  phone: '',
  isScammed: '',
  fraudSource: '',
  fraudType: '',
  comment: ''
})

const fetchData = async (endpoint) => {
  const url = `${import.meta.env.VITE_BACKEND_HOST}/api/list/${endpoint}`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP 錯誤！狀態：${response.status}`)
    }
    
    const { status, data, message } = await response.json()
    
    if (status === 200) {
      return data
    } else {
      console.error('API錯誤:', message)
      errorMessage.value = message
      return []
    }
  } catch (error) {
    console.error('Fetch 錯誤:', error)
    errorMessage.value = '獲取失敗'
    return []
  }
}

const handleSubmit = async () => {
  try {
    // TODO: 實作表單提交邏輯
    console.log('表單資料:', formData.value)
    // 提交成功後重新整理頁面
    alert('表單提交成功')
    router.go(0)
  } catch (error) {
    console.error('提交錯誤:', error)
    errorMessage.value = '提交失敗'
  }
}

onMounted(async () => {
  fraudSources.value = await fetchData('fraudSources')
  fraudTypes.value = await fetchData('fraudTypes')
})
</script>
