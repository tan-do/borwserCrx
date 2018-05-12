<template>
    <div class="PushNotice">

        <img src="../assets/bg.png" alt="">
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        props: ['propOptions'], //父组件传递的配置数据


        mounted(){
            //this.toastMsg()
        },

        methods:{
            toastMsg(){
                this.$nextTick(()=>{
                    if(this.propOptions.needPush){
                         this.$toasted.show('已开启')
                    }else{
                         this.$toasted.show('已关闭')
                    }
                })

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
