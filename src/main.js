// 导入vue文件
import Vue from "vue"


// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)

// 导入路由
import VueRouter from "vue-router"
// 创建路由中间件
Vue.use(VueRouter)



//引入需要的css
import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"



// 导入mint-UI文件
import { Header, Button, Swipe, SwipeItem } from 'mint-ui';
// 注册轮播图
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 注册header
Vue.component(Header.name, Header);
// 注册Button
Vue.component(Button.name, Button);


//导入路由模块 
import router from "./router.js"

// 倒入app.vue组件
import app from "./App.vue"

// 创建实例
var vm = new Vue({
    el: "#app",
    data: {},
    methods: {},
    render: c => c(app),
    router
})