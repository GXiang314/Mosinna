<template>
  <div class="container-report">
    <div class="content-box-report">
      <div class="title-section">
        <p>結果分析</p>
      </div>
      <hr class="divider" />
      <div class="content-section-report">
        <div class="image-wrapper-report">
          <div class="chart-container">
            <canvas id="myChart"></canvas>
          </div>
        </div>
        <div class="grid-container-report">
          <div
            v-for="(gridItem, gridIndex) in gridItems"
            :key="gridIndex"
            class="grid-row"
          >
            <div class="grid-title">{{ gridItem.title }}</div>
            <div
              :style="{
                backgroundColor:
                  gridItem.value === 'risky' ? '#C8698A' : '#7FD27D',
              }"
              class="grid-items"
            >
              {{ gridItem.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Chart from "chart.js/auto";

const gridItems = ref([]);
const router = useRouter();

const loadGridDataFromLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem("apiResponseData"));
  if (storedData && Array.isArray(storedData)) {
    gridItems.value = storedData.map((item) => ({
      title: item.name,
      value: item.result === "risky" ? "risky" : "pass",
    }));
    return true;
  }
  return false;
};

const renderChart = () => {
  const ctx = document.getElementById("myChart").getContext("2d");
  const safeCount = gridItems.value.filter(
    (item) => item.value === "pass"
  ).length;
  const hazardousCount = gridItems.value.filter(
    (item) => item.value === "risky"
  ).length;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          label: "檢測結果",
          data: [safeCount, hazardousCount],
          backgroundColor: ["#7FD27D", "#C8698A"],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

onMounted(() => {
  const dataLoaded = loadGridDataFromLocalStorage();

  if (dataLoaded) {
    renderChart();
  } else {
    alert("尚未完成檢測，前往上傳影片頁面。");
    router.push({ path: "/" });
  }
});
</script>

<style>
.container-report {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.content-box-report {
  background-color: hsla(256, 100%, 96%, 0.9);
  border-radius: 10px;
  width: 80%;
  max-width: 900px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.title-section p {
  margin: 0;
  padding: 15px;
  text-align: left;
  color: #f1ecff;
  font-size: 25px;
  border-radius: 10px 10px 0 0;
  background-color: #6b5276;
}

.divider {
  border: none;
  border-top: 2px solid #ddd;
}

.content-section-report {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 200px;
}

.grid-container-report {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.grid-row {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  max-width: 400px;
}

.grid-title,
.grid-items {
  flex: 1;
  padding: 10px;
  width: 200px;
  text-align: center;
  border-radius: 5px;
}

.grid-title {
  background-color: #6b5276;
  color: #dad8eb;
  margin-right: 10px;
}

.grid-items {
  background-color: #eee;
}
@media (max-width: 480px) {
  .grid-title,
  .grid-items {
    width: 100px;
  }
}
</style>
