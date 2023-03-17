import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './components/App/App.vue'
import routes from './components/App/routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
createApp(App).use(router).mount('#app')
