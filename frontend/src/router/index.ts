import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/UserUpload.vue";
import Report from "@/views/UserReport.vue";
import History from "@/views/UserHistory.vue";
import Notifi from "@/views/BackNotification.vue";

const routes: Array<RouteRecordRaw> = [
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
  {
    path: "/Notification",
    name: "檢舉通報",
    component: Notifi,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
