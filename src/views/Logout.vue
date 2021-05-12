<template>
  <div></div>
</template>

<script>
  import {authHeader} from './../plugins/helper'

  export default {
    created() {
      localStorage.setItem('panel_token',null)
      //this.$router.push({path: '/login'})
      //this.$parent.$data.isLoggedin = false;
      window.location.href = '/login';
    },
  }
</script>

<style lang="scss">

</style>
