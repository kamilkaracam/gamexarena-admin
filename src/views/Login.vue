<template>
  <v-container fill-height grid-list-xl>
    <v-layout wrap>
      <v-flex sm4 xs12 md4 lg4 offset-md4>
        <material-card color="green" title="Giriş">
          <v-flex xs12>
            <v-text-field label="Kullanıcı Adı" class="purple-input" v-model="userForm.email"/>
          </v-flex>

          <v-flex xs12>
            <v-text-field label="Şifre" type="password" class="purple-input" v-model="userForm.password"/>
          </v-flex>

          <v-flex xs12 text-xs-center>
            <v-btn class="mx-0 font-weight-light" color="success" @click="login">GİRİŞ</v-btn>
          </v-flex>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {authHeader} from './../plugins/helper'

  export default {
    data() {
      return {
        userForm: {
          email: null,
          password: null
        }
      }
    },
    methods: {
      login() {
        delete this.$http.defaults.headers.common["Authorization"];
        this.$http.post('/api/auth/admin-login', this.userForm).then(resp => {
          if (resp.data) {
            localStorage.setItem('panel_token', resp.data.token)
            this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('panel_token');

            this.$http.get('/api/me').then((resp) => {
              localStorage.setItem('panel_user', resp)
              this.$parent.$data.isLoggedin = true;
              
              //this.$router.push({path: '/'})
              window.location.href = '/';
            })

          }
        })
      },
    },
    mounted() {
      
      /*if (localStorage.getItem('panel_token') !== 'null') {
        this.$router.push({name: 'Dashboard'});
      }*/
      
    },
  }
</script>

<style lang="scss">
  .login-bg {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    z-index: 0;
  }
</style>
