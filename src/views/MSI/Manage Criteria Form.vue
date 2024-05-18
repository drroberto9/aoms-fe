<template>
  <div>
    <!-- Add Tags -->
    <b-modal id="app" v-model="addTags" size="lg" hide-footer>
      <template #modal-header>
        <h5>Add Tags</h5>
      </template>
      <form @submit.prevent="addTag()">
        <b-form-group
          id="addTags-group-1"
          label="Designation:"
          label-for="addTags-1"
        >
          <b-form-select
            id="addTags-1"
            v-model="tag"
            :options="filterAreaTags()"
            required
          />
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="addTags = false"
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

    <!-- Delete Tag -->
    <b-modal id="app" v-model="deleteTagPrompt">
      <template #modal-header>
        <h5>Remove Tag</h5>
      </template>
      Are you sure you want to remove this tag?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteTagPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeTag();
              deleteTagPrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <div class="md-layout" style="margin-bottom: 15px">
      <div class="md-layout-item">
        <h4>
          {{
            checkRole(9) || checkRole(10) ? "AACCUP" : campus.institution_name
          }}
        </h4>
        <h5>Criteria Form</h5>
      </div>
    </div>

    <b-table
      :items="msiList"
      :fields="checkFields()"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="md-elevation-2"
      outlined
      sort-icon-left
      style="margin-bottom: 0"
      responsive="sm"
    >
      <template #cell(tags)="row">
        <div class="md-layout">
          <div class="md-layout-item">
            <b-form-tags
              style="border: none"
              size="sm"
              add-on-change
              no-outer-focus
            >
              <template>
                <div>
                  <span v-for="(tag, index) in row.item.tags" :key="index">
                    <b-form-tag
                      @remove="
                        tagSelect = tag;
                        deleteTagPrompt = true;
                      "
                      variant="primary"
                      >{{ tag.tag }}</b-form-tag
                    >
                  </span>
                </div>
              </template>
            </b-form-tags>
          </div>
          <div
            class="md-layout-item"
            style="max-width: max-content; margin-right: 5px;"
          >
            <md-button
              v-b-tooltip.hover
              title="Add Designated Area"
              class="md-icon-button md-dense md-primary"
              @click="
                msiSelect = row.item;
                tags = [null];
                addTags = true;
              "
              ><md-icon>add_circle</md-icon></md-button
            >
          </div>
        </div>
      </template>

      <template #cell(updated_at)="row">
        {{ formatDate(row.value) }}
      </template>

      <template #cell(undergraduate)="row">
        <b-form-checkbox
          v-model="row.value"
          value="Mandatory"
          unchecked-value="Optional"
          @change="setAreaMandatory(row.item, row.value, 0)"
        >
          {{ row.value }}
        </b-form-checkbox>
      </template>

      <template #cell(graduate)="row">
        <b-form-checkbox
          v-model="row.value"
          value="Mandatory"
          unchecked-value="Optional"
          @change="setAreaMandatory(row.item, row.value, 1)"
        >
          {{ row.value }}
        </b-form-checkbox>
      </template>

      <template #cell(actions)="row">
        <md-button
          v-b-tooltip.hover
          title="Select"
          class="md-icon-button md-dense md-primary"
          @click="select(row.item)"
          ><md-icon>forward</md-icon></md-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "ManageInstrument",
  props: {
    instrumentID: Number,
    selectedTab: String
  },
  data() {
    return {
      sortBy: "area_number",
      sortDesc: false,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Area", sortable: true },
        { key: "tags", label: "Assigned Area", sortable: true },
        {
          key: "updated_at",
          label: "Last Update",
          sortable: true,
          thStyle: { width: "300px" }
        },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      fields_aacup: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Area", sortable: true },
        {
          key: "undergraduate",
          label: "Undergraduate",
          sortable: true,
          thStyle: { width: "160px" }
        },
        {
          key: "graduate",
          label: "Graduate",
          sortable: true,
          thStyle: { width: "160px" }
        },
        {
          key: "updated_at",
          label: "Last Update",
          sortable: true,
          thStyle: { width: "300px" }
        },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      msiList: [{}],
      msiSelect: null,
      tag: null,
      tagSelect: null,
      addTags: false,
      deleteTagPrompt: false,
      snackbarText: ""
    };
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
    addTag() {
      let id = this.msiSelect.id;
      let tag = this.tag;
      this.$isLoading(true);
      this.$store
        .dispatch("addInstrumentTag", { id, tag })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCriteriaInstrument", this.instrumentID)
              .then(result => {
                this.msiList = result.data;
              });
            this.addTags = false;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.createTemplate = false;
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
    removeTag() {
      this.$isLoading(true);
      this.$store
        .dispatch("removeInstrumentTag", this.tagSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCriteriaInstrument", this.instrumentID)
              .then(result => {
                this.msiList = result.data;
              });
            this.deleteTagPrompt = false;
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
    setAreaMandatory(area, status, level) {
      this.$isLoading(true);
      let id = area.id;
      let graduate = area.graduate;
      let undergraduate = area.undergraduate;
      if (level === 1) {
        graduate = status;
      } else {
        undergraduate = status;
      }
      this.$store
        .dispatch("setAreaMandatory", { id, graduate, undergraduate })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCriteriaInstrument", this.instrumentID)
              .then(result => {
                this.msiList = result.data;
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
    checkFields() {
      if (this.checkRole(9) || this.checkRole(10)) return this.fields_aacup;
      else return this.fields;
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
    filterAreaTags() {
      let selection = [
        "AREA I: VISION, MISSION, GOALS AND OBJECTIVES",
        "AREA II: FACULTY",
        "AREA III: CURRICULUM AND INSTRUCTION",
        "AREA IV: SUPPORT TO STUDENTS",
        "AREA V: RESEARCH",
        "AREA VI: EXTENSION AND COMMUNITY INVOLVEMENT",
        "AREA VII: LIBRARY",
        "AREA VIII: PHYSICAL PLANT AND FACILITIES",
        "AREA IX: LABORATORIES",
        "AREA X: ADMINISTRATION"
      ];

      if (this.msiSelect) {
        for (let x = 0; x < this.msiSelect.tags.length; x++) {
          selection = selection.filter(
            data => this.msiSelect.tags[x].tag !== data
          );
        }
      }
      return selection;
    },
    formatDate(item) {
      return moment(item).format("llll");
    },
    select(item) {
      if (item != null) {
        let x = "manage-instruments-2";
        let y = this.selectedTab;
        this.$store.commit("saveTabSelect", { x, y });
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
        this.$router.push("/ShowStatementForms");
      }
    },
    back() {
      this.$router.push("/ManageInstrumentProgram");
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showCriteriaInstrument", this.instrumentID)
      .then(result => {
        this.msiList = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
