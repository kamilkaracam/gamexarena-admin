<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
             <v-btn small color="primary" to="/platform-new">Add New Platform</v-btn>
                <material-card color="green" title="Platforms" text="Platforms List">
                    <v-data-table :headers="headers" :items="platforms" class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.name }}</td>
                            <td>
                                <v-btn small color="primary" :to="'/games/' + props.item.id">Manage Games</v-btn>
                                <v-btn small color="primary" :to="'/platforms/' + props.item.id + '/edit'"><v-icon>edit</v-icon></v-btn>
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
                    text: 'Platform Name',
                    value: 'platform_name'
                },
                {
                    text: 'Actions',
                    value: 'actions'
                }
            ],
            platforms: []
        }
    },
    created() {
        this.$http.get('api/platforms').then(resp => {
            this.platforms = resp.data.data
        })
    }
}
</script>
