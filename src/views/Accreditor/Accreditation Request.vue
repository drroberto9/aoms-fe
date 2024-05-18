<template>
  <div>
    <!--Accept Modal-->
    <b-modal id="app" v-model="accept" hide-footer>
      <template #modal-header>
        <h5>Accept Request</h5>
      </template>
      You are about to accept this accreditation request.
      <br />
      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0;"
            @click="accept = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            v-if="requestType === 0"
            class="md-primary md-raised"
            style="margin: 0;"
            @click="
              acceptRequest();
              accept = false;
            "
            >Accept</md-button
          >
          <md-button
            v-else
            class="md-primary md-raised"
            style="margin: 0;"
            @click="
              coordinatorApproveRequest();
              accept = false;
            "
            >Accept</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Decline Modal-->
    <b-modal id="app" v-model="reject" hide-footer>
      <template #modal-header>
        <h5>Decline Request</h5>
      </template>
      You are about to decline this accreditation request.
      <br />
      <form v-if="requestType === 0" @submit.prevent="rejectRequest()">
        <b-form-group
          style="margin-top: 10px"
          id="reject-group-1"
          label="Enter Reason:"
          label-for="reject-1"
        >
          <b-form-textarea
            id="reject-1"
            v-model="remark"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0;"
              @click="reject = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Decline</md-button
            >
          </div>
        </md-card-actions>
      </form>
      <md-card-actions v-if="requestType === 1">
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0;"
            @click="reject = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              coordinatorRejectRequest();
              reject = false;
            "
            >Decline</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Program List-->
    <b-modal id="app" v-model="programsModal" size="lg" hide-footer>
      <template #modal-header>
        <h5>Program List</h5>
      </template>

      <b-table
        :items="programList"
        :fields="fields_program"
        :sort-by.sync="sortBy_program"
        :sort-desc.sync="sortDesc_program"
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
      </b-table>

      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="programsModal = false"
          >Close</md-button
        >
      </md-card-actions>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout">
        <div class="md-layout-item">
          <h4>AACCUP Accreditation Request</h4>
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
                placeholder="Search Program"
                v-model="search"
                @input="searchOnTable"
                type="text"
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>

      <md-tabs :md-active-tab="tabSelect" md-elevation="1" class="md-primary">
        <!-- Program Accreditor -->
        <md-tab
          id="accreditor-request-0"
          md-label="Program Accreditor"
          style="padding: 0"
        >
          <b-table
            :items="accreditorRequests"
            :fields="fields_accreditor"
            :current-page="currentPage_accreditor"
            :per-page="perPage"
            :sort-by.sync="sortBy_accreditor"
            :sort-desc.sync="sortDesc_accreditor"
            class="md-elevation-2"
            outlined
            sort-icon-left
            style="margin-bottom: 0"
            responsive="sm"
          >
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
            <template #cell(actions)="row">
              <md-button
                v-b-tooltip.hover
                title="Accept Request"
                class="md-icon-button md-dense md-primary"
                @click="
                  requestType = 0;
                  msiSelect = row.item;
                  accept = true;
                "
                ><md-icon>check_circle</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Decline Request"
                class="md-icon-button md-dense md-accent"
                @click="
                  requestType = 0;
                  msiSelect = row.item;
                  remark = '';
                  reject = true;
                "
                ><md-icon>cancel</md-icon></md-button
              >
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage_accreditor"
            :total-rows="totalRows_accreditor"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-auto"
          ></b-pagination>
        </md-tab>

        <!-- Overall Coordinator -->
        <md-tab
          id="accreditor-request-1"
          md-label="Overall Coordinator"
          style="padding: 0"
        >
          <b-table
            :items="coordinatorRequests"
            :fields="fields_coordinator"
            :current-page="currentPage_coordinator"
            :per-page="perPage"
            :sort-by.sync="sortBy_coordinator"
            :sort-desc.sync="sortDesc_coordinator"
            class="md-elevation-2"
            outlined
            sort-icon-left
            style="margin-bottom: 0"
            responsive="sm"
          >
            <template #cell(actions)="row">
              <md-button
                v-b-tooltip.hover
                title="Program List"
                class="md-icon-button md-dense md-primary"
                @click="
                  showPrograms(row.item.application_id);
                  programsModal = true;
                "
                ><md-icon>dns</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Accept Request"
                class="md-icon-button md-dense md-primary"
                @click="
                  requestType = 1;
                  msiSelect = row.item;
                  accept = true;
                "
                ><md-icon>check_circle</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Decline Request"
                class="md-icon-button md-dense md-accent"
                @click="
                  requestType = 1;
                  msiSelect = row.item;
                  reject = true;
                "
                ><md-icon>cancel</md-icon></md-button
              >
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage_coordinator"
            :total-rows="totalRows_coordinator"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-auto"
          ></b-pagination>
        </md-tab>
      </md-tabs>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByProgram = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.program_name).includes(toLower(term))
    );
  }
  return items;
};

const filterByStatus = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.status) === toLower(term));
  }
  return items;
};

export default {
  name: "AccreditationRequests",
  data() {
    return {
      sortBy_accreditor: "intended_program",
      sortDesc_accreditor: false,
      totalRows_accreditor: 1,
      currentPage_accreditor: 1,
      fields_accreditor: [
        { key: "id", label: "ID", sortable: true },
        { key: "institution_name", label: "SUC", sortable: true },
        { key: "program_name", label: "Program", sortable: true },
        { key: "schedule", label: "Schedule", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "130px" } }
      ],
      sortBy_coordinator: "intended_program",
      sortDesc_coordinator: false,
      totalRows_coordinator: 1,
      currentPage_coordinator: 1,
      fields_coordinator: [
        { key: "id", label: "ID", sortable: true },
        { key: "institution_name", label: "SUC", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "180px" } }
      ],
      perPage: 10,
      sortBy_program: "program_name",
      sortDesc_program: false,
      fields_program: [
        { key: "program_name", label: "Program", sortable: true },
        { key: "level", label: "Applied Level", sortable: true },
        {
          key: "schedule",
          label: "Schedule",
          sortable: true
        }
      ],
      accreditorRequests: [],
      coordinatorRequests: [],
      programList: [],
      msiSelect: null,
      remark: "",
      requestType: 0,
      accept: false,
      reject: false,
      programsModal: false,
      search: null,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
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
    showPrograms(application_id) {
      this.$store
        .dispatch("showAppliedProgram", application_id)
        .then(result => {
          this.programList = result.data.programs;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    acceptRequest() {
      this.$isLoading(true);
      this.$store
        .dispatch("acceptRequest", this.msiSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("viewRequest", this.user.id).then(result => {
              this.accreditorRequests = filterByStatus(
                result.data.requests,
                "pending"
              );
              this.totalRows_accreditor = this.accreditorRequests.length;
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
    rejectRequest() {
      let request_id = this.msiSelect.id;
      let remark = this.remark;
      this.$isLoading(true);
      this.$store
        .dispatch("rejectRequest", { request_id, remark })
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("viewRequest", this.user.id).then(result => {
              this.accreditorRequests = filterByStatus(
                result.data.requests,
                "pending"
              );
              this.totalRows_accreditor = this.accreditorRequests.length;
            });
            this.remark = "";
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.reject = false;
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
    coordinatorApproveRequest() {
      this.$isLoading(true);
      this.$store
        .dispatch("coordinatorApproveRequest", this.msiSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("viewCoordinatorRequest").then(result => {
              this.coordinatorRequests = filterByStatus(result.data, "pending");
              this.totalRows_accreditor = this.coordinatorRequests.length;
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
    coordinatorRejectRequest() {
      this.$isLoading(true);
      this.$store
        .dispatch("coordinatorRejectRequest", this.msiSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store.dispatch("viewCoordinatorRequest").then(result => {
              this.coordinatorRequests = filterByStatus(result.data, "pending");
              this.totalRows_accreditor = this.coordinatorRequests.length;
            });
            this.remark = "";
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.reject = false;
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
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("viewRequest", this.user.id)
        .then(result => {
          let accreditorRequests = filterByStatus(
            result.data.requests,
            "pending"
          );
          this.accreditorRequests = searchByProgram(
            accreditorRequests,
            this.search
          );
          this.totalRows_accreditor = this.accreditorRequests.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500)
  },
  async created() {
    this.$isLoading(true);
    if (
      this.tabSelect !== "accreditor-request-0" &&
      this.tabSelect !== "accreditor-request-1"
    )
      this.$store.commit("saveTabSelect", "accreditor-request-0");
    await this.$store
      .dispatch("viewRequest", this.user.id)
      .then(result => {
        this.accreditorRequests = filterByStatus(
          result.data.requests,
          "pending"
        );
        this.totalRows_accreditor = this.accreditorRequests.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$store
      .dispatch("viewCoordinatorRequest")
      .then(result => {
        this.coordinatorRequests = filterByStatus(result.data, "pending");
        this.totalRows_accreditor = this.coordinatorRequests.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
