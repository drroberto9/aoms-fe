<template>
  <div id="signin">
    <md-card class="md-primary signin-form">
      <div class="md-layout">
        <div class="md-layout-item box-welcome">
          <md-card-header class="welcome-header">
            <div class="md-title title center">
              Welcome to Accreditation Online Management System
            </div>
          </md-card-header>

          <md-card-content class="welcome-content">
            <div class="ustp">
              Powered by: University of Science and Technology of Southern
              Philippines
            </div>
          </md-card-content>
        </div>

        <div class="md-layout-item box-login center">
          <div>
            <div class="center">
              <img
                src="../assets/Logo-USTP.png"
                height="120"
                width="120"
                alt="logo"
              />
            </div>
            <div v-if="!campusModal">
              <form @submit.prevent="login">
                <md-card-header>
                  <div class="md-title login-title">Login to your account</div>
                </md-card-header>

                <md-card-content>
                  <div class="form-input">
                    <md-field style="min-width: 400px">
                      <label>Email</label>
                      <md-input
                        id="email"
                        type="email"
                        v-model="email"
                        required
                      ></md-input>
                    </md-field>

                    <md-field style="min-width: 400px">
                      <label>Password</label>
                      <md-input
                        id="password"
                        type="password"
                        v-model="password"
                        required
                      ></md-input>
                    </md-field>
                  </div>
                  <span v-if="loginError" style="color: red">{{
                    loginErrorText
                  }}</span>
                </md-card-content>

                <md-card-actions class="center">
                  <div>
                    <md-button class="md-raised md-primary" type="submit"
                      >Login</md-button
                    >
                  </div>
                  <!-- <p>or</p>
              <div>
                <md-button class="md-raised md-accent" @click="googleLogin()"
                  >G+</md-button
                >
              </div> -->
                </md-card-actions>
              </form>
            </div>

            <div v-else>
              <md-card-header>
                <div style="font-size: large" class="md-title login-title">
                  Select Campus
                </div>
              </md-card-header>

              <md-card-content>
                <multiselect
                  style="min-width: 400px"
                  v-model="campusSelect"
                  :options="campusList"
                  :custom-label="campusName"
                  :placeholder="null"
                  required
                ></multiselect>
              </md-card-content>

              <md-card-actions class="center">
                <div>
                  <md-button
                    class="md-raised md-primary"
                    @click="campusModal = false"
                    >Cancel</md-button
                  >
                </div>
                <p>&nbsp;</p>
                <div>
                  <md-button
                    class="md-raised md-primary"
                    @click="selectCampus(campusSelect)"
                    >Select</md-button
                  >
                </div>
              </md-card-actions>
            </div>
          </div>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      campusList: [],
      campusSelect: null,
      campusSelectName: "",
      campusModal: false,
      message: null,
      loginErrorText: "",
      loginError: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      token: "token",
      role: "role",
      offices: "offices"
    })
  },
  methods: {
    makeToast(title, variant) {
      this.$bvToast.toast(this.snackbarText, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-left",
        solid: true,
        autoHideDelay: 3000
      });
    },
    checkRole(roles, role) {
      if (roles && role) return !!roles.find(item => item.role_id === role);
      else if (!roles?.length) return true;
    },
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(result => {
          this.$store.commit("LOGIN_SUCCESSFUL", result.data);
          this.$store
            .dispatch("checkUser")
            .then(result => {
              if (result.data.campus.length > 1) {
                this.campusList = result.data.campus;
                this.campusSelect = this.campusList[0];
                this.campusSelectName = "";
                this.campusModal = true;
              } else {
                if (this.$store.commit?.length)
                  this.$store.commit("STORE_CAMPUS", result.data.campus[0]);
                this.$store.commit("STORE_USER", result.data);
                this.setRoute();
              }
            })
            .catch(err => {
              this.snackbarText = err + ". Please contact the administrator";
              this.makeToast("Error", "danger");
            });
        })
        .catch(() => {
          this.loginErrorText = "Incorrect username or password.";
          this.loginError = true;
        });
    },
    // googleLogin() {
    //   let authCode = this.$gAuth.getAuthCode();
    // this.$store
    //   .dispatch("login", { email, password })
    //   .then(result => {
    //     this.$store.commit("LOGIN_SUCCESSFUL", result.data);
    //     this.$store
    //       .dispatch("checkUser")
    //       .then(result => {
    //         if (result.data.campus.length > 1) {
    //           this.campusList = result.data.campus;
    //           this.showLogin = false;
    //         } else {
    //           if (this.$store.commit?.length)
    //             this.$store.commit("STORE_CAMPUS", result.data.campus[0]);
    //           this.$store.commit("STORE_USER", result.data);
    //           this.setRoute();
    //         }
    //       })
    //       .catch(err => {
    //         this.snackbarText = err + ". Please contact the administrator";
    //         this.makeToast("Error", "danger");
    //       });
    //   })
    //   .catch(() => {
    //     this.loginErrorText = "Incorrect username or password.";
    //     this.loginError = true;
    //   });
    // },
    campusName({ campus_name }) {
      return `${campus_name}`;
    },
    selectCampus(campusSelect) {
      this.$store
        .dispatch("checkUser")
        .then(result => {
          this.$store.commit("STORE_CAMPUS", campusSelect);
          this.$store.commit("STORE_USER", result.data);
          if (this.offices?.length) {
            this.setRoute();
          } else {
            this.store.dispatch("logout");
            this.snackbarText =
              "You do not have a role on this campus. Please select another.";
            this.makeToast("Error", "danger");
          }
        })
        .catch(err => {
          this.store.dispatch("logout");
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    setRoute() {
      if (this.checkRole(this.role, 9) || this.checkRole(this.role, 10))
        this.$router.push("/ManageApplication");
      else if (this.checkRole(this.role, 8))
        this.$router.push("/AccreditationRequests");
      else if (this.checkRole(this.role, 7))
        this.$router.push("/InternalAccreditationTask");
      else if (
        this.checkRole(this.offices, 5) ||
        this.checkRole(this.offices, 6)
      )
        this.$router.push("/PlanAccreditation");
      else if (
        this.checkRole(this.offices, 3) ||
        this.checkRole(this.offices, 4)
      )
        this.$router.push("/ManageSupportUploads");
      else if (
        this.checkRole(this.offices, 2) ||
        this.checkRole(this.offices, 11)
      )
        this.$router.push("/TaskForceHeadTask");
      else if (this.checkRole(this.offices, 1))
        this.$router.push("/TaskForceTask");
    }
  },
  created() {
    if (this.token) this.setRoute();
  }
};
</script>

<style scoped lang="scss">
.welcome-header {
  margin-top: 50%;
}
.welcome-content {
  margin-top: 54%;
  height: 5px;
}
.box-login {
  background-color: white;
  padding-left: 30px;
  padding-right: 30px;
  height: 550px;
}
.box-welcome {
  height: 550px;
  text-align: center;
}
.signin-form {
  height: 550px;
  width: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.center {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.login-title {
  color: #1f1a4f;
}
.title {
  font-size: xx-large;
  color: white;
}
.ustp {
  color: white;
  font-weight: bold;
  font-size: 12px;
}
.overlay {
  // opacity: 0.8;
  background-color: #1f1a4f;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 1000;
}
.campus-select {
  min-width: max-content;
  font-size: xx-small;
  z-index: 10000;
}
</style>
