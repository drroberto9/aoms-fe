<template>
  <div>
    <!--Summary of Ratings-->
    <b-modal id="app" v-model="SAR" size="xl" hide-footer>
      <template #modal-header>
        <h5>Summary of Ratings</h5>
        <div v-if="checkRole()">
          <md-button
            v-if="program.level === 'Candidate'"
            style="width: 150px; margin: 0;"
            class="md-primary md-raised"
            @click="generateSFRReport()"
            >Download All</md-button
          >
          <md-button
            v-else
            style="width: 150px; margin: 0;"
            class="md-primary md-raised"
            @click="generateProgramSAR()"
            >Download All</md-button
          >
        </div>
      </template>

      <div>
        <b-table
          :items="area_mean"
          :fields="fieldsReport()"
          :sort-by.sync="sortBy_report"
          :sort-desc.sync="sortDesc"
          class="md-elevation-2"
          bordered
          sort-icon-left
          style="margin-bottom: 10px"
          responsive="sm"
        >
          <template #cell(area_mean)="row">
            {{ roundNum(row.value) }}
          </template>
          <template #cell(weighted_mean)="row">
            {{ roundNum(row.value) }}
          </template>
        </b-table>

        <div v-if="checkLevel()">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Grand Mean:
            </div>
            <div class="md-layout-item" style="max-width: 138px">
              {{
                area_mean.length
                  ? roundNum(result[0].total_area_mean / area_mean.length)
                  : "NaN"
              }}
            </div>
          </div>

          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Descriptive Rating:
            </div>
            <div class="md-layout-item" style="max-width: 138px">
              {{
                area_mean.length
                  ? getDescription(result[0].total_area_mean / area_mean.length)
                  : "NaN"
              }}
            </div>
          </div>

          <br /><br />

          <div v-show="instrument_programs">
            <div class="md-layout">
              <div class="md-layout-item">
                <h5>{{ areaSelected ? areaSelected.area_name : "" }}</h5>
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <div v-for="(item, index) in instrument_programs" :key="index">
                  <div v-if="item.id === areaSelected.id">
                    <md-button
                      v-if="instrument_programs[index - 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0 5px 0 0"
                      @click="areaSelected = instrument_programs[index - 1]"
                      >Back</md-button
                    >
                    <md-button
                      v-if="instrument_programs[index + 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0"
                      @click="areaSelected = instrument_programs[index + 1]"
                      >Next</md-button
                    >
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div class="md-layout">
              <div class="md-layout-item">
                <b>Instructions:</b>
                Select and edit which statements that is best applied.
              </div>
              <div
                v-if="program.level === 'Candidate'"
                class="md-layout-item"
                style="max-width: max-content"
              >
                <md-button
                  v-if="checkRole()"
                  style="width: 150px; margin: 0;"
                  class="md-primary md-raised"
                  @click="generateSFRAreaReport()"
                  >Download Area PDF</md-button
                >
              </div>
            </div>

            <br />

            <areaPSVR
              v-if="program.level === 'Candidate'"
              v-bind:areaSelected="areaSelected"
              v-bind:collection="collection"
              v-bind:role="role"
              :key="areaSelected"
            />

            <areaAR
              v-else
              v-bind:areaSelected="areaSelected"
              v-bind:collection="collection"
              v-bind:role="role"
              :key="areaSelected"
            />

            <!-- <div class="md-layout">
              <div class="md-layout-item">
                <h5>{{ areaSelected.area_name }}</h5>
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <md-button
                  v-if="role.includes('leader')"
                  style="width: 150px; margin: 0;"
                  class="md-primary md-raised"
                  @click="generateProgramSAR()"
                  >Download PDF</md-button
                >
              </div>
            </div>

            <br />

            <div class="md-layout">
              <div class="md-layout-item">
                <b>Instructions:</b>
                Select and edit which statements that is best applied.
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <div
                  v-for="(item, index) in instrument_programs"
                  :key="index"
                >
                  <div v-if="item.id === areaSelected.id">
                    <md-button
                      v-if="instrument_programs[index - 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0 5px 0 0"
                      @click="areaSelected = instrument_programs[index - 1]"
                      >Back</md-button
                    >
                    <md-button
                      v-if="instrument_programs[index + 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0"
                      @click="areaSelected = instrument_programs[index + 1]"
                      >Next</md-button
                    >
                  </div>
                </div>
              </div>
            </div>

            <br />

            <areaAR
              v-bind:areaSelected="areaSelected"
              v-bind:collection="collection"
              v-bind:role="role"
              :key="areaSelected"
            /> -->

            <br />

            <div class="md-layout">
              <div class="md-layout-item"></div>
              <div class="md-layout-item" style="max-width: max-content">
                <div v-for="(item, index) in instrument_programs" :key="index">
                  <div v-if="item.id === areaSelected.id">
                    <md-button
                      v-if="instrument_programs[index - 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0 5px 0 0"
                      @click="areaSelected = instrument_programs[index - 1]"
                      >Back</md-button
                    >
                    <md-button
                      v-if="instrument_programs[index + 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0"
                      @click="areaSelected = instrument_programs[index + 1]"
                      >Next</md-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div v-if="!checkLevel()" class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Total:
            </div>
            <div class="md-layout-item" style="max-width: 150px">
              {{ result[0].total_weight }}
            </div>
            <div class="md-layout-item" style="max-width: 150px">
              {{ roundNum(result[0].total_area_mean) }}
            </div>
            <div class="md-layout-item" style="max-width: 138px">
              {{ roundNum(result[0].total_weighted_mean) }}
            </div>
          </div>

          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Grand Mean:
            </div>
            <div class="md-layout-item" style="max-width: 300px"></div>
            <div class="md-layout-item" style="max-width: 138px">
              {{ roundNum(result[0].grand_mean) }}
            </div>
          </div>

          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Descriptive Rating:
            </div>
            <div class="md-layout-item" style="max-width: 300px"></div>
            <div class="md-layout-item" style="max-width: 138px">
              {{ getDescription(result[0].grand_mean) }}
            </div>
          </div>
        </div>
      </div>

      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="SAR = false"
            >Close</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Summary of Ratings-->
    <b-modal
      id="app"
      v-model="internalSAR"
      size="xl"
      hide-footer
      ref="testHtml"
    >
      <template #modal-header>
        <h5>Summary of Ratings</h5>
        <div v-if="checkRole()">
          <md-button
            v-if="program.level === 'Candidate'"
            style="width: 150px; margin: 0;"
            class="md-primary md-raised"
            @click="generateSFRReport()"
            >Download All</md-button
          >
          <md-button
            v-else
            style="width: 150px; margin: 0;"
            class="md-primary md-raised"
            @click="generateProgramSAR()"
            >Download All</md-button
          >
        </div>
      </template>

      <div>
        <b-table
          :items="area_mean_internal"
          :fields="fieldsReport()"
          :sort-by.sync="sortBy_report"
          :sort-desc.sync="sortDesc"
          class="md-elevation-2"
          bordered
          sort-icon-left
          style="margin-bottom: 10px"
          responsive="sm"
        >
          <template #cell(area_mean)="row">
            {{ roundNum(row.value) }}
          </template>
          <template #cell(weighted_mean)="row">
            {{ roundNum(row.value) }}
          </template>
        </b-table>

        <div v-if="checkLevel()">
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Grand Mean:
            </div>
            <div class="md-layout-item" style="max-width: 138px">
              {{
                area_mean_internal.length
                  ? roundNum(
                      result_internal[0].total_area_mean /
                        area_mean_internal.length
                    )
                  : "NaN"
              }}
            </div>
          </div>

          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Descriptive Rating:
            </div>
            <div class="md-layout-item" style="max-width: 138px">
              {{
                area_mean_internal.length
                  ? getDescription(
                      result_internal[0].total_area_mean /
                        area_mean_internal.length
                    )
                  : "NaN"
              }}
            </div>
          </div>

          <br /><br />

          <div v-show="instrument_programs">
            <div class="md-layout">
              <div class="md-layout-item">
                <h5>{{ areaSelected ? areaSelected.area_name : "" }}</h5>
              </div>
              <div class="md-layout-item" style="max-width: max-content">
                <div v-for="(item, index) in instrument_programs" :key="index">
                  <div v-if="item.id === areaSelected.id">
                    <md-button
                      v-if="instrument_programs[index - 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0 5px 0 0"
                      @click="areaSelected = instrument_programs[index - 1]"
                      >Back</md-button
                    >
                    <md-button
                      v-if="instrument_programs[index + 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0"
                      @click="areaSelected = instrument_programs[index + 1]"
                      >Next</md-button
                    >
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div class="md-layout">
              <div class="md-layout-item">
                <b>Instructions:</b>
                Select and edit which statements that is best applied.
              </div>
              <div
                v-if="program.level === 'Candidate'"
                class="md-layout-item"
                style="max-width: max-content"
              >
                <md-button
                  v-if="checkRole()"
                  style="width: 150px; margin: 0;"
                  class="md-primary md-raised"
                  @click="generateSFRAreaReport()"
                  >Download Area PDF</md-button
                >
              </div>
            </div>

            <br />

            <areaPSVR
              v-if="program.level === 'Candidate'"
              v-bind:areaSelected="areaSelected"
              v-bind:collection="collection"
              v-bind:role="role"
              :key="areaSelected"
            />

            <areaAR
              v-else
              v-bind:areaSelected="areaSelected"
              v-bind:collection="collection"
              v-bind:role="role"
              :key="areaSelected"
            />

            <br />

            <div class="md-layout">
              <div class="md-layout-item"></div>
              <div class="md-layout-item" style="max-width: max-content">
                <div v-for="(item, index) in instrument_programs" :key="index">
                  <div v-if="item.id === areaSelected.id">
                    <md-button
                      v-if="instrument_programs[index - 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0 5px 0 0"
                      @click="areaSelected = instrument_programs[index - 1]"
                      >Back</md-button
                    >
                    <md-button
                      v-if="instrument_programs[index + 1]"
                      class="md-primary md-raised md-dense"
                      style="margin: 0"
                      @click="areaSelected = instrument_programs[index + 1]"
                      >Next</md-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Total:
            </div>
            <div class="md-layout-item" style="max-width: 150px">
              {{ result_internal[0].total_weight }}
            </div>
            <div class="md-layout-item" style="max-width: 150px">
              {{ roundNum(result_internal[0].total_area_mean) }}
            </div>
            <div class="md-layout-item" style="max-width: 138px">
              {{ roundNum(result_internal[0].total_weighted_mean) }}
            </div>
          </div>

          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Grand Mean:
            </div>
            <div class="md-layout-item" style="max-width: 300px"></div>
            <div class="md-layout-item" style="max-width: 138px">
              {{ roundNum(result_internal[0].grand_mean) }}
            </div>
          </div>

          <div class="md-layout">
            <div class="md-layout-item"></div>
            <div
              class="md-layout-item"
              style="max-width: fit-content; margin-right: 21px; font-weight: bold"
            >
              Descriptive Rating:
            </div>
            <div class="md-layout-item" style="max-width: 300px"></div>
            <div class="md-layout-item" style="max-width: 138px">
              {{ getDescription(result_internal[0].grand_mean) }}
            </div>
          </div>
        </div>
      </div>

      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="internalSAR = false"
            >Close</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Summary of Findings and Recommendations-->
    <b-modal id="app" v-model="SFR" size="xl" hide-footer>
      <template #modal-header>
        <h5>Summary of Findings and Recommendations</h5>
        <md-button
          v-if="checkRole()"
          style="width: 150px; margin: 0;"
          class="md-primary md-raised"
          @click="showSFR()"
          >Download SFR</md-button
        >
      </template>

      <div v-show="instrument_programs">
        <div class="md-layout">
          <div class="md-layout-item">
            <h5>{{ areaSelected ? areaSelected.area_name : "" }}</h5>
          </div>
          <div class="md-layout-item" style="max-width: max-content">
            <div v-for="(item, index) in instrument_programs" :key="index">
              <div v-if="item.id === areaSelected.id">
                <md-button
                  v-if="instrument_programs[index - 1]"
                  class="md-primary md-raised md-dense"
                  style="margin: 0 5px 0 0"
                  @click="areaSelected = instrument_programs[index - 1]"
                  >Back</md-button
                >
                <md-button
                  v-if="instrument_programs[index + 1]"
                  class="md-primary md-raised md-dense"
                  style="margin: 0"
                  @click="areaSelected = instrument_programs[index + 1]"
                  >Next</md-button
                >
              </div>
            </div>
          </div>
        </div>

        <br />

        <areaSFR
          v-bind:areaSelected="areaSelected"
          v-bind:collection="collection"
          v-bind:role="role"
          :key="areaSelected"
        />

        <br />

        <div class="md-layout">
          <div class="md-layout-item"></div>
          <div class="md-layout-item" style="max-width: max-content">
            <div v-for="(item, index) in instrument_programs" :key="index">
              <div v-if="item.id === areaSelected.id">
                <md-button
                  v-if="instrument_programs[index - 1]"
                  class="md-primary md-raised md-dense"
                  style="margin: 0 5px 0 0"
                  @click="areaSelected = instrument_programs[index - 1]"
                  >Back</md-button
                >
                <md-button
                  v-if="instrument_programs[index + 1]"
                  class="md-primary md-raised md-dense"
                  style="margin: 0"
                  @click="areaSelected = instrument_programs[index + 1]"
                  >Next</md-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <md-card-actions>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="SFR = false"
            >Close</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Assign Self Survey Accreditor-->
    <b-modal id="app" v-model="assignAccreditor" size="lg" hide-footer>
      <template #modal-header>
        <h5>Assign Accreditor</h5>
      </template>
      <form @submit.prevent="assignTask">
        <b-form-group
          id="assignAccreditor-group-1"
          label="Accreditor:"
          label-for="assignAccreditor-1"
        >
          <multiselect
            v-model="userSelect"
            :options="filterUsers(setUsers(instrumentSelect))"
            :custom-label="userName"
            :placeholder="null"
            required
          ></multiselect>
        </b-form-group>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="assignAccreditor = false"
              >Cancel</md-button
            >
          </div>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0"
              type="submit"
              >Add</md-button
            >
          </div>
        </md-card-actions>
      </form>
    </b-modal>

    <!--Upload-->
    <b-modal id="app" v-model="upload" size="lg" hide-footer>
      <template #modal-header>
        <h5>Upload {{ type }}</h5>
      </template>
      <form @submit.prevent="uploadProgramFile()">
        <b-form-file
          v-model="filename[0]"
          size="sm"
          style="margin-bottom: 5px"
          required
        ></b-form-file>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0;"
              @click="upload = false"
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
              removeFile();
              deletePrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Lock Prompt-->
    <b-modal id="app" v-model="lockPrompt">
      <template #modal-header>
        <h5>Locked</h5>
      </template>
      This program is currently locked.
      <template #modal-footer>
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="lockPrompt = false"
          >Done</md-button
        >
      </template>
    </b-modal>

    <!--Delete User-->
    <b-modal id="app" v-model="deleteUserPrompt">
      <template #modal-header>
        <h5>Remove User</h5>
      </template>
      Are you sure you want to remove this user?
      <template #modal-footer>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0 5px 0 0"
            @click="deleteUserPrompt = false"
            >Cancel</md-button
          >
        </div>
        <div>
          <md-button
            class="md-primary md-raised"
            style="margin: 0"
            @click="
              removeUser();
              deleteUserPrompt = false;
            "
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <h4>{{ program.program_name }}</h4>
      <h5>Campus: {{ program.campus_name }}</h5>
      <h5>Accreditation Role: {{ showRole }}</h5>

      <!-- <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4>{{ program.program_name }}</h4>
          <h5>Campus: {{ program.campus_name }}</h5>
          <h5>Accreditation Role: {{ showRole }}</h5>
        </div>
        <div class="md-layout-item" style="min-width: max-content">
          <div v-if="checkLevel()" class="md-layout" style="margin-bottom: 5px">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                v-if="role.includes('external')"
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  setSFR(1);
                  SAR = true;
                "
                >Generate Report</md-button
              >
              <md-button
                v-else-if="role.includes('internal')"
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  setSFR(0);
                  internalSAR = true;
                "
                >Generate Report</md-button
              >
            </div>
          </div>
          <div v-else class="md-layout" style="margin-bottom: 5px">
            <div class="md-layout-item"></div>
            <div class="md-layout-item" style="max-width: max-content">
              <md-button
                v-if="role.includes('external')"
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="SAR = true"
                >Generate SAR</md-button
              >
              <md-button
                v-else-if="role.includes('internal')"
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="internalSAR = true"
                >Generate SAR</md-button
              >
            </div>
            <div
              class="md-layout-item"
              style="max-width: max-content; margin-left: 5px"
            >
              <md-button
                v-if="role.includes('external')"
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  setSFR(1);
                  SFR = true;
                "
                >Generate SFR</md-button
              >
              <md-button
                v-else-if="role.includes('internal')"
                style="width: 150px; margin: 0;"
                class="md-primary md-raised"
                @click="
                  setSFR(0);
                  SFR = true;
                "
                >Generate SFR</md-button
              >
            </div>
          </div>
        </div>
      </div> -->

      <div class="md-layout" style="margin-bottom: 10px">
        <div class="md-layout-item"></div>
        <!-- <div class="md-layout-item">
          <h5 style="margin-top: 15px">Accreditation Documents:</h5>
        </div> -->
        <div class="md-layout-item" style="max-width: max-content">
          <b-dropdown
            v-if="checkRole()"
            variant="primary"
            text="Upload Reports"
          >
            <b-dropdown-item
              @click="
                filename = [null];
                type = 'SAR';
                upload = true;
              "
              >SAR</b-dropdown-item
            >
            <b-dropdown-item
              @click="
                filename = [null];
                type = 'SFR';
                upload = true;
              "
              >SFR</b-dropdown-item
            >
          </b-dropdown>

          <b-dropdown
            v-else-if="role.includes('internal')"
            variant="primary"
            text="Upload Reports"
          >
            <b-dropdown-item
              @click="
                filename = [null];
                type = 'Internal SAR';
                upload = true;
              "
              >SAR</b-dropdown-item
            >
            <b-dropdown-item
              @click="
                filename = [null];
                type = 'Internal SFR';
                upload = true;
              "
              >SFR</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item">
          <h5 style="margin-top: 15px">Accreditation Documents:</h5>
        </div>
        <div class="md-layout-item" style="max-width: 150px;">
          <b-form-select v-model="filterType" class="mb-3">
            <b-form-select-option :value="0">Show All</b-form-select-option>
            <b-form-select-option :value="1">PPP</b-form-select-option>
            <b-form-select-option :value="2"
              >Compliance Report</b-form-select-option
            >
            <b-form-select-option :value="3"
              >Narrative Report</b-form-select-option
            >
            <b-form-select-option :value="4">SAR</b-form-select-option>
            <b-form-select-option :value="5">SFR</b-form-select-option>
            <b-form-select-option :value="6"
              >Rated Instrument</b-form-select-option
            >
          </b-form-select>
        </div>
        <div class="md-layout-item" style="max-width: 330px; margin-left: 5px">
          <b-form-input
            placeholder="Search document"
            v-model="search_files"
            @input="searchFileTable()"
            type="text"
          ></b-form-input>
        </div>
      </div>

      <b-table
        :items="filterByType()"
        :fields="fields_files"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy_files"
        :sort-desc.sync="sortDesc"
        class="md-elevation-2"
        outlined
        small
        sort-icon-left
        style="margin-bottom: 0"
        responsive="sm"
      >
        <template #cell(file_title)="row">
          <b-link @click="downloadReport(row.item)">{{
            row.item.file_title
          }}</b-link>
        </template>

        <template #cell(type)="row">
          {{ getType(row.item) }}
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
        :total-rows="filterByType() ? filterByType().length : 0"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-auto md-elevation-2"
      ></b-pagination>

      <br />

      <div v-if="role.includes('internal') || !checkRole()">
        <h5>Areas:</h5>

        <b-table
          :items="msiList"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          class="md-elevation-2"
          outlined
          sort-icon-left
          style="margin-bottom: 0"
          responsive="sm"
        >
          <template #cell(updated_at)="row">
            {{ formatDate(row.value) }}
          </template>

          <template #cell(actions)="row">
            <md-button
              v-if="!checkLevel()"
              v-b-tooltip.hover
              title="Download Rated Instrument"
              class="md-icon-button md-dense md-primary"
              @click="downloadOBE(row.item)"
              ><md-icon>download</md-icon></md-button
            >
            <md-button
              v-if="role.includes('internal')"
              v-b-tooltip.hover
              title="Upload Rated Instrument"
              class="md-icon-button md-dense md-primary"
              @click="
                filename = [null];
                type = 'Internal Rated Instrument';
                upload = true;
              "
              ><md-icon>upload</md-icon></md-button
            >
            <md-button
              v-else
              v-b-tooltip.hover
              title="Upload Rated Instrument"
              class="md-icon-button md-dense md-primary"
              @click="
                filename = [null];
                type = 'Rated Instrument';
                upload = true;
              "
              ><md-icon>upload</md-icon></md-button
            >
            <md-badge
              v-if="filterMessageByArea(messages, row.item.id).length > 0"
              class="md-square"
              md-content="New"
              md-dense
            >
              <md-button
                v-if="
                  role.includes('internal') && program.self_survey_status === 1
                "
                v-b-tooltip.hover
                title="Select"
                class="md-icon-button md-dense md-primary"
                @click="lockPrompt = true"
                ><md-icon>forward</md-icon></md-button
              >
              <md-button
                v-else
                v-b-tooltip.hover
                title="Select"
                class="md-icon-button md-dense md-primary"
                @click="select(row.item)"
                ><md-icon>forward</md-icon></md-button
              >
            </md-badge>
            <span v-else>
              <md-button
                v-if="
                  role.includes('internal') && program.self_survey_status === 1
                "
                v-b-tooltip.hover
                title="Select"
                class="md-icon-button md-dense md-primary"
                @click="lockPrompt = true"
                ><md-icon>forward</md-icon></md-button
              >
              <md-button
                v-else
                v-b-tooltip.hover
                title="Select"
                class="md-icon-button md-dense md-primary"
                @click="select(row.item)"
                ><md-icon>forward</md-icon></md-button
              >
            </span>
          </template>
        </b-table>
      </div>

      <!-- <div class="md-layout" style="margin-bottom: 5px">
        <div class="md-layout-item">
          <h5 style="margin-top: 15px">Areas:</h5>
        </div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            v-if="role.includes('leader')"
            style="width: 125px; margin: 0;"
            class="md-primary md-raised"
            @click="
              showAccreditorInstrument();
              reassign = true;
            "
            >Reassign</md-button
          >
        </div>
      </div> -->

      <md-tabs
        v-else
        :md-active-tab="tabSelect"
        md-elevation="1"
        class="md-primary"
      >
        <md-tab id="accreditation-0" md-label="My Areas" style="padding: 0">
          <b-table
            :items="msiList"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            class="md-elevation-2"
            outlined
            sort-icon-left
            style="margin-bottom: 0"
            responsive="sm"
          >
            <template #cell(updated_at)="row">
              {{ formatDate(row.value) }}
            </template>

            <template #cell(actions)="row">
              <md-button
                v-if="!checkLevel()"
                v-b-tooltip.hover
                title="Download Rated Instrument"
                class="md-icon-button md-dense md-primary"
                @click="downloadOBE(row.item)"
                ><md-icon>download</md-icon></md-button
              >
              <md-button
                v-if="role.includes('internal')"
                v-b-tooltip.hover
                title="Upload Rated Instrument"
                class="md-icon-button md-dense md-primary"
                @click="
                  filename = [null];
                  type = 'Internal Rated Instrument';
                  upload = true;
                "
                ><md-icon>upload</md-icon></md-button
              >
              <md-button
                v-else
                v-b-tooltip.hover
                title="Upload Rated Instrument"
                class="md-icon-button md-dense md-primary"
                @click="
                  filename = [null];
                  type = 'Rated Instrument';
                  upload = true;
                "
                ><md-icon>upload</md-icon></md-button
              >
              <md-button
                v-if="
                  role.includes('internal') && program.self_survey_status === 1
                "
                v-b-tooltip.hover
                title="Select"
                class="md-icon-button md-dense md-primary"
                @click="lockPrompt = true"
                ><md-icon>forward</md-icon></md-button
              >
              <md-button
                v-else
                v-b-tooltip.hover
                title="Select"
                class="md-icon-button md-dense md-primary"
                @click="select(row.item)"
                ><md-icon>forward</md-icon></md-button
              >
            </template>
          </b-table>
        </md-tab>

        <!-- All Areas -->
        <md-tab id="accreditation-1" md-label="All Areas" style="padding: 0">
          <b-table
            :items="areaList"
            :fields="fields_lead"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            class="md-elevation-2"
            outlined
            sort-icon-left
            style="margin-bottom: 0"
            responsive="sm"
          >
            <template #cell(user)="row">
              <div class="md-layout">
                <div class="md-layout-item">
                  <b-form-tags
                    style="border: none"
                    add-on-change
                    no-outer-focus
                  >
                    <template>
                      <div>
                        <span
                          v-for="(item, index) in setUsers(row.item)"
                          :key="index"
                        >
                          <b-form-tag
                            @remove="
                              userSelect = item;
                              deleteUserPrompt = true;
                            "
                            variant="primary"
                            >{{ concatName(item) }}</b-form-tag
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
                      instrumentSelect = row.item;
                      userSelect = null;
                      assignAccreditor = true;
                    "
                    ><md-icon>add_circle</md-icon></md-button
                  >
                </div>
              </div>
            </template>

            <template #cell(actions)="row">
              <md-button
                v-if="!checkLevel()"
                v-b-tooltip.hover
                title="Download Rated Instrument"
                class="md-icon-button md-dense md-primary"
                @click="downloadOBE(row.item)"
                ><md-icon>download</md-icon></md-button
              >
              <md-button
                v-if="role.includes('internal')"
                v-b-tooltip.hover
                title="Upload Rated Instrument"
                class="md-icon-button md-dense md-primary"
                @click="
                  filename = [null];
                  type = 'Internal Rated Instrument';
                  upload = true;
                "
                ><md-icon>upload</md-icon></md-button
              >
              <md-button
                v-else
                v-b-tooltip.hover
                title="Upload Rated Instrument"
                class="md-icon-button md-dense md-primary"
                @click="
                  filename = [null];
                  type = 'Rated Instrument';
                  upload = true;
                "
                ><md-icon>upload</md-icon></md-button
              >
            </template>
          </b-table>
        </md-tab>
      </md-tabs>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import areaSFR from "../Accreditor/Generate SFR";
import areaAR from "../Accreditor/Generate Accreditor Report";
import areaPSVR from "../Accreditor/Generate PSV Report";
import moment from "moment";
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByFile = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.file_title).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "AccreditationArea",
  data() {
    return {
      sortBy: "id",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Area", sortable: true },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "180px" } }
      ],
      fields_lead: [
        { key: "id", label: "ID", sortable: true },
        { key: "area_name", label: "Area", sortable: true },
        { key: "user", label: "Accreditors", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "120px" } }
      ],
      sortBy_report: "area_number",
      fields_report: [
        { key: "area", label: "Area Name" },
        { key: "weight", label: "Weight", thStyle: { width: "150px" } },
        { key: "area_mean", label: "Area Mean", thStyle: { width: "150px" } },
        {
          key: "weighted_mean",
          label: "Weighted Mean",
          thStyle: { width: "150px" }
        }
      ],
      fields_advancedReport: [
        { key: "area", label: "Area Name" },
        { key: "area_mean", label: "Area Mean", thStyle: { width: "150px" } }
      ],
      sortBy_files: "type",
      fields_files: [
        { key: "id", label: "ID", sortable: true, thStyle: { width: "70px" } },
        { key: "file_title", label: "Document", sortable: true },
        { key: "type", label: "Type", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      msiList: [],
      area_mean: [],
      area_mean_internal: [],
      result: [
        {
          total_weight: null,
          total_area_mean: null,
          total_weighted_mean: null,
          grand_mean: null
        }
      ],
      result_internal: [
        {
          total_weight: null,
          total_area_mean: null,
          total_weighted_mean: null,
          grand_mean: null
        }
      ],
      taskList: [{}],
      meanList: [],
      programFiles: [],
      search_files: null,
      filterType: 0,
      collection: [],
      instrument_programs: [],
      search: null,
      role: null,
      type: null,
      filename: [null],
      documentSelect: null,
      areaSelected: null,
      areaList: [],
      users: [],
      userList: [],
      userSelect: null,
      instrumentSelect: null,
      messages: [],
      deletePrompt: false,
      lockPrompt: false,
      upload: false,
      SAR: false,
      internalSAR: false,
      SFR: false,
      reassign: false,
      assignAccreditor: false,
      deleteUserPrompt: false,
      snackbarText: ""
    };
  },
  components: {
    areaSFR,
    areaAR,
    areaPSVR
  },
  computed: {
    ...mapState({
      program: "program",
      user: "user",
      campus: "campus",
      tabSelect: "tabSelect",
      coordinator: "coordinator"
    }),
    showRole: {
      get: function() {
        if (this.role.includes("leader")) return "Lead Accreditor";
        else if (this.coordinator === 1) return "Overall Coordinator";
        else return "Accreditor";
      }
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
    messageToast(title, variant) {
      this.$bvToast.toast(this.snackbarText, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-left",
        solid: true,
        noAutoHide: true
      });
    },
    sortArea(a, b) {
      return a.area_number - b.area_number;
    },
    searchFileTable: _.debounce(function() {
      let user_id = this.user.id;
      let program_id = this.program.id;
      if (this.role.includes("external")) {
        this.$store
          .dispatch("showFileEA", { user_id, program_id })
          .then(result => {
            this.programFiles = searchByFile(result.data, this.search_files);
          })
          .catch(err => {
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      } else if (this.role.includes("internal")) {
        this.$store
          .dispatch("showFileIA", { user_id, program_id })
          .then(result => {
            this.programFiles = searchByFile(result.data, this.search_files);
          })
          .catch(err => {
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      }
    }, 500),
    filterByType() {
      if (this.filterType === 0) return this.programFiles;
      else if (this.filterType === 1)
        return this.programFiles.filter(items => items.type.includes("PPP"));
      else if (this.filterType === 2)
        return this.programFiles.filter(items =>
          items.type.includes("Compliance")
        );
      else if (this.filterType === 3)
        return this.programFiles.filter(items =>
          items.type.includes("Narrative")
        );
      else if (this.filterType === 4)
        return this.programFiles.filter(items => items.type.includes("SAR"));
      else if (this.filterType === 5)
        return this.programFiles.filter(items => items.type.includes("SFR"));
      else if (this.filterType === 6)
        return this.programFiles.filter(items =>
          items.type.includes("Rated Instrument")
        );
    },
    generateProgramSAR() {
      let user_id = this.user.id;
      let program_id = this.program.id;
      this.$isLoading(true);
      this.$store
        .dispatch("generateProgramSAR", { user_id, program_id })
        .then(result => {
          this.$isLoading(false);
          if (result.data.status === false) {
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          } else {
            let fileURL = window.URL.createObjectURL(new Blob([result.data]));
            let fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute(
              "download",
              `${this.program.program_name} SAR.pdf`
            );
            document.body.appendChild(fileLink);

            fileLink.click();
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    generateSFRReport() {
      this.$isLoading(true);
      this.$store
        .dispatch("generateAccreditorReport", this.program.id)
        .then(result => {
          this.$isLoading(false);
          if (result.data.status === false) {
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          } else {
            let fileURL = window.URL.createObjectURL(new Blob([result.data]));
            let fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute(
              "download",
              `${this.program.program_name} SAR.pdf`
            );
            document.body.appendChild(fileLink);

            fileLink.click();
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    generateSFRAreaReport() {
      let program_id = this.program.id;
      let instrument_id = this.areaSelected.id;
      this.$isLoading(true);
      this.$store
        .dispatch("generateAccreditorAreaReport", { program_id, instrument_id })
        .then(result => {
          this.$isLoading(false);
          if (result.data.status === false) {
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          } else {
            let fileURL = window.URL.createObjectURL(new Blob([result.data]));
            let fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute(
              "download",
              `${this.program.program_name} SAR.pdf`
            );
            document.body.appendChild(fileLink);

            fileLink.click();
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    showSFR() {
      let role = 1;
      if (this.role.includes("internal")) role = 0;
      let program_id = this.program.id;
      this.$isLoading(true);
      this.$store
        .dispatch("showSFR", { program_id, role })
        .then(result => {
          this.$isLoading(false);
          if (result.data.status === false) {
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          } else {
            let file = new Blob([result.data], { type: "application/pdf" });
            let fileURL = URL.createObjectURL(file);
            window.open(fileURL);

            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    downloadOBE(instrument) {
      this.$isLoading(true);
      let program_id = this.program.id;
      let instrument_id = instrument.id;
      this.$store
        .dispatch("downloadOBE", { program_id, instrument_id })
        .then(result => {
          this.$isLoading(false);
          if (result.data.status === false) {
            this.snackbarText = result.data.message;
            this.makeToast("Error", "danger");
          } else {
            let fileURL = window.URL.createObjectURL(new Blob([result.data]));
            let fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute(
              "download",
              `${instrument.area_name} Rated Instrument.pdf`
            );
            document.body.appendChild(fileLink);

            fileLink.click();
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
          }
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    assignTask() {
      this.$isLoading(true);
      let instrument_id = this.instrumentSelect.id;
      let program_id = this.program.id;
      let user_id = this.userSelect.id;
      this.$store
        .dispatch("reassignAccreditor", { instrument_id, program_id, user_id })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showAccreditorInstrument", this.program.id)
              .then(result => {
                this.areaList = result.data.instruments.sort(this.sortArea);
                this.users = result.data.users;
              });
            this.$isLoading(false);
            this.snackbarText = result.data.message;
            this.makeToast("Success!", "primary");
            this.assignAccreditor = false;
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
    removeUser() {
      this.$isLoading(true);
      this.$store
        .dispatch("deleteAssignedUser", this.userSelect.id)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showAccreditorInstrument", this.program.id)
              .then(result => {
                this.areaList = result.data.instruments.sort(this.sortArea);
                this.users = result.data.users;
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
    userName(item) {
      return `${this.concatName(item)}`;
    },
    uploadProgramFile() {
      this.$isLoading(true);
      let program_id = this.program.id;
      let user_id = this.user.id;
      let filename = this.filename;
      let type = this.type;
      let area_number = null;
      this.$store
        .dispatch("uploadProgramFile", {
          program_id,
          user_id,
          filename,
          type,
          area_number
        })
        .then(result => {
          if (result.data.status === true) {
            if (this.role.includes("external")) {
              this.$store
                .dispatch("showFileEA", { user_id, program_id })
                .then(result => {
                  this.programFiles = result.data;
                });
            } else if (this.role.includes("internal")) {
              this.$store
                .dispatch("showFileIA", { user_id, program_id })
                .then(result => {
                  this.programFiles = result.data;
                });
            }
            this.upload = false;
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
    downloadReport(item) {
      this.$isLoading(true);
      this.$store
        .dispatch("viewProgramFile", item.id)
        .then(result => {
          this.$isLoading(false);
          let fileURL = window.URL.createObjectURL(new Blob([result.data]));
          let fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", item.file_title);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    },
    removeFile() {
      this.$isLoading(true);
      let document_id = this.documentSelect.id;
      let user_id = this.user.id;
      this.$store
        .dispatch("deleteProgramFile", { document_id, user_id })
        .then(result => {
          if (result.data.status === true) {
            let index = this.programFiles.findIndex(
              data => data.id === this.documentSelect.id
            );
            this.programFiles.splice(index, 1);
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
    setSFR(role) {
      this.$isLoading(true);
      let program_id = this.program.id;
      if (this.checkRole()) {
        this.$store
          .dispatch("showSFRData", { program_id, role })
          .then(result => {
            this.collection = result.data.collection;
            this.instrument_programs = result.data.instrument_programs.sort(
              this.sortArea
            );
            this.$isLoading(false);
          })
          .catch(err => {
            this.$isLoading(false);
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      } else {
        this.$store
          .dispatch("showPersonalSFRData", { program_id, role })
          .then(result => {
            this.collection = result.data.collection;
            this.instrument_programs = result.data.instrument_programs.sort(
              this.sortArea
            );
            this.$isLoading(false);
          })
          .catch(err => {
            this.$isLoading(false);
            this.snackbarText = err + ". Please contact the administrator";
            this.makeToast("Error", "danger");
          });
      }
    },
    setUsers(instrument) {
      if (instrument) {
        return this.users.filter(item => item.instrument_id === instrument.id);
      } else return null;
    },
    filterUsers(users) {
      if (users?.length) {
        let filtered = [];
        for (let x = 0; x < this.userList.length; x++) {
          if (!users.find(item => item.user_id === this.userList[x].user_id))
            filtered.push(this.userList[x]);
        }
        return filtered;
      } else return this.userList;
    },
    concatName(item) {
      if (item) {
        if (item.first_name && item.last_name)
          return item.first_name.concat(" ", item.last_name);
        else if (item.last_name) return item.last_name;
        else if (item.first_name) return item.first_name;
      }
    },
    roundNum(num) {
      if (num !== null) return (Math.round(num * 100) / 100).toFixed(2);
    },
    getDescription(rating) {
      if (rating) {
        if (rating < 1.5) return "Poor";
        else if (rating >= 1.5 && rating < 2.5) return "Fair";
        else if (rating >= 2.5 && rating < 3.5) return "Satisfactory";
        else if (rating >= 3.5 && rating < 4.5) return "Very Satisfactory";
        else if (rating >= 4.5) return "Excellent";
        else return null;
      }
    },
    getType(item) {
      let type = item.type.replace("Internal", "Self Survey");
      if (item.area) {
        return type.concat(" - ", item.area);
      } else return type;
    },
    formatDate(item) {
      return moment(item).format("llll");
    },
    select(item) {
      if (item != null) {
        let assigned_user = this.taskList.find(
          x => x.transaction_id === item.id
        );
        this.$store.commit("saveAssignedUser", assigned_user.id);

        this.$store.commit("saveInstrument", item);
        this.$store.commit("saveRole", this.role);

        if (
          this.areaSelected &&
          (this.areaSelected.intended_program_id === 42 ||
            this.areaSelected.intended_program_id === 47)
        ) {
          if (this.coordinator === 1) this.$router.push("/RateStatementFormOC");
          else this.$router.push("/RateStatementForm");
        } else if (this.program.level === "Candidate") {
          if (this.coordinator === 1) this.$router.push("/RateStatementPSVOC");
          else this.$router.push("/RateStatementPSV");
        } else {
          if (this.coordinator === 1)
            this.$router.push("/AccreditationParameterOC");
          else this.$router.push("/AccreditationParameter");
        }
      }
    },
    fieldsReport() {
      if (this.checkLevel()) {
        return this.fields_advancedReport;
      } else {
        return this.fields_report;
      }
    },
    checkLevel() {
      if (
        (this.areaSelected &&
          (this.areaSelected.intended_program_id === 42 ||
            this.areaSelected.intended_program_id === 47)) ||
        this.program.level.includes("Candidate")
      ) {
        return true;
      } else return false;
    },
    checkRole() {
      if (this.coordinator === 1 || this.role.includes("leader")) return true;
      else return false;
    },
    filterMessageByArea(message, id) {
      if (message?.length) {
        if (this.role.includes("internal")) {
          return message.filter(
            data => data.area_id === id && data.type === "Internal"
          );
        } else {
          return message.filter(
            data => data.area_id === id && data.type === "External"
          );
        }
      } else {
        return [];
      }
    },
    back() {
      this.$router.push("/AccreditationTask");
    }
  },
  async created() {
    this.$isLoading(true);
    this.$store.commit("saveTabSelect", "accreditation-0");

    let user_id = this.user.id;
    let program_id = this.program.id;
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
        if (this.msiList?.length) this.areaSelected = this.msiList[0];
        this.area_mean = result.data.area_mean_external.sort(this.sortArea);
        this.area_mean_internal = result.data.area_mean_internal.sort(
          this.sortArea
        );
        this.result = result.data.result_external;
        this.result_internal = result.data.program_mean_internal;
        this.role = result.data.role;
        this.taskList = result.data.task;
        // this.totalRows = this.msiList.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    if (this.role.includes("external")) {
      await this.$store
        .dispatch("showFileEA", { user_id, program_id })
        .then(result => {
          this.programFiles = result.data;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });

      await this.$store
        .dispatch("showAccreditorInstrument", this.program.id)
        .then(result => {
          this.areaList = result.data.instruments.sort(this.sortArea);
          this.users = result.data.users;
          this.$isLoading(false);
        })
        .catch(err => {
          this.$isLoading(false);
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });

      await this.$store
        .dispatch("showAccreditorRequested", this.program.id)
        .then(result => {
          this.userList = result.data.users;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    } else if (this.role.includes("internal")) {
      await this.$store
        .dispatch("showFileIA", { user_id, program_id })
        .then(result => {
          this.programFiles = result.data;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }

    await this.$store
      .dispatch("showUnreadMessage", this.program.id)
      .then(result => {
        this.messages = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$isLoading(false);
  }
};
</script>
