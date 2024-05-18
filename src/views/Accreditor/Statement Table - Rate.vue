<template>
  <div id="rate">
    <!--Comment Chat-->
    <b-modal id="app" v-model="chatbox" scrollable>
      <template #modal-header>
        <h6>{{ statement.statement }}</h6>
        <md-button
          v-b-tooltip.hover
          title="Comment"
          class="md-icon-button md-accent"
          @click="chatbox = false"
          ><md-icon>close</md-icon></md-button
        >
      </template>

      <div
        v-if="statement.remark_type === 'General' && statement.remark"
        style="direction:rtl; text-align:justify; margin-left: 100px;"
      >
        {{ concatName(user) }}
        <h6>"{{ statement.remark }}"</h6>
      </div>

      <div v-for="(item, index) in messages" :key="index">
        <div
          v-if="item.user_id.toString() === user.id.toString()"
          style="direction:rtl; text-align:justify; margin-left: 100px;"
        >
          {{ concatName(item) }}
          <h6>"{{ item.message }}"</h6>
        </div>
        <div v-else style="text-align:justify; margin-right: 100px;">
          {{ concatName(item) }}
          <h6>"{{ item.message }}"</h6>
        </div>
      </div>

      <div id="latestMessage"></div>

      <template #modal-footer>
        <div class="md-layout">
          <div class="md-layout-item">
            <b-form-textarea
              style="width: 400px"
              v-model="message"
              placeholder="..."
              rows="2"
            ></b-form-textarea>
          </div>
          <div class="md-layout-item" style="max-width: max-content">
            <md-button
              v-if="message !== ''"
              v-b-tooltip.hover
              title="Send"
              class="md-icon-button md-primary"
              @click="sendRemark()"
              ><md-icon>send</md-icon></md-button
            >
            <md-button
              v-else
              v-b-tooltip.hover
              title="Send"
              class="md-icon-button md-primary"
              ><md-icon>send</md-icon></md-button
            >
          </div>
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px; margin-bottom: 10px;">
      <div class="md-layout">
        <div class="md-layout-item">
          <h6>{{ program.program_name }}</h6>
          <h5>Campus: {{ program.campus_name }}</h5>
          <h5>{{ instrument.area_name }}</h5>
          <b-dropdown :text="parameter.parameter" variant="primary">
            <div v-for="(item, index) in parameters" :key="index">
              <b-dropdown-item
                @click="
                  changeParameter(item.id);
                  $store.commit('saveParameter', item);
                "
                >{{ item.parameter }}</b-dropdown-item
              >
            </div>
          </b-dropdown>
        </div>
      </div>

      <!--Table-->
      <div>
        <div v-for="(item, x) in type" :key="x">
          <div class="md-layout" style="margin-top: 20px; margin-bottom: 10px">
            <div
              v-if="search === ''"
              class="md-layout-item"
              style="padding-top: 10px"
            >
              <h5>{{ item.type }}</h5>
            </div>
            <div class="md-layout-item"></div>
            <div
              v-if="x === 0"
              class="md-layout-item"
              style="max-width: 330px; padding-bottom: 10px"
            >
              <b-form-input
                placeholder="Search Statement"
                v-model="search"
                @input="searchOnTable"
                type="text"
              ></b-form-input>
            </div>
          </div>

          <b-table
            :items="sortStatements(item.type)"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            v-if="search === ''"
            class="md-elevation-2"
            bordered
            sort-icon-left
            style="margin-bottom: 0"
            responsive="sm"
          >
            <template #cell(statement)="row">
              <div
                :style="{
                  'padding-left': setIndent(row.item) + 'px'
                }"
              >
                {{ row.value }}

                <br /><br />

                <md-badge
                  v-if="filterAttachments(row.item.id).length > 0"
                  :md-content="filterAttachments(row.item.id).length"
                  md-dense
                >
                  <md-button
                    style="margin: 0 0 0 0"
                    class="md-primary md-dense md-raised"
                    v-b-toggle="getId(row.item.id)"
                    >Attachments</md-button
                  >
                </md-badge>
                <b-collapse :id="getId(row.item.id)">
                  <md-card style="margin: 10px 0 0 0; padding: 10px">
                    <div
                      v-for="(item, index) in filterAttachments(row.item.id)"
                      :key="index"
                      style="padding-left: 20px; margin-top: 5px"
                    >
                      <div class="md-layout">
                        <div class="md-layout-item" style="max-width: 25px">
                          {{ index + 1 }}.
                        </div>
                        <div
                          class="md-layout-item"
                          style="max-width: max-content"
                        >
                          <b-link @click="showFile(item)">{{
                            item.document_name
                          }}</b-link>
                        </div>
                      </div>
                    </div>
                  </md-card>
                </b-collapse>
              </div>
            </template>

            <template #cell(rating)="row">
              <div
                v-if="
                  !statementList.find(
                    x =>
                      x.parent_statement_id === row.item.benchmark_statement_id
                  )
                "
              >
                <b-form-select
                  v-model="row.item.item_score"
                  @change="autoSaveScore()"
                >
                  <b-form-select-option :value="null">n/a</b-form-select-option>
                  <b-form-select-option :value="0.0">0.00</b-form-select-option>
                  <b-form-select-option :value="1.0">1.00</b-form-select-option>
                  <b-form-select-option :value="2.0">2.00</b-form-select-option>
                  <b-form-select-option :value="3.0">3.00</b-form-select-option>
                  <b-form-select-option :value="4.0">4.00</b-form-select-option>
                  <b-form-select-option :value="5.0">5.00</b-form-select-option>
                </b-form-select>
              </div>

              <div v-else>
                <b-form-input v-model="row.item.item_score" disabled>{{
                  (row.item.item_score = getMean(
                    row.item.benchmark_statement_id
                  ))
                }}</b-form-input>
              </div>
            </template>

            <template #cell(remark)="row">
              <div class="md-layout" style="margin-bottom: 5px">
                <div class="md-layout-item">
                  <b-form-radio
                    v-model="row.item.remark_type"
                    :value="null"
                    @input="
                      row.item.remark = null;
                      autoSaveScore();
                    "
                    >None</b-form-radio
                  >
                  <!-- <b-form-radio v-model="row.item.remark_type" value="General"
                    >Comment</b-form-radio
                  > -->
                  <b-form-radio v-model="row.item.remark_type" value="Strength"
                    >Strength</b-form-radio
                  >
                  <b-form-radio v-model="row.item.remark_type" value="Weakness"
                    >Weakness</b-form-radio
                  >
                </div>
                <div class="md-layout-item" style="max-width: max-content">
                  <md-badge
                    v-if="checkMessage(row.item.id) > 0"
                    :md-content="checkMessage(row.item.id)"
                    md-dense
                  >
                    <md-button
                      style="margin: 0"
                      class="md-primary md-dense md-raised"
                      @click="
                        messages = [];
                        (message = ''), (statement = row.item);
                        showRemark(row.item.id);
                        readMessage(row.item.id);
                        chatbox = true;
                      "
                      >Comment</md-button
                    >
                  </md-badge>
                  <md-button
                    v-else
                    style="margin: 0"
                    class="md-primary md-dense md-raised"
                    @click="
                      messages = [];
                      (message = ''), (statement = row.item);
                      showRemark(row.item.id);
                      chatbox = true;
                    "
                    >Comment</md-button
                  >
                </div>
              </div>

              <b-form-textarea
                v-if="
                  row.item.remark_type === 'General' || !row.item.remark_type
                "
                id="statement"
                :v-model="row.item.remark"
                rows="3"
                max-rows="6"
                @input="autoSaveScore()"
                disabled
              ></b-form-textarea>
              <b-form-textarea
                v-else
                id="statement"
                v-model="row.item.remark"
                placeholder="Enter remark..."
                rows="3"
                max-rows="6"
                @input="autoSaveScore()"
              ></b-form-textarea>
            </template>
          </b-table>

          <b-table
            :items="statementList"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            v-else-if="x === 0"
            class="md-elevation-2"
            bordered
            sort-icon-left
            style="margin-bottom: 0"
            responsive="sm"
          >
            <template #cell(statement)="row">
              <div>
                {{ row.value }}

                <br /><br />

                <md-badge
                  v-if="filterAttachments(row.item.id).length > 0"
                  :md-content="filterAttachments(row.item.id).length"
                  md-dense
                >
                  <md-button
                    style="margin: 0 0 0 0"
                    class="md-primary md-dense md-raised"
                    v-b-toggle="getId(row.item.id)"
                    >Attachments</md-button
                  >
                </md-badge>
                <b-collapse :id="getId(row.item.id)">
                  <md-card style="margin: 10px 0 0 0; padding: 10px">
                    <div
                      v-for="(item, index) in filterAttachments(row.item.id)"
                      :key="index"
                      style="padding-left: 20px; margin-top: 5px"
                    >
                      <div class="md-layout">
                        <div class="md-layout-item" style="max-width: 25px">
                          {{ index + 1 }}.
                        </div>
                        <div
                          class="md-layout-item"
                          style="max-width: max-content"
                        >
                          <b-link @click="showFile(item)">{{
                            item.document_name
                          }}</b-link>
                        </div>
                      </div>
                    </div>
                  </md-card>
                </b-collapse>
              </div>
            </template>

            <template #cell(rating)="row">
              <div
                v-if="
                  !statementList.find(
                    x =>
                      x.parent_statement_id === row.item.benchmark_statement_id
                  )
                "
              >
                <b-form-select
                  v-model="row.item.item_score"
                  @change="autoSaveScore()"
                >
                  <b-form-select-option :value="null">n/a</b-form-select-option>
                  <b-form-select-option :value="0.0">0.00</b-form-select-option>
                  <b-form-select-option :value="1.0">1.00</b-form-select-option>
                  <b-form-select-option :value="2.0">2.00</b-form-select-option>
                  <b-form-select-option :value="3.0">3.00</b-form-select-option>
                  <b-form-select-option :value="4.0">4.00</b-form-select-option>
                  <b-form-select-option :value="5.0">5.00</b-form-select-option>
                </b-form-select>
              </div>
              <div v-else>
                <b-form-input v-model="row.item.item_score" disabled>{{
                  (row.item.item_score = getMean(
                    row.item.benchmark_statement_id
                  ))
                }}</b-form-input>
              </div>
            </template>

            <template #cell(remark)="row">
              <div class="md-layout" style="margin-bottom: 5px">
                <div class="md-layout-item">
                  <b-form-radio
                    v-model="row.item.remark_type"
                    :value="null"
                    @input="
                      row.item.remark = null;
                      autoSaveScore();
                    "
                    >None</b-form-radio
                  >
                  <!-- <b-form-radio v-model="row.item.remark_type" value="General"
                    >Comment</b-form-radio
                  > -->
                  <b-form-radio v-model="row.item.remark_type" value="Strength"
                    >Strength</b-form-radio
                  >
                  <b-form-radio v-model="row.item.remark_type" value="Weakness"
                    >Weakness</b-form-radio
                  >
                </div>
                <div class="md-layout-item" style="max-width: max-content">
                  <md-badge
                    v-if="checkMessage(row.item.id) > 0"
                    :md-content="checkMessage(row.item.id)"
                    md-dense
                  >
                    <md-button
                      style="margin: 0"
                      class="md-primary md-dense md-raised"
                      @click="
                        messages = [];
                        (message = ''), (statement = row.item);
                        showRemark(row.item.id);
                        readMessage(row.item.id);
                        chatbox = true;
                      "
                      >Comment</md-button
                    >
                  </md-badge>
                  <md-button
                    v-else
                    style="margin: 0"
                    class="md-primary md-dense md-raised"
                    @click="
                      messages = [];
                      (message = ''), (statement = row.item);
                      showRemark(row.item.id);
                      chatbox = true;
                    "
                    >Comment</md-button
                  >
                </div>
              </div>

              <b-form-textarea
                v-if="
                  row.item.remark_type === 'General' || !row.item.remark_type
                "
                id="statement"
                v-model="row.item.remark"
                rows="3"
                max-rows="6"
                @input="autoSaveScore()"
                disabled
              ></b-form-textarea>
              <b-form-textarea
                v-else
                id="statement"
                v-model="row.item.remark"
                placeholder="Enter remark..."
                rows="3"
                max-rows="6"
                @input="autoSaveScore()"
              ></b-form-textarea>
            </template>
          </b-table>
        </div>
      </div>

      <br />
      <div class="md-layout">
        <div class="md-layout-item">
          <md-card style="padding: 15px 20px">
            <div class="md-layout" style="margin-bottom: 15px">
              <div class="md-layout-item">
                <h6>Strength Remarks:</h6>
                <div v-for="(item, index) in filterStrength()" :key="index">
                  {{ item.remark }}
                </div>
              </div>
            </div>

            <h6>Best Practices:</h6>
            <div v-for="(item, index) in best_practices" :key="index">
              {{ item.best_practice }}
            </div>
            <br />
            <div v-for="(item, counter) in recommendation" :key="counter">
              <div class="md-layout">
                <div class="md-layout-item">
                  <b-form-input
                    v-model="recommendation[counter]"
                    size="sm"
                    style="margin-bottom: 5px"
                    @input="autoSaveScore()"
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
                >Add Best Practice</md-button
              >
            </div>
          </md-card>
        </div>

        <div class="md-layout-item" style="max-width: 30%">
          <md-card style="padding: 15px 20px">
            <h6>System Input Mean: {{ roundNum(systemInputMean) }}</h6>
            <h6>Implementation Mean: {{ roundNum(implementationMean) }}</h6>
            <h6>Outcome Mean: {{ roundNum(outcomeMean) }}</h6>
            <h5>Parameter Mean: {{ roundNum(parameterMean) }}</h5>
          </md-card>
        </div>
      </div>

      <br />
      <md-button
        style="width: 100%; margin: 0"
        class="md-primary md-raised"
        @click="setScore()"
        >Save Rating</md-button
      >

      <div class="md-layout" style="margin-top: 15px">
        <div class="md-layout-item"></div>
        <div class="md-layout-item" style="max-width: max-content">
          <div v-for="(item, index) in parameters" :key="index">
            <div v-if="item.parameter === parameter.parameter">
              <md-button
                v-if="parameters[index - 1]"
                class="md-primary md-raised md-dense"
                style="margin: 0 5px 0 5px"
                @click="
                  changeParameter(parameters[index - 1].id);
                  $store.commit('saveParameter', parameters[index - 1]);
                  window.scrollTo(0, 0);
                "
                >Back</md-button
              >
              <md-button
                v-if="parameters[index + 1]"
                class="md-primary md-raised md-dense"
                style="margin: 0 5px 0 5px"
                @click="
                  changeParameter(parameters[index + 1].id);
                  $store.commit('saveParameter', parameters[index + 1]);
                  window.scrollTo(0, 0);
                "
                >Next</md-button
              >
            </div>
          </div>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByStatement = (items, term) => {
  if (items && term) {
    return items.filter(item =>
      toLower(item.statement).includes(toLower(term))
    );
  }
  return items;
};

const searchByParameter = (items, term) => {
  if (items && term) {
    return items.filter(item => item.program_parameter_id === term);
  }
  return items;
};

const searchByType = (items, term) => {
  if (items && term) {
    return items.filter(item => item.type === term);
  }
  return items;
};

const searchByStatementParent = (items, term) => {
  if (items && term) {
    return items.find(item => item.benchmark_statement_id === term);
  }
};

const searchByStatementID = (items, term) => {
  if (items || term) {
    return items.filter(item => item.statement_id === term);
  }
};

// const filterNotif = (items, term) => {
//   if (items && term) {
//     if (items.find(item => item.id === term)) return true;
//     else return false;
//   }
// };

export default {
  name: "RateStatement",
  data() {
    return {
      sortBy: "statement",
      sortDesc: false,
      fields: [
        { key: "statement", label: "Statement", sortable: true },
        { key: "rating", label: "Rating", thStyle: { width: "100px" } },
        { key: "remark", label: "Remarks", thStyle: { width: "350px" } }
      ],
      statementList: [{}],
      statement: {},
      index: null,
      item_score: null,
      remark: null,
      search: "",
      remarkDialog: false,
      commentDialog: false,
      remarkToggle: false,
      fileSelection: ["file 1", "file 2"],
      items: [],
      type: [
        {
          type: "System Input"
        },
        {
          type: "Implementation"
        },
        {
          type: "Outcome"
        }
      ],
      parameters: [{}],
      best_practices: [],
      recommendation: [null],
      snackbarText: "",
      messages: [],
      unreadMessages: [],
      message: null,
      chatbox: false
    };
  },
  computed: {
    ...mapState({
      user: "user",
      instrument: "instrument",
      parameter: "parameter",
      program: "program",
      assigned_user_id: "assigned_user_id",
      accreditor_role: "accreditor_role"
    }),
    systemInputMean: {
      get: function() {
        let statementList = this.sortStatements("System Input");
        if (statementList?.length) {
          let sum = 0;
          let x = 0;
          for (let i = 0; i < statementList.length; i++) {
            if (
              statementList[i].parent_statement_id === null &&
              statementList[i].item_score !== null
            ) {
              sum = sum + parseFloat(statementList[i].item_score);
              x = x + 1;
            }
          }
          return parseFloat((sum / x).toFixed(2));
        } else return null;
      }
    },
    implementationMean: {
      get: function() {
        let statementList = this.sortStatements("Implementation");
        if (statementList?.length) {
          let sum = 0;
          let x = 0;
          for (let i = 0; i < statementList.length; i++) {
            if (
              statementList[i].parent_statement_id === null &&
              statementList[i].item_score !== null
            ) {
              sum = sum + parseFloat(statementList[i].item_score);
              x = x + 1;
            }
          }
          return parseFloat((sum / x).toFixed(2));
        } else return null;
      }
    },
    outcomeMean: {
      get: function() {
        let statementList = this.sortStatements("Outcome");
        if (statementList?.length) {
          let sum = 0;
          let x = 0;
          for (let i = 0; i < statementList.length; i++) {
            if (
              statementList[i].parent_statement_id === null &&
              statementList[i].item_score !== null
            ) {
              sum = sum + parseFloat(statementList[i].item_score);
              x = x + 1;
            }
          }
          return parseFloat((sum / x).toFixed(2));
        } else return null;
      }
    },
    parameterMean: {
      get: function() {
        if (this.statementList?.length) {
          let sum = 0;
          let x = 0;
          if (parseFloat(this.systemInputMean) >= 0) {
            sum = sum + parseFloat(this.systemInputMean);
            x = x + 1;
          }
          if (parseFloat(this.implementationMean) >= 0) {
            sum = sum + parseFloat(this.implementationMean);
            x = x + 1;
          }
          if (parseFloat(this.outcomeMean) >= 0) {
            sum = sum + parseFloat(this.outcomeMean);
            x = x + 1;
          }
          return parseFloat((sum / x).toFixed(2));
        } else return null;
      }
    }
  },
  methods: {
    showFile(item) {
      if (item.type === "link") window.open(item.link);
      if (item.type === "file") this.downloadLetter(item);
    },
    downloadLetter(documentSelect) {
      this.$isLoading(true);
      let type = null;
      this.$store
        .dispatch("documentType", documentSelect.document_id)
        .then(result => {
          type = result.data.type;
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
      this.$store
        .dispatch("documentViewFile", documentSelect.document_id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = URL.createObjectURL(
            new Blob([result.data], { type: type })
          );

          this.$store.commit("saveURL", fileURL);

          let routeData = this.$router.resolve({ path: "/Documents" });
          window.open(routeData.href, "_blank");
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
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
    messageToast(title, variant) {
      this.$bvToast.toast(this.snackbarText, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-left",
        solid: true,
        noAutoHide: true
      });
    },
    setScore() {
      for (let i = 0; i < this.statementList.length; i++) {
        if (
          this.statementList[i].item_score !== null ||
          this.statementList[i].remark !== null
        ) {
          let id = this.statementList[i].item_id;
          let user_id = this.statementList[i].assigned_user_id;
          let score = this.statementList[i].item_score;
          let remark = this.statementList[i].remark;
          let remark_type = this.statementList[i].remark_type;

          this.items.push({
            id,
            user_id,
            score,
            remark,
            remark_type
          });
        }
      }
      let parameter_id = this.parameter.id;
      let assigned_user_id = this.assigned_user_id;
      let items = this.items;
      let parameter_mean = this.parameterMean;
      let best_practices = [];
      if (this.recommendation[0] !== null) best_practices = this.recommendation;
      this.$isLoading(true);
      this.$store
        .dispatch("setScore", {
          parameter_id,
          assigned_user_id,
          items,
          parameter_mean,
          best_practices
        })
        .then(result => {
          if (result.data.status === true) {
            let parameter_id = this.parameter.id;
            let assigned_user_id = this.assigned_user_id;
            this.recommendation = [null];
            this.$store
              .dispatch("showBestPractice", { parameter_id, assigned_user_id })
              .then(result => {
                this.$isLoading(false);
                this.best_practices = result.data;
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
    autoSaveScore: _.debounce(function() {
      for (let i = 0; i < this.statementList.length; i++) {
        let id = this.statementList[i].item_id;
        let user_id = this.statementList[i].assigned_user_id;
        let score = this.statementList[i].item_score;
        let remark = this.statementList[i].remark;
        let remark_type = this.statementList[i].remark_type;

        this.items.push({
          id,
          user_id,
          score,
          remark,
          remark_type
        });
      }
      let parameter_id = this.parameter.id;
      let assigned_user_id = this.assigned_user_id;
      let items = this.items;
      let parameter_mean = this.parameterMean;
      let best_practices = [];
      this.$store.dispatch("setScore", {
        parameter_id,
        assigned_user_id,
        items,
        parameter_mean,
        best_practices
      });
    }, 1000),
    sortStatements(type) {
      return searchByType(this.statementList, type);
    },
    comments() {
      this.statementList[this.index].remark = this.statement.remark;
      this.statementList[this.index].remark_type = "General";
    },
    remarkStrength() {
      this.statementList[this.index].remark = this.statement.remark;
      this.statementList[this.index].remark_type = "Strength";
    },
    remarkWeakness() {
      this.statementList[this.index].remark = this.statement.remark;
      this.statementList[this.index].remark_type = "Weakness";
    },
    setIndent(item) {
      let parentID = item;
      let indent = 0;
      while (parentID.parent_statement_id !== null) {
        parentID = searchByStatementParent(
          this.statementList,
          parentID.parent_statement_id
        );
        if (!parentID) return indent;
        indent = indent + 40;
      }
      return indent;
    },
    getMean(id) {
      if (this.statementList?.length) {
        let sum = 0;
        let x = 0;
        for (let i = 0; i < this.statementList.length; i++) {
          if (
            this.statementList[i].parent_statement_id === id &&
            this.statementList[i].item_score !== null
          ) {
            sum = sum + parseFloat(this.statementList[i].item_score);
            x = x + 1;
          }
        }
        let mean = parseFloat((sum / x).toFixed(2));
        if (!isNaN(mean)) return this.roundNum(mean);
        else return null;
      }
    },
    roundNum(num) {
      if (num !== null) return (Math.round(num * 100) / 100).toFixed(2);
    },
    filterAttachments(benchmark_id) {
      let attachments = searchByStatementID(this.attachmentList, benchmark_id);
      if (attachments?.length && attachments.length > 1)
        return attachments.sort((a, b) => a.id - b.id);
      else return attachments;
    },
    searchOnTable: _.debounce(function() {
      let program_id = this.program.id;
      let transaction_id = this.instrument.id;
      this.$store
        .dispatch("showStatementDocument", { program_id, transaction_id })
        .then(result => {
          let statement = searchByParameter(
            result.data.statements,
            this.parameter.id
          );

          this.statementList = searchByStatement(statement, this.search);
          this.unreadMessages = result.data.unread_message_count;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    setComment() {
      if (this.statement.remark) {
        if (this.statement.remark_type !== "General")
          this.statement.remark = "";
      }
    },
    setRemark() {
      if (this.statement.remark) {
        if (this.statement.remark_type === "General")
          this.statement.remark = "";
        this.remarkToggle = this.statement.remark_type !== "Strength";
      }
    },
    filterStrength() {
      if (this.statementList?.length) {
        return this.statementList.filter(
          item => item.remark_type === "Strength"
        );
      }
    },
    filterWeakness() {
      if (this.statementList?.length) {
        return this.statementList.filter(
          item => item.remark_type === "Weakness"
        );
      }
    },
    addRecommendation() {
      this.recommendation.push(null);
    },
    removeRecommendation(counter) {
      this.recommendation.splice(counter, 1);
    },
    changeParameter(parameter_id) {
      let program_id = this.program.id;
      let transaction_id = this.instrument.id;
      this.$isLoading(true);
      this.$nextTick(() => {
        document.getElementById("rate").scrollIntoView();
      });
      this.$store
        .dispatch("showStatementDocument", { program_id, transaction_id })
        .then(result => {
          this.statementList = searchByParameter(
            result.data.statements,
            parameter_id
          );
          this.unreadMessages = result.data.unread_message_count;
          this.attachmentList = result.data.documents;
          let assigned_user_id = this.assigned_user_id;
          this.$store
            .dispatch("showBestPractice", { parameter_id, assigned_user_id })
            .then(result => {
              this.best_practices = result.data;
            });
          this.$isLoading(false);
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    getId(item) {
      return item.toString();
    },
    concatName(item) {
      if (item) {
        if (item.first_name && item.last_name)
          return item.first_name.concat(" ", item.last_name);
        else if (item.last_name) return item.last_name;
        else if (item.first_name) return item.first_name;
      }
    },
    showRemark(id) {
      let program_id = this.program.id;
      let statement_id = id;
      let type = 0;
      if (this.accreditor_role.includes("external")) type = 1;
      this.$store
        .dispatch("showRemark", { program_id, statement_id, type })
        .then(result => {
          this.messages = result.data;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    sendRemark() {
      this.$isLoading(true);
      let program_id = this.program.id;
      let statement_id = this.statement.id;
      let message = this.message;
      let type = "Internal";
      if (this.accreditor_role.includes("external")) type = "External";
      this.$store
        .dispatch("sendRemark", {
          program_id,
          statement_id,
          message,
          type
        })
        .then(result => {
          if (result.data.status === true) {
            this.showRemark(this.statement.id);
            this.message = "";
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
    checkMessage(id) {
      if (this.accreditor_role.includes("internal"))
        return this.unreadMessages.find(item => item.id === id).count_internal;
      else if (this.accreditor_role.includes("external"))
        return this.unreadMessages.find(item => item.id === id).count_external;
    },
    readMessage(id) {
      if (this.accreditor_role.includes("internal"))
        this.unreadMessages.find(item => item.id === id).count_internal = 0;
      else if (this.accreditor_role.includes("external"))
        this.unreadMessages.find(item => item.id === id).count_external = 0;
    },
    back() {
      this.$router.push("/AccreditationParameter");
    }
  },
  async created() {
    let program_id = this.program.id;
    let transaction_id = this.instrument.id;
    this.$isLoading(true);
    await this.$store
      .dispatch("showStatementDocument", { program_id, transaction_id })
      .then(result => {
        this.statementList = searchByParameter(
          result.data.statements,
          this.parameter.id
        );
        this.unreadMessages = result.data.unread_message_count;
        this.attachmentList = result.data.documents;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    let instrument_id = this.instrument.id;
    await this.$store
      .dispatch("showTaskParameter", { instrument_id, program_id })
      .then(result => {
        if (result.data.parameters.length > 1)
          this.parameters = result.data.parameters.sort((a, b) =>
            a.parameter.localeCompare(b.parameter)
          );
        else this.parameters = result.data.parameters;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    let parameter_id = this.parameter.id;
    let assigned_user_id = this.assigned_user_id;
    await this.$store
      .dispatch("showBestPractice", { parameter_id, assigned_user_id })
      .then(result => {
        this.best_practices = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    // await this.$store
    //   .dispatch("showUnreadMessage", this.program.id)
    //   .then(result => {
    //     if (result.data?.length) {
    //       for (let x = 0; result.data?.length > x; x++) {
    //         if (filterNotif(this.statementList, result.data[x].statement_id)) {
    //           if (this.accreditor_role.includes("external")) {
    //             if (result.data[x].type === "External") {
    //               this.snackbarText = result.data[x].message;
    //               this.messageToast("New Message!", "primary");
    //             }
    //           } else if (this.accreditor_role.includes("internal")) {
    //             if (result.data[x].type === "Internal") {
    //               this.snackbarText = result.data[x].message;
    //               this.messageToast("New Message!", "primary");
    //             }
    //           }
    //         }
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     this.snackbarText = err + ". Please contact the administrator";
    //     this.makeToast("Error", "danger");
    //   });

    await this.$isLoading(false);
  }
};
</script>
