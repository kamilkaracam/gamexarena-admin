<template>
<v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
        <v-flex md12>
            <material-card color="green" title="" text="">
                <v-dialog v-model="banDialog" width="600" v-if="!formData.is_banned">
                    <v-btn slot="activator" color="warning" small dark>Ban User</v-btn>
                    <v-card>
                        <v-card-title class="headline">İşleme Devam Et</v-card-title>
                        <v-card-text>Kullanıcıyı Banlamak İstediğinize Emin Misiniz?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" flat @click="banUser(formData.uuid)">Yes, Ban</v-btn>
                            <v-btn color="green darken-1" flat @click="banDialog = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="unBanDialog" width="600" v-if="formData.is_banned === 1">
                    <v-btn slot="activator" color="primary" small dark>Un-Ban User</v-btn>
                    <v-card>
                        <v-card-title class="headline">Un-Ban İşlemine Devam Et</v-card-title>
                        <v-card-text>Kullanıcıyı Banını Kaldırmak İstediğinize Emin Misiniz?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" flat @click="unBanUser(formData.uuid)">Yes, UnBan</v-btn>
                            <v-btn color="green darken-1" flat @click="unBanDialog = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-btn slot="activator" color="primary" dark small>Penalty</v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Penalty</span>
                        </v-card-title>
                        <v-card-text>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-currency-field label="Amount" v-bind="currency_config" :error-messages="errors.price" v-model="penalty.amount" required></v-currency-field>
                                </v-flex>
                                <!--<v-flex md12>
                                    <v-textarea label="Description" v-model="penalty.description"></v-textarea>
                                </v-flex>-->
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="givePenalty(formData.uuid)">Give Penalty</v-btn>
                            <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="addBalanceDialog" persistent max-width="600px" style="float:right;">
                    <v-btn slot="activator" color="warning" dark small>
                        <v-icon>monetization_on</v-icon> Add Balance </v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Balance</span>
                        </v-card-title>
                        <v-card-text>
                            <v-layout wrap>
                                 <v-flex md12>
                                    <v-currency-field label="Amount" v-bind="currency_config" :error-messages="errors.price" v-model="addBalance.amount" required></v-currency-field>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="addBalanceUser(formData.uuid)">Add Balance</v-btn>
                            <v-btn color="blue darken-1" flat @click="addBalanceDialog = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="addBonusBalanceDialog" persistent max-width="600px" style="float:right;">
                    <v-btn slot="activator" color="primary" dark small>
                        <v-icon>attach_money</v-icon> Add Bonus Balance </v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Bonus Balance</span>
                        </v-card-title>
                        <v-card-text>
                            <v-layout wrap>
                                 <v-flex md12>
                                    <v-currency-field label="Bonus Balance Amount" v-bind="currency_config" :error-messages="errors.price" v-model="addBonusBalance.amount" required></v-currency-field>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="addBonusBalanceUser(formData.uuid)">Add Balance</v-btn>
                            <v-btn color="blue darken-1" flat @click="addBonusBalanceDialog = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


            </material-card>
            <material-card color="green" title="Kullanıcı Düzenle" text="Kullanıcı Düzenle">
                <v-form ref="form" v-model="valid">
                    <v-layout wrap row>
                        <v-flex xs12 md6>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.username" label="Username" disabled />
                            </v-flex>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.email" label="Email" disabled />
                            </v-flex>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.first_name" label="First Name" />
                            </v-flex>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.last_name" label="Last Name" />
                            </v-flex>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.password" label="Password" />
                            </v-flex>
                            <v-flex xs12 md12>
                                <v-text-field v-model="formData.passwordConfirm" label="Password Confirm" />
                            </v-flex>
                            <v-flex md12>
                                <h4>User Status : </h4> {{ formData.status }}
                            </v-flex>
                            <v-btn small color="primary" v-on:click="submit">Update User</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </material-card>
            <material-card color="green" title="" text="Hesap Hareketleri">
                <v-data-table :headers="headers" :items="transactions" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.balance }}</td>
                        <td>{{ props.item.amount }}</td>
                        <td>{{ props.item.type.name }}</td>
                        <td>{{ props.item.description.text }}</td>
                        <td>{{ props.item.created_at }}</td>
                    </template>
                </v-data-table>
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
                this.$http.patch('/api/users/'+this.formData.uuid, this.formData).then((res)=>{
                    this.$router.push({path: '/user-list'})
                });
            }
        },
        banUser(uuid){
            this.$http.put('/api/users/'+uuid+'/banuser',{}).then((res)=>{
                this.banDialog = false
                this.$router.push({path: '/user-list'})
            })
        },
        unBanUser(uuid){
            this.$http.put('/api/users/'+uuid+'/unbanuser',{}).then((res)=>{
                this.unBanDialog = false
                this.$router.push({path: '/user-list'})
            })
        },
        givePenalty(uuid){
            if(!this.penalty.amount){
                alert('You should enter amount');
                return
            }

            this.$http.put('/api/users/'+uuid+'/penalty',this.penalty).then((res)=>{
                this.dialog = false
            })
        },
        addBalanceUser(uuid){
           if(!this.addBalance.amount){
                alert('You should enter amount');
                return
            }
            this.$http.put('/api/users/'+uuid+'/add_balance',this.addBalance).then((res)=>{
                this.addBalanceDialog = false
            }) 
        },
        addBonusBalanceUser(uuid){
           if(!this.addBonusBalance.amount){
                alert('You should enter amount');
                return
            }
            this.$http.put('/api/users/'+uuid+'/add_bonus_balance',this.addBonusBalance).then((res)=>{
                this.addBonusBalanceDialog = false
            }) 
        }
    },
    data() {
        return {
              currency_config: {
                decimal: ",",
                thousands: ".",
                prefix: "",
                suffix: " €",
                precision: 2,
                masked: false,
                allowBlank: false,
                min: Number.MIN_SAFE_INTEGER,
                max: Number.MAX_SAFE_INTEGER
            },
            errors: [],
            valid: true,
            banDialog: null,
            unBanDialog: null,
            addBalanceDialog: null,
            addBalanceDialog:null,
            addBonusBalanceDialog:null,
            dialog: null,
            user: [],
            formData: {
                uuid: null,
                username: null,
                first_name: null,
                last_name: null,
                password: null,
                passwordConfirm: null,
                status: null
            },
            penalty : {
                amount: null,
                description: null
            },
            addBalance: {
                amount: null,
            },
            addBonusBalance: {
                amount: null,
            },
            transactions: [],
            headers: [{
                    text: 'Balance',
                    value: 'balance'
                },
                {
                    text: 'Amount',
                    value: 'amount'
                },
                {
                    text: 'Type',
                    value: 'type.name'
                },
                {
                    text: 'Description',
                    value: 'description.text'
                },
                {
                    text: 'Date',
                    value: 'created_at'
                },
            ],
        }
    },
    created() {
        const that = this;
        this.$http.get('/api/users/'+that.$route.params.id).then(resp => {
            that.formData = resp.data;
        });
        this.$http.get('/api/users/'+that.$route.params.id+'/transactions').then(resp => {
            that.transactions = resp.data.data;
        });
    }
}
</script>
