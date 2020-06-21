(function ($) {
    Slider.prototype = {
        renderDom() {
            if (this.itemImg.length > 0) {

            } else {
                for (let item of this.itemDom) {
                    item.addClass("myItem").css({
                        width: "600px",
                        height: "400px"
                    }).appendTo(this.wipper)
                    console.log(item)
                }
            }
        },




    }

    // 创建轮播图对象
    function Slider(option, dom) {
        // 容器内的dom列表 或者容器内的Img路径列表。
        this.itemDom = option.itemDom || [];
        this.itemImg = option.itemImg || [];
        this.changeType = option.changeType || "fade";
        this.autoPlay = option.autoPlay || false;
        this.discBar = option.discBar || false;
        this.sidebutton = option.sidebutton || false;
        this.changeTend = option.changeTend || "horizontal";
        this.wipper = dom;
        this.renderDom()
    }



    $.fn.swiper = function (option) {
        // this 是轮播图控制区域位置
        // changeType 轮播图切换类型 fade淡入淡出 animate 动画切换
        // itemDom 传入轮播图的内容元素节点的列表，格式必须为数组或类数组
        // itemImg 传入轮播图图片地址,两者均传递以Img优先
        // autoPlay 是否自动播放 boolean
        // discBar 是否使用小圆点 boolean
        // sidebutton 是否有切换按钮 boolean
        // changeTend 切换方向上下还是左右 horizontal水平的，垂直的 Vertical
        //如果不传递参数默认设置一个对象
        if (option) {
            var obj = new Slider(option, this)
        } else {
            console.log(this, "meiyou")
            var obj = new Slider({
                itemDom: [$('<img src="img/test.jpeg">')],
            }, this)
        }
        return this
    }
}(jQuery))

option = {
    changeType: 'fadeD',
    autoPlay: false,
    discBar: false,
    sidebutton:false,
    changeTend:horizontal,
    
}

$("#app").swiper(option)