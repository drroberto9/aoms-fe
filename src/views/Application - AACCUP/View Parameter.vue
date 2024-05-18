<template>
  <div>
    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ program.program_name }}</h4>
          <h5>{{ program.campus_name }}</h5>
          <h5>{{ instrument.area_name }}</h5>
        </div>
        <div class="md-layout-item" style="min-width: max-content">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="min-width: max-content; margin-right: 5px;"
            >
              <b-form-checkbox
                v-model="generalize"
                :value="true"
                :unchecked-value="false"
                @input="setScoreGap()"
              >
                Generalize Allowable Score Gap:
              </b-form-checkbox>
            </div>
            <div class="md-layout-item" style="max-width: 75px">
              <b-form-input
                v-if="generalize"
                v-model="acceptable_score_gap"
                type="number"
                @input="setScoreGap()"
              ></b-form-input>
              <b-form-input
                v-else
                v-model="acceptable_score_gap"
                type="number"
                disabled
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="parameters"
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
        <template #cell(numerical_rating)="row">
          {{ getParameterMean(row.item.id) }}
        </template>
        <template #cell(descriptive_rating)="row">
          {{ getDescription(getParameterMean(row.item.id)) }}
        </template>
        <template #cell(acceptable_score_gap)="row">
          <b-form-input
            v-if="generalize"
            style="max-width: 70px"
            v-model="row.item.acceptable_score_gap"
            type="number"
            disabled
          ></b-form-input>
          <b-form-input
            v-else
            style="max-width: 70px"
            v-model="row.item.acceptable_score_gap"
            type="number"
          ></b-form-input>
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

      <div class="md-layout" style="margin-top: 10px">
        <div class="md-layout-item"></div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            style="margin: 0; width: 250px;"
            class="md-primary md-raised"
            @click="submitScoreGap()"
            >Submit Score Gap</md-button
          >
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

const toLower = text => {
  return text.toString().toLowerCase();
};

const filterMeanByUser = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.assigned_user_id).includes(toLower(term))
    );
  }
  return items;
};

const findMeanByParameter = (items, term) => {
  if (term) {
    return items.find(item => item.program_parameter_id === term);
  }
  return items;
};

export default {
  name: "AccreditationParameter",
  data() {
    return {
      sortBy: "parameter",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "parameter", label: "Parameter", sortable: true },
        {
          key: "numerical_rating",
          label: "Numerical Rating",
          thStyle: { width: "200px" }
        },
        {
          key: "descriptive_rating",
          label: "Descriptive Rating",
          thStyle: { width: "200px" }
        },
        {
          key: "acceptable_score_gap",
          label: "Score Gap",
          thStyle: { width: "120px" }
        }
      ],
      parameters: [{}],
      remarkList: [{}],
      recommendation: [
        {
          recommendation: null
        }
      ],
      acceptable_score_gap: null,
      parameter_mean: [],
      generalize: true,
      SAR: false,
      SFR: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      program: "program",
      instrument: "instrument",
      category_mean: "category_mean",
      assigned_user_id: "assigned_user_id"
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
    submitScoreGap() {
      if (this.parameters?.length) {
        let gaps = [];
        let id = null;
        let gap = null;
        for (let x = 0; x < this.parameters.length; x++) {
          id = this.parameters[x].id;
          gap = parseFloat(this.parameters[x].acceptable_score_gap);
          gaps.push({ id, gap });
        }
        this.$isLoading(true);
        this.$store
          .dispatch("editAcceptableScoreGap", { gaps })
          .then(result => {
            if (result.data.status === true) {
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
    setScoreGap() {
      if (this.generalize && this.parameters?.length) {
        for (let x = 0; x < this.parameters.length; x++) {
          this.parameters[x].acceptable_score_gap = this.acceptable_score_gap;
        }
      }
    },
    getDescription(rating) {
      if (rating) {
        if (parseFloat(rating) < 1.5) return "Poor";
        else if (parseFloat(rating) >= 1.5 && parseFloat(rating) < 2.5)
          return "Fair";
        else if (parseFloat(rating) >= 2.5 && parseFloat(rating) < 3.5)
          return "Satisfactory";
        else if (parseFloat(rating) >= 3.5 && parseFloat(rating) < 4.5)
          return "Very Satisfactory";
        else if (parseFloat(rating) >= 4.5 && parseFloat(rating) < 5)
          return "Excellent";
        else return null;
      }
    },
    getParameterMean(id) {
      let parameter_mean = findMeanByParameter(this.parameter_mean, id);
      if (parameter_mean) return parameter_mean.parameter_mean;
    },
    back() {
      this.$router.push("/AssignAcceptableGapArea");
    }
  },
  async created() {
    let instrument_id = this.instrument.id;
    let program_id = this.program.id;
    this.$isLoading(true);
    await this.$store
      .dispatch("showTaskParameter", { instrument_id, program_id })
      .then(result => {
        this.parameters = result.data.parameters;
        this.parameter_mean = filterMeanByUser(
          result.data.means,
          this.assigned_user_id
        );
        this.totalRows = this.parameters.length;
        if (this.parameters[0].acceptable_score_gap) {
          this.generalize = false;
          this.acceptable_score_gap = this.parameters[0].acceptable_score_gap;
        }
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
