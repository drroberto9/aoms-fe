<template>
  <div>
    <b-modal id="app" v-model="createParameter" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create Parameter</h5>
      </template>
      <form @submit.prevent="submit">
        <b-form-group
          id="createParameter-group-1"
          label="*Parameter:"
          label-for="createParameter-1"
        >
          <b-form-input
            id="createParameter-1"
            v-model="parameter.parameter"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createParameter = false"
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

    <b-modal id="app" v-model="editParameter" size="lg" hide-footer>
      <template #modal-header>
        <h5>Edit Parameter</h5>
      </template>
      <form @submit.prevent="update">
        <b-form-group
          id="editParameter-group-1"
          label="Parameter:"
          label-for="editParameter-1"
        >
          <b-form-input
            id="editParameter-1"
            v-model="parameter.parameter"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editParameter = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              @click="editParameter = false"
              >Edit</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete Instrument</h5>
      </template>
      Are you sure you want to delete this parameter?
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

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ program.intended_program }}</h4>
          <h5 v-if="campus">Campus: {{ campus.campus_name }}</h5>
          <h5>{{ instrument.area_name }}</h5>
        </div>
        <div class="md-layout-item" style="min-width: max-content">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                style="width: 200px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  parameter.parameter = null;
                  createParameter = true;
                "
                >Add Parameter</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="parameters"
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
        <template #cell(updated_at)="row">
          {{ formatDate(row.value) }}
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Edit"
            class="md-icon-button md-dense md-primary"
            @click="select(row.item)"
            ><md-icon>forward</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Edit"
            class="md-icon-button md-dense md-primary"
            @click="
              parameter = row.item;
              editParameter = true;
            "
            ><md-icon>edit</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-dense md-accent"
            @click="
              parameter = row.item;
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
import moment from "moment";

export default {
  name: "ManageParameters",
  data() {
    return {
      sortBy: "parameter",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "parameter", label: "Parameter", sortable: true },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "180px" } }
      ],
      parameters: [{}],
      parameter: {},
      search: null,
      createParameter: false,
      editParameter: false,
      deletePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus",
      program: "program",
      instrument: "instrument"
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
    submit() {
      this.$isLoading(true);
      let parameter = this.parameter.parameter;
      let area_instrument_id = this.instrument.id;
      this.$store
        .dispatch("createParameter", { parameter, area_instrument_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store.commit("saveParameter", parameter);
            this.parameters.push(result.data.parameter);
            this.totalRows = this.parameters.length;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.createParameter = false;
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
        this.$store.commit("saveParameter", item);
        this.$router.push("/ShowStatements");
      }
    },
    update() {
      this.$isLoading(true);
      this.$store
        .dispatch("editParameter", this.parameter)
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
        .dispatch("deleteParameter", this.parameter.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.parameters.findIndex(
              data => data.id === this.parameter.id
            );
            this.parameters.splice(index, 1);
            this.totalRows = this.parameters.length;
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
    formatDate(item) {
      return moment(item).format("llll");
    },
    back() {
      this.$router.push("/ManageInstrument");
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showParameter", this.instrument.id)
      .then(result => {
        this.parameters = result.data;
        this.totalRows = this.parameters.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
