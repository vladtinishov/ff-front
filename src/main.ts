import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab)
library.add(fas)
library.add(far)

import './assets/main.css'
import { i18n } from './shared/i18n'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(naive)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
