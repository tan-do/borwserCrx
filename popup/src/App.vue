<template>
    <div id="app">
        <header>
            <div class="head-logo">
                <a href="https://www.qiang100.com/zhi/" target="_blank">
                    <img src="./assets/img/logo.png" alt="">
                </a>
            </div>
            <form action="https://www.qiang100.com/zhi/search" class="head-search" target="_blank">
                <label for=""></label><input type="text" placeholder="搜索相关产品" name="name">
            </form>
            <div class="head-user">
                <a href="https://www.qiang100.com/user/login" target="_blank"> {{userName}} </a>
            </div>
            <a href="option.html" class="head-option" target="_blank">
                <img src="./assets/img/set.png" alt="">
            </a>
        </header>
        <section class="router">
            <ul class="link">
                <router-link to="/" tag="li" exact>国内特价</router-link>
                <router-link to="/oversea" tag="li">海淘特价</router-link>
                <router-link to="/lowest" tag="li">历史最低</router-link>
                <router-link to="/myfocus" tag="li">我关注的</router-link>
                <li><a href="https://www.qiang100.com/guanzhu.html" target="_blank">下载APP</a></li>
            </ul>
        </section>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                apiUrl: process.env.API_ROOT, //从node环境中读取生产和测试环境接口地址
                siteUrl: process.env.SITE_ROOT,
                userName: "登录",
            }
        },
        mounted() {

            this.showUser()
        },
        methods: {
            //显示用户名
            showUser() {
                let _this = this;
                setInterval(function() {
                    var getUser = JSON.parse(localStorage.getItem('user'));
                    console.log(getUser.nickname);
                    _this.userName = getUser.nickname
                }, 2000);
            },

        }
    }
</script>

<style lang="less">
    @import url('./assets/less/public.less');
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0 auto;
        width: 460px;
        height: 600px;
        background: #fff;
        background-image: url('./assets/img/nodata.png');
        background-repeat: no-repeat;
        background-position: center;
        header {
            width: 100%;
            height: 50px;
            background: #FFF;
            line-height: 50px;
            .head-logo a{
                width: 120px;
                height: 50px;
                font-size: 24px;
                color: orangered;
                line-height: 50px !important;
                float: left
            }
            form.head-search {
                width: 200px;
                height: 50px;
                float: left;
                position: relative;
                left: 20px;
                label {
                    width: 20px;
                    height: 20px;
                    background: url('./assets/img/search.png') center 2px no-repeat;
                    position: absolute;
                    top: 16px;
                    left: 10px;
                }
                input {
                    height: 26px;
                    border-radius: 50px;
                    border: 1px solid #e5e5e5;
                    width: 200px;
                    color: #757575;
                    text-indent: 30px;
                }
            }
            .head-user {
                width: 80px;
                height: 50px;
                float: left;
                a {
                    color: #757575;
                    position: relative;
                    left: 30px;
                }
            }
            .head-option {
                display: block;
                float: right;
                line-height: 50px;
                margin-right: 14px;
            }
        }
        .router {
            width: 100%;
            height: 50px;
            background: linear-gradient(45deg, #FF4443, #FF8747);
            background: -webkit-linear-gradient(45deg, #FF4443, #FF8747);
            ul.link {
                display: flex;
                justify-content: center;
                width: 420px;
                height: 50px;
                margin: 0 auto;
                align-content: center;
                li,
                li a {
                    flex: 1;
                    color: #fff;
                    font-size: 16px;
                    line-height: 50px;
                    cursor: pointer;
                }
                li.active,
                li.active a,
                li a.active,
                .router-link-active {
                    background: #FFFFFF;
                    color: #FF6766;
                    border-top: 2px solid #FF4443;
                }
            }
        }
    }
</style>
