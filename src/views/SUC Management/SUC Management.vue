<template>
  <div>
    <!--Create SUC-->
    <b-modal id="app" v-model="createSUC" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create SUC</h5>
      </template>
      <form @submit.prevent="submit">
        <b-form-group
          id="createSUC-group-1"
          label="*SUC Name:"
          label-for="createSUC-1"
        >
          <b-form-input
            id="createSUC-1"
            v-model="institution_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="createSUC-group-2"
          label="*Address:"
          label-for="createSUC-2"
        >
          <b-form-input
            id="createSUC-2"
            v-model="address"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createSUC-group-3"
              label="*Email:"
              label-for="createSUC-3"
            >
              <b-form-input
                id="createSUC-3"
                v-model="email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="md-layout-item">
            <b-form-group
              id="createSUC-group-4"
              label="*Contact Number:"
              label-for="createSUC-4"
            >
              <b-form-input
                id="createSUC-4"
                v-model="contact_no"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <b-form-group
          id="createSUC-group-5"
          label="Institution Level:"
          label-for="createSUC-5"
        >
          <b-form-input
            id="createSUC-5"
            v-model="suc_level"
            type="number"
            step="0.01"
            min="0"
            max="5"
          ></b-form-input>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createSUC = false"
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
    <b-modal id="app" v-model="editSUC" size="lg" hide-footer>
      <template #modal-header>
        <h5>Edit SUC</h5>
      </template>
      <form @submit.prevent="edit">
        <b-form-group
          id="editSUC-group-1"
          label="SUC Name:"
          label-for="editSUC-1"
        >
          <b-form-input
            id="editSUC-1"
            v-model="sucSelect.institution_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="editSUC-group-2"
          label="Address:"
          label-for="editSUC-2"
        >
          <b-form-input
            id="editSUC-2"
            v-model="sucSelect.address"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="editSUC-group-3"
              label="Email:"
              label-for="editSUC-3"
            >
              <b-form-input
                id="editSUC-3"
                v-model="sucSelect.email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="md-layout-item">
            <b-form-group
              id="editSUC-group-4"
              label="Contact Number:"
              label-for="editSUC-4"
            >
              <b-form-input
                id="editSUC-4"
                v-model="sucSelect.contact_no"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <b-form-group
          id="editSUC-group-5"
          label="Institution Level:"
          label-for="editSUC-5"
        >
          <b-form-select id="editSUC-5" v-model="sucSelect.suc_level" required>
            <b-form-select-option :value="0">0</b-form-select-option>
            <b-form-select-option :value="1">1</b-form-select-option>
            <b-form-select-option :value="2">2</b-form-select-option>
            <b-form-select-option :value="3">3</b-form-select-option>
            <b-form-select-option :value="4">4</b-form-select-option>
            <b-form-select-option :value="5">5</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editSUC = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              @click="editSUC = false"
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
      Are you sure you want to remove this SUC?
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
    <b-modal id="app" v-model="createSUCPrompt">
      <template #modal-header>
        <h5>Restore Session</h5>
      </template>
      A previous SUC registration exists, do you want to continue?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="
              institution_name = null;
              contact_no = null;
              email = null;
              address = null;
              suc_level = null;
              createSUCPrompt = false;
              createSUC = true;
            "
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              createSUCPrompt = false;
              createSUC = true;
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
          <h4>AACCUP</h4>
          <h5>List of SUC</h5>
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
                placeholder="Search SUC"
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
                @click="continueCreateSUC()"
                >Create SUC</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="sucList"
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
              sucSelect = row.item;
              editSUC = true;
            "
            ><md-icon>edit</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-dense md-accent"
            @click="
              sucSelect = row.item;
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
  if (items?.length) {
    return items.filter(item =>
      toLower(item.institution_name).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "TableSearch",
  data() {
    return {
      sortBy: "program_name",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        {
          key: "institution_name",
          label: "SUC Name",
          sortable: true
        },
        {
          key: "address",
          label: "Address",
          sortable: true
        },
        { key: "email", label: "Email", sortable: true },
        {
          key: "contact_no",
          label: "Contact Number",
          sortable: true
        },
        {
          key: "suc_level",
          label: "Institutional Level",
          sortable: true
        },
        { key: "actions", label: "Actions", thStyle: { width: "180px" } }
      ],
      sucList: [{}],
      sucSelect: {},
      institution_name: null,
      address: null,
      email: null,
      contact_no: null,
      suc_level: null,
      search: null,
      createSUC: false,
      createSUCPrompt: false,
      editSUC: false,
      deletePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      program: "program"
    })
  },
  methods: {
    continueCreateSUC() {
      if (
        this.institution_name !== null ||
        this.address !== null ||
        this.email !== null ||
        this.contact_no !== null ||
        this.suc_level !== null
      ) {
        this.createSUCPrompt = true;
      } else this.createSUC = true;
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
        .dispatch("showSuc")
        .then(result => {
          this.sucList = searchByName(result.data, this.search);
          this.totalRows = this.sucList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    submit() {
      this.$isLoading(true);
      let institution_name = this.institution_name;
      let address = this.address;
      let email = this.email;
      let contact_no = this.contact_no;
      let suc_level = this.suc_level;
      this.$store
        .dispatch("addSuc", {
          institution_name,
          address,
          email,
          contact_no,
          suc_level
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("showSuc").then(result => {
              this.sucList = result.data;
              this.totalRows = this.sucList.length;
            });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.institution_name = null;
            this.address = null;
            this.email = null;
            this.contact_no = null;
            this.suc_level = null;
            this.createSUC = false;
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
        .dispatch("editSuc", this.sucSelect)
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
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    remove() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteSuc", this.sucSelect.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.sucList.findIndex(
              data => data.id === this.sucSelect.id
            );
            this.sucList.splice(index, 1);
            this.totalRows = this.sucList.length;
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
    select(item) {
      if (item != null) {
        this.$store.commit("saveSUC", item);
        this.$router.push("/ManageCampus");
      }
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showSuc")
      .then(result => {
        this.sucList = result.data;
        this.totalRows = this.sucList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
