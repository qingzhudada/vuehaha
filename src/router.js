//导入路由
import VueRouter from "vue-router"

// 导入路由组件
import homepageRedirect from "./components/tabbar/homepage_redirect.vue"
import searchPage from "./components/tabbar/search_page.vue"
import Shopping from "./components/tabbar/Shopping.vue"
import tableofcontents from "./components/tabbar/tableofcontents.vue"
// 导入新闻列表路由组件
import newsList from "./components/news/news_list.vue"
//导入新闻详情页路由组件
import newsInfo from "./components/news/news_info.vue"
// 导入图片列表路由组件
import photos from "./components/photos/Photolist.vue"
// 导入图片的详情页面路由组价
import photoInfos from "./components/photos/PhotoInfo.vue"
// 导入商品购物列表路由组件
import goods from "./components/goots/goodlist.vue"
// 导入商品购物列表路由组件
import goodinfos from "./components/goots/goodinfo.vue"
// 导入商品购物列表中的图文详情路由组件
import gooddescs from "./components/goots/gooddesc.vue"
// 导入商品购物列表中的评论路由组件
import goodcomments from "./components/goots/goodcomment.vue"

// 创建路由对象 跳转到相对应的路由组件
var router = new VueRouter({
    routes: [{
            // 初始默认得页面
            path: "/",
            redirect: "/home",
            // children:[]
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
        },
        {
            path: "/news",
            component: newsList
        },
        {
            path: "/home/newsInfo/:id",
            component: newsInfo
        },
        {
            path: "/photo",
            component: photos
        },
        {
            path: "/photoinfo/:id",
            component: photoInfos
        },
        {
            path: "/good",
            component: goods
        },
        {
            path: "/goodinfo/:id",
            component: goodinfos,
            name:"goodinfos"
        },
        {
            path: "/getdesc/:id",
            component: gooddescs,
            name:"gooddescs"
        },
        {
            path: "/goodcomment/:id",
            component: goodcomments,
            name:"goodcomments"
        }
    ],
    linkActiveClass: "mui-active" //覆盖默认路由高亮的类,默认为router-link-active
})

// 对外暴露路由
export default router