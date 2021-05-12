<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Kullanıcılar" text="Kullanıcı Listesi">
          <v-data-table :headers="headers" :items="userList" class="elevation-1" :rows-per-page-items="[10, 20, 50]">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.username }}</td>
              <td>{{ props.item.first_name }}</td>
              <td>{{ props.item.last_name }}</td>
              <td>{{ props.item.email }}</td>
              <td>{{ props.item.account.balance }}</td>
              <td>
                  <span v-if="props.item.is_banned === 1" style="color:red;">
                    Banned
                   </span>
                   <span v-else style="color:green;">
                     No
                     </span>
              </td>
              <td>{{ props.item.created_at }}</td>

              <td>
                <v-btn small color="primary" v-bind:to="'/user-edit/' + props.item.uuid">
                  <v-icon>edit</v-icon>
                  Edit
                </v-btn>
              </td>
            </template>
          </v-data-table>
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
        headers: [
          {
            text: 'Kullanıcı Adı',
            value: 'username'
          },
          {
            text: 'Adı',
            value: 'first_name'
          },
          {
            text: 'Soyadı',
            value: 'last_name'
          },
          {
            text: 'E-Posta',
            value: 'email'
          },
          {
            text: 'Money',
            value: 'account'
          },
          {
            text: 'Banned?',
            value: 'is_banned'
          },
          {
            text: 'Hesap Açılış Tarihi',
            value: 'created_at'
          },
          {
            text: 'Actions',
            value: 'actions'
          }
        ],
        userList: []
      }
    },
    created() {
      axios.get('/api/users?include=disputes')
          .then((resp) => {
            // console.log(resp.data.data)
            this.userList = resp.data.data;
          });
    }
  }
</script>


