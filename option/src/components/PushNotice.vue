<template>
    <div class="PushNotice">
        <img src="../assets/img/push-notice.png" alt="">
    </div>
</template>

<script>
    export default {

        props: ['propOptions'], //父组件传递的配置数据



    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .PushNotice{
        img{position: relative;left: 40px;}
    }
</style>
