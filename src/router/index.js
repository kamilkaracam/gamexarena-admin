/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'
import VueQuillEditor from 'vue-quill-editor'
import CKEditor from '@ckeditor/ckeditor5-vue';


// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// Routes
import paths from './paths'

function routerCombine(route) {
  let {path, view, name, meta, children, beforeEnter} = route;

  return {
    name: name || view,
    path,
    component: (resolve) => import(
      `@/views/${view}.vue`
      ).then(resolve),
    children: children ? children.map(route => routerCombine(route)) : [],
    meta,
    beforeEnter,
  }
}

Vue.use(VueQuillEditor)
Vue.use( CKEditor );


Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(route => routerCombine(route)).concat([
    {path: '*', redirect: '/'}
  ]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {selector: to.hash}
    }
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {

  if(to.meta.requiresAuth) {
      if (localStorage.getItem('panel_token') == 'null') {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
        next()
      }
  } else {
      next()
  }
})

Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

export default router
