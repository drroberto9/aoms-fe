<template>
  <div id="create">
    <!--Dialog Edit-->
    <b-modal id="app" v-model="edit">
      <template #modal-header>
        <h5>{{ statement.type }}: Edit Statement</h5>
      </template>
      <b-form-textarea
        id="statement"
        v-model="statement.statement"
        placeholder="Enter benchmark statement..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <template #modal-footer>
        <md-button
          class="md-primary md-raised"
          style="margin: 0 5px 0 0"
          @click="edit = false"
          >Cancel</md-button
        >
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="editStatement()"
          >Submit</md-button
        >
      </template>
    </b-modal>

    <!--Dialog Add-->
    <b-modal id="app" v-model="add">
      <template #modal-header>
        <h5>{{ typeSelect }}: Add Statement</h5>
      </template>
      <b-form-textarea
        id="statement"
        v-model="newStatement"
        placeholder="Enter benchmark statement..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <template #modal-footer>
        <md-button
          class="md-primary md-raised"
          style="margin: 0 5px 0 0"
          @click="add = false"
          >Cancel</md-button
        >
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="
            addStatement();
            add = false;
          "
          >Submit</md-button
        >
      </template>
    </b-modal>

    <!--Dialog Add Sub-->
    <b-modal v-model="addSub">
      <template #modal-header>
        <h5>Add Sub Statement</h5>
      </template>
      <b-form-textarea
        id="statement"
        v-model="newStatement"
        placeholder="Enter benchmark statement..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <template #modal-footer>
        <md-button
          class="md-primary md-raised"
          style="margin: 0 5px 0 0"
          @click="addSub = false"
          >Cancel</md-button
        >
        <md-button
          class="md-primary md-raised"
          style="margin: 0"
          @click="
            addSubStatement();
            addSub = false;
          "
          >Submit</md-button
        >
      </template>
    </b-modal>

    <!--Delete Prompt-->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Remove Statement</h5>
      </template>
      Are you sure you want to remove this statement?
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
    <md-card style="padding: 15px 20px; margin-bottom: 10px;">
      <div class="md-layout">
        <div class="md-layout-item">
          <h4>{{ program.intended_program }}</h4>
          <h5 v-if="campus">Campus: {{ campus.campus_name }}</h5>
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
              </div>
            </template>

            <template #cell(actions)="row">
              <md-button
                v-b-tooltip.hover
                title="Edit"
                class="md-icon-button md-dense md-primary"
                @click="
                  edit = true;
                  statement = row.item;
                "
                ><md-icon>edit</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Add Sub Statement"
                class="md-icon-button md-dense md-primary"
                @click="
                  newStatement = null;
                  statement = row.item;
                  addSub = true;
                "
                ><md-icon>queue</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-dense md-accent"
                @click="
                  statement = row.item;
                  deletePrompt = true;
                "
                v-if="
                  !statementList.find(
                    array => array.parent_statement_id === row.item.id
                  )
                "
                ><md-icon>delete</md-icon></md-button
              >
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
              {{ row.value }}
            </template>

            <template #cell(actions)="row">
              <md-button
                v-b-tooltip.hover
                title="Edit"
                class="md-icon-button md-dense md-primary"
                @click="
                  edit = true;
                  statement = row.item;
                "
                ><md-icon>edit</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Add Sub Statement"
                class="md-icon-button md-dense md-primary"
                @click="
                  newStatement = null;
                  statement = row.item;
                  addSub = true;
                "
                ><md-icon>queue</md-icon></md-button
              >
              <md-button
                v-b-tooltip.hover
                title="Delete"
                class="md-icon-button md-dense md-accent"
                @click="
                  remove();
                  deletePrompt = false;
                "
                v-if="
                  !statementList.find(
                    array => array.parent_statement_id === row.item.id
                  )
                "
                ><md-icon>delete</md-icon></md-button
              >
            </template>
          </b-table>

          <md-button
            v-if="search === ''"
            class="md-primary md-raised"
            style="width: 100%; margin: 0"
            @click="
              typeSelect = item.type;
              newStatement = null;
              add = true;
            "
            >Add Statement</md-button
          >
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

const searchByParameter = (items, term) => {
  if (term) {
    return items.filter(item => item.instrument_parameter_id === term);
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
    return items.find(item => item.id === term);
  }
};

export default {
  name: "ShowStatement",
  data() {
    return {
      sortBy: "statement",
      sortDesc: false,
      fields: [
        { key: "statement", label: "Statement", sortable: true },
        { key: "actions", label: "Actions", thStyle: { width: "180px" } }
      ],
      statementList: [{}],
      statement: {},
      parameters: [{}],
      newStatement: null,
      search: "",
      edit: false,
      add: false,
      addSub: false,
      snackbarText: "",
      typeSelect: "",
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
      deletePrompt: false
    };
  },
  computed: {
    ...mapState({
      user: "user",
      campus: "campus",
      program: "program",
      instrument: "instrument",
      parameter: "parameter"
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
    editStatement() {
      this.$isLoading(true);
      this.$store
        .dispatch("editStatement", this.statement)
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showStatement", this.instrument.id)
              .then(result => {
                this.statementList = searchByParameter(
                  result.data,
                  this.parameter.id
                );
              });
            this.edit = false;
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
    addStatement() {
      this.$isLoading(true);
      let statement = this.newStatement;
      let type = this.typeSelect;
      let statement_parent = null;
      let parameter_id = this.parameter.id;
      this.$store
        .dispatch("createStatement", {
          statement,
          type,
          statement_parent,
          parameter_id
        })
        .then(result => {
          if (result.data.status === true) {
            this.statementList.push(result.data.statement[0]);
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
    addSubStatement() {
      this.$isLoading(true);
      let statement = this.newStatement;
      let type = this.statement.type;
      let statement_parent = this.statement.id;
      let parameter_id = this.parameter.id;
      this.$store
        .dispatch("createStatement", {
          statement,
          type,
          statement_parent,
          parameter_id
        })
        .then(result => {
          if (result.data.status === true) {
            this.statementList.push(result.data.statement[0]);
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
      let statement_id = this.statement.id;
      let parameter_id = this.parameter.id;
      this.$store
        .dispatch("deleteStatement", {
          statement_id,
          parameter_id
        })
        .then(result => {
          if (result.data.status === true) {
            let index = this.statementList.findIndex(
              data => data.id === this.statement.id
            );
            this.statementList.splice(index, 1);
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
        .dispatch("showStatement", this.instrument.id)
        .then(result => {
          let statement = searchByParameter(result.data, this.parameter.id);
          this.statementList = searchByStatement(statement, this.search);
        })
        .catch(err => {
          this.snackbarText = err + ". Please contact the administrator";
          this.makeToast("Error", "danger");
        });
    }, 500),
    sortStatements(type) {
      if (this.statementList?.length)
        return searchByType(this.statementList, type);
    },
    back() {
      this.$router.push("/ManageParameters");
    },
    changeParameter(parameter_id) {
      this.$isLoading(true);
      this.$nextTick(() => {
        document.getElementById("create").scrollIntoView();
      });
      this.$store
        .dispatch("showStatement", this.instrument.id)
        .then(result => {
          this.$isLoading(false);
          this.statementList = searchByParameter(result.data, parameter_id);
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
    await this.$store
      .dispatch("showStatement", this.instrument.id)
      .then(result => {
        this.statementList = searchByParameter(result.data, this.parameter.id);
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });

    await this.$store
      .dispatch("showParameter", this.instrument.id)
      .then(result => {
        if (result.data.length > 1)
          this.parameters = result.data.sort((a, b) =>
            a.parameter.localeCompare(b.parameter)
          );
        else this.parameters = result.data;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
    await this.$isLoading(false);
  }
};
</script>
