<template>
  <div>
    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>AACCUP</h4>
          <h5>Application Management</h5>
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
                @input="searchApplication"
                type="text"
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="applications"
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
        <template #cell(updated_at)="row">
          {{ formatDate(row.value) }}
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="View Application"
            class="md-icon-button md-dense md-primary"
            @click="select(row.item)"
            style="outline: 0"
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

export default {
  name: "ManageApplication",
  data() {
    return {
      sortBy: "id",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "title", label: "Title", sortable: true },
        { key: "institution_name", label: "SUC", sortable: true },
        { key: "updated_at", label: "Application Date", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      applications: [{}],
      files: [{}],
      roles: [{}],
      search: null,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
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
    searchApplication: _.debounce(function() {
      this.$store
        .dispatch("showAllApplication")
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
    formatDate(item) {
      return moment(item).format("ll");
    },
    select(item) {
      this.$store.commit("saveApplication", item);
      this.$router.push("/ViewPrograms");
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showAllApplication")
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
