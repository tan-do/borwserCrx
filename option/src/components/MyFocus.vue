<template>
  <div class="MyFocus">
      <section class="tag-focus">
            <h2>分类关注 <button v-on:click="sendMsgToParent" v-if="false">按钮</button></h2>
            <p v-if="0">{{ formatOptions }}</p>
            <p v-if="0">{{ propOptions }}</p>


            <p>
              <span v-for="(value,key,index) in  formatOptions " :key="index" :class="{active : value}" @click="toggleFocus(key,value,index),sendMsgToParent()"> {{  key }} </span>
            </p>
      </section>
      <section class="tag-set">
          <h2>关键词定制</h2>
          <textarea cols="30" rows="10" placeholder='请输入关键词以"@"分割可创建多个(如:运动@食品)'  v-model.trim="tagSet" v-on:keyup="tagSet=tagSet.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@]/g,'')" v-on:input="listenTag()" maxlength="100"></textarea>
          <p v-if="0">{{ reversedTag }}  </p>
          <p class="tag-model"><span v-for ="(item,index) in reversedTag" :key="index" v-if="tagSet.length" @click="tagDelete(index)"> {{ item }}</span></p>
      </section>
  </div>
</template>

<script>
export default {
    name: 'MyFocus',
    data () {
        return {
            formatOptions:'',  //格式化父组件传递的配置数据
            tagSet:''          //关键词设置

        }
    },

    props: ['propOptions'],   //父组件传递的配置数据

    computed: {
        reversedTag: function () {
            var tagString = this.tagSet;
            var tagArr= tagString.split('@');

            for(var i = 0; i < tagArr.length; i++) {    //去除数组中的空元素
                if(tagArr[i] == "") {
                    tagArr.splice(i,1);
                    i = i - 1;
                }
            };


            return tagArr
        }
    },

    mounted(){

        this.selectedCategories();
        this.selectedKeywords();

    },
    methods:{

        toggleFocus(key,value,index){
            //alert(value);
            this.formatOptions[key] = !value;
        },

        sendMsgToParent(){             //点击按钮向父组件发送事件
            var seletedArr= [];
            for(var i in this.formatOptions){
                if(this.formatOptions[i]){
                    seletedArr.push(i);
                }
            }

            //alert(seletedArr);
            this.$emit('listenChild',seletedArr)
        },




        selectedCategories(){
            var categorieMap= {};
            var categories = this.propOptions.categories;  //获取全部分类列表
            var selectedCategories =this.propOptions.selectedCategories; //获取选中列表
            for(var i=0; i<categories.length;i++){
                let category = categories [i];
                categorieMap[category] = false
            }

            for(var i =0;i<selectedCategories.length;i++){
                let selected = selectedCategories[i];
                categorieMap[selected] =true
            }

            this.formatOptions= categorieMap;

        },

        selectedKeywords(){
            let keyWordsStr='';
            let keyWordsArr=this.propOptions.selectedKeywords;  //获取关键词数组
            keyWordsStr=keyWordsArr.join('@');
            this.tagSet=keyWordsStr
        },

        tagDelete(index){
            const delCurrent= this.reversedTag[index];
            if(index){   //当点击的不是第一个标签
              this.tagSet=this.tagSet.replace('@' + delCurrent,"")
            }else{         //当点击第一个标签

                if(this.reversedTag.length == 1){
                    this.tagSet= ''
                }else{
                    this.tagSet=this.tagSet.replace( delCurrent + '@' ,"")
                }
            };

            //向父组件发射事件
            this.$emit('listenTag', this.reversedTag)


        },

        listenTag(){
            this.$nextTick(()=>{
                this.$emit('listenTag', this.reversedTag)
            })
        }

    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .tag-focus{width: 100%;min-height: 120px;padding-bottom:50px;

        p{margin-top:20px;
            span{display: inline-block;width: 88px;height: 40px;border:1px solid #dbdbdb;text-align: center;line-height: 40px;margin-right: 16px;color: #666;cursor: pointer;
                border-radius: 4px;box-sizing: border-box;margin-top:20px;position: relative;
                i{width: 20px;height: 20px;background: red;display: block;position: absolute;right: 0;top:0}
            }
            span:hover{border:1px solid #ff4443; color: #ff4443}
            span.active{ background: linear-gradient(45deg, #ff4443, #ff8747);background: -webkit-linear-gradient(45deg, #ff4443, #ff8747);color:#fff;}
            span.active:hover:before{
                content:"+";
                width:30px;
                height: 30px;
                position: absolute;
                right: -10px;
                top:-10px;
                font-size: 20px;
                transform: rotate(45deg)
            }
        }
    }
    .tag-set{width: 100%;height: 200px;;

        textarea{width: 100%;height: 100px;margin-top:30px;resize: none;border:1px solid #ddd;padding: 10px;box-sizing: border-box;line-height: 26px;}
        textarea:focus{border:1px solid #ff4443 ;outline: none;}

        textarea::-webkit-input-placeholder{color:#666;}
        .tag-model{width: 100%;height: 50px;}
        span{display:block;width:88px;height:40px;background:#F5F5F5;border:1px solid #ddd;cursor: pointer;margin-right:16px;margin-top:10px;border-radius: 5px;float: left;text-align: center;line-height: 40px;position: relative;color:#666;box-sizing: border-box;    text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;padding: 0 10px;}
        span:hover{border:1px solid #f74645;background: #fff;color: #f74645}
        span:hover:before{
                content:"+";
                width:30px;
                height: 30px;
                position: absolute;
                right: -10px;
                top:-10px;
                font-size: 20px;
                transform: rotate(45deg);
                color: #f74645
        }
    }
</style>
