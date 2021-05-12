<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <!-- <router-link  to="/tournament-new">asd</router-link> -->
        <!-- <v-btn small color="primary" to="/objections-new">Add New Game</v-btn> -->
        <material-card color="green" title="Objections" text="Objections List">
          <v-data-table :headers="headers" :items="objections" class="elevation-1">
            <template slot="items" slot-scope="props">
              <!--<td>{{ props.item.platform.name }}</td>-->
              <td>{{ props.item.game.name }}</td>
              <td>{{ props.item.wager }} Euro</td>
              <td>{{ props.item.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>
              <td>{{ props.item.finished_at | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>
              <td>{{ props.item.home.username}}</td>
              <!--<td>{{ props.item.disputes[0].description}}</td>
              <td>{{ props.item.disputes[0].screenshot}}</td>-->
              <td>{{ props.item.away.username}}</td>
              <!--<td>{{ props.item.disputes[1].description}}</td>
              <td>{{ props.item.disputes[0].screenshot}}</td>-->
              <td>
                <v-btn v-if="props.item.disputes" color="warning" @click="screenshotCheck(props.item.disputes,props.item)">KARAR VER</v-btn>
              </td>
              <!--<td>
                <v-btn small color="primary" @click="clickDecide()">Karar Ver</v-btn>
              </td>-->
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
              <v-subheader>Dispute Screenshot Check</v-subheader>
              <v-layout row>
                <v-flex md6 wrap v-for="item in screenshots" :key="item.id">
                  <v-layout>
                    <v-flex md7>
                      <h3>Screenshot</h3>
                      <img :src="'/api/' + item.screenshot" alt="" style="width:97%;">
                      </v-flex>
                      <v-flex md4>
                        <h3>{{item.username}}</h3>
                        <h3>Description</h3>
                        <p v-if="item.description">{{item.description}}</p>
                      </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex md12>
                        <v-btn small color="primary" @click="setWinner(item.user_id,screenshots.match_uuid)">WINNER</v-btn>
                      </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap >
                
              </v-layout>
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
        headers: [
          {
            text: 'Game',
            value: 'game'
          },
          {
            text: 'Wager',
            value: 'wager'
          },
          {
            text: 'Match Start',
            value: 'match_start'
          },
          {
            text: 'Match End',
            value: 'match_end'
          },
          {
            text: 'Home Username',
            value: 'home_username'
          },
          {
            text: 'Away Username',
            value: 'home_username'
          },
          {
            text: 'Karar',
            value: 'karar'
          },
        ],
        objections: [],
        screenshots: []
      }
    },
    methods: {
      screenshotCheck(disputes,match) {
        for(const i in disputes){
          if(match.home.id === disputes[i].user_id){
            disputes[i].username = match.home.username
          }else{
            disputes[i].username = match.away.username
          }
          /*axios.get('/api/users/'+disputes[i].user_id+'/detail').then((resp)=>{
            disputes[i].user_name = resp.data.first_name + ' ' + resp.data.last_name + ' (' + resp.data.username + ')'
          });*/
        }
        this.screenshots = disputes;
        this.screenshots.match_uuid = match.uuid

        this.dialog = true
      },
      clickDecide(){
        
      },
      getObjections(){
        axios.get('/api/match/disputes')
          .then((resp) => {
            this.objections = resp.data.data;
          });
      },
      setWinner(user_id,match_uuid){
        this.$http.put('/api/matches/' + match_uuid + '/setwinner',{user_id:user_id}).then((res)=>{
          this.dialog = false
          this.getObjections()
        });
      }
    },
    created() {
      this.getObjections();

    }
  }
</script>
