export const _util={

    getServerDate(){

    },

    formatTime(timestamp){
        var timeDiff = (new Date().getTime() - timestamp) / 1000;
        if (timeDiff >= 86400) {
            return parseInt(timeDiff / 86400) + '天前';
        }
        if (timeDiff >= 3600) {
            return parseInt(timeDiff / 3600) + '小时前';
        }
        if (timeDiff >= 60) {
            return parseInt(timeDiff / 60) + '分钟前';
        }
        if (timeDiff > 0) {
            return parseInt(timeDiff) + '秒前';
        }
        return "刚刚";
    }

}

