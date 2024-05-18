<template>
  <div>
    <!--Create Education-->
    <b-modal id="app" v-model="createEducation" size="lg" hide-footer>
      <template #modal-header>
        <h5>Create Educational Attainment</h5>
      </template>
      <form @submit.prevent="create">
        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 200px">
            *Level:
          </div>
          <div class="md-layout-item">
            <b-form-select v-model="level" required>
              <b-form-select-option :value="null"
                >Select Level</b-form-select-option
              >
              <b-form-select-option value="Elementary"
                >Elementary</b-form-select-option
              >
              <b-form-select-option value="Secondary"
                >Secondary</b-form-select-option
              >
              <b-form-select-option value="Vocational"
                >Vocational</b-form-select-option
              >
              <b-form-select-option value="College"
                >College</b-form-select-option
              >
              <b-form-select-option value="Graduate Studies"
                >Graduate Studies</b-form-select-option
              >
            </b-form-select>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *School:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="school_name"
              placeholder="Enter School Name"
              type="text"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Degree / Course:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="course"
              placeholder="Enter degree/course taken"
              type="text"
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *Start Date:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="started_at"
              type="date"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            End Date:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="graduated_at"
              :min="started_at"
              type="date"
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Honors Received:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="honor"
              placeholder="Enter honors received"
              type="text"
            ></b-form-input>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="createEducation = false"
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

    <!--Edit Education-->
    <b-modal id="app" v-model="editEducation" size="lg" hide-footer>
      <template #modal-header>
        <h5>Edit Educational Attainment</h5>
      </template>
      <form @submit.prevent="edit">
        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 200px">
            *Level:
          </div>
          <div class="md-layout-item">
            <b-form-select v-model="level" required>
              <b-form-select-option :value="null"
                >Select Level</b-form-select-option
              >
              <b-form-select-option value="Elementary"
                >Elementary</b-form-select-option
              >
              <b-form-select-option value="Secondary"
                >Secondary</b-form-select-option
              >
              <b-form-select-option value="Vocational"
                >Vocational</b-form-select-option
              >
              <b-form-select-option value="College"
                >College</b-form-select-option
              >
              <b-form-select-option value="Graduate Studies"
                >Graduate Studies</b-form-select-option
              >
            </b-form-select>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *School:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="school_name"
              placeholder="Enter School Name"
              type="text"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Degree / Course:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="course"
              placeholder="Enter degree/course taken"
              type="text"
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            *Start Date:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="started_at"
              type="date"
              required
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            End Date:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="graduated_at"
              :min="started_at"
              type="date"
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Honors Received:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="honor"
              placeholder="Enter honors received"
              type="text"
            ></b-form-input>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editEducation = false"
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

    <!--Delete Education-->
    <b-modal id="app" v-model="deletePrompt">
      <template #modal-header>
        <h5>Delete Educational Attainment</h5>
      </template>
      Are you sure you want to remove this attainment?
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

    <!--Main-->
    <md-card style="padding: 15px 20px; margin: 0">
      <div class="md-layout">
        <div class="md-layout-item"><h5>Educational Attainment</h5></div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            style="width: max-content; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="
              resetInput();
              createEducation = true;
            "
            >Create</md-button
          >
        </div>
      </div>

      <div v-for="(item, index) in education" :key="index">
        <div class="md-layout" style="margin-top: 20px; margin-bottom: 10px;">
          <div class="md-layout-item"></div>
          <div class="md-layout-item" style="max-width: max-content;">
            <md-button
              v-b-tooltip.hover
              title="Edit"
              class="md-icon-button md-raised md-dense md-primary"
              @click="
                educationSelect = item;
                setInput();
                editEducation = true;
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
                educationSelect = item;
                deletePrompt = true;
              "
              ><md-icon>delete</md-icon></md-button
            >
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 200px">
            Level:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="item.level"
              type="text"
              disabled
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            School:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="item.school_name"
              type="text"
              disabled
            ></b-form-input>
          </div>
        </div>
        <div
          v-if="item.level !== 'Elementary' && item.level !== 'Secondary'"
          class="md-layout"
          style="margin-top: 5px"
        >
          <div class="md-layout-item" style="max-width: 200px">
            Degree / Course:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="item.course"
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
              v-model="item.started_at"
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
              v-model="item.graduated_at"
              type="text"
              disabled
            ></b-form-input>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 200px">
            Honors Received:
          </div>
          <div class="md-layout-item">
            <b-form-input
              v-model="item.honor"
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
  name: "MainRecord",
  data() {
    return {
      education: [],
      educationSelect: null,
      school_name: null,
      level: null,
      started_at: null,
      graduated_at: null,
      honor: null,
      course: null,
      units_earned: null,
      createEducation: false,
      editEducation: false,
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
      this.school_name = null;
      this.level = null;
      this.started_at = null;
      this.graduated_at = null;
      this.honor = null;
      this.course = null;
    },
    setInput() {
      this.school_name = this.educationSelect.school_name;
      this.level = this.educationSelect.level;
      this.started_at = this.educationSelect.started_at;
      this.graduated_at = this.educationSelect.graduated_at;
      this.honor = this.educationSelect.honor;
      this.course = this.educationSelect.course;
    },
    create() {
      this.$isLoading(true);
      let user_id = this.account_id;
      let school_name = this.school_name;
      let level = this.level;
      let started_at = this.started_at;
      let graduated_at = this.graduated_at;
      let honor = this.honor;
      let course = this.course;
      this.$store
        .dispatch("createEducationInfo", {
          user_id,
          school_name,
          level,
          started_at,
          graduated_at,
          honor,
          course
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showEducationInfo", this.account_id)
              .then(result => {
                this.education = result.data.educations;
              });
            this.createEducation = false;
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
      let user_education_id = this.educationSelect.id;
      let school_name = this.school_name;
      let level = this.level;
      let started_at = this.started_at;
      let graduated_at = this.graduated_at;
      let honor = this.honor;
      let course = this.course;
      this.$store
        .dispatch("editEducationInfo", {
          user_education_id,
          school_name,
          level,
          started_at,
          graduated_at,
          honor,
          course
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showEducationInfo", this.account_id)
              .then(result => {
                this.education = result.data.educations;
              });
            this.editEducation = false;
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
        .dispatch("deleteEducationInfo", this.educationSelect.id)
        .then(result => {
          if (result.data.status === true) {
            let index = this.education.findIndex(
              data => data.id === this.educationSelect.id
            );
            this.education.splice(index, 1);
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
      .dispatch("showEducationInfo", this.account_id)
      .then(result => {
        this.education = result.data.educations;
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
