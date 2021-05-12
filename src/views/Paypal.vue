<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn
          color="pink"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <v-flex md12>


        <material-card color="green" title="Paypal Settings" text="Paypal Settings">
          <v-form ref="form" v-model="valid">

            <v-layout row wrap>
              <v-flex md12>
                  <label for="">Client ID</label>
                <v-text-field
                  label=""
                  v-model="formData.client_id"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex md12>
                  <label for="">Client Secret</label>
                <v-text-field
                  label=""
                  v-model="formData.client_secret"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <label for="">Email</label>
                <v-text-field
                  label=""
                  v-model="formData.email"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <label for="">Mode</label>
                <v-select v-model="formData.mode" :items="modes" item-value="id" item-text="name" />
              </v-flex>
              <v-flex md12>
                <v-btn small color="primary" @click="updatePaypal">Update</v-btn>
              </v-flex>
            </v-layout>

          </v-form>


        </material-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        menu1: false,
        menu2: false,
        modal: false,
        formData: {
          client_id: null,
          client_secret: null,
          email: null,
          mode: null,
        },
        modes:[],
        errors: [],
        valid: true,
        dialog: null,
      }
    },
    methods: {
      updatePaypal: function () {
        
          this.$http.post('/api/settings/updatePaypal',this.formData).then(function(resp){
            console.log(resp)
          })
      },
      getPaypalSettings: function() {
        this.$http.get('/api/settings?group=paypal').then(resp => {
          const client_id = resp.data.data.filter(res => res.key === 'client_id')
          const client_secret = resp.data.data.filter(res => res.key === 'client_secret')
          const email = resp.data.data.filter(res => res.key === 'email')
          const mode = resp.data.data.filter(res => res.key === 'mode')
          this.formData.client_id = client_id[0].value
          this.formData.client_secret = client_secret[0].value
          this.formData.email = email[0].value
          this.formData.mode = mode[0].value
          
        })
      }
    },
    created() {
      this.getPaypalSettings()
      this.modes = [
          {
                'id':'sandbox',
                'name':'Sandbox'
            },
            {
                'id':'production',
                'name':'Prod'
            }
      ]
    }
  }
</script>
