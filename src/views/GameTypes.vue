<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <v-btn small color="primary" :to="'/game-types/' +  $route.params.id + '/new'">Add New Type</v-btn>
        <material-card color="green" title="Game Types">
          <v-data-table :headers="headers" :items="game_types" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>
                <template v-for="(rule, i) in props.item.rules">
                  <div :key="i">
                    <p><strong>{{rule.name }}</strong></p>
                    <ul class="mb-4">
                      <li v-for="(option, j) in rule.options" :key="j"> {{option.text }}</li>
                    </ul>
                  </div>
                </template>
              </td>
              <td>
                <v-btn small color="primary" :to="'/game-rules/' + props.item.game_type_id">Manage Rules</v-btn>
                <v-btn small color="primary" :to="'/game-types/' + props.item.id + '/edit'">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-dialog v-model="removeDialog" persistent max-width="600px">
                  <v-btn slot="activator" small color="error">
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Remove Options</span>
                    </v-card-title>
                    <v-card-text>
                      <v-layout wrap>
                      </v-layout>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" flat @click="dialog = false">Yes, Delete</v-btn>
                      <v-btn color="blue darken-1" flat @click="removeDialog = false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        headers: [{
          text: 'Game Name',
          value: 'platform_name'
        },
          {
            text: 'Rules',
            value: 'rules'
          },
          {
            text: 'Actions',
            value: 'actions'
          },
        ],
        game_types: [],
        removeDialog: false
      }
    },
    created() {
      const that = this;
      this.$http.get('/api/games/1?include=types.rules').then(resp => {
        that.game_types = resp.data.types;
      })
    }
  }
</script>
