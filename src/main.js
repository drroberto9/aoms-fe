import Vue from "vue";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import loading from "vuejs-loading-screen";

import multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

// import GAuth from "vue-google-oauth2";

import FileSaver from "file-saver";

export default (fileData, fileName) => FileSaver.saveAs(fileData, fileName);

import router from "./router";
import store from "./store";

import App from "./App.vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueMaterial);
Vue.use(loading, {
  bg: "#1f1a4fad",
  icon: "spinner",
  size: 3,
  icon_color: "white"
});
Vue.component("multiselect", multiselect);
// const gauthOption = {
//   clientId: "CLIENT_ID.apps.googleusercontent.com",
//   scope: "profile email",
//   prompt: "select_account"
// };
// Vue.use(GAuth, gauthOption);

window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.interceptors.request.use(
  function(config) {
    config.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
      "jwt-auth-token"
    )}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// window.axios.defaults.baseURL = "http://10.10.10.71/core/api/v1";
window.axios.defaults.baseURL = "https://aoms.ustp.edu.ph/core/api/v1";
// window.axios.defaults.baseURL = "http://oams.test/api/v1";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
