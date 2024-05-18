<template>
  <div>
    <!--Generate PPP-->
    <b-modal id="app" v-model="PPP" size="xl" hide-footer>
      <template #modal-header>
        <h4>Program Performance Profile Working Document</h4>
        <md-button
          style="width: 150px; margin: 0;"
          class="md-primary md-raised"
          @click="downloadPPP()"
          >Download PPP Draft</md-button
        >
      </template>

      <div v-show="parameters">
        <div class="md-layout">
          <div class="md-layout-item">
            <h5>{{ parameterSelected ? parameterSelected.parameter : "" }}</h5>
          </div>
          <div class="md-layout-item" style="max-width: max-content">
            <div v-for="(item, index) in parameters" :key="index">
              <div v-if="item.id === parameterSelected.id">
                <md-button
                  v-if="parameters[index - 1]"
                  class="md-primary md-raised md-dense"
                  style="margin: 0 5px 0 0"
                  @click="parameterSelected = parameters[index - 1]"
                  >Back</md-button
                >
                <md-button
                  v-if="parameters[index + 1]"
                  class="md-primary md-raised md-dense"
                  style="margin: 0 5px 0 0"
                  @click="parameterSelected = parameters[index + 1]"
                  >Next</md-button
                >
              </div>
            </div>
          </div>
        </div>

        <parameterPPP
          v-bind:parameterSelected="parameterSelected"
          :key="parameterSelected"
        />

        <br />

        <div class="md-layout">
          <div class="md-layout-item"></div>
          <div class="md-layout-item" style="max-width: max-content">
            <div v-for="(item, index) in parameters" :key="index">
              <div v-if="item.id === parameterSelected.id">
                <md-button
                  v-if="parameters[index - 1]"
                  class="md-primary md-raised md-dense"
                  style="margin: 0 5px 0 0"
                  @click="parameterSelected = parameters[index - 1]"
                  >Back</md-button
                >
                <md-button
                  v-if="parameters[index + 1]"
                  class="md-primary md-raised md-dense"
                  style="margin: 0 5px 0 0"
                  @click="parameterSelected = parameters[index + 1]"
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
            @click="PPP = false"
            >Close</md-button
          >
        </div>
      </md-card-actions>
    </b-modal>

    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item">
          <h4 v-if="instrument.program_name">{{ instrument.program_name }}</h4>
          <h4 v-else>{{ program.program_name }}</h4>
          <h5>{{ campus.campus_name }}</h5>
          <h5>{{ instrument.area_name }}</h5>
        </div>
        <div class="md-layout-item" style="min-width: max-content">
          <!--          <div class="md-layout" style="margin-bottom: 5px">-->
          <!--            <div class="md-layout-item"></div>-->
          <!--            <div class="md-layout-item" style="max-width: max-content">-->
          <!--              <md-button-->
          <!--                v-if="taskHead === 1"-->
          <!--                style="width: 150px; margin: 0;"-->
          <!--                class="md-primary md-raised"-->
          <!--                @click="-->
          <!--                  parameterSelected = parameters[0];-->
          <!--                  PPP = true;-->
          <!--                "-->
          <!--                >Draft PPP</md-button-->
          <!--              >-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>

      <b-table
        :items="parameters"
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
        <template #cell(updated_at)="row">
          {{ formatDate(row.value) }}
        </template>

        <template #cell(actions)="row">
          <md-badge
            v-if="filterMessageByParameter(messages, row.item.id).length > 0"
            class="md-square"
            md-content="New"
            md-dense
          >
            <md-button
              v-b-tooltip.hover
              title="Select"
              class="md-icon-button md-dense md-primary"
              @click="select(row.item)"
              ><md-icon>forward</md-icon></md-button
            >
          </md-badge>
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
import parameterPPP from "../Task Force/Generate PPP";
import moment from "moment";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item =>
      toLower(item.parameter).includes(toLower(term))
    );
  }
  return items;
};

export default {
  name: "TableSearch",
  data() {
    return {
      sortBy: "parameter",
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "parameter", label: "Parameter", sortable: true },
        { key: "updated_at", label: "Last Update", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "70px" } }
      ],
      parameters: [],
      parameterSelected: {},
      pppInput: [],
      search: null,
      messages: [],
      PPP: false,
      snackbarText: ""
    };
  },
  components: {
    parameterPPP
  },
  computed: {
    ...mapState({
      campus: "campus",
      program: "program",
      instrument: "instrument",
      role: "role",
      taskHead: "taskHead"
    }),
    newInstrument: function() {
      return this.$store.getters.newInstrument;
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
        .dispatch("showParameter", this.instrument.id)
        .then(result => {
          this.parameters = searchByName(result.data, this.search);
          this.totalRows = this.parameters.length;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    downloadPPP() {
      this.$isLoading(true);
      this.$store
        .dispatch("downloadPPP", this.instrument.id)
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
              `${this.program.program_name}.docx`
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
    formatDate(item) {
      return moment(item).format("llll");
    },
    select(item) {
      if (item != null) {
        this.$store.commit("saveParameter", item);
        this.$router.push("/AttachFileStatement");
      }
    },
    filterMessageByParameter(message, id) {
      if (message?.length) {
        return message.filter(data => data.parameter_id === id);
      } else {
        return [];
      }
    },
    back() {
      this.$router.push("/TaskForceArea");
    }
  },
  async created() {
    let instrument_id = this.instrument.id;
    let program_id = this.program.id;
    this.$isLoading(true);
    await this.$store
      .dispatch("showTaskParameter", { instrument_id, program_id })
      .then(result => {
        this.parameters = result.data.parameters.sort((a, b) =>
          a.parameter.localeCompare(b.parameter)
        );
        this.totalRows = this.parameters.length;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    if (this.taskHead !== 0) {
      await this.$store
        .dispatch("showUnreadMessage", this.program.id)
        .then(result => {
          this.messages = result.data;
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }
    await this.$isLoading(false);
  }
};
</script>
