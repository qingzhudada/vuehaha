<template>
  <div>
    
    <div class="mui-content">
        <!-- 加入购物车动画 -->
        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="dong" ref="dong" v-show="flag"></div>
        </transition>
        <!-- 轮播图 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <swiper :lunbotuList="lunbotu"></swiper>
          </div>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="mui-card">
        <div class="mui-card-header">{{goodsinfo.title}}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p class="price">
              市场价：
              <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
              <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
            </p>
            <P>
               购买数量：<numbox />
            </P>
            <P>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small"  @click="addToShopCar">加入购物车</mt-button>
            </P>
          </div>
        </div>
      </div>
      <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="getdesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="getcomment(id)">商品评论</mt-button>
      </div>
    </div>
    </div>
  </div>
</template>



<script>
import mui from "../../lib/mui/dist/js/mui.js"
// 导入轮播图组件
import swiper from "../Application/swiper.vue";
// 导入商品加减按钮
import numbox from "../Application/comments.vue"
export default {
  data() {
    return {
      id: this.$route.params.id,
      // 轮播图数据
      lunbotu: [],
      //   商品数据
      goodsinfo: {},
      // 控制小球的显示与隐藏
      flag:false,
      selectedCount: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
    };
  },
  created() {
    this.getlunbotu();
    this.getgoodinfo();
  },
  methods: {
    getlunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        console.log(res.data);
        if (res.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = res.body.message;
        }
      });
    },
    getgoodinfo() {
         // 获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        console.log(res);
        if(res.data.status==0){
            this.goodsinfo = res.data.message[0]
        }
      });
    },
    getdesc(id){
        console.log(id);
        
        this.$router.push({name:"gooddescs",params:{id}})
    },
    getcomment(id){
        this.$router.push({name:"goodcomments",params:{id}})
    },
    addToShopCar(){
      // 添加到购物车
       this.flag=!this.flag
    },
    beforeEnter(el){
      el.style.transform="translate(0,0)"
    },
    enter(el,done){
      el.offsetWidth;
      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.dong.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done()
    },
    afterEnter(el){
      this.flag=!this.flag
    },
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = count;
      console.log("父组件拿到的数量值为： " + this.selectedCount);
    }
  },
  components: {
    // 注册轮播图组件
    swiper,
    // 注册商品加减按钮组件
    numbox
  }
};
</script>



<style>
.dong{
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 310px;
    left: 148px;
}
.now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    
  }
</style>