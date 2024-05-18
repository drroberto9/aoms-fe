<template>
  <div>
    <b-modal id="app" v-model="createProgram" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create Program</h5>
      </template>
      <form @submit.prevent="submit">
        <b-form-group
          id="createProgram-group-1"
          label="*Program Name:"
          label-for="createProgram-1"
        >
          <b-form-input
            id="createProgram-1"
            v-model="program_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createProgram-group-2"
              label="*Department Office:"
              label-for="createProgram-2"
            >
              <multiselect
                v-model="officeSelect"
                :options="officeList"
                :custom-label="officeName"
                :placeholder="null"
                required
              ></multiselect>
            </b-form-group>
          </div>
          <div class="md-layout-item" style="max-width: 250px">
            <b-form-group
              id="createProgram-group-3"
              label="Program Type:"
              label-for="createProgram-3"
            >
              <multiselect
                v-model="type"
                :options="typeOptions"
                :placeholder="null"
                required
              ></multiselect>
            </b-form-group>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createProgram-group-4"
              label="*Current Level:"
              label-for="createProgram-4"
            >
              <multiselect
                v-model="latest_applied_level"
                :options="options"
                :placeholder="null"
                required
              ></multiselect>
              <!--              <b-form-select-->
              <!--                id="createProgram-2"-->
              <!--                v-model="latest_applied_level"-->
              <!--                :options="options"-->
              <!--                required-->
              <!--              />-->
            </b-form-group>
          </div>
          <div class="md-layout-item">
            <b-form-group
              id="createProgram-group-5"
              label="Rating Obtained:"
              label-for="createProgram-5"
            >
              <b-form-input
                id="createProgram-5"
                v-model="rating_obtained"
                type="number"
                step="0.01"
                min="0"
                max="5"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <b-form-group
          id="createProgram-group-6"
          label="End of Validity:"
          label-for="createProgram-6"
        >
          <b-form-datepicker
            id="createProgram-6"
            v-model="duration_of_validity"
          ></b-form-datepicker>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createProgram = false"
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

    <!--Edit Program-->
    <b-modal id="app" v-model="editProgram" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create Program</h5>
      </template>
      <form @submit.prevent="edit">
        <b-form-group
          id="editProgram-group-1"
          label="Program Name:"
          label-for="editProgram-1"
        >
          <b-form-input
            id="editProgram-1"
            v-model="programSelect.program_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="editProgram-group-2"
          label="Program Type:"
          label-for="editProgram-2"
        >
          <multiselect
            v-model="programSelect.type"
            :options="typeOptions"
            :placeholder="null"
            required
          ></multiselect>
        </b-form-group>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <b-form-group
              id="createProgram-group-4"
              label="*Current Level:"
              label-for="createProgram-4"
            >
              <multiselect
                v-model="programSelect.latest_applied_level"
                :options="options"
                :placeholder="null"
                required
              ></multiselect>
            </b-form-group>
          </div>
          <div class="md-layout-item">
            <b-form-group
              id="createProgram-group-5"
              label="Rating Obtained:"
              label-for="createProgram-5"
            >
              <b-form-input
                id="createProgram-5"
                v-model="programSelect.rating_obtained"
                type="number"
                step="0.01"
                min="0"
                max="5"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editProgram = false"
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

    <!--Assign Office-->
    <b-modal id="app" v-model="addOffice" size="lg" hide-footer>
      <template #modal-header>
        <h5>Assign Department Office</h5>
      </template>
      <form @submit.prevent="addProgramOffice()">
        <b-form-group
          id="addOffice-group-1"
          label="Department Office:"
          label-for="addOffice-1"
        >
          <multiselect
            v-model="officeSelect"
            :options="officeList"
            :custom-label="officeName"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select id="addOffice-1" v-model="officeSelect" required>-->
          <!--            <option-->
          <!--              v-for="(item, index) in officeList"-->
          <!--              :key="index"-->
          <!--              :value="item"-->
          <!--            >-->
          <!--              {{ item.office_name }}-->
          <!--            </option>-->
          <!--          </b-form-select>-->
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="addOffice = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              @click="addOffice = false"
              >Add</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete User</h5>
      </template>
      Are you sure you want to delete this program?
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
    <b-modal id="app" v-model="createProgramPrompt">
      <template #modal-header>
        <h5>Restore Session</h5>
      </template>
      A previous program registration exists, do you want to continue?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="
              program_name = null;
              latest_applied_level = null;
              rating_obtained = null;
              duration_of_validity = null;
              officeSelect = null;
              createProgramPrompt = false;
              createProgram = true;
            "
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              createProgramPrompt = false;
              createProgram = true;
            "
            >Yes</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Remove Office-->
    <b-modal id="app" v-model="deleteOfficePrompt">
      <template #modal-header>
        <h5>Remove Office</h5>
      </template>
      Are you sure you want to remove this office?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteOfficePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              deleteProgramOffice();
              deleteOfficePrompt = false;
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
          <h4>{{ campus.institution_name }}</h4>
          <h5>{{ campus.campus_name }}</h5>
          <h5>List of Programs</h5>
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
                placeholder="Search Intended Program"
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
                @click="
                  setOffice();
                  continueCreateProgram();
                "
                >Create Program</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="programList"
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
        <template #cell(rating_obtained)="row">
          {{ roundNum(row.value) }}
        </template>

        <template #cell(preferred_start_date)="row">
          {{ row.item.preferred_start_date }} -
          {{ row.item.preferred_end_date }}
        </template>

        <template #cell(office_name)="row">
          {{ row.item.office_name }}
          <md-button
            v-b-tooltip.hover
            title="Assign Department Office"
            v-if="!row.item.office_name"
            class="md-icon-button md-dense md-primary"
            style="outline: 0"
            @click="
              setOffice();
              programSelect = row.item;
              officeSelect = null;
              addOffice = true;
            "
            ><md-icon>add_circle</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Remove"
            v-else
            class="md-icon-button md-dense md-accent"
            @click="
              programSelect = row.item;
              deleteOfficePrompt = true;
            "
            ><md-icon>close</md-icon></md-button
          >
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Edit"
            class="md-icon-button md-dense md-primary"
            @click="
              programSelect = row.item;
              editProgram = true;
            "
            ><md-icon>edit</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-dense md-accent"
            @click="
              programSelect = row.item;
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
      toLower(item.program_name).includes(toLower(term))
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
          key: "program_name",
          label: "Program Name",
          sortable: true
        },
        {
          key: "rating_obtained",
          label: "Rating Obtained",
          sortable: true
        },
        { key: "accreditation_status", label: "Current Level", sortable: true },
        {
          key: "duration_of_validity",
          label: "Duration of Validation",
          sortable: true
        },
        {
          key: "type",
          label: "Type",
          sortable: true
        },
        {
          key: "office_name",
          label: "Department",
          sortable: true
        },
        { key: "actions", label: "Actions", thStyle: { width: "130px" } }
      ],
      options: [
        "For PSV Accreditation",
        "Candidate",
        "Level I",
        "Level II",
        "Level III",
        "Level III, Phase 1",
        "Level III, Phase 2",
        "Level IV",
        "Level IV, Phase 1",
        "Level IV, Phase 2"
      ],
      typeOptions: ["Graduate", "Undergraduate"],
      programList: [{}],
      programSelect: {},
      program_name: null,
      latest_applied_level: null,
      rating_obtained: null,
      duration_of_validity: null,
      type: null,
      officeList: [],
      officeSelect: null,
      search: null,
      createProgram: false,
      createProgramPrompt: false,
      editProgram: false,
      deletePrompt: false,
      addOffice: false,
      deleteOfficePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus"
    })
  },
  methods: {
    continueCreateProgram() {
      if (
        this.program_name !== null ||
        this.latest_applied_level !== null ||
        this.rating_obtained !== null ||
        this.duration_of_validity !== null ||
        this.type !== null ||
        this.officeSelect !== null
      ) {
        this.createProgramPrompt = true;
      } else this.createProgram = true;
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
        .dispatch("showProgram", this.campus.campus_id)
        .then(result => {
          this.programList = searchByName(result.data, this.search);
          this.totalRows = this.programList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    submit() {
      this.$isLoading(true);
      let program_name = this.program_name;
      let latest_applied_level = this.latest_applied_level;
      let rating_obtained = this.rating_obtained;
      let duration_of_validity = this.duration_of_validity;
      let type = this.type;
      let office_id = this.officeSelect.id;
      let suc_id = this.campus.campus_id;
      this.$store
        .dispatch("addProgram", {
          program_name,
          latest_applied_level,
          rating_obtained,
          duration_of_validity,
          type,
          office_id,
          suc_id
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showProgram", this.campus.campus_id)
              .then(result => {
                this.programList = result.data;
                this.totalRows = this.programList.length;
              });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.program_name = null;
            this.latest_applied_level = null;
            this.rating_obtained = null;
            this.duration_of_validity = null;
            this.type = null;
            this.officeSelect = null;
            this.createProgram = false;
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
      let id = this.programSelect.id;
      let program_name = this.programSelect.program_name;
      let type = this.programSelect.type;
      let latest_applied_level = this.programSelect.latest_applied_level;
      let rating_obtained = this.programSelect.rating_obtained;
      this.$store
        .dispatch("editProgram", {
          id,
          program_name,
          type,
          latest_applied_level,
          rating_obtained
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showProgram", this.campus.campus_id)
              .then(result => {
                this.programList = result.data;
                this.totalRows = this.programList.length;
              });
            this.editProgram = false;
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
      let suc_id = this.campus.campus_id;
      let program_id = this.programSelect.id;
      this.$store
        .dispatch("removeProgram", { suc_id, program_id })
        .then(result => {
          if (result.data.status === true) {
            let index = this.programList.findIndex(
              data => data.id === this.programSelect.id
            );
            this.programList.splice(index, 1);
            this.totalRows = this.programList.length;
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
    addProgramOffice() {
      this.$isLoading(true);
      let program_id = this.programSelect.id;
      let office_id = this.officeSelect.id;
      this.$store
        .dispatch("addProgramOffice", { program_id, office_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showProgram", this.campus.campus_id)
              .then(result => {
                this.programList = result.data;
                this.totalRows = this.programList.length;
              });
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
    deleteProgramOffice() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteProgramOffice", this.programSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showProgram", this.campus.campus_id)
              .then(result => {
                this.programList = result.data;
                this.totalRows = this.programList.length;
              });
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
    officeName({ office_name }) {
      return `${office_name}`;
    },
    setOffice() {
      this.$store
        .dispatch("showOffice", this.campus.campus_id)
        .then(result => {
          this.officeList = result.data.office;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    roundNum(num) {
      if (num !== null) return (Math.round(num * 100) / 100).toFixed(2);
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showProgram", this.campus.campus_id)
      .then(result => {
        this.programList = result.data;
        this.totalRows = this.programList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
