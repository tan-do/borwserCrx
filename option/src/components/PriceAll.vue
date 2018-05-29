<template>
    <div class="PriceLine">
        <img src="../assets/img/price-all.gif" alt="">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "Welcome to Your Vue.js App"
            };
        },
        props: ["propOptions"], //父组件传递的配置数据

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .PriceLine {
        position: relative;

    }
</style>
