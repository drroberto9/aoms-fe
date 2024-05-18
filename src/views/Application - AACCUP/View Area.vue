<template>
  <div>
    <!--Request Accreditor-->
    <b-modal id="app" v-model="newRequest" size="lg" hide-footer>
      <template #modal-header>
        <h5>Request Accreditor</h5>
      </template>

      <div v-if="librarianError" style="color: red; margin-bottom: 15px">
        {{ librarianErrorText }}
      </div>
      <form @submit.prevent="requestAccreditor()">
        <div v-for="(item, index) in taskRequests" :key="index">
          <h6 v-if="index === 0" style="margin-bottom: 10px">
            Lead Accreditor:
          </h6>
          <h6 v-if="index === 1" style="margin-bottom: 10px">Accreditors:</h6>
          <div class="md-layout md-gutter">
            <div class="md-layout-item" style="max-width: 470px">
              <b-form-group>
                <b-form-select v-model="taskRequests[index].user_id" required>
                  <option
                    v-for="(item, index) in userList"
                    :key="index"
                    :value="item.user_id"
                  >
                    {{ concatName(item) }} ({{ item.role }})
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <b-form-group>
                <div class="md-layout">
                  <div class="md-layout-item" style="margin-right: 15px">
                    <b-form-radio v-model="taskRequests[index].type" :value="1"
                      >Accreditor</b-form-radio
                    >
                  </div>
                  <div class="md-layout-item">
                    <b-form-radio v-model="taskRequests[index].type" :value="0"
                      >Librarian</b-form-radio
                    >
                  </div>
                </div>
              </b-form-group>
            </div>
            <div
              v-if="index >= 3"
              class="md-layout-item"
              style="max-width: max-content"
            >
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-accent md-dense"
                style="outline: 0"
                @click="removeRequests(index)"
                ><md-icon>delete</md-icon></md-button
              >
            </div>
          </div>
        </div>
        <div>
          <md-button
            style="margin: 5px 0 0;"
            class="md-primary md-dense md-raised"
            @click="addRequests()"
            >Add Accreditor</md-button
          >
        </div>

        <md-card-actions>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="newRequest = false"
            >Cancel</md-button
          >
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            type="submit"
            >Submit</md-button
          >
        </md-card-actions>
      </form>
    </b-modal>

    <!--Request More Accreditor-->
    <b-modal id="app" v-model="moreRequest" size="lg" hide-footer>
      <template #modal-header>
        <h5>Request Accreditor</h5>
      </template>

      <form @submit.prevent="requestMoreAccreditor()">
        <h6 style="margin-bottom: 10px">Accreditors:</h6>
        <div v-for="(item, index) in taskRequests" :key="index">
          <div class="md-layout md-gutter">
            <div class="md-layout-item" style="max-width: 470px">
              <b-form-group>
                <b-form-select v-model="taskRequests[index].user_id" required>
                  <option
                    v-for="(item, index) in userList"
                    :key="index"
                    :value="item.user_id"
                  >
                    {{ concatName(item) }} ({{ item.role }})
                  </option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <b-form-group>
                <div class="md-layout">
                  <div class="md-layout-item" style="margin-right: 15px">
                    <b-form-radio v-model="taskRequests[index].type" :value="1"
                      >Accreditor</b-form-radio
                    >
                  </div>
                  <div class="md-layout-item">
                    <b-form-radio v-model="taskRequests[index].type" :value="0"
                      >Librarian</b-form-radio
                    >
                  </div>
                </div>
              </b-form-group>
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-accent md-dense"
                style="outline: 0"
                @click="removeRequests(index)"
                ><md-icon>delete</md-icon></md-button
              >
            </div>
          </div>
        </div>
        <div>
          <md-button
            style="margin: 5px 0 0;"
            class="md-primary md-dense md-raised"
            @click="addRequests()"
            >Add Accreditor</md-button
          >
        </div>

        <md-card-actions>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="moreRequest = false"
            >Cancel</md-button
          >
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            type="submit"
            >Submit</md-button
          >
        </md-card-actions>
      </form>
    </b-modal>

    <!--Upload-->
    <b-modal id="app" v-model="upload" size="lg" hide-footer>
      <template #modal-header>
        <h5>Upload {{ type }}</h5>
      </template>
      <form @submit.prevent="uploadProgramFile()">
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
          <md-button
            v-else
            class="md-primary md-raised"
            style="margin: 0"
            type="submit"
            >Submit</md-button
          >
        </md-card-actions>
      </form>
    </b-modal>

    <!--Set Leader Prompt-->
    <b-modal id="app" v-model="setLeadPrompt" hide-footer>
      <template #modal-header>
        <h5>Set Lead Accreditor</h5>
      </template>
      Do you want to set {{ concatName(requestSelect) }} as the lead accreditor?
      <br />
      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="setLeadPrompt = false"
            >No</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              setAccreditorLead();
              setLeadPrompt = false;
            "
            >Yes</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Delete Request-->
    <b-modal id="app" v-model="deleteRequestPrompt" hide-footer>
      <template #modal-header>
        <h5>Delete Request</h5>
      </template>
      Are you sure you want to remove this request?
      <br />
      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteRequestPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeUser();
              deleteRequestPrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Approve Accreditation-->
    <b-modal id="app" v-model="approve" size="lg" hide-footer>
      <template #modal-header>
        <h5>Approve Program for Accreditation</h5>
      </template>
      You are about to approve this program for accreditation. Please attach the
      Certificate of Accreditation and the end of validity date of the program
      accredited.

      <br /><br />

      <form @submit.prevent="approveApplication()">
        <b-form-group
          id="approve-group-1"
          label="*Certificate of Accreditation:"
          label-for="approve-1"
        >
          <b-form-file
            id="approve-1"
            v-model="certificate"
            size="sm"
            style="margin-bottom: 5px"
            required
          ></b-form-file>
        </b-form-group>

        <b-form-group
          id="approve-group-2"
          label="*End of Validity:"
          label-for="approve-2"
        >
          <b-form-datepicker
            id="approve-2"
            size="sm"
            v-model="validity"
            :min="new Date()"
            required
          ></b-form-datepicker>
        </b-form-group>
        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="approve = false"
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

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ program.program_name }}</h4>
          <h5>{{ program.campus_name }}</h5>
        </div>
        <div class="md-layout" style="min-width: max-content">
          <div class="md-layout-item"></div>
          <div
            v-if="checkRole(10)"
            class="md-layout-item"
            style="max-width: max-content; margin-right: 5px;"
          >
            <md-button
              style="margin: 0; width: 300px;"
              class="md-primary md-raised"
              @click="
                certificate = [null];
                validity = null;
                approve = true;
              "
              >Approve Accreditation</md-button
            >
          </div>
        </div>
      </div>

      <div class="md-layout" style="margin-bottom: 10px">
        <div class="md-layout-item"></div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            style="margin: 0; width: 200px;"
            class="md-primary md-raised"
            @click="
              filename = [];
              selectedFilename = [];
              type = 'Consolidated Report';
              upload = true;
            "
            >Upload Consolidated Report</md-button
          >
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item">
          <h5 style="margin-top: 15px">Accreditation Documents:</h5>
        </div>
        <div class="md-layout-item" style="max-width: 150px;">
          <b-form-select v-model="filterType" class="mb-3">
            <b-form-select-option :value="0">Show All</b-form-select-option>
            <b-form-select-option :value="1">PPP</b-form-select-option>
            <b-form-select-option :value="2"
              >Compliance Report</b-form-select-option
            >
            <b-form-select-option :value="3"
              >Narrative Report</b-form-select-option
            >
            <b-form-select-option :value="4">SAR</b-form-select-option>
            <b-form-select-option :value="5">SFR</b-form-select-option>
            <b-form-select-option :value="6"
              >Rated Instrument</b-form-select-option
            >
            <b-form-select-option :value="7"
              >Consolidated Report</b-form-select-option
            >
            <b-form-select-option :value="8"
              >Final SFR Report</b-form-select-option
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

        <!-- <template #cell(actions)="row">
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
        </template> -->
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="filterByType() ? filterByType().length : 0"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-auto md-elevation-2"
      ></b-pagination>

      <br />

      <!-- <b-table
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
      </b-table>

      <template #cell(type)="row">
        {{ getArea(row.item) }}
      </template> -->

      <div class="md-layout" style="margin-bottom: 10px">
        <div class="md-layout-item">
          <h5 style="padding-top: 10px">Accreditors:</h5>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            v-if="checkRequest()"
            style="margin: 0; width: 200px;"
            class="md-primary md-raised"
            @click="
              librarianError = false;
              setUserList();
              taskRequests = [
                {
                  user_id: null,
                  type: 1
                }
              ];
              moreRequest = true;
            "
            >Request Accreditors</md-button
          >
          <md-button
            v-else
            style="margin: 0; width: 200px;"
            class="md-primary md-raised"
            @click="
              librarianError = false;
              setUserList();
              setTaskRequest();
              newRequest = true;
            "
            >Request Accreditors</md-button
          >
        </div>
      </div>

      <b-table
        :items="requestedAccreditors"
        :fields="fields_accreditor"
        :sort-by.sync="sortBy_accreditor"
        :sort-desc.sync="sortDesc_accreditor"
        class="md-elevation-2"
        outlined
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(name)="row">
          {{ concatName(row.item) }}
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Set Lead Accreditor"
            class="md-icon-button md-primary md-dense"
            style="outline: 0"
            @click="
              requestSelect = row.item;
              setLeadPrompt = true;
            "
            ><md-icon>supervised_user_circle</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-accent md-dense"
            style="outline: 0"
            @click="
              requestSelect = row.item;
              deleteRequestPrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
          >
        </template>
      </b-table>

      <!--      <md-card-->
      <!--        v-if="filterFiles(this.application.id).length"-->
      <!--        style="padding: 10px 15px; margin: 0 0 20px;"-->
      <!--      >-->
      <!--        <div v-for="(item, index) in filterFiles(this.application.id)" :key="index">-->
      <!--          <b-button-->
      <!--            class="text-left"-->
      <!--            variant="link"-->
      <!--            size="sm"-->
      <!--            @click="-->
      <!--              file = item;-->
      <!--              downloadLetter(item);-->
      <!--            "-->
      <!--            >{{ item.file_title }}</b-button-->
      <!--          >-->
      <!--        </div>-->
      <!--      </md-card>-->

      <h5 style="margin-bottom: 15px; margin-top: 25px">
        Areas Allowable Gap:
      </h5>

      <b-table
        :items="msiList"
        :fields="fields"
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

const filterByStatus = (items, term) => {
  if (items?.length) {
    return items.filter(item => toLower(item.status) === toLower(term));
  }
  return items;
};

const searchByID = (items, term) => {
  if (term) {
    return items.filter(item => item.application_id === term);
  }
  return items;
};

const filterRequest = (items, term) => {
  if (term) {
    return items.filter(item => item.application_program_id === term);
  }
  return items;
};

const checkLibrarian = items => {
  if (items) {
    return items.find(item => item.type === 0);
  }
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
  name: "ManageApplication",
  data() {
    return {
      sortBy: "intended_program",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Area", sortable: true },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      msiList: [{}],
      sortBy_accreditor: "id",
      sortDesc_accreditor: false,
      fields_accreditor: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Accreditor", sortable: true },
        { key: "role", label: "Role", sortable: true },
        { key: "status", label: "Request Status", sortable: true },
        { key: "remark", label: "Remark", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "130px" } }
      ],
      sortBy_files: "type",
      fields_files: [
        { key: "id", label: "ID", sortable: true },
        { key: "file_title", label: "Document", sortable: true },
        { key: "type", label: "Type", sortable: true }
      ],
      files: [{}],
      file: {},
      accreditorList: [],
      requestedAccreditors: [],
      roles: [{}],
      taskRequests: [
        {
          user_id: null,
          type: 1
        },
        {
          user_id: null,
          type: 1
        },
        {
          user_id: null,
          type: 0
        }
      ],
      requestList: [{}],
      requestSelect: {},
      userList: [{}],
      programFiles: [],
      search_files: null,
      filterType: 0,
      search: null,
      type: null,
      validity: null,
      filename: [],
      selectedFilename: [],
      certificate: [],
      upload: false,
      approve: false,
      newRequest: false,
      moreRequest: false,
      setLeadPrompt: false,
      deleteRequestPrompt: false,
      librarianErrorText: "",
      librarianError: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      role: "role",
      application: "application",
      program: "program"
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
    searchFileTable: _.debounce(function() {
      this.$store
        .dispatch("showProgramFile", this.program.id)
        .then(result => {
          let programFiles = result.data.filter(
            item =>
              item.type !== "Internal SAR" ||
              item.type !== "Internal SFR" ||
              item.type !== "Internal Rated Instrument" ||
              item.type.includes("Area")
          );
          this.programFiles = searchByFile(programFiles, this.search_files);
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
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
      else if (this.filterType === 4)
        return this.programFiles.filter(items => items.type.includes("SAR"));
      else if (this.filterType === 5)
        return this.programFiles.filter(items => items.type.includes("SFR"));
      else if (this.filterType === 6)
        return this.programFiles.filter(items =>
          items.type.includes("Rated Instrument")
        );
      else if (this.filterType === 7)
        return this.programFiles.filter(items =>
          items.type.includes("Consolidated Report")
        );
      else if (this.filterType === 8)
        return this.programFiles.filter(items =>
          items.type.includes("Final SFR Report")
        );
    },
    approveApplication() {
      this.$isLoading(true);
      let program_id = this.program.id;
      let filename = this.certificate;
      let validity = this.validity;
      this.$store
        .dispatch("approveApplication", { program_id, filename, validity })
        .then(result => {
          if (result.data.status === true) {
            this.approve = false;
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
    uploadProgramFile() {
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
            this.$store
              .dispatch("showProgramFile", this.program.id)
              .then(result => {
                this.programFiles = result.data.filter(
                  item =>
                    item.type !== "Internal SAR" ||
                    item.type !== "Internal SFR" ||
                    item.type !== "Internal Rated Instrument" ||
                    item.type.includes("Area")
                );
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
    addFilename() {
      if (this.filename[this.filename.length - 1] !== null)
        this.filename.push(null);
    },
    removeFilename(counter) {
      this.filename.splice(counter, 1);
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
    checkRequest() {
      if (this.requestedAccreditors?.length) return true;
    },
    setTaskRequest() {
      this.taskRequests = [];
      let user_id = null;
      let type = 1;
      for (let x = 0; x < 3; x++) {
        if (x === 2) type = 0;
        this.taskRequests.push({ user_id, type });
      }
    },
    setUserList() {
      this.$isLoading(true);
      this.$store
        .dispatch("showAccreditor")
        .then(result => {
          this.$isLoading(false);
          this.userList = filterByStatus(result.data.users, "active");
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    requestAccreditor() {
      this.$isLoading(true);
      let user_id = this.user.id;
      let program_id = this.program.id;
      let taskRequests = this.taskRequests;
      if (checkLibrarian(this.taskRequests)) {
        this.librarianError = false;
        this.$store
          .dispatch("request", { user_id, program_id, taskRequests })
          .then(result => {
            if (result.data.status === true) {
              this.$store
                .dispatch("showAppliedProgram", this.application.id)
                .then(result => {
                  this.requestedAccreditors = filterRequest(
                    result.data.users,
                    this.program.id
                  );
                })
                .catch(err => {
                  this.snackbarText =
                    err + ". Please contact the administrator";
                  this.makeToast("Error", "danger");
                });
              this.$isLoading(false);
              this.snackbarText = result.data.message;
              this.makeToast("Success!", "primary");
              this.newRequest = false;
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
        this.$isLoading(false);
        this.librarianErrorText = "Please select an accreditor for library.";
        this.librarianError = true;
      }
    },
    requestMoreAccreditor() {
      this.$isLoading(true);
      let user_id = this.user.id;
      let program_id = this.program.id;
      let taskRequests = this.taskRequests;
      this.$store
        .dispatch("addRequest", { user_id, program_id, taskRequests })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showAppliedProgram", this.application.id)
              .then(result => {
                this.requestedAccreditors = filterRequest(
                  result.data.users,
                  this.program.id
                );
              })
              .catch(err => {
                this.snackbarText = err + ". Please contact the administrator";
                this.makeToast("Error", "danger");
              });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.newRequest = false;
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
    setAccreditorLead() {
      this.$isLoading(true);
      this.$store
        .dispatch("setAccreditorLead", this.requestSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showAppliedProgram", this.application.id)
              .then(result => {
                this.requestedAccreditors = filterRequest(
                  result.data.users,
                  this.program.id
                );
              })
              .catch(err => {
                this.snackbarText = err + ". Please contact the administrator";
                this.makeToast("Error", "danger");
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
    removeUser() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteAccreditorRequest", this.requestSelect.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.requestedAccreditors.findIndex(
              data => data.id === this.requestSelect.id
            );
            this.requestedAccreditors.splice(index, 1);
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
    downloadPPP(item) {
      this.$isLoading(true);
      this.$store
        .dispatch("viewPPP", item.id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = window.URL.createObjectURL(new Blob([result.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "PPP.pdf");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    downloadCompliance(item) {
      this.$isLoading(true);
      this.$store
        .dispatch("viewCompliance", item.id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = window.URL.createObjectURL(new Blob([result.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "Compliance Report.pdf");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    downloadNarrative(item) {
      this.$isLoading(true);
      this.$store
        .dispatch("viewNarrative", item.id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = window.URL.createObjectURL(new Blob([result.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "Narrative Report.pdf");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    filterFiles(id) {
      return searchByID(this.files, id);
    },
    checkRole(role) {
      if (this.role && role)
        return !!this.role.find(item => item.role_id === role);
      else if (!this.role?.length) return true;
    },
    formatDate(item) {
      return moment(item).format("llll");
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
    addRequests() {
      let user_id = null;
      let type = 1;
      this.taskRequests.push({ user_id, type });
    },
    removeRequests(counter) {
      this.taskRequests.splice(counter, 1);
    },
    getType(item) {
      let type = item.type.replace("Internal", "Self Survey");
      if (item.area) {
        return type.concat(" - ", item.area);
      } else return type;
    },
    selectDocument() {
      if (!this.filename) this.filename = this.selectedFilename;
      else this.filename.push(...this.selectedFilename);
      this.selectedFilename = [];
    },
    select(item) {
      this.$store.commit("saveInstrument", item);
      this.$router.push("/AssignAcceptableGapParameter");
    },
    back() {
      this.$router.push("/ViewPrograms");
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showInstrumentProgram", this.program.program_id)
      .then(result => {
        this.msiList = result.data.instruments;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showAppliedProgram", this.application.id)
      .then(result => {
        this.requestedAccreditors = filterRequest(
          result.data.users,
          this.program.id
        );
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showProgramFile", this.program.id)
      .then(result => {
        this.programFiles = result.data.filter(
          item =>
            item.type !== "Internal SAR" ||
            item.type !== "Internal SFR" ||
            item.type !== "Internal Rated Instrument" ||
            item.type.includes("Area")
        );
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
