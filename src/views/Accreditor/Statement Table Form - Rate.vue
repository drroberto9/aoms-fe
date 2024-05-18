<template>
  <div id="create">
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
          <h4>{{ program.campus_name }}</h4>
          <!--          <h5>{{ instrument.area_name }}</h5>-->
          <b-dropdown :text="instrument.area_name" variant="primary">
            <div v-for="(item, index) in msiList" :key="index">
              <b-dropdown-item @click="changeParameter(item)">{{
                item.area_name
              }}</b-dropdown-item>
            </div>
          </b-dropdown>
        </div>
      </div>

      <!--Table-->
      <div>
        <div class="md-layout" style="margin-top: 20px">
          <!--            <div-->
          <!--              v-if="search === ''"-->
          <!--              class="md-layout-item"-->
          <!--              style="padding-top: 10px"-->
          <!--            >-->
          <!--              <h5>{{ item.type }}</h5>-->
          <!--            </div>-->
          <div class="md-layout-item"></div>
          <div
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

        <div class="md-layout" style="margin-bottom: 10px">
          <div class="md-layout-item"></div>
          <div class="md-layout-item" style="max-width: 200px">
            <div class="md-layout">
              <div class="md-layout-item" style="padding-top: 10px">
                <h6>Area Rating:</h6>
              </div>
              <div class="md-layout-item">
                <b-form-select v-model="area_rating" @change="autoSaveScore()">
                  <b-form-select-option :value="null">n/a</b-form-select-option>
                  <b-form-select-option :value="0.0">0.00</b-form-select-option>
                  <b-form-select-option :value="1.0">1.00</b-form-select-option>
                  <b-form-select-option :value="2.0">2.00</b-form-select-option>
                  <b-form-select-option :value="3.0">3.00</b-form-select-option>
                  <b-form-select-option :value="4.0">4.00</b-form-select-option>
                  <b-form-select-option :value="5.0">5.00</b-form-select-option>
                </b-form-select>
              </div>
            </div>
          </div>
        </div>

        <b-table
          :items="statementList"
          :fields="setField()"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
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

          <template #head(year_1)> Year: {{ year_1 }} </template>

          <template #cell(year_1)="row">
            <div class="md-layout">
              <div class="md-layout-item">
                <b-form-input
                  v-model="row.item.rating_1"
                  :min="0"
                  :max="100"
                  type="number"
                  @input="autoSaveScore()"
                ></b-form-input>
              </div>
              <div
                class="md-layout-item"
                style="margin-left: 5px; max-width: max-content; padding-top: 10px"
              >
                <h6>%</h6>
              </div>
            </div>
          </template>

          <template #head(year_2)> Year: {{ year_2 }} </template>

          <template #cell(year_2)="row">
            <div class="md-layout">
              <div class="md-layout-item">
                <b-form-input
                  v-model="row.item.rating_2"
                  :min="0"
                  :max="100"
                  type="number"
                  @input="autoSaveScore()"
                ></b-form-input>
              </div>
              <div
                class="md-layout-item"
                style="margin-left: 5px; max-width: max-content; padding-top: 10px"
              >
                <h6>%</h6>
              </div>
            </div>
          </template>

          <template #head(year_3)> Year: {{ year_3 }} </template>

          <template #cell(year_3)="row">
            <div class="md-layout">
              <div class="md-layout-item">
                <b-form-input
                  v-model="row.item.rating_3"
                  :min="0"
                  :max="100"
                  type="number"
                  @input="autoSaveScore()"
                ></b-form-input>
              </div>
              <div
                class="md-layout-item"
                style="margin-left: 5px; max-width: max-content; padding-top: 10px"
              >
                <h6>%</h6>
              </div>
            </div>
          </template>

          <template #cell(before_award)="row">
            <b-form-textarea
              v-model="row.item.remark"
              rows="3"
              max-rows="6"
              @input="autoSaveScore()"
            ></b-form-textarea>
          </template>

          <template #cell(after_award)="row">
            <b-form-textarea
              v-model="row.item.remark_2"
              rows="3"
              max-rows="6"
              @input="autoSaveScore()"
            ></b-form-textarea>
          </template>

          <template #cell(remark)="row">
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
          </template>
        </b-table>
      </div>

      <div class="md-layout" style="margin-top: 20px; margin-bottom: 5px">
        <div class="md-layout-item">
          <h5>Supplementary Files</h5>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <b-form-checkbox
            v-model="compliance_report"
            :value="true"
            :unchecked-value="false"
            @change="autoSaveScore()"
            >Compliance Report</b-form-checkbox
          >
        </div>
      </div>

      <b-table
        :items="areaAttachmentList"
        :fields="fields_attachment"
        :sort-by.sync="sortBy_attachment"
        :sort-desc.sync="sortDesc_attachment"
        class="md-elevation-2"
        outlined
        small
        sort-icon-left
        responsive="sm"
      >
        <template #cell(document_name)="row">
          <b-link @click="showFile(row.item)">{{
            row.item.document_name
          }}</b-link>
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-dense md-accent"
            @click="
              fileSelected = row.item;
              deletePrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
          >
        </template>
      </b-table>

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
          <div v-for="(item, index) in msiList" :key="index">
            <div v-if="item.area_name === instrument.area_name">
              <md-button
                v-if="msiList[index - 1]"
                class="md-primary md-raised"
                style="margin: 0 5px 0 5px"
                @click="changeParameter(msiList[index - 1])"
                >Back</md-button
              >
              <md-button
                v-if="msiList[index + 1]"
                class="md-primary md-raised"
                style="margin: 0 5px 0 5px"
                @click="changeParameter(msiList[index + 1])"
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
import moment from "moment";

const toLower = text => {
  if (text !== undefined) return text.toString().toLowerCase();
};

const searchByStatement = (items, term) => {
  if (term !== "") {
    return items.filter(item =>
      toLower(item.statement).includes(toLower(term))
    );
  }
  return items;
};

const searchByStatementParent = (items, term) => {
  if (items && term) {
    return items.find(item => item.benchmark_statement_id === term);
  }
};

const filterByArea = (documents, area) => {
  if (area !== "") {
    let searchDocuments = [];
    let resultTags = [];
    if (documents?.length) {
      for (let x = 0; x < documents.length; x++) {
        resultTags = resultTags.concat(
          documents[x].tags.filter(
            items => toLower(items.tag ? items.tag : "") === toLower(area)
          )
        );
      }
    }

    if (resultTags?.length) {
      for (let x = 0; x < resultTags.length; x++) {
        let document = documents.find(
          item => item.container.id === resultTags[x].container_id
        );
        if (document) {
          if (
            searchDocuments.filter(
              item => item.container.id === document.container.id
            ).length === 0
          ) {
            searchDocuments.push(document);
          }
        }
      }
      return searchDocuments;
    } else return searchDocuments;
  } else return documents;
};

const searchByTags = (documents, search) => {
  if (search !== "") {
    let searchDocuments = [];
    let resultTags = [];
    if (documents?.length) {
      searchDocuments = documents.filter(item =>
        toLower(
          item.container.container_name ? item.container.container_name : ""
        ).includes(toLower(search))
      );
      for (let x = 0; x < documents.length; x++) {
        resultTags = resultTags.concat(
          documents[x].tags.filter(items =>
            toLower(items.tag ? items.tag : "").includes(toLower(search))
          )
        );
      }
    }

    if (resultTags?.length) {
      for (let x = 0; x < resultTags.length; x++) {
        let document = documents.find(
          item => item.container.id === resultTags[x].container_id
        );
        if (document) {
          if (
            searchDocuments.filter(
              item => item.container.id === document.container.id
            ).length === 0
          ) {
            searchDocuments.push(document);
          }
        }
      }
      return searchDocuments;
    } else return searchDocuments;
  } else return documents;
};

const searchByDocument = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.document_name).includes(toLower(term))
    );
  }
  return items;
};

const searchByStatementID = (items, term) => {
  if (items || term) {
    return items.filter(item => item.statement_id === term);
  }
};

export default {
  name: "ShowStatement",
  data() {
    return {
      sortBy: "statement",
      sortDesc: false,
      fields: [
        { key: "statement", label: "Criteria", sortable: true },
        {
          key: "before_award",
          label: "Compliance Before the Award",
          thStyle: { width: "230px" }
        },
        {
          key: "after_award",
          label: "Compliance After the Award",
          thStyle: { width: "230px" }
        },
        { key: "remark", label: "Remarks", thStyle: { width: "70px" } }
      ],
      fields_licensure: [
        { key: "statement", label: "Criteria", sortable: true },
        {
          key: "year_1",
          thStyle: { width: "140px" }
        },
        {
          key: "year_2",
          thStyle: { width: "140px" }
        },
        {
          key: "year_3",
          thStyle: { width: "140px" }
        },
        {
          key: "before_award",
          label: "Compliance Before the Award",
          thStyle: { width: "230px" }
        },
        {
          key: "after_award",
          label: "Compliance After the Award",
          thStyle: { width: "230px" }
        },
        { key: "remark", label: "Remarks", thStyle: { width: "70px" } }
      ],
      search_container: "",
      sortBy_container: "container.id",
      sortDesc_container: false,
      currentPage_container: 1,
      perPage_container: 10,
      fields_container: [
        { key: "id", label: "ID", sortable: true },
        { key: "container", label: "Folder Name", sortable: true },
        { key: "tag", label: "Tags", sortable: true },
        { key: "office_name", label: "Office", sortable: true },
        {
          key: "number",
          label: "No. of Files",
          sortable: true
        },
        { key: "actions", label: "Actions", thStyle: { width: "130px" } }
      ],
      search_document: "",
      sortBy_document: "container.id",
      sortDesc_document: false,
      currentPage_document: 1,
      perPage_document: 10,
      totalRows_document: 0,
      fields_document: [
        { key: "id", label: "ID", sortable: true },
        { key: "document_name", label: "File", sortable: true },
        { key: "uploaded_by", label: "Uploaded By", sortable: true },
        { key: "updated_at", label: "Date Uploaded", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "130px" } }
      ],
      sortBy_attachment: "instrument_program_document_id",
      sortDesc_attachment: false,
      fields_attachment: [
        {
          key: "instrument_program_document_id",
          label: "ID",
          sortable: true,
          thStyle: { width: "50px" }
        },
        { key: "document_name", label: "File", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      area_rating: null,
      remarks: [],
      graduate_performances: [],
      compliance_report: null,
      year_1: null,
      year_2: null,
      year_3: null,
      statementList: [{}],
      statement: {},
      msiList: [],
      taskList: [],
      attachmentList: [],
      areaAttachmentList: [],
      documentList: [],
      containerList: [],
      filterDocumentArea: 0,
      filterType: "Primary",
      parameters: [{}],
      fileSelected: null,
      search: "",
      edit: false,
      add: false,
      addSub: false,
      snackbarText: "",
      containerDialog: false,
      attachmentDialog: false,
      deletePrompt: false,
      messages: [],
      unreadMessages: [],
      message: null,
      chatbox: false
    };
  },
  computed: {
    ...mapState({
      user: "user",
      campus: "campus",
      instrument: "instrument",
      program: "program",
      assigned_user_id: "assigned_user_id",
      accreditor_role: "accreditor_role"
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
    sortArea(a, b) {
      return a.area_number - b.area_number;
    },
    setField() {
      if (this.instrument.area_name === "LICENSURE EXAM")
        return this.fields_licensure;
      else return this.fields;
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
    filterDocuments() {
      let user_id = this.user.id;
      let campus_id = this.campus.campus_id;
      this.$store
        .dispatch("showAllContainer", { user_id, campus_id })
        .then(result => {
          this.containerList = result.data.documents;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    attachFile(document_id) {
      this.$isLoading(true);
      let instrument_id = this.instrument.id;
      this.$store
        .dispatch("attachAreaSupportDocument", {
          instrument_id,
          document_id
        })
        .then(result => {
          if (result.data.status === true) {
            let index = this.documentList.findIndex(
              data => data.id === document_id
            );
            this.documentList.splice(index, 1);
            this.$store
              .dispatch("showAreaSupportDocument", this.instrument.id)
              .then(result => {
                this.areaAttachmentList = result.data;
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
    removeAttachment() {
      this.$isLoading(true);
      this.$store
        .dispatch(
          "removeAreaSupportDocument",
          this.fileSelected.instrument_program_document_id
        )
        .then(result => {
          if (result.data.status === true) {
            let index = this.areaAttachmentList.findIndex(
              data =>
                data.id === this.fileSelected.instrument_program_document_id
            );
            this.areaAttachmentList.splice(index, 1);
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
    filterByType(documents) {
      if (this.filterType === "Primary")
        return documents.filter(
          items =>
            items.container.type === "Primary" || items.container.type === null
        );
      else if (this.filterType === "Supplementary")
        return documents.filter(
          items => items.container.type === "Supplementary"
        );
    },
    filterFiles(fileSelection, filterArea) {
      if (filterArea === 0) return fileSelection;
      else if (filterArea === 1)
        return filterByArea(fileSelection, "INSTRUCTION");
      else if (filterArea === 2)
        return filterByArea(fileSelection, "EXTENSION");
      else if (filterArea === 3) return filterByArea(fileSelection, "RESEARCH");
      else if (filterArea === 4) return filterByArea(fileSelection, "FACULTY");
      else if (filterArea === 5)
        return filterByArea(fileSelection, "LICENSURE EXAM");
      else if (filterArea === 6)
        return filterByArea(fileSelection, "CONSORTIA OR LINKAGE");
      else if (filterArea === 7) return filterByArea(fileSelection, "LIBRARY");
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
          this.statementList = searchByStatement(
            result.data.statements,
            this.search
          );
          if (this.statementList?.length) {
            this.year_1 = result.data.statements[0].year_1;
            this.year_2 = result.data.statements[0].year_2;
            this.year_3 = result.data.statements[0].year_3;
            this.attachmentList = result.data.documents;
          }
          this.unreadMessages = result.data.unread_message_count;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    searchContainerTable: _.debounce(function() {
      let user_id = this.user.id;
      let campus_id = this.campus.campus_id;
      this.$store
        .dispatch("showAllContainer", { user_id, campus_id })
        .then(result => {
          this.containerList = searchByTags(
            result.data.documents,
            this.search_container
          );
        });
    }, 500),
    searchDocumentTable: _.debounce(function(selectedDocuments) {
      this.$store
        .dispatch("showDocument", this.containerSelect.container.id)
        .then(result => {
          this.documentList = searchByDocument(
            result.data.documents,
            this.search_document
          );
          if (selectedDocuments?.length) {
            for (let x = 0; x < selectedDocuments.length; x++) {
              this.documentList = this.documentList.filter(
                item => item.id !== selectedDocuments[x].document_id
              );
            }
          }
          if (this.documentList?.length) {
            this.totalRows_document = this.documentList.length;
          }
        });
    }, 500),
    setScore() {
      this.remarks = [];
      this.graduate_performances = [];
      for (let i = 0; i < this.statementList.length; i++) {
        if (
          this.statementList[i].remark !== null ||
          this.statementList[i].remark_2 !== null
        ) {
          let id = this.statementList[i].item_id;
          let remark = this.statementList[i].remark;
          let remark_type = "before_compliance";
          let remark_2 = this.statementList[i].remark_2;
          let remark_2_type = "after_compliance";

          this.remarks.push({
            id,
            remark,
            remark_type,
            remark_2,
            remark_2_type
          });
        }
        if (
          this.statementList[i].rating_1 !== null ||
          this.statementList[i].rating_2 !== null ||
          this.statementList[i].rating_3 !== null ||
          this.year_1 !== null ||
          this.year_2 !== null ||
          this.year_3 !== null
        ) {
          let id = this.statementList[i].item_id;
          let year_1 = this.year_1;
          let rating_1 = this.statementList[i].rating_1;
          let year_2 = this.year_2;
          let rating_2 = this.statementList[i].rating_2;
          let year_3 = this.year_3;
          let rating_3 = this.statementList[i].rating_3;

          this.graduate_performances.push({
            id,
            year_1,
            rating_1,
            year_2,
            rating_2,
            year_3,
            rating_3
          });
        }
      }
      let assigned_user_id = this.assigned_user_id;
      let instrument_id = this.instrument.id;
      let score = this.area_rating;
      let remarks = this.remarks;
      let graduate_performances = this.graduate_performances;
      this.$isLoading(true);
      this.$store
        .dispatch("saveMeanScore", {
          assigned_user_id,
          instrument_id,
          score,
          remarks,
          graduate_performances
        })
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
    autoSaveScore: _.debounce(function() {
      this.remarks = [];
      this.graduate_performances = [];
      for (let i = 0; i < this.statementList.length; i++) {
        if (
          this.statementList[i].remark !== null ||
          this.statementList[i].remark_2 !== null
        ) {
          let id = this.statementList[i].item_id;
          let remark = this.statementList[i].remark;
          let remark_type = "before_compliance";
          let remark_2 = this.statementList[i].remark_2;
          let remark_2_type = "after_compliance";

          this.remarks.push({
            id,
            remark,
            remark_type,
            remark_2,
            remark_2_type
          });
        }
        if (
          this.statementList[i].rating_1 !== null ||
          this.statementList[i].rating_2 !== null ||
          this.statementList[i].rating_3 !== null ||
          this.year_1 !== null ||
          this.year_2 !== null ||
          this.year_3 !== null
        ) {
          let id = this.statementList[i].item_id;
          let year_1 = this.year_1;
          let rating_1 = this.statementList[i].rating_1;
          let year_2 = this.year_2;
          let rating_2 = this.statementList[i].rating_2;
          let year_3 = this.year_3;
          let rating_3 = this.statementList[i].rating_3;

          this.graduate_performances.push({
            id,
            year_1,
            rating_1,
            year_2,
            rating_2,
            year_3,
            rating_3
          });
        }
      }
      let assigned_user_id = this.assigned_user_id;
      let instrument_id = this.instrument.id;
      let score = this.area_rating;
      let remarks = this.remarks;
      let graduate_performances = this.graduate_performances;
      this.$store.dispatch("saveMeanScore", {
        assigned_user_id,
        instrument_id,
        score,
        remarks,
        graduate_performances
      });
    }, 1000),
    setDocuments(selectedDocuments) {
      this.$store
        .dispatch("showDocument", this.containerSelect.container.id)
        .then(result => {
          this.documentList = result.data.documents;
          if (selectedDocuments?.length) {
            for (let x = 0; x < selectedDocuments.length; x++) {
              this.documentList = this.documentList.filter(
                item => item.id !== selectedDocuments[x].document_id
              );
            }
          }
          if (this.documentList?.length) {
            this.totalRows_document = this.documentList.length;
          }
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    checkDepartment() {
      if (this.containerSelect) {
        if (this.containerSelect.type === "department") return true;
      }
    },
    formatDate(item) {
      return moment(item).format("ll");
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
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
    getId(item) {
      return item.toString();
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
      this.$router.push("/ManageParameters");
    },
    async changeParameter(item) {
      this.$isLoading(true);
      await this.$nextTick(() => {
        document.getElementById("create").scrollIntoView();
      });
      let assigned_user = this.taskList.find(x => x.transaction_id === item.id);
      await this.$store.commit("saveAssignedUser", assigned_user.id);
      await this.$store.commit("saveInstrument", item);
      let program_id = this.program.id;
      let transaction_id = this.instrument.id;
      this.$store
        .dispatch("showStatementDocument", { program_id, transaction_id })
        .then(result => {
          this.statementList = result.data.statements;
          this.unreadMessages = result.data.unread_message_count;
          if (this.statementList?.length) {
            this.year_1 = result.data.statements[0].year_1;
            this.year_2 = result.data.statements[0].year_2;
            this.year_3 = result.data.statements[0].year_3;
            this.area_rating = result.data.area_mean;
            this.attachmentList = result.data.documents;
          }
          this.$store
            .dispatch("showAreaSupportDocument", this.instrument.id)
            .then(result => {
              this.areaAttachmentList = result.data;
            })
            .catch(err => {
              this.snackbarText = err + ". Please contact the administrator";
              this.makeToast("Error", "danger");
            });
          this.$isLoading(false);
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }
  },
  async created() {
    this.$isLoading(true);
    let program_id = this.program.id;
    let transaction_id = this.instrument.id;
    await this.$store
      .dispatch("showStatementDocument", { program_id, transaction_id })
      .then(result => {
        this.statementList = result.data.statements;
        this.unreadMessages = result.data.unread_message_count;
        if (this.statementList?.length) {
          this.year_1 = result.data.statements[0].year_1;
          this.year_2 = result.data.statements[0].year_2;
          this.year_3 = result.data.statements[0].year_3;
          this.area_rating = result.data.area_mean;
          this.attachmentList = result.data.documents;
        }
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showAreaSupportDocument", this.instrument.id)
      .then(result => {
        this.areaAttachmentList = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    let user_id = this.user.id;
    await this.$store
      .dispatch("showTaskInstrument", { user_id, program_id })
      .then(result => {
        let filtered = [];
        for (let x = 0; x < result.data.areas.length; x++) {
          if (
            !filtered.find(
              item => item.area_number === result.data.areas[x].area_number
            )
          )
            filtered.push(result.data.areas[x]);
        }
        this.msiList = filtered.sort(this.sortArea);
        this.taskList = result.data.task;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
