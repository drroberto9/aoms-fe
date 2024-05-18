<template>
  <div id="upload">
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

      <div v-for="(item, index) in filterRemarks(statement.id)" :key="index">
        <div
          v-if="item.remark"
          style="text-align:justify; margin-right: 100px;"
        >
          {{ concatName(item) }}
          <h6>"{{ item.remark }}"</h6>
        </div>
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

    <!--Upload File-->
    <b-modal id="app" v-model="uploadFile" size="lg" hide-footer>
      <template #modal-header>
        <h5>Upload File</h5>
      </template>
      <form @submit.prevent="fileUpload">
        <div v-for="(item, index) in documents" :key="index">
          <div class="md-layout" style="margin-bottom: 5px">
            <div class="md-layout-item">
              <b-form-file
                v-if="!documents[index]"
                v-model="documents[index]"
                required
              ></b-form-file>
              <b-form-input
                v-if="documents[index]"
                v-model="documents[index].name"
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
        <div>
          <md-button
            style="margin: 5px 0 0;"
            class="md-primary md-dense md-raised"
            @click="addDocument()"
            >Add Document</md-button
          >
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="
                uploadFile = false;
                attachmentDialog = true;
              "
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
              @click="
                uploadLink = false;
                attachmentDialog = true;
              "
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

    <!--Dialog Container-->
    <b-modal id="app" v-model="containerDialog" size="xl" hide-footer>
      <template #modal-header>
        <h5>Folders</h5>
      </template>

      <div class="md-layout">
        <div class="md-layout-item">
          <h6>Statement:</h6>
          {{ statement.statement }}
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
                placeholder="Search folder / tag / office"
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
              setDocuments(filterAttachments(statement.id));
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
          {{ statement.statement }}
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
                @input="searchDocumentTable(filterAttachments(statement.id))"
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
            @click="attachFile(statement.id, row.item.id)"
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

    <!--Edit Statement-->
    <b-modal id="app" v-model="edit" hide-footer>
      <template #modal-header>
        <h5>Edit Statement</h5>
      </template>
      <b-form-textarea
        id="statement"
        v-model="statement.statement"
        placeholder="Enter benchmark statement..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          style="margin: 0 5px 0 0"
          @click="edit = false"
          >Cancel</md-button
        >
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="
            editStatement();
            edit = false;
          "
          >Submit</md-button
        >
      </md-card-actions>
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
              removeAttachment();
              deletePrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px; margin-bottom: 10px;">
      <div class="md-layout">
        <div class="md-layout-item">
          <h4 v-if="instrument.program_name">{{ instrument.program_name }}</h4>
          <h4 v-else>{{ program.program_name }}</h4>
          <h5>Campus: {{ campus.campus_name }}</h5>
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
                <div class="md-layout">
                  <div class="md-layout-item">
                    {{ row.value }}
                  </div>
                  <div
                    v-if="
                      !statementList.find(
                        x =>
                          x.parent_statement_id ===
                          row.item.benchmark_statement_id
                      )
                    "
                    class="md-layout-item"
                    style="max-width: max-content"
                  >
                    <md-button
                      class="md-primary md-dense md-raised"
                      @click="
                        statement = row.item;
                        filterDocumentArea = instrument.area_number;
                        filterType = 'Primary';
                        search_container = '';
                        filterDocuments(filterAttachments(row.item.id));
                        containerDialog = true;
                      "
                      >Select Attachment</md-button
                    >
                  </div>
                </div>

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
                        <div
                          class="md-layout-item"
                          style="max-width: max-content"
                        >
                          <md-button
                            v-b-tooltip.hover
                            title="Delete"
                            class="md-icon-button md-dense md-accent"
                            @click="
                              fileSelected = item;
                              deletePrompt = true;
                            "
                            ><md-icon>close</md-icon></md-button
                          >
                        </div>
                      </div>
                    </div>
                  </md-card>
                </b-collapse>
              </div>
            </template>
            <!-- <template #cell(remark)="row">
              <div
                v-for="(item, index) in filterRemarks(row.item.id)"
                :key="index"
              >
                {{ item.last_name }}:<br />
                {{ item.remark }}<br />
              </div>
            </template> -->
            <template #cell(remark)="row">
              <div style="padding-left: 18px">
                <div style="margin-bottom: 5px">
                  <md-badge
                    v-if="checkMessage(row.item.id, 0) > 0"
                    :md-content="checkMessage(row.item.id, 0)"
                    md-dense
                  >
                    <md-button
                      style="margin: 0"
                      class="md-primary md-dense md-raised"
                      @click="
                        messages = [];
                        (message = ''), (messageType = 0);
                        statement = row.item;
                        showRemark(row.item.id);
                        readMessage(row.item.id, 0);
                        chatbox = true;
                      "
                      >Self Survey</md-button
                    >
                  </md-badge>
                  <md-button
                    v-else
                    style="margin: 0"
                    class="md-primary md-dense md-raised"
                    @click="
                      messages = [];
                      (message = ''), (messageType = 0);
                      statement = row.item;
                      showRemark(row.item.id);
                      chatbox = true;
                    "
                    >Self Survey</md-button
                  >
                </div>
                <div>
                  <md-badge
                    v-if="checkMessage(row.item.id, 1) > 0"
                    :md-content="checkMessage(row.item.id, 1)"
                    md-dense
                  >
                    <md-button
                      style="margin: 0"
                      class="md-primary md-dense md-raised"
                      @click="
                        messages = [];
                        (message = ''), (messageType = 1);
                        statement = row.item;
                        showRemark(row.item.id);
                        readMessage(row.item.id, 1);
                        chatbox = true;
                      "
                      >AACCUP</md-button
                    >
                  </md-badge>
                  <md-button
                    v-else
                    style="margin: 0"
                    class="md-primary md-dense md-raised"
                    @click="
                      messages = [];
                      (message = ''), (messageType = 1);
                      statement = row.item;
                      showRemark(row.item.id);
                      chatbox = true;
                    "
                    >AACCUP</md-button
                  >
                </div>
              </div>
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
              <div class="md-layout">
                <div class="md-layout-item">
                  {{ row.value }}
                </div>
                <div
                  v-if="
                    !statementList.find(
                      x =>
                        x.parent_statement_id ===
                        row.item.benchmark_statement_id
                    )
                  "
                  class="md-layout-item"
                  style="max-width: max-content"
                >
                  <md-button
                    class="md-primary md-dense md-raised"
                    @click="
                      statement = row.item;
                      filterDocumentArea = instrument.area_number;
                      filterType = 'Primary';
                      search_container = '';
                      filterDocuments(filterAttachments(row.item.id));
                      containerDialog = true;
                    "
                    >Select Attachment</md-button
                  >
                </div>
              </div>

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
                      <div
                        class="md-layout-item"
                        style="max-width: max-content"
                      >
                        <md-button
                          v-b-tooltip.hover
                          title="Delete"
                          class="md-icon-button md-dense md-accent"
                          @click="
                            fileSelected = item;
                            deletePrompt = true;
                          "
                          ><md-icon>close</md-icon></md-button
                        >
                      </div>
                    </div>
                  </div>
                </md-card>
              </b-collapse>
            </template>
            <!-- <template #cell(remark)="row">
              <div
                v-for="(item, index) in filterRemarks(row.item.id)"
                :key="index"
              >
                {{ item.last_name }}:
                <br />
                {{ item.remark }}
              </div>
            </template> -->
            <template #cell(remark)="row">
              <div style="padding-left: 18px">
                <div style="margin-bottom: 5px">
                  <md-badge
                    v-if="checkMessage(row.item.id, 0) > 0"
                    :md-content="checkMessage(row.item.id, 0)"
                    md-dense
                  >
                    <md-button
                      style="margin: 0"
                      class="md-primary md-dense md-raised"
                      @click="
                        messages = [];
                        (message = ''), (messageType = 0);
                        statement = row.item;
                        showRemark(row.item.id);
                        readMessage(row.item.id, 0);
                        chatbox = true;
                      "
                      >Self Survey</md-button
                    >
                  </md-badge>
                  <md-button
                    v-else
                    style="margin: 0"
                    class="md-primary md-dense md-raised"
                    @click="
                      messages = [];
                      (message = ''), (messageType = 0);
                      statement = row.item;
                      showRemark(row.item.id);
                      chatbox = true;
                    "
                    >Self Survey</md-button
                  >
                </div>
                <div>
                  <md-badge
                    v-if="checkMessage(row.item.id, 1) > 0"
                    :md-content="checkMessage(row.item.id, 1)"
                    md-dense
                  >
                    <md-button
                      style="margin: 0"
                      class="md-primary md-dense md-raised"
                      @click="
                        messages = [];
                        (message = ''), (messageType = 1);
                        statement = row.item;
                        showRemark(row.item.id);
                        readMessage(row.item.id, 1);
                        chatbox = true;
                      "
                      >AACCUP</md-button
                    >
                  </md-badge>
                  <md-button
                    v-else
                    style="margin: 0"
                    class="md-primary md-dense md-raised"
                    @click="
                      messages = [];
                      (message = ''), (messageType = 1);
                      statement = row.item;
                      showRemark(row.item.id);
                      chatbox = true;
                    "
                    >AACCUP</md-button
                  >
                </div>
              </div>
            </template>
          </b-table>
        </div>
      </div>

      <div class="md-layout" style="margin-top: 15px">
        <div class="md-layout-item"></div>
        <div class="md-layout-item" style="max-width: max-content">
          <div v-for="(item, index) in parameters" :key="index">
            <div v-if="item.parameter === parameter.parameter">
              <md-button
                v-if="parameters[index - 1]"
                class="md-primary md-raised"
                style="margin: 0 5px 0 5px"
                @click="
                  changeParameter(parameters[index - 1].id);
                  $store.commit('saveParameter', parameters[index - 1]);
                "
                >Back</md-button
              >
              <md-button
                v-if="parameters[index + 1]"
                class="md-primary md-raised"
                style="margin: 0 5px 0 5px"
                @click="
                  changeParameter(parameters[index + 1].id);
                  $store.commit('saveParameter', parameters[index + 1]);
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
import moment from "moment";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByStatement = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.statement).includes(toLower(term))
    );
  }
  return items;
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
      searchDocuments = documents.filter(
        item =>
          toLower(
            item.container.container_name ? item.container.container_name : ""
          ).includes(toLower(search)) ||
          toLower(item.office_name ? item.office_name : "").includes(
            toLower(search)
          )
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

const searchByParameter = (items, term) => {
  if (term) {
    return items.filter(item => item.program_parameter_id === term);
  }
  return items;
};

const searchByType = (items, term) => {
  if (term) {
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
  if (term) {
    return items.filter(item => item.statement_id === term);
  }
};

const filterTags = (items, term) => {
  if (term) {
    return items.filter(item => item.document_id === term);
  }
  return items;
};

export default {
  data() {
    return {
      sortBy: "statement",
      sortDesc: false,
      fields: [
        { key: "statement", label: this.type, sortable: true },
        {
          key: "remark",
          label: "Accreditor Remarks",
          thStyle: { width: "150px" }
        }
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
      setStatements: undefined,
      statementList: [],
      attachmentList: [],
      remarkList: [],
      statement: {},
      newStatement: null,
      search: "",
      containerDialog: false,
      attachmentDialog: false,
      edit: false,
      add: false,
      addSub: false,
      documentTags: [],
      myDocumentTags: [],
      containerList: [],
      documentList: [],
      selectionMyDocument: [],
      fileSelected: [],
      snackbarText: "",
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
      documents: [null],
      files: [
        {
          filename: null,
          link: null
        }
      ],
      filterDocumentArea: 0,
      filterMyDocumentArea: 0,
      filterType: "Primary",
      containerSelect: {},
      document_name: null,
      document: null,
      link: null,
      tag: [null],
      uploadFile: false,
      uploadLink: false,
      deletePrompt: false,
      messages: [],
      unreadMessages: [],
      message: null,
      messageType: null,
      chatbox: false
    };
  },
  computed: {
    ...mapState({
      user: "user",
      program: "program",
      instrument: "instrument",
      parameter: "parameter",
      campus: "campus"
    })
  },
  methods: {
    showFile(item) {
      if (item.type === "link") window.open(item.link);
      if (item.type === "file") this.downloadLetter(item);
    },
    downloadLetter(documentSelect) {
      this.$isLoading(true);
      let type = null;
      let document_id = documentSelect.document_id;
      if (this.attachmentDialog === true) document_id = documentSelect.id;
      this.$store
        .dispatch("documentType", document_id)
        .then(result => {
          type = result.data.type;
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
      this.$store
        .dispatch("documentViewFile", document_id)
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
    getTags(id, tagList) {
      let tags = filterTags(tagList, id);
      if (tags?.length) {
        let document_id = tags[0].document_id;
        let tag = tags[0].tag;
        if (tags.length > 0) {
          for (let x = 1; x < tags.length; x++) {
            tag = tag.concat(", ", tags[x].tag);
          }
          return { document_id, tag };
        } else return { document_id, tag };
      }
    },
    changeParameter() {
      let program_id = this.program.id;
      let transaction_id = this.instrument.id;
      this.$isLoading(true);
      this.$nextTick(() => {
        document.getElementById("upload").scrollIntoView();
      });
      this.$store
        .dispatch("showStatementDocument", { program_id, transaction_id })
        .then(result => {
          this.statementList = searchByParameter(
            result.data.statements,
            this.parameter.id
          );
          this.unreadMessages = result.data.unread_message_count;
          this.attachmentList = result.data.documents;
          this.remarkList = result.data.remarks;
          this.$isLoading(false);
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
    attachFile(benchmark_statement_id, document_id) {
      this.$isLoading(true);
      this.$store
        .dispatch("attachSupportDocument", {
          benchmark_statement_id,
          document_id
        })
        .then(result => {
          if (result.data.status === true) {
            let index = this.documentList.findIndex(
              data => data.id === document_id
            );
            this.documentList.splice(index, 1);
            let program_id = this.program.id;
            let transaction_id = this.instrument.id;
            this.$store
              .dispatch("showStatementDocument", { program_id, transaction_id })
              .then(result => {
                this.attachmentList = result.data.documents;
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
        .dispatch("removeSupportDocument", this.fileSelected.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.attachmentList.findIndex(
              data => data.id === this.fileSelected.id
            );
            this.attachmentList.splice(index, 1);
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
    filterAttachments(benchmark_id) {
      let attachments = searchByStatementID(this.attachmentList, benchmark_id);
      if (attachments?.length && attachments.length > 1)
        return attachments.sort((a, b) => a.id - b.id);
      else return attachments;
    },
    filterRemarks(benchmark_id) {
      if (this.remarkList?.length) {
        return this.remarkList.filter(
          item => item.id === benchmark_id && item.remark_type === "General"
        );
      }
    },
    editStatement() {
      this.$store.dispatch("editStatement", this.statement).catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
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

      // await this.$store
      //   .dispatch("showOwnContainer", this.user.id)
      //   .then(result => {
      //     this.selectionMyDocument = result.data.documents;
      //     this.myDocumentTags = result.data.tags;
      //     if (selectedDocuments?.length) {
      //       for (let x = 0; x < selectedDocuments.length; x++) {
      //         this.selectionMyDocument = this.selectionMyDocument.filter(
      //           item => item.id !== selectedDocuments[x].document_id
      //         );
      //       }
      //     }
      //   })
      //   .catch(err => {
      //     this.snackbarText = err + ". Please contact the administrator";
      //     this.makeToast("Error", "danger");
      //   });
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
    fileUpload() {
      this.$isLoading(true);
      let user_id = this.user.id;
      let container_id = this.containerSelect.container.id;
      let type = "file";
      let documents = this.documents;
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
              .dispatch("showDocument", this.containerSelect.container.id)
              .then(result => {
                this.documentList = result.data.documents;
                this.totalRows_document = this.documentList.length;
              });
            this.uploadFile = false;
            this.attachmentDialog = true;
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
      let container_id = this.containerSelect.container.id;
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
              .dispatch("showDocument", this.containerSelect.container.id)
              .then(result => {
                this.documentList = result.data.documents;
                this.totalRows_document = this.documentList.length;
              });
            this.uploadLink = false;
            this.attachmentDialog = true;
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
    tagArea(area_number) {
      if (area_number === 1) return "Area I";
      else if (area_number === 2) return "Area II";
      else if (area_number === 3) return "Area III";
      else if (area_number === 4) return "Area IV";
      else if (area_number === 5) return "Area V";
      else if (area_number === 6) return "Area VI";
      else if (area_number === 7) return "Area VII";
      else if (area_number === 8) return "Area VIII";
      else if (area_number === 9) return "Area IX";
      else if (area_number === 10) return "Area X";
    },
    addTag() {
      if (
        this.tag[this.tag.length - 1] !== null &&
        this.tag[this.tag.length - 1] !== ""
      )
        this.tag.push(null);
    },
    removeTag(counter) {
      this.tag.splice(counter, 1);
    },
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
    addDocument() {
      if (this.documents[this.documents.length - 1] !== null) {
        this.documents.push(null);
      }
    },
    removeDocument(counter) {
      this.documents.splice(counter, 1);
    },
    addFile() {
      if (this.files[this.files.length - 1].link !== null) {
        this.files.push({ filename: null, link: null });
      }
    },
    removeFile(counter) {
      this.files.splice(counter, 1);
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
    sortStatements(type) {
      return searchByType(this.statementList, type);
    },
    getId(item) {
      return item.toString();
    },
    showRemark(id) {
      let program_id = this.program.id;
      let statement_id = id;
      let type = this.messageType;
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
      if (this.messageType === 1) type = "External";
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
    checkMessage(id, type) {
      if (type === 0)
        return this.unreadMessages.find(item => item.id === id).count_internal;
      else if (type === 1)
        return this.unreadMessages.find(item => item.id === id).count_external;
    },
    readMessage(id, type) {
      if (type === 0)
        this.unreadMessages.find(item => item.id === id).count_internal = 0;
      else if (type === 1)
        this.unreadMessages.find(item => item.id === id).count_external = 0;
    },
    back() {
      this.$router.push("/TaskForceParameter");
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
        this.remarkList = result.data.remarks;
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
    await this.$isLoading(false);
  }
};
</script>
