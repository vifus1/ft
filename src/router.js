import { createRouter, createWebHistory } from "vue-router";
import list from "./components/usersList.vue";
import detail from "./components/userDetail.vue";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: list,
      name: "Home",
    },
    {
      path: "/edit/:id",
      name: "Detail",
      component: detail,
    },
    {
      path: "/adduser",
      name: "AddUser",
      component: detail,
    },
  ],
});

export default router;
