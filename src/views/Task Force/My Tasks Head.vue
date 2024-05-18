<template>
  <div>
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
            :options="filterTaskForceHead()"
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
          <!--              v-for="(item, index) in filterTaskForceHead()"-->
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
          <h5>{{ campus.campus_name }}</h5>
          <h5 v-if="checkRole(11)">College Task Force Head</h5>
          <h5 v-else-if="checkRole(2)">Program Task Force Chair</h5>
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
                placeholder="Search by title"
                v-model="search"
                @input="searchOnTable"
                type="text"
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>

      <b-table
        v-if="checkRole(11)"
        :items="msiList"
        :fields="fields_college"
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
          {{ concatName(row.item) }}
          <md-button
            v-b-tooltip.hover
            title="Assign Task Force Head"
            v-if="!findUser(row.item)"
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
            v-else
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
            title="Select"
            class="md-icon-button md-dense md-primary"
            @click="select(row.item)"
            ><md-icon>forward</md-icon></md-button
          >
        </template>
      </b-table>

      <b-table
        v-else-if="checkRole(2)"
        :items="msiList"
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
            title="Select"
            class="md-icon-button md-dense md-primary"
            @click="select(row.item)"
            ><md-icon>forward</md-icon></md-button
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

const searchByProgram = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.program_name).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "manageMSI",
  data() {
    return {
      sortBy: "program_name",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "program_name", label: "Program", sortable: true },
        { key: "campus_name", label: "Campus", sortable: true },
        { key: "level", label: "Applied Level", sortable: true },
        {
          key: "schedule",
          label: "Schedule",
          sortable: true
        },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "130" } }
      ],
      fields_college: [
        { key: "id", label: "ID", sortable: true },
        { key: "program_name", label: "Program", sortable: true },
        { key: "campus_name", label: "Campus", sortable: true },
        { key: "level", label: "Applied Level", sortable: true },
        {
          key: "schedule",
          label: "Schedule",
          sortable: true
        },
        { key: "task_force_head", label: "Program Chair", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "130" } }
      ],
      msiList: [{}],
      programSelected: {},
      userList: [],
      userHeadList: [],
      userSelect: null,
      roles: [],
      assignTaskForceHead: false,
      deleteUserPrompt: false,
      search: null,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      campus: "campus",
      role: "role",
      offices: "offices"
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
    checkRole(role) {
      if (this.role && role)
        return !!this.role.find(item => item.role_id === role);
      else if (!this.role?.length) return true;
    },
    assignHeadTask() {
      this.$isLoading(true);
      let program_id = this.programSelected.id;
      let user_id = this.userSelect.user_id;
      let role = "program task force chair";
      this.$store
        .dispatch("assignHeadTask", {
          program_id,
          user_id,
          role
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCollegeCoordinator", this.user.id)
              .then(result => {
                this.msiList = result.data.tasks;
                this.totalRows = this.msiList.length;
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
    removeUser() {
      this.$isLoading(true);
      let transaction_id = this.programSelected.id;
      let user_id = this.programSelected.user_id;
      this.$store
        .dispatch("deleteAssignedHeadUser", { transaction_id, user_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showCollegeCoordinator", this.user.id)
              .then(result => {
                this.msiList = result.data.tasks;
                this.totalRows = this.msiList.length;
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
    filterTaskForceHead() {
      return this.userList.filter(item => item.role_id === 2);
    },
    findUser(item) {
      if (item.first_name) return true;
    },
    select(item) {
      if (item != null) {
        this.$store.commit("saveProgram", item);
        this.$store.commit("saveTaskHead", 0);
        this.$router.push("/TaskForceArea");
      }
    },
    concatName(item) {
      if (item) {
        if (item.first_name && item.last_name)
          return item.first_name.concat(" ", item.last_name);
        else if (item.last_name) return item.last_name;
        else if (item.first_name) return item.first_name;
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
    searchOnTable: _.debounce(function() {
      if (this.checkRole(11)) {
        this.$store
          .dispatch("showCollegeCoordinator", this.user.id)
          .then(result => {
            this.msiList = searchByProgram(result.data.tasks, this.search);
            this.totalRows = this.msiList.length;
          })
          .catch(err => {
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      } else if (this.checkRole(2)) {
        this.$store
          .dispatch("showProgramHead", this.user.id)
          .then(result => {
            this.msiList = searchByProgram(
              result.data.program_task_force_head,
              this.search
            );
            this.totalRows = this.msiList.length;
          })
          .catch(err => {
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      }
    }, 500),
    userNameAndOffice(item) {
      return `${this.concatName(item)} - ${item.office ? item.office : ""}`;
    }
  },
  async created() {
    this.$isLoading(true);
    if (this.checkRole(11)) {
      await this.$store
        .dispatch("showCollegeCoordinator", this.user.id)
        .then(result => {
          this.msiList = result.data.tasks;
          this.totalRows = this.msiList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    } else if (this.checkRole(2)) {
      await this.$store
        .dispatch("showProgramHead", this.user.id)
        .then(result => {
          this.msiList = result.data.program_task_force_head;
          this.totalRows = this.msiList.length;
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
