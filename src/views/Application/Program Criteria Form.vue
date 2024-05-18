<template>
  <div>
    <!--Summary of Ratings-->
    <b-modal id="app" v-model="SAR" size="xl" hide-footer>
      <template #modal-header>
        <h5>Summary of Ratings</h5>
      </template>

      <h6 v-if="require_ratings.accreditation_status">
        {{ require_ratings.accreditation_status }}
      </h6>
      <span>
        Area mean should be >= {{ roundNum(require_ratings.area_mean) }}, while
        grand mean should be >= {{ roundNum(require_ratings.grand_mean) }}.
      </span>

      <br />
      <br />

      <div>
        <b-table
          :items="area_mean"
          :fields="fields_report"
          :sort-by.sync="sortBy_report"
          :sort-desc.sync="sortDesc"
          class="md-elevation-2"
          bordered
          sort-icon-left
          style="margin-bottom: 10px"
          responsive="sm"
        >
          <template #cell(area_mean)="row">
            <div v-if="checkAreaMean(row.value)">{{ roundNum(row.value) }}</div>
            <div v-else style="color: red">{{ roundNum(row.value) }}</div>
          </template>
          <template #cell(weighted_mean)="row">
            {{ roundNum(row.value) }}
          </template>
        </b-table>

        <div class="md-layout">
          <div class="md-layout-item"></div>
          <div
            class="md-layout-item"
            style="max-width: fit-content; margin-right: 21px; font-weight: bold"
          >
            Grand Mean:
          </div>
          <div class="md-layout-item" style="max-width: 138px">
            {{
              area_mean.length
                ? roundNum(result[0].total_area_mean / area_mean.length)
                : "NaN"
            }}
          </div>
        </div>

        <div class="md-layout">
          <div class="md-layout-item"></div>
          <div
            class="md-layout-item"
            style="max-width: fit-content; margin-right: 21px; font-weight: bold"
          >
            Descriptive Rating:
          </div>
          <div class="md-layout-item" style="max-width: 138px">
            {{
              area_mean.length
                ? getDescription(result[0].total_area_mean / area_mean.length)
                : "NaN"
            }}
          </div>
        </div>
      </div>

      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="SAR = false"
            >Close</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Assign Self Survey Accreditor-->
    <b-modal id="app" v-model="assignAccreditor" size="lg" hide-footer>
      <template #modal-header>
        <h5>Assign Self Survey Accreditor</h5>
      </template>
      <form @submit.prevent="assignTask">
        <b-form-group
          id="assignAccreditor-group-1"
          label="Self Survey Accreditor:"
          label-for="assignAccreditor-1"
        >
          <multiselect
            v-model="userSelect"
            :options="filterTaskForce(userList, setUsers(instrumentSelect.id))"
            :custom-label="userNameAndStatus"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select id="assignAccreditor-1" v-model="userSelect" required>-->
          <!--            <option-->
          <!--              v-for="(item, index) in filterTaskForce(-->
          <!--                userList,-->
          <!--                setUsers(instrumentSelect.id)-->
          <!--              )"-->
          <!--              :key="index"-->
          <!--              :value="item"-->
          <!--            >-->
          <!--              {{ concatName(item) }}-->
          <!--              {{-->
          <!--                item.accreditor_status === "Registered"-->
          <!--                  ? "( AACCUP " + item.accreditor_status + ")"-->
          <!--                  : ""-->
          <!--              }}-->
          <!--            </option>-->
          <!--          </b-form-select>-->
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="assignAccreditor = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Add</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Assign Form-->
    <b-modal id="app" v-model="assignInstruments" size="lg" hide-footer>
      <template #modal-header>
        <h5>Assign Optional Area</h5>
      </template>
      <form v-if="checkMSIList()" @submit.prevent="attachInstrument()">
        <b-form-group
          id="assignInstruments-group-1"
          label="Areas:"
          label-for="assignInstruments-1"
        >
          <multiselect
            v-model="instrumentSelected"
            :options="checkMSIList()"
            :custom-label="instrumentName"
            :placeholder="null"
            required
          ></multiselect>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="assignInstruments = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Add</md-button
            >
          </div>
        </md-card-actions>
      </form>

      <div v-else>
        <br />
        <h4 class="text-center">No Optional Area</h4>
        <br />

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="assignInstruments = false"
              >Close</md-button
            >
          </div>
        </md-card-actions>
      </div>
    </b-modal>

    <!--Delete Instrument-->
    <b-modal id="app" v-model="removeInstrumentPrompt">
      <template #modal-header>
        <h5>Delete Optional Area</h5>
      </template>
      Are you sure you want to remove this area?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="removeInstrumentPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeInstrument();
              removeInstrumentPrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Delete User-->
    <b-modal id="app" v-model="deleteUserPrompt">
      <template #modal-header>
        <h5>Remove User</h5>
      </template>
      Are you sure you want to remove this user?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteUserPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeUser();
              deleteUserPrompt = false;
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
          <h4>{{ program.program_name }}</h4>
          <h5>{{ campus.campus_name }}</h5>
        </div>
        <div class="md-layout-item" style="min-width: max-content">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                style="width: 180px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  setResult();
                  SAR = true;
                "
                >Self Survey Results</md-button
              >
            </div>
          </div>
          <div
            v-if="application.status === 'under preparation'"
            class="md-layout"
            style="margin-top: 10px"
          >
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: max-content; margin-right: 5px"
            >
              <b>Lock Self Survey</b>
            </div>
            <div
              class="md-layout-item"
              style="max-width: max-content"
              v-b-tooltip.hover.bottom
              title="Remove SUC Accreditor Access"
            >
              <b-form-checkbox
                v-model="self_survey_status"
                switch
                @change="lockSelfSurvey()"
              />
            </div>
          </div>
        </div>
      </div>

      <h5>Program Files:</h5>
      <b-table
        :items="programFiles"
        :fields="fields_files"
        :sort-by.sync="sortBy_files"
        :sort-desc.sync="sortDesc"
        class="md-elevation-2"
        outlined
        small
        sort-icon-left
        responsive="sm"
      >
        <template #cell(file_title)="row">
          <b-link @click="downloadReport(row.item)">{{
            row.item.file_title
          }}</b-link>
        </template>

        <template #cell(type)="row">
          {{ getArea(row.item) }}
        </template>
      </b-table>

      <div class="md-layout">
        <div class="md-layout-item">
          <h5 style="margin-top: 15px">
            Add Area Form and Self Survey Accreditor:
          </h5>
        </div>
        <div
          v-if="application.status === 'under preparation'"
          class="md-layout-item"
          style="max-width: max-content"
        >
          <md-button
            style="width: 180px; margin: 0;"
            class="md-primary md-raised"
            @click="
              instrumentSelected = null;
              assignInstruments = true;
            "
            >Assign Optional Area</md-button
          >
        </div>
      </div>
      <!--      <b-form-input-->
      <!--        style="margin-bottom: 15px"-->
      <!--        class="md-elevation-2"-->
      <!--        v-model="intended_program"-->
      <!--        disabled-->
      <!--      />-->

      <!--      <h5>Assign Self Survey Accreditor:</h5>-->
      <b-table
        :items="areaList"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        class="md-elevation-2"
        outlined
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(user)="row">
          <div class="md-layout">
            <div class="md-layout-item">
              <b-form-tags style="border: none" add-on-change no-outer-focus>
                <template>
                  <div>
                    <span
                      v-for="(item, index) in setUsers(row.item.id)"
                      :key="index"
                    >
                      <b-form-tag
                        @remove="
                          user_id = item.id;
                          deleteUserPrompt = true;
                        "
                        variant="primary"
                        >{{ concatName(item) }}</b-form-tag
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
                  setUserList();
                  instrumentSelect = row.item;
                  userSelect = null;
                  assignAccreditor = true;
                "
                ><md-icon>add_circle</md-icon></md-button
              >
            </div>
          </div>

          <!-- <div class="md-layout" v-if="!userEdit[row.index].status">
            <div class="md-layout-item">
              <span
                v-for="(item, index) in setUsers(row.item.id)"
                :key="index"
              >
                {{ concatName(item) }}
                <a v-if="setUsers(row.item.id)[index + 1]">,</a>
              </span>
            </div>
            <div
              v-if="application.status === 'under preparation'"
              class="md-layout-item"
              style="max-width: max-content; margin-right: 5px;"
            >
              <md-button
                v-b-tooltip.hover
                title="Edit"
                class="md-icon-button md-dense md-primary"
                @click="userEdit[row.index].status = true"
                ><md-icon>edit</md-icon></md-button
              >
            </div>
          </div>
          <div class="md-layout" v-if="userEdit[row.index].status">
            <div class="md-layout-item">
              <span
                v-for="(item, index) in setUsers(row.item.id)"
                :key="index"
              >
                {{ concatName(item) }}
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  @click="
                    user_id = item.id;
                    deleteUserPrompt = true;
                  "
                  ><md-icon>close</md-icon></md-button
                >
                <a v-if="setUsers(row.item.id)[index + 1]">,</a>
              </span>
            </div>
            <div
              class="md-layout-item"
              style="max-width: max-content; margin-right: 5px;"
            >
              <md-button
                v-b-tooltip.hover
                title="Assign Self Survey Accreditor"
                class="md-icon-button md-dense md-primary"
                @click="
                  setUserList();
                  instrumentSelect = row.item;
                  userSelect = null;
                  assignAccreditor = true;
                "
                ><md-icon>add_circle</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Close Edit"
                class="md-icon-button md-dense md-accent"
                @click="userEdit[row.index].status = false"
                ><md-icon>edit</md-icon></md-button
              >
            </div>
          </div> -->
        </template>

        <template #cell(report_templates)="row">
          {{ row.item.report_templates.length }}
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Delete"
            v-if="
              application.status === 'under preparation' &&
                row.item.type === 'Optional'
            "
            class="md-icon-button md-dense md-accent"
            @click="
              instrumentSelect = row.item;
              removeInstrumentPrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
          >
        </template>
      </b-table>

      <div class="md-layout" style="margin-top: 15px">
        <div class="md-layout-item">
          <h5 style="margin-top: 15px">Assign Lead Self Survey Accreditor:</h5>
        </div>
        <div
          v-if="application.status === 'under preparation'"
          class="md-layout-item"
          style="max-width: max-content"
        >
          <b-dropdown text="Assign Lead Accreditor" variant="primary" dropleft>
            <div v-for="(item, index) in filterUsers()" :key="index">
              <b-dropdown-item
                @click="updateInternalRole(item, filterUsers())"
                >{{ concatName(item) }}</b-dropdown-item
              >
            </div>
          </b-dropdown>
        </div>
      </div>
      <b-form-input
        style="margin-bottom: 15px"
        class="md-elevation-2"
        v-model="headAccreditor"
        disabled
      />
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchProgramName = (items, term) => {
  if (term !== "") {
    return items.filter(item =>
      toLower(item.intended_program).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "ProgramInstrument",
  data() {
    return {
      sortBy: "id",
      sortDesc: false,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Criteria", sortable: true },
        { key: "user", label: "Self Survey Accreditor", sortable: true },
        { key: "type", label: "Status", sortable: true },
        { key: "report_templates", label: "No. of Templates" },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      sortBy_files: "type",
      fields_files: [
        { key: "id", label: "ID", sortable: true },
        { key: "file_title", label: "Document", sortable: true },
        { key: "type", label: "Type", sortable: true }
      ],
      sortBy_report: "area_number",
      fields_report: [
        { key: "area", label: "Area Name" },
        { key: "area_mean", label: "Area Mean", thStyle: { width: "150px" } }
      ],
      msiList: [],
      areaList: [],
      programList: [],
      programFiles: [],
      instrumentSelect: {},
      instrumentSelected: {},
      areaSelect: {},
      userList: [],
      roles: [],
      users: [],
      userSelect: null,
      MSISearch: "",
      user_id: null,
      instrument_id: null,
      area_mean: [],
      result: [
        {
          total_weight: null,
          total_area_mean: null,
          total_weighted_mean: null,
          grand_mean: null
        }
      ],
      intended_program: null,
      require_ratings: {
        area_mean: null,
        grand_mean: null
      },
      self_survey_status: false,
      SAR: false,
      createProgram: false,
      assignInstruments: false,
      removeInstrumentPrompt: false,
      assignAccreditor: false,
      deleteUserPrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus",
      application: "application",
      program: "program"
    }),
    headAccreditor: {
      get: function() {
        if (this.users?.length) {
          let head = this.users.find(
            item => item.role === "internal accreditor - leader"
          );
          if (head) return this.concatName(head);
          else return "No Accreditor Head";
        } else return "No Accreditor Head";
      }
    }
    // self_survey_status: {
    //   get: function() {
    //     if (this.program.self_survey_status === 0) return false;
    //     else return true;
    //   },
    //   set: function() {
    //     if (this.program.self_survey_status === 0) return false;
    //     else return true;
    //   }
    // }
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
    filterUsers() {
      let filtered = [];
      if (this.users?.length) {
        filtered.push(this.users[0]);
        for (let x = 1; x < this.users.length; x++) {
          if (!filtered.find(item => item.user_id === this.users[x].user_id))
            filtered.push(this.users[x]);
        }
        return filtered;
      }
    },
    assignTask() {
      this.$isLoading(true);
      let instrument_id = this.instrumentSelect.id;
      let program_id = this.program.id;
      let user_id = this.userSelect.user_id;
      let role = "internal accreditor";
      this.$store
        .dispatch("assignTask", { instrument_id, program_id, user_id, role })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showInstrumentProgram", this.program.program_id)
              .then(result => {
                this.users = result.data.users.filter(item =>
                  item.role.includes("internal accreditor")
                );
              });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.assignAccreditor = false;
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
    updateInternalRole(select, userList) {
      this.$isLoading(true);
      let program_id = this.program.id;
      let users = [];
      if (userList?.length) {
        for (let x = 0; x < userList.length; x++) {
          let user_id = userList[x].user_id;
          let role = "internal accreditor";
          users.push({ user_id, role });
        }
      }
      let index = users.findIndex(data => data.user_id === select.user_id);
      users[index].role = "internal accreditor - leader";
      this.$store
        .dispatch("updateInternalRole", {
          program_id,
          users
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showInstrumentProgram", this.program.program_id)
              .then(result => {
                this.users = result.data.users.filter(item =>
                  item.role.includes("internal accreditor")
                );
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
    attachInstrument() {
      this.$isLoading(true);
      let instrument_id = this.instrumentSelected.id;
      let program_id = this.program.program_id;
      this.$store
        .dispatch("addInstrumentForm", { program_id, instrument_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showInstrumentProgram", this.program.program_id)
              .then(result => {
                this.intended_program = result.data.intended_program;
                this.areaList = result.data.instruments;
                this.users = result.data.users.filter(item =>
                  item.role.includes("internal accreditor")
                );
              });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.assignInstruments = false;
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
    removeInstrument() {
      this.$isLoading(true);
      let instrument_id = this.instrumentSelect.id;
      let program_id = this.program.program_id;
      this.$store
        .dispatch("removeInstrument", { program_id, instrument_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showInstrumentProgram", this.program.program_id)
              .then(result => {
                this.intended_program = result.data.intended_program;
                this.areaList = result.data.instruments;
                this.users = result.data.users.filter(item =>
                  item.role.includes("internal accreditor")
                );
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
    downloadReport(item) {
      this.$isLoading(true);
      this.$store
        .dispatch("viewProgramFile", item.id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = window.URL.createObjectURL(new Blob([result.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", item.file_title);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    removeUser() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteAssignedUser", this.user_id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showInstrumentProgram", this.program.program_id)
              .then(result => {
                this.users = result.data.users.filter(item =>
                  item.role.includes("internal accreditor")
                );
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
    lockSelfSurvey() {
      this.$isLoading(true);
      let program_id = this.program.id;
      let status = this.self_survey_status;
      this.$store
        .dispatch("lockSelfSurvey", { program_id, status })
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

    downloadTemplate(template) {
      this.$isLoading(true);
      this.$store
        .dispatch("downloadTemplate", template.id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = window.URL.createObjectURL(new Blob([result.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", template.template_name + ".docx");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    setUsers(id) {
      if (id) {
        let filtered;
        filtered = this.users.filter(item => item.transaction_id === id);
        if (filtered?.length) return filtered;
      }
    },
    checkMSIList() {
      let selection = this.msiList;
      if (this.areaList?.length) {
        for (let y = 0; y < this.areaList.length; y++) {
          selection = selection.filter(
            data => this.areaList[y].area_name !== data.area_name
          );
        }
      }
      if (selection?.length) return selection;
      else return null;
    },
    setUserList() {
      this.$isLoading(true);
      this.$store
        .dispatch("showLocalAccreditor", this.campus.suc_id)
        .then(result => {
          this.userList = result.data.users;
          this.roles = result.data.roles;
          this.$isLoading(false);
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    setResult() {
      this.$isLoading(true);
      let program_id = this.program.id;
      let role = 0;
      this.$store
        .dispatch("showProgramSAR", { program_id, role })
        .then(result => {
          this.area_mean = result.data.areas;
          this.result = result.data.result;
          this.require_ratings = result.data.require_ratings;
          this.$isLoading(false);
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    checkAreaMean(mean) {
      if (mean && this.require_ratings) {
        return mean >= this.require_ratings.area_mean;
      }
    },
    checkGrandMean(mean) {
      if (mean && this.require_ratings) {
        return mean >= this.require_ratings.grand_mean;
      }
    },
    roundNum(num) {
      if (num !== null) return (Math.round(num * 100) / 100).toFixed(2);
    },
    filterTaskForce(selection, setRoles) {
      if (setRoles?.length) {
        for (let y = 0; y < setRoles.length; y++) {
          selection = selection.filter(
            data => setRoles[y].user_id !== data.user_id
          );
        }
      }
      return selection;
    },
    getDescription(rating) {
      if (rating) {
        if (rating < 1.5) return "Poor";
        else if (rating >= 1.5 && rating < 2.5) return "Fair";
        else if (rating >= 2.5 && rating < 3.5) return "Satisfactory";
        else if (rating >= 3.5 && rating < 4.5) return "Very Satisfactory";
        else if (rating >= 4.5 && rating < 5) return "Excellent";
        else return null;
      }
    },
    getArea(item) {
      if (item.area) {
        return item.type.concat(" - ", item.area);
      } else return item.type;
    },
    back() {
      this.$router.push("/ProgramSelect");
    },
    concatName(item) {
      if (item) {
        if (item.first_name && item.last_name)
          return item.first_name.concat(" ", item.last_name);
        else if (item.last_name) return item.last_name;
        else if (item.first_name) return item.first_name;
      }
    },
    userNameAndStatus(item) {
      return `${this.concatName(item)} ${
        item.accreditor_status === "Registered"
          ? "( AACCUP " + item.accreditor_status + ")"
          : ""
      }`;
    },
    instrumentName({ area_name }) {
      return `${area_name}`;
    },
    searchMSI: _.debounce(function() {
      this.$store
        .dispatch("showProgramInstrument")
        .then(result => {
          this.msiList = searchProgramName(result.data, this.MSISearch);
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500)
  },
  async created() {
    this.$isLoading(true);
    if (this.program.self_survey_status === 1) this.self_survey_status = true;
    else this.self_survey_status = false;

    await this.$store
      .dispatch("showInstrumentProgram", this.program.program_id)
      .then(result => {
        this.intended_program = result.data.intended_program;
        this.areaList = result.data.instruments;
        this.users = result.data.users.filter(item =>
          item.role.includes("internal accreditor")
        );
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showFileQA", this.program.id)
      .then(result => {
        this.programFiles = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showOptionArea", this.program.id)
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

<style lang="scss" scoped>
input:disabled {
  background: white !important;
}
</style>
