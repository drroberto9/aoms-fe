<template>
  <div>
    <!--Create Office-->
    <b-modal id="app" v-model="createOffice" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create Office</h5>
      </template>
      <form @submit.prevent="submit">
        <b-form-checkbox
          v-model="systemStatus"
          :value="true"
          :unchecked-value="false"
          >System Wide Office</b-form-checkbox
        >

        <b-form-checkbox
          v-model="departmentStatus"
          :value="true"
          :unchecked-value="false"
          >Department Office</b-form-checkbox
        >

        <br />

        <div v-if="departmentStatus === false">
          <b-form-group
            id="createOffice-group-1"
            label="*Office Name:"
            label-for="createOffice-1"
          >
            <b-form-input
              id="createOffice-1"
              v-model="office_name"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <div v-else>
          <b-form-group
            id="createOffice-group-1"
            label="*Main Office:"
            label-for="createOffice-1"
          >
            <multiselect
              v-model="officeSelected"
              :options="officeList"
              :custom-label="officeName"
              :placeholder="null"
              required
            ></multiselect>
            <!--            <b-form-select id="createOffice-1" v-model="officeSelect" required>-->
            <!--              <option-->
            <!--                v-for="(item, index) in officeList"-->
            <!--                :key="index"-->
            <!--                :value="item"-->
            <!--              >-->
            <!--                {{ item.office_name }}-->
            <!--              </option>-->
            <!--            </b-form-select>-->
          </b-form-group>

          <b-form-group
            id="createOffice-group-2"
            label="*Department Name:"
            label-for="createOffice-2"
          >
            <b-form-input
              id="createOffice-2"
              v-model="office_name"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createOffice-group-3"
              label="*Email:"
              label-for="createOffice-3"
            >
              <b-form-input
                id="createOffice-3"
                v-model="email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="md-layout-item">
            <b-form-group
              id="createOffice-group-4"
              label="*Contact Number:"
              label-for="createOffice-4"
            >
              <b-form-input
                id="createOffice-4"
                v-model="contact"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createOffice = false"
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

    <!--Edit Office-->
    <b-modal id="app" v-model="editOffice" size="lg" hide-footer>
      <template #modal-header>
        <h5>Edit Office</h5>
      </template>
      <form @submit.prevent="edit">
        <b-form-checkbox
          v-model="officeSelect.type"
          :value="true"
          :unchecked-value="false"
          >System Wide Office</b-form-checkbox
        >

        <br />

        <b-form-group
          id="editOffice-group-1"
          label="Office Name:"
          label-for="editOffice-1"
        >
          <b-form-input
            id="editOffice-1"
            v-model="officeSelect.office_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="editOffice-group-2"
              label="Email:"
              label-for="editOffice-2"
            >
              <b-form-input
                id="editOffice-2"
                v-model="officeSelect.email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="md-layout-item">
            <b-form-group
              id="editOffice-group-3"
              label="Contact Number:"
              label-for="editOffice-3"
            >
              <b-form-input
                id="editOffice-3"
                v-model="officeSelect.contact"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editOffice = false"
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

    <!--Delete Prompt-->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete User</h5>
      </template>
      Are you sure you want to remove this office?
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
    <b-modal id="app" v-model="createOfficePrompt">
      <template #modal-header>
        <h5>Restore Session</h5>
      </template>
      A previous office registration exists, do you want to continue?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="
              office_name = null;
              contact = null;
              email = null;
              systemStatus = false;
              departmentStatus = false;
              createOfficePrompt = false;
              officeSelect = {};
              createOffice = true;
            "
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              createOfficePrompt = false;
              createOffice = true;
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
          <h5>List of Offices</h5>
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
                placeholder="Search Office"
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
                @click="continueCreateOffice()"
                >Add Office</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="officeList"
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
        <template #cell(user)="row">
          {{ concatName(row.item) }}
        </template>
        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Select"
            class="md-icon-button md-dense md-primary"
            @click="select(row.item)"
            ><md-icon>forward</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Edit"
            class="md-icon-button md-dense md-primary"
            @click="
              officeSelect = row.item;
              editOffice = true;
            "
            ><md-icon>edit</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-dense md-accent"
            @click="
              officeSelect = row.item;
              deletePrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
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
      toLower(item.office_name).includes(toLower(term))
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
        {
          key: "office_name",
          label: "Office Name",
          sortable: true
        },
        { key: "email", label: "Email", sortable: true },
        { key: "user", label: "Office Head", sortable: true },
        {
          key: "contact",
          label: "Contact Number",
          sortable: true
        },
        {
          key: "parent_office_name",
          label: "Main Office",
          sortable: true
        },
        { key: "actions", label: "Actions", thStyle: { width: "180px" } }
      ],
      officeList: [],
      officeSelect: {},
      officeSelected: null,
      office_name: null,
      email: null,
      contact: null,
      search: null,
      systemStatus: false,
      departmentStatus: false,
      createOffice: false,
      createOfficePrompt: false,
      editOffice: false,
      deletePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus"
    })
  },
  methods: {
    continueCreateOffice() {
      if (
        this.office_name !== null ||
        this.email !== null ||
        this.contact !== null
      ) {
        this.createOfficePrompt = true;
      } else {
        this.systemStatus = false;
        this.departmentStatus = false;
        this.officeSelect = {};
        this.officeSelected = null;
        this.createOffice = true;
      }
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
        .dispatch("showOffice", this.campus.campus_id)
        .then(result => {
          this.officeList = searchByName(result.data.office, this.search);
          this.totalRows = this.officeList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    submit() {
      this.$isLoading(true);
      let id = this.campus.campus_id;
      let office_name = this.office_name;
      let email = this.email;
      let contact = this.contact;
      let office_id = null;
      let type = this.systemStatus;
      if (this.departmentStatus === true) office_id = this.officeSelected.id;
      this.$store
        .dispatch("createOffice", {
          id,
          office_name,
          email,
          contact,
          office_id,
          type
        })
        .then(result => {
          if (result.data.status === true) {
            this.officeList.push(result.data.office);
            this.totalRows = this.officeList.length;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.office_name = null;
            this.email = null;
            this.contact = null;
            this.systemStatus = false;
            this.departmentStatus = false;
            this.officeSelect = {};
            this.officeSelected = null;
            this.createOffice = false;
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
        .dispatch("editOffice", this.officeSelect)
        .then(result => {
          if (result.data.status === true) {
            this.editOffice = false;
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
          this.snackbar = true;
        });
    },
    remove() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteOffice", this.officeSelect.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.officeList.findIndex(
              data => data.id === this.officeSelect.id
            );
            this.officeList.splice(index, 1);
            this.totalRows = this.officeList.length;
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
      else return "n/a";
    },
    officeName({ office_name }) {
      return `${office_name}`;
    },
    select(item) {
      this.$store.commit("saveOffice", item);
      this.$router.push("/AssignUploads");
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showOffice", this.campus.campus_id)
      .then(result => {
        this.officeList = result.data.office;
        this.totalRows = this.officeList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
