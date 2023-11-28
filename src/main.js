import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
require("@/assets/main.scss");
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEdit,
  faPlus,
  faSearch,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "@kyvg/vue3-notification";

library.add(faEdit, faTrashCan, faPlus, faSearch);
const app = createApp(App);
app.use(Notifications);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
