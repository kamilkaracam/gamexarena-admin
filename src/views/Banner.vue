<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <v-btn small color="primary" :to="{name: 'Banner New'}">Add New Banner</v-btn>
        <material-card color="green" title="Kullanıcılar" text="Kullanıcı Listesi">
          <v-data-table :headers="headers" :items="bannerList" class="elevation-1" :rows-per-page-items="[10, 20, 50]">
            <template slot="items" slot-scope="props">
              <td>
                <v-img
                  :src="'/api/' + props.item.banner_image"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  max-width="150"
                v-if="props.item.banner_image"></v-img>
              </td>
              <td>
                <v-img
                  :src="'/api/' + props.item.banner_mobile_image"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  max-width="150"
                v-if="props.item.banner_mobile_image"></v-img>
              </td>
              <td>{{ props.item.title }}</td>
              <td>
                <v-switch 
                  v-model="props.item.is_active" 
                  :label="`Active?`"
                  @change="changeBannerStatus(props.item.id,props.item.is_active)">
                  </v-switch>
              </td>
              <td>{{ props.item.created_at | moment('DD/MM/YYYY') }}</td>
              <td>
                <!--<v-btn small color="primary" v-bind:to="'/banners/'+props.item.id+'/edit'">
                  <v-icon>edit</v-icon>
                  Edit
                </v-btn>-->
                <v-btn small color="warning" @click="deleteBanner(props.item.id)">
                  <v-icon>delete</v-icon>
                  Delete
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
  import axios from 'axios'

  export default {
    data() {
      return {
        headers: [
          {
            text: 'Desktop Image',
            value: 'banner_image'
          },
          {
            text: 'Mobile Image',
            value: 'banner_mobile_image'
          },
          {
            text: 'Title',
            value: 'title'
          },
          {
            text: 'Active',
            value: 'is_active'
          },
          {
            text: 'Created',
            value: 'created_at'
          },
          {
            text: 'Actions',
            value: 'actions'
          }
        ],
        bannerList: []
      }
    },
    methods:{
      changeBannerStatus(id,value){
        axios.put('/api/banners/'+id+'/set-status',{is_active:value})
            .then((resp) => {
              
            })
      },
      deleteBanner(id){
        this.$http.delete('/api/banners/' + id).then((resp) => {
          this.getBannerList();
        });
      },
      getBannerList(){
        this.$http.get('/api/banners')
          .then((resp) => {
            this.bannerList = resp.data.data;
          });
      }
    },
    created() {
      this.getBannerList();
    }
  }
</script>


