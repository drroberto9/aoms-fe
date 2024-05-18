<template>
  <div>
    <!--Select Program-->
    <b-modal id="app" v-model="programSelect" size="xl" hide-footer>
      <template #modal-header>
        <h5>Add Program</h5>

        <b-form-input
          placeholder="Search program"
          v-model="programSearch"
          @input="searchProgram"
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
        <template #cell(actions)="row">
          <md-button
            class="md-raised md-dense md-primary"
            style="outline: 0"
            @click="
              preferred_start_date = null;
              preferred_end_date = null;
              programs = row.item;
              preferred_level = getLevel(row.item.latest_applied_level);
              levelAndSchedule = true;
            "
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
          @click="programSelect = false"
          >Close</md-button
        >
      </md-card-actions>
    </b-modal>

    <!--Input Level and Schedule-->
    <b-modal id="app" v-model="levelAndSchedule" size="lg" hide-footer>
      <template #modal-header>
        <h5>{{ programs.program_name }}</h5>
      </template>

      <b-form-group
        id="levelAndSchedule-group-1"
        label="Level Applied For:"
        label-for="levelAndSchedule-1"
      >
        <!-- <b-form-input
          id="levelAndSchedule-1"
          v-model="preferred_level"
          size="sm"
          disabled
        >
        </b-form-input> -->
        <multiselect
          id="levelAndSchedule-1"
          v-model="preferred_level"
          :options="levelList"
          :placeholder="null"
          size="sm"
          required
        ></multiselect>
      </b-form-group>

      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <label>Preferred Start Date:</label>
          <b-form-datepicker
            v-model="preferred_start_date"
            :min="new Date()"
          ></b-form-datepicker>
        </div>
        <div class="md-layout-item">
          <label>Preferred End Date:</label>
          <b-form-datepicker
            v-model="preferred_end_date"
            :min="preferred_start_date"
          ></b-form-datepicker>
        </div>
      </div>

      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          style="margin: 0 5px 0 0"
          @click="levelAndSchedule = false"
          >Cancel</md-button
        >
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="
            addProgram();
            levelAndSchedule = false;
          "
          >Submit</md-button
        >
      </md-card-actions>
    </b-modal>

    <!--Reschedule Modal-->
    <b-modal id="app" v-model="rescheduleApplication" size="lg" hide-footer>
      <template #modal-header>
        <h5>Reschedule</h5>
      </template>
      <form @submit.prevent="editProgram()">
        Set new schedule for accreditation.
        <b-form-group style="margin-top: 10px">
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <b-form-group
                id="rescheduleApplication-group-1"
                label="Start Date:"
                label-for="rescheduleApplication-1"
              >
                <b-form-datepicker
                  id="rescheduleApplication-1"
                  v-model="preferred_start_date"
                  :min="new Date()"
                  size="sm"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </div>
            <div class="md-layout-item">
              <b-form-group
                id="rescheduleApplication-group-2"
                label="End Date:"
                label-for="rescheduleApplication-2"
              >
                <b-form-datepicker
                  id="rescheduleApplication-2"
                  v-model="preferred_end_date"
                  :min="preferred_start_date"
                  size="sm"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </div>
          </div>
        </b-form-group>
        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="rescheduleApplication = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Reschedule</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Change Level-->
    <b-modal id="app" v-model="editLevelPrompt" size="lg" hide-footer>
      <template #modal-header>
        <h5>Select Applied Level</h5>
      </template>
      <form @submit.prevent="editLevel()">
        <b-form-group
          id="editLevelPrompt-group-1"
          label="Select Level:"
          label-for="editLevelPrompt-1"
        >
          <multiselect
            v-model="newLevel"
            :options="levelList"
            :placeholder="null"
            required
          ></multiselect>
        </b-form-group>
        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editLevelPrompt = false"
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

    <!--Change Application-->
    <b-modal id="app" v-model="setApplication" size="lg" hide-footer>
      <template #modal-header>
        <h5>Change Application</h5>
      </template>
      <form @submit.prevent="changeApplication()">
        Set new application for {{ programSelected.program_name }}.

        <br /><br />

        <b-form-group
          id="setApplication-group-1"
          label="Applications:"
          label-for="setApplication-1"
        >
          <multiselect
            v-model="newApplication"
            :options="applications"
            :custom-label="applicationTitle"
            :placeholder="null"
            required
          ></multiselect>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="setApplication = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Change</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Assign Task Force Head-->
    <b-modal id="app" v-model="assignTaskForceHead" size="lg" hide-footer>
      <template #modal-header>
        <h5>Assign Task Force Head</h5>
      </template>
      <form @submit.prevent="assignHeadTask()">
        <b-form-group
          id="assignTaskForceHead-group-1"
          label="Task Force Head:"
          label-for="assignTaskForceHead-1"
        >
          <multiselect
            v-model="userSelect"
            :options="
              filterTaskForceHead(userList, findUser(programSelected.id))
            "
            :custom-label="userNameAndOffice"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select-->
          <!--            id="assignTaskForceHead-1"-->
          <!--            v-model="userSelect"-->
          <!--            required-->
          <!--          >-->
          <!--            <option-->
          <!--              v-for="(item, index) in filterTaskForceHead(-->
          <!--                userList,-->
          <!--                findUser(programSelected.id)-->
          <!--              )"-->
          <!--              :key="index"-->
          <!--              :value="item"-->
          <!--            >-->
          <!--              {{ concatName(item) }}-->
          <!--              {{-->
          <!--                getOffice(item.office_roles)-->
          <!--                  ? "(" + getOffice(item.office_roles).office_name + ")"-->
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
              @click="assignTaskForceHead = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              @click="assignTaskForceHead = false"
              >Add</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Upload-->
    <b-modal id="app" v-model="upload" size="lg" hide-footer>
      <template #modal-header>
        <h5>Upload File</h5>
      </template>
      <form @submit.prevent="uploadFile()">
        <!-- <div v-if="!filename[0]">
          {{ filename[0] }}
          <b-form-file
            v-model="filename[0]"
            size="sm"
            multiple
            required
          ></b-form-file>
        </div>
        <div v-else>
          <div v-for="(item, index) in filename[0]" :key="index">
            <div class="md-layout" style="margin-bottom: 5px">
              <div class="md-layout-item">
                <b-form-input
                  v-model="item.name"
                  size="sm"
                  type="text"
                  disabled
                  style="background: white"
                ></b-form-input>
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  style="outline: 0"
                  @click="removeFilename(index)"
                  ><md-icon>delete</md-icon></md-button
                >
              </div>
            </div>
          </div>
        </div> -->

        <div style="margin-bottom: 10px">
          <b-form-file
            v-model="selectedFilename"
            multiple
            @input="selectDocument()"
          ></b-form-file>
        </div>

        <div v-if="filename.length">
          <div v-for="(item, index) in filename" :key="index">
            <div class="md-layout" style="margin-bottom: 5px">
              <div class="md-layout-item">
                <b-form-input
                  v-model="filename[index].name"
                  type="text"
                  disabled
                  style="background: white"
                ></b-form-input>
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  @click="removeFilename(index)"
                  ><md-icon>delete</md-icon></md-button
                >
              </div>
            </div>
          </div>
        </div>

        <md-card-actions>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="upload = false"
            >Cancel</md-button
          >
          <md-button
            v-if="filename.length"
            class="md-primary md-raised"
            style="margin: 0"
            type="submit"
            >Submit</md-button
          >
          <md-button v-else class="md-primary md-raised" style="margin: 0"
            >Submit</md-button
          >
        </md-card-actions>
      </form>
    </b-modal>

    <!--Delete File-->
    <b-modal id="app" v-model="deleteFilePrompt">
      <template #modal-header>
        <h5>Delete User</h5>
      </template>
      Are you sure you want to remove this file?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteFilePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeFile();
              deleteFilePrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Remove Program-->
    <b-modal id="app" v-model="deleteProgramPrompt">
      <template #modal-header>
        <h5>Delete Instrument</h5>
      </template>
      Are you sure you want to remove this program?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteProgramPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeProgram();
              deleteProgramPrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Remove User-->
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
          <h4>{{ campus.institution_name }}</h4>
          <h5>{{ application.title }}</h5>
        </div>
      </div>

      <div class="md-layout" style="margin-bottom: 5px">
        <div class="md-layout-item">
          <h5 style="margin-top: 15px">Application Documents:</h5>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            style="width: 200px; margin: 0;"
            class="md-primary md-raised"
            @click="
              filename = [];
              selectedFilename = [];
              upload = true;
            "
            >Upload Files</md-button
          >
        </div>
      </div>

      <b-table
        :items="filterFiles(this.application.id)"
        :fields="fields_files"
        :sort-by.sync="sortBy_files"
        :sort-desc.sync="sortDesc_files"
        class="md-elevation-2"
        outlined
        small
        sort-icon-left
        responsive="sm"
      >
        <template #cell(file_title)="row">
          <b-link
            @click="
              file = row.item;
              downloadLetter(row.item);
            "
            >{{ row.item.file_title }}</b-link
          >
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Delete File"
            v-if="application.status === 'under preparation'"
            class="md-icon-button md-dense md-accent"
            style="outline: 0"
            @click="
              file = row.item;
              deleteFilePrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
          >
        </template>
      </b-table>

      <div class="md-layout" style="margin-bottom: 5px">
        <div class="md-layout-item">
          <h5 style="margin-top: 15px">Programs:</h5>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            v-if="application.status === 'under preparation'"
            style="width: 200px; margin: 0;"
            class="md-primary md-raised"
            @click="
              setPrograms(programSelectedList);
              programSelect = true;
            "
            >Select Programs</md-button
          >
        </div>
      </div>

      <b-table
        :items="programSelectedList"
        :fields="fields_programSelected"
        :current-page="currentPage_programSelected"
        :per-page="perPage_programSelected"
        :sort-by.sync="sortBy_programSelected"
        :sort-desc.sync="sortDesc_programSelected"
        class="md-elevation-2"
        outlined
        small
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(level)="row">
          {{ row.value }}
          <md-button
            v-b-tooltip.hover
            title="Remove"
            v-if="application.status === 'under preparation'"
            class="md-icon-button md-dense md-primary"
            @click="
              programSelected = row.item;
              newLevel = row.item.level;
              editLevelPrompt = true;
            "
            ><md-icon>edit</md-icon></md-button
          >
        </template>

        <template #cell(schedule)="row">
          <div v-if="row.item.approved_start_date">
            {{ row.item.approved_start_date }} to
            {{ row.item.approved_end_date }} (Approved)
          </div>
          <div v-else-if="row.item.preferred_start_date">
            {{ row.item.preferred_start_date }} to
            {{ row.item.preferred_end_date }} (Preferred)
          </div>
          <div v-else></div>
        </template>

        <template #cell(task_force_head)="row">
          {{ concatName(findUser(row.item.id)) }}
          <md-button
            v-b-tooltip.hover
            title="Assign College Task Force Head"
            v-if="
              !findUser(row.item.id) &&
                application.status === 'under preparation'
            "
            class="md-icon-button md-dense md-primary"
            style="outline: 0"
            @click="
              setUserList();
              programSelected = row.item;
              userSelect = null;
              assignTaskForceHead = true;
            "
            ><md-icon>add_circle</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Remove"
            v-else-if="application.status === 'under preparation'"
            class="md-icon-button md-dense md-accent"
            @click="
              programSelected = row.item;
              deleteUserPrompt = true;
            "
            ><md-icon>close</md-icon></md-button
          >
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Assign Internal Accreditor"
            class="md-icon-button md-dense md-primary"
            @click="select(row.item)"
            ><md-icon>forward</md-icon></md-button
          >

          <md-button
            v-if="application.status === 'under preparation'"
            v-b-tooltip.hover
            title="Reschedule"
            class="md-icon-button md-dense md-primary"
            @click="
              programSelected = row.item;
              preferred_start_date = null;
              preferred_end_date = null;
              rescheduleApplication = true;
            "
            ><md-icon>date_range</md-icon></md-button
          >

          <md-button
            v-if="application.status === 'under preparation'"
            v-b-tooltip.hover
            title="Change Application Location"
            class="md-icon-button md-dense md-primary"
            @click="
              programSelected = row.item;
              newApplication = null;
              setApplication = true;
            "
            ><md-icon>edit_location_alt</md-icon></md-button
          >

          <md-button
            v-b-tooltip.hover
            title="Delete"
            v-if="application.status === 'under preparation'"
            class="md-icon-button md-dense md-accent"
            @click="
              programSelected = row.item;
              deleteProgramPrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage_programSelected"
        :total-rows="totalRows_programSelected"
        :per-page="perPage_programSelected"
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

const searchProgramName = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.program_name).includes(toLower(term))
    );
  }
  return items;
};

const filterProgram = (array1, array2) => {
  if (array2) {
    for (let x = 0; x < array2.length; x++) {
      // let index = array1.findIndex(data => data.id === array2[x].program_id);
      // array1.splice(index, 1);

      array1 = array1.filter(data => data.id !== array2[x].program_id);
    }
    // return array1;
  }
  return array1;
};

const searchByApplicationID = (items, term) => {
  if (items?.length) {
    return items.filter(item => item.application_id === term);
  }
  return items;
};

const filterApplications = items => {
  if (items?.length) {
    return items.filter(
      item => toLower(item.status) === toLower("under preparation")
    );
  }
  return items;
};

const selectUser = (items, term) => {
  if (term) {
    return items.find(
      item =>
        item.application_program_id === term &&
        item.role === "college task force head"
    );
  }
};

export default {
  name: "ProgramSelect",
  data() {
    return {
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
          label: "Level Applied For"
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
      sortBy_files: "id",
      sortDesc_files: false,
      fields_files: [
        { key: "id", label: "ID", sortable: true },
        { key: "file_title", label: "Document", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      title: null,
      programs: [],
      programList: [],
      msiList: [],
      applications: [],
      files: [],
      programFiles: [],
      file: {},
      filename: [],
      selectedFilename: [],
      programSelectedList: [],
      programSelected: {},
      userList: [],
      userHeadList: [],
      userSelect: null,
      roles: [],
      offices: [],
      preferred_level: null,
      preferred_start_date: null,
      preferred_end_date: null,
      newLevel: null,
      levelList: [
        "Candidate",
        "Level I",
        "Level II",
        "Level III, Phase 1",
        "Level III, Phase 2",
        "Level IV, Phase 1",
        "Level IV, Phase 2"
      ],
      newApplication: null,
      search: null,
      programSearch: null,
      instrument_id: null,
      upload: false,
      deleteFilePrompt: false,
      deleteProgramPrompt: false,
      programSelect: false,
      fileEdit: false,
      levelAndSchedule: false,
      editLevelPrompt: false,
      rescheduleApplication: false,
      assignTaskForceHead: false,
      setApplication: false,
      deleteUserPrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus",
      application: "application"
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
    getOffice(office_roles) {
      let result = office_roles.find(item => item.role_id === 11);
      if (result) return result;
    },
    setUserList() {
      this.$isLoading(true);
      this.$store
        .dispatch("showCampusUser", this.campus.campus_id)
        .then(result => {
          this.userList = result.data.users.filter(
            item => item.status === "active"
          );
          this.$isLoading(false);
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    searchProgram: _.debounce(function() {
      this.$store
        .dispatch("showProgramList", this.campus.campus_id)
        .then(result => {
          this.programList = searchProgramName(
            result.data.programs,
            this.programSearch
          );
          this.totalRows_programs = this.programList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
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
            // let id = result.data.applied_program.id;
            // let program_name = this.programs.program_name;
            // let level = result.data.applied_program.level;
            // let preferred_start_date =
            //   result.data.applied_program.preferred_start_date;
            // let preferred_end_date =
            //   result.data.applied_program.preferred_end_date;
            // this.programSelectedList.push({
            //   id,
            //   program_name,
            //   level,
            //   preferred_start_date,
            //   preferred_end_date
            // });
            this.$store
              .dispatch("showSelectedProgram", this.application.id)
              .then(result => {
                this.programSelectedList = result.data.programs;
                this.userHeadList = result.data.users;
                this.programFiles = result.data.files;
                this.totalRows_programSelected = this.programSelectedList.length;
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
    assignHeadTask() {
      this.$isLoading(true);
      let program_id = this.programSelected.id;
      let user_id = this.userSelect.user_id;
      let role = "college task force head";
      this.$store
        .dispatch("assignHeadTask", {
          program_id,
          user_id,
          role
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showSelectedProgram", this.application.id)
              .then(result => {
                this.userHeadList = result.data.users;
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
    uploadFile() {
      this.$isLoading(true);
      let application_id = this.application.id;
      let filename = this.filename;
      this.$store
        .dispatch("uploadFile", { application_id, filename })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showApplication", this.campus.suc_id)
              .then(result => {
                this.files = result.data.files;
              });
            this.upload = false;
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
    downloadLetter(item) {
      this.$isLoading(true);
      this.$store
        .dispatch("viewFile", item.id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = window.URL.createObjectURL(new Blob([result.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", this.file.file_title);
          document.body.appendChild(fileLink);

          fileLink.click();
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
    removeFile() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteFile", this.file.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.files.findIndex(data => data.id === this.file.id);
            this.files.splice(index, 1);
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
    editProgram() {
      this.$isLoading(true);
      let program_id = this.programSelected.id;
      let preferred_start_date = this.preferred_start_date;
      let preferred_end_date = this.preferred_end_date;
      this.$store
        .dispatch("editSelectedProgram", {
          program_id,
          preferred_start_date,
          preferred_end_date
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showSelectedProgram", this.application.id)
              .then(result => {
                this.programSelectedList = result.data.programs;
                this.userHeadList = result.data.users;
                this.programFiles = result.data.files;
                this.totalRows_programSelected = this.programSelectedList.length;
              });
            this.preferred_start_date = "";
            this.preferred_end_date = "";
            this.rescheduleApplication = false;
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
    editLevel() {
      this.$isLoading(true);
      let program_id = this.programSelected.id;
      let level = this.newLevel;
      this.$store
        .dispatch("editLevel", {
          program_id,
          level
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showSelectedProgram", this.application.id)
              .then(result => {
                this.programSelectedList = result.data.programs;
                this.userHeadList = result.data.users;
                this.programFiles = result.data.files;
                this.totalRows_programSelected = this.programSelectedList.length;
              });
            this.newLevel = null;
            this.editLevelPrompt = false;
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
    changeApplication() {
      this.$isLoading(true);
      let application_id = this.newApplication.id;
      let program_id = this.programSelected.id;
      this.$store
        .dispatch("changeApplication", { application_id, program_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showSelectedProgram", this.application.id)
              .then(result => {
                this.programSelectedList = result.data.programs;
                this.userHeadList = result.data.users;
                this.programFiles = result.data.files;
                this.totalRows_programSelected = this.programSelectedList.length;
              });
            this.newApplication = null;
            this.setApplication = false;
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
    removeProgram() {
      this.$isLoading(true);
      this.$store
        .dispatch("removeSelectedProgram", this.programSelected.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.programSelectedList.findIndex(
              data => data.id === this.programSelected.id
            );
            this.programSelectedList.splice(index, 1);
            this.totalRows = this.programSelectedList.length;
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
    removeUser() {
      this.$isLoading(true);
      let transaction_id = this.programSelected.id;
      let user_id = this.findUser(this.programSelected.id).id;
      this.$store
        .dispatch("deleteAssignedHeadUser", { transaction_id, user_id })
        .then(result => {
          if (result.data.status === true) {
            let index = this.userHeadList.findIndex(
              data => data.id === user_id
            );
            this.userHeadList.splice(index, 1);
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
    filterTaskForceHead(users, setRoles) {
      let selection = [];
      if (users?.length) {
        for (let x = 0; x < users.length; x++) {
          if (users[x].office_roles.filter(item => item.role_id === 11)?.length)
            selection.push(users[x]);
        }
      }

      if (setRoles) {
        let index = selection.findIndex(
          data => data.user_id === setRoles.user_id
        );
        selection.splice(index, 1);
      }
      return selection;
    },
    assignTaskForceList(user_id) {
      if (this.userList) {
        return this.userList.find(item => item.user_id === user_id);
      }
    },
    addFilename() {
      if (this.filename[this.filename.length - 1] !== null)
        this.filename.push(null);
    },
    removeFilename(counter) {
      this.filename[0].splice(counter, 1);
    },
    filterFiles(id) {
      return searchByApplicationID(this.files, id);
    },
    findUser(id) {
      if (id) {
        return selectUser(this.userHeadList, id);
      }
    },
    selectDocument() {
      if (!this.filename) this.filename = this.selectedFilename;
      else this.filename.push(...this.selectedFilename);
      this.selectedFilename = [];
    },
    select(item) {
      this.$store.commit("saveProgram", item);
      // if (item.level.includes("Level III") || item.level.includes("Level IV"))
      //   this.$router.push("/ProgramForm");
      // else this.$router.push("/ProgramInstrument");
      this.$router.push("/ProgramInstrument");
    },
    back() {
      this.$router.push("/PlanAccreditation");
    },
    concatName(item) {
      if (item) {
        if (item.first_name && item.last_name)
          return item.first_name.concat(" ", item.last_name);
        else if (item.last_name) return item.last_name;
        else if (item.first_name) return item.first_name;
      }
    },
    userNameAndOffice(item) {
      return `${this.concatName(item)} - ${
        this.getOffice(item.office_roles)
          ? this.getOffice(item.office_roles).office_name
          : ""
      }`;
    },
    applicationTitle({ title }) {
      return `${title}`;
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showSelectedProgram", this.application.id)
      .then(result => {
        this.programSelectedList = result.data.programs;
        this.userHeadList = result.data.users;
        this.programFiles = result.data.files;
        this.totalRows_programSelected = this.programSelectedList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showApplication", this.campus.suc_id)
      .then(result => {
        this.applications = filterApplications(result.data.applications);
        this.files = result.data.files;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
