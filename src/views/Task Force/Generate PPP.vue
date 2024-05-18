<template>
  <div>
    <!--Dialog Best Practice-->
    <b-modal id="app" v-model="bestPracticeDialog" size="xl" hide-footer>
      <template #modal-header>
        <h5>Best Practices</h5>
      </template>

      <div class="md-layout">
        <div class="md-layout-item"></div>
        <div class="md-layout-item" style="max-width: max-content">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="min-width: 65px">
              <b-form-select v-model="perPage_bestpractice" class="mb-3">
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
                placeholder="Search best practice / tags / office"
                v-model="search_bestpractice"
                @input="searchBestPracticeTable()"
                type="text"
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item"></div>
        <div class="md-layout-item" style="max-width: 150px; margin-right: 0">
          <b-form-select v-model="filterBestPracticeArea" class="mb-3">
            <b-form-select-option :value="0">Show All</b-form-select-option>
            <b-form-select-option :value="1">Area I</b-form-select-option>
            <b-form-select-option :value="2">Area II</b-form-select-option>
            <b-form-select-option :value="3">Area III</b-form-select-option>
            <b-form-select-option :value="4">Area IV</b-form-select-option>
            <b-form-select-option :value="5">Area V</b-form-select-option>
            <b-form-select-option :value="6">Area VI</b-form-select-option>
            <b-form-select-option :value="7">Area VII</b-form-select-option>
            <b-form-select-option :value="8">Area VIII</b-form-select-option>
            <b-form-select-option :value="9">Area IX</b-form-select-option>
            <b-form-select-option :value="10">Area X</b-form-select-option>
          </b-form-select>
        </div>
      </div>

      <b-table
        :items="filterFiles(bestPracticeList, filterBestPracticeArea)"
        :fields="fields_bestpractice"
        :current-page="currentPage_bestpractice"
        :per-page="perPage_bestpractice"
        :sort-by.sync="sortBy_bestpractice"
        :sort-desc.sync="sortDesc_bestpractice"
        class="md-elevation-2"
        outlined
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(tags)="row">
          <span v-for="(item, index) in row.item.tags" :key="index">
            {{ item.tag }}
            <a v-if="row.item.tags[index + 1]">,</a>
          </span>
        </template>

        <template #cell(actions)="row">
          <md-button
            class="md-dense md-primary md-raised"
            @click="addBestPractice(row.item)"
            >Select</md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage_bestpractice"
        :total-rows="
          filterFiles(bestPracticeList, filterBestPracticeArea).length
            ? filterFiles(bestPracticeList, filterBestPracticeArea).length
            : 0
        "
        :per-page="perPage_bestpractice"
        align="fill"
        size="sm"
        class="my-auto md-elevation-2"
      ></b-pagination>

      <br />

      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="bestPracticeDialog = false"
          >Close</md-button
        >
      </md-card-actions>
    </b-modal>

    <!--Dialog Container-->
    <b-modal id="app" v-model="containerDialog" size="xl" hide-footer>
      <template #modal-header>
        <h5>Folders</h5>
      </template>

      <div class="md-layout">
        <div class="md-layout-item">
          <h6>Statement:</h6>
          {{ statementSelect ? statementSelect.statement : "" }}
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
            <div
              class="md-layout-item"
              style="min-width: 150px; margin-right: 5px"
            >
              <b-form-select v-model="filterDocumentArea" class="mb-3">
                <b-form-select-option :value="0">Show All</b-form-select-option>
                <b-form-select-option :value="1">Area I</b-form-select-option>
                <b-form-select-option :value="2">Area II</b-form-select-option>
                <b-form-select-option :value="3">Area III</b-form-select-option>
                <b-form-select-option :value="4">Area IV</b-form-select-option>
                <b-form-select-option :value="5">Area V</b-form-select-option>
                <b-form-select-option :value="6">Area VI</b-form-select-option>
                <b-form-select-option :value="7">Area VII</b-form-select-option>
                <b-form-select-option :value="8"
                  >Area VIII</b-form-select-option
                >
                <b-form-select-option :value="9">Area IX</b-form-select-option>
                <b-form-select-option :value="10">Area X</b-form-select-option>
              </b-form-select>
            </div>
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
        :items="filterByType(filterFiles(containerList, filterDocumentArea))"
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
              setDocuments(statementSelect.files);
              containerDialog = false;
              attachmentDialog = true;
            "
            >Show Files</md-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage_container"
        :total-rows="
          filterByType(filterFiles(containerList, filterDocumentArea)).length
            ? filterByType(filterFiles(containerList, filterDocumentArea))
                .length
            : 0
        "
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
          <h6>Statement:</h6>
          {{ statementSelect ? statementSelect.statement : "" }}
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
                @input="searchDocumentTable(statementSelect.files)"
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
            @click="attachFile(statementSelect.ppp_statement_id, row.item.id)"
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
        <h5>Remove Attachment</h5>
      </template>
      Are you sure you want to remove this attachment?
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
              removeAttachment();
              deleteDocument = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-divider style="margin: 10px 0;" />
    <h6>System Input and Process</h6>
    <div v-for="(items, index) in system_input" :key="index">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item" style="max-width: 30px">
          {{ index + 1 }}.
        </div>
        <div class="md-layout-item">
          <b-form-textarea
            v-model="items.statement"
            rows="2"
            max-rows="6"
          ></b-form-textarea>
          <div
            v-if="items.ppp_statement_id"
            class="md-layout"
            style="margin-top: 5px"
          >
            <div class="md-layout-item">
              <h6>Files:</h6>
              <div
                v-for="files in items.files"
                :key="files.ppp_statement_document_id"
              >
                <div class="md-layout">
                  <div class="md-layout-item" style="max-width: max-content">
                    <b-link @click="showFile(files)">{{
                      files.document_name
                    }}</b-link>
                  </div>
                  <div class="md-layout-item" style="max-width: max-content">
                    <md-button
                      v-b-tooltip.hover
                      title="Delete"
                      class="md-icon-button md-dense md-accent"
                      @click="
                        fileSelected = files;
                        deleteDocument = true;
                      "
                      ><md-icon>close</md-icon></md-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <!--            <div class="md-layout-item" style="max-width: max-content">-->
            <!--              <md-button-->
            <!--                v-if="items.ppp_statement_id"-->
            <!--                style="margin: 0"-->
            <!--                class="md-primary md-raised"-->
            <!--                @click="-->
            <!--                  statementSelect = items;-->
            <!--                  filterDocumentArea = 0;-->
            <!--                  filterType = 'Primary';-->
            <!--                  search_container = '';-->
            <!--                  setContainer();-->
            <!--                  containerDialog = true;-->
            <!--                "-->
            <!--                >Attach Files</md-button-->
            <!--              >-->
            <!--            </div>-->
          </div>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <div>
            <md-button
              v-b-tooltip.hover
              title="Delete"
              class="md-icon-button md-dense md-accent"
              @click="removeStatement(index, items.type)"
              ><md-icon>delete</md-icon></md-button
            >
          </div>

          <div v-if="items.ppp_statement_id">
            <md-button
              v-b-tooltip.hover
              title="Attach Files"
              class="md-icon-button md-dense md-primary"
              @click="
                statementSelect = items;
                filterDocumentArea = instrument.area_number;
                filterType = 'Primary';
                search_container = '';
                setContainer();
                containerDialog = true;
              "
              ><md-icon>attach_file</md-icon></md-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item"></div>
      <div class="md-layout-item" style="max-width: max-content">
        <!--        <md-button-->
        <!--          style="margin: 0; width: 150px;"-->
        <!--          class="md-primary md-raised"-->
        <!--          @click="addStatement('System Input and Process')"-->
        <!--          ><md-icon>add</md-icon></md-button-->
        <!--        >-->
        <md-button
          v-b-tooltip.hover
          title="Add Statement"
          class="md-icon-button md-dense md-primary"
          @click="addStatement('System Input and Process')"
          ><md-icon>add_circle</md-icon></md-button
        >
      </div>
    </div>

    <md-divider style="margin: 10px 0;" />

    <h6>Implementation</h6>
    <div v-for="(items, index) in implementation" :key="index">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item" style="max-width: 30px">
          {{ index + 1 }}.
        </div>
        <div class="md-layout-item">
          <b-form-textarea
            v-model="items.statement"
            rows="2"
            max-rows="6"
          ></b-form-textarea>
          <div class="md-layout" style="margin-top: 5px">
            <div class="md-layout-item">
              <h6>Files:</h6>
              <div
                v-for="files in items.files"
                :key="files.ppp_statement_document_id"
              >
                <div class="md-layout">
                  <div class="md-layout-item" style="max-width: max-content">
                    <b-link @click="showFile(files)">{{
                      files.document_name
                    }}</b-link>
                  </div>
                  <div class="md-layout-item" style="max-width: max-content">
                    <md-button
                      v-b-tooltip.hover
                      title="Delete"
                      class="md-icon-button md-dense md-accent"
                      @click="
                        fileSelected = files;
                        deleteDocument = true;
                      "
                      ><md-icon>close</md-icon></md-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <!--            <div class="md-layout-item" style="max-width: max-content">-->
            <!--              <md-button-->
            <!--                v-if="items.ppp_statement_id"-->
            <!--                style="margin: 0"-->
            <!--                class="md-primary md-raised"-->
            <!--                @click="-->
            <!--                  statementSelect = items;-->
            <!--                  filterDocumentArea = 0;-->
            <!--                  filterType = 'Primary';-->
            <!--                  search_container = '';-->
            <!--                  setContainer();-->
            <!--                  containerDialog = true;-->
            <!--                "-->
            <!--                >Attach Files</md-button-->
            <!--              >-->
            <!--            </div>-->
          </div>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <div>
            <md-button
              v-b-tooltip.hover
              title="Delete"
              class="md-icon-button md-dense md-accent"
              @click="removeStatement(index, items.type)"
              ><md-icon>delete</md-icon></md-button
            >
          </div>

          <div v-if="items.ppp_statement_id">
            <md-button
              v-b-tooltip.hover
              title="Attach Files"
              class="md-icon-button md-dense md-primary"
              @click="
                statementSelect = items;
                filterDocumentArea = instrument.area_number;
                filterType = 'Primary';
                search_container = '';
                setContainer();
                containerDialog = true;
              "
              ><md-icon>attach_file</md-icon></md-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item"></div>
      <div class="md-layout-item" style="max-width: max-content">
        <!--        <md-button-->
        <!--          style="margin: 0; width: 150px;"-->
        <!--          class="md-primary md-raised"-->
        <!--          @click="addStatement('Implementation')"-->
        <!--          ><md-icon>add</md-icon></md-button-->
        <!--        >-->
        <md-button
          v-b-tooltip.hover
          title="Add Statement"
          class="md-icon-button md-dense md-primary"
          @click="addStatement('Implementation')"
          ><md-icon>add_circle</md-icon></md-button
        >
      </div>
    </div>

    <md-divider style="margin: 10px 0;" />

    <h6>Outcome</h6>
    <div v-for="(items, index) in outcome" :key="index">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item" style="max-width: 30px">
          {{ index + 1 }}.
        </div>
        <div class="md-layout-item">
          <b-form-textarea
            v-model="items.statement"
            rows="2"
            max-rows="6"
          ></b-form-textarea>
          <div class="md-layout" style="margin-top: 5px">
            <div class="md-layout-item">
              <h6>Files:</h6>
              <div
                v-for="files in items.files"
                :key="files.ppp_statement_document_id"
              >
                <div class="md-layout">
                  <div class="md-layout-item" style="max-width: max-content">
                    <b-link @click="showFile(files)">{{
                      files.document_name
                    }}</b-link>
                  </div>
                  <div class="md-layout-item" style="max-width: max-content">
                    <md-button
                      v-b-tooltip.hover
                      title="Delete"
                      class="md-icon-button md-dense md-accent"
                      @click="
                        fileSelected = files;
                        deleteDocument = true;
                      "
                      ><md-icon>close</md-icon></md-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <!--            <div class="md-layout-item" style="max-width: max-content">-->
            <!--              <md-button-->
            <!--                v-if="items.ppp_statement_id"-->
            <!--                style="margin: 0"-->
            <!--                class="md-primary md-raised"-->
            <!--                @click="-->
            <!--                  statementSelect = items;-->
            <!--                  filterDocumentArea = 0;-->
            <!--                  filterType = 'Primary';-->
            <!--                  search_container = '';-->
            <!--                  setContainer();-->
            <!--                  containerDialog = true;-->
            <!--                "-->
            <!--                >Attach Files</md-button-->
            <!--              >-->
            <!--            </div>-->
          </div>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <div>
            <md-button
              v-b-tooltip.hover
              title="Delete"
              class="md-icon-button md-dense md-accent"
              @click="removeStatement(index, items.type)"
              ><md-icon>delete</md-icon></md-button
            >
          </div>

          <div v-if="items.ppp_statement_id">
            <md-button
              v-b-tooltip.hover
              title="Attach Files"
              class="md-icon-button md-dense md-primary"
              @click="
                statementSelect = items;
                filterDocumentArea = instrument.area_number;
                filterType = 'Primary';
                search_container = '';
                setContainer();
                containerDialog = true;
              "
              ><md-icon>attach_file</md-icon></md-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item"></div>
      <div class="md-layout-item" style="max-width: max-content">
        <!--        <md-button-->
        <!--          style="margin: 0; width: 150px;"-->
        <!--          class="md-primary md-raised"-->
        <!--          @click="addStatement('Outcome')"-->
        <!--          ><md-icon>add</md-icon></md-button-->
        <!--        >-->
        <md-button
          v-b-tooltip.hover
          title="Add Statement"
          class="md-icon-button md-dense md-primary"
          @click="addStatement('Outcome')"
          ><md-icon>add_circle</md-icon></md-button
        >
      </div>
    </div>

    <md-divider style="margin: 10px 0;" />

    <h6>Best Practice</h6>
    <div v-for="(items, index) in best_practice" :key="index">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item" style="max-width: 30px">
          {{ index + 1 }}.
        </div>
        <div class="md-layout-item">
          <!--          <multiselect-->
          <!--            v-if="!items.statement"-->
          <!--            v-model="bestPracticeSelect[index]"-->
          <!--            :options="bestPracticeList"-->
          <!--            :custom-label="bestPracticeText"-->
          <!--            :placeholder="null"-->
          <!--            @input="items.statement = bestPracticeSelect[index].best_practice"-->
          <!--          ></multiselect>-->
          <b-form-textarea
            v-model="items.statement"
            rows="2"
            max-rows="6"
          ></b-form-textarea>
          <div class="md-layout" style="margin-top: 5px">
            <div class="md-layout-item">
              <h6>Files:</h6>
              <div
                v-for="files in items.files"
                :key="files.ppp_statement_document_id"
              >
                <div class="md-layout">
                  <div class="md-layout-item" style="max-width: max-content">
                    <b-link @click="showFile(files)">{{
                      files.document_name
                    }}</b-link>
                  </div>
                  <div class="md-layout-item" style="max-width: max-content">
                    <md-button
                      v-b-tooltip.hover
                      title="Delete"
                      class="md-icon-button md-dense md-accent"
                      @click="
                        fileSelected = files;
                        deleteDocument = true;
                      "
                      ><md-icon>close</md-icon></md-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <!--            <div class="md-layout-item" style="max-width: max-content">-->
            <!--              <md-button-->
            <!--                v-if="items.ppp_statement_id"-->
            <!--                style="margin: 0"-->
            <!--                class="md-primary md-raised"-->
            <!--                @click="-->
            <!--                  statementSelect = items;-->
            <!--                  filterDocumentArea = 0;-->
            <!--                  filterType = 'Primary';-->
            <!--                  search_container = '';-->
            <!--                  setContainer();-->
            <!--                  containerDialog = true;-->
            <!--                "-->
            <!--                >Attach Files</md-button-->
            <!--              >-->
            <!--            </div>-->
          </div>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <div>
            <md-button
              v-b-tooltip.hover
              title="Delete"
              class="md-icon-button md-dense md-accent"
              @click="removeStatement(index, items.type)"
              ><md-icon>delete</md-icon></md-button
            >
          </div>

          <div v-if="items.ppp_statement_id">
            <md-button
              v-b-tooltip.hover
              title="Attach Files"
              class="md-icon-button md-dense md-primary"
              @click="
                statementSelect = items;
                filterDocumentArea = instrument.area_number;
                filterType = 'Primary';
                search_container = '';
                setContainer();
                containerDialog = true;
              "
              ><md-icon>attach_file</md-icon></md-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item"></div>
      <div class="md-layout-item" style="max-width: max-content">
        <!--        <md-button-->
        <!--          style="margin: 0; width: 150px;"-->
        <!--          class="md-primary md-raised"-->
        <!--          @click="-->
        <!--            setBestPractice();-->
        <!--            bestPracticeDialog = true;-->
        <!--          "-->
        <!--          ><md-icon>add</md-icon></md-button-->
        <!--        >-->
        <md-button
          v-b-tooltip.hover
          title="Add Best Practice"
          class="md-icon-button md-dense md-primary"
          @click="
            setBestPractice();
            filterDocumentArea = instrument.area_number;
            bestPracticeDialog = true;
          "
          ><md-icon>add_circle</md-icon></md-button
        >
      </div>
    </div>

    <md-divider style="margin: 10px 0;" />

    <h6 v-if="compliance.length">
      Extent of Compliance
    </h6>
    <div v-for="(items, index) in compliance" :key="index">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item" style="max-width: 30px">
          {{ index + 1 }}.
        </div>
        <div class="md-layout-item">
          <!--          <b-form-textarea-->
          <!--            v-model="items.statement"-->
          <!--            rows="2"-->
          <!--            max-rows="6"-->
          <!--          ></b-form-textarea>-->
          <b-form-input
            style="background: white !important;"
            v-model="items.statement"
            disabled
          />
          <div class="md-layout" style="margin-top: 5px">
            <div class="md-layout-item">
              <h6>Files:</h6>
              <div
                v-for="files in items.files"
                :key="files.ppp_statement_document_id"
              >
                <div class="md-layout">
                  <!--                  <div class="md-layout-item" style="max-width: max-content">-->
                  <b-link @click="showFile(files)">{{
                    files.document_name
                  }}</b-link>
                  <!--                  </div>-->
                  <!--                  <div class="md-layout-item" style="max-width: max-content">-->
                  <!--                    <md-button-->
                  <!--                      v-b-tooltip.hover-->
                  <!--                      title="Delete"-->
                  <!--                      class="md-icon-button md-dense md-accent"-->
                  <!--                      @click="-->
                  <!--                        fileSelected = files;-->
                  <!--                        deleteDocument = true;-->
                  <!--                      "-->
                  <!--                      ><md-icon>close</md-icon></md-button-->
                  <!--                    >-->
                  <!--                  </div>-->
                </div>
              </div>
            </div>
            <!--            <div class="md-layout-item" style="max-width: max-content">-->
            <!--              <md-button-->
            <!--                v-if="items.ppp_statement_id"-->
            <!--                style="margin: 0"-->
            <!--                class="md-primary md-raised"-->
            <!--                @click="-->
            <!--                  statementSelect = items;-->
            <!--                  filterDocumentArea = 0;-->
            <!--                  filterType = 'Primary';-->
            <!--                  search_container = '';-->
            <!--                  setContainer();-->
            <!--                  containerDialog = true;-->
            <!--                "-->
            <!--                >Attach Files</md-button-->
            <!--              >-->
            <!--            </div>-->
          </div>
        </div>
        <!--        <div class="md-layout-item" style="max-width: max-content">-->
        <!--          <md-button-->
        <!--            v-b-tooltip.hover-->
        <!--            title="Delete"-->
        <!--            class="md-icon-button md-dense md-accent"-->
        <!--            @click="removeStatement(index)"-->
        <!--            ><md-icon>delete</md-icon></md-button-->
        <!--          >-->
        <!--        </div>-->
      </div>
    </div>
    <!--    <div class="md-layout">-->
    <!--      <div class="md-layout-item"></div>-->
    <!--      <div class="md-layout-item" style="max-width: max-content">-->
    <!--        <md-button-->
    <!--          style="margin: 0; width: 150;"-->
    <!--          class="md-primary md-raised"-->
    <!--          @click="addStatement('Extent of Compliance')"-->
    <!--          ><md-icon>add</md-icon></md-button-->
    <!--        >-->
    <!--      </div>-->
    <!--    </div>-->

    <br />

    <md-button
      style="width: 100%; margin: 0"
      class="md-primary md-raised"
      @click="addPPPStatement()"
      >Save</md-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import moment from "moment";

const toLower = text => {
  return text.toString().toLowerCase();
};

const filterBestPractice = (list, select) => {
  // if (select?.length) {
  //   for (let x = 0; x < select.length; x++) {
  //     let index =
  //       list.findIndex(item => item.best_practice === select[x].statement)
  //         .length === 0;
  //     list.splice(index, 1);
  //   }
  //   return list;
  // } else return list;
  if (select?.length) {
    for (let y = 0; y < select.length; y++) {
      list = list.filter(data => select[y].statement !== data.best_practice);
    }
  }
  return list;
};

const compareTags = (tags, term) => {
  if (tags?.length) {
    for (let x = 0; x < tags.length; x++) {
      if (toLower(tags[x].tag) === toLower(term)) return true;
    }
  }
};

const searchByNameAndOffice = (items, term, select) => {
  if (term) {
    let searchDocuments = items.filter(
      item =>
        toLower(item.best_practice).includes(toLower(term)) ||
        toLower(item.office_name).includes(toLower(term)) ||
        compareTags(item.tags, term)
    );

    if (select?.length) {
      for (let y = 0; y < select.length; y++) {
        searchDocuments = searchDocuments.filter(
          data => select[y].statement !== data.best_practice
        );
      }
    }
    return searchDocuments;
  }
  return items;
};

const filterByArea = (documents, area) => {
  if (area !== "") {
    // let searchDocuments = [];
    // let resultTags = [];
    // if (documents?.length) {
    //   for (let x = 0; x < documents.length; x++) {
    //     resultTags = resultTags.concat(
    //       documents[x].tags.filter(
    //         items => toLower(items.tag ? items.tag : "") === toLower(area)
    //       )
    //     );
    //   }
    // }
    //
    // if (resultTags?.length) {
    //   for (let x = 0; x < resultTags.length; x++) {
    //     let document = documents.find(
    //       item => item.container.id === resultTags[x].container_id
    //     );
    //     if (document) {
    //       if (
    //         searchDocuments.filter(
    //           item => item.container.id === document.container.id
    //         ).length === 0
    //       ) {
    //         searchDocuments.push(document);
    //       }
    //     }
    //   }
    //   return searchDocuments;
    // } else return searchDocuments;

    return documents.filter(item => compareTags(item.tags, area));
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

export default {
  name: "Generate PPP.vue",
  props: {
    parameterSelected: Object
  },
  data() {
    return {
      search_bestpractice: "",
      sortBy_bestpractice: "best_practice_id",
      sortDesc_bestpractice: false,
      currentPage_bestpractice: 1,
      perPage_bestpractice: 10,
      totalRows_bestpractice: 0,
      fields_bestpractice: [
        { key: "best_practice_id", label: "ID", sortable: true },
        { key: "best_practice", label: "Best Practice", sortable: true },
        { key: "tags", label: "Tags", sortable: true },
        { key: "office_name", label: "Office", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "130px" } }
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
      statementList: [],
      system_input: [],
      implementation: [],
      outcome: [],
      best_practice: [],
      compliance: [],
      statementSelect: null,
      bestPracticeList: [],
      // bestPracticeSelect: [],
      containerList: [],
      containerSelect: null,
      documentList: [],
      fileSelected: null,
      filterType: "Primary",
      filterDocumentArea: 0,
      filterBestPracticeArea: 0,
      deleteDocument: false,
      bestPracticeDialog: false,
      containerDialog: false,
      attachmentDialog: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      user: "user",
      program: "program",
      campus: "campus",
      instrument: "instrument"
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
    searchBestPracticeTable: _.debounce(function() {
      this.$store
        .dispatch("showAllBestPractice", this.campus.campus_id)
        .then(result => {
          this.bestPracticeList = searchByNameAndOffice(
            result.data.best_practices,
            this.search_bestpractice,
            this.filterStatement(this.best_practice, "Best Practice")
          );
          if (this.bestPracticeList?.length) {
            this.totalRows_bestpractice = this.bestPracticeList.length;
          }
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
    addPPPStatement() {
      this.$isLoading(true);
      let parameter_id = this.parameterSelected.id;
      let texts = [];
      if (this.system_input?.length) {
        for (let x = 0; x < this.system_input.length; x++) {
          if (this.system_input[x].statement !== null) {
            let ppp_statement_id = this.system_input[x].ppp_statement_id;
            let statement = this.system_input[x].statement;
            let type = this.system_input[x].type;
            let best_practice_id = null;
            texts.push({ ppp_statement_id, statement, type, best_practice_id });
          }
        }
      }
      if (this.implementation?.length) {
        for (let x = 0; x < this.implementation.length; x++) {
          if (this.implementation[x].statement !== null) {
            let ppp_statement_id = this.implementation[x].ppp_statement_id;
            let statement = this.implementation[x].statement;
            let type = this.implementation[x].type;
            let best_practice_id = null;
            texts.push({ ppp_statement_id, statement, type, best_practice_id });
          }
        }
      }
      if (this.outcome?.length) {
        for (let x = 0; x < this.outcome.length; x++) {
          if (this.outcome[x].statement !== null) {
            let ppp_statement_id = this.outcome[x].ppp_statement_id;
            let statement = this.outcome[x].statement;
            let type = this.outcome[x].type;
            let best_practice_id = null;
            texts.push({ ppp_statement_id, statement, type, best_practice_id });
          }
        }
      }
      if (this.best_practice?.length) {
        for (let x = 0; x < this.best_practice.length; x++) {
          if (this.best_practice[x].statement !== null) {
            let ppp_statement_id = this.best_practice[x].ppp_statement_id;
            let statement = this.best_practice[x].statement;
            let type = this.best_practice[x].type;
            let best_practice_id = this.best_practice[x].best_practice_id;
            texts.push({ ppp_statement_id, statement, type, best_practice_id });
          }
        }
      }
      if (this.compliance?.length) {
        for (let x = 0; x < this.compliance.length; x++) {
          if (this.compliance[x].statement !== null) {
            let ppp_statement_id = this.compliance[x].ppp_statement_id;
            let statement = this.compliance[x].statement;
            let type = this.compliance[x].type;
            let best_practice_id = null;
            texts.push({ ppp_statement_id, statement, type, best_practice_id });
          }
        }
      }
      this.$store
        .dispatch("addPPPStatement", { parameter_id, texts })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showPPPStatement", this.parameterSelected.id)
              .then(result => {
                this.system_input = this.filterStatement(
                  result.data,
                  "System Input and Process"
                );
                this.implementation = this.filterStatement(
                  result.data,
                  "Implementation"
                );
                this.outcome = this.filterStatement(result.data, "Outcome");
                this.best_practice = this.filterStatement(
                  result.data,
                  "Best Practice"
                );
                this.compliance = this.filterStatement(
                  result.data,
                  "Extent of Compliance"
                );
                this.system_input.push({
                  ppp_statement_id: null,
                  statement: null,
                  type: "System Input and Process",
                  best_practice_id: null
                });
                this.implementation.push({
                  ppp_statement_id: null,
                  statement: null,
                  type: "Implementation",
                  best_practice_id: null
                });
                this.outcome.push({
                  ppp_statement_id: null,
                  statement: null,
                  type: "Outcome",
                  best_practice_id: null
                });
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
    attachFile(ppp_statement_id, document_id) {
      this.$isLoading(true);
      this.$store
        .dispatch("attachPPPFile", {
          ppp_statement_id,
          document_id
        })
        .then(result => {
          if (result.data.status === true) {
            let index = this.documentList.findIndex(
              data => data.id === document_id
            );
            this.documentList.splice(index, 1);
            this.$store
              .dispatch("showPPPStatement", this.parameterSelected.id)
              .then(result => {
                this.system_input = this.filterStatement(
                  result.data,
                  "System Input and Process"
                );
                this.implementation = this.filterStatement(
                  result.data,
                  "Implementation"
                );
                this.outcome = this.filterStatement(result.data, "Outcome");
                this.best_practice = this.filterStatement(
                  result.data,
                  "Best Practice"
                );
                this.compliance = this.filterStatement(
                  result.data,
                  "Extent of Compliance"
                );
                this.system_input.push({
                  ppp_statement_id: null,
                  statement: null,
                  type: "System Input and Process",
                  best_practice_id: null
                });
                this.implementation.push({
                  ppp_statement_id: null,
                  statement: null,
                  type: "Implementation",
                  best_practice_id: null
                });
                this.outcome.push({
                  ppp_statement_id: null,
                  statement: null,
                  type: "Outcome",
                  best_practice_id: null
                });
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
        .dispatch("removePPPFile", this.fileSelected.ppp_statement_document_id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showPPPStatement", this.parameterSelected.id)
              .then(result => {
                this.system_input = this.filterStatement(
                  result.data,
                  "System Input and Process"
                );
                this.implementation = this.filterStatement(
                  result.data,
                  "Implementation"
                );
                this.outcome = this.filterStatement(result.data, "Outcome");
                this.best_practice = this.filterStatement(
                  result.data,
                  "Best Practice"
                );
                this.compliance = this.filterStatement(
                  result.data,
                  "Extent of Compliance"
                );
                this.system_input.push({
                  ppp_statement_id: null,
                  statement: null,
                  type: "System Input and Process",
                  best_practice_id: null
                });
                this.implementation.push({
                  ppp_statement_id: null,
                  statement: null,
                  type: "Implementation",
                  best_practice_id: null
                });
                this.outcome.push({
                  ppp_statement_id: null,
                  statement: null,
                  type: "Outcome",
                  best_practice_id: null
                });
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
    filterStatement(statements, type) {
      if (statements?.length)
        return statements.filter(item => item.type === type);
      else return [];
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
      else if (filterArea === 1) return filterByArea(fileSelection, "Area I");
      else if (filterArea === 2) return filterByArea(fileSelection, "Area II");
      else if (filterArea === 3) return filterByArea(fileSelection, "Area III");
      else if (filterArea === 4) return filterByArea(fileSelection, "Area IV");
      else if (filterArea === 5) return filterByArea(fileSelection, "Area V");
      else if (filterArea === 6) return filterByArea(fileSelection, "Area VI");
      else if (filterArea === 7) return filterByArea(fileSelection, "Area VII");
      else if (filterArea === 8)
        return filterByArea(fileSelection, "Area VIII");
      else if (filterArea === 9) return filterByArea(fileSelection, "Area IX");
      else if (filterArea === 10) return filterByArea(fileSelection, "Area X");
    },
    addStatement(type) {
      let ppp_statement_id = null;
      let statement = null;
      let best_practice_id = null;
      if (type === "System Input and Process")
        this.system_input.push({
          ppp_statement_id,
          statement,
          type,
          best_practice_id
        });
      else if (type === "Implementation")
        this.implementation.push({
          ppp_statement_id,
          statement,
          type,
          best_practice_id
        });
      else if (type === "Outcome")
        this.outcome.push({
          ppp_statement_id,
          statement,
          type,
          best_practice_id
        });
      else if (type === "Best Practice")
        this.best_practice.push({
          ppp_statement_id,
          statement,
          type,
          best_practice_id
        });
      else if (type === "Extent of Compliance")
        this.compliance.push({
          ppp_statement_id,
          statement,
          type,
          best_practice_id
        });
      // if (type === "Best Practice") this.bestPracticeSelect.push(null);
    },
    addBestPractice(bestPractice) {
      let ppp_statement_id = null;
      let statement = bestPractice.best_practice;
      let type = "Best Practice";
      let best_practice_id = bestPractice.best_practice_id;
      this.best_practice.push({
        ppp_statement_id,
        statement,
        type,
        best_practice_id
      });
      let index = this.bestPracticeList.findIndex(
        data => data.best_practice_id === bestPractice.best_practice_id
      );
      this.bestPracticeList.splice(index, 1);
    },
    removeStatement(counter, type) {
      if (type === "System Input and Process")
        this.system_input.splice(counter, 1);
      else if (type === "Implementation")
        this.implementation.splice(counter, 1);
      else if (type === "Outcome") this.outcome.splice(counter, 1);
      else if (type === "Best Practice") this.best_practice.splice(counter, 1);
      else if (type === "Extent of Compliance")
        this.compliance.splice(counter, 1);
    },
    bestPracticeText({ best_practice, office_name }) {
      return `${best_practice} (${office_name})`;
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
    formatDate(item) {
      return moment(item).format("ll");
    },
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    },
    setBestPractice() {
      this.$store
        .dispatch("showAllBestPractice", this.campus.campus_id)
        .then(result => {
          this.bestPracticeList = filterBestPractice(
            result.data.best_practices,
            this.best_practice
          );
          // this.bestPracticeList = result.data.best_practices;
          if (this.bestPracticeList?.length) {
            this.totalRows_bestpractice = this.bestPracticeList.length;
          }
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    setContainer() {
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
    }
  },
  async created() {
    this.$isLoading(true);
    await this.$store
      .dispatch("showPPPStatement", this.parameterSelected.id)
      .then(result => {
        this.system_input = this.filterStatement(
          result.data,
          "System Input and Process"
        );
        this.implementation = this.filterStatement(
          result.data,
          "Implementation"
        );
        this.outcome = this.filterStatement(result.data, "Outcome");
        this.best_practice = this.filterStatement(result.data, "Best Practice");
        this.compliance = this.filterStatement(
          result.data,
          "Extent of Compliance"
        );
        this.system_input.push({
          ppp_statement_id: null,
          statement: null,
          type: "System Input and Process",
          best_practice_id: null
        });
        this.implementation.push({
          ppp_statement_id: null,
          statement: null,
          type: "Implementation",
          best_practice_id: null
        });
        this.outcome.push({
          ppp_statement_id: null,
          statement: null,
          type: "Outcome",
          best_practice_id: null
        });
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
