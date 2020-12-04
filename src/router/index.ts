import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { StateInterface } from '../store';
import routes from './routes';

import { getCookie } from '../utils/utils';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function ({ Vue, store }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach(async (to, from, next) => {
    if (!to.meta.requiresLogin) {
      next();
      return;
    }
    if (store.state.users.accessToken) {
      next();
      return;
    }
    
    const token = getStoredToken();
    if (token) {
      const response = await store.dispatch('users/getMe', token);
      if (response) {
        next();
        return;
      }
    } else {
      next({name: 'SignInPage'});
    }
    next({name: 'SignInPage'});
    
  })

  return Router;
})


const getStoredToken = function() {
  return getCookie('authToken');
};
