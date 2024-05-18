<template>
  <div>
    <!--Main-->
    <md-card style="padding: 15px 20px;">
      <md-tabs :md-active-tab="tabSelect" md-elevation="1" class="md-primary">
        <!-- Program Accreditor -->
        <md-tab
          id="accreditor-accreditation-0"
          md-label="Program Accreditor"
          style="padding: 0; margin-top: 20px"
        >
          <accreditorTable />
        </md-tab>

        <!-- Overall Coordinator -->
        <md-tab
          id="accreditor-accreditation-1"
          md-label="Overall Coordinator"
          style="padding: 0; margin-top: 20px"
        >
          <coordinatorTable />
        </md-tab>
      </md-tabs>
    </md-card>
  </div>
</template>

<script>
import accreditorTable from "../Accreditor/Program Select";
import coordinatorTable from "../Accreditor/Application Select";

export default {
  name: "AccreditationTask",
  components: {
    accreditorTable,
    coordinatorTable
  }
};
</script>
