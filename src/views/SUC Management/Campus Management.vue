<template>
  <div>
    <!--Create Campus-->
    <b-modal id="app" v-model="createCampus" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create Campus</h5>
      </template>
      <form @submit.prevent="setUser(0)">
        <b-form-group
          id="createCampus-group-1"
          label="*SUC Name:"
          label-for="createCampus-1"
        >
          <b-form-input
            id="createCampus-1"
            v-model="campus_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createCampus-group-2"
              label="*Email:"
              label-for="createCampus-2"
            >
              <b-form-input
                id="createCampus-2"
                v-model="email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="md-layout-item">
            <b-form-group
              id="createCampus-group-3"
              label="*Contact Number:"
              label-for="createCampus-3"
            >
              <b-form-input
                id="createCampus-3"
                v-model="contact_no"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <b-form-group
          id="createCampus-group-4"
          label="*Address:"
          label-for="createCampus-4"
        >
          <b-form-input
            id="createCampus-4"
            v-model="address"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="createCampus-group-5"
          label="*Region:"
          label-for="createCampus-5"
        >
          <multiselect
            v-model="region"
            :options="options"
            :custom-label="regionText"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select-->
          <!--            id="createCampus-5"-->
          <!--            v-model="region"-->
          <!--            :options="options"-->
          <!--            required-->
          <!--          ></b-form-select>-->
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createCampus = false"
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

    <!--Create User-->
    <b-modal id="app" v-model="createUser" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create User</h5>
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
                v-model="user_email"
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
                v-model="user_contact_no"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <b-form-group
          id="createUser-group-7"
          label="*Password:"
          label-for="createUser-7"
        >
          <b-form-input
            id="createUser-7"
            v-model="password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

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

    <!--New User-->
    <b-modal id="app" v-model="createNewUser" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create User</h5>
      </template>
      <form @submit.prevent="registerQA">
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createNewUser-group-1"
              label="*First Name:"
              label-for="createNewUser-1"
            >
              <b-form-input
                id="createNewUser-1"
                v-model="first_name"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="md-layout-item" style="max-width: 130px">
            <b-form-group
              id="createNewUser-group-2"
              label="MI:"
              label-for="createNewUser-2"
            >
              <b-form-input
                id="createNewUser-2"
                v-model="middle_initial"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createNewUser-group-3"
              label="*Last Name:"
              label-for="createNewUser-3"
            >
              <b-form-input
                id="createNewUser-3"
                v-model="last_name"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="md-layout-item" style="max-width: 130px">
            <b-form-group
              id="createNewUser-group-4"
              label="Ext:"
              label-for="createNewUser-4"
            >
              <b-form-input
                id="createNewUser-4"
                v-model="name_extension"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createNewUser-group-5"
              label="*Email:"
              label-for="createNewUser-5"
            >
              <b-form-input
                id="createNewUser-5"
                v-model="user_email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="md-layout-item">
            <b-form-group
              id="createNewUser-group-6"
              label="*Contact Number:"
              label-for="createNewUser-6"
            >
              <b-form-input
                id="createNewUser-6"
                v-model="user_contact_no"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <b-form-group
          id="createNewUser-group-7"
          label="*Password:"
          label-for="createNewUser-7"
        >
          <b-form-input
            id="createNewUser-7"
            v-model="password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createNewUser = false"
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
    <b-modal id="app" v-model="editCampus" size="lg" hide-footer>
      <template #modal-header>
        <h5>Edit Campus</h5>
      </template>
      <form @submit.prevent="edit">
        <b-form-group
          id="editCampus-group-1"
          label="SUC Name:"
          label-for="editCampus-1"
        >
          <b-form-input
            id="editCampus-1"
            v-model="campusSelect.campus_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="editCampus-group-2"
              label="Email:"
              label-for="editCampus-2"
            >
              <b-form-input
                id="editCampus-2"
                v-model="campusSelect.email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="md-layout-item">
            <b-form-group
              id="editCampus-group-3"
              label="Contact Number:"
              label-for="editCampus-3"
            >
              <b-form-input
                id="editCampus-3"
                v-model="campusSelect.contact_no"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <b-form-group
          id="editCampus-group-4"
          label="Address:"
          label-for="editCampus-4"
        >
          <b-form-input
            id="editCampus-4"
            v-model="campusSelect.address"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="editCampus-group-5"
          label="Region:"
          label-for="editCampus-5"
        >
          <multiselect
            v-model="campusSelect.region"
            :options="options"
            :custom-label="regionText"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select-->
          <!--            id="editCampus-5"-->
          <!--            v-model="campusSelect.region"-->
          <!--            :options="options"-->
          <!--            required-->
          <!--          ></b-form-select>-->
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editCampus = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              @click="editCampus = false"
              >Submit</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Delete Prompt-->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete User</h5>
      </template>
      Are you sure you want to remove this campus?
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
              remove();
              deletePrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Existing Application-->
    <b-modal id="app" v-model="createCampusPrompt">
      <template #modal-header>
        <h5>Restore Session</h5>
      </template>
      A previous campus registration exists, do you want to continue?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="
              campus_name = null;
              contact_no = null;
              email = null;
              address = null;
              region = null;
              first_name = null;
              last_name = null;
              middle_initial = null;
              name_extension = null;
              user_email = null;
              user_contact_no = null;
              password = null;
              createCampusPrompt = false;
              createCampus = true;
            "
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              createCampusPrompt = false;
              createCampus = true;
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
          <h4>{{ suc.institution_name }}</h4>
          <h5>List of Campuses</h5>
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
                placeholder="Search Campus"
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
                @click="continueCreateCampus()"
                >Add Campus</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="campusList"
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
        <template #cell(campus_qa)="row">
          <div v-if="concatName(row.item)">
            {{ concatName(row.item) }}
            {{ row.item.user_email ? "(" + row.item.user_email + ")" : "" }}
          </div>
          <div v-else>
            <md-button
              v-b-tooltip.hover
              title="Assign User"
              class="md-icon-button md-dense md-primary"
              @click="
                campusSelect = row.item;
                setUser(1);
              "
              ><md-icon>add_circle</md-icon></md-button
            >
          </div>
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Edit"
            class="md-icon-button md-dense md-primary"
            @click="
              campusSelect = row.item;
              editCampus = true;
            "
            ><md-icon>edit</md-icon></md-button
          >
          <!--          <md-button-->
          <!--            v-b-tooltip.hover-->
          <!--            title="Delete"-->
          <!--            class="md-icon-button md-dense md-accent"-->
          <!--            @click="-->
          <!--              campusSelect = row.item;-->
          <!--              deletePrompt = true;-->
          <!--            "-->
          <!--            ><md-icon>delete</md-icon></md-button-->
          <!--          >-->
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
      toLower(item.campus_name).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "TableSearch",
  data() {
    return {
      sortBy: "campus_name",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        {
          key: "campus_name",
          label: "Campus Name",
          sortable: true
        },
        { key: "email", label: "Email" },
        {
          key: "campus_qa",
          label: "Campus QA"
        },
        {
          key: "address",
          label: "Address",
          sortable: true
        },
        {
          key: "region",
          label: "Region",
          sortable: true
        },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      campusList: [],
      campusSelect: {},
      user: {},
      campus_name: null,
      address: null,
      region: null,
      email: null,
      contact_no: null,
      first_name: null,
      last_name: null,
      middle_initial: null,
      name_extension: null,
      user_email: null,
      user_contact_no: null,
      password: null,
      search: null,
      options: [
        "Region I – Ilocos Region",
        "Region II – Cagayan Valley",
        "Region III – Central Luzon",
        "Region IV‑A – CALABARZON",
        "MIMAROPA Region",
        "Region V – Bicol Region",
        "Region VI – Western Visayas",
        "Region VII – Central Visayas",
        "Region VIII – Eastern Visayas",
        "Region IX – Zamboanga Peninsula",
        "Region X – Northern Mindanao",
        "Region XI – Davao Region",
        "Region XII – SOCCSKSARGEN",
        "Region XIII – Caraga",
        "NCR – National Capital Region",
        "CAR – Cordillera Administrative Region",
        "ARMM – Autonomous Region in Muslim Mindanao"
      ],
      createCampus: false,
      createCampusPrompt: false,
      editCampus: false,
      createUser: false,
      createNewUser: false,
      existingUserPrompt: false,
      deletePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      suc: "suc"
    })
  },
  methods: {
    continueCreateCampus() {
      if (
        this.campus_name !== null ||
        this.address !== null ||
        this.region !== null ||
        this.email !== null ||
        this.contact_no !== null
      ) {
        this.createCampusPrompt = true;
      } else this.createCampus = true;
    },
    setUser(newUser) {
      this.first_name = null;
      this.last_name = null;
      this.middle_initial = null;
      this.name_extension = null;
      this.user_email = null;
      this.user_contact_no = null;
      this.password = null;

      if (newUser === 0) {
        this.createCampus = false;
        this.createUser = true;
      } else if (newUser === 1) this.createNewUser = true;
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
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
        .dispatch("showCampus", this.suc.id)
        .then(result => {
          this.campusList = searchByName(result.data, this.search);
          this.totalRows = this.campusList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    submit() {
      this.$isLoading(true);
      let id = this.suc.id;
      let campus_name = this.campus_name;
      let address = this.address;
      let region = this.region;
      let email = this.email;
      let contact_no = this.contact_no;
      let first_name = this.first_name;
      let last_name = this.last_name;
      let middle_initial = this.middle_initial;
      let name_extension = this.name_extension;
      let user_email = this.user_email;
      let user_contact_no = this.user_contact_no;
      let password = this.password;
      this.$store
        .dispatch("addCampus", {
          id,
          campus_name,
          address,
          region,
          email,
          contact_no,
          first_name,
          last_name,
          middle_initial,
          name_extension,
          user_email,
          user_contact_no,
          password
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("showCampus", this.suc.id).then(result => {
              this.campusList = result.data;
              this.totalRows = this.campusList.length;
            });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.campus_name = null;
            this.address = null;
            this.region = null;
            this.email = null;
            this.contact_no = null;
            this.first_name = null;
            this.last_name = null;
            this.middle_initial = null;
            this.name_extension = null;
            this.user_email = null;
            this.user_contact_no = null;
            this.password = null;
            this.createUser = false;
            if (result.data.message === "Accreditor") {
              this.user = result.data.user;
              this.existingUserPrompt = true;
            } else {
              this.snackbarText = result.data.message;
              this.makeToast("Success!", "primary");
            }
          } else {
            if (result.data.message === "User already exist") {
              this.$store.dispatch("showCampus", this.suc.id).then(result => {
                this.campusList = result.data;
                this.totalRows = this.campusList.length;
              });
              this.campusSelect = result.data.suc;
              this.createUser = false;
              this.setUser(1);
            }
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
    registerQA() {
      this.$isLoading(true);
      let campus_id = this.campusSelect.id;
      let first_name = this.first_name;
      let last_name = this.last_name;
      let middle_initial = this.middle_initial;
      let name_extension = this.name_extension;
      let email = this.user_email;
      let contact_no = this.user_contact_no;
      let password = this.password;
      let office_id = null;
      this.$store
        .dispatch("registerQA", {
          campus_id,
          first_name,
          last_name,
          middle_initial,
          name_extension,
          email,
          contact_no,
          password,
          office_id
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("showCampus", this.suc.id).then(result => {
              this.campusList = result.data;
            });
            this.$isLoading(false);
            this.createNewUser = false;
            this.first_name = null;
            this.last_name = null;
            this.middle_initial = null;
            this.name_extension = null;
            this.user_email = null;
            this.user_contact_no = null;
            this.password = null;
            this.campusSelect = null;
            if (result.data.message === "Accreditor") {
              this.user = result.data.user;
              this.existingUserPrompt = true;
            } else {
              this.snackbarText = result.data.message;
              this.makeToast("Success!", "primary");
            }
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
    edit() {
      this.$isLoading(true);
      this.$store
        .dispatch("editCampus", this.campusSelect)
        .then(result => {
          if (result.data.status === true) {
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
          this.snackbarText = err + ". Please contact the administrator";
          this.snackbar = true;
        });
    },
    remove() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteCampus", this.campusSelect.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.campusList.findIndex(
              data => data.id === this.campusSelect.id
            );
            this.campusList.splice(index, 1);
            this.totalRows = this.campusList.length;
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
    regionText(item) {
      return `${item}`;
    },
    back() {
      this.$router.push("/ManageSUC");
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showCampus", this.suc.id)
      .then(result => {
        this.campusList = result.data;
        this.totalRows = this.campusList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
