<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <h1>Platform : {{platform_name}}</h1>
        <v-btn small color="primary" :to="'/games/'+ $route.params.platform_id + '/new'">Add New Game</v-btn>
        <material-card color="green" :title="platform_name + ' Games'" text="Games List">
          <v-data-table :headers="headers" :items="games" class="elevation-1" :rows-per-page-items="[10, 20, 30, 40]">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>
                <template v-for="(type, i) in props.item.types">
                  <li :key="i">{{ type.name }}</li>
                </template>
              </td>
              <td>
                <v-btn small color="primary" :to="'/game-types/' + props.item.id">Manage Types</v-btn>
                <v-btn small color="primary" :to="'/games/' + props.item.id + '/edit'">
                  <v-icon>edit</v-icon>
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
  export default {
    data() {
      return {
        headers: [{
          text: 'Game Name',
          value: 'game_name'
        },
          {
            text: 'Game Types',
            value: 'game_types'
          },
          {
            text: 'Actions',
            value: 'actions'
          },
        ],
        games: [],
        platform_name: ""
      }
    },
    created() {
      const that = this;
      this.$http.get('/api/platforms/' + that.$route.params.platform_id + '?include=games.types.rules.options').then(resp => {
        that.games = resp.data.games;
        that.platform_name = resp.data.name;
      });
    }
  }
</script>
