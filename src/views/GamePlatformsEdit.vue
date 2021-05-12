<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <material-card color="green" title="Edit Platform">
                <v-form ref="form" v-model="valid">
                    <v-container py-0>
                        <v-layout wrap row>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.title" label="Platform Name" required />
                            </v-flex>
                            <!-- <v-flex md12>
                                <croppa v-model="formData.cover" :width="300" :height="300" placeholder="Add Platform Logo" style="border:1px solid #ccc;"></croppa>
                            </v-flex> -->
                            <v-flex md5>
                                <v-btn small color="primary" v-on:click="submit">Update Platform</v-btn>
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
};
</script>
