<template>
    <div id="app">
        <header>
            <div class="container">
                <div class="head-logo">
                    <span>
                        <p>品牌特价</p>
                        <p>qiang100.com</p>
                    </span>
                    <span>
                        <p>插件配置</p>
                        <p>当前版本:1.0.0</p>
                    </span>
                </div>
                <div class="head-link">
                    <a href="https://www.qiang100.com/zhi/" target="_blank">网站首页</a>
                    <a href="javascript:" class="active">功能设置</a>
                </div>
            </div>
        </header>

        <section class="option">
            <div class="container">
                <p v-if="0">{{options}}</p>
                <ul class="option-list">
                    <li @click="tabToggle('MyFocus')">
                        <input type="checkbox" name="" id="" checked disabled>
                        <p><span>关注设置</span></p>
                        <p>点击设置您所关注的内容</p>
                    </li>
                    <li @click="tabToggle('PriceLine')" v-if="false">
                        <input type="checkbox" v-model="options.priceLineForList" disabled :checked="options.priceLineForlist" @click="setStorage()">
                        <p><span>单品页历史价格曲线</span></p>
                        <p>展示历史价格趋势功能</p>
                    </li>
                    <li @click="tabToggle('PushNotice')">
                        <input type="checkbox" v-model="options.needPush" :checked="options.needPush" @click="setStorage()">
                        <p><span>推送设置</span> </p>
                        <p>桌面右下角折扣推送功能</p>
                    </li>
                    <li @click="tabToggle('PriceAll')" v-if="false">
                        <input type="checkbox" disabled v-model="options.priceLineForDetail" :checked="options.priceLineForDetail" @click="setStorage()">
                        <p><span>非单品页比价功能</span></p>
                        <p>非单品(详情列表页)迷你比价功能</p>
                    </li>
                </ul>
                <div class="option-content">
                    <keep-alive>
                        <component :is="currentTab" :propOptions="options" v-on:listenChild="updateFocus" v-on:listenTag="updateTag">
                            <!-- 组件在 vm.currentTab 变化时改变！ -->
                        </component>
                    </keep-alive>
                </div>
            </div>
        </section>
        <footer>
            <div class="container foot-line">
                <span>欢迎提出建议,您的支持是我们最大的动力</span>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentTab: 'MyFocus', //当前动态组件默认显示
                options: '', //接收下载选项配置数据
            }
        },

        mounted() {
            this.getStorage();
        },
        methods: {
            tabToggle(tab) {
                this.currentTab = tab;
            },
            updateFocus(data) { //监听子组件
                this.options.selectedCategories = data;
                this.setStorage()
            },
            updateTag(data) {
                this.options.selectedKeywords = data;
                this.setStorage()
            },
            getStorage() {
                var getOptions = JSON.parse(localStorage.getItem('setOptions'));
                this.options = getOptions;
            },
            setStorage() {
                this.$nextTick(() => {
                    var setOptions = JSON.stringify(this.options);
                    localStorage.setItem('setOptions', setOptions);
                    //最后修改时间戳
                    var lastDate = new Date();
                    localStorage.setItem('lastModified', lastDate);
                })
            },
        },
        components: {
            'MyFocus': () =>import ('./components/MyFocus.vue'),
            'PriceLine': () =>import ('./components/PriceLine.vue'),
            'PushNotice': () =>import ('./components/PushNotice.vue'),
            'PriceAll': () =>import ('./components/PriceAll.vue'),
        }
    }
</script>


<style lang="less">
    @import url('./assets/css/lib/public.less');
    @headHeight: 66px;
    .container {
        width: 1200px;
        height: auto;
        margin: 0 auto;
    }
    header {
        width: 100%;
        height: 66px;
        background: linear-gradient(45deg, #ff4443, #ff8747);
        background: -webkit-linear-gradient(45deg, #ff4443, #ff8747);
        float: left;
    }
    .head-logo {
        width: 400px;
        height: @headHeight;
        /* background: indigo; */
        float: left;
        line-height: @headHeight;
        cursor: default;
        position: relative;
        left: 20px;
        span {
            display: inline-block;
            width: 120px;
            height: calc(@headHeight - 28px);
            /* background:pink; */
            vertical-align: middle;
            border-right: 1px solid #fff;
            p {
                width: 100%;
                height: 24px;
                line-height: 24px;
                color: #fff;
                position: relative;
                top: -3px;
            }
            p:first-child {
                font-size: 20px;
                font-weight: 500;
                font-weight: 600;
            }
        }
        span:last-child {
            border-right: none;
            p {
                position: relative;
                left: 30px;
            }
            p:first-child {
                font-size: 16px;
                font-weight: normal
            }
        }
    }
    .head-link {
        width: 300px;
        height: @headHeight;
        float: right;
        line-height: @headHeight;
        a {
            font-size: 18px;
            color: #fff;
            margin-right: 30px;
            opacity: .5;
            /* border:2px solid #fff; */
            border-radius: 100px;
        }
        a.active,
        a:hover {
            opacity: 1;
        }
    }
    @optionHeight: 400px;
    .option {
        width: 100%;
        height: auto;
        float: left;
        margin-top: 60px;
    }
    ul.option-list {
        width: 360px;
        height: @optionHeight;
        float: left;
        cursor: default;
        margin-right: 50px;
        li {
            width: 100%;
            height: 60px;
            margin-bottom: 30px;
            position: relative;
            cursor: pointer;
            input[type="checkbox"] {
                width: 20px;
                height: 20px;
                margin: 20px;
                float: left;
                position: relative
            }
            p {
                color: #9A9A9A;
                width: 220px;
                float: right;
                position: relative;
                top: 15px;
                left: -80px;
            }
            p span {
                font-size: 18px;
                color: #333;
                position: relative;
                top: -5px;
            }
        }
        .li-disabled {
            p span {
                color: #9a9a9a
            }
        }
        li:hover {
            background: #e5e5e5;
        }
    }
    .option-content {
        width: 650px;
        height: auto;
        /* background: pink; */
        float: left;
    }
    footer {
        width: 100%;
        height: 50px;
        float: left;
        text-align: center;
        font-size: 16px;
        color: #666;
        margin-top: 50px;
        .foot-line {
            height: 1px;
            background: #ddd
        }
        span {
            width: 460px;
            background: #fff;
            padding: 10px 50px;
            position: relative;
            top: -10px;
        }
    }
</style>
