import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/UserUpdate.vue";
import Report from "@/views/UserReport.vue";
import History from "@/views/UserHistory.vue";

const routes = [
  {
    path: "/",
    name: "上傳影片",
    component: Home,
  },
  {
    path: "/UserReport",
    name: "結果分析",
    component: Report,
  },
  {
    path: "/UserHistory",
    name: "歷史紀錄",
    component: History,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;