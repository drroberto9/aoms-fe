<template>
  <div>
    <!--Assign Upload-->
    <b-modal id="app" v-model="assignUpload" size="xl" hide-footer>
      <template #modal-header>
        <h5>Add Folder</h5>
      </template>
      <form @submit.prevent="makeDocumentList">
        <div v-for="(item, index) in list" :key="index">
          <div class="md-layout" style="margin-bottom: 5px">
            <div class="md-layout-item">
              <h5>Folder {{ index + 1 }}</h5>
            </div>
            <div class="md-layout-item" style="max-width: min-content">
              <md-button
                class="md-icon-button md-dense md-accent"
                @click="removeList(index)"
                ><md-icon>cancel</md-icon></md-button
              >
            </div>
          </div>
          <div class="md-layout" style="margin-bottom: 5px">
            <div class="md-layout-item">
              <b-form-group
                id="assignUpload-group-1"
                label="*Folder Title:"
                label-for="assignUpload-1"
              >
                <b-form-input
                  id="assignUpload-1"
                  v-model="list[index].document_title"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
            </div>
            <div
              class="md-layout-item"
              style="max-width: 200px; margin-left: 5px;"
            >
              <b-form-group
                id="assignUpload-group-2"
                label="Designation:"
                label-for="assignUpload-2"
              >
                <div
                  v-for="(itemArea, indexArea) in item.area"
                  :key="indexArea"
                >
                  <div class="md-layout" style="margin-bottom: 5px">
                    <div class="md-layout-item">
                      <b-form-select
                        id="assignUpload-2"
                        v-model="list[index].area[indexArea]"
                        :options="
                          filterArea(
                            item.area,
                            list[index].area[indexArea],
                            optionsArea
                          )
                        "
                        required
                      />
                    </div>
                    <div class="md-layout-item" style="max-width: max-content">
                      <md-button
                        v-b-tooltip.hover
                        title="Delete"
                        class="md-icon-button md-dense md-accent"
                        @click="removeArea(index, indexArea)"
                        ><md-icon>delete</md-icon></md-button
                      >
                    </div>
                  </div>
                </div>
                <div>
                  <md-button
                    style="margin: 5px 0 0;"
                    class="md-primary md-dense md-raised"
                    @click="addArea(index)"
                    >Add Designation</md-button
                  >
                </div>
              </b-form-group>
            </div>
          </div>
        </div>

        <md-button
          style="margin: 5px 0 15px;"
          class="md-primary md-raised"
          @click="addList()"
          >Add Folder</md-button
        >

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="assignUpload = false"
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

    <!--Dialog Edit-->
    <b-modal id="app" v-model="editDocument" hide-footer>
      <template #modal-header>
        <h5>Edit Folder</h5>
      </template>
      <form @submit.prevent="edit">
        <b-form-group
          id="editDocument-group-1"
          label="*Folder Title:"
          label-for="editDocument-1"
        >
          <b-form-input
            id="editDocument-1"
            v-model="container_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editDocument = false"
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

    <!--Change Prompt-->
    <b-modal id="app" v-model="changePrompt">
      <template #modal-header>
        <h5>Change Folder</h5>
      </template>
      Are you sure you want to change this folder to
      {{ container_type === "Primary" ? "Required" : "Supplementary" }}?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="changePrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              edit();
              changePrompt = false;
            "
            >Change</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Delete Prompt-->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete User</h5>
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

    <!--Add Tag-->
    <b-modal id="app" v-model="addTags" size="lg" hide-footer>
      <template #modal-header>
        <h5>Add Tags</h5>
      </template>
      <form @submit.prevent="submitTags">
        <b-form-group
          id="addTags-group-1"
          label="Designation:"
          label-for="addTags-1"
        >
          <div
            v-for="(item, index) in oldTags.filter(item =>
              item.tag.includes('Area' || 'area')
            )
              ? oldTags.filter(item => item.tag.includes('Area' || 'area'))
              : []"
            :key="index"
            style="margin-bottom: 5px"
          >
            <b-form-input
              v-model="item.tag"
              type="text"
              disabled
            ></b-form-input>
          </div>
          <div v-for="(item, index) in area" :key="index">
            <div class="md-layout" style="margin-bottom: 5px">
              <div class="md-layout-item">
                <b-form-select
                  v-model="area[index]"
                  :options="filterArea(tags, area[index], optionsArea)"
                  required
                />
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  @click="removeTagArea(index, area[index])"
                  ><md-icon>delete</md-icon></md-button
                >
              </div>
            </div>
          </div>
          <div>
            <md-button
              style="margin: 5px 0 0;"
              class="md-primary md-dense md-raised"
              @click="addTagArea()"
              >Add Designation</md-button
            >
          </div>
        </b-form-group>

        <b-form-group id="addTags-group-1" label="Tags:" label-for="addTags-1">
          <div
            v-for="(item, index) in oldTags.filter(
              item => !item.tag.includes('Area' || 'area')
            )
              ? oldTags.filter(item => !item.tag.includes('Area' || 'area'))
              : []"
            :key="index"
            style="margin-bottom: 5px"
          >
            <b-form-input
              v-model="item.tag"
              type="text"
              disabled
            ></b-form-input>
          </div>
          <div v-for="(item, index) in tag" :key="index">
            <div class="md-layout" style="margin-bottom: 5px">
              <div class="md-layout-item">
                <b-form-input
                  id="addTags-1"
                  v-model="tag[index]"
                  type="text"
                  required
                ></b-form-input>
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  @click="removeTag(index)"
                  ><md-icon>delete</md-icon></md-button
                >
              </div>
            </div>
          </div>
          <div>
            <md-button
              style="margin: 5px 0 0;"
              class="md-primary md-dense md-raised"
              @click="addTag()"
              >Add Tag</md-button
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

    <!--Delete Tag Prompt-->
    <b-modal id="app" v-model="deleteTagPrompt">
      <template #modal-header>
        <h5>Delete Tag</h5>
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
            @click="removeTags()"
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <md-tabs :md-active-tab="tabSelect" md-elevation="1" class="md-primary">
        <!--Primary-->
        <md-tab id="office-uploads-0" md-label="Required" style="padding: 0">
          <br />
          <div class="md-layout" style="margin-bottom: 15px">
            <div class="md-layout-item">
              <h4>{{ office.office_name }}</h4>
              <h5>{{ campus.campus_name }}</h5>
              <b-dropdown
                v-if="officeList.length > 1"
                text="Change Office"
                variant="primary"
              >
                <div v-for="(item, index) in officeList" :key="index">
                  <b-dropdown-item
                    @click="
                      $store.commit('saveOffice', item);
                      changeOffice();
                    "
                    >{{ item.office_name }}</b-dropdown-item
                  >
                </div>
              </b-dropdown>
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
                    placeholder="Search folder / tags"
                    v-model="search"
                    @input="searchOnTable"
                    type="text"
                  ></b-form-input>
                </div>
              </div>
              <!--              <div class="md-layout">-->
              <!--                <div class="md-layout-item"></div>-->
              <!--                <div class="md-layout-item" style="max-width: max-content">-->
              <!--                  <md-button-->
              <!--                    style="width: 200px; margin: 0;"-->
              <!--                    class="md-primary md-raised"-->
              <!--                    @click="-->
              <!--                      list = [-->
              <!--                        {-->
              <!--                          document_title: null,-->
              <!--                          area: [null]-->
              <!--                        }-->
              <!--                      ];-->
              <!--                      assignUpload = true;-->
              <!--                    "-->
              <!--                    >Add Folder</md-button-->
              <!--                  >-->
              <!--                </div>-->
              <!--              </div>-->
            </div>
          </div>

          <b-table
            :items="setDocumentList('Primary')"
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
            <template #cell(id)="row">
              {{ row.item.container.id }}
            </template>

            <template #cell(container)="row">
              {{ row.item.container.container_name }}
            </template>

            <template #cell(tags)="row">
              <div class="md-layout" v-if="!tagEdit[row.index].status">
                <div class="md-layout-item">
                  <span v-for="(item, index) in row.item.tags" :key="index">
                    {{ item.tag }}
                    <a v-if="row.item.tags[index + 1]">,</a>
                  </span>
                </div>
                <div
                  class="md-layout-item"
                  style="max-width: max-content; margin-right: 5px;"
                >
                  <md-button
                    v-b-tooltip.hover
                    title="Edit"
                    class="md-icon-button md-dense md-primary"
                    @click="tagEdit[row.index].status = true"
                    ><md-icon>edit</md-icon></md-button
                  >
                </div>
              </div>
              <div class="md-layout" v-if="tagEdit[row.index].status">
                <div class="md-layout-item">
                  <span v-for="(item, index) in row.item.tags" :key="index">
                    {{ item.tag }}
                    <md-button
                      v-b-tooltip.hover
                      title="Remove Tag"
                      class="md-icon-button md-dense md-accent"
                      @click="
                        tagSelect = item;
                        deleteTagPrompt = true;
                      "
                      ><md-icon>close</md-icon></md-button
                    >
                    <a v-if="row.item.tags[index + 1]">,</a>
                  </span>
                </div>
                <div
                  class="md-layout-item"
                  style="max-width: max-content; margin-right: 5px;"
                >
                  <md-button
                    v-b-tooltip.hover
                    title="Add Designation"
                    class="md-icon-button md-dense md-primary"
                    @click="
                      documentSelect = row.item.container;
                      oldTags = row.item.tags;
                      setTags(row.item.tags);
                      area = [];
                      tag = [];
                      addTags = true;
                    "
                    ><md-icon>add_circle</md-icon></md-button
                  >
                  <md-button
                    v-b-tooltip.hover
                    title="Close Edit"
                    class="md-icon-button md-dense md-accent"
                    @click="tagEdit[row.index].status = false"
                    ><md-icon>edit</md-icon></md-button
                  >
                </div>
              </div>
            </template>

            <!--        <template #cell(status)="row">-->
            <!--          <span v-if="row.item.link !== 'none'" style="color: green"-->
            <!--            >Complete</span-->
            <!--          >-->
            <!--          <span v-else style="color: red">Incomplete</span>-->
            <!--        </template>-->

            <template #cell(actions)="row">
              <md-button
                v-b-tooltip.hover
                title="Select"
                class="md-icon-button md-dense md-primary"
                @click="select(row.item.container, 'office-uploads-0')"
                style="outline: 0"
                ><md-icon>forward</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Edit"
                class="md-icon-button md-dense md-primary"
                @click="
                  documentSelect = row.item.container;
                  container_name = row.item.container.container_name;
                  container_type = row.item.container.type;
                  editDocument = true;
                "
                ><md-icon>edit</md-icon></md-button
              >
              <md-button
                v-if="filterLibrary()"
                v-b-tooltip.hover
                title="Change to Supplemental"
                class="md-icon-button md-dense md-primary"
                @click="
                  documentSelect = row.item.container;
                  container_name = row.item.container.container_name;
                  container_type = 'Supplementary';
                  changePrompt = true;
                "
                ><md-icon>swap_horiz</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-dense md-accent"
                @click="
                  documentSelect = row.item.container;
                  deletePrompt = true;
                "
                ><md-icon>delete</md-icon></md-button
              >
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows_Primary"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-auto md-elevation-2"
          ></b-pagination>
        </md-tab>

        <!--Supplementary-->
        <md-tab
          id="office-uploads-1"
          md-label="Supplemental"
          style="padding: 0"
        >
          <br />
          <div class="md-layout" style="margin-bottom: 15px">
            <div class="md-layout-item">
              <h4>{{ office.office_name }}</h4>
              <h5>{{ campus.campus_name }}</h5>
              <b-dropdown
                v-if="officeList.length > 1"
                text="Change Office"
                variant="primary"
              >
                <div v-for="(item, index) in officeList" :key="index">
                  <b-dropdown-item
                    @click="
                      $store.commit('saveOffice', item);
                      changeOffice();
                    "
                    >{{ item.office_name }}</b-dropdown-item
                  >
                </div>
              </b-dropdown>
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
                    placeholder="Search folder / tags"
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
                    style="width: 200px; margin: 0;"
                    class="md-primary md-raised"
                    @click="
                      list = [
                        {
                          document_title: null,
                          area: []
                        }
                      ];
                      assignUpload = true;
                    "
                    >New Folder</md-button
                  >
                </div>
              </div>
            </div>
          </div>

          <b-table
            :items="setDocumentList('Supplementary')"
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
            <template #cell(id)="row">
              {{ row.item.container.id }}
            </template>

            <template #cell(container)="row">
              {{ row.item.container.container_name }}
            </template>

            <template #cell(tags)="row">
              <div class="md-layout" v-if="!tagEdit[row.index].status">
                <div class="md-layout-item">
                  <span v-for="(item, index) in row.item.tags" :key="index">
                    {{ item.tag }}
                    <a v-if="row.item.tags[index + 1]">,</a>
                  </span>
                </div>
                <div
                  class="md-layout-item"
                  style="max-width: max-content; margin-right: 5px;"
                >
                  <md-button
                    v-b-tooltip.hover
                    title="Edit"
                    class="md-icon-button md-dense md-primary"
                    @click="tagEdit[row.index].status = true"
                    ><md-icon>edit</md-icon></md-button
                  >
                </div>
              </div>
              <div class="md-layout" v-if="tagEdit[row.index].status">
                <div class="md-layout-item">
                  <span v-for="(item, index) in row.item.tags" :key="index">
                    {{ item.tag }}
                    <md-button
                      v-b-tooltip.hover
                      title="Remove Tag"
                      class="md-icon-button md-dense md-accent"
                      @click="
                        tagSelect = item;
                        deleteTagPrompt = true;
                      "
                      ><md-icon>close</md-icon></md-button
                    >
                    <a v-if="row.item.tags[index + 1]">,</a>
                  </span>
                </div>
                <div
                  class="md-layout-item"
                  style="max-width: max-content; margin-right: 5px;"
                >
                  <md-button
                    v-b-tooltip.hover
                    title="Add Designation"
                    class="md-icon-button md-dense md-primary"
                    @click="
                      documentSelect = row.item.container;
                      oldTags = row.item.tags;
                      setTags(row.item.tags);
                      area = [];
                      tag = [];
                      addTags = true;
                    "
                    ><md-icon>add_circle</md-icon></md-button
                  >
                  <md-button
                    v-b-tooltip.hover
                    title="Close Edit"
                    class="md-icon-button md-dense md-accent"
                    @click="tagEdit[row.index].status = false"
                    ><md-icon>edit</md-icon></md-button
                  >
                </div>
              </div>
            </template>

            <!--        <template #cell(status)="row">-->
            <!--          <span v-if="row.item.link !== 'none'" style="color: green"-->
            <!--            >Complete</span-->
            <!--          >-->
            <!--          <span v-else style="color: red">Incomplete</span>-->
            <!--        </template>-->

            <template #cell(actions)="row">
              <md-button
                v-b-tooltip.hover
                title="Select"
                class="md-icon-button md-dense md-primary"
                @click="select(row.item.container, 'office-uploads-1')"
                style="outline: 0"
                ><md-icon>forward</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Edit"
                class="md-icon-button md-dense md-primary"
                @click="
                  documentSelect = row.item.container;
                  container_name = row.item.container.container_name;
                  container_type = row.item.container.type;
                  editDocument = true;
                "
                ><md-icon>edit</md-icon></md-button
              >
              <md-button
                v-if="filterLibrary()"
                v-b-tooltip.hover
                title="Change to Required"
                class="md-icon-button md-dense md-primary"
                @click="
                  documentSelect = row.item.container;
                  container_name = row.item.container.container_name;
                  container_type = 'Primary';
                  changePrompt = true;
                "
                ><md-icon>swap_horiz</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-dense md-accent"
                @click="
                  documentSelect = row.item.container;
                  deletePrompt = true;
                "
                ><md-icon>delete</md-icon></md-button
              >
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows_Supplementary"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-auto md-elevation-2"
          ></b-pagination>
        </md-tab>
      </md-tabs>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (documents, search) => {
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

export default {
  name: "TableSearch",
  data() {
    return {
      sortBy: "id",
      sortDesc: false,
      totalRows_Primary: 1,
      totalRows_Supplementary: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        {
          key: "container",
          label: "Folder Name",
          sortable: true
        },
        {
          key: "tags",
          label: "Tags"
        },
        {
          key: "number",
          label: "No. of Files"
        },
        { key: "actions", label: "Actions", thStyle: { width: "220px" } }
      ],
      optionsArea: [
        { value: null, text: "" },
        {
          value: "Area I",
          text: "Area I: Vision, Mission, Goals and Objectives"
        },
        { value: "Area II", text: "Area II: Faculty" },
        {
          value: "Area III",
          text: "Area III: Curriculum and Instruction"
        },
        {
          value: "Area IV",
          text: "Area IV: Support to Students"
        },
        { value: "Area V", text: "Area V: Research" },
        {
          value: "Area VI",
          text: "Area VI: Extension and Community Involvement"
        },
        { value: "Area VII", text: "Area VII: Library" },
        {
          value: "Area VIII",
          text: "Area VIII: Physical Plant and Facilities"
        },
        { value: "Area IX", text: "Area IX: Laboratories" },
        { value: "Area X", text: "Area X: Administration" }
      ],
      documentList: [],
      documentSelect: null,
      officeList: [],
      list: [
        {
          document_title: null,
          area: [null]
        }
      ],
      search: null,
      tag: [],
      area: [],
      tags: [],
      oldTags: [],
      container_name: null,
      container_type: null,
      tagEdit: [{ status: false }],
      addTags: false,
      deleteTagPrompt: false,
      assignUpload: false,
      editDocument: false,
      changePrompt: false,
      deletePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      campus: "campus",
      offices: "offices",
      office: "office",
      tabSelect: "tabSelect"
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
    makeDocumentList() {
      let office_id = this.office.office_id;
      let list = this.list;
      let type = "Supplementary";
      this.$isLoading(true);
      this.$store
        .dispatch("makeDocumentList", { office_id, list, type })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showContainer", this.office.office_id)
              .then(result => {
                this.documentList = result.data.documents;
                this.setTagEdit();
              });
            this.assignUpload = false;
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
    edit() {
      let container_id = this.documentSelect.id;
      let container_name = this.container_name;
      let type = this.container_type;
      this.$isLoading(true);
      this.$store
        .dispatch("editContainer", { container_id, container_name, type })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showContainer", this.office.office_id)
              .then(result => {
                this.documentList = result.data.documents;
                this.setTagEdit();
              });
            this.editDocument = false;
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
    remove() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteContainer", this.documentSelect.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.documentList.findIndex(
              data => data.id === this.documentSelect.id
            );
            this.documentList.splice(index, 1);
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
    submitTags() {
      this.$isLoading(true);
      let id = this.documentSelect.id;
      let tag = this.tag.concat(this.area);
      this.$store
        .dispatch("addTag", { id, tag })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showContainer", this.office.office_id)
              .then(result => {
                this.documentList = result.data.documents;
                this.setTagEdit();
              });
            this.addTags = false;
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
    removeTags() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteTag", this.tagSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showContainer", this.office.office_id)
              .then(result => {
                this.documentList = result.data.documents;
                this.setTagEdit();
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
    showFile(item) {
      if (item.type === "link") window.open(item.link);
      if (item.type === "file") this.downloadLetter();
    },
    downloadLetter() {
      this.$isLoading(true);
      this.$store
        .dispatch("documentViewFile", this.documentSelect.id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = window.URL.createObjectURL(new Blob([result.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", this.documentSelect.link);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showContainer", this.office.office_id)
        .then(result => {
          this.documentList = searchByName(result.data.documents, this.search);
          this.setTagEdit();
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    filterArea(area, thisArea, options) {
      if (area?.length) {
        for (let x = 0; x < area.length; x++)
          options = options.filter(
            data => data.value !== area[x] || data.value === thisArea
          );
      }
      return options;
    },
    filterLibrary() {
      if (toLower(this.office.office_name).includes("librar")) return true;
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
    addList() {
      // if (this.list[this.list.length - 1].document_title !== null)
      this.list.push({
        document_title: null,
        area: []
      });
    },
    removeList(counter) {
      this.list.splice(counter, 1);
    },
    addArea(index) {
      // if (this.list[index].area[this.area.length - 1] !== null)
      this.list[index].area.push(null);
    },
    removeArea(index, counter) {
      this.list[index].area.splice(counter, 1);
    },
    addTagArea() {
      if (this.area[this.area.length - 1] !== null) {
        this.tags.push(this.area[this.area.length - 1]);
        this.area.push(null);
      }
    },
    removeTagArea(counter, tag) {
      let index = this.tags.findIndex(data => data === tag);
      this.tags.splice(index, 1);
      this.area.splice(counter, 1);
    },
    addTag() {
      if (this.tag[this.tag.length - 1] !== null) {
        this.tag.push(null);
      }
    },
    removeTag(counter) {
      this.tag.splice(counter, 1);
    },
    setTags(oldTags) {
      this.tags = [];
      if (oldTags?.length) {
        for (let x = 0; x < oldTags.length; x++) {
          this.tags.push(oldTags[x].tag);
        }
      }
    },
    select(item, tab) {
      this.$store.commit("saveContainer", item);
      this.$store.commit("saveUploader", 0);
      this.$store.commit("saveTabSelect", tab);
      this.$router.push("/UploadedDocuments");
    },
    setTagEdit() {
      if (this.documentList?.length) {
        for (let x = 0; x < this.documentList.length; x++) {
          let status = false;
          this.tagEdit.push({ status });
        }
      }
    },
    setDocumentList(type) {
      let documentList = [];
      if (type === "Primary") {
        documentList = this.documentList.filter(
          data =>
            data.container.type === "Primary" || data.container.type === null
        );
        if (documentList?.length) this.totalRows_Primary = documentList.length;
      } else if (type === "Supplementary") {
        documentList = this.documentList.filter(
          data => data.container.type === "Supplementary"
        );
        if (documentList?.length)
          this.totalRows_Supplementary = documentList.length;
      }
      return documentList;
    },
    changeOffice() {
      this.$isLoading(true);
      this.$store
        .dispatch("showContainer", this.office.office_id)
        .then(result => {
          this.documentList = result.data.documents;
          this.setTagEdit();
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
      this.$isLoading(false);
    }
  },
  async created() {
    if (
      this.tabSelect !== "office-uploads-0" &&
      this.tabSelect !== "office-uploads-1"
    )
      this.$store.commit("saveTabSelect", "office-uploads-0");
    this.officeList = this.offices.filter(
      data => data.role_id === 3 || data.role_id === 4
    );
    if (this.officeList?.length)
      await this.$store.commit("saveOffice", this.officeList[0]);

    this.$isLoading(true);
    await this.$store
      .dispatch("showContainer", this.office.office_id)
      .then(result => {
        this.documentList = result.data.documents;
        this.setTagEdit();
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
