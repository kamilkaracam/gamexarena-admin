<template>
  <v-app>
    <!--<core-filter /> -->
    <core-toolbar v-if="isLoggedIn"/>
    <core-drawer v-if="isLoggedIn"/>
    <core-view/>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        isLoggedIn: null,
      }
    },
    created() {
      
      if (localStorage.getItem('panel_token') !== 'null') {
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    }

    

  }
</script>

<style lang="scss">
  @import '@/styles/index.scss';

  /* Remove in 1.2 */
  .v-datatable thead th.column.sortable i {
    vertical-align: unset;
  }
</style>
