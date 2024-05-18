<template>
  <div>
    <!--Main-->
    <md-card>
      <div class="md-layout" style="padding: 15px 20px;">
        <div class="md-layout-item">
          <h4>{{ concatName(userAccount) }}</h4>
          <h4>ID: {{ account_id }}</h4>
          <h4 style="text-transform: none">{{ userAccount.email }}</h4>
        </div>
      </div>
      <md-tabs md-elevation="1" class="md-primary" md-alignment="fixed">
        <md-tab md-label="Main Record"><MainRecord /></md-tab>
        <md-tab md-label="Personal Information"><PersonalInfo /></md-tab>
        <md-tab md-label="Education"><Education /></md-tab>
        <md-tab md-label="Work Experience"><WorkExperience /></md-tab>
        <md-tab md-label="Other Information"><OtherInfo /></md-tab>
      </md-tabs>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MainRecord from "../Manage Account/Main Record - Accreditor";
import PersonalInfo from "../Manage Account/Personal Information";
import Education from "../Manage Account/Education";
import WorkExperience from "../Manage Account/Work Experience";
import OtherInfo from "../Manage Account/Other Information";
export default {
  name: "Profile",
  data() {
    return {
      snackbarText: ""
    };
  },
  components: {
    MainRecord: MainRecord,
    PersonalInfo: PersonalInfo,
    Education: Education,
    WorkExperience: WorkExperience,
    OtherInfo: OtherInfo
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
    concatName(item) {
      if (item.first_name && item.last_name)
        return item.first_name.concat(" ", item.last_name);
      else if (item.last_name) return item.last_name;
      else if (item.first_name) return item.first_name;
    }
  }
};
</script>
