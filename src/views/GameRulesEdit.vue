<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <material-card color="green" title="New Rule Name">
                <v-form ref="form" v-model="valid">
                    <v-container py-0>
                        <v-layout wrap row>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.title" label="Rule Name" required />
                            </v-flex>
                            <v-flex md5>
                                <v-btn small color="primary" v-on:click="submit">Update Rule</v-btn>
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
            errors: "",
            formData: {
                title: "",
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
    },
    watch: {}
};
</script>
