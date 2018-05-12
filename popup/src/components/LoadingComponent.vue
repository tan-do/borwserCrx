<template>
    <div class="loading">
        <img src="../assets/img/loading.svg" alt="">
    </div>
</template>

<style lang="less">
    .loading{ position: fixed;width: 50px;height: 50px;/* background: #333; */z-index: 999;
      opacity: 1;bottom:10px;left: 50%;margin-left:-25px;text-align:center;line-height:50px;
      img{width: 40%; animation: tanClock 2s linear infinite}
    }
</style>

<script>
export default {

}
</script>
