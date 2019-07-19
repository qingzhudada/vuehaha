//导入路由
import VueRouter from "vue-router"

// 导入路由组件
import homepageRedirect from "./components/tabbar/homepage_redirect.vue"
import searchPage from "./components/tabbar/search_page.vue"
import Shopping from "./components/tabbar/Shopping.vue"
import tableofcontents from "./components/tabbar/tableofcontents.vue"

// 创建路由对象 跳转到相对应的路由组件
var router = new VueRouter({
    routes: [{
            // 初始默认得页面
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: homepageRedirect
        },
        {
            path: "/member",
            component: tableofcontents
        },
        {
            path: "/shopcar",
            component: Shopping
        },
        {
            path: "/search",
            component: searchPage
        }
    ],
    linkActiveClass: "mui-active" //覆盖默认路由高亮的类,默认为router-link-active
})

// 对外暴露路由
export default router