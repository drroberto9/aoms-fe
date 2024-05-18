<template>
  <div>
    <div style="margin-bottom: 15px">
      <b>Instructions:</b>
      Select and edit which statements that is best applied.
    </div>
    <md-tabs md-elevation="1" class="md-primary">
      <md-tab md-label="Select Remarks">
        <div class="md-layout">
          <div class="md-layout-item"></div>
          <div class="md-layout-item" style="max-width: max-content">
            <b-form-checkbox
              v-model="selectAll"
              :indeterminate="indeterminate"
              :value="true"
              :unchecked-value="false"
              @change="setRemarks(filterCollection(areaSelected.id))"
            >
              Select All
            </b-form-checkbox>
          </div>
        </div>

        <b-form-checkbox-group v-model="remarkSelected">
          <div
            v-for="(item, index) in filterCollection(areaSelected.id)"
            :key="index"
          >
            <h6 style="font-size: 18px !important;">{{ item.user_name }}:</h6>
            <!--best_practices-->
            <b-table
              :items="item.best_practices"
              :fields="fields_SFR"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              bordered
              small
              sort-icon-left
              responsive="sm"
            >
              <template #cell(index)="row">
                <div
                  style="display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;"
                >
                  {{ row.index + 1 }}.
                </div>
              </template>
              <template #cell(remark)="row">
                {{ row.item }}
              </template>
              <template #head(remark)>
                Best Practices
              </template>
              <template #cell(actions)="row">
                <div
                  style="padding-left: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;"
                >
                  <b-form-checkbox :value="inputChange(row.item, 'Strength')" />
                </div>
              </template>
            </b-table>

            <!--Strength Remarks-->
            <b-table
              :items="item.strength_remarks"
              :fields="fields_SFR"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              bordered
              small
              sort-icon-left
              responsive="sm"
            >
              <template #cell(index)="row">
                <div
                  style="display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;"
                >
                  {{ row.index + 1 }}.
                </div>
              </template>
              <template #cell(remark)="row">
                {{ row.item }}
              </template>
              <template #head(remark)>
                Strength Remarks
              </template>
              <template #cell(actions)="row">
                <div
                  style="padding-left: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;"
                >
                  <b-form-checkbox :value="inputChange(row.item, 'Strength')" />
                </div>
              </template>
            </b-table>

            <!--Weakness Remarks-->
            <b-table
              :items="item.weakness_remarks"
              :fields="fields_SFR"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              bordered
              small
              sort-icon-left
              responsive="sm"
            >
              <template #cell(index)="row">
                <div
                  style="display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;"
                >
                  {{ row.index + 1 }}.
                </div>
              </template>
              <template #cell(remark)="row">
                {{ row.item }}
              </template>
              <template #head(remark)>
                Areas Needing Improvement
              </template>
              <template #cell(actions)="row">
                <div
                  style="padding-left: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;"
                >
                  <b-form-checkbox :value="inputChange(row.item, 'Weakness')" />
                </div>
              </template>
            </b-table>

            <!--Recommendations-->
            <b-table
              :items="item.recommendations"
              :fields="fields_SFR"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              bordered
              small
              sort-icon-left
              responsive="sm"
            >
              <template #cell(index)="row">
                <div
                  style="display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;"
                >
                  {{ row.index + 1 }}.
                </div>
              </template>
              <template #cell(remark)="row">
                {{ row.item }}
              </template>
              <template #head(remark)>
                Recommendations
              </template>
              <template #cell(actions)="row">
                <div
                  style="padding-left: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;"
                >
                  <b-form-checkbox
                    :value="inputChange(row.item, 'Recommendation')"
                  />
                </div>
              </template>
            </b-table>
            <br />
          </div>
        </b-form-checkbox-group>
      </md-tab>

      <!--Edit Remarks-->
      <md-tab md-label="Edit Remarks">
        <h6>Strengths</h6>
        <div v-for="(items, index) in selectedStrength" :key="index">
          <div class="md-layout" style="margin-bottom: 15px">
            <div class="md-layout-item" style="max-width: 30px">
              {{ index + 1 }}.
            </div>
            <div class="md-layout-item">
              <b-form-textarea
                v-model="items.remark"
                rows="2"
                max-rows="6"
              ></b-form-textarea>
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-dense md-accent"
                @click="removeRemark('Strength', index)"
                ><md-icon>delete</md-icon></md-button
              >
            </div>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item"></div>
          <div class="md-layout-item" style="max-width: max-content">
            <md-button
              style="margin: 0; width: 300px;"
              class="md-primary md-raised"
              @click="addRemark('Strength')"
              >Add Strength</md-button
            >
          </div>
        </div>

        <h6>Areas Needing Improvement</h6>
        <div v-for="(items, index) in selectedWeakness" :key="index">
          <div class="md-layout" style="margin-bottom: 15px">
            <div class="md-layout-item" style="max-width: 30px">
              {{ index + 1 }}.
            </div>
            <div class="md-layout-item">
              <b-form-textarea
                v-model="items.remark"
                rows="2"
                max-rows="6"
              ></b-form-textarea>
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-dense md-accent"
                @click="removeRemark('Weakness', index)"
                ><md-icon>delete</md-icon></md-button
              >
            </div>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item"></div>
          <div class="md-layout-item" style="max-width: max-content">
            <md-button
              style="margin: 0; width: 300px;"
              class="md-primary md-raised"
              @click="addRemark('Weakness')"
              >Add Areas Needing Improvement</md-button
            >
          </div>
        </div>

        <h6>Recommendations</h6>
        <div v-for="(items, index) in selectedRecommendation" :key="index">
          <div class="md-layout" style="margin-bottom: 15px">
            <div class="md-layout-item" style="max-width: 30px">
              {{ index + 1 }}.
            </div>
            <div class="md-layout-item">
              <b-form-textarea
                v-model="items.remark"
                rows="2"
                max-rows="6"
              ></b-form-textarea>
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-dense md-accent"
                @click="removeRemark('Recommendation', index)"
                ><md-icon>delete</md-icon></md-button
              >
            </div>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item"></div>
          <div class="md-layout-item" style="max-width: max-content">
            <md-button
              style="margin: 0; width: 300px;"
              class="md-primary md-raised"
              @click="addRemark('Recommendation')"
              >Add Recommendation</md-button
            >
          </div>
        </div>
      </md-tab>
    </md-tabs>

    <md-button
      style="width: 100%; margin: 0"
      class="md-primary md-raised"
      @click="saveRemarks()"
      >Save Area Remarks</md-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Generate SFR.vue",
  props: {
    areaSelected: Object,
    collection: Array,
    role: String
  },
  data() {
    return {
      remarkSelected: [],
      selectedStrength: [],
      selectedWeakness: [],
      selectedRecommendation: [],
      sortBy: "id",
      sortDesc: false,
      selectAll: false,
      indeterminate: false,
      remarkCount: 0,
      fields_SFR: [
        {
          key: "index",
          label: "",
          thStyle: { width: "40px" }
        },
        {
          key: "remark"
        },
        {
          key: "actions",
          label: "",
          thStyle: { width: "50px" }
        }
      ]
    };
  },
  computed: {
    ...mapState({
      program: "program"
    })
    // selectedStrength: {
    //   get: function() {
    //     return this.remarkSelected.filter(item => item.type === "Strength");
    //   }
    // },
    // selectedWeakness: {
    //   get: function() {
    //     return this.remarkSelected.filter(item => item.type === "Weakness");
    //   }
    // },
    // selectedRecommendation: {
    //   get: function() {
    //     return this.remarkSelected.filter(item => item.type === "Recommendation");
    //   }
    // }
  },
  watch: {
    remarkSelected() {
      if (this.checkSelected() === 0) {
        this.indeterminate = false;
        this.selectAll = false;
      } else if (this.remarkCount === this.checkSelected()) {
        this.indeterminate = false;
        this.selectAll = true;
      } else {
        this.indeterminate = true;
        this.selectAll = false;
      }
      this.selectedStrength = this.remarkSelected.filter(
        item => item.type === "Strength"
      );
      this.selectedWeakness = this.remarkSelected.filter(
        item => item.type === "Weakness"
      );
      this.selectedRecommendation = this.remarkSelected.filter(
        item => item.type === "Recommendation"
      );
    }
  },
  methods: {
    saveRemarks() {
      this.$isLoading(true);
      let program_id = this.program.id;
      let area_id = this.areaSelected.id;
      let sfr = [
        ...this.selectedStrength,
        ...this.selectedWeakness,
        ...this.selectedRecommendation
      ];
      let role = "External";
      if (this.role.includes("internal")) role = "Internal";
      this.$store
        .dispatch("saveSFR", { program_id, area_id, sfr, role })
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
    },
    setRemarks(collection) {
      let x = 0;
      let remark = null;
      let type = null;
      if (collection?.length) {
        for (let y = 0; y < collection.length; y++) {
          if (collection[y].best_practices?.length) {
            for (x = 0; x < collection[y].best_practices.length; x++) {
              remark = collection[y].best_practices[x];
              type = "Strength";
              if (this.selectAll === true) {
                if (!this.remarkSelected.find(item => item.remark === remark))
                  this.remarkSelected.push({ remark, type });
              } else {
                this.remarkSelected = this.remarkSelected.filter(
                  item => item.remark !== remark
                );
              }
            }
          }
          if (collection[y].strength_remarks?.length) {
            for (x = 0; x < collection[y].strength_remarks.length; x++) {
              remark = collection[y].strength_remarks[x];
              type = "Strength";
              if (this.selectAll === true) {
                if (!this.remarkSelected.find(item => item.remark === remark))
                  this.remarkSelected.push({ remark, type });
              } else {
                this.remarkSelected = this.remarkSelected.filter(
                  item => item.remark !== remark
                );
              }
            }
          }
          if (collection[y].weakness_remarks?.length) {
            for (x = 0; x < collection[y].weakness_remarks.length; x++) {
              remark = collection[y].weakness_remarks[x];
              type = "Weakness";
              if (this.selectAll === true) {
                if (!this.remarkSelected.find(item => item.remark === remark))
                  this.remarkSelected.push({ remark, type });
              } else {
                this.remarkSelected = this.remarkSelected.filter(
                  item => item.remark !== remark
                );
              }
            }
          }
          if (collection[y].recommendations?.length) {
            for (x = 0; x < collection[y].recommendations.length; x++) {
              remark = collection[y].recommendations[x];
              type = "Recommendation";
              if (this.selectAll === true) {
                if (!this.remarkSelected.find(item => item.remark === remark))
                  this.remarkSelected.push({ remark, type });
              } else {
                this.remarkSelected = this.remarkSelected.filter(
                  item => item.remark !== remark
                );
              }
            }
          }
        }
      }
    },
    checkSelected() {
      let collection = this.filterCollection(this.areaSelected.id);
      let x = 0;
      let remarkCount = 0;
      this.remarkCount = 0;
      if (collection?.length) {
        for (let y = 0; y < collection.length; y++) {
          if (collection[y].best_practices?.length) {
            for (x = 0; x < collection[y].best_practices.length; x++) {
              if (
                this.remarkSelected.filter(
                  item => item.remark === collection[y].best_practices[x]
                )?.length
              ) {
                remarkCount++;
              }
              this.remarkCount++;
            }
          }
          if (collection[y].strength_remarks?.length) {
            for (x = 0; x < collection[y].strength_remarks.length; x++) {
              if (
                this.remarkSelected.filter(
                  item => item.remark === collection[y].strength_remarks[x]
                )?.length
              ) {
                remarkCount++;
              }
              this.remarkCount++;
            }
          }
          if (collection[y].weakness_remarks?.length) {
            for (x = 0; x < collection[y].weakness_remarks.length; x++) {
              if (
                this.remarkSelected.filter(
                  item => item.remark === collection[y].weakness_remarks[x]
                )?.length
              ) {
                remarkCount++;
              }
              this.remarkCount++;
            }
          }
          if (collection[y].recommendations?.length) {
            for (x = 0; x < collection[y].recommendations.length; x++) {
              if (
                this.remarkSelected.filter(
                  item => item.remark === collection[y].recommendations[x]
                )?.length
              ) {
                remarkCount++;
              }
              this.remarkCount++;
            }
          }
        }
      }
      return remarkCount;
    },
    makeToast(title, variant) {
      this.$bvToast.toast(this.snackbarText, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-left",
        solid: true,
        autoHideDelay: 3000
      });
    },
    filterCollection(id) {
      if (this.collection?.length)
        return this.collection.filter(
          item => item.instrument_program_id === id
        );
    },
    inputChange(remark, type) {
      return { remark, type };
    },
    addRemark(type) {
      let remark = null;
      // this.remarkSelected.push({ remark, type });
      if (type === "Strength") {
        this.selectedStrength.push({ remark, type });
      } else if (type === "Weakness") {
        this.selectedWeakness.push({ remark, type });
      } else if (type === "Recommendation") {
        this.selectedRecommendation.push({ remark, type });
      }
    },
    removeRemark(type, counter) {
      if (type === "Strength") {
        this.selectedStrength.splice(counter, 1);
      } else if (type === "Weakness") {
        this.selectedWeakness.splice(counter, 1);
      } else if (type === "Recommendation") {
        this.selectedRecommendation.splice(counter, 1);
      }
    },
    arraymove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }
  },
  async created() {
    this.$isLoading(true);
    let program_id = this.program.id;
    let area_id = this.areaSelected.id;
    let role = 1;
    if (this.role.includes("internal")) role = 0;
    await this.$store
      .dispatch("viewSFR", { program_id, area_id, role })
      .then(result => {
        this.remarkSelected = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
