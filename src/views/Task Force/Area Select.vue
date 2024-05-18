<template>
  <div>
    <!-- Program Files -->
    <b-modal id="app" v-model="manageProgramFiles" size="xl" hide-footer>
      <template #modal-header>
        <h5 style="margin: 0">Program Files</h5>
      </template>

      <div class="md-layout">
        <div class="md-layout-item">
          <div
            v-if="taskHead === 0"
            class="md-layout-item"
            style="max-width: min-content"
          >
            <b-dropdown variant="primary" text="Upload Reports">
              <b-dropdown-item
                v-if="instrumentID === 42 || instrumentID === 47"
                @click="
                  filename = [null];
                  type = 'Narrative Profile';
                  upload = true;
                "
                >Narrative Profile</b-dropdown-item
              >
              <b-dropdown-item
                v-else
                @click="
                  filename = [null];
                  type = 'PPP';
                  upload = true;
                "
                >PPP</b-dropdown-item
              >
              <b-dropdown-item
                @click="
                  filename = [null];
                  type = 'Compliance Report';
                  upload = true;
                "
                >Compliance Report</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </div>
        <div class="md-layout-item" style="max-width: 150px">
          <b-form-select v-model="filterType" class="mb-3">
            <b-form-select-option :value="0">Show All</b-form-select-option>
            <b-form-select-option :value="1">PPP</b-form-select-option>
            <b-form-select-option :value="2"
              >Compliance Report</b-form-select-option
            >
            <b-form-select-option :value="3"
              >Narrative Report</b-form-select-option
            >
          </b-form-select>
        </div>
        <div class="md-layout-item" style="max-width: 330px; margin-left: 5px">
          <b-form-input
            placeholder="Search document"
            v-model="search_files"
            @input="searchFileTable()"
            type="text"
          ></b-form-input>
        </div>
      </div>

      <b-table
        :items="filterByType()"
        :fields="fields_files"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy_files"
        :sort-desc.sync="sortDesc"
        class="md-elevation-2"
        outlined
        small
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(file_title)="row">
          <b-link @click="downloadReport(row.item)">{{
            row.item.file_title
          }}</b-link>
        </template>

        <template #cell(type)="row">
          {{ getType(row.item) }}
        </template>

        <template #cell(actions)="row">
          <md-button
            v-if="row.item.status !== 'approved' && taskHead === 0"
            v-b-tooltip.hover
            title="Approve"
            class="md-icon-button md-dense md-primary"
            @click="
              documentSelect = row.item;
              fileStatus = 'approved';
              approvePrompt = true;
            "
            ><md-icon>check_circle</md-icon></md-button
          >
          <md-button
            v-if="row.item.status === 'approved' && taskHead === 0"
            v-b-tooltip.hover
            title="Remove Approval"
            class="md-icon-button md-dense md-accent"
            @click="
              documentSelect = row.item;
              fileStatus = 'pending';
              approvePrompt = true;
            "
            ><md-icon>undo</md-icon></md-button
          >
          <md-button
            v-if="
              row.item.status !== 'return for revision' &&
                row.item.status !== 'approved' &&
                taskHead === 0
            "
            v-b-tooltip.hover
            title="Return"
            class="md-icon-button md-dense md-accent"
            @click="
              documentSelect = row.item;
              fileStatus = 'return for revision';
              approvePrompt = true;
            "
            ><md-icon>undo</md-icon></md-button
          >
          <md-button
            v-if="row.item.status !== 'approved' && taskHead === 1"
            v-b-tooltip.hover
            title="Edit"
            class="md-icon-button md-dense md-primary"
            @click="
              documentSelect = row.item;
              filenameEdit = null;
              type = row.item.type;
              uploadEdit = true;
            "
            ><md-icon>edit</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-dense md-accent"
            @click="
              documentSelect = row.item;
              deletePrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="filterByType() ? filterByType().length : 0"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-auto md-elevation-2"
      ></b-pagination>

      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 10px 0 0 0"
            @click="manageProgramFiles = false"
            >Close</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Assign Task Force-->
    <b-modal id="app" v-model="assignTaskForce" size="lg" hide-footer>
      <template #modal-header>
        <h5>Assign Task Force</h5>
      </template>
      <form @submit.prevent="assignTask">
        <b-form-group
          id="assignTaskForce-group-1"
          label="Task Force:"
          label-for="assignTaskForce-1"
        >
          <multiselect
            v-model="userSelect"
            :options="filterTaskForce(setUsers(instrumentSelect.id))"
            :custom-label="userNameAndOffice"
            :placeholder="null"
            required
          ></multiselect>
          <!--          <b-form-select id="assignTaskForce-1" v-model="userSelect" required>-->
          <!--            <option-->
          <!--              v-for="(item, index) in filterTaskForce(-->
          <!--                setUsers(instrumentSelect.id)-->
          <!--              )"-->
          <!--              :key="index"-->
          <!--              :value="item"-->
          <!--            >-->
          <!--              {{ concatName(item) }}-->
          <!--              {{ item.office ? "(" + item.office + ")" : "" }}-->
          <!--            </option>-->
          <!--          </b-form-select>-->
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="assignTaskForce = false"
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

    <!--Remove User Modal-->
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

    <!--Upload-->
    <b-modal id="app" v-model="upload" size="lg" hide-footer>
      <template #modal-header>
        <h5>Upload {{ type }}</h5>
      </template>
      <form @submit.prevent="uploadProgramFile()">
        <!-- <b-form-file v-model="filename" size="sm" required></b-form-file> -->

        <b-form-file
          v-model="filename[0]"
          size="sm"
          style="margin-bottom: 5px"
          required
        ></b-form-file>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="upload = false"
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

    <!--Upload Edit-->
    <b-modal id="app" v-model="uploadEdit" size="lg" hide-footer>
      <template #modal-header>
        <h5>Re-Upload {{ type }}</h5>
      </template>
      <form @submit.prevent="updateProgramFile()">
        <b-form-file v-model="filenameEdit" size="sm" required></b-form-file>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="uploadEdit = false"
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

    <!--Approve Prompt-->
    <b-modal id="app" v-model="approvePrompt">
      <template #modal-header>
        <h5>Document Status</h5>
      </template>
      Do you want to set this document's status to "{{ fileStatus }}"?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="approvePrompt = false"
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              changeProgramFileStatus();
              approvePrompt = false;
            "
            >Yes</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Delete Prompt-->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Remove Document</h5>
      </template>
      Are you sure you want to remove this document?
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
              removeFile();
              deletePrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
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

    <!--Main-->
    <md-card style="padding: 15px 20px">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ program.program_name }}</h4>
          <h5>{{ campus.campus_name }}</h5>
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item">
          <h5 style="margin-top: 15px">Areas:</h5>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            v-if="
              taskHead === 0 && (instrumentID === 42 || instrumentID === 47)
            "
            style="width: 180px; margin: 0 5px 0 0"
            class="md-primary md-raised"
            @click="
              instrumentSelected = null;
              assignInstruments = true;
            "
            >Assign Optional Area</md-button
          >
          <md-button
            style="width: 180px; margin: 0"
            class="md-primary md-raised"
            @click="setProgramFiles"
            >Show Program Files</md-button
          >
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
        <template #cell(task_force)="row">
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
              style="max-width: max-content; margin-right: 5px"
            >
              <md-button
                v-b-tooltip.hover
                title="Add Designated Area"
                class="md-icon-button md-dense md-primary"
                @click="
                  userSelect = null;
                  instrumentSelect = row.item;
                  assignTaskForce = true;
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
                title="Assign Task Force"
                class="md-icon-button md-dense md-primary"
                @click="
                  userSelect = null;
                  instrumentSelect = row.item;
                  assignTaskForce = true;
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

        <template #cell(internal_accreditor)="row">
          <span
            v-for="(item, index) in setAccreditors(row.item.id)"
            :key="index"
          >
            {{ concatName(item) }}
            <a v-if="setAccreditors(row.item.id)[index + 1]">,</a>
          </span>
        </template>

        <template #cell(report_templates)="row">
          <span v-for="(item, index) in row.item.report_templates" :key="index">
            <b-link @click="downloadTemplate(item)">{{
              item.template_name
            }}</b-link>
            <a v-if="row.item.report_templates[index + 1]">, </a>
          </span>
        </template>

        <template #cell(updated_at)="row">
          {{ formatDate(row.value) }}
        </template>

        <template #cell(actions)="row">
          <b-dropdown
            v-if="taskHead === 1"
            v-b-tooltip.hover
            title="Upload Reports"
            size="sm"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content
              ><md-icon class="md-primary">publish</md-icon>
            </template>
            <b-dropdown-item
              v-if="instrumentID === 42 || instrumentID === 47"
              @click="
                filename = [null];
                instrumentSelect = row.item;
                type = 'Narrative Profile';
                upload = true;
              "
              >Narrative Profile</b-dropdown-item
            >
            <b-dropdown-item
              v-else
              @click="
                filename = [null];
                instrumentSelect = row.item;
                type = 'PPP';
                upload = true;
              "
              >PPP</b-dropdown-item
            >
            <b-dropdown-item
              @click="
                filename = [null];
                instrumentSelect = row.item;
                type = 'Compliance Report';
                upload = true;
              "
              >Compliance Report</b-dropdown-item
            >
          </b-dropdown>
          <md-button
            v-if="
              taskHead === 0 &&
                row.item.type === 'Optional' &&
                (instrumentID === 42 || instrumentID === 47)
            "
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-dense md-accent"
            @click="
              instrumentSelect = row.item;
              removeInstrumentPrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
          >
          <md-badge
            v-if="filterMessageByArea(messages, row.item.id).length > 0"
            class="md-square"
            md-content="New"
            md-dense
          >
            <md-button
              v-b-tooltip.hover
              title="Select"
              class="md-icon-button md-dense md-primary"
              @click="select(row.item)"
              ><md-icon>forward</md-icon></md-button
            >
          </md-badge>
          <md-button
            v-else
            v-b-tooltip.hover
            title="Select"
            class="md-icon-button md-dense md-primary"
            @click="select(row.item)"
            ><md-icon>forward</md-icon></md-button
          >
        </template>
      </b-table>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByFile = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.file_title).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "manageMSI",
  data() {
    return {
      sortBy: "area_number",
      sortDesc: false,
      currentPage: 1,
      perPage: 5,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Area Name", sortable: true },
        { key: "report_templates", label: "Templates" },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "140px" } }
      ],
      fields_head: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Area Name", sortable: true },
        { key: "task_force", label: "Task Force" },
        { key: "internal_accreditor", label: "Self Survey Accreditor" },
        { key: "report_templates", label: "Templates" },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "120px" } }
      ],
      sortBy_files: "type",
      fields_files: [
        { key: "id", label: "ID", sortable: true },
        { key: "file_title", label: "Document", sortable: true },
        { key: "type", label: "Type", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions" }
      ],
      msiList: [{}],
      instrumentID: null,
      taskList: [{}],
      instrumentSelect: {},
      users: [{}],
      user_id: null,
      userSelect: null,
      userList: [{}],
      programFiles: [],
      search_files: null,
      filterType: 0,
      type: null,
      filename: [null],
      filenameEdit: null,
      documentSelect: null,
      fileStatus: "",
      instrumentSelected: null,
      msiOptionList: [],
      messages: [],
      manageProgramFiles: false,
      assignInstruments: false,
      removeInstrumentPrompt: false,
      approvePrompt: false,
      deletePrompt: false,
      upload: false,
      uploadEdit: false,
      assignTaskForce: false,
      deleteUserPrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      campus: "campus",
      program: "program",
      role: "role",
      offices: "offices",
      taskHead: "taskHead"
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
    messageToast(title, variant) {
      this.$bvToast.toast(this.snackbarText, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-left",
        solid: true,
        noAutoHide: true
      });
    },
    searchFileTable: _.debounce(function() {
      if (this.taskHead === 0) {
        this.$store
          .dispatch("showFileTFH", this.program.id)
          .then(result => {
            this.programFiles = searchByFile(result.data, this.search_files);
          })
          .catch(err => {
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      } else {
        let user_id = this.user.id;
        let program_id = this.program.id;
        this.$store
          .dispatch("showFileTF", { user_id, program_id })
          .then(result => {
            this.programFiles = searchByFile(result.data, this.search_files);
          })
          .catch(err => {
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      }
    }, 500),
    filterByType() {
      if (this.filterType === 0) return this.programFiles;
      else if (this.filterType === 1)
        return this.programFiles.filter(items => items.type.includes("PPP"));
      else if (this.filterType === 2)
        return this.programFiles.filter(items =>
          items.type.includes("Compliance")
        );
      else if (this.filterType === 3)
        return this.programFiles.filter(items =>
          items.type.includes("Narrative")
        );
    },
    select(item) {
      if (item != null) {
        if (this.taskHead === 1) {
          let assigned_user = this.taskList.find(
            x => x.transaction_id === item.id
          );
          this.$store.commit("saveAssignedUser", assigned_user.id);
        }

        this.$store.commit("saveInstrument", item);

        if (this.instrumentID === 42 || this.instrumentID === 47) {
          this.$router.push("/AttachFileForm");
        } else if (this.program.level === "Candidate") {
          this.$router.push("/AttachFilePSV");
        } else this.$router.push("/TaskForceParameter");
      }
    },
    back() {
      if (this.taskHead === 0) this.$router.push("/TaskForceHeadTask");
      if (this.taskHead === 1) this.$router.push("/TaskForceTask");
    },
    checkFields() {
      if (this.taskHead === 0) return this.fields_head;
      if (this.taskHead === 1) return this.fields;
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
    changeProgramFileStatus() {
      this.$isLoading(true);
      let file_ids = [this.documentSelect.id];
      let status = this.fileStatus;
      this.$store
        .dispatch("changeProgramFileStatus", { file_ids, status })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showFileTFH", this.program.id)
              .then(result => {
                this.programFiles = result.data;
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
    getType(item) {
      let type = item.type.replace("Internal", "Self Survey");
      if (item.area) {
        return type.concat(" - ", item.area);
      } else return type;
    },
    formatDate(item) {
      return moment(item).format("llll");
    },
    filterTaskForce(setRoles) {
      let selection = [];
      selection = this.userList.filter(
        item => item.role_id === 1 || item.role_id === 2 || item.role_id === 11
      );
      if (setRoles?.length) {
        for (let y = 0; y < setRoles.length; y++) {
          selection = selection.filter(
            data => setRoles[y].user_id !== data.user_id
          );
        }
      }
      return selection;
    },
    setUserList() {
      this.$isLoading(true);
      this.$store
        .dispatch("showTF", this.setOffice())
        .then(result => {
          this.userList = result.data.users;
          this.$isLoading(false);
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    assignTask() {
      this.$isLoading(true);
      let instrument_id = this.instrumentSelect.id;
      let program_id = this.program.id;
      let user_id = this.userSelect.user_id;
      let role = "accreditation task force";
      this.$store
        .dispatch("assignTask", { instrument_id, program_id, user_id, role })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showInstrumentProgram", this.program.program_id)
              .then(result => {
                this.users = result.data.users;
              });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.assignTaskForce = false;
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
      this.$store
        .dispatch("deleteAssignedUser", this.user_id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showInstrumentProgram", this.program.program_id)
              .then(result => {
                this.users = result.data.users;
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
                this.msiList = result.data.instruments;
                this.users = result.data.users;
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
                this.msiList = result.data.instruments;
                this.users = result.data.users;
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
    setUsers(id) {
      if (id) {
        let filtered;
        filtered = this.users.filter(item => item.transaction_id === id);
        if (filtered?.length)
          filtered = filtered.filter(
            item => item.role === "accreditation task force"
          );
        if (filtered?.length) return filtered;
      }
    },
    setOffice() {
      let office = null;
      if (this.checkRole(11)) {
        office = this.offices.find(item => item.role_id === 11);
        return office.office_id;
      } else if (this.checkRole(2)) {
        office = this.offices.find(item => item.role_id === 2);
        return office.office_id;
      }
    },
    checkRole(role) {
      if (this.role && role)
        return !!this.role.find(item => item.role_id === role);
      else if (!this.role?.length) return true;
    },
    setAccreditors(id) {
      if (id) {
        let filtered;
        filtered = this.users.filter(item => item.transaction_id === id);
        if (filtered?.length)
          filtered = filtered.filter(item =>
            item.role.includes("internal accreditor")
          );
        if (filtered?.length) return filtered;
      }
    },
    async setProgramFiles() {
      this.manageProgramFiles = true;

      if (this.taskHead === 0) {
        await this.$store
          .dispatch("showFileTFH", this.program.id)
          .then(result => {
            this.programFiles = result.data;
          })
          .catch(err => {
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      } else {
        let user_id = this.user.id;
        let program_id = this.program.id;
        await this.$store
          .dispatch("showFileTF", { user_id, program_id })
          .then(result => {
            this.programFiles = result.data;
          })
          .catch(err => {
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      }
    },
    uploadProgramFile() {
      if (this.taskHead === 0) {
        this.$isLoading(true);
        let program_id = this.program.id;
        let user_id = this.user.id;
        let filename = this.filename;
        let type = this.type;
        let area_number = null;
        this.$store
          .dispatch("uploadProgramFile", {
            program_id,
            user_id,
            filename,
            type,
            area_number
          })
          .then(result => {
            if (result.data.status === true) {
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
      } else {
        this.$isLoading(true);
        let program_id = this.program.id;
        let user_id = this.user.id;
        let filename = this.filename;
        let type = this.type;
        let area_number = this.instrumentSelect.area_number;
        this.$store
          .dispatch("uploadProgramFile", {
            program_id,
            user_id,
            filename,
            type,
            area_number
          })
          .then(result => {
            if (result.data.status === true) {
              this.$store
                .dispatch("showFileTF", { user_id, program_id })
                .then(result => {
                  this.programFiles = result.data;
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
      }
    },
    removeFile() {
      this.$isLoading(true);
      let document_id = this.documentSelect.id;
      let user_id = this.user.id;
      this.$store
        .dispatch("deleteProgramFile", { document_id, user_id })
        .then(result => {
          if (result.data.status === true) {
            let index = this.programFiles.findIndex(
              data => data.id === this.documentSelect.id
            );
            this.programFiles.splice(index, 1);
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
    updateProgramFile() {
      this.$isLoading(true);
      let program_id = this.program.id;
      let user_id = this.user.id;
      let id = this.documentSelect.id;
      let file = this.filenameEdit;
      this.$store
        .dispatch("updateProgramFile", {
          id,
          file
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showFileTF", { user_id, program_id })
              .then(result => {
                this.programFiles = result.data;
              });
            this.uploadEdit = false;
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
    addFilename() {
      if (this.filename[this.filename.length - 1] !== null)
        this.filename.push(null);
    },
    removeFilename(counter) {
      this.filename[0].splice(counter, 1);
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
    userNameAndOffice(item) {
      return `${this.concatName(item)} - ${item.office ? item.office : ""}`;
    },
    checkMSIList() {
      let selection = this.msiOptionList;
      if (this.msiList?.length) {
        for (let y = 0; y < this.msiList.length; y++) {
          selection = selection.filter(
            data => this.msiList[y].area_name !== data.area_name
          );
        }
      }
      if (selection?.length) return selection;
      else return null;
    },
    instrumentName({ area_name }) {
      return `${area_name}`;
    },
    filterMessageByArea(message, id) {
      if (message?.length) {
        return message.filter(data => data.area_id === id);
      } else {
        return [];
      }
    }
  },
  async created() {
    this.$isLoading(true);
    if (this.taskHead === 0) {
      await this.$store
        .dispatch("showInstrumentProgram", this.program.program_id)
        .then(result => {
          this.msiList = result.data.instruments;
          this.users = result.data.users;
          if (this.msiList?.length) {
            this.instrumentID = this.msiList[0].intended_program_id;
          }
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });

      await this.setUserList();
    } else if (this.taskHead === 1) {
      let user_id = this.user.id;
      let program_id = this.program.id;
      await this.$store
        .dispatch("showTaskInstrument", { user_id, program_id })
        .then(result => {
          this.msiList = result.data.areas;
          this.taskList = result.data.task;
          if (this.msiList?.length) {
            this.instrumentID = this.msiList[0].intended_program_id;
          }
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }

    if (
      this.taskHead === 0 &&
      (this.instrumentID === 42 || this.instrumentID === 47)
    ) {
      await this.$store
        .dispatch("showOptionArea", this.program.id)
        .then(result => {
          this.msiOptionList = result.data;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }

    if (this.taskHead !== 0) {
      await this.$store
        .dispatch("showUnreadMessage", this.program.id)
        .then(result => {
          this.messages = result.data;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }

    await this.$isLoading(false);
  }
};
</script>
