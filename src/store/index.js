import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import user from './modules/user';
// import list from './modules/list';
// 三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters
})
