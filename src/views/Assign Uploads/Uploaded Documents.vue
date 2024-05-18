<template>
  <div>
    <!--Upload File-->
    <b-modal id="app" v-model="uploadFile" size="lg" hide-footer>
      <template #modal-header>
        <h5>Upload File</h5>
      </template>
      <form @submit.prevent="fileUpload">
        <div style="margin-bottom: 10px">
          <b-form-file
            v-model="selectedDocuments[0]"
            multiple
            required
            @input="selectDocument()"
            accept="image/*, .pdf"
          ></b-form-file>
        </div>

        <div v-if="documents[0]">
          <div v-for="(item, index) in documents[0]" :key="index">
            <div class="md-layout" style="margin-bottom: 5px">
              <div class="md-layout-item">
                <b-form-input
                  v-model="item.name"
                  type="text"
                  disabled
                  style="background: white"
                ></b-form-input>
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  @click="removeDocument(index)"
                  ><md-icon>delete</md-icon></md-button
                >
              </div>
            </div>
          </div>
        </div>
        <!--        <div>-->
        <!--          <md-button-->
        <!--            style="margin: 5px 0 0;"-->
        <!--            class="md-primary md-dense md-raised"-->
        <!--            @click="addDocument()"-->
        <!--            >Add Document</md-button-->
        <!--          >-->
        <!--        </div>-->

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="uploadFile = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Submit</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Upload Link-->
    <b-modal id="app" v-model="uploadLink" size="lg" hide-footer>
      <template #modal-header>
        <h5>Upload Link</h5>
      </template>
      <form @submit.prevent="linkUpload">
        <div v-for="(item, index) in files" :key="index">
          <div class="md-layout" style="margin-bottom: 10px">
            <div class="md-layout-item">
              <b-form-input
                style="margin-bottom: 5px"
                id="uploadLink-1"
                v-model="files[index].filename"
                type="text"
                placeholder="Title"
                required
              ></b-form-input>

              <b-form-input
                id="uploadLink-2"
                v-model="files[index].link"
                type="text"
                placeholder="Link"
                required
              ></b-form-input>
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-dense md-accent"
                @click="removeFile(index)"
                ><md-icon>delete</md-icon></md-button
              >
            </div>
          </div>
        </div>
        <div>
          <md-button
            style="margin: 5px 0 0;"
            class="md-primary md-dense md-raised"
            @click="addFile()"
            >Add Link</md-button
          >
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="uploadLink = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Submit</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Delete Prompt-->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Remove Document</h5>
      </template>
      Are you sure you want to remove this document?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deletePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              remove();
              deletePrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ office.office_name }}</h4>
          <h5>{{ container.container_name }}</h5>
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
                placeholder="Search file"
                v-model="search"
                @input="searchOnTable"
                type="text"
              ></b-form-input>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: max-content; margin-right: 5px"
            >
              <md-button
                style="width: 200px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  documents = [null];
                  selectedDocuments = [null];
                  year = null;
                  uploadFile = true;
                "
                >Upload Documents</md-button
              >
            </div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                style="width: 200px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  files = [{ filename: null, link: null }];
                  year = null;
                  uploadLink = true;
                "
                >Upload Link</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="documentList"
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
        <template #cell(document_name)="row">
          <b-link @click="showFile(row.item)">{{ row.value }}</b-link>
        </template>

        <template #cell(uploaded_by)="row">
          {{ concatName(row.item) }}
        </template>

        <template #cell(updated_at)="row">
          {{ formatDate(row.value) }}
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-dense md-accent"
            @click="
              documentSelect = row.item;
              deletePrompt = true;
            "
            ><md-icon>delete</md-icon></md-button
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
import moment from "moment";
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.document_name).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "TableSearch",
  data() {
    return {
      sortBy: "id",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        {
          key: "document_name",
          label: "File",
          sortable: true
        },
        { key: "uploaded_by", label: "Uploaded By", sortable: true },
        { key: "updated_at", label: "Date Uploaded", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      optionsArea: [
        { value: null, text: "" },
        { value: "Area I", text: "Area I" },
        { value: "Area II", text: "Area II" },
        { value: "Area III", text: "Area III" },
        { value: "Area IV", text: "Area IV" },
        { value: "Area V", text: "Area V" },
        { value: "Area VI", text: "Area VI" },
        { value: "Area VII", text: "Area VII" },
        { value: "Area VIII", text: "Area VIII" },
        { value: "Area IX", text: "Area IX" },
        { value: "Area X", text: "Area X" }
      ],
      optionsMonth: [
        { value: "January", text: "January" },
        { value: "February", text: "February" },
        { value: "March", text: "March" },
        { value: "April", text: "April" },
        { value: "May", text: "May" },
        { value: "June", text: "June" },
        { value: "July", text: "July" },
        { value: "August", text: "August" },
        { value: "September", text: "September" },
        { value: "October", text: "October" },
        { value: "November", text: "November" },
        { value: "December", text: "December" }
      ],
      documentList: [{}],
      documentSelect: {},
      documents: [null],
      selectedDocuments: [null],
      files: [
        {
          filename: null,
          link: null
        }
      ],
      area: null,
      month: null,
      year: null,
      search: null,
      uploadFile: false,
      uploadLink: false,
      deletePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      campus: "campus",
      office: "office",
      container: "container"
    }),
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - parseInt(this.getBaseYear(10)) },
        (value, index) => parseInt(this.getBaseYear(9)) + index
      );
    }
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
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showDocument", this.container.id)
        .then(result => {
          this.documentList = searchByName(result.data.documents, this.search);
          if (this.documentList?.length)
            this.totalRows = this.documentList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    fileUpload() {
      this.$isLoading(true);
      let user_id = this.user.id;
      let container_id = this.container.id;
      let type = "file";
      let documents = this.documents[0];
      this.$store
        .dispatch("uploadDocument", {
          user_id,
          container_id,
          type,
          documents
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showDocument", this.container.id)
              .then(result => {
                this.documentList = result.data.documents;
                this.totalRows = this.documentList.length;
              });
            this.uploadFile = false;
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
    linkUpload() {
      this.$isLoading(true);
      let user_id = this.user.id;
      let container_id = this.container.id;
      let type = "link";
      let file = this.files;
      this.$store
        .dispatch("uploadLink", {
          user_id,
          container_id,
          type,
          file
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showDocument", this.container.id)
              .then(result => {
                this.documentList = result.data.documents;
                this.totalRows = this.documentList.length;
              });
            this.uploadLink = false;
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
    downloadLetter(documentSelect) {
      this.$isLoading(true);
      let type = null;
      this.$store
        .dispatch("documentType", documentSelect.id)
        .then(result => {
          type = result.data.type;
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
      this.$store
        .dispatch("documentViewFile", documentSelect.id)
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
    remove() {
      this.$isLoading(true);
      this.$store
        .dispatch("removeDocument", this.documentSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showDocument", this.container.id)
              .then(result => {
                this.documentList = result.data.documents;
                this.totalRows = this.documentList.length;
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
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
    addDocument() {
      if (this.documents[this.documents.length - 1] !== null) {
        this.documents.push(null);
      }
    },
    removeDocument(counter) {
      this.documents[0].splice(counter, 1);
    },
    addFile() {
      if (this.files[this.files.length - 1].link !== null) {
        this.files.push({ filename: null, link: null });
      }
    },
    removeFile(counter) {
      this.files.splice(counter, 1);
    },
    showFile(item) {
      if (item.type === "link") window.open(item.link);
      if (item.type === "file") this.downloadLetter(item);
    },
    formatDate(item) {
      return moment(item).format("ll");
    },
    getBaseYear(year) {
      return moment()
        .subtract(year, "years")
        .format("YYYY");
    },
    selectDocument() {
      if (!this.documents[0]) this.documents[0] = this.selectedDocuments[0];
      else this.documents[0].push(...this.selectedDocuments[0]);
      this.selectedDocuments = [null];
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showDocument", this.container.id)
      .then(result => {
        this.documentList = result.data.documents;
        this.totalRows = this.documentList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
