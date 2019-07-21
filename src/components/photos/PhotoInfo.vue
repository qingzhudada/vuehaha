<template scoped>
    <div  class="photoinfo-container">
        <!-- 标题区域 -->
        <h1>{{shuju.title}}</h1>
        <p class="subtitle">
            <span>发布时间:{{shuju.add_time | dateFormat}}</span>
            <span>点击{{shuju.click}}次</span>
        </p>

        <!-- 图片区域 -->
        <div class="thumbs">
             <vue-preview :slides="imgs"></vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="shuju.content"></div>
        <!-- 评论区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>

</template>


<script scoped> 
// 导入评论子组件
import comment from "../Application/comment.vue"
// 
import { Toast } from "mint-ui";
export default {
    data(){
        return{
            id:this.$route.params.id,
            shuju:{}, //文字图片详情
            imgs:[] //缩略图
        }
    },
    created(){
        this.xiangqin();
        this.suolue()
    },
    methods:{
        xiangqin(){
            this.$http.get("api/getimageInfo/"+this.id).then(res=>{
                // console.log(res);
                if(res.body.status===0){
                    this.shuju=res.body.message[0]
                }else{
                    Toast("获取失败！");
                }
            })
        },
        suolue(){
            this.$http.get("api/getthumimages/" + this.id).then(res=>{
                console.log(res);
                if(res.body.status===0){
                    this.imgs=res.body.message;
                    this.imgs.forEach(item=>{
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src
                    });
                }
            })
        }
    },
    components:{
        // 注册子组件的节点
        "comment-box" : comment
    }
}
</script>


<style lang="less">
.photoinfo-container {
  overflow: hidden;
  padding: 3px;
  h1 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }
    .thumbs{
        overflow: hidden;
    img{
      float: left;
      height: 80px;
      width: 70px;
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
  
}
</style>