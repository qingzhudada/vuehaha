<template>
     <div>
         <pinlun :id="this.$route.params.id" />
     </div>
</template>

<script>
import pinlun from "../Application/comment.vue"
export default {
    components:{
        pinlun
    }
}
</script>

<style>

</style>