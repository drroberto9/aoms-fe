<template>
  <!-- <div class="container"> -->
  <iframe class="iframe" :src="url + '#toolbar=0&navpanes=0&scrollbar=0'" />
  <!-- </div> -->
</template>
<!--'https://view.officeapps.live.com/op/embed.aspx?src=' +-->
<script>
import { mapState } from "vuex";

export default {
  name: "Documents",
  computed: {
    ...mapState({
      url: "url"
    })
  }
};
</script>

<style scoped lang="scss">
.iframe {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
