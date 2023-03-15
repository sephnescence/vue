import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './components/App/App.vue'
import routes from './components/App/routes'

const router = createRouter({
  // BTTODO - Copilot suggested createWebHistory, but Ben said we won't have time to cover the "HTML5 Mode"
  //  (The workshops are hard limited to two or three days from memory, so the limitation is
  //    literally because it's truly presented)
  history: createWebHashHistory(),
  routes
})
createApp(App).use(router).mount('#app')
