<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      role: "role",
      offices: "offices"
    })
  },
  methods: {
    checkRole(role) {
      if (
        (role === 1 ||
          role === 2 ||
          role === 3 ||
          role === 4 ||
          role === 5 ||
          role === 6 ||
          role === 11) &&
        this.offices?.length
      )
        return !!this.offices.find(item => item.role_id === role);
      else if (
        (role === 7 || role === 8 || role === 9 || role === 10) &&
        this.role?.length
      )
        return !!this.role.find(item => item.role_id === role);
    }
  },
  created() {
    if (this.checkRole(5) || this.checkRole(6))
      this.$router.push("/PlanAccreditation");
    else if (this.checkRole(3) || this.checkRole(4))
      this.$router.push("/ManageSupportUploads");
    else if (this.checkRole(2) || this.checkRole(11))
      this.$router.push("/TaskForceHeadTask");
    else if (this.checkRole(1)) this.$router.push("/TaskForceTask");
    else if (this.checkRole(9) || this.checkRole(10))
      this.$router.push("/ManageApplication");
    else if (this.checkRole(8)) this.$router.push("/AccreditationRequests");
    else if (this.checkRole(7)) this.$router.push("/InternalAccreditationTask");
  }
};
</script>
