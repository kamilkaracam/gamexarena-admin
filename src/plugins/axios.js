// Lib imports
import axios from 'axios';
import Vue from 'vue';

axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('panel_token');
Vue.prototype.$http = axios


export default function setup() {
    axios.interceptors.request.use(function(config) {
        const token = localStorage.getItem('panel_token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        window.location.href = '/login';
        return Promise.reject(err);
    });
}

setup();