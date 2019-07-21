<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <!-- 默认显示全部 -->
          <span :class='["mui-control-item", item.id==0? "mui-active":""]'  
          data-wid="tab-top-subpage-1.html" 
          v-for="item in dingbu" :key="item.id"
          @tap="tupianquyu(item.id)">{{ item.title }}</span>
        </div> 

      </div>
    </div>
    <ul class="photo-list">
      <router-link :to='"photoinfo/"+item.id' v-for="item in list" :key="item.id" tag="li">
        <img v-lazy="item.img_url" >
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>

// 1. 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
    data(){
        return{
            dingbu:[],
            list:[]
        }
    },
    created(){
      this.dinngbushuju();
      this.tupianquyu(0)
    }
    ,
    methods:{
      // 顶部滑动条区域
        dinngbushuju(){
            this.$http.get("api/getimgcategory" ).then(res=>{
                console.log(res);
                if(res.body.status===0){
                  res.body.message.unshift({ title:"全部", id:0 });
                  this.dingbu=res.body.message
                }
            })
        },
        // 图片区域
        tupianquyu(id){
            this.$http.get("api/getimages/" + id).then(res=>{
                console.log(res);
                if(res.body.status===0){
                  this.list = res.body.message
                }
            })
        }
    }
}
</script>




<style lang="less" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
    .info-title {
        font-size: 12px;
      }
      .info-body {
        font-size: 12px;
      }
    }
  }
}
</style>
