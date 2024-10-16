<template>
  <div class="container-history">
    <div class="content-box-history">
      <div class="title-section">
        <p>歷史紀錄</p>
      </div>
      <hr class="divider" />
      <div class="grid-container">
        <div v-for="(item, index) in items" :key="index" class="grid-item">
          <div class="rectangle-container">
            <div class="rect-bottom"></div>
            <div class="rect-top">
              <div class="date-time">{{ item.date }}</div>
              <button class="image-button" @click="showPopup(item)">
                <img src="/search.png" class="image" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <div class="post-close" @click="closePopup">&#x58;</div>
          <h3>{{ currentItem?.date }}</h3>
          <div class="content-box-report"></div>
          <div class="title-section">
            <p>歷史分析</p>
          </div>
          <hr class="divider" />
          <div class="content-section-report">
            <div class="image-wrapper-report">
              <div class="chart-container">
                <canvas id="myChartHistory"></canvas>
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
                      gridItem.value === 'Hazardous' ? '#C8698A' : '#7FD27D',
                  }"
                  class="grid-items"
                >
                  {{ gridItem.value }}
                </div>
              </div>
            </div>
          </div>
          <div class="form-btn">
            <button @click="showPopupshare(itemshare)">分享</button>
          </div>
          <div v-if="showModalshare" class="modal-overlay">
            <div class="modal-content-back">
              <h3>{{ currentItemshare?.date }}</h3>
              <div class="post-close" @click="closePopupshare">&#x58;</div>
              <p class="share-title">建立貼文</p>
              <div class="share-msg">
                <textarea class="share-content" type="content">
註解說明</textarea
                >
                <input class="share-tag" type="tag" value="#魔聲仔" />
              </div>
              <div class="post-end">
                <div class="share-text">
                  <p class="share-to">分享至：</p>
                  <a href="https://www.instagram.com/" target="_blank">
                    <img src="/social.png" alt="Facebook" />
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <img src="/facebook.png" alt="Facebook" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="pages" id="page-member">
        <td><a>&lt;&lt;</a></td>
        <td><a>2</a></td>
        <td><a>3</a></td>
        <td><b>4</b></td>
        <td><a>5</a></td>
        <td><a>6</a></td>
        <td><a>&gt;&gt;</a></td>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const items = ref([
  { date: "2024-10-08 10:00" },
  { date: "2024-10-07 14:30" },
  { date: "2024-10-06 09:15" },
  { date: "2024-10-06 09:15" },
  { date: "2024-10-06 09:15" },
  { date: "2024-10-06 09:15" },
]);

const gridItems = ref([
  { title: "內容檢測", value: "Hazardous" },
  { title: "深偽音訊", value: "Hazardous" },
  { title: "換臉檢測", value: "safe" },
  { title: "臉部特徵檢測", value: "Hazardous" },
]);

const showModal = ref(false);
const currentItem = ref(null);
const showModalshare = ref(false);

const showPopup = (item) => {
  currentItem.value = item;
  showModal.value = true;
  setTimeout(() => {
    renderChart1();
  }, 300);
};

const closePopup = () => {
  showModal.value = false;
};

const showPopupshare = () => {
  showModalshare.value = true;
};

const closePopupshare = () => {
  showModalshare.value = false;
};

const renderChart1 = () => {
  const ctxh = document.getElementById("myChartHistory")?.getContext("2d");
  if (ctxh) {
    new Chart(ctxh, {
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
  }
};

onMounted(() => {
  renderChart1();
});
</script>

<style>
#myChartHistory {
  width: 100%;
  height: 400px;
}
.container-history {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.content-box-history {
  background-color: #6b5276;
  width: 90%;
  max-width: 900px;
  height: 80%;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
}

.title-section {
  text-align: center;
}

.divider {
  border: none;
  border-top: 2px solid #ddd;
}

.grid-item {
  position: relative;
  background-color: transparent;
  padding: 10px;
  border-radius: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-left: 10px;
  margin-bottom: 40px;
}
.form-btn {
  text-align: center;
}
.date-time {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  color: #c8698a;
}

.rectangle-container {
  position: relative;
  padding-bottom: 130px;
  height: 80px;
}

.rect-bottom {
  position: absolute;
  top: 0;
  left: 0;
  width: 180px;
  height: 220px;
  background-color: #f1ecff;
  z-index: 1;
}

.rect-top {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 180px;
  height: 225px;
  background-color: #fff;
  z-index: 2;
}

.image-button {
  position: absolute;
  bottom: 2px;
  right: 2px;
  border: none;
  background: none;
  cursor: pointer;
}

.image {
  width: 80px;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.pages {
  color: #ffebb7;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
}

.pages a {
  color: #f1ecff;
  width: 38px;
  height: 38px;
  margin: 5px;
  border: 1px solid #f1ecff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.pages b {
  color: #ffebb7;
  width: 38px;
  height: 38px;
  margin: 5px;
}

.pages a:hover {
  color: #fff;
  background-color: #cbb8ff;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .rect-bottom,
  .rect-top {
    width: 180px;
    height: 225px;
  }
  .rectangle-container {
    padding-bottom: 145px;
  }
  .image {
    width: 70px;
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }

  .rect-bottom,
  .rect-top {
    width: 160px;
    height: 200px;
  }

  .rect-top {
    top: 10px;
    left: 10px;
  }
  .rectangle-container {
    padding-bottom: 120px;
  }
  .image {
    width: 60px;
  }
}

@media (max-width: 480px) {
  .grid-item {
    padding: 10;
  }

  .grid-container {
    grid-template-columns: repeat(2, 1fr);
    margin-left: 0;
  }

  .rect-bottom,
  .rect-top {
    margin-left: 0;
    width: 132px;
    height: 165px;
  }

  .rect-top {
    top: 5px;
    left: 5px;
  }
  .rectangle-container {
    padding-bottom: 90px;
  }
  .image {
    width: 50px;
  }
}
</style>
