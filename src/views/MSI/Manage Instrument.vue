<template>
  <div>
    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ program.intended_program }}</h4>
          <h5 v-if="campus">Campus: {{ campus.campus_name }}</h5>
        </div>
      </div>

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

export default {
  name: "ManageInstrument",
  data() {
    return {
      sortBy: "area_number",
      sortDesc: false,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Area", sortable: true },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      msiList: [{}],
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus",
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
    formatDate(item) {
      return moment(item).format("llll");
    },
    select(item) {
      if (item != null) {
        this.$store.commit("saveInstrument", item);
        this.$router.push("/ManageParameters");
      }
    },
    back() {
      this.$router.push("/ManageInstrumentProgram");
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showInstrument", this.program.id)
      .then(result => {
        this.msiList = result.data.instrument;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
