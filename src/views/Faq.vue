<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="F.A.Q" text="Frequently Asked Questions">
          <v-data-table :headers="headers" :items="faq" class="elevation-1" :rows-per-page-items="[20, 50, 100, 200]">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.question }}</td>
              <td>{{ props.item.answer }}</td>
              <td>
                <v-btn small color="primary" v-bind:to="'/faq-edit/' + props.item.id">
                  <v-icon>edit</v-icon>Edit
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
            headers: [
                {
                    text: 'Question',
                    value: 'question'
                },
                {
                    text: 'Answer',
                    value: 'answer'
                },
                {
                    text: 'Actions',
                    value: 'actions'
                }
            ],
            faq: [],

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
