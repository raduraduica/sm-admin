// import { createApp } from 'vue'
// import App from './App.vue'
// // import Vuetify from 'vuetify'
//
//
// const app = createApp(App);
// // app.use(Vuetify);
// app.mount('#app');
// // createApp(App).mount('#app')

import Vue from 'vue'
import App from './App.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Articles from './views/Articles.vue'
import Vuetify from 'vuetify'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
    vuetify:    new Vuetify(),
    router:     router,
    components: {
        App,
        Home,
        About,
        Articles
    },
    render:     h => h(App),
}).$mount('#app')