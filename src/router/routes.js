import useAuthUser from 'src/composables/UseAuthUser'

const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: '/', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') },
    ],
    beforeEnter: (to, from) => {
      const { isLoggedIn } = useAuthUser()
      if (isLoggedIn()) {
        return { name: 'me' }
      }
    }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/Me.vue') },
      { path: 'category', name: 'category', component: () => import('pages/category/List.vue') },
      { path: 'form-category/:id?', name: 'form-category', component: () => import('pages/category/Form.vue') }, // ? significa que pode ser opcional
      { path: 'product', name: 'product', component: () => import('pages/product/List.vue') },
      { path: 'form-product/:id?', name: 'form-product', component: () => import('pages/product/Form.vue') }, // ? significa que pode ser opcional
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
