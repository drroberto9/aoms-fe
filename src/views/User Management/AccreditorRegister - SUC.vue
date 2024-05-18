<template>
  <div>
    <b-modal id="app" v-model="createUser" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create Accreditor</h5>
      </template>
      <form @submit.prevent="submit">
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createUser-group-1"
              label="*First Name:"
              label-for="createUser-1"
            >
              <b-form-input
                id="createUser-1"
                v-model="first_name"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="md-layout-item" style="max-width: 130px">
            <b-form-group
              id="createUser-group-2"
              label="MI:"
              label-for="createUser-2"
            >
              <b-form-input
                id="createUser-2"
                v-model="middle_initial"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createUser-group-3"
              label="*Last Name:"
              label-for="createUser-3"
            >
              <b-form-input
                id="createUser-3"
                v-model="last_name"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="md-layout-item" style="max-width: 130px">
            <b-form-group
              id="createUser-group-4"
              label="Ext:"
              label-for="createUser-4"
            >
              <b-form-input
                id="createUser-4"
                v-model="name_extension"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createUser-group-5"
              label="*Email:"
              label-for="createUser-5"
            >
              <b-form-input
                id="createUser-5"
                v-model="email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="md-layout-item">
            <b-form-group
              id="createUser-group-6"
              label="*Contact Number:"
              label-for="createUser-6"
            >
              <b-form-input
                id="createUser-6"
                v-model="contact_no"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <!--        <b-form-group-->
        <!--          id="createUser-group-5"-->
        <!--          label="*Birth Date:"-->
        <!--          label-for="createUser-5"-->
        <!--        >-->
        <!--          <b-form-input-->
        <!--            id="createUser-5"-->
        <!--            v-model="contact_no"-->
        <!--            type="number"-->
        <!--            required-->
        <!--          ></b-form-input>-->
        <!--        </b-form-group>-->

        <b-form-group
          id="createUser-group-7"
          label="*Password:"
          label-for="createUser-7"
        >
          <b-input-group>
            <b-form-input
              id="createUser-7"
              v-model="password"
              type="password"
              required
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="password = 'password'"
                >Default</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="createUser-group-8"
          label="*Specialization:"
          label-for="createUser-8"
        >
          <b-form-input
            id="createUser-8"
            v-model="specialization"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="createUser-group-9"
          label="*Campus:"
          label-for="createUser-9"
        >
          <multiselect
            v-model="campusSelect"
            :options="campusList"
            :custom-label="campusName"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select id="createUser-9" v-model="campusSelect" required>-->
          <!--            <b-form-select-option :value="null"></b-form-select-option>-->
          <!--            <option-->
          <!--              v-for="(item, index) in campusList"-->
          <!--              :key="index"-->
          <!--              :value="item"-->
          <!--            >-->
          <!--              {{ item.campus_name }}-->
          <!--            </option>-->
          <!--          </b-form-select>-->
        </b-form-group>

        <b-form-group
          id="createUser-group-10"
          label="*Region:"
          label-for="createUser-10"
        >
          <b-form-input
            id="createUser-10"
            v-model="region"
            type="text"
            disabled
          ></b-form-input>
        </b-form-group>

        <!--        <b-form-group-->
        <!--          v-else-->
        <!--          id="createUser-group-11"-->
        <!--          label="*Region:"-->
        <!--          label-for="createUser-11"-->
        <!--        >-->
        <!--          <multiselect-->
        <!--            v-model="region"-->
        <!--            :options="options"-->
        <!--            :custom-label="regionText"-->
        <!--            :placeholder="null"-->
        <!--            required-->
        <!--          ></multiselect>-->
        <!--          <b-form-select-->
        <!--            id="createUser-11"-->
        <!--            v-model="region"-->
        <!--            :options="options"-->
        <!--            required-->
        <!--          ></b-form-select>-->
        <!--        </b-form-group>-->

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createUser = false"
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

    <b-modal id="app" v-model="existingUserPrompt">
      <template #modal-header>
        <h5>Existing User</h5>
      </template>
      {{ concatName(user) }} already exist as an Accreditor by AACUP. Do you
      want to register {{ concatName(user) }} to
      {{ campusSelect ? campusSelect.campus_name : "this SUC" }}?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="existingUserPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="assignCampus()"
            >Proceed</md-button
          >
        </div>
      </template>
    </b-modal>

    <b-modal id="app" v-model="activatePrompt">
      <template #modal-header>
        <h5>Activate User</h5>
      </template>
      Are you sure you want to activate this user?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="activatePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              activateUser();
              activatePrompt = false;
            "
            >Activate</md-button
          >
        </div>
      </template>
    </b-modal>

    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Deactivate User</h5>
      </template>
      Are you sure you want to deactivate this user?
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
            @click="
              deleteUser();
              deletePrompt = false;
            "
            >Deactivate</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Existing Application-->
    <b-modal id="app" v-model="createUserPrompt">
      <template #modal-header>
        <h5>Restore Session</h5>
      </template>
      A previous user registration exists, do you want to continue?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="
              first_name = null;
              last_name = null;
              middle_initial = null;
              name_extension = null;
              email = null;
              contact_no = null;
              password = null;
              specialization = null;
              campusSelect = null;
              region = null;
              createUserPrompt = false;
              createUser = true;
            "
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              createUserPrompt = false;
              createUser = true;
            "
            >Yes</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ campus.institution_name }}</h4>
          <h5>List of Accreditors</h5>
        </div>
        <div class="md-layout-item" style="min-width: max-content">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: 65px">
              <b-form-select v-model="perPage" class="mb-3">
                <b-form-select-option :value="5">5</b-form-select-option>
                <b-form-select-option :value="10">10</b-form-select-option>
                <b-form-select-option :value="20">20</b-form-select-option>
              </b-form-select>
            </div>
            <div class="md-layout-item" style="max-width: 330px">
              <b-form-input
                placeholder="Search User"
                v-model="search"
                @input="searchOnTable"
                type="text"
              ></b-form-input>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                style="width: 200px; margin: 0;"
                class="md-primary md-raised"
                @click="continueCreateUser()"
                >Add User</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="users"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        class="md-elevation-2"
        outlined
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(name)="row">
          {{ concatName(row.item) }}
        </template>

        <template #cell(status)="row">
          <div v-if="row.value === 'active'" style="color: green">Active</div>
          <div v-else style="color: red">Inactive</div>
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Deactivate"
            v-if="
              row.item.status === 'active' &&
                row.item.accreditor_status === 'Unregistered'
            "
            class="md-icon-button md-dense md-accent"
            @click="
              user = row.item;
              deletePrompt = true;
            "
            ><md-icon>lock_open</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Activate"
            v-else-if="row.item.accreditor_status === 'Unregistered'"
            class="md-icon-button md-dense md-primary"
            @click="
              user = row.item;
              activatePrompt = true;
            "
            ><md-icon>lock</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Select"
            class="md-icon-button md-dense md-primary"
            @click="select(row.item)"
            ><md-icon>forward</md-icon></md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-auto md-elevation-2"
      ></b-pagination>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.first_name.concat(" ", item.last_name)).includes(
        toLower(term)
      )
    );
  }
  return items;
};

export default {
  name: "TableSearch",
  data() {
    return {
      sortBy: "name",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "user_id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email" },
        { key: "region", label: "Region", sortable: true },
        { key: "accreditor_status", label: "AACCUP Status", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "130px" } }
      ],
      users: [{}],
      user: {},
      campusList: [],
      first_name: null,
      last_name: null,
      middle_initial: null,
      name_extension: null,
      email: null,
      contact_no: null,
      campusSelect: null,
      region: null,
      password: null,
      specialization: null,
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
      search: null,
      createUser: false,
      createUserPrompt: false,
      editUser: false,
      activatePrompt: false,
      deletePrompt: false,
      existingUserPrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus"
    })
  },
  watch: {
    campusSelect() {
      this.region = this.campusSelect.region;
    }
  },
  methods: {
    continueCreateUser() {
      if (
        this.first_name !== null ||
        this.last_name !== null ||
        this.middle_initial !== null ||
        this.name_extension !== null ||
        this.email !== null ||
        this.contact_no !== null ||
        this.password !== null ||
        this.specialization !== null ||
        this.campusSelect !== null ||
        this.region !== null
      ) {
        this.createUserPrompt = true;
      } else this.createUser = true;
    },
    makeToast(title, variant) {
      this.$bvToast.toast(this.snackbarText, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-left",
        solid: true,
        autoHideDelay: 3000
      });
    },
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showLocalAccreditor", this.campus.suc_id)
        .then(result => {
          this.users = searchByName(result.data.users, this.search);
          this.totalRows = this.users.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    submit() {
      this.$isLoading(true);
      let first_name = this.first_name;
      let last_name = this.last_name;
      let middle_initial = this.middle_initial;
      let name_extension = this.name_extension;
      let email = this.email;
      let contact_no = this.contact_no;
      let password = this.password;
      let specialization = this.specialization;
      let campus_id = this.campusSelect.id;
      let region = this.region;
      let accreditor_status = "Unregistered";
      let role = "external accreditor";
      this.$store
        .dispatch("registerSucUser", {
          first_name,
          last_name,
          middle_initial,
          name_extension,
          email,
          contact_no,
          password,
          specialization,
          campus_id,
          region,
          accreditor_status,
          role
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showLocalAccreditor", this.campus.suc_id)
              .then(result => {
                this.users = result.data.users;
                this.totalRows = this.users.length;
              });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.first_name = null;
            this.last_name = null;
            this.middle_initial = null;
            this.name_extension = null;
            this.email = null;
            this.contact_no = null;
            this.password = null;
            this.specialization = null;
            this.campusSelect = null;
            this.region = null;
            this.createUser = false;
          } else {
            this.$isLoading(false);
            if (result.data.message === "Registered") {
              this.user = result.data.user;
              this.createUser = false;
              this.existingUserPrompt = true;
            }
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
    assignCampus() {
      this.$isLoading(true);
      let user_id = this.user.id;
      let campus_id = this.campusSelect.id;
      this.$store
        .dispatch("addToCampus", {
          user_id,
          campus_id
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showLocalAccreditor", this.campus.suc_id)
              .then(result => {
                this.users = result.data.users;
                this.totalRows = this.users.length;
              });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.first_name = null;
            this.last_name = null;
            this.middle_initial = null;
            this.name_extension = null;
            this.email = null;
            this.contact_no = null;
            this.password = null;
            this.specialization = null;
            this.campusSelect = null;
            this.region = null;
            this.existingUserPrompt = false;
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
    deleteUser() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteUser", this.user.user_id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.users.findIndex(
              data => data.user_id === this.user.user_id
            );
            this.users[index].status = "inactive";
            this.totalRows = this.users.length;
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
    activateUser() {
      this.$isLoading(false);
      this.$store
        .dispatch("activateUser", this.user.user_id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.users.findIndex(
              data => data.user_id === this.user.user_id
            );
            this.users[index].status = "active";
            this.totalRows = this.users.length;
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
    regionText({ text }) {
      return `${text}`;
    },
    select(item) {
      if (item != null) {
        this.$store.commit("saveUserAccount", item);
        this.$store.commit("saveAccountID", item.user_id);
        this.$router.push("/AccreditorProfile_SUC");
      }
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showLocalAccreditor", this.campus.suc_id)
      .then(result => {
        this.users = result.data.users;
        this.totalRows = this.users.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showCampus", this.campus.suc_id)
      .then(result => {
        this.campusList = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
