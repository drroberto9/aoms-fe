<template>
  <div>
    <!-- Upload Template -->
    <b-modal id="app" v-model="createTemplate" size="lg" hide-footer>
      <template #modal-header>
        <h5>Upload Template</h5>
      </template>
      <form @submit.prevent="submit()">
        <b-form-group
          id="createTemplate-group-1"
          label="*Template Name:"
          label-for="createTemplate-1"
        >
          <b-form-input
            id="createTemplate-1"
            v-model="templateName"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="createTemplate-group-2"
          label="*Template:"
          label-for="createTemplate-2"
        >
          <b-form-file
            id="createTemplate-2"
            accept=".doc, .docx"
            v-model="document"
            required
          ></b-form-file>
        </b-form-group>

        <b-form-group
          id="createTemplate-group-3"
          label="Designation:"
          label-for="createTemplate-3"
        >
          <div v-for="(item, index) in tags" :key="index">
            <div class="md-layout" style="margin-bottom: 5px">
              <div class="md-layout-item">
                <b-form-select
                  v-if="!tags[index]"
                  id="createTemplate-3"
                  v-model="tags[index]"
                  :options="filterArea()"
                  required
                />
                <b-form-input
                  v-else
                  id="createTemplate-3"
                  v-model="tags[index]"
                  type="text"
                  disabled
                  style="background: white"
                ></b-form-input>
              </div>
              <div
                v-if="tags[index]"
                class="md-layout-item"
                style="max-width: max-content"
              >
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  @click="removeTagArray(index)"
                  ><md-icon>delete</md-icon></md-button
                >
              </div>
            </div>
          </div>
          <div>
            <md-button
              style="margin: 5px 0 0;"
              class="md-primary md-dense md-raised"
              @click="addTagArray()"
              >Add Designation</md-button
            >
          </div>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createTemplate = false"
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

    <!-- Add Tags -->
    <b-modal id="app" v-model="addTags" size="lg" hide-footer>
      <template #modal-header>
        <h5>Add Tags</h5>
      </template>
      <form @submit.prevent="addTag()">
        <b-form-group
          id="addTags-group-1"
          label="Designation:"
          label-for="addTags-1"
        >
          <div v-for="(item, index) in tags" :key="index">
            <div class="md-layout" style="margin-bottom: 5px">
              <div class="md-layout-item">
                <b-form-select
                  v-if="!tags[index]"
                  id="addTags-1"
                  v-model="tags[index]"
                  :options="filterAreaTags()"
                  required
                />
                <b-form-input
                  v-else
                  id="addTags-1"
                  v-model="tags[index]"
                  type="text"
                  disabled
                  style="background: white"
                ></b-form-input>
              </div>
              <div
                v-if="tags[index]"
                class="md-layout-item"
                style="max-width: max-content"
              >
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  @click="removeTagArray(index)"
                  ><md-icon>delete</md-icon></md-button
                >
              </div>
            </div>
          </div>
          <div>
            <md-button
              style="margin: 5px 0 0;"
              class="md-primary md-dense md-raised"
              @click="addTagArray()"
              >Add Designation</md-button
            >
          </div>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="addTags = false"
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

    <!-- Delete Template -->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete Template</h5>
      </template>
      Are you sure you want to delete this template?
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

    <!-- Delete Tag -->
    <b-modal id="app" v-model="deleteTagPrompt">
      <template #modal-header>
        <h5>Remove Tag</h5>
      </template>
      Are you sure you want to remove this tag?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteTagPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeTag();
              deleteTagPrompt = false;
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
          <h4>{{ campus.institution_name }}</h4>
          <h5>List of Document Templates</h5>
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
                placeholder="Search Intended Program"
                v-model="search"
                @input="searchOnTable"
                type="text"
              ></b-form-input>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                style="width: 200px; margin: 0"
                class="md-primary md-raised"
                @click="
                  (templateName = null),
                    (document = null),
                    (tags = [null]),
                    (createTemplate = true)
                "
                >Upload Template</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="templateList"
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
        <template #cell(template)="row">
          <b-link @click="downloadTemplate(row.item)">{{
            row.item.template_name
          }}</b-link>
        </template>

        <template #cell(tags)="row">
          <div class="md-layout">
            <div class="md-layout-item">
              <b-form-tags
                style="border: none"
                size="sm"
                add-on-change
                no-outer-focus
              >
                <template>
                  <div v-if="row.item.tags.length > 0">
                    <span v-for="tag in row.item.tags" :key="tag.tag">
                      <b-form-tag
                        @remove="
                          tagSelect = tag;
                          deleteTagPrompt = true;
                        "
                        variant="primary"
                        >{{ tag.tag }}</b-form-tag
                      >
                    </span>
                  </div>
                </template>
              </b-form-tags>
            </div>
            <div
              class="md-layout-item"
              style="max-width: max-content; margin-right: 5px;"
            >
              <md-button
                v-b-tooltip.hover
                title="Add Designated Area"
                class="md-icon-button md-dense md-primary"
                @click="
                  templateSelect = row.item;
                  tags = [null];
                  addTags = true;
                "
                ><md-icon>add_circle</md-icon></md-button
              >
            </div>
          </div>
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
              templateSelect = row.item;
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
import _ from "lodash";
import moment from "moment";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchTemplate = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.template_name).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "ManageDocumentTemplate",
  data() {
    return {
      sortBy: "id",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "template", label: "Template", sortable: true },
        {
          key: "tags",
          label: "Tags"
        },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      templateList: [],
      templateSelect: null,
      templateName: null,
      document: null,
      tags: [null],
      tagSelect: null,
      templateOptions: [],
      search: null,
      createTemplate: false,
      deletePrompt: false,
      addTags: false,
      deleteTagPrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      campus: "campus"
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
    submit() {
      let id = this.campus.campus_id;
      let file = this.document;
      let template_name = this.templateName;
      let tags = this.tags;
      this.$isLoading(true);
      this.$store
        .dispatch("addTemplate", { id, file, template_name, tags })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showTemplate", this.campus.campus_id)
              .then(result => {
                this.templateList = result.data;
                if (this.templateList?.length)
                  this.totalRows = this.templateList.length;
              });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.createTemplate = false;
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
    downloadTemplate(template) {
      this.$isLoading(true);
      this.$store
        .dispatch("downloadTemplate", template.id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = window.URL.createObjectURL(new Blob([result.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", template.template_name + ".docx");
          document.body.appendChild(fileLink);

          fileLink.click();
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
        .dispatch("deleteTemplate", this.templateSelect.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.templateList.findIndex(
              data => data.id === this.templateSelect.id
            );
            this.templateList.splice(index, 1);
            if (this.templateList?.length)
              this.totalRows = this.templateList.length;
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
    addTag() {
      let id = this.templateSelect.id;
      let tags = this.tags;
      this.$isLoading(true);
      this.$store
        .dispatch("addTemplateTag", { id, tags })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showTemplate", this.campus.campus_id)
              .then(result => {
                this.templateList = result.data;
                if (this.templateList?.length)
                  this.totalRows = this.templateList.length;
              });
            this.addTags = false;
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.createTemplate = false;
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
    removeTag() {
      this.$isLoading(true);
      this.$store
        .dispatch("removeTemplateTag", this.tagSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showTemplate", this.campus.campus_id)
              .then(result => {
                this.templateList = result.data;
                if (this.templateList?.length)
                  this.totalRows = this.templateList.length;
              });
            this.deleteTagPrompt = false;
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
    filterArea() {
      let selection = this.templateOptions;
      if (this.tags?.length) {
        for (let y = 0; y < this.tags.length; y++) {
          selection = selection.filter(data => this.tags[y] !== data);
        }
      }
      return selection;
    },
    filterAreaTags() {
      let selection = this.templateOptions;

      if (this.templateSelect) {
        for (let x = 0; x < this.templateSelect.tags.length; x++) {
          selection = selection.filter(
            data => this.templateSelect.tags[x].tag !== data
          );
        }
      }
      if (this.tags?.length) {
        for (let y = 0; y < this.tags.length; y++) {
          selection = selection.filter(data => this.tags[y] !== data);
        }
      }
      return selection;
    },
    addTagArray() {
      this.tags.push(null);
    },
    removeTagArray(counter) {
      this.tags.splice(counter, 1);
    },
    formatDate(item) {
      return moment(item).format("llll");
    },
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showTemplate", this.campus.campus_id)
        .then(result => {
          this.templateList = searchTemplate(result.data, this.search);
          if (this.templateList?.length)
            this.totalRows = this.templateList.length;
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
      .dispatch("showTemplate", this.campus.campus_id)
      .then(result => {
        this.templateList = result.data;
        if (this.templateList?.length)
          this.totalRows = this.templateList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showTagOption")
      .then(result => {
        this.templateOptions = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
