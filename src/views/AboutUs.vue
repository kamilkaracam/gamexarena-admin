<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>

        <material-card color="green" title="About Us" text="About Us">
          <v-form ref="form" v-model="valid">
            <v-layout wrap row>
              <v-flex xs12 md12>
                <vue-editor
                  v-model="content"
                ></vue-editor>

                <v-btn small color="primary" @click="saveContent">Update</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </material-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { VueEditor, Quill } from 'vue2-editor'

export default {
    components: {
      VueEditor
    },
    methods: {
      saveContent: function() {
        console.log(this.content)
      }
    },
    data() {
      return {
        content: '<h1>Some initial content</h1>',
        errors: [],
        valid: true,
        dialog: null,
        user: [],
        formData: {
          username: null,
          first_name: null,
          last_name: null,
          password: null,
          passwordConfirm: null,
          status: null
        },
      }
    },
    created() {
      const that = this;
      this.$http.get('/mock-api/users').then(resp => {
        that.formData = resp.data[that.$route.params.id];
      });

    }
  }
</script>
