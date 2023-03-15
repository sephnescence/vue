// BTTODO - Auto complete keeps suggesting <class>Vue. Not sure if it's a convention I don't know about yet
import HomePageVue from './HomePage.vue'
import MarvelSnapCardListAppVue from '../MarvelSnap/MarvelSnapCardListApp.vue'
import MarvelSnapDeckListAppVue from '../MarvelSnap/MarvelSnapDeckListApp.vue'
import NotFoundVue from './NotFound.vue'

// BTTODO - Ben originally had done some example "routing" that was using component:is, but I dunno
//  what point that has vs using actual routing
export default [
    {
        path: '/',
        name: 'home',
        // BTTODO - Is this lazy loading? Copilot suggested it
        // component: () => import(/* webpackChunkName: "home" */ './Home.vue')
        component: HomePageVue,
    },
    {
        path: '/decks',
        name: 'decks',
        // middleware: 'auth', BTTODO - Look up how to define middleware. I'm just guessing how to define it in this comment
        component: MarvelSnapDeckListAppVue
      },
      {
          path: '/cards',
          name: 'cards',
          component: MarvelSnapCardListAppVue
        },
      {
        path: '/:pathMatch(.*)*',
        name: 'bad-not-found',
        component: NotFoundVue
      }
]