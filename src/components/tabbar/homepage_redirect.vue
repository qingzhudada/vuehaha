<template>
        <div>
                <mt-swipe :auto="4000" id="lunbotu">
                <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                        <img :src="item.img" alt="">
                </mt-swipe-item>
        </mt-swipe>


         <!-- 九宫格 到 6宫格 的改造工程 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
  </ul>
        </div>
       
</template>

<style lang="less" scoped>
// 轮播图
.mint-swipe {
  height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }

// 九宫格
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body{
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>


<script>
// 引用弹出框插件
import { Toast } from "mint-ui";

export default {
    
        //数据
        data() {
           return{
                   //    保存轮播图的数组
                lunbotuList:[]
                }    
        },
        created(){
           this.lunbotu()
        },
        methods: {
           lunbotu(){
                //    获取数据
                this.$http.get("http://www.liulongbin.top:3005/api/getlunbo" ).then(res=>{
                     console.log(res.body);
                     if(res.body.status===0){
                          this.lunbotuList = res.body.message;
                     }else{
                          Toast("加载轮播图失败。。。");
                     }
                })
           }
        } 

}
</script>
