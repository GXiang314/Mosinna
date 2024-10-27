<template>
  <div class="h-[90vh] flex justify-center items-center">
    <div class="w-11/12 md:w-4/5 max-w-[900px] bg-[hsla(256,100%,96%,0.9)] rounded-lg shadow-lg">
      <div class="bg-[#6b5276] rounded-t-lg">
        <p class="m-0 py-3 md:py-4 px-4 md:px-6 text-left text-[#f1ecff] text-xl md:text-2xl">結果分析</p>
      </div>

      <hr class="border-t-2 border-gray-300" />

      <div class="flex flex-col items-center p-3 md:p-5 text-base md:text-xl">
        <div class="relative w-full h-[150px] md:h-[200px]">
          <canvas id="myChart"></canvas>
        </div>

        <div class="w-full flex flex-col items-center">
          <div
            v-for="(gridItem, gridIndex) in gridItems"
            :key="gridIndex"
            class="flex flex-row justify-between w-full max-w-[400px] my-2 md:my-2.5 mx-2 md:mx-2.5 gap-2"
          >
            <div class="flex-1 p-2 md:p-2.5 text-center rounded bg-[#6b5276] text-[#dad8eb]">
              {{ gridItem.title }}
            </div>
            <div
              class="flex-1 p-2 md:p-2.5 text-white text-center rounded"
              :class="gridItem.value === 'risky' ? 'bg-[#C8698A]' : 'bg-[#5bc259]'"
            >
              {{ gridItem.value === 'risky' ? '可疑內容' : '尚未發現風險' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'

const gridItems = ref([])
const router = useRouter()

const initializeGridData = () => {
  const storedData = JSON.parse(localStorage.getItem('apiResponseData'))
  
  if (!Array.isArray(storedData)) {
    alert('尚未完成檢測，前往上傳影片頁面。')
    router.push('/')
    return false
  }

  gridItems.value = storedData.map(item => ({
    title: item.name,
    value: item.result === 'risky' ? 'risky' : 'pass'
  }))
  
  return true
}

const createDoughnutChart = () => {
  const ctx = document.getElementById('myChart').getContext('2d')
  const results = gridItems.value.reduce((acc, item) => {
    acc[item.value]++
    return acc
  }, { pass: 0, risky: 0 })

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        label: '檢測結果',
        data: [results.pass, results.risky],
        backgroundColor: ['#5bc259', '#C8698A'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 0.2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
}

onMounted(() => {
  if (initializeGridData()) {
    createDoughnutChart()
  }
})
</script>
