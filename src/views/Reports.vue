<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <!-- <router-link  to="/tournament-new">asd</router-link> -->
             <!-- <v-btn small color="primary" to="/games-new">Add New Game</v-btn> -->

                <material-card color="green" title="Reports" text="Reports List">
                    <v-data-table :headers="headers" :items="games" class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.game.name }}</td>
                            <td>Platforms ... </td>
                            <td>
                                <!-- <v-btn small color="primary" v-on:click="submit" :to="'/game-types/' + props.item.game.id">Edit Types</v-btn> -->
                                <!-- <v-btn small color="primary" v-on:click="submit">Edit Platforms</v-btn> -->
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
                    text: 'Game Name',
                    value: 'platform_name'
                },
                {
                    text: 'Platforms',
                    value: 'platform_name'
                },
                {
                    text: 'Actions',
                    value: 'actions'
                },        
            ],
            games: []
        }
    },
    created() {
        this.$http.get('api/tournaments?include=platform,game,currency').then(resp => {
            this.games = resp.data.data
        })
    }
}
</script>
