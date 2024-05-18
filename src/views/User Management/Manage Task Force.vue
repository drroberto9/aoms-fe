<template>
  <div>
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

        <div v-if="office.role === 'college task force head'">
          <b-form-group
            id="createUser-group-8"
            label="*Role:"
            label-for="createUser-8"
          >
            <multiselect
              v-model="role"
              :options="options"
              :custom-label="roleText"
              :placeholder="null"
              required
            ></multiselect>
          </b-form-group>

          <b-form-group
            id="createUser-group-8"
            label="*Department:"
            label-for="createUser-8"
          >
            <multiselect
              v-model="departmentSelect"
              :options="departmentList"
              :custom-label="officeName"
              :placeholder="null"
              required
            ></multiselect>
          </b-form-group>
        </div>

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
      {{ concatName(user) }} already exist as an Accreditor. Do you want to add
      the role {{ this.role }}?
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
            @click="addRole(user.id)"
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
              role = null;
              departmentSelect = null;
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
          <h4>{{ office ? office.office_name : campus.institution_name }}</h4>
          <h5>{{ campus.campus_name }}</h5>
          <h5>Accreditatation Task Force Users</h5>
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

        <template #cell(office_roles)="row">
          <div class="md-layout">
            <div class="md-layout-item">
              <b-form-tags style="border: none" add-on-change no-outer-focus>
                <template>
                  <div>
                    <span
                      v-for="(item, index) in row.item.office_roles"
                      :key="index"
                    >
                      <b-form-tag class="hide-close" variant="primary"
                        >{{ item.office_name }} ({{ item.role }})</b-form-tag
                      >
                    </span>
                  </div>
                </template>
              </b-form-tags>
            </div>
          </div>

          <!-- <span
            v-for="(item, index) in row.item.office_roles"
            :key="index"
          >
            {{ item.office_name }} ({{ item.role }})
            <a v-if="row.item.office_roles[index + 1]">,</a>
          </span> -->
        </template>

        <!-- <template #cell(office)="row">
          {{
            getOffice(row.item.user_id)
              ? getOffice(row.item.user_id).office_name
              : ""
          }}
        </template> -->

        <template #cell(status)="row">
          <div v-if="row.value === 'active'" style="color: green">Active</div>
          <div v-else style="color: red">Inactive</div>
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Deactivate"
            v-if="row.item.status === 'active'"
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
            v-else
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
      sortBy: "id",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email" },
        { key: "office_roles", label: "Department" },
        { key: "contact_no", label: "Contact Number" },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "130px" } }
      ],
      users: [{}],
      roles: [{}],
      user: {},
      departmentList: [],
      departmentSelect: null,
      first_name: null,
      last_name: null,
      middle_initial: null,
      name_extension: null,
      email: null,
      contact_no: null,
      password: null,
      role: null,
      role_id: null,
      office: null,
      search: null,
      options: [
        { value: "accreditation task force", text: "Accreditation Task Force" },
        {
          value: "program task force chair",
          text: "Program Task Force Chair"
        }
      ],
      createUser: false,
      createUserPrompt: false,
      existingUserPrompt: false,
      activatePrompt: false,
      deletePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus",
      offices: "offices"
    })
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
        this.password !== null
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
    setRole(setRoles) {
      let roles = [];
      for (let y = 0; y < this.options.length; y++) {
        let value = this.options[y].value;
        let text = this.options[y].text;
        roles.push({ value, text });
      }
      for (let x = 0; x < setRoles.length; x++) {
        let index = roles.findIndex(data => data.value === setRoles[x].role);
        roles.splice(index, 1);
      }
      return roles;
    },
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showCampusUser", this.campus.campus_id)
        .then(result => {
          if (this.office.role === "college task force head")
            this.users = searchByName(result.data.college, this.search);
          else if (this.office.role === "program task force chair")
            this.users = searchByName(result.data.department, this.search);
          this.totalRows = this.users.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    // setRoles(user_id) {
    //   return this.roles.filter(item => item.user_id === user_id);
    // },
    // getOffice(user_id) {
    //   let result = this.offices.find(item => item.user_id === user_id);
    //   if (result) return result;
    // },
    submit() {
      this.$isLoading(true);
      let campus_id = this.campus.campus_id;
      let first_name = this.first_name;
      let last_name = this.last_name;
      let middle_initial = this.middle_initial;
      let name_extension = this.name_extension;
      let email = this.email;
      let contact_no = this.contact_no;
      let password = this.password;
      let office_id = this.office.office_id;
      if (this.office.role === "college task force head")
        office_id = this.departmentSelect.id;
      let role = "accreditation task force";
      if (this.office.role === "college task force head") role = this.role;
      this.$store
        .dispatch("registerSucUser", {
          campus_id,
          first_name,
          last_name,
          middle_initial,
          name_extension,
          email,
          contact_no,
          password,
          office_id,
          role
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCampusUser", this.campus.campus_id)
              .then(result => {
                if (this.office.role === "college task force head")
                  this.users = result.data.college;
                else if (this.office.role === "program task force chair")
                  this.users = result.data.department;
                this.totalRows = this.users.length;
              });
            this.$isLoading(false);
            this.first_name = null;
            this.last_name = null;
            this.middle_initial = null;
            this.name_extension = null;
            this.email = null;
            this.contact_no = null;
            this.password = null;
            this.role = null;
            this.departmentSelect = null;
            this.createUser = false;
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
    addRole(user_id) {
      this.$isLoading(true);
      // let user_id = this.user.user_id;
      let role = "accreditation task force";
      if (this.office.role === "college task force head") role = this.role;
      let office_id = null;
      this.$store
        .dispatch("setRole", { user_id, role, office_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCampusUser", this.campus.campus_id)
              .then(result => {
                if (this.office.role === "college task force head")
                  this.users = result.data.college;
                else if (this.office.role === "program task force chair")
                  this.users = result.data.department;
                this.totalRows = this.users.length;
              });
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
      this.$isLoading(true);
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
    setDepartment() {
      this.office = this.offices.find(
        data =>
          data.role === "college task force head" ||
          data.role === "program task force chair"
      );
    },
    roleText({ text }) {
      return `${text}`;
    },
    officeName({ office_name }) {
      return `${office_name}`;
    },
    select(item) {
      if (item != null) {
        this.$store.commit("saveUserAccount", item);
        this.$store.commit("saveAccountID", item.user_id);
        this.$router.push("/TaskForceProfile");
      }
    }
  },
  async created() {
    this.$isLoading(true);
    await this.setDepartment();

    await this.$store
      .dispatch("showCampusUser", this.campus.campus_id)
      .then(result => {
        if (this.office.role === "college task force head")
          this.users = result.data.college;
        else if (this.office.role === "program task force chair")
          this.users = result.data.college;
        this.totalRows = this.users.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showDepartment", this.office.office_id)
      .then(result => {
        this.departmentList = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$isLoading(false);
  }
};
</script>

<style lang="scss">
.hide-close button.close {
  display: none;
}
</style>
