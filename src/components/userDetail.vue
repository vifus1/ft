<template>
  <div class="userDetail">
    <h1 v-if="!uid" class="userDetail__title">Add User</h1>
    <h1 v-else class="userDetail__title">Edit User</h1>

    <div class="userDetail__boxes">
      <div class="userDetail__data-box">
        <form class="form-box">
          <div class="form-line">
            <label>Firstname</label>
            <input type="text" v-model="firstname" required />
          </div>
          <div class="form-line">
            <label>lastname</label>
            <input type="text" v-model="lastname" required />
          </div>
        </form>
        <button v-if="uid" @click="updateDetails" class="userDetail__update">
          Update Details
        </button>
        <button v-else @click="addUser" class="userDetail__update">
          Add user
        </button>
      </div>
      <div class="userDetail__img-box">
        <img v-if="avatar" :src="avatar" />
        <div class="form-line">
          <label>avatar</label>
          <input type="text" v-model="avatar" placeholder="avatar" />
        </div>
        <button
          v-if="uid"
          @click="updateDetails"
          class="userDetail__update-photo"
        >
          Change photo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useNotification } from "@kyvg/vue3-notification";

export default {
  name: "usersList",
  components: {},
  props: {
    uid: {
      type: Number,
      required: false,
    },
  },
  emits: ["toggleDetail"],
  setup(props, context) {
    const store = useStore();
    if (props.uid) {
      store.dispatch("getUserData", props.uid);
    }
    const notification = useNotification();
    const userData = computed(() => store.getters.getUserData);
    const userUpdate = computed(() => store.getters.getUserUpdateStatus);
    const userAdd = computed(() => store.getters.getUserAddStatus);
    const firstname = ref("");
    const lastname = ref("");
    const avatar = ref("");

    const updateDetails = () => {
      if (firstname.value !== "" && lastname.value !== "") {
        store.dispatch("updateUser", {
          first_name: firstname.value,
          last_name: lastname.value,
          avatar: avatar.value,
          uid: props.uid,
        });
      } else {
        notification.notify({
          type: "error",
          title: "Error: fill firstname and lastname!",
        });
      }
    };

    const addUser = () => {
      if (firstname.value !== "" && lastname.value !== "") {
        store.dispatch("addUser", {
          first_name: firstname.value,
          last_name: lastname.value,
          avatar: avatar.value,
        });
      } else {
        notification.notify({
          type: "error",
          title: "Error: fill Firstname and Lastname!",
        });
      }
    };

    watch(
      () => userData.value,
      function (newValue) {
        firstname.value = newValue.data.first_name;
        lastname.value = newValue.data.last_name;
        avatar.value = newValue.data.avatar;
      }
    );

    watch(
      () => userUpdate.value,
      function (newValue) {
        if (newValue.status === 200) {
          context.emit("toggleDetail");
        }
      }
    );

    watch(
      () => userAdd.value,
      function (newValue) {
        if (newValue.status === 201) {
          context.emit("toggleDetail");
        }
      }
    );

    return {
      firstname,
      lastname,
      avatar,
      updateDetails,
      addUser,
    };
  },
};
</script>
