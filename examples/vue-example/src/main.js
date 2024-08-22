import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { HeadSpacePlugin } from './plugins/HeadSpacePlugin'

createApp(App)
  .use(router)
  .use(HeadSpacePlugin)
  .mount('#app')
