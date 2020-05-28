import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Dashboard from '@/components/admin/Dashboard'
import PageNotFound from '@/views/PageNotFound'
import firebase from 'firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About')
    },
    {
      path: '/name',
      name: 'Name',
      component: () => import( '@/views/Name')
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: () => import( '@/views/Jobs')
    },
    {
      path: '/play',
      name: 'Play',
      component: () => import( '@/views/Play'),
      props: true,
      beforeEnter: (to, from, next) => {
        if(to.params.name){
          next()
        } else{
          next({ name: 'Jobs' })
        }
      }
    },
    {
      path: '/testplay',
      name: 'TestPlay',
      component: () => import( '@/views/TestPlay')
    },
    {
      path: '/play4',
      name: 'Play4',
      component: () => import( '@/views/Play4')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( '@/components/auth/Login')
    },
    // {
    //   path: '/signup',
    //   name: 'Signup',
    //   component: () => import( '@/components/auth/Signup')
    // },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/choice',
      name: 'Choice',
      component: () => import( '@/views/Choice')
    },
  ],
  mode: 'history',
  // base: '/projects/tool/',
  router
})

router.beforeEach((to, from, next) => {
  // Check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // Check auth state of user
    let user = firebase.auth().currentUser
    if(user){
      // User signed in, proceed to route
      next()
    } else {
      // No user signed in, redirect to login
      next ({ name: 'Login' })
    }
  } else {
    next()
  }
})


export default router
