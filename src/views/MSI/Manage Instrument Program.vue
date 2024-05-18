<template>
  <div>
    <b-modal id="app" v-model="createMSIProgram" size="lg" hide-footer>
      <template #modal-header>
        <h5>Master Survey Instrument</h5>
      </template>
      <form @submit.prevent="submit(create)">
        <b-form-group
          id="createMSIProgram-group-1"
          label="*Intended Program:"
          label-for="createMSIProgram-1"
        >
          <b-form-input
            id="createMSIProgram-1"
            v-model="intended_program"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="createMSIProgram-group-2"
          label="*Type of Instrument:"
          label-for="createMSIProgram-2"
        >
          <b-form-input
            id="createMSIProgram-2"
            v-model="type_of_instrument"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createMSIProgram = false"
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

    <b-modal id="app" v-model="editMSI" size="lg" hide-footer>
      <template #modal-header>
        <h5>Edit Program</h5>
      </template>
      <form @submit.prevent="update">
        <b-form-group
          id="editMSI-group-1"
          label="Intended Program:"
          label-for="editMSI-1"
        >
          <b-form-input
            id="editMSI-1"
            v-model="intended_program"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="editMSI-group-2"
          label="Type of Instrument:"
          label-for="editMSI-2"
        >
          <b-form-input
            id="editMSI-2"
            v-model="type_of_instrument"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editMSI = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              @click="editMSI = false"
              >Edit</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--    <b-modal id="app" v-model="cloneMSI" size="lg" hide-footer>-->
    <!--      <template #modal-header>-->
    <!--        <h5>Clone Instrument</h5>-->
    <!--      </template>-->
    <!--      <form @submit.prevent="clone">-->
    <!--        <b-form-group-->
    <!--          id="cloneMSI-group-1"-->
    <!--          label="Intended Program:"-->
    <!--          label-for="cloneMSI-1"-->
    <!--        >-->
    <!--          <b-form-input-->
    <!--            id="cloneMSI-1"-->
    <!--            v-model="intended_program"-->
    <!--            type="text"-->
    <!--            required-->
    <!--          ></b-form-input>-->
    <!--        </b-form-group>-->

    <!--        <b-form-group-->
    <!--          id="cloneMSI-group-2"-->
    <!--          label="Type of Instrument:"-->
    <!--          label-for="cloneMSI-2"-->
    <!--        >-->
    <!--          <b-form-input-->
    <!--            id="cloneMSI-2"-->
    <!--            v-model="type_of_instrument"-->
    <!--            type="text"-->
    <!--            required-->
    <!--          ></b-form-input>-->
    <!--        </b-form-group>-->

    <!--        <md-card-actions>-->
    <!--          <div>-->
    <!--            <md-button-->
    <!--              class="md-primary md-raised"-->
    <!--              style="margin: 0 5px 0 0"-->
    <!--              @click="cloneMSI = false"-->
    <!--              >Cancel</md-button-->
    <!--            >-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <md-button-->
    <!--              class="md-primary md-raised"-->
    <!--              style="margin: 0"-->
    <!--              type="submit"-->
    <!--              >Submit</md-button-->
    <!--            >-->
    <!--          </div>-->
    <!--        </md-card-actions>-->
    <!--      </form>-->
    <!--    </b-modal>-->

    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete Instrument</h5>
      </template>
      Are you sure you want to delete this intrument?
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
      <md-tabs :md-active-tab="tabSelect.x" md-elevation="1" class="md-primary">
        <!--PSV-->
        <md-tab id="manage-instruments-0" md-label="PSV" style="padding: 0">
          <br />
          <b-table
            :items="psvList"
            :fields="fields_psv"
            :sort-by.sync="sortBy_psv"
            :sort-desc.sync="sortDesc_psv"
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
                title="Select"
                class="md-icon-button md-dense md-primary"
                @click="selectPSV(row.item)"
                ><md-icon>forward</md-icon></md-button
              >
            </template>
          </b-table>
        </md-tab>

        <!--Instruments-->
        <md-tab
          id="manage-instruments-1"
          md-label="Old Policy"
          style="padding: 0"
        >
          <br />
          <div class="md-layout" style="margin-bottom: 15px">
            <div class="md-layout-item">
              <h4>
                {{
                  checkRole(9) || checkRole(10)
                    ? "AACCUP"
                    : campus.institution_name
                }}
              </h4>
              <h5>List of Instruments</h5>
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
                  <b-dropdown
                    text="Create Instrument"
                    variant="primary"
                    dropleft
                  >
                    <b-dropdown-item
                      @click="
                        intended_program = null;
                        type_of_instrument = 'OBE Instrument';
                        create = 0;
                        createMSIProgram = true;
                      "
                      >Blank Instrument</b-dropdown-item
                    >
                    <b-dropdown-item
                      @click="
                        msiTemplate();
                        intended_program = null;
                        type_of_instrument = 'OBE Instrument';
                        create = 1;
                        createMSIProgram = true;
                      "
                      >Clone Master File</b-dropdown-item
                    >
                  </b-dropdown>

                  <!--              <md-button-->
                  <!--                style="width: 200px; margin: 0"-->
                  <!--                class="md-primary md-raised"-->
                  <!--                @click="-->
                  <!--                  intended_program = null;-->
                  <!--                  type_of_instrument = null;-->
                  <!--                  createMSIProgram = true;-->
                  <!--                "-->
                  <!--                >Create Instrument</md-button-->
                  <!--              >-->
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
            <template #cell(updated_at)="row">
              {{ formatDate(row.value) }}
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
                  instruments = row.item;
                  intended_program = row.item.intended_program;
                  type_of_instrument = 'OBE Instrument';
                  editMSI = true;
                "
                ><md-icon>edit</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Use Template"
                class="md-icon-button md-dense md-primary"
                @click="
                  instruments = row.item;
                  intended_program = row.item.intended_program + '-copy';
                  type_of_instrument = 'OBE Instrument';
                  create = 1;
                  createMSIProgram = true;
                "
                ><md-icon>file_copy</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-dense md-accent"
                @click="
                  instruments = row.item;
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
        </md-tab>

        <!--New Policy-->
        <md-tab
          id="manage-instruments-2"
          md-label="New Policy"
          style="padding: 0"
        >
          <md-tabs
            :md-active-tab="tabSelect.y"
            md-elevation="1"
            class="md-primary"
          >
            <!--Level 3-->
            <md-tab id="manage-new-0" md-label="Level 3" style="padding: 0">
              <br />
              <CriteriaForm
                v-bind:instrumentID="42"
                selectedTab="manage-new-0"
              />
            </md-tab>

            <!--Level 4-->
            <md-tab id="manage-new-1" md-label="Level 4" style="padding: 0">
              <br />
              <CriteriaForm
                v-bind:instrumentID="47"
                selectedTab="manage-new-1"
              />
            </md-tab>
          </md-tabs>
        </md-tab>
      </md-tabs>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import moment from "moment";
import CriteriaForm from "../MSI/Manage Criteria Form";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByProgram = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.intended_program).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "ManageInstrumentProgram",
  data() {
    return {
      sortBy: "id",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "intended_program", label: "Intended Program", sortable: true },
        {
          key: "type_of_instrument",
          label: "Type of Instrument",
          sortable: true
        },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "240px" } }
      ],
      sortBy_psv: "area_number",
      sortDesc_psv: false,
      fields_psv: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Area", sortable: true },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      programList: [{}],
      psvList: [{}],
      search: null,
      create: null,
      createMSIProgram: false,
      editMSI: false,
      cloneMSI: false,
      deletePrompt: false,
      intended_program: null,
      type_of_instrument: "OBE Instrument",
      instruments: {},
      snackbarText: ""
    };
  },
  components: {
    CriteriaForm: CriteriaForm
  },
  computed: {
    ...mapState({
      campus: "campus",
      role: "role",
      tabSelect: "tabSelect"
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
    submit(create) {
      if (create === 0) {
        this.newMSI();
      } else {
        this.clone();
      }
    },
    newMSI() {
      let intended_program = this.intended_program;
      let type_of_instrument = this.type_of_instrument;
      this.$isLoading(true);
      this.$store
        .dispatch("createInstrument", { intended_program, type_of_instrument })
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("showProgramInstrument").then(result => {
              this.programList = result.data;
              this.totalRows = this.programList.length;
            });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.createMSIProgram = false;
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
    update() {
      let id = this.instruments.id;
      let intended_program = this.intended_program;
      let type_of_instrument = this.type_of_instrument;
      this.$isLoading(true);
      this.$store
        .dispatch("editInstrument", {
          id,
          intended_program,
          type_of_instrument
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("showProgramInstrument").then(result => {
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
    msiTemplate() {
      this.instruments = this.programList.find(data => data.id === 6);
    },
    clone() {
      let id = this.instruments.id;
      let intended_program = this.intended_program;
      let type_of_instrument = this.type_of_instrument;
      this.$isLoading(true);
      this.$store
        .dispatch("cloneInstrument", {
          id,
          intended_program,
          type_of_instrument
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("showProgramInstrument").then(result => {
              this.programList = result.data;
              this.totalRows = this.programList.length;
            });
            this.createMSIProgram = false;
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
    select(item) {
      let x = "manage-instruments-1";
      this.$store.commit("saveTabSelect", { x });
      this.$store.commit("saveProgram", item);
      this.$router.push("/ManageInstrument");
    },
    selectPSV(item) {
      let x = "manage-instruments-0";
      this.$store.commit("saveTabSelect", { x });
      this.$store.commit("saveInstrument", item);
      this.$store
        .dispatch("showParameter", item.id)
        .then(result => {
          this.$store.commit("saveParameter", result.data[0]);
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
      this.$router.push("/ShowStatementPSV");
    },
    remove() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteInstrument", this.instruments.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.programList.findIndex(
              data => data.id === this.instruments.id
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
    checkRole(role) {
      if (
        (role === 1 ||
          role === 2 ||
          role === 3 ||
          role === 4 ||
          role === 5 ||
          role === 6 ||
          role === 11) &&
        this.offices?.length
      )
        return !!this.offices.find(item => item.role_id === role);
      else if (
        (role === 7 || role === 8 || role === 9 || role === 10) &&
        this.role?.length
      )
        return !!this.role.find(item => item.role_id === role);
    },
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showProgramInstrument")
        .then(result => {
          this.programList = searchByProgram(result.data, this.search);
          this.totalRows = this.programList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500)
  },
  async created() {
    if (
      this.tabSelect.x !== "manage-instruments-0" &&
      this.tabSelect.x !== "manage-instruments-1" &&
      this.tabSelect.x !== "manage-instruments-2"
    ) {
      let x = "manage-instruments-0";
      this.$store.commit("saveTabSelect", { x });
    }
    this.$isLoading(true);
    await this.$store
      .dispatch("showProgramInstrument")
      .then(result => {
        this.programList = result.data;
        this.totalRows = this.programList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showInstrument", 48)
      .then(result => {
        this.psvList = result.data.instrument;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
