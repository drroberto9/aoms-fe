<template>
  <div>
    <!--Not Available-->
    <b-modal id="app" v-model="notAvailable">
      <template #modal-header>
        <h5>Accreditation not Available</h5>
      </template>
      <a v-if="msiSelect.approved_start_date">
        This accreditation will be available on
        {{ getDate(msiSelect.approved_start_date) }}.
      </a>
      <a v-else>This accreditation is currently unavailable.</a>
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0;"
            @click="notAvailable = false"
            >Close</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ this.application.title }}</h4>
          <h5>{{ this.application.institution_name }}</h5>
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
            @click="
              msiSelect = row.item;
              select(row.item);
            "
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
        class="my-auto"
      ></b-pagination>
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

const searchByProgram = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.program_name).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "AccreditationTask",
  data() {
    return {
      sortBy: "intended_program",
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
      msiList: [],
      msiSelect: {},
      search: null,
      notAvailable: false,
      snackbarText: ""
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
    getDate(date) {
      return moment(date).format("MMM Do YYYY");
    },
    // select(item) {
    //   let date = moment(new Date()).startOf("day");
    //   // date = date.setHours(0, 0, 0, 0)
    //   if (
    //     moment(new Date()).isBetween(
    //       item.approved_start_date,
    //       item.approved_end_date
    //     ) ||
    //     date.isSame(item.approved_start_date) ||
    //     date.isSame(item.approved_end_date)
    //   ) {
    //     if (item != null) {
    //       this.$store.commit("saveProgram", item);
    //       this.$store.commit("saveCoordinator", 1);
    //       this.$store.commit("saveAccreditor", 0);
    //       this.$router.push("/AccreditationAreaOC");
    //     }
    //   } else this.notAvailable = true;
    // },
    select(item) {
      if (item != null) {
        this.$store.commit("saveProgram", item);
        this.$store.commit("saveCoordinator", 1);
        this.$store.commit("saveAccreditor", 0);
        this.$router.push("/AccreditationAreaOC");
      }
    },
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showAppliedProgram", this.application.application_id)
        .then(result => {
          this.msiList = searchByProgram(result.data.programs, this.search);
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
      .dispatch("showAppliedProgram", this.application.application_id)
      .then(result => {
        this.msiList = result.data.programs;
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
