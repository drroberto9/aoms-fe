<template>
  <div>
    <!--New Preparation-->
    <b-modal id="app" v-model="newPreparation" size="xl" hide-footer>
      <template #modal-header>
        <h5>Plan Accreditation</h5>
      </template>
      <form @submit.prevent="createApplication">
        <b-form-group
          id="newPreparation-group-1"
          label-cols="4"
          label-cols-lg="2"
          label="Application Title:"
          label-for="newPreparation-1"
        >
          <b-form-input
            id="newPreparation-1"
            v-model="title"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <md-button
          style="width: 200px; margin: 10px 0 10px;"
          class="md-primary md-raised"
          @click="
            setPrograms(newPrograms);
            newPreparation = false;
            programSelect = true;
          "
          >Select Programs</md-button
        >

        <b-table
          :items="newPrograms"
          :fields="fields_programSelect"
          :sort-by.sync="sortBy_programs"
          :sort-desc.sync="sortDesc_programs"
          class="md-elevation-2"
          sort-icon-left
          style="margin-bottom: 0"
          responsive="sm"
        >
          <template #cell(program_name)="row">
            <span v-if="row.item.program_name">
              {{ row.item.program_name }}
            </span>
          </template>

          <template #cell(level)="row">
            <!-- <span v-if="row.item.program_name">
              {{ row.item.level }}
            </span> -->
            <multiselect
              v-if="row.item.program_name"
              v-model="row.item.level"
              :options="levelList"
              :placeholder="null"
              size="sm"
              required
            ></multiselect>
          </template>

          <template #cell(preferred_start_date)="row">
            <b-form-datepicker
              size="sm"
              v-model="row.item.preferred_start_date"
              :min="new Date()"
              required
            />
          </template>

          <template #cell(preferred_end_date)="row">
            <b-form-datepicker
              size="sm"
              v-model="row.item.preferred_end_date"
              :min="row.item.preferred_start_date"
              required
            />
          </template>

          <template #cell(actions)="row">
            <md-button
              v-b-tooltip.hover
              title="Remove Program"
              class="md-icon-button md-dense md-accent"
              style="outline: 0"
              @click="newPrograms.splice(row.index, 1)"
              ><md-icon>delete</md-icon></md-button
            >
          </template>
        </b-table>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="newPreparation = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Save</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Select Program-->
    <b-modal id="app" v-model="programSelect" size="xl" hide-footer>
      <template #modal-header>
        <h5>Add Program</h5>

        <b-form-input
          placeholder="Search program"
          v-model="programSearch"
          @input="searchProgram(newPrograms)"
          type="text"
          style="max-width: 300px"
        ></b-form-input>
      </template>

      <b-table
        :items="programList"
        :fields="fields_programs"
        :current-page="currentPage_programs"
        :per-page="perPage_programs"
        :sort-by.sync="sortBy_programs"
        :sort-desc.sync="sortDesc_programs"
        class="md-elevation-2"
        outlined
        small
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(duration_of_validity)="row">
          {{ formatDate(row.value) }}
        </template>

        <template #cell(actions)="row">
          <md-button
            class="md-raised md-dense md-primary"
            style="outline: 0"
            @click="selectProgram(row.item)"
            >Select</md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage_programs"
        :total-rows="totalRows_programs"
        :per-page="perPage_programs"
        align="fill"
        size="sm"
        class="my-auto md-elevation-2"
      ></b-pagination>

      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="
            programSelect = false;
            newPreparation = true;
          "
          >Close</md-button
        >
      </md-card-actions>
    </b-modal>

    <!--Edit Application-->
    <b-modal id="app" v-model="changeTitle" size="lg" hide-footer>
      <template #modal-header>
        <h5>Change Application Title</h5>
      </template>
      <form @submit.prevent="editApplication()">
        <b-form-group
          id="changeTitle-group-1"
          label-cols="4"
          label-cols-lg="2"
          label="Application Title:"
          label-for="changeTitle-1"
        >
          <b-form-input
            id="changeTitle-1"
            v-model="newTitle"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="changeTitle = false"
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

    <!--Delete Application-->
    <b-modal id="app" v-model="deleteApplicationPrompt">
      <template #modal-header>
        <h5>Delete User</h5>
      </template>
      Are you sure you want to remove this application?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteApplicationPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeApplication();
              deleteApplicationPrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Existing Application-->
    <b-modal id="app" v-model="newApplicationPrompt">
      <template #modal-header>
        <h5>Restore Session</h5>
      </template>
      A previous application exists, do you want to continue?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="
              title = null;
              newPrograms = [];
              newApplicationPrompt = false;
              newPreparation = true;
            "
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              newApplicationPrompt = false;
              newPreparation = true;
            "
            >Yes</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--New Application-->
    <b-modal id="app" v-model="newApplication" size="xl" hide-footer>
      <template #modal-header>
        <h5>Select Prepared Application</h5>

        <b-form-input
          placeholder="Search by title"
          v-model="applicationSearch"
          @input="searchPreparedApplication"
          type="text"
          style="max-width: 300px"
        ></b-form-input>
      </template>

      <b-table
        :items="filterApplications(0)"
        :fields="fields_notSubmitted"
        :current-page="currentPage_notSubmitted"
        :per-page="perPage_notSubmitted"
        :sort-by.sync="sortBy_notSubmitted"
        :sort-desc.sync="sortDesc_notSubmitted"
        class="md-elevation-2"
        outlined
        small
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(sender)="row">
          {{ concatName(row.item) }}
        </template>

        <template #cell(updated_at)="row">
          {{ formatDateTime(row.value) }}
        </template>

        <template #cell(actions)="row">
          <md-button
            class="md-raised md-dense md-primary"
            style="outline: 0"
            @click="
              newApplication = false;
              application = row.item;
              applyApplication = true;
            "
            >Select</md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage_notSubmitted"
        :total-rows="filterApplications(0) ? filterApplications(0).length : 0"
        :per-page="perPage_notSubmitted"
        align="fill"
        size="sm"
        class="my-auto md-elevation-2"
      ></b-pagination>

      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="newApplication = false"
          >Close</md-button
        >
      </md-card-actions>
    </b-modal>

    <!--Apply Accreditation-->
    <b-modal id="app" v-model="applyApplication" hide-footer>
      <template #modal-header>
        <h5>Prepare for Accreditation</h5>
      </template>
      You are about to apply for accreditation.
      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="applyApplication = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="submitApplication()"
            >Proceed</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <md-tabs :md-active-tab="tabSelect" md-elevation="1" class="md-primary">
        <md-tab
          id="manage-application-0"
          md-label="Plan Accreditation"
          style="padding: 0"
        >
          <br />
          <div class="md-layout" style="margin-bottom: 15px">
            <div class="md-layout-item">
              <h4>{{ campus.institution_name }}</h4>
              <h5>{{ campus.campus_name }}</h5>
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
                <div class="md-layout-item" style="min-width: 250px">
                  <b-form-input
                    placeholder="Search by title"
                    v-model="search"
                    @input="searchApplication"
                    type="text"
                  ></b-form-input>
                </div>
              </div>
              <div class="md-layout">
                <div class="md-layout-item"></div>
                <div class="md-layout-item" style="max-width: max-content">
                  <md-button
                    style="width: 230px; margin: 0;"
                    class="md-primary md-raised"
                    @click="planAccreditation()"
                    >Prepare for Accreditation</md-button
                  >
                </div>
              </div>
            </div>
          </div>

          <b-table
            :items="filterApplications(0)"
            :fields="fields_prepared"
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
            <template #cell(sender)="row">
              {{ concatName(row.item) }}
            </template>

            <template #cell(updated_at)="row">
              {{ formatDateTime(row.value) }}
            </template>

            <template #cell(actions)="row">
              <md-button
                v-b-tooltip.hover
                title="View Application"
                class="md-icon-button md-dense md-primary"
                @click="select(row.item, 'manage-application-0')"
                style="outline: 0"
                ><md-icon>forward</md-icon></md-button
              >
              <!--              <md-button-->
              <!--                v-b-tooltip.hover-->
              <!--                title="Apply Accreditation"-->
              <!--                class="md-icon-button md-dense md-primary"-->
              <!--                @click="-->
              <!--                  application = row.item;-->
              <!--                  applyApplication = true;-->
              <!--                "-->
              <!--                style="outline: 0"-->
              <!--                ><md-icon>send</md-icon></md-button-->
              <!--              >-->
              <md-button
                v-b-tooltip.hover
                title="Edit"
                v-if="row.item.status === 'under preparation'"
                class="md-icon-button md-dense md-primary"
                style="outline: 0"
                @click="
                  application = row.item;
                  newTitle = row.item.title;
                  changeTitle = true;
                "
                ><md-icon>edit</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Delete"
                v-if="row.item.status === 'under preparation'"
                class="md-icon-button md-dense md-accent"
                style="outline: 0"
                @click="
                  application = row.item;
                  deleteApplicationPrompt = true;
                "
                ><md-icon>delete</md-icon></md-button
              >
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="
              filterApplications(0) ? filterApplications(0).length : 0
            "
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-auto md-elevation-2"
          ></b-pagination>
        </md-tab>

        <md-tab
          id="manage-application-1"
          md-label="On Going Accreditation"
          style="padding: 0"
        >
          <br />
          <div class="md-layout" style="margin-bottom: 15px">
            <div class="md-layout-item">
              <h4>{{ campus.institution_name }}</h4>
              <h5>{{ campus.campus_name }}</h5>
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
                <div class="md-layout-item" style="min-width: 250px">
                  <b-form-input
                    placeholder="Search by title"
                    v-model="search"
                    @input="searchApplication"
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
                    @click="newApplication = true"
                    >Apply for Accreditation</md-button
                  >
                </div>
              </div>
            </div>
          </div>
          <b-table
            :items="filterApplications(1)"
            :fields="fields_ongoing"
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
            <template #cell(sender)="row">
              {{ concatName(row.item) }}
            </template>

            <template #cell(updated_at)="row">
              {{ formatDateTime(row.value) }}
            </template>

            <template #cell(actions)="row">
              <md-button
                v-b-tooltip.hover
                title="View Application"
                class="md-icon-button md-dense md-primary"
                @click="select(row.item, 'manage-application-1')"
                style="outline: 0"
                ><md-icon>forward</md-icon></md-button
              >
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="
              filterApplications(1) ? filterApplications(1).length : 0
            "
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-auto md-elevation-2"
          ></b-pagination>
        </md-tab>

        <md-tab
          id="manage-application-2"
          md-label="Accreditation History"
          style="padding: 0"
        >
          <br />
          <div class="md-layout" style="margin-bottom: 15px">
            <div class="md-layout-item">
              <h4>{{ campus.institution_name }}</h4>
              <h5>{{ campus.campus_name }}</h5>
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
                <div class="md-layout-item" style="min-width: 250px">
                  <b-form-input
                    placeholder="Search by title"
                    v-model="search"
                    @input="searchApplication"
                    type="text"
                  ></b-form-input>
                </div>
              </div>
            </div>
          </div>

          <b-table
            :items="filterApplications(2)"
            :fields="fields_done"
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
            <template #cell(sender)="row">
              {{ concatName(row.item) }}
            </template>

            <template #cell(updated_at)="row">
              {{ formatDateTime(row.value) }}
            </template>

            <template #cell(actions)="row">
              <md-button
                v-b-tooltip.hover
                title="View Application"
                class="md-icon-button md-dense md-primary"
                @click="select(row.item, 2)"
                style="outline: 0"
                ><md-icon>forward</md-icon></md-button
              >
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="
              filterApplications(2) ? filterApplications(2).length : 0
            "
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-auto md-elevation-2"
          ></b-pagination>
        </md-tab>
      </md-tabs>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import moment from "moment";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.title).includes(toLower(term)));
  }
  return items;
};

const searchProgramName = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.program_name).includes(toLower(term))
    );
  }
  return items;
};

const filterProgram = (array1, array2) => {
  if (array2?.length) {
    for (let x = 0; x < array2.length; x++) {
      array1 = array1.filter(data => data.id !== array2[x].program_id);
    }
  }
  return array1;
};

export default {
  name: "PlanAccreditation",
  data() {
    return {
      sortBy: "id",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields_prepared: [
        { key: "id", label: "ID", sortable: true },
        { key: "title", label: "Title", sortable: true },
        { key: "sender", label: "Prepared By", sortable: true },
        { key: "updated_at", label: "Date Prepared", sortable: true },
        { key: "campus_name", label: "Campus", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "170px" } }
      ],
      fields_ongoing: [
        { key: "id", label: "ID", sortable: true },
        { key: "title", label: "Title", sortable: true },
        { key: "sender", label: "Prepared By", sortable: true },
        { key: "updated_at", label: "Date Updated", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "campus_name", label: "Campus", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      fields_done: [
        { key: "id", label: "ID", sortable: true },
        { key: "title", label: "Title", sortable: true },
        { key: "sender", label: "Prepared By", sortable: true },
        { key: "updated_at", label: "Date Updated", sortable: true },
        { key: "campus_name", label: "Campus", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      sortBy_notSubmitted: "id",
      sortDesc_notSubmitted: false,
      totalRows_notSubmitted: 1,
      currentPage_notSubmitted: 1,
      perPage_notSubmitted: 10,
      fields_notSubmitted: [
        { key: "id", label: "ID", sortable: true },
        { key: "title", label: "Title", sortable: true },
        { key: "sender", label: "Prepared By", sortable: true },
        { key: "updated_at", label: "Date Updated", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      sortBy_programs: "program_name",
      sortDesc_programs: false,
      totalRows_programs: 1,
      currentPage_programs: 1,
      perPage_programs: 10,
      fields_programs: [
        { key: "id", label: "ID", sortable: true },
        {
          key: "program_name",
          label: "Program",
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
          label: "Validity",
          sortable: true
        },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      sortBy_programSelect: "program_name",
      sortDesc_programSelect: false,
      fields_programSelect: [
        {
          key: "program_name",
          label: "Program",
          sortable: true
        },
        {
          key: "level",
          label: "Level Applied For",
          thStyle: { width: "20%" }
        },
        {
          key: "preferred_start_date",
          label: "Preferred Start Date",
          thStyle: { width: "25%" }
        },
        {
          key: "preferred_end_date",
          label: "Preferred End Date",
          thStyle: { width: "25%" }
        },
        { key: "actions", label: "Action", thStyle: { width: "70px" } }
      ],
      sortBy_programSelected: "program_name",
      sortDesc_programSelected: false,
      totalRows_programSelected: 1,
      currentPage_programSelected: 1,
      perPage_programSelected: 10,
      fields_programSelected: [
        { key: "id", label: "ID", sortable: true },
        { key: "program_name", label: "Program", sortable: true },
        { key: "level", label: "Level Applied For", sortable: true },
        {
          key: "schedule",
          label: "Schedule",
          sortable: true
        },
        { key: "task_force_head", label: "Task Force Head" },
        { key: "actions", label: "Actions" }
      ],
      title: null,
      newTitle: null,
      newPrograms: [],
      programs: [],
      programList: [],
      applications: [],
      files: [],
      application: {},
      file: {},
      filename: [],
      programSelectedList: [],
      programSelected: {},
      userList: [],
      userHeadList: [],
      userSelect: [],
      roles: [],
      preferred_level: null,
      preferred_start_date: null,
      preferred_end_date: null,
      search: null,
      applicationSearch: null,
      programSearch: null,
      levelList: [
        "Candidate",
        "Level I",
        "Level II",
        "Level III, Phase 1",
        "Level III, Phase 2",
        "Level IV, Phase 1",
        "Level IV, Phase 2"
      ],
      upload: false,
      newPreparation: false,
      newApplication: false,
      newApplicationPrompt: false,
      applyApplication: false,
      viewApplication: false,
      viewMSI: false,
      changeTitle: false,
      deleteApplicationPrompt: false,
      deleteFilePrompt: false,
      deleteProgramPrompt: false,
      programSelect: false,
      snackbarText: "",
      fileEdit: false,
      levelAndSchedule: false,
      assignTaskForceHead: false,
      deleteUserPrompt: false
    };
  },
  computed: {
    ...mapState({
      user: "user",
      campus: "campus",
      tabSelect: "tabSelect"
    })
  },
  methods: {
    submitApplication() {
      let application_id = this.application.id;
      let suc_id = this.campus.suc_id;
      this.$isLoading(true);
      this.$store
        .dispatch("submitApplication", { application_id, suc_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showApplication", this.campus.suc_id)
              .then(result => {
                this.applications = result.data.applications;
                this.files = result.data.files;
                this.totalRows = this.applications.length;
              });
            this.newApplication = false;
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
    planAccreditation() {
      if (this.title !== null || this.newPrograms?.length) {
        this.newApplicationPrompt = true;
      } else this.newPreparation = true;
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
    setPrograms(selectedPrograms) {
      this.$isLoading(true);
      this.$store
        .dispatch("showProgramList", this.campus.campus_id)
        .then(result => {
          this.programList = filterProgram(
            result.data.programs,
            selectedPrograms
          );
          this.totalRows_programs = this.programList.length;
          this.$isLoading(false);
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    searchApplication: _.debounce(function() {
      this.$store
        .dispatch("showApplication", this.campus.suc_id)
        .then(result => {
          this.applications = searchByName(
            result.data.applications,
            this.search
          );
          this.totalRows = this.applications.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    searchPreparedApplication: _.debounce(function() {
      this.$store
        .dispatch("showApplication", this.campus.suc_id)
        .then(result => {
          this.applications = searchByName(
            result.data.applications,
            this.applicationSearch
          );
          this.totalRows_notSubmitted = this.applications.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    searchProgram: _.debounce(function(selectedPrograms) {
      this.$store
        .dispatch("showProgramList", this.campus.campus_id)
        .then(result => {
          let programList = filterProgram(
            result.data.programs,
            selectedPrograms
          );
          this.programList = searchProgramName(programList, this.programSearch);
          this.totalRows_programs = this.programList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    createApplication() {
      this.$isLoading(true);
      let suc_id = this.campus.suc_id;
      let user_id = this.user.id;
      let title = this.title;
      let programs = this.newPrograms;
      this.$isLoading(true);
      this.$store
        .dispatch("createApplication", { suc_id, user_id, title, programs })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showApplication", this.campus.suc_id)
              .then(result => {
                this.applications = result.data.applications;
                this.files = result.data.files;
                this.totalRows = this.applications.length;
              });
            this.newPreparation = false;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.title = null;
            this.newPrograms = [];
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
    addProgram() {
      this.$isLoading(true);
      let application_id = this.application.id;
      let program_id = this.programs.id;
      let level = this.preferred_level;
      let preferred_start_date = this.preferred_start_date;
      let preferred_end_date = this.preferred_end_date;
      this.$store
        .dispatch("createSelectedProgram", {
          application_id,
          program_id,
          level,
          preferred_start_date,
          preferred_end_date
        })
        .then(result => {
          if (result.data.status === true) {
            let id = result.data.applied_program.id;
            let program_name = this.programs.program_name;
            let level = result.data.applied_program.level;
            let preferred_start_date =
              result.data.applied_program.preferred_start_date;
            let preferred_end_date =
              result.data.applied_program.preferred_end_date;
            this.programSelectedList.push({
              id,
              program_name,
              level,
              preferred_start_date,
              preferred_end_date
            });
            let index = this.programList.findIndex(
              data => data.id === this.application.id
            );
            this.programList.splice(index, 1);
            this.totalRows_programs = this.programList.length;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.preferred_level = "";
            this.preferred_start_date = "";
            this.preferred_end_date = "";
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
    editApplication() {
      this.$isLoading(true);
      let application_id = this.application.id;
      let title = this.newTitle;
      this.$store
        .dispatch("editApplication", { application_id, title })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showApplication", this.campus.suc_id)
              .then(result => {
                this.applications = result.data.applications;
                this.files = result.data.files;
                this.totalRows = this.applications.length;
              });
            this.newTitle = null;
            this.changeTitle = false;
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
    removeApplication() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteApplication", this.application.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.applications.findIndex(
              data => data.id === this.application.id
            );
            this.applications.splice(index, 1);
            this.totalRows = this.applications.length;
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
    filterApplications(filterStatus) {
      if (this.applications?.length) {
        if (filterStatus === 0) {
          return this.applications.filter(
            item => toLower(item.status) === toLower("under preparation")
          );
        } else if (filterStatus === 1) {
          return this.applications.filter(
            item =>
              toLower(item.status) === toLower("pending") ||
              toLower(item.status) === toLower("on going")
          );
        } else if (filterStatus === 2) {
          return this.applications.filter(
            item => toLower(item.status) === toLower("done")
          );
        }
      }
    },
    selectProgram(item) {
      let program_id = item.id;
      let program_name = item.program_name;
      let level = this.getLevel(item.latest_applied_level);
      this.newPrograms.push({
        program_id,
        program_name,
        level
      });
      let index = this.programList.findIndex(data => data.id === item.id);
      this.programList.splice(index, 1);
      this.totalRows_programs = this.programList.length;
    },
    getLevel(accreditation_status) {
      if (accreditation_status === "For PSV Accreditation") return "Candidate";
      if (accreditation_status === "Candidate") return "Level I";
      if (accreditation_status === "Level I") return "Level II";
      if (accreditation_status === "Level II") return "Level III, Phase 1";
      if (accreditation_status === "Level III") return "Level IV";
      if (accreditation_status === "Level III, Phase 1")
        return "Level III Phase 2";
      if (accreditation_status === "Level III, Phase 2")
        return "Level IV, Phase 1";
      if (accreditation_status === "Level IV") return "Level IV";
      if (accreditation_status === "Level IV, Phase 1")
        return "Level IV, Phase 2";
      if (accreditation_status === "Level IV, Phase 2")
        return "Level IV, Phase 2";
    },
    formatDate(item) {
      return moment(item).format("ll");
    },
    formatDateTime(item) {
      return moment(item).format("llll");
    },
    concatName(item) {
      if (item) {
        if (item.first_name && item.last_name)
          return item.first_name.concat(" ", item.last_name);
        else if (item.last_name) return item.last_name;
        else if (item.first_name) return item.first_name;
      }
    },
    select(item, tab) {
      this.$store.commit("saveApplication", item);
      this.$store.commit("saveTabSelect", tab);
      this.$router.push("/ProgramSelect");
    }
  },
  async created() {
    this.$isLoading(true);
    if (
      this.tabSelect !== "manage-application-0" &&
      this.tabSelect !== "manage-application-1" &&
      this.tabSelect !== "manage-application-2"
    )
      this.$store.commit("saveTabSelect", "manage-application-0");
    await this.$store
      .dispatch("showApplication", this.campus.suc_id)
      .then(result => {
        this.applications = result.data.applications;
        this.files = result.data.files;
        this.totalRows = this.applications.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
