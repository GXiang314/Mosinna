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
          <h3>{{ currentItem?.date }}</h3>
          <p>這是彈跳視窗的內容。</p>
          <button @click="closePopup">關閉</button>
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

<script>
export default {
  data() {
    return {
      items: [
        { date: "2024-10-08 10:00" },
        { date: "2024-10-07 14:30" },
        { date: "2024-10-06 09:15" },
        { date: "2024-10-06 09:15" },
        { date: "2024-10-06 09:15" },
        { date: "2024-10-06 09:15" },
      ],
      showModal: false,
      currentItem: null,
    };
  },
  methods: {
    showPopup(item) {
      this.currentItem = item;
      this.showModal = true;
    },
    closePopup() {
      this.showModal = false;
    },
  },
};
</script>

<style>
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
