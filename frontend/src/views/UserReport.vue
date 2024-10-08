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
          <div class="grid-row">
            <div class="grid-title">內容檢測</div>
            <div class="grid-title">深偽音訊</div>
            <div class="grid-title">換臉檢測</div>
            <div class="grid-title">臉部特徵檢測</div>
          </div>
          <div class="grid-row">
            <div class="grid-items">1</div>
            <div class="grid-items">2</div>
            <div class="grid-items">3</div>
            <div class="grid-items">4</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  border-radius: 10px;
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

.image-wrapper-report {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.result-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.grid-container-report {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.grid-row {
  display: flex;
  justify-content: space-around;
}
.grid-title {
  background-color: #6b5276;
  color: #dad8eb;
  padding: 20px;
  margin: 10px;
  flex: 1;
  text-align: center;
  border-radius: 5px;
}
.grid-items {
  background-color: #eee;
  padding: 20px;
  margin: 10px;
  flex: 1;
  text-align: center;
  border-radius: 5px;
}

.vertical-divider {
  width: 100%;
  border: none;
  border-top: 2px solid #ddd;
  margin: 20px 0;
}
</style>
