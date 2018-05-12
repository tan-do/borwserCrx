<template>
    <div class="HomePage">
        <ul class="home-list">
            <li v-for=" (item,index) in productList" :key="index">
                <a :href=" 'https:' +  item.url  " target="_blank" >

                <div class="list-content">
                    <div class="list-img">
                        <img :src="item.logo" alt="">
                    </div>
                    <div class="list-info">
                        <p class="list-title">{{ item.title }}</p>
                        <p class="list-price">
                            <span><b>{{ item.price }}</b> <i class="history-lowest" v-if="item.isHistoryLowest">历史最低</i> <i class="coupon">{{ item.coupon }}</i></span>
                        </p>
                        <p class="list-source">
                            <span class="list-source-name">{{ item.sourceName }} </span>

                            <span class="list-create-info">{{ item.fromNum }}个来源<b>.</b>{{ item.createAt}} </span>
                        </p>
                    </div>
                </div>

                </a>
            </li>

        </ul>
        <loading-component  v-show ="toBottom"></loading-component>
    </div>
</template>

<script>

    import { _util } from '../assets/js/_util';
    import LoadingComponent from '../components/LoadingComponent.vue';
    export default {
        data(){
            return {
                apiUrl: process.env.API_ROOT,
                productList:"",
                page:2,
                size:5,
                busy:false,
                toBottom:false
             }
        },

        components:{
            'LoadingComponent':  LoadingComponent
        },

        computed: {
            loadingState() {
                return this.$store.state.loadingState
            }
        },
        mounted(){

            this.getDataOfChina();
            //alert(_util.formatTime('1177887500046'))
            this.loadMore();
        },
        methods:{
            getDataOfChina(){

                    this.axios.get(this.apiUrl+'api/popupPage/getListOfOversea?page=1&size=5').then((res) => {
                        //this.getListOfChina = res.data;  //获取数据
                        //console.log(this.productList.createAt)

                        for(var i =0;i<res.data.data.productList.length;i++){
                            //console.log(this.productList[i].createAt)
                            res.data.data.productList[i].createAt=_util.formatTime(res.data.data.productList[i].createAt)
                        }

                        this.productList=res.data.data.productList;  //获取产品列表


                    })

            },

            loadMore() {
                var _this= this;

                    $('.HomePage').on('scroll',function() {
                        var wrapper=$(this).height();
                        var scrollTop=$(this).scrollTop();
                        var ulHeight=$('.home-list').height();
                        if(scrollTop + wrapper   >=  ulHeight -10 ){   //监控滚动条滚动到底部
                                 _this.toBottom = true;
                                if (!_this.busy) {
                                    _this.busy = true;

                                     setTimeout(function () {

                                            _this.axios.get(_this.apiUrl+'api/popupPage/getListOfChina?page='+ _this.page+ '&size='+_this.size).then((res) => {

                                                //更新数组列表
                                                for (let i = 0; i < res.data.data.productList.length; i++) {


                                                    //console.log(res.data.data.productList[i]);


                                                    res.data.data.productList[i].createAt =_util.formatTime(res.data.data.productList[i].createAt)

                                                    _this.productList.push(res.data.data.productList[i])
                                                }


                                            });

                                            _this.page++;
                                            _this.toBottom=false;

                                            console.log('到底了'+_this.page)
                                        _this.busy = false;
                                    }, 100)
                                }

                        }else{


                        }
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
    @liHeight: 120px;@createColor:#A3A3A3;
    div.HomePage{width: 100%;height: 480px;float: left;/* background: red; */;overflow-y: auto;position: relative;}
    ul.home-list{width: 100%;height: auto;background: #fff;margin: 0 auto;float: left;
      li{width: 100%;height:@liHeight;background: #fff;position: relative;cursor: default;float: left;display:block;
        .list-content{width: 420px;height: calc(@liHeight - 1px);margin: 0 auto;border-bottom:1px solid #e5e5e5;
            .list-img{width: 88px;height: 88px;border:1px solid #ddd;float: left;margin:16px;margin-left:0;background: #fff;display:block; box-sizing: border-box;
                img{width: 100%;}
            }

            .list-info{width: 316px;height: 88px;/* background: pink; */float: left;margin:16px 0px;}
            .list-title{width: 100%;height: 20px;/* background: #333; */text-overflow: ellipsis;white-space: nowrap;overflow: hidden;text-align: left;}
            .list-price{width: 100%;height:40px;
                span{width: 100%;height: auto;/* background: rosybrown; */display: block;line-height: 40px;text-align: left;}
                b{color: #FF5F5E;font-size: 20px;margin-right: 10px;position: relative;top:3px;/* background: red; */max-width:100px;width: auto;display: inline-block;font-weight: normal;
                    text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
                }
                i{padding: 3px 10px;background: linear-gradient(to right,#FF4443,#FF8747);border-radius: 4px;color: #fff;margin-right:10px;cursor: pointer;position: relative;top:-12px;font-style:normal;}
                i:hover{opacity: .9;}
            }
            .list-source{width: 100%;height: 20px;/* background: red; */position: relative;top:13px;}
            .list-source-name{width: 80px;height: auto;float: left;/* background: pink; */text-align:left;color:@createColor;}
            .list-create-info{width: 200px;height: auto;/* background: pink; */float: right;text-align: right;color:@createColor;
                b{padding: 0 10px;position: relative;top:-3px;}
            }

        }
      }
      li:hover{background: #e5e5e5;}
      li a:hover{color: #111;}

    }
</style>



