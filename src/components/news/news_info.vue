<template>
    <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>

    <!-- 评论区域 -->
    <comment-box :id="this.id"></comment-box>

    </div>

</template>

<script>
// 导入评论子组件
import comment from "../Application/comment.vue"

import { Toast } from "mint-ui";
export default {
    data(){
        return{
            id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
            newsInfo:[]
        }
    },
    created(){
        this.newsINfoshuju()
    },
    methods:{
        newsINfoshuju(){
            this.$http.get("api/getnew/" + this.id).then(res=>{
                console.log(res);
                if(res.body.status === 0){
                    this.newsInfo=res.body.message[0]
                }else{
                    Toast("获取新闻失败！");
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


<style lang="less" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>


