import Vue from 'vue';

Vue.prototype.$isLoggedin = (localStorage.getItem('panel_user') && localStorage.getItem('panel_user')) ? true : false;

export function authHeader() {
    if (localStorage.getItem('panel_token')) {
        return { headers: {"Authorization" : "Bearer " + localStorage.getItem('panel_token') } }
    } else {
        return {};
    }
}


