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

    <!--Edit Password-->
    <b-modal id="app" v-model="editPassword" hide-footer>
      <template #modal-header>
        <h5>Change Password</h5>
      </template>
      <form @submit.prevent="changePassword">
        <div class="md-layout" style="margin-bottom: 5px">
          <div class="md-layout-item" style="max-width: 180px">
            *Current Password:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="current_password"
              type="password"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-bottom: 5px">
          <div class="md-layout-item" style="max-width: 180px">
            *New Password:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="new_password"
              type="password"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-bottom: 5px">
          <div class="md-layout-item" style="max-width: 180px">
            *Confirm Password:
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
              @click="editPassword = false"
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

    <!--Edit Region-->
    <b-modal id="app" v-model="editRegion" hide-footer>
      <template #modal-header>
        <h5>Change Region</h5>
      </template>
      <form @submit.prevent="edit">
        <div class="md-layout" style="margin-bottom: 5px">
          <div
            class="md-layout-item"
            style="max-width: max-content; margin-right: 15px"
          >
            *Region:
          </div>
          <div class="md-layout-item">
            <multiselect
              v-model="region"
              :options="options"
              :custom-label="regionText"
              :placeholder="null"
              required
            ></multiselect>
            <!--            <b-form-select-->
            <!--              v-model="region"-->
            <!--              :options="options"-->
            <!--              required-->
            <!--            ></b-form-select>-->
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editRegion = false"
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

    <!--Edit SUC-->
    <b-modal id="app" v-model="editAffiliation" size="lg" hide-footer>
      <template #modal-header>
        <h5>Edit SUC Affiliation</h5>
      </template>
      <form @submit.prevent="edit">
        <div class="md-layout" style="margin-bottom: 5px">
          <div class="md-layout-item" style="max-width: 100px">
            *Campus:
          </div>
          <div class="md-layout-item">
            <multiselect
              v-model="campus"
              :options="campusList"
              :custom-label="campusName"
              :placeholder="null"
              required
            ></multiselect>
            <!--            <b-form-select v-model="campus" required>-->
            <!--              <option-->
            <!--                v-for="(item, index) in campusList"-->
            <!--                :key="index"-->
            <!--                :value="item"-->
            <!--              >-->
            <!--                {{ item.campus_name }}-->
            <!--              </option>-->
            <!--            </b-form-select>-->
          </div>
        </div>
        <div class="md-layout" style="margin-bottom: 5px">
          <div class="md-layout-item" style="max-width: 100px">
            Designation:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="designation" type="text"></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-bottom: 5px">
          <div class="md-layout-item" style="max-width: 100px">
            Academic Rank:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="academic_rank" type="text"></b-form-input>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editAffiliation = false"
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

    <!--Add Specialization-->
    <b-modal id="app" v-model="addSpecialization" hide-footer>
      <template #modal-header>
        <h5>Add Specialization</h5>
      </template>
      <form @submit.prevent="add">
        <div class="md-layout" style="margin-bottom: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *Specialization:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="specialization"
              type="text"
              required
            ></b-form-input>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="addSpecialization = false"
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

    <!--Delete Specialization-->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete Specialization</h5>
      </template>
      Are you sure you want to remove this specialization?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deletePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="remove()"
            >Delete</md-button
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
          v-if="!profile.campus_name"
          class="md-layout-item"
          style="max-width: max-content; margin-right: 5px;"
        >
          <md-button
            style="width: 130px; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="
              setInput();
              editRegion = true;
            "
            >Edit Region</md-button
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
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Region:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.region"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Status:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.accreditor_status"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>

      <br />

      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item"><h6>SUC Affiliation</h6></div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            style="width: max-content; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="
              getCampus();
              setInput();
              editAffiliation = true;
            "
            >Edit</md-button
          >
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Status:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.status"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          SUC:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.suc_name"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Campus:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.campus_name"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Region:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.campus_region"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Designation:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.designation"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 200px">
          Academic Rank:
        </div>
        <div class="md-layout-item">
          <b-form-input
            v-model="profile.academic_rank"
            type="text"
            disabled
          ></b-form-input>
        </div>
      </div>

      <br />

      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item"><h6>Specialization</h6></div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            style="width: max-content; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="
              specialization = null;
              addSpecialization = true;
            "
            >Add</md-button
          >
        </div>
      </div>
      <div v-for="(item, index) in specializationList" :key="index">
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            {{ index + 1 }}.
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="item.specialization"
              type="text"
              disabled
            ></b-form-input>
          </div>
          <div
            class="md-layout-item"
            style="max-width: max-content; margin-left: 5px"
          >
            <md-button
              v-b-tooltip.hover
              title="Delete"
              class="md-icon-button md-dense md-accent"
              @click="
                specializationSelect = item;
                deletePrompt = true;
              "
              ><md-icon>delete</md-icon></md-button
            >
          </div>
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
      specializationSelect: null,
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
      region: null,
      options: [
        { value: "Region I – Ilocos Region", text: "Region I – Ilocos Region" },
        {
          value: "Region II – Cagayan Valley",
          text: "Region II – Cagayan Valley"
        },
        {
          value: "Region III – Central Luzon",
          text: "Region III – Central Luzon"
        },
        { value: "Region IV‑A – CALABARZON", text: "Region IV‑A – CALABARZON" },
        { value: "MIMAROPA Region", text: "MIMAROPA Region" },
        { value: "Region V – Bicol Region", text: "Region V – Bicol Region" },
        {
          value: "Region VI – Western Visayas",
          text: "Region VI – Western Visayas"
        },
        {
          value: "Region VII – Central Visayas",
          text: "Region VII – Central Visayas"
        },
        {
          value: "Region VIII – Eastern Visayas",
          text: "Region VIII – Eastern Visayas"
        },
        {
          value: "Region IX – Zamboanga Peninsula",
          text: "Region IX – Zamboanga Peninsula"
        },
        {
          value: "Region X – Northern Mindanao",
          text: "Region X – Northern Mindanao"
        },
        { value: "Region XI – Davao Region", text: "Region XI – Davao Region" },
        {
          value: "Region XII – SOCCSKSARGEN",
          text: "Region XII – SOCCSKSARGEN"
        },
        { value: "Region XIII – Caraga", text: "Region XIII – Caraga" },
        {
          value: "NCR – National Capital Region",
          text: "NCR – National Capital Region"
        },
        {
          value: "CAR – Cordillera Administrative Region",
          text: "CAR – Cordillera Administrative Region"
        },
        {
          value: "ARMM – Autonomous Region in Muslim Mindanao",
          text: "ARMM – Autonomous Region in Muslim Mindanao"
        }
      ],
      academic_rank: null,
      designation: null,
      campus: null,
      campusList: [],
      specialization: null,
      editPassword: false,
      editRegion: false,
      editAffiliation: false,
      addSpecialization: false,
      deletePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
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
    getCampus() {
      this.$isLoading(true);
      this.$store
        .dispatch("showAllCampus")
        .then(result => {
          this.$isLoading(false);
          this.campusList = result.data;
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    setInput() {
      this.region = this.profile.region;
      this.academic_rank = this.profile.academic_rank;
      this.designation = this.profile.designation;
      this.campus = [
        {
          id: this.profile.campus_id,
          campus_name: this.profile.campus_name,
          region: this.profile.campus_region
        }
      ];
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
    edit() {
      this.$isLoading(true);
      let user_id = this.account_id;
      let region = this.region;
      let campus_id = this.campus.id;
      let academic_rank = this.academic_rank;
      let designation = this.designation;
      if (this.campus.region) {
        region = this.campus.region;
      }
      this.$store
        .dispatch("editAccreditorProfile", {
          user_id,
          region,
          campus_id,
          academic_rank,
          designation
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showAccreditorProfile", this.account_id)
              .then(result => {
                this.profile = result.data.accreditor[0];
              });
            this.editRegion = false;
            this.editAffiliation = false;
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
    add() {
      this.$isLoading(true);
      let user_id = this.account_id;
      let specialization = this.specialization;
      this.$store
        .dispatch("addAccreditorSpecialization", {
          user_id,
          specialization
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showAccreditorSpecialization", this.account_id)
              .then(result => {
                this.specializationList = result.data.specializations;
              });
            this.addSpecialization = false;
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
    remove() {
      this.$isLoading(true);
      this.$store
        .dispatch(
          "deleteAccreditorSpecialization",
          this.specializationSelect.id
        )
        .then(result => {
          if (result.data.status === true) {
            let index = this.specializationList.findIndex(
              data => data.id === this.specializationSelect.id
            );
            this.specializationList.splice(index, 1);
            this.deletePrompt = false;
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
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
    campusName({ campus_name }) {
      return `${campus_name}`;
    },
    regionText(item) {
      return `${item}`;
    }
  },
  async created() {
    await this.$store
      .dispatch("showAccreditorProfile", this.account_id)
      .then(result => {
        this.profile = result.data.accreditor[0];
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showAccreditorSpecialization", this.account_id)
      .then(result => {
        this.specializationList = result.data.specializations;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
  }
};
</script>

<style lang="scss" scoped>
input:disabled {
  background: white !important;
}
</style>
