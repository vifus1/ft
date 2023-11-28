<template>
  <div class="container">
    <notifications />
    <usersList v-if="detail === true" @toggleDetail="toggleDetail" />
    <userDetail
      :uid="uid"
      v-else-if="detail === false"
      @toggleDetail="toggleDetail"
    />
  </div>
</template>

<script>
import usersList from "./components/usersList.vue";
import userDetail from "./components/userDetail.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    usersList,
    userDetail,
  },
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
