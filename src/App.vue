<template>
  <router-view></router-view>
</template>



<script>
import SettingService from "./services/setting.service"
export default {
  name: 'App',
  mounted(){
    const service = new SettingService;
    this.$store.commit("setSettings",service.getSettings());
  },
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';


</style>








