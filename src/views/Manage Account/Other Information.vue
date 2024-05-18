<template>
  <div>
    <!--Edit Others-->
    <b-modal id="app" v-model="editOthers" size="lg" hide-footer>
      <template #modal-header>
        <h5>Edit</h5>
      </template>
      <form @submit.prevent="edit()">
        <div class="md-layout">
          <div class="md-layout-item" style="max-width: 250px">
            Special Skills and Hobbies:
          </div>
          <div class="md-layout-item">
            <b-form-textarea
              id="statement"
              v-model="skill_hobby"
              placeholder="Enter special skills and hobbies"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 250px">
            Non-Academic Recognitions:
          </div>
          <div class="md-layout-item">
            <b-form-textarea
              id="statement"
              v-model="distribution_recognition"
              placeholder="Enter non-academic recognitions"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
        </div>
        <div class="md-layout" style="margin-top: 5px">
          <div class="md-layout-item" style="max-width: 250px">
            Orgranizations:
          </div>
          <div class="md-layout-item">
            <b-form-textarea
              id="statement"
              v-model="association_organization"
              placeholder="Enter orgranizations"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
        </div>

        <md-card-actions>
          <div>
            <md-button
              class="md-primary md-raised"
              style="margin: 0 5px 0 0"
              @click="editOthers = false"
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
      <div class="md-layout" style="margin-bottom: 15px">
        <div class="md-layout-item"><h5>Other Information</h5></div>
        <div class="md-layout-item" style="max-width: max-content">
          <md-button
            style="width: max-content; margin: 0;"
            class="md-primary md-raised md-dense"
            @click="
              setInput();
              editOthers = true;
            "
            >Edit</md-button
          >
        </div>
      </div>

      <div class="md-layout">
        <div class="md-layout-item" style="max-width: 250px">
          Special Skills and Hobbies:
        </div>
        <div class="md-layout-item">
          <b-form-textarea
            id="statement"
            v-model="others.skill_hobby"
            rows="3"
            max-rows="6"
            disabled
          ></b-form-textarea>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 250px">
          Non-Academic Recognitions:
        </div>
        <div class="md-layout-item">
          <b-form-textarea
            id="statement"
            v-model="others.distribution_recognition"
            rows="3"
            max-rows="6"
            disabled
          ></b-form-textarea>
        </div>
      </div>
      <div class="md-layout" style="margin-top: 5px">
        <div class="md-layout-item" style="max-width: 250px">
          Orgranizations:
        </div>
        <div class="md-layout-item">
          <b-form-textarea
            id="statement"
            v-model="others.association_organization"
            rows="3"
            max-rows="6"
            disabled
          ></b-form-textarea>
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
      others: [],
      skill_hobby: null,
      distribution_recognition: null,
      association_organization: null,
      editOthers: false,
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
    setInput() {
      this.skill_hobby = this.others.skill_hobby;
      this.distribution_recognition = this.others.distribution_recognition;
      this.association_organization = this.others.association_organization;
    },
    edit() {
      this.$isLoading(true);
      let user_id = this.account_id;
      let skill_hobby = this.skill_hobby;
      let distribution_recognition = this.distribution_recognition;
      let association_organization = this.association_organization;
      this.$store
        .dispatch("editOtherInformation", {
          user_id,
          skill_hobby,
          distribution_recognition,
          association_organization
        })
        .then(result => {
          if (result.data.status === true) {
            this.$store
              .dispatch("showOtherInformation", this.account_id)
              .then(result => {
                this.others = result.data.user;
              });
            this.editOthers = false;
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
      .dispatch("showOtherInformation", this.account_id)
      .then(result => {
        this.others = result.data.user;
      })
      .catch(err => {
        this.snackbarText = err + ". Please contact the administrator";
        this.makeToast("Error", "danger");
      });
  }
};
</script>

<style lang="scss" scoped>
textarea:disabled {
  background: white !important;
}
</style>
