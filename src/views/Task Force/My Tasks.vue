<template>
  <div>
    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ campus.institution_name }}</h4>
          <h5>{{ campus.campus_name }}</h5>
          <h5>Accreditation Task Force</h5>
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
        { key: "level", label: "Level", sortable: true },
        { key: "schedule", label: "Schedule", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      msiList: [{}],
      search: null,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus",
      user: "user"
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
    select(item) {
      if (item != null) {
        this.$store.commit("saveProgram", item);
        this.$store.commit("saveTaskHead", 1);
        this.$router.push("/TaskForceArea");
      }
    },
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showTask", this.user.id)
        .then(result => {
          this.msiList = searchByProgram(
            result.data.program_task_force,
            this.search
          );
          this.totalRows = this.msiList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500)
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showTask", this.user.id)
      .then(result => {
        this.msiList = result.data.program_task_force;
        this.totalRows = this.msiList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
