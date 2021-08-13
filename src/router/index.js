// import Vue from 'vue'
// import VueRouter from 'vue-router'
// // import Layout from '@/layout'
// import i18n from '@/lang'
// import Store from '@/store'

// const { gameID, language } = Store.getters

// Vue.use(VueRouter);

// const setMessage = async ()=>{
//   let messages = {}
//   const allPromise = ['common', gameID].map(name =>{
//     return new Promise(res => {
//       const data = require(`@/lang/${language}/${name}.json`)
//       Object.assign(messages, data)
//       res()
//     })
//   })
//   await Promise.all(allPromise)
//   i18n.setLocaleMessage(language, messages) // 設定 i18n message
// }

// const router = new VueRouter({
//   mode: 'history',
//   base: __dirname,
//   // routes: [
//   //   { 
//   //     path: '/BN10', 
//   //     name: 'BN10',
//   //   },
//   //   { path: "*", component: Layout }
//   // ]
// });

// router.beforeEach((to, from, next) => {
//   setMessage().then(()=>{
//     next()
//   });
// });
  
// export default router;