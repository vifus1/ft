<template>
  <div class="container">
    <notifications />
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  components: {},
  setup() {
    const detail = ref(true);
    const uid = ref();

    const toggleDetail = (id) => {
      uid.value = id;
      detail.value = !detail.value;
    };

    return {
      detail,
      toggleDetail,
      uid,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
