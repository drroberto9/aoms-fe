<template>
  <div>
    <!--Summary of Ratings-->
    <b-modal id="app" v-model="SAR" size="xl" hide-footer>
      <template #modal-header>
        <h5>Accreditor Summary of Ratings</h5>
        <md-button
          style="width: 150px; margin: 0;"
          class="md-primary md-raised"
          @click="generateAreaSAR()"
          >Download PDF</md-button
        >
      </template>

      <b-table
        :items="parameters"
        :fields="fields_report"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        class="md-elevation-2"
        bordered
        sort-icon-left
        style="margin-bottom: 10px"
        responsive="sm"
      >
        <template #cell(individual_rating)="row">
          <div v-for="(item, index) in getMean(row.item.id)" :key="index">
            {{ item.last_name }}: {{ roundNum(item.parameter_mean) }}
          </div>
        </template>
        <template #cell(calculated_rating)="row">
          {{ roundNum(getParameterMean(row.item.id).average_mean) }}
          <span v-if="getParameterMean(row.item.id).status === 'unaccepted'"
            >({{ getParameterMean(row.item.id).status }})</span
          >
        </template>
        <template #cell(descriptive_rating)="row">
          {{ getDescription(getParameterMean(row.item.id)) }}
        </template>
      </b-table>

      <div class="md-layout">
        <div class="md-layout-item"></div>
        <div
          class="md-layout-item"
          style="max-width: fit-content; margin-right: 21px; font-weight: bold"
        >
          Total:
        </div>
        <div class="md-layout-item" style="max-width: 310px">
          {{ roundNum(area_mean[0].total) }}
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item"></div>
        <div
          class="md-layout-item"
          style="max-width: fit-content; margin-right: 21px; font-weight: bold"
        >
          Mean:
        </div>
        <div class="md-layout-item" style="max-width: 160px">
          {{ roundNum(area_mean[0].area_mean) }}
        </div>
        <div class="md-layout-item" style="max-width: 150px">
          {{ getDescription(area_mean[0].area_mean) }}
        </div>
      </div>

      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="SAR = false"
            >Close</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Summary of Ratings-->
    <b-modal id="app" v-model="internalSAR" size="xl" hide-footer>
      <template #modal-header>
        <h5>Accreditor Summary of Ratings</h5>
        <md-button
          style="width: 150px; margin: 0;"
          class="md-primary md-raised"
          @click="generateAreaSARInternal()"
          >Download PDF</md-button
        >
      </template>

      <b-table
        :items="parameters"
        :fields="fields_report"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        class="md-elevation-2"
        bordered
        sort-icon-left
        style="margin-bottom: 10px"
        responsive="sm"
      >
        <template #cell(individual_rating)="row">
          <div
            v-for="(item, index) in getInternalMean(row.item.id)"
            :key="index"
          >
            {{ item.last_name }}:
            {{ roundNum(item.parameter_mean) }}
          </div>
        </template>
        <template #cell(calculated_rating)="row">
          {{ roundNum(getInternalParameterMean(row.item.id).average_mean) }}
        </template>
        <template #cell(descriptive_rating)="row">
          {{
            getDescription(getInternalParameterMean(row.item.id).average_mean)
          }}
        </template>
      </b-table>

      <div class="md-layout">
        <div class="md-layout-item"></div>
        <div
          class="md-layout-item"
          style="max-width: fit-content; margin-right: 21px; font-weight: bold"
        >
          Total:
        </div>
        <div class="md-layout-item" style="max-width: 310px">
          {{ roundNum(internal_area_mean[0].total) }}
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item"></div>
        <div
          class="md-layout-item"
          style="max-width: fit-content; margin-right: 21px; font-weight: bold"
        >
          Mean:
        </div>
        <div class="md-layout-item" style="max-width: 160px">
          {{ roundNum(internal_area_mean[0].area_mean) }}
        </div>
        <div class="md-layout-item" style="max-width: 150px">
          {{ getDescription(internal_area_mean[0].area_mean) }}
        </div>
      </div>

      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="internalSAR = false"
            >Close</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Summary of Findings and Recommendations-->
    <b-modal id="app" v-model="SFR" size="xl" hide-footer>
      <template #modal-header>
        <h5>Summary of Findings and Recommendations</h5>
      </template>

      <h6 style="font-weight: bold">Strengths:</h6>
      <div v-for="(item, index) in filterStrength()" :key="index">
        {{ item.remark }}
      </div>

      <h6 style="font-weight: bold; margin-top: 10px">Best Practices:</h6>
      <div
        v-for="(item, index) in filterBestPractice(best_practice)"
        :key="index"
      >
        {{ item.best_practice }}
      </div>

      <h6 style="font-weight: bold; margin-top: 10px">
        Areas Needing Improvement:
      </h6>
      <div v-for="(item, index) in filterWeakness()" :key="index">
        {{ item.remark }}
      </div>

      <h6 style="font-weight: bold; margin-top: 10px">Recommendations:</h6>
      <div v-for="(item, index) in recommendationList" :key="index">
        {{ item.recommendation }}
      </div>
      <div
        style="margin-top: 10px"
        v-for="(item, counter) in recommendation"
        :key="counter"
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <b-form-input
              v-model="recommendation[counter]"
              size="sm"
              placeholder="Enter recommendation"
              style="margin-bottom: 5px"
            ></b-form-input>
          </div>
          <div class="md-layout-item" style="max-width: max-content">
            <md-button
              v-b-tooltip.hover
              title="Delete"
              class="md-icon-button md-dense md-accent"
              @click="removeRecommendation(counter)"
              ><md-icon>delete</md-icon></md-button
            >
          </div>
        </div>
      </div>
      <div>
        <md-button
          style="margin: 5px 0 0;"
          class="md-primary md-dense md-raised"
          @click="addRecommendation()"
          >Add Recommendation</md-button
        >
      </div>

      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          style="margin: 0 5px 0 0"
          @click="SFR = false"
          >Cancel</md-button
        >
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="
            saveRecommendation();
            SFR = false;
          "
          >Submit</md-button
        >
      </md-card-actions>
    </b-modal>

    <!--Summary of Findings and Recommendations-->
    <b-modal id="app" v-model="internalSFR" size="xl" hide-footer>
      <template #modal-header>
        <h5>Summary of Findings and Recommendations</h5>
      </template>

      <h6 style="font-weight: bold">Strengths:</h6>
      <div v-for="(item, index) in filterStrength()" :key="index">
        {{ item.remark }}
      </div>

      <h6 style="font-weight: bold; margin-top: 10px">Best Practices:</h6>
      <div
        v-for="(item, index) in filterBestPractice(best_practice_internal)"
        :key="index"
      >
        {{ item.best_practice }}
      </div>

      <h6 style="font-weight: bold; margin-top: 10px">
        Areas Needing Improvement:
      </h6>
      <div v-for="(item, index) in filterWeakness()" :key="index">
        {{ item.remark }}
      </div>

      <h6 style="font-weight: bold; margin-top: 10px">Recommendations:</h6>
      <div v-for="(item, index) in recommendationList" :key="index">
        {{ item.recommendation }}
      </div>
      <div
        style="margin-top: 10px"
        v-for="(item, counter) in recommendation"
        :key="counter"
      >
        <div class="md-layout">
          <div class="md-layout-item">
            <b-form-input
              v-model="recommendation[counter]"
              size="sm"
              placeholder="Enter recommendation"
              style="margin-bottom: 5px"
            ></b-form-input>
          </div>
          <div class="md-layout-item" style="max-width: max-content">
            <md-button
              v-b-tooltip.hover
              title="Delete"
              class="md-icon-button md-dense md-accent"
              @click="removeRecommendation(counter)"
              ><md-icon>delete</md-icon></md-button
            >
          </div>
        </div>
      </div>
      <div>
        <md-button
          style="margin: 5px 0 0;"
          class="md-primary md-dense md-raised"
          @click="addRecommendation()"
          >Add Recommendation</md-button
        >
      </div>

      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="internalSFR = false"
            >Cancel</md-button
          >
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              saveRecommendation();
              internalSFR = false;
            "
            >Submit</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <h4>Program: {{ program.program_name }}</h4>
      <h5>Campus: {{ program.campus_name }}</h5>
      <h5>{{ instrument.area_name }}</h5>

      <!-- <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>Program: {{ program.program_name }}</h4>
          <h5>Campus: {{ program.campus_name }}</h5>
          <h5>{{ instrument.area_name }}</h5>
        </div>
        <div class="md-layout-item" style="min-width: max-content">
          <div v-if="this.role.includes('external')" class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: 160px">
              <md-button
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="SAR = true"
                >Generate SAR</md-button
              >
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  recommendation = [null];
                  SFR = true;
                "
                >Generate SFR</md-button
              >
            </div>
          </div>
          <div v-else class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: 160px">
              <md-button
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="internalSAR = true"
                >Generate SAR</md-button
              >
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  recommendation = [null];
                  internalSFR = true;
                "
                >Generate SFR</md-button
              >
            </div>
          </div>
        </div>
      </div> -->
      <br />

      <b-table
        :items="parameters"
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
          <md-badge
            v-if="filterMessageByParameter(messages, row.item.id).length > 0"
            class="md-square"
            md-content="New"
            md-dense
          >
            <md-button
              v-b-tooltip.hover
              title="Select"
              class="md-icon-button md-dense md-primary"
              @click="select(row.item)"
              ><md-icon>forward</md-icon></md-button
            >
          </md-badge>
          <md-button
            v-else
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

// const toLower = text => {
//   return text.toString().toLowerCase();
// };

// const filterMeanByUser = (items, term) => {
//   if (term) {
//     return items.filter(item =>
//       toLower(item.assigned_user_id).includes(toLower(term))
//     );
//   }
//   return items;
// };

const findParameterMean = (items, term) => {
  if (term) {
    return items.find(item => item.program_parameter_id === term);
  }
  return items;
};

const findMean = (items, term) => {
  if (term) {
    return items.filter(item => item.program_parameter_id === term);
  }
  return items;
};

export default {
  name: "AccreditationParameter",
  data() {
    return {
      sortBy: "parameter",
      sortDesc: false,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "parameter", label: "Parameter", sortable: true },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      fields_report: [
        { key: "parameter", label: "Parameter" },
        {
          key: "individual_rating",
          label: "Accreditor Rating"
        },
        {
          key: "calculated_rating",
          label: "Rating",
          thStyle: { width: "160px" }
        },
        {
          key: "descriptive_rating",
          label: "Descriptive Rating",
          thStyle: { width: "160px" }
        }
      ],
      parameters: [],
      accreditor_mean: [],
      parameter_mean: [],
      area_mean: [],
      internal_mean: [],
      internal_parameter_mean: [],
      internal_area_mean: [],
      remarkList: [],
      best_practice: [],
      best_practice_internal: [],
      recommendationList: [],
      recommendation: [null],
      search: null,
      role: null,
      messages: [],
      SAR: false,
      internalSAR: false,
      SFR: false,
      internalSFR: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      program: "program",
      instrument: "instrument",
      assigned_user_id: "assigned_user_id",
      coordinator: "coordinator"
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
    generateAreaSAR() {
      let instrument_id = this.instrument.id;
      let program_id = this.program.id;
      this.$isLoading(true);
      this.$store
        .dispatch("generateAreaSAR", { instrument_id, program_id })
        .then(result => {
          if (result.data.status === false) {
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          } else {
            let fileURL = window.URL.createObjectURL(new Blob([result.data]));
            let fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute(
              "download",
              `${this.program.program_name} ${this.instrument.area_name} SAR.pdf`
            );
            document.body.appendChild(fileLink);

            fileLink.click();
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    generateAreaSARInternal() {
      let instrument_id = this.instrument.id;
      let program_id = this.program.id;
      this.$isLoading(true);
      this.$store
        .dispatch("generateAreaSARInternal", { instrument_id, program_id })
        .then(result => {
          if (result.data.status === false) {
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          } else {
            let fileURL = window.URL.createObjectURL(new Blob([result.data]));
            let fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute(
              "download",
              `${this.program.program_name} ${this.instrument.area_name} SAR.pdf`
            );
            document.body.appendChild(fileLink);

            fileLink.click();
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    saveRecommendation() {
      this.$isLoading(true);
      if (this.recommendation[0] === null) {
        this.SFR = false;
        this.internalSFR = false;
      } else {
        let user_id = this.assigned_user_id;
        let recommendations = this.recommendation;
        this.$store
          .dispatch("saveRecommendation", { user_id, recommendations })
          .then(result => {
            if (result.data.status === true) {
              this.recommendation = [null];
              this.$store
                .dispatch("showRecommendation", this.assigned_user_id)
                .then(result => {
                  this.recommendationList = result.data;
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
      }
    },
    select(item) {
      if (item != null) {
        this.$store.commit("saveParameter", item);
        if (this.coordinator === 1) this.$router.push("/RateStatementOC");
        else this.$router.push("/RateStatement");
      }
    },
    getDescription(rating) {
      if (rating) {
        if (rating < 1.5) return "Poor";
        else if (rating >= 1.5 && rating < 2.5) return "Fair";
        else if (rating >= 2.5 && rating < 3.5) return "Satisfactory";
        else if (rating >= 3.5 && rating < 4.5) return "Very Satisfactory";
        else if (rating >= 4.5) return "Excellent";
        else return null;
      }
    },
    filterStrength() {
      if (this.remarkList?.length) {
        return this.remarkList.filter(item => item.remark_type === "Strength");
      }
    },
    filterWeakness() {
      if (this.remarkList?.length) {
        return this.remarkList.filter(item => item.remark_type === "Weakness");
      }
    },
    filterBestPractice(best_practice) {
      if (best_practice?.length) {
        return best_practice.filter(
          item => item.assigned_user_id === this.assigned_user_id
        );
      }
    },
    addRecommendation() {
      this.recommendation.push(null);
    },
    removeRecommendation(counter) {
      this.recommendation.splice(counter, 1);
    },
    getMean(id) {
      return findMean(this.accreditor_mean, id);
    },
    getParameterMean(id) {
      return findParameterMean(this.parameter_mean, id);
    },
    getInternalMean(id) {
      return findMean(this.internal_mean, id);
    },
    getInternalParameterMean(id) {
      return findParameterMean(this.internal_parameter_mean, id);
    },
    formatDate(item) {
      return moment(item).format("llll");
    },
    roundNum(num) {
      if (num !== null) return (Math.round(num * 100) / 100).toFixed(2);
    },
    filterMessageByParameter(message, id) {
      if (message?.length) {
        if (this.role.includes("internal")) {
          return message.filter(
            data => data.parameter_id === id && data.type === "Internal"
          );
        } else {
          return message.filter(
            data => data.parameter_id === id && data.type === "External"
          );
        }
      } else {
        return [];
      }
    },
    back() {
      this.$router.push("/AccreditationArea");
    }
  },
  async created() {
    let user_id = this.user.id;
    let instrument_id = this.instrument.id;
    let program_id = this.program.id;
    this.$isLoading(true);
    await this.$store
      .dispatch("showTaskParameter", { instrument_id, program_id })
      .then(result => {
        this.parameters = result.data.parameters;
        this.accreditor_mean = result.data.means;
        this.parameter_mean = result.data.result;
        this.area_mean = result.data.area_mean;
        this.internal_mean = result.data.means_internal;
        this.internal_parameter_mean = result.data.result_internal;
        this.internal_area_mean = result.data.area_mean_internal;
        this.best_practice = result.data.best_practice;
        this.best_practice_internal = result.data.best_practice_internal;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showTaskInstrument", { user_id, program_id })
      .then(result => {
        this.role = result.data.role;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showRecommendation", this.assigned_user_id)
      .then(result => {
        this.recommendationList = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    let transaction_id = this.instrument.id;
    this.$store
      .dispatch("showStatementDocument", { user_id, transaction_id })
      .then(result => {
        this.remarkList = result.data.remarks;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showUnreadMessage", this.program.id)
      .then(result => {
        this.messages = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
