<template>
  <div>
    <!--Create Work-->
    <b-modal id="app" v-model="createWork" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create Work Experience</h5>
      </template>
      <form @submit.prevent="create">
        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 200px">
            *Company:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="company_name"
              type="text"
              placeholder="Enter company name"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *Job Position:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="position"
              type="text"
              placeholder="Enter position"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *Start Date:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="start" type="date" required></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            End Date:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="end" :min="start" type="date"></b-form-input>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createWork = false"
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

    <!--Delete Work Experience-->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete Work Experience</h5>
      </template>
      Are you sure you want to remove this work experience?
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
            @click="remove()"
            >Delete</md-button
          >
        </div>
      </template>
    </b-modal>

    <!--Edit Work-->
    <b-modal id="app" v-model="editWork" size="lg" hide-footer>
      <template #modal-header>
        <h5>Edit Work Experience</h5>
      </template>
      <form @submit.prevent="edit">
        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 200px">
            *Company:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="company_name"
              type="text"
              placeholder="Enter company name"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *Job Position:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="position"
              type="text"
              placeholder="Enter position"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *Start Date:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="start" type="date" required></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            End Date:
          </div>
          <div class="md-layout-item">
            <b-form-input v-model="end" :min="start" type="date"></b-form-input>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editWork = false"
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

    <!--Main-->
    <md-card style="padding: 15px 20px; margin: 0">
      <div class="md-layout">
        <div class="md-layout-item"><h5>Work Experience</h5></div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            style="width: max-content; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="
              resetInput();
              createWork = true;
            "
            >Create</md-button
          >
        </div>
      </div>

      <div v-for="(item, index) in work" :key="index">
        <div class="md-layout" style="margin-top: 20px; margin-bottom: 10px">
          <div class="md-layout-item"></div>
          <div class="md-layout-item" style="max-width: max-content;">
            <md-button
              v-b-tooltip.hover
              title="Edit"
              class="md-icon-button md-raised md-dense md-primary"
              @click="
                workSelect = item;
                setInput();
                editWork = true;
              "
              ><md-icon>edit</md-icon></md-button
            >
          </div>
          <div class="md-layout-item" style="max-width: max-content">
            <md-button
              v-b-tooltip.hover
              title="Delete"
              class="md-icon-button md-raised md-dense md-accent"
              @click="
                workSelect = item;
                deletePrompt = true;
              "
              ><md-icon>delete</md-icon></md-button
            >
          </div>
        </div>

        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 200px">
            Company:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="item.company_name"
              type="text"
              disabled
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Job Position:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="item.position"
              type="text"
              disabled
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Start Date:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="item.start"
              type="text"
              disabled
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            End Date:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="item.end"
              type="text"
              disabled
            ></b-form-input>
          </div>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "WorkExperience",
  data() {
    return {
      work: [],
      workSelect: null,
      company_name: null,
      position: null,
      start: null,
      end: null,
      createWork: false,
      editWork: false,
      deletePrompt: false,
      snackbarText: ""
    };
  },
  computed: {
    ...mapState({
      userAccount: "userAccount",
      account_id: "account_id"
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
    resetInput() {
      this.company_name = null;
      this.position = null;
      this.start = null;
      this.end = null;
    },
    setInput() {
      this.company_name = this.workSelect.company_name;
      this.position = this.workSelect.position;
      this.start = this.workSelect.start;
      this.end = this.workSelect.end;
    },
    create() {
      this.$isLoading(true);
      let user_id = this.account_id;
      let company_name = this.company_name;
      let position = this.position;
      let start = this.start;
      let end = this.end;
      this.$store
        .dispatch("createWorkExperience", {
          user_id,
          company_name,
          position,
          start,
          end
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showWorkExperience", this.account_id)
              .then(result => {
                this.work = result.data.works;
              });
            this.createWork = false;
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
      this.$isLoading(true);
      let user_work_id = this.workSelect.id;
      let company_name = this.company_name;
      let position = this.position;
      let start = this.start;
      let end = this.end;
      this.$store
        .dispatch("editWorkExperience", {
          user_work_id,
          company_name,
          position,
          start,
          end
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showWorkExperience", this.account_id)
              .then(result => {
                this.work = result.data.works;
              });
            this.editWork = false;
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
        .dispatch("deleteWorkExperience", this.workSelect.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.work.findIndex(
              data => data.id === this.workSelect.id
            );
            this.work.splice(index, 1);
            this.deletePrompt = false;
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
    }
  },
  async created() {
    await this.$store
      .dispatch("showWorkExperience", this.account_id)
      .then(result => {
        this.work = result.data.works;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
  }
};
</script>

<style lang="scss" scoped>
input:disabled {
  background: white !important;
}
</style>
