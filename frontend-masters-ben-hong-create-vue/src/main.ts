import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './components/App/App.vue'
import routes from './components/App/routes'

const router = createRouter({
  // BTTODO - Copilot suggested createWebHistory, but Ben said we won't have time to cover the "HTML5 Mode"
  //  So apparently, you can run `npm create vue@3` again and there's a prompt to use vue router, which will have createWebHistory set up for you
  //  (The workshops are hard limited to two or three days from memory, so the limitation is
  //    literally because it's truly presented)
  history: createWebHashHistory(),
  routes
})
createApp(App).use(router).mount('#app')
