import HomePageVue from './HomePage.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomePageVue
  },
  {
    path: '/decks',
    name: 'decks',
    component: () => import('../MarvelSnap/MarvelSnapDeckListApp.vue')
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('../MarvelSnap/MarvelSnapCardListApp.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'bad-not-found',
    component: () => import('./NotFound.vue')
  }
]
