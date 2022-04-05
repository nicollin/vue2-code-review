import Vue from "vue";
import Router from "vue-router";

const Home = () => import("@/views/home/index.vue");
const Table = () => import("@/views/table/index.vue");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "table",
          name: "Table",
          component: Table
        }
      ]
    }
  ]
});
