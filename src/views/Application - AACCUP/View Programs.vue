<template>
  <div>
    <!--Remove Modal-->
    <b-modal id="app" v-model="removeApplication" hide-footer>
      <template #modal-header>
        <h5>Decline Program</h5>
      </template>
      Are you sure you want to decline this program?
      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="removeApplication = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeRequest();
              removeApplication = false;
            "
            >Decline</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Accept Modal-->
    <b-modal id="app" v-model="acceptApplication" hide-footer>
      <template #modal-header>
        <h5>Approve Application</h5>
      </template>
      You are about to accept this accreditation request.
      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="acceptApplication = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              acceptRequest();
              acceptApplication = false;
            "
            >Accept</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Reschedule Modal-->
    <b-modal id="app" v-model="rescheduleApplication" size="lg" hide-footer>
      <template #modal-header>
        <h5>Reschedule</h5>
      </template>
      <form @submit.prevent="reschedule()">
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
                  v-model="start_date"
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
                  v-model="end_date"
                  :min="start_date"
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

    <!--Request Overall Coordinator-->
    <b-modal id="app" v-model="requestOverallCoordinator" size="lg" hide-footer>
      <template #modal-header>
        <h5>Request Overall Coordinator</h5>
      </template>
      <form @submit.prevent="requestCoordinator">
        <b-form-group
          id="requestOverallCoordinator-group-1"
          label="Accreditor:"
          label-for="requestOverallCoordinator-1"
        >
          <multiselect
            v-model="userSelect"
            :options="userList"
            :custom-label="userName"
            :placeholder="null"
            required
          ></multiselect>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="requestOverallCoordinator = false"
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

    <!--Remove Coordinator-->
    <b-modal id="app" v-model="removeCoordinatorPrompt">
      <template #modal-header>
        <h5>Remove User</h5>
      </template>
      Are you sure you want to remove this user?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="removeCoordinatorPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeCoordinatorRequest();
              removeCoordinatorPrompt = false;
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
          <h4>{{ application.institution_name }}</h4>
          <h5>{{ application.title }}</h5>
        </div>
      </div>

      <h5>Application Documents:</h5>

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
      </b-table>

      <!-- <md-card style="padding: 10px 15px; margin: 0 0 20px;">
        <div v-for="(item, index) in filterFiles(this.application.id)" :key="index">
          <b-button
            class="text-left"
            variant="link"
            size="sm"
            @click="
              file = item;
              downloadLetter(item);
            "
            >{{ item.file_title }}</b-button
          >
        </div>
      </md-card> -->

      <div class="md-layout" style="margin-top: 15px">
        <div class="md-layout-item">
          <h5 style="margin-top: 15px">Overall Coordinator:</h5>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            v-if="overallCoordinator.length === 0"
            style="margin: 0; width: 200px;"
            class="md-primary md-raised"
            @click="
              setUserList();
              requestOverallCoordinator = true;
            "
            >Request Coordinator</md-button
          >
        </div>
      </div>

      <b-table
        :items="overallCoordinator"
        :fields="fields_coordinator"
        class="md-elevation-2"
        outlined
        small
        sort-icon-left
        responsive="sm"
      >
        <template #cell(accreditor)="row">
          {{ concatName(row.item) }}
        </template>

        <template #cell(actions)>
          <md-button
            v-b-tooltip.hover
            title="Remove"
            class="md-icon-button md-dense md-accent"
            @click="removeCoordinatorPrompt = true"
            ><md-icon>delete</md-icon></md-button
          >
        </template>
      </b-table>

      <!-- <div class="md-layout">
        <div class="md-layout-item">
          <b-form-input
            style="margin-bottom: 15px; background: white;"
            class="md-elevation-2"
            v-model="overallCoordinator"
            disabled
          />
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            v-b-tooltip.hover
            title="Remove"
            class="md-icon-button md-dense md-accent"
            @click="
              removeCoordinatorPrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
          >
        </div>
      </div> -->

      <h5>Programs:</h5>

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
        <template #cell(schedule)="row">
          <div v-if="!row.item.approved_start_date">
            {{ row.item.preferred_start_date }} -
            {{ row.item.preferred_end_date }} (Preferred)
          </div>
          <div v-else-if="row.item.approved_start_date">
            {{ row.item.approved_start_date }} -
            {{ row.item.approved_end_date }} (Approved)
          </div>
          <div v-else></div>
        </template>

        <template #cell(status)="row">
          <div v-if="row.item.status === 'approved'">
            <span style="color: forestgreen">{{ row.item.status }}</span>
          </div>
          <div v-else-if="row.item.status === 'rejected'">
            <span style="color: red">{{ row.item.status }}</span>
          </div>
          <div v-else>
            <span>{{ row.item.status }}</span>
          </div>
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
            v-if="
              row.item.status !== 'approved' &&
                row.item.status !== 'done' &&
                row.item.status !== 'schedule unavailable'
            "
            v-b-tooltip.hover
            title="Reschedule"
            class="md-icon-button md-dense md-primary"
            @click="
              programSelected = row.item;
              start_date = null;
              end_date = null;
              rescheduleApplication = true;
            "
            ><md-icon>date_range</md-icon></md-button
          >
          <md-button
            v-if="row.item.status !== 'approved' && row.item.status !== 'done'"
            v-b-tooltip.hover
            title="Approve Application"
            class="md-icon-button md-dense md-primary"
            @click="
              programSelected = row.item;
              acceptApplication = true;
            "
            ><md-icon>check_circle</md-icon></md-button
          >
          <md-button
            v-if="row.item.status !== 'approved' && row.item.status !== 'done'"
            v-b-tooltip.hover
            title="Decline Application"
            class="md-icon-button md-dense md-accent"
            @click="
              programSelected = row.item;
              removeApplication = true;
            "
            ><md-icon>cancel</md-icon></md-button
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
import moment from "moment";

const toLower = text => {
  return text.toString().toLowerCase();
};

const filterByStatus = (items, term) => {
  if (items?.length) {
    return items.filter(item => toLower(item.status) === toLower(term));
  }
  return items;
};

const searchByApplicationID = (items, term) => {
  if (items?.length) {
    return items.filter(item => item.application_id === term);
  }
  return items;
};

export default {
  name: "ManageApplication",
  data() {
    return {
      sortBy_programSelected: "program_name",
      sortDesc_programSelected: false,
      totalRows_programSelected: 1,
      currentPage_programSelected: 1,
      perPage_programSelected: 10,
      fields_programSelected: [
        { key: "id", label: "ID", sortable: true },
        { key: "program_name", label: "Program", sortable: true },
        { key: "level", label: "Applied Level", sortable: true },
        {
          key: "schedule",
          label: "Schedule",
          sortable: true
        },
        { key: "status", label: "Application Status", sortable: true },
        { key: "actions", label: "Actions" }
      ],
      sortBy_files: "id",
      sortDesc_files: false,
      fields_files: [
        { key: "id", label: "ID", sortable: true },
        { key: "file_title", label: "Document", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      fields_coordinator: [
        { key: "id", label: "ID", thStyle: { width: "50px" } },
        { key: "accreditor", label: "Accreditor" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      files: [{}],
      file: {},
      programSelectedList: [{}],
      programSelected: {},
      userList: [],
      search: null,
      start_date: null,
      end_date: null,
      userSelect: null,
      overallCoordinator: [],
      replyApplication: false,
      viewApplication: false,
      viewMSI: false,
      viewParameter: false,
      programSelect: false,
      snackbarText: "",
      acceptApplication: false,
      rescheduleApplication: false,
      removeApplication: false,
      requestOverallCoordinator: false,
      removeCoordinatorPrompt: false
    };
  },
  computed: {
    ...mapState({
      user: "user",
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
    acceptRequest() {
      let program_id = this.programSelected.id;
      let approved_start_date = this.programSelected.preferred_start_date;
      let approved_end_date = this.programSelected.preferred_end_date;
      this.$isLoading(true);
      this.$store
        .dispatch("approve", {
          program_id,
          approved_start_date,
          approved_end_date
        })
        .then(result => {
          if (result.data.status === true) {
            let index = this.programSelectedList.findIndex(
              data => data.id === program_id
            );
            this.programSelectedList[index].status = "approved";
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
    removeRequest() {
      this.$isLoading(true);
      this.$store
        .dispatch("reject", this.programSelected.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.programSelectedList.findIndex(
              data => data.id === this.programSelected.id
            );
            this.programSelectedList[index].status = "rejected";
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
    reschedule() {
      let program_id = this.programSelected.id;
      let user_id = this.user.id;
      let message = `The preferred schedule, ${moment(
        this.programSelected.preferred_start_date
      ).format("MMM Do")} to ${moment(
        this.programSelected.preferred_end_date
      ).format("MMM Do YYYY")}, for the applied program ${
        this.programSelected.program_name
      } is not available. The suggested available date for accreditation is on ${moment(
        this.start_date
      ).format("MMM Do")} to ${moment(this.end_date).format("MMM Do YYYY")}.`;
      let preferred_start_date = this.start_date;
      let preferred_end_date = this.end_date;
      this.$isLoading(true);
      this.$store
        .dispatch("reschedule", {
          program_id,
          user_id,
          message,
          preferred_start_date,
          preferred_end_date
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showAppliedProgram", this.application.id)
              .then(result => {
                this.programSelectedList = result.data.programs;
                this.totalRows_programSelected = this.programSelectedList.length;
              });
            this.rescheduleApplication = false;
            this.viewApplication = true;
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
    requestCoordinator() {
      let application_id = this.application.id;
      let user_id = this.userSelect.user_id;
      this.$isLoading(true);
      this.$store
        .dispatch("requestCoordinator", {
          application_id,
          user_id
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCoordinatorRequest", this.application.id)
              .then(result => {
                this.overallCoordinator = result.data;
              });
            this.requestOverallCoordinator = false;
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
    removeCoordinatorRequest() {
      this.$isLoading(true);
      this.$store
        .dispatch("removeCoordinatorRequest", this.overallCoordinator[0].id)
        .then(result => {
          if (result.data.status === true) {
            this.overallCoordinator = [];
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
    filterFiles(id) {
      return searchByApplicationID(this.files, id);
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
    userName(item) {
      return `${this.concatName(item)}`;
    },
    select(item) {
      this.$store.commit("saveProgram", item);
      this.$router.push("/AssignAcceptableGapArea");
    },
    back() {
      this.$router.push("/ManageApplication");
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showAppliedProgram", this.application.id)
      .then(result => {
        this.programSelectedList = result.data.programs;
        this.totalRows_programSelected = this.programSelectedList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showAllApplication")
      .then(result => {
        this.files = result.data.files;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showCoordinatorRequest", this.application.id)
      .then(result => {
        this.overallCoordinator = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$isLoading(false);
  }
};
</script>
