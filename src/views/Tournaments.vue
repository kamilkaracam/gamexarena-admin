<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <!-- <router-link  to="/tournament-new">asd</router-link> -->
        <v-btn small color="primary" :to="{name: 'Add Tournament'}">Add New Tournament</v-btn>
        <material-card color="green" title="Tournaments" text="Tournaments List">
          <v-data-table :headers="headers" :items="tournaments" class="elevation-1"
                        :rows-per-page-items="[10, 20, 30, 40]">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.platform.name }}</td>
              <td>{{ props.item.game.name }}</td>
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.total_prize }} {{ props.item.currency.symbol }}</td>
              <td>
                <v-btn small color="error" @click="deleteTournament(props.item.uuid)">
                  <v-icon>delete</v-icon>
                </v-btn>

                <v-btn small color="primary" v-bind:to="'/tournament-edit/' + props.item.uuid">
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
          text: 'Platform Name',
          value: 'platform_name'
        },
          {
            text: 'Game',
            value: 'game_name'
          },
          {
            text: 'Tournament Name',
            value: 'tournament_name'
          },
          {
            text: 'Tournament Price',
            value: 'tournament_price'
          },
        ],
        tournaments: [],
        // rowsPerPageItems: [10, 20, 30, 40],
      }
    },
    methods: {
      getTournaments: function() {
        this.$http.get('api/tournaments?include=platform,game,currency').then(resp => {
          this.tournaments = resp.data.data
        })
      },
      deleteTournament: function(id) {
        this.$http.delete('/api/tournaments/' + id).then(resp => {
          this.getTournaments()
        })
      },
    },
    created() {
      this.getTournaments()
    }
  }
</script>
