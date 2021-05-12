<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <material-card color="green" title="Edit Game" text="Edit Game">
                <v-form ref="form" v-model="valid">
                    <v-container py-0>
                        <v-layout wrap row>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.title" label="Game Name" required />
                            </v-flex>
                            <!-- <v-flex md12>
                                <croppa v-model="formData.cover" :width="900" :height="350" placeholder="Game Cover Photo" style="border:1px solid #ccc;"></croppa>
                            </v-flex>
                            <v-flex md12>
                                <croppa v-model="formData.logo" :width="300" :height="350" placeholder="Game Logo" style="border:1px solid #ccc;"></croppa>
                            </v-flex> -->
                            <v-flex md5>
                                <!-- <v-flex md12>
                                    <v-select v-model="formData.platform_id" :items="all_platforms" label="Select Platform"  required multiple></v-select>
                                </v-flex> -->
                                <v-btn small color="primary" v-on:click="submit">Update Game</v-btn>
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
            errors: "",
            all_platforms: [],
            formData: {
                platform_id: "",
                game_id: "",
                game_type_id: "",
                title: "",
                options: [],
                is_active: true,
                cover: null,
                logo: null,
            },
            methods: {}
        };
    },
    created() {
        this.$http.get("/api/platforms").then(resp => {
            const data = resp.data.data;
            this.all_platforms = data.map(obj => {
                return {
                    value: obj.id,
                    text: obj.name
                };
            });
        });
    }
};
</script>
