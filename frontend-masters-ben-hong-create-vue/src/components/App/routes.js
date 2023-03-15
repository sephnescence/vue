// BTTODO - Auto complete keeps suggesting <class>Vue. Not sure if it's a convention I don't know about yet
import HomePageVue from './HomePage.vue'

// BTTODO - Ben originally had done some example "routing" that was using component:is, but I dunno
//  what point that has vs using actual routing
export default [
  {
    path: '/',
    name: 'home',
    // BTTODO - Is this lazy loading? Copilot suggested it
    //  short answer is yet, but the default landing page probably won't need to be done this way
    component: HomePageVue
  },
  {
    path: '/decks',
    name: 'decks',
    // middleware: 'auth', BTTODO - Look up how to define middleware. I'm just guessing how to define it in this comment
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
