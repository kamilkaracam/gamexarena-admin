<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <v-btn small color="primary" :to="'/game-rules/'+  $route.params.game_type_id +'/new'">Add New Rule</v-btn>
            <material-card color="green" title="Game Rules">
                <v-data-table :headers="headers" :items="game_types" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.rule_name }}</td>
                        <td>Rules ... </td>
                        <td>
                            <v-btn small color="primary" :to="'/game-options/' + props.item.id">Manage Options</v-btn>
                            <v-btn small color="primary" :to="'/game-rules/' + props.item.id + '/edit'">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-dialog v-model="removeDialog" persistent max-width="600px">
                                <v-btn slot="activator" small color="error">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Remove Options</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-layout wrap>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="error" flat @click="removeOption">Yes, Delete</v-btn>
                                        <v-btn color="blue darken-1" flat @click="removeDialog = false">Cancel</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
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
            headers: [{
                    text: 'Game Name',
                    value: 'platform_name'
                },
                {
                    text: 'Rules',
                    value: 'rules'
                },
                {
                    text: 'Actions',
                    value: 'actions'
                },
            ],
            game_types: [],
            removeDialog: false
        }
    },
    created() {
        const that = this;
        this.$http.get('/mock-api/game_rules/').then(resp => {
            that.game_types = resp.data
        })
    },
    methods: {
        removeOption() {
        }
    }
}
</script>
