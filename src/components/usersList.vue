<template>
  <div class="usersList">
    <h1 class="usersList__title">User list</h1>
  </div>

  <div class="usersList__list">
    <div class="usersList__top">
      <div class="usersList__top-search">
        <font-awesome-icon icon="fa-solid fa-search" />
        <input
          type="text"
          class="usersList__search"
          v-model="searchValue"
          placeholder="search for users"
        />
      </div>
      <router-link to="/adduser" class="submenu__item">
        <button class="usersList__top--add">
          <font-awesome-icon icon="fa-solid fa-plus" />
          Add User
        </button>
      </router-link>
    </div>

    <table>
      <thead>
        <th></th>
        <th>Full Name</th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredItems()" :key="index">
          <td><img :src="user.avatar" /></td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td class="icons">
            <router-link :to="'/edit/' + user.id" class="submenu__item">
              <font-awesome-icon icon="fa-solid fa-edit" />
            </router-link>
            <font-awesome-icon
              @click="deleteUser(user.id)"
              icon="fa-solid fa-trash-can"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="usersList__pagination">
    <button
      v-for="index in userData.total_pages"
      :key="index"
      class="usersList__pagination-item"
      :class="{ active: index === userData.page }"
      @click="getUsers(index)"
    >
      {{ index }}
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  name: "usersList",
  props: {
    msg: String,
  },
  components: {},
  setup() {
    const store = useStore();
    store.dispatch("getUsersData");
    const userData = computed(() => store.getters.getUsersData);
    let searchValue = ref("");

    const getUsers = (page) => {
      store.dispatch("getUsersData", page);
    };

    const deleteUser = (id) => {
      store.dispatch("deleteUser", id);
    };

    const filteredItems = () => {
      return userData.value?.data?.filter((item) => {
        let name = item.first_name + item.last_name;
        return name.toLowerCase().indexOf(searchValue.value.toLowerCase()) > -1;
      });
    };

    return {
      userData,
      getUsers,
      filteredItems,
      searchValue,
      deleteUser,
    };
  },
};
</script>
