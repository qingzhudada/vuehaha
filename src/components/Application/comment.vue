<template>
      <div class="cmt-container">
            <h3>发表评论</h3>
            <textarea placeholder="请输入要吐槽的内容(最多不超过十个字)" maxlength="10" v-model="msg"></textarea>
            <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
            <div class="cmt-list">
                <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                    <div class="cmt-title">
                        第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                    </div>
                    <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                    </div>
                </div>
            </div>
            <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
      </div>
</template>



<script>
import { Toast } from "mint-ui";
import { log } from 'util';

export default {
    data(){
        return{
            pageIndex: 1, // 默认展示第一页数据
            comments: [], // 所有的评论数据
            msg:"" //评论一开始为空
        }
    },
    created(){
        this.tucao()
        console.log(this.$route)
    },
    methods:{
        tucao(){
            this.$http.get("api/getcomments/" + this.$route.params.id + "?pageindex=" + this.pageIndex).then(res=>{
                console.log(res);
                if(res.body.status===0){
                    // this.comments=res.body.message
                    // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
                    this.comments = this.comments.concat(res.body.message);
                }else{
                    Toast("获取评论失败")
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.tucao()
        },
        postComment(){
            // 检验评论是否为空
            if(this.msg.length === 0){
                Toast("请输入吐槽")
            }

            this.$http.post("api/postcomment/" + this.$route.params.id,{content: this.msg.trim()})
            .then(function(res) {
                if (res.body.status === 0) {
                    // 1. 拼接出一个评论对象
                    var cmt = {
                      user_name: "匿名用户",
                      add_time: Date.now(),
                      content: this.msg.trim()
                    };
                this.comments.unshift(cmt);
                this.msg = "";
          }
        });

        }
    }
}
</script>



<style lang="less" scoped>
.cmt-container {
    padding-bottom: 40px;
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
