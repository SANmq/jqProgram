(function ($) {

    function slide(option, dom) {
        this.setting = option
        this.dom = dom
        this.init()
    }

    slide.prototype = {

        init() {
            this.initData()
            this.render()
        },
        initData() {
            this.setting.l = this.setting.item.length
            this.itemDom = []
        },
        render() {
            this.mainRender()
            this.sideRender()
        },

        mainRender() {
            let app = this.setting
            this.dom.css({
                overflow: "hidden",
                width: app.width + "px",
                height: app.height + "px",
                position: "relative",
            }).addClass("smq-swiper")

            let ul = $('<ul></ul>').css({
                width: (app.l + 2) * app.width + 'px',
                height: "100%",
                'list-style-type': 'none',
            })

            this.dom.css({ width: this.width + 'px', height: this.height + 'px' }).append(ul)

            for (let item of app.item) {
                let li = $(`<li></li>`).css(
                    {
                        width: app.width + 'px',
                        height: app.height + 'px',
                        float: "left"
                    }
                )

                if (typeof item === "string") {
                    $('<img>').attr("src", item).css(
                        {
                            width: "100%",
                            height: "100%",
                        }
                    ).appendTo(li)
                } else {
                    $('<li></li>').append($(item)).appendTo(ul)
                }
                this.itemDom.push(li)
                ul.append(li)
            }
            ul.prepend(this.itemDom[app.l - 1].clone())
            ul.append(this.itemDom[0].clone())
        },

        // 切换按钮渲染
        sideRender() {
            $('<a>&lt</a>').addClass("smq-side left").appendTo(this.dom)
            $('<a>&gt</a>').addClass("smq-side right").appendTo(this.dom)
        },

        // 切换原点栏渲染
        discBarRender() {

        }







    }


    $.fn.swiper = function (option) {
        /*
        @width number 展布的宽
        @height number 展布的高
        @item array 轮播的内容
        */
        option = option || {}
        // 默认设置
        let setting = {
            width: 600,
            height: 400,
            // 如果是图片地址就是str类型的数组，也可以是dom节点类型的数组,也可以是交叉的内容
            item: ['img/test.jpeg', 'img/gun.jpg', 'img/teacher.png'],
        }

        // 更新默认设置
        for (let key in option) {
            // 当类型相等才能设置成功
            if (typeof setting[key] === typeof option[key]) {
                setting[key] = option[key]
            }
        }
        console.log(setting)

        let obj = new slide(setting, this)


        return this
    }


}(jQuery))

$("#app").swiper({
    width: 800,
    height: 400,
})
