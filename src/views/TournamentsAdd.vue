<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Add New Tournament" text="Add New Tournament">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container py-0>
              <v-layout wrap row>
                <v-flex xs12 md12>
                  <v-text-field v-model="formData.title" label="Tournament Name" required :rules="nameRules"/>
                </v-flex>
                <v-flex md12>
                  <v-btn block @click="sendProfileImage" title="Click for change image">
                    TOURNAMENT COVER IMAGE
                  </v-btn>
                  <input type="file" name="profileImage" style="display:none;" ref="profileImage" @change="uploadProfileImage" id="profileImage">
                </v-flex>
                <v-flex md6>
                  <v-flex md12>
                    <v-select v-model="formData.platform_id" :items="all_platforms" label="Select Platform" required
                              :rules="[v => !!v || 'Item is required']"></v-select>
                  </v-flex>
                  <v-flex md12>
                    <v-select v-model="formData.game_id" :items="filtered_games" label="Select Game" required
                              :rules="[v => !!v || 'Game is required']"></v-select>
                  </v-flex>
                  <v-flex md12 v-if="formData.game_id && formData.game_id == 1">
                    <v-select v-model="formData.game_type_id" :items="filtered_game_types" label="Select Game Type"
                              :rules="[v => !!v || 'Game Type is required']"></v-select>
                  </v-flex>
                  <v-layout wrap v-if="rules.length > 0">
                    <v-flex md12>
                      <h6><strong>Rules :</strong></h6>
                    </v-flex>
                    <v-flex v-for="(rule, index) in rules" :key="index" md6>
                      <v-select v-model="formData.options[index]" :items="rule.options" :label="rule.name"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-flex xs12 md12>
                    <v-select v-model="formData.opponent_number" :items="opponent_counts"
                              label="Opponent Limit"></v-select>
                  </v-flex>
                  <v-flex md12>
                    <v-currency-field label="Entry Fee" v-bind="currency_config" :error-messages="errors.price"
                                      v-model="formData.entry_fee" required></v-currency-field>
                  </v-flex>
                  <v-flex md12>
                    <v-currency-field label="Total Prize" v-bind="currency_config" :error-messages="errors.price"
                                      v-model="formData.total_prize" required></v-currency-field>
                  </v-flex>
                  <v-flex md12>
                    <template v-for="(prize, index) in formData.prizes">
                      <v-layout :key="index" wrap row>
                        <v-flex md2>
                          <v-select v-model="prize.is_range" label="Range/Fix" :items="prizes_scale">
                          </v-select>
                        </v-flex>
                        <v-flex v-if="prize.is_range == true" md4>
                          <v-layout row wrap>
                            <v-flex md6>
                              <v-text-field v-model="prize.start" label="Start" required
                                            :rules="[v => !!v || 'Rank From Required']"/>
                            </v-flex>
                            <v-flex md6>
                              <v-text-field v-model="prize.end" label="End" required
                                            :rules="[v => !!v || 'Rank To Required']"/>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex v-if="prize.is_range == false" md4>
                          <v-layout row wrap>
                            <v-flex>
                              <v-text-field v-model="prize.start" label="Rank Number" required
                                            :rules="[v => !!v || 'Rank Number is required']"/>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex md2>
                          <v-currency-field label="Prize" v-bind="currency_config" :error-messages="errors.price"
                                            v-model="prize.prize" required></v-currency-field>
                        </v-flex>
                        <v-flex md2>
                          <v-checkbox v-model="prize.is_bonus" label="Bonus?"></v-checkbox>
                        </v-flex>
                        <v-flex md2 pt-4>
                          <v-btn small color="primary" v-if="index == formData.prizes.length -1"
                                 v-on:click="addPrize()">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                          <v-btn v-on:click="removePrize(index)" small color="primary"
                                 v-if="index != formData.prizes.length -1">
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-flex>
                  <v-flex md12>
                    <v-select v-model="formData.round_expiring_time" :items="expiringTimes" label="Time To Play Match"
                              required
                              :rules="[v => !!v || 'Expiring time is required']"></v-select>
                  </v-flex>
                  <v-flex md6>
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy
                            transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                      <v-text-field slot="activator" v-model="started_at_date" label="Started At"
                                    prepend-icon="event"></v-text-field>
                      <v-date-picker v-model="started_at_date" no-title @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>

                  <v-flex md12>
                    <v-time-picker v-model="started_at_hour" format="24hr"></v-time-picker>
                  </v-flex>


                  <v-flex md12>
                    <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy
                            transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                      <v-text-field slot="activator" v-model="last_registration_at_date"
                                    label="Last Registration At" prepend-icon="event"></v-text-field>
                      <v-date-picker v-model="last_registration_at_date" no-title
                                     @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex md12>
                    <v-time-picker v-model="last_registration_at_hour" format="24hr"></v-time-picker>
                  </v-flex>

                  <v-flex md12>
                    <h1>TÜRKÇE</h1>
                    <vue-editor
                      v-model="formData.tournamentrules.tr"
                    ></vue-editor>
                  </v-flex>
                  <v-flex md12>
                    <h1>İNGİLİZCE</h1>
                    <vue-editor
                      v-model="formData.tournamentrules.en"
                    ></vue-editor>
                  </v-flex>
                  <v-flex md12>
                    <h1>ALMANCA</h1>
                    <vue-editor
                      v-model="formData.tournamentrules.de"
                    ></vue-editor>
                  </v-flex>
                  <v-btn small color="primary" v-on:click="submit">Start Tournament</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {VueEditor, Quill} from 'vue2-editor'

  export default {
    components: {
      VueEditor
    },
    methods: {
      sendProfileImage(){
        this.$refs.profileImage.click()
      },
      uploadProfileImage(){
        var self = this
        this.file = this.$refs.profileImage.files[0]

        //this.formData.cover = this.file;
      },
      submit: function () {
        const fd = new FormData;
        this.formData.started_at = this.started_at_date + ' ' + this.started_at_hour;
        this.formData.last_registration_at = this.last_registration_at_date + ' ' + this.last_registration_at_hour;
        const formValid = this.$refs.form.validate();

        const json = JSON.stringify(this.formData);
        const blob = new Blob([json], {
          type: 'application/json'
        });

        fd.append('form',json);
        fd.append('cover',this.file);
        if (formValid) {
          this.$http.post('api/tournaments', fd).then(resp => {
            this.$router.push('tournaments');
          });
        }
      },
      formatDate(date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate(date) {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      addPrize() {
        this.formData.prizes.push({
          is_range: false
        });
      },
      removePrize(index) {
        this.formData.prizes.splice(index, 1);
      }
    },
    data() {
      return {
        nameRules: [
          v => !!v || 'Tournament Name is required',
        ],
        errors: [],
        gameCoverPhoto: null,
        picker: null,
        started_at_date:null,
        started_at_hour:null,
        last_registration_at_date: null,
        last_registration_at_hour: null,
        landscape: false,
        opponent_counts: [4, 8, 16, 32, 64, 128, 256, 512],
        prizes_scale: [
          {
            value: false,
            text: 'Fix'
          },
          {
            value: true,
            text: 'Range'
          }],
        valid: true,
        date: null,
        rules: [],
        menu1: true,
        menu2: true,
        all_rules: [],
        all_platforms: [],
        all_games: [],
        all_game_types: [],
        filtered_games: [],
        filtered_game_types: [],
        expiringTimes: [
          {
            value: 60 * 24,
            text: '24 Hours'
          },
          {
            value: 60 * 36,
            text: '36 Hours'
          },
          {
            value: 60 * 48,
            text: '48 Hours'
          },
          {
            value: 60 * 60,
            text: '60 Hours'
          },
          {
            value: 60 * 72,
            text: '72 Hours'
          }
        ],
        menu2: false,
        menu1: false,
        formData: {
          platform_id: "",
          game_id: "",
          game_type_id: "",
          title: "",
          entry_fee: 0,
          total_prize: 0,
          options: [],
          currency_id: 1,
          opponent_number: null,
          is_active: true,
          round_expiring_time: null,
          started_at: null,
          last_registration_at: null,
          cover: '',
          prizes: [],
          tournamentrules: {
            de: null,
            en: null,
            tr: null,
          }
        },
        currency_config: {
          decimal: ",",
          thousands: ".",
          prefix: "",
          suffix: " €",
          precision: 2,
          masked: false,
          allowBlank: false,
          min: Number.MIN_SAFE_INTEGER,
          max: Number.MAX_SAFE_INTEGER
        },
        methods: {}
      };
    },
    created() {
      this.formData.prizes.push({
        is_range: false
      });
      this.$http.get("api/platforms?include=platforms").then(resp => {
        const data = resp.data.data;
        this.all_platforms = data.map(obj => {
          return {
            value: obj.id,
            text: obj.name
          };
        });
      });
      this.$http
        .get("api/platforms?include=games.types.rules.options")
        .then(resp => {
          this.all_games = resp.data.data;
        });
    },
    watch: {
      "formData.platform_id": function (val, oldVal) {
        this.filtered_games = [];
        this.filtered_games = this.all_games.map(obj => {
          if (obj.id == val) {
            return obj.games;
          }
        });
        this.filtered_games = this.filtered_games.filter(obj => {
          if (typeof obj != "undefined") {
            return obj;
          }
        })[0];
        this.filtered_games = this.filtered_games.map(obj => {
          return {
            value: obj.id,
            text: obj.name,
            types: obj.types
          };
        });
      },
      "formData.game_id": function (val, oldVal) {
        const that = this;
        this.filtered_game_types = [];
        this.filtered_games.forEach(function (arr_val, key) {
          if (arr_val.value == val) {
            that.filtered_game_types = arr_val.types;
            that.rules = that.filtered_game_types.rules;
          }
        });
        this.filtered_game_types = this.filtered_game_types.map(obj => {
          return {
            value: obj.id,
            text: obj.name,
            rules: obj.rules,
          };
        });
        this.formData.game_type_id = this.filtered_game_types[0].value;
      },
      "formData.game_type_id": function (val, oldVal) {
        const that = this;
        this.filtered_game_types.forEach(function (arr_val, key) {
          if (arr_val.value == val) {
            that.rules = arr_val.rules;
          }
        });
        this.rules.forEach(function (arr_val, key) {
          that.rules[key]['options'] = that.rules[key]['options'].map(obj => {
            return {
              value: obj.id,
              text: obj.text,
              selected: obj.selected
            };
          });
        });
      }
    }
  };
</script>
