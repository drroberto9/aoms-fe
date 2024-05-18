<template>
  <div>
    <!--Main-->
    <div class="md-layout" style="margin-bottom: 15px">
      <div class="md-layout-item">
        <h4>Overall Coordinator</h4>
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
              placeholder="Search Title"
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
    return items.filter(item => toLower(item.title).includes(toLower(term)));
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
        { key: "title", label: "Title", sortable: true },
        { key: "institution_name", label: "SUC", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      msiList: [],
      msiSelect: {},
      search: null,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      role: "role"
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
    select(item) {
      if (item != null) {
        this.$store.commit("saveApplication", item);
        this.$store.commit("saveCoordinator", 1);
        this.$router.push("/AccreditationProgramOC");
      }
    },
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showMyAccreditationApplication", this.user.id)
        .then(result => {
          this.msiList = searchByProgram(result.data, this.search);
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
      .dispatch("showMyAccreditationApplication", this.user.id)
      .then(result => {
        this.msiList = result.data;
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
