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


        <material-card color="green" title="Commission" text="Commission">
          <v-form ref="form" v-model="valid">

            <v-layout row wrap>
              <v-flex md3>
                <v-text-field
                  label="Commission Rate (%)"
                  v-model="formData.commissionRate"
                  type="number"
                  value="10"
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy
                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                  <v-text-field slot="activator" v-model="formData.started_at" label="Started At"
                                prepend-icon="event"></v-text-field>
                  <v-date-picker v-model="formData.started_at" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md4>
                <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy
                        transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                  <v-text-field slot="activator" v-model="formData.finished_at"
                                label="Finished At" prepend-icon="event"></v-text-field>
                  <v-date-picker v-model="formData.finished_at" no-title
                                 @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md12>
                <v-btn small color="primary" @click="updateCommision">Update</v-btn>
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
          started_at: null,
          finished_at: null,
          commissionRate: null,
        },

        errors: [],
        valid: true,
        dialog: null,
      }
    },
    methods: {
      updateCommision: function () {
        
          this.$http.post('/api/settings/updateCommission',this.formData).then(function(resp){
            console.log(resp)
          })
      },
      getCommission: function() {
        this.$http.get('/api/settings?group=commission').then(resp => {
          const commission_rate = resp.data.data.filter(res => res.key === 'commission_rate')
          const started_at = resp.data.data.filter(res => res.key === 'started_at')
          const finished_at = resp.data.data.filter(res => res.key === 'finished_at')
          this.formData.commissionRate = commission_rate[0].value
          this.formData.started_at = started_at[0].value
          this.formData.finished_at = finished_at[0].value
          //console.log(resp.data.data)
        })
      }
    },
    created() {
      this.getCommission()
    }
  }
</script>
