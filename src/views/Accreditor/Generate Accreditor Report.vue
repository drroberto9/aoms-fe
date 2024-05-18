<template>
  <div>
    <!--    <div style="margin-bottom: 15px">-->
    <!--      <b>Instructions:</b>-->
    <!--      Select and edit which statements that is best applied.-->
    <!--    </div>-->
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
            <!--before_compliance-->
            <b-table
              :items="item.before_compliance"
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
                Compliance Before the Award
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
                    :value="inputChange(row.item, 'before_compliance')"
                  />
                </div>
              </template>
            </b-table>

            <!--after_compliance-->
            <b-table
              :items="item.after_compliance"
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
                Compliance After the Award
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
                    :value="inputChange(row.item, 'after_compliance')"
                  />
                </div>
              </template>
            </b-table>
            <br />
          </div>
        </b-form-checkbox-group>
      </md-tab>
      <md-tab md-label="Edit Remarks">
        <h6>Compliance Before the Award</h6>
        <div
          v-for="(items, index) in filterRemarks('before_compliance')"
          :key="index"
        >
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
                @click="removeRemark(index)"
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
              @click="addRemark('before_compliance')"
              >Add Statement</md-button
            >
          </div>
        </div>

        <h6>Compliance After the Award</h6>
        <div
          v-for="(items, index) in filterRemarks('after_compliance')"
          :key="index"
        >
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
                @click="removeRemark(index)"
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
              @click="addRemark('after_compliance')"
              >Add Statement</md-button
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
    }
  },
  methods: {
    saveRemarks() {
      this.$isLoading(true);
      let program_id = this.program.id;
      let area_id = this.areaSelected.id;
      let sfr = this.remarkSelected;
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
          if (collection[y].before_compliance?.length) {
            for (x = 0; x < collection[y].before_compliance.length; x++) {
              remark = collection[y].before_compliance[x];
              type = "before_compliance";
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
          if (collection[y].after_compliance?.length) {
            for (x = 0; x < collection[y].after_compliance.length; x++) {
              remark = collection[y].after_compliance[x];
              type = "after_compliance";
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
          if (collection[y].before_compliance?.length) {
            for (x = 0; x < collection[y].before_compliance.length; x++) {
              if (
                this.remarkSelected.filter(
                  item => item.remark === collection[y].before_compliance[x]
                )?.length
              ) {
                remarkCount++;
              }
              this.remarkCount++;
            }
          }
          if (collection[y].after_compliance?.length) {
            for (x = 0; x < collection[y].after_compliance.length; x++) {
              if (
                this.remarkSelected.filter(
                  item => item.remark === collection[y].after_compliance[x]
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
    filterRemarks(type) {
      if (this.remarkSelected?.length)
        return this.remarkSelected.filter(item => item.type === type);
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
      this.remarkSelected.push({ remark, type });
    },
    removeRemark(counter) {
      this.remarkSelected.splice(counter, 1);
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
