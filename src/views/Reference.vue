<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <!-- <router-link  to="/tournament-new">asd</router-link> -->
             <!-- <v-btn small color="primary" to="/objections-new">Add New Game</v-btn> -->
                <material-card color="green" title="Reference" text="Reference List">
                    <v-data-table :headers="headers" :items="objections" class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.objection_name }}</td>
                            <td>{{ props.item.objection_desc }}</td>
                            <td>Platforms ... </td>
                            <td>{{ props.item.user_name }}</td>
                            <td>
                                <!-- <v-btn small color="primary" v-on:click="submit" :to="'/game-types/' + props.item.game.id">Edit Types</v-btn> -->
                                <v-btn small color="primary" v-on:click="submit">Messages</v-btn>
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
                    text: 'Reference Title',
                    value: 'objection_title'
                },
                {
                    text: 'Reference Title',
                    value: 'objection_name'
                },
                {
                    text: 'Reference Desc',
                    value: 'objection_desc'
                },
                {
                    text: 'User Name',
                    value: 'user_name'
                },
                {
                    text: 'Actions',
                    value: 'actions'
                },
            ],
            objections: []
        }
    },
    created() {
        this.$http.get('mock-api/objections').then(resp => {
            this.objections = resp.data
        })
    }
}
</script>
