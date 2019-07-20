<template>
   <div>
      <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to=" '/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h2>{{item.title}}</h2>
							<span>
                        <p class="mui-ellipsis">发表时间:{{item.add_time | dateFormat}}</p>
                        <p class="mui-ellipsis">点击:{{item.click}}次</p>
                     </span>
						</div>
					</router-link>
			</li>
		</ul>
   </div>
</template>


<style lang="less" scoped>
.mui-media-body {
   h2{
      font-size: 18px;
      font-weight: 700;
      color: pink
      }
   span{
      display: flex;
      justify-content: space-between;
         p{
            color: blue!important;
            font-size: 12px;
         }
      }
}

</style>



<script>
import { Toast } from "mint-ui";
export default {
    data(){
       return{
            newslist: [] // 新闻列表
       }
    },
    created(){
       this.News()
    },
    methods:{
       News(){
          this.$http.get("api/getnewslist").then(res=>{
            console.log(res);
            if(res.body.status === 0){
               this.newslist= res.body.message;
            }else{
               Toast("获取新闻列表失败！");
            }
          })
       }
    }
}
</script>
