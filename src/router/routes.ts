import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name:'SignInPage', path: '/signin', component: () => import('pages/SignInPage.vue') },
      { name:'Kampaigns', path: '/', component: () => import('pages/Index.vue'), meta: { requiresLogin: true } },
      { name:'Kampaign', path: '/kampaign/:id', component: () => import('pages/Kampaign.vue'), meta: { requiresLogin: true } },
      { name:'Sync', path: '/sync', component: () => import('pages/Sync.vue'), meta: { requiresLogin: true } },
      { name:'Zoho Sync', path: '/sync/zoho', component: () => import('pages/SyncZoho.vue'), meta: { requiresLogin: true } },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
