<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>

        <material-card color="green" title="Faq Edit" text="Frequently Asked Questions Edit">
          <v-form ref="form" v-model="valid">
            <v-layout wrap row>
              <v-flex xs12 md6>
                <v-flex xs12 md12>
                  <v-textarea
                    name="input-7-1"
                    label="English Question"
                    :value="this.faq[0].question"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 md12>
                  <v-textarea
                    name="input-7-1"
                    label="English Answer"
                    :value="this.faq[0].answer"
                  ></v-textarea>
                </v-flex>

                <v-flex xs12 md12>
                  <v-textarea
                    name="input-7-1"
                    label="Turkish Question"
                    :value="this.faq[1].question"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 md12>
                  <v-textarea
                    name="input-7-1"
                    label="Turkish Answer"
                    :value="this.faq[1].answer"
                  ></v-textarea>
                </v-flex>

                <v-flex xs12 md12>
                  <v-textarea
                    name="input-7-1"
                    label="German Question"
                    :value="this.faq[2].question"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 md12>
                  <v-textarea
                    name="input-7-1"
                    label="German Answer"
                    :value="this.faq[2].answer"
                  ></v-textarea>
                </v-flex>

                <v-btn small color="primary" v-on:click="submit">Update Question</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </material-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        errors: [],
        valid: true,
        dialog: null,
        faq: null,
      }
    },
    methods: {
      submit: function () {
        const formValid = this.$refs.form.validate();
        if (formValid) {
          this.$http.post('api/tournaments', this.formData);
        }
      }
    },
    created() {
      const that = this;
      this.$http.get('/api/faqs/lang/en').then(resp => {
        that.faq = resp.data;
        console.log(that.faq)
      })
    }
  }
</script>
