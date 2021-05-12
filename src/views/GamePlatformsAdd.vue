<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <material-card color="green" title="Add New Platform" text="Add New Platform">
                <v-form ref="form" v-model="valid">
                    <v-container py-0>
                        <v-layout wrap row>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.title" label="Platform Name" required />
                            </v-flex>
                            <v-flex md12>
                                <croppa v-model="formData.cover" :width="300" :height="300" placeholder="Add Platform Logo" style="border:1px solid #ccc;"></croppa>
                            </v-flex>
                            <v-flex md5>
                                <v-btn small color="primary" v-on:click="submit">Create Platform</v-btn>
                                <v-btn small color="primary" v-on:click="redirectBack">Back</v-btn>
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
export default {
    methods: {
        submit: function () {
            const formValid = this.$refs.form.validate();
            if (formValid) {
                if (this.formData.cover != "") {
                    this.formData.cover = this.formData.cover.generateDataUrl();
                }
                // console.log(this.formData.cover);
                this.$http.post('api/tournaments', this.formData);
            }
        },        
        redirectBack() {
            window.history.back();
        }
    },
    data() {
        return {
            valid: true,
            date: null,
            rules: [],
            errors: "",
            all_rules: [],
            all_platforms: [],
            all_games: [],
            all_game_types: [],
            filtered_games: [],
            filtered_game_types: [],
            formData: {
                title: "",
                options: [],
                currency_id: 1,
                is_active: true,
                started_at: null,
                last_registration_at: null,
                cover: null,
            }
        };
    },
    created() {
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
