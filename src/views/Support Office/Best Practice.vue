<template>
  <div>
    <!--Dialog Create-->
    <b-modal id="app" v-model="createBestPractice" size="xl" hide-footer>
      <template #modal-header>
        <h5>Create Best Practice</h5>
      </template>
      <form @submit.prevent="submit">
        <div v-for="(item, index) in best_practices" :key="index">
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
                id="createBestPractice-group-1"
                label="*Best Practice:"
                label-for="createBestPractice-1"
              >
                <b-form-textarea
                  id="createBestPractice-1"
                  v-model="best_practices[index].best_practice"
                  rows="2"
                  max-rows="4"
                  required
                ></b-form-textarea>
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
                  v-for="(itemArea, indexArea) in item.tags"
                  :key="indexArea"
                >
                  <div class="md-layout" style="margin-bottom: 5px">
                    <div class="md-layout-item">
                      <b-form-select
                        id="assignUpload-2"
                        v-model="best_practices[index].tags[indexArea]"
                        :options="
                          filterArea(
                            item.tags,
                            best_practices[index].tags[indexArea],
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
          >Add Best Practice</md-button
        >

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createBestPractice = false"
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
    <b-modal id="app" v-model="editBestPractice" hide-footer>
      <template #modal-header>
        <h5>Edit Best Practice</h5>
      </template>
      <form @submit.prevent="edit">
        <b-form-group
          id="editBestPractice-group-1"
          label="*Best Practice:"
          label-for="editBestPractice-1"
        >
          <b-form-textarea
            id="editBestPractice-1"
            v-model="best_practice"
            rows="2"
            max-rows="4"
            required
          ></b-form-textarea>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editBestPractice = false"
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

    <!--Delete Best Practice-->
    <b-modal id="app" v-model="deleteBestPractice">
      <template #modal-header>
        <h5>Delete Best Practice</h5>
      </template>
      Are you sure you want to remove this best practice?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteBestPractice = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              remove();
              deleteBestPractice = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Dialog Container-->
    <b-modal id="app" v-model="containerDialog" size="xl" hide-footer>
      <template #modal-header>
        <h5>Folders</h5>
      </template>

      <div class="md-layout">
        <div class="md-layout-item">
          <h6>Best Practice:</h6>
          {{ bestPracticeSelect.best_practice }}
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="min-width: 65px">
              <b-form-select v-model="perPage_container" class="mb-3">
                <b-form-select-option :value="5">5</b-form-select-option>
                <b-form-select-option :value="10">10</b-form-select-option>
                <b-form-select-option :value="20">20</b-form-select-option>
              </b-form-select>
            </div>
            <div
              class="md-layout-item"
              style="min-width: 305px; margin-left: 5px;"
            >
              <b-form-input
                placeholder="Search folder / tag"
                v-model="search_container"
                @input="searchContainerTable()"
                type="text"
              ></b-form-input>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="min-width: 150px">
              <b-form-select v-model="filterType" class="mb-3">
                <b-form-select-option value="Primary"
                  >Required</b-form-select-option
                >
                <b-form-select-option value="Supplementary"
                  >Supplemental</b-form-select-option
                >
              </b-form-select>
            </div>
          </div>
        </div>
      </div>

      <br />

      <b-table
        :items="filterByType()"
        :fields="fields_container"
        :current-page="currentPage_container"
        :per-page="perPage_container"
        :sort-by.sync="sortBy_container"
        :sort-desc.sync="sortDesc_container"
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

        <template #cell(tag)="row">
          <span v-for="(item, index) in row.item.tags" :key="index">
            {{ item.tag }}
            <a v-if="row.item.tags[index + 1]">,</a>
          </span>
        </template>

        <template #cell(number)="row">
          {{ row.item.number }}
        </template>

        <template #cell(actions)="row">
          <md-button
            class="md-dense md-primary md-raised"
            @click="
              containerSelect = row.item;
              setDocuments(bestPracticeSelect.files);
              containerDialog = false;
              attachmentDialog = true;
            "
            >Show Files</md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage_container"
        :total-rows="filterByType().length ? filterByType().length : 0"
        :per-page="perPage_container"
        align="fill"
        size="sm"
        class="my-auto md-elevation-2"
      ></b-pagination>

      <br />

      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="containerDialog = false"
          >Close</md-button
        >
      </md-card-actions>
    </b-modal>

    <!--Dialog Attachment-->
    <b-modal id="app" v-model="attachmentDialog" size="xl" hide-footer>
      <template #modal-header>
        <h5>{{ containerSelect.container.container_name }}</h5>
      </template>

      <div class="md-layout">
        <div class="md-layout-item">
          <h6>Best Practice:</h6>
          {{ bestPracticeSelect.best_practice }}
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="min-width: 65px">
              <b-form-select v-model="perPage_document" class="mb-3">
                <b-form-select-option :value="5">5</b-form-select-option>
                <b-form-select-option :value="10">10</b-form-select-option>
                <b-form-select-option :value="20">20</b-form-select-option>
              </b-form-select>
            </div>
            <div
              class="md-layout-item"
              style="min-width: 300px; margin-left: 5px;"
            >
              <b-form-input
                placeholder="Search file"
                v-model="search_document"
                @input="searchDocumentTable(bestPracticeSelect.files)"
                type="text"
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>

      <br />

      <b-table
        :items="documentList"
        :fields="fields_document"
        :current-page="currentPage_document"
        :per-page="perPage_document"
        :sort-by.sync="sortBy_document"
        :sort-desc.sync="sortDesc_document"
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
            class="md-dense md-primary md-raised"
            @click="
              attachFile(bestPracticeSelect.best_practice_id, row.item.id)
            "
            >Select</md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage_document"
        :total-rows="totalRows_document"
        :per-page="perPage_document"
        align="fill"
        size="sm"
        class="my-auto md-elevation-2"
      ></b-pagination>

      <br />

      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="
            attachmentDialog = false;
            containerDialog = true;
          "
          >Back</md-button
        >
      </md-card-actions>
    </b-modal>

    <!--Delete Document-->
    <b-modal id="app" v-model="deleteDocument">
      <template #modal-header>
        <h5>Delete Document</h5>
      </template>
      Are you sure you want to remove this document?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteDocument = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeDocument();
              deleteDocument = false;
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
                placeholder="Search best practice"
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
                  best_practices = [
                    {
                      best_practice: null,
                      tags: []
                    }
                  ];
                  createBestPractice = true;
                "
                >Create Best Practice</md-button
              >
            </div>
          </div>
        </div>
      </div>

      <b-table
        :items="bestPracticeList"
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
        <template #cell(best_practice)="row">
          <b-form-textarea
            style="background: white; min-width: 350px"
            v-model="row.value"
            rows="2"
            max-rows="3"
            disabled
          ></b-form-textarea>

          <br />

          <md-badge
            v-if="row.item.files.length > 0"
            :md-content="row.item.files.length"
            md-dense
          >
            <md-button
              style="margin: 0 0 0 0"
              class="md-primary md-dense md-raised"
              v-b-toggle="getId(row.item.best_practice_id)"
              >Files</md-button
            >
          </md-badge>
          <b-collapse :id="getId(row.item.best_practice_id)">
            <md-card style="margin: 10px 0 0 0; padding: 10px">
              <div
                v-for="(item, index) in row.item.files"
                :key="index"
                style="padding-left: 20px; margin-top: 5px"
              >
                <div class="md-layout">
                  <div class="md-layout-item" style="max-width: 25px">
                    {{ index + 1 }}.
                  </div>
                  <div class="md-layout-item" style="max-width: max-content">
                    <b-link @click="showFile(item)">{{
                      item.document_name
                    }}</b-link>
                  </div>
                  <div class="md-layout-item" style="max-width: max-content">
                    <md-button
                      v-b-tooltip.hover
                      title="Delete"
                      class="md-icon-button md-dense md-accent"
                      @click="
                        fileSelect = item;
                        deleteDocument = true;
                      "
                      ><md-icon>close</md-icon></md-button
                    >
                  </div>
                </div>
              </div>
            </md-card>
          </b-collapse>
        </template>

        <template #cell(tags)="row">
          <div class="md-layout">
            <div class="md-layout-item">
              <b-form-tags style="border: none" add-on-change no-outer-focus>
                <template>
                  <div>
                    <span v-for="(item, index) in row.item.tags" :key="index">
                      <b-form-tag
                        @remove="
                          tagSelect = item;
                          deleteTagPrompt = true;
                        "
                        variant="primary"
                        >{{ item.tag }}</b-form-tag
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
                title="Add Designation"
                class="md-icon-button md-dense md-primary"
                @click="
                  bestPracticeSelect = row.item;
                  oldTags = row.item.tags;
                  setTags(row.item.tags);
                  area = [];
                  tag = [];
                  addTags = true;
                "
                ><md-icon>add_circle</md-icon></md-button
              >
            </div>
          </div>

          <!-- <div class="md-layout" v-if="!tagEdit[row.index].status">
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
                  bestPracticeSelect = row.item;
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
          </div> -->
        </template>

        <template #cell(files)="row">
          <div
            v-for="(item, index) in row.item.files"
            :key="index"
            style="padding-left: 20px; margin-top: 5px"
          >
            <div class="md-layout">
              <div class="md-layout-item" style="max-width: max-content">
                <b-link @click="showFile(item)">{{
                  item.document_name
                }}</b-link>
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <md-button
                  v-b-tooltip.hover
                  title="Delete"
                  class="md-icon-button md-dense md-accent"
                  @click="
                    fileSelect = item;
                    deleteDocument = true;
                  "
                  ><md-icon>close</md-icon></md-button
                >
              </div>
            </div>
          </div>
        </template>

        <template #cell(created_by)="row">
          {{ concatName(row.item) }}
        </template>

        <template #cell(updated_at)="row">
          {{ formatDateTime(row.value) }}
        </template>

        <template #cell(actions)="row">
          <md-button
            v-b-tooltip.hover
            title="Attach File"
            class="md-icon-button md-dense md-primary"
            @click="
              bestPracticeSelect = row.item;
              filterType = 'Primary';
              search_container = '';
              showFolders();
              containerDialog = true;
            "
            ><md-icon>file_upload</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Edit"
            class="md-icon-button md-dense md-primary"
            @click="
              bestPracticeSelect = row.item;
              best_practice = row.item.best_practice;
              editBestPractice = true;
            "
            ><md-icon>edit</md-icon></md-button
          >
          <md-button
            v-b-tooltip.hover
            title="Delete"
            class="md-icon-button md-dense md-accent"
            @click="
              bestPracticeSelect = row.item;
              deleteBestPractice = true;
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

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.best_practice).includes(toLower(term))
    );
  }
  return items;
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
        { key: "best_practice_id", label: "ID", sortable: true },
        {
          key: "best_practice",
          label: "Best Practice",
          sortable: true
        },
        {
          key: "tags",
          label: "Tags"
        },
        // {
        //   key: "files",
        //   label: "Files"
        // },
        {
          key: "created_by",
          label: "Created By"
        },
        {
          key: "updated_at",
          label: "Last Update"
        },
        { key: "actions", label: "Actions", thStyle: { width: "180px" } }
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
        // { key: "office_name", label: "Office", sortable: true },
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
      bestPracticeList: [],
      bestPracticeSelect: [],
      containerList: [],
      containerSelect: null,
      documentList: [],
      documentSelect: null,
      fileSelect: null,
      officeList: [],
      search: null,
      best_practices: [],
      best_practice: null,
      filterType: "Primary",
      tag: [],
      area: [],
      tags: [],
      oldTags: [],
      tagSelect: null,
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
      tagEdit: [{ status: false }],
      addTags: false,
      deleteTagPrompt: false,
      createBestPractice: false,
      editBestPractice: false,
      deleteBestPractice: false,
      deleteDocument: false,
      containerDialog: false,
      attachmentDialog: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      campus: "campus",
      offices: "offices",
      office: "office"
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
      let office_id = this.office.office_id;
      let best_practices = this.best_practices;
      this.$isLoading(true);
      this.$store
        .dispatch("addOfficeBestPractice", { office_id, best_practices })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showOfficeBestPractice", this.office.office_id)
              .then(result => {
                this.bestPracticeList = result.data.best_practices;
                this.setTagEdit();
                if (this.bestPracticeList?.length)
                  this.totalRows = this.bestPracticeList.length;
              });
            this.createBestPractice = false;
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
      let best_practice_id = this.bestPracticeSelect.best_practice_id;
      let best_practice = this.best_practice;
      this.$isLoading(true);
      this.$store
        .dispatch("editOfficeBestPractice", { best_practice_id, best_practice })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showOfficeBestPractice", this.office.office_id)
              .then(result => {
                this.bestPracticeList = result.data.best_practices;
                this.setTagEdit();
                if (this.bestPracticeList?.length)
                  this.totalRows = this.bestPracticeList.length;
              });
            this.editBestPractice = false;
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
        .dispatch(
          "deleteOfficeBestPractice",
          this.bestPracticeSelect.best_practice_id
        )
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showOfficeBestPractice", this.office.office_id)
              .then(result => {
                this.bestPracticeList = result.data.best_practices;
                this.setTagEdit();
                if (this.bestPracticeList?.length)
                  this.totalRows = this.bestPracticeList.length;
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
    getId(item) {
      return item.toString();
    },
    submitTags() {
      this.$isLoading(true);
      let id = this.bestPracticeSelect.best_practice_id;
      let tags = this.tag.concat(this.area);
      this.$store
        .dispatch("addBestPracticeTag", { id, tags })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showOfficeBestPractice", this.office.office_id)
              .then(result => {
                this.bestPracticeList = result.data.best_practices;
                this.setTagEdit();
                if (this.bestPracticeList?.length)
                  this.totalRows = this.bestPracticeList.length;
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
        .dispatch("deleteBestPracticeTag", this.tagSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showOfficeBestPractice", this.office.office_id)
              .then(result => {
                this.bestPracticeList = result.data.best_practices;
                this.setTagEdit();
                if (this.bestPracticeList?.length)
                  this.totalRows = this.bestPracticeList.length;
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
    removeDocument() {
      this.$isLoading(true);
      this.$store
        .dispatch(
          "deleteBestPracticeDocument",
          this.fileSelect.best_practice_document_id
        )
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showOfficeBestPractice", this.office.office_id)
              .then(result => {
                this.bestPracticeList = result.data.best_practices;
                this.setTagEdit();
                if (this.bestPracticeList?.length)
                  this.totalRows = this.bestPracticeList.length;
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
    searchOnTable: _.debounce(function() {
      this.$store
        .dispatch("showOfficeBestPractice", this.office.office_id)
        .then(result => {
          this.bestPracticeList = searchByName(
            result.data.best_practices,
            this.search
          );
          this.setTagEdit();
          if (this.bestPracticeList?.length)
            this.totalRows = this.bestPracticeList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    searchContainerTable: _.debounce(function() {
      this.$store
        .dispatch("showContainer", this.office.office_id)
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
    filterArea(area, thisArea, options) {
      if (area?.length) {
        for (let x = 0; x < area.length; x++)
          options = options.filter(
            data => data.value !== area[x] || data.value === thisArea
          );
      }
      return options;
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
    formatDateTime(item) {
      return moment(item).format("llll");
    },
    formatDate(item) {
      return moment(item).format("ll");
    },
    addList() {
      // if (this.list[this.list.length - 1].document_title !== null)
      this.best_practices.push({
        best_practice: null,
        tags: []
      });
    },
    removeList(counter) {
      this.best_practices.splice(counter, 1);
    },
    addArea(index) {
      // if (this.list[index].area[this.area.length - 1] !== null)
      this.best_practices[index].tags.push(null);
    },
    removeArea(index, counter) {
      this.best_practices[index].tags.splice(counter, 1);
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
    showFolders() {
      this.$store
        .dispatch("showContainer", this.office.office_id)
        .then(result => {
          this.containerList = result.data.documents;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
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
    filterByType() {
      if (this.filterType === "Primary")
        return this.containerList.filter(
          items =>
            items.container.type === "Primary" || items.container.type === null
        );
      else if (this.filterType === "Supplementary")
        return this.containerList.filter(
          items => items.container.type === "Supplementary"
        );
    },
    attachFile(best_practice_id, document_id) {
      this.$isLoading(true);
      this.$store
        .dispatch("attachBestPracticeDocument", {
          best_practice_id,
          document_id
        })
        .then(result => {
          if (result.data.status === true) {
            let index = this.documentList.findIndex(
              data => data.id === document_id
            );
            this.documentList.splice(index, 1);
            this.$store
              .dispatch("showOfficeBestPractice", this.office.office_id)
              .then(result => {
                this.bestPracticeList = result.data.best_practices;
                this.setTagEdit();
                if (this.bestPracticeList?.length)
                  this.totalRows = this.bestPracticeList.length;
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
    setTagEdit() {
      if (this.bestPracticeList?.length) {
        for (let x = 0; x < this.bestPracticeList.length; x++) {
          let status = false;
          this.tagEdit.push({ status });
        }
      }
    },
    changeOffice() {
      this.$isLoading(true);
      this.$store
        .dispatch("showOfficeBestPractice", this.office.office_id)
        .then(result => {
          this.bestPracticeList = result.data.best_practices;
          this.setTagEdit();
          if (this.bestPracticeList?.length)
            this.totalRows = this.bestPracticeList.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
      this.$isLoading(false);
    }
  },
  async created() {
    this.officeList = this.offices.filter(
      data => data.role_id === 3 || data.role_id === 4
    );
    if (this.officeList?.length)
      await this.$store.commit("saveOffice", this.officeList[0]);

    this.$isLoading(true);
    await this.$store
      .dispatch("showOfficeBestPractice", this.office.office_id)
      .then(result => {
        this.bestPracticeList = result.data.best_practices;
        this.setTagEdit();
        if (this.bestPracticeList?.length)
          this.totalRows = this.bestPracticeList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
