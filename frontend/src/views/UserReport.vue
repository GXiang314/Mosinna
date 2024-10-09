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
          <div v-for="(item, index) in gridItems" :key="index" class="grid-row">
            <div class="grid-title">{{ item.title }}</div>
            <div class="grid-items">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
// import { ref, onMounted } from "vue";

// const count = ref(0);

// function increment() {
//   count.value++;
// }

// renderChart(() => {
//   const ctx = document.getElementById("myChart").getContext("2d");
//   new Chart(ctx, {
//     type: "doughnut",
//     data: {
//       labels: ["safe", "Hazardous"],
//       datasets: [
//         {
//           label: "deepfake",
//           data: [3, 1],
//           backgroundColor: ["#7FD27D", "#C8698A"],
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 0.2,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//     },
//   });
// });

export default {
  data() {
    return {
      gridItems: [
        { title: "內容檢測", value: "Hazardous" },
        { title: "深偽音訊", value: "Hazardous" },
        { title: "換臉檢測", value: "safe" },
        { title: "臉部特徵檢測", value: "Hazardous" },
      ],
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["safe", "Hazardous"],
          datasets: [
            {
              label: "deepfake",
              data: [3, 1],
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
    },
  },
};
</script>

<style>
.container-report {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
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
  font-size: 20px;
  border-radius: 10px 10px 0 0;
  background-color: #6b5276;
}

.divider {
  border: none;
  border-top: 2px solid #ddd;
}

.content-section-report {
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
</style>
