<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <material-card color="green" title="Add New Banner" text="Add New Banner">
                <v-form ref="form" v-model="valid">
                    <v-container py-0>
                        <v-layout wrap row>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.title" label="Title" required />
                            </v-flex>
                            <v-flex md6>
                                <img 
                                 :src="formData.banner_image"
                                 style="max-width:150px; display:block;"
                                 v-if="formData.banner_image"
                                 >
                                
                                <input
                                        type="file"
                                        style="display: none"
                                        ref="banner_image"
                                        accept="image/*"
                                        @change="onBannerImagePicked"
                                    >
                                    <v-btn small color="primary" @click="fileInputClick('banner_image')">
                                        <v-icon>image</v-icon>
                                        Banner Image
                                    </v-btn>
                            </v-flex>
                            <v-flex md6>
                                <img 
                                 :src="formData.banner_mobile_image"
                                 style="max-width:150px; display:block;"
                                 v-if="formData.banner_mobile_image"
                                 >
                                <input
                                        type="file"
                                        style="display: none"
                                        ref="banner_mobile_image"
                                        accept="image/*"
                                        @change="onBannerMobileImagePicked"
                                    >
                                    <v-btn small color="primary" @click="fileInputClick('banner_mobile_image')">
                                        <v-icon>image</v-icon>
                                        Banner Image
                                    </v-btn>
                            </v-flex>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.target_url" label="Target URL" />
                            </v-flex>
                            
                            <v-flex md12>
                                <v-textarea v-model="formData.description" label="Description" />
                            </v-flex>

                            <v-flex md5>
                                <!-- <v-flex md12>
                                    <v-select v-model="formData.platform_id" :items="all_platforms" label="Select Platform"  required multiple></v-select>
                                </v-flex> -->
                                <v-btn small color="primary" v-on:click="submitBanner">Create Banner</v-btn>
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
        redirectBack() {
            window.history.back();
        },
        fileInputClick(elm){
            this.$refs[elm].click();
        },
        submitBanner(){
            
            const formValid = this.$refs.form.validate();
            if (formValid) {
                if(this.formData.title && !this.$route.params.id){
                    this.$http.post('/api/banners', this.formData)
                    .then((resp)=>{
                        this.$router.push({path: '/banners'})
                    });
                }else{
                    this.$http.post('/api/banners/'+this.$route.params.id, this.formData)
                    .then((resp)=>{
                        this.$router.push({path: '/banners'})
                    });
                }
            }
        },
        onBannerImagePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
                    this.formData.banner_image = fr.result
                    
				})
			} else {
				this.formData.banner_image = null;
			}
        },
        onBannerMobileImagePicked (e) {
			const mfiles = e.target.files
			if(mfiles[0] !== undefined) {
				this.imageName = mfiles[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(mfiles[0])
				fr.addEventListener('load', () => {
                    this.formData.banner_mobile_image = fr.result 
                    
				})
			} else {
				this.formData.banner_mobile_image = null;
			}
        },
        getBannerForEdit(){
            if(this.$route.params.id){
                this.formData = {}
                this.$http.get('/api/banners/'+this.$route.params.id)
                    .then((resp) =>{
                        this.formData = resp.data

                        this.formData.banner_image = '/api/' + resp.data.banner_image
                        this.formData.banner_mobile_image = '/api/' + resp.data.banner_mobile_image
                    })
            }
        }
    },
    data() {
        return {
            valid: true,
            errors: "",
            all_platforms: [],
            formData: {
                title: null,
                banner_image: null,
                banner_mobile_image: null,
                target_url: null,
                is_active: 1,
                description: null
            },
        };
    },
    created() {
        this.getBannerForEdit()
    },
    watch: {}
};
</script>
