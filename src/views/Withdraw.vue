<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card  v-if="paymentTable" color="" title="Withdraw" text="Withdraw List">
          <v-data-table :headers="headers" :items="withdraws" class="elevation-1" :rows-per-page-items="[10, 20, 50]">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.user.first_name }}</td>
              <td>{{ props.item.user.last_name }}</td>
              <td>{{ props.item.user.email }}</td>
              <td>{{ props.item.user.username }}</td>
              <td>{{ props.item.amount }} Euro</td>
              <td>{{ props.item.user.account.balance }} Euro</td>
              <td>{{ props.item.created_at | moment("MMMM Do YYYY, h:mm a") }}</td>
              <td>
                <v-btn @click="identityOpen(props.item.user.identity)">See Identity</v-btn>
              </td>
              <td>
                <v-btn color="primary" @click="acceptPayment(props.item.id)" dark>Accept
                  <v-icon dark right>check_circle</v-icon>
                </v-btn>

                <v-btn color="red" @click="declinePayment(props.item.id)" dark>Decline
                  <v-icon dark right>block</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>

      <v-flex md12>
        <material-card color="green" title="Withdraw" text="Withdraw Approved List">
          <v-data-table :headers="headersApproved" :items="withdrawsApproved" class="elevation-1" :rows-per-page-items="[10, 20, 50]">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.user.first_name }}</td>
              <td>{{ props.item.user.last_name }}</td>
              <td>{{ props.item.user.email }}</td>
              <td>{{ props.item.user.username }}</td>
              <td>{{ props.item.amount }} Euro</td>
              <td>{{ props.item.user.account.balance }} Euro</td>
              <td>{{ props.item.created_at | moment("MMMM Do YYYY, h:mm a") }}</td>
            </template>
            
          </v-data-table>
        </material-card>
      </v-flex>


      <v-flex md12>
        <material-card color="red" title="Withdraw" text="Withdraw Denied List">
          <v-data-table :headers="headersDenied" :items="withdrawsDenied" class="elevation-1" :rows-per-page-items="[10, 20, 50]">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.user.first_name }}</td>
              <td>{{ props.item.user.last_name }}</td>
              <td>{{ props.item.user.email }}</td>
              <td>{{ props.item.user.username }}</td>
              <td>{{ props.item.amount }} Euro</td>
              <td>{{ props.item.user.account.balance }} Euro</td>
              <td>{{ props.item.created_at | moment("MMMM Do YYYY, h:mm a") }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>


    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="primary">
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn icon dark @click="dialog = false">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
              <v-subheader>Identity Check</v-subheader>
              <h1>Front</h1>
              <img :src="'/api/' + this.identities.front" alt="">
              <h1>Back</h1>
              <img :src="'/api/' + this.identities.backs" alt="">
              <h1>Selfie</h1>
              <img :src="'/api/' + this.identities.selfie" alt="">
            </v-list>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        paymentTable: true,
        headers: [
          {
            text: 'First Name',
            value: 'firstname'
          },
          {
            text: 'Last Name',
            value: 'lastname'
          },
          {
            text: 'E-mail',
            value: 'user_email'
          },
          {
            text: 'Username',
            value: 'username'
          },
          {
            text: 'Withdraw Amount',
            value: 'withdraw_amount'
          },
          {
            text: 'Balance',
            value: 'balance'
          },
          {
            text: 'Date / Time',
            value: 'date'
          },
          {
            text: 'Identity',
            value: 'identity'
          },
          {
            text: 'Actions',
            value: 'actions'
          },
        ],
        headersApproved: [
          {
            text: 'First Name',
            value: 'firstname'
          },
          {
            text: 'Last Name',
            value: 'lastname'
          },
          {
            text: 'E-mail',
            value: 'user_email'
          },
          {
            text: 'Username',
            value: 'username'
          },
          {
            text: 'Withdraw Amount',
            value: 'withdraw_amount'
          },
          {
            text: 'Balance',
            value: 'balance'
          },
          {
            text: 'Date / Time',
            value: 'date'
          },
        ],
        headersDenied: [
          {
            text: 'First Name',
            value: 'firstname'
          },
          {
            text: 'Last Name',
            value: 'lastname'
          },
          {
            text: 'E-mail',
            value: 'user_email'
          },
          {
            text: 'Username',
            value: 'username'
          },
          {
            text: 'Withdraw Amount',
            value: 'withdraw_amount'
          },
          {
            text: 'Balance',
            value: 'balance'
          },
          {
            text: 'Date / Time',
            value: 'date'
          },
        ],
        withdraws: [],
        withdrawsApproved: {},
        withdrawsDenied: {},
        identities: {}
      }
    },
    methods: {
      forceRerender() {
        // Remove my-component from the DOM
        this.paymentTable = false;

        // If you like promises better you can
        // also use nextTick this way
        this.$nextTick().then(() => {
          // Add the component back in
          this.paymentTable = true;
        });
      },

      acceptPayment(id) {
        axios.post('/api/withdraw/approve', {
          withdraw_id: id
        })
          .then(function (response) {
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      declinePayment(id) {
        axios.post('/api/withdraw/deny', {
          withdraw_id: id
        })
          .then(function (response) {
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      identityOpen(identity) {
        this.identities = {
          selfie : identity.identity_selfie,
          front : identity.identity_front,
          backs : identity.identity_back
        }
        this.dialog = true
      }


    },
    created() {
      axios.get('/api/withdraw')
        .then((resp) => {
          this.withdraws = resp.data.data;
        });

      axios.get('/api/withdraw/approve/list')
        .then((resp) => {
          this.withdrawsApproved = resp.data.data;
        });

      axios.get('/api/withdraw/denied/list')
        .then((resp) => {
          this.withdrawsDenied = resp.data.data;
        });
    }
  }
</script>
