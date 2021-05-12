<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <material-card color="green" title="Edit Game Type">
                <v-form ref="form" v-model="valid">
                    <v-container py-0>
                        <v-layout wrap row>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.title" label="Game Type Name" required />
                            </v-flex>
                            <v-flex md5>
                                <v-btn small color="primary" v-on:click="submit">Update Game Type</v-btn>
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
            formData: {
                title: "",
            },
            methods: {}
        };
    }
};
</script>
