<template>
  <div>
    <!--Edit Account-->
    <b-modal id="app" v-model="editAccount" hide-footer>
      <template #modal-header>
        <h5>Edit Account</h5>
      </template>
      <form @submit.prevent="editUser">
        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 200px">
            First Name:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="first_name"
              type="text"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            MI:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="middle_initial" type="text"></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Last Name:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="last_name"
              type="text"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Ext:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="name_extension" type="text"></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Email:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="email" type="email" required></b-form-input>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editAccount = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Submit</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Edit Password-->
    <b-modal id="app" v-model="editPassword" hide-footer>
      <template #modal-header>
        <h5>Change Password</h5>
      </template>
      <form @submit.prevent="changePassword">
        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 200px">
            Current Password:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="current_password"
              type="password"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            New Password:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="new_password"
              type="password"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Confirm Password:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="confirm_password"
              type="password"
              required
            ></b-form-input>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="
                current_password = null;
                new_password = null;
                confirm_password = null;
                editPassword = false;
              "
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Submit</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Refresh Prompt-->
    <b-modal id="app" v-model="refreshPasswordPrompt">
      <template #modal-header>
        <h5>Reset Password</h5>
      </template>
      Are you sure you want to reset this user's password to the default?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="refreshPasswordPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="resetPassword()"
            >Reset</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px; margin: 0">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item"><h5>Main Record</h5></div>
        <div
          v-if="userEntry === 0"
          class="md-layout-item"
          style="max-width: max-content; margin-right: 5px;"
        >
          <md-button
            style="width: 130px; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="
              editAccount = true;
              setupEditAccout();
            "
            >Edit Account</md-button
          >
        </div>
        <div
          v-if="userEntry === 0"
          class="md-layout-item"
          style="max-width: max-content; margin-right: 5px;"
        >
          <md-button
            style="width: 130px; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="refreshPasswordPrompt = true"
            >Reset Password</md-button
          >
        </div>
        <div
          v-if="userEntry === 1"
          class="md-layout-item"
          style="max-width: max-content"
        >
          <md-button
            style="width: 130px; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="editPassword = true"
            >Change Password</md-button
          >
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          ID:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="account_id"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Full Name:
        </div>
        <div class="md-layout-item">
          <b-form-input v-model="full_name" type="text" disabled></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Email:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="userAccount.email"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainRecord",
  data() {
    return {
      profile: [],
      specializationList: [],
      first_name: null,
      last_name: null,
      middle_initial: null,
      name_extension: null,
      email: null,
      current_password: null,
      new_password: null,
      confirm_password: null,
      editAccount: false,
      refreshPasswordPrompt: false,
      editPassword: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      role: "role",
      userAccount: "userAccount",
      account_id: "account_id",
      userEntry: "userEntry"
    }),
    full_name: {
      get: function() {
        return this.concatName(this.userAccount);
      }
    }
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
    editUser() {
      this.$isLoading(true);
      let user_id = this.account_id;
      let first_name = this.first_name;
      let last_name = this.last_name;
      let middle_initial = this.middle_initial;
      let name_extension = this.name_extension;
      let email = this.email;
      this.$store
        .dispatch("editUser", {
          user_id,
          first_name,
          last_name,
          middle_initial,
          name_extension,
          email
        })
        .then(result => {
          if (result.data.status === true) {
            this.userAccount.first_name = this.first_name;
            this.userAccount.last_name = this.last_name;
            this.userAccount.middle_initial = this.middle_initial;
            this.userAccount.name_extension = this.name_extension;
            this.userAccount.email = this.email;
            this.editAccount = false;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          } else {
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    changePassword() {
      this.$isLoading(true);
      let user_id = this.account_id;
      let current_password = this.current_password;
      let new_password = this.new_password;
      let confirm_password = this.confirm_password;
      this.$store
        .dispatch("changePassword", {
          user_id,
          current_password,
          new_password,
          confirm_password
        })
        .then(result => {
          if (result.data.status === true) {
            this.editPassword = false;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          } else {
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    resetPassword() {
      this.$isLoading(true);
      this.$store
        .dispatch("resetPassword", this.account_id)
        .then(result => {
          if (result.data.status === true) {
            this.refreshPasswordPrompt = false;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          } else {
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    setupEditAccout() {
      this.first_name = this.userAccount.first_name;
      this.middle_initial = this.userAccount.middle_initial;
      this.last_name = this.userAccount.last_name;
      this.name_extension = this.userAccount.name_extension;
      this.email = this.userAccount.email;
    },
    checkRole() {
      if (this.role?.length)
        return !!this.role.find(
          item =>
            item.role_id === 5 ||
            item.role_id === 6 ||
            item.role_id === 9 ||
            item.role_id === 10
        );
      else if (!this.role?.length) return true;
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    }
  }
};
</script>

<style lang="scss" scoped>
input:disabled {
  background: white !important;
}
</style>
