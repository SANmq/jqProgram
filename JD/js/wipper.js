(function ($) {
    // 不支持二次调用修改初始属性
    Slide.prototype = {
        init(options) {
            this.updataSetting(options)
            this.initData()
            this.initDom()
            this.initCss()
            this.event()
            this.autoPlay()
        },
        // 初始化数据
        initData() {
            this.lock = false
            this.itemIndex = 0
        },
        // 初始化dom结构
        initDom() {
            if ($('.smq-itemview', this.wrap).length === 0) {
                $('<div class=smq-itemview>').appendTo(this.wrap)
            }
            if ($('.smq-itemlist', this.wrap).length === 0) {
                $('<ul class=smq-itemlist>').appendTo($('.smq-itemview', this.wrap))
            }
            if ($('.smq-sidebtn.left', this.wrap).length === 0) {
                $('<span class="smq-sidebtn left">&lt;</span>').appendTo($('.smq-itemview', this.wrap))
            }
            if ($('.smq-sidebtn.right', this.wrap).length === 0) {
                $('<span class="smq-sidebtn right">&gt;</span>').appendTo($('.smq-itemview', this.wrap))
            }
            if ($('.smq-navbar', this.wrap).length === 0) {
                $('<div class=smq-navbar>').appendTo($('.smq-itemview', this.wrap))
            }
            if ($('.smq-item', this.wrap).length === 0) {
                for (let item of this.settings.item) {
                    if (typeof item === "string") {
                        $(`<li class=smq-item><img src=${item}></li>`).appendTo($('.smq-itemlist', this.wrap))
                    } else if (typeof item === "object") {
                        $(item).appendTo($('.smq-itemlist', this.wrap))
                    }
                    $('<span class=smq-navdisc>').appendTo($('.smq-navbar'), this.wrap)
                }
                if (this.settings.animateType === "animation") {
                    $('.smq-item', this.wrap).eq(0).clone().appendTo($('.smq-itemlist', this.wrap))
                }
            }
        },
        // 初始化css样式
        initCss() {
            let configs = this.settings,
                width = configs.width,
                height = configs.height,
                animateType = configs.animateType,
                itemlen = configs.itemlen,
                sideBtn = configs.sideBtn;
            this.wrap.width(width).height(height).css({
                textAlign: "center"
            }).find('.smq-itemview').width(width).height(height).css({
                position: "relative",
                overflow: "hidden"
            })
            this.wrap.find('.smq-sidebtn').css({
                width: parseInt(0.05 * width),
                height: parseInt(0.05 * width),
                position: "absolute",
                margin: "auto",
                bottom: 0,
                top: 0,
                userSelect: "none",
                cursor: "pointer",
                backgroundColor: "rgba(204, 204, 204, 0.5)"
            }).eq(0).css({
                left: 0,
            }).siblings('.right').css({
                right: 0
            })
            if (sideBtn !== "always") {
                $('.smq-sidebtn', this.wrap).hide()
            }
            $('.smq-navbar', this.wrap).css({
                height: 20,
                position: "absolute",
                bottom: 0,
                margin: "auto",
                left: 0,
                right: 0,
                border: "1px solid black",
                "box-sizing": "border-box",
                "border-radius": 10,
                padding: "0 20px"
            }).children().css({
                width: 16,
                height: 16,
                border: "1px solid black",
                "border-radius": "50%",
                display: "inline-block",
                margin: "0 10px",
                "box-sizing": "border-box",
                cursor: "pointer"
            }).eq(this.itemIndex).css({
                backgroundColor: "yellow"
            })
            // 淡入淡出
            if (animateType === "fade") {
                $('.smq-itemlist').width(width).height(height).find('.smq-item').hide().eq(this.itemIndex).show()
                $('.smq-item', this.wrap).width(width).height(height).css({
                    position: "absolute"
                }).children().width(width).height(height)
            }
            // 无缝切换效果
            else if (animateType === "animation") {
                $('.smq-itemlist').width(width * (itemlen + 1)).height(height).css({
                    position: "absolute",
                }).find('.smq-item').css({
                    display: "inline-block"
                })
                $('.smq-item', this.wrap).width(width).height(height).children().width(width).height(height)
            }
        },
        event() {
            let configs = this.settings,
                width = configs.width,
                height = configs.height,
                animateType = configs.animateType,
                itemlen = configs.itemlen,
                sideBtn = configs.sideBtn;
            this.wrap.find('.smq-itemview').hover(e => {
                if (sideBtn === "hover") {
                    $('.smq-sidebtn').show()
                }
                clearInterval(this.timer)
            }, e => {
                this.autoPlay()
                if (sideBtn === "hover") {
                    $('.smq-sidebtn').hide()
                }
            })
            $('.smq-sidebtn', this.wrap).click(e => {
                if (this.lock) {
                    return false
                }
                this.lock = true
                $('.smq-navdisc', this.wrap).eq(this.itemIndex).css({
                    backgroundColor: "transparent"
                })
                if ($(e.target).hasClass('left')) {
                    // 按下左键
                    this.itemIndex -= 1
                    if (this.itemIndex === -1) {
                        this.itemIndex = itemlen - 1
                        $('.smq-itemlist').css({
                            left: -width * itemlen
                        })
                    }
                    this.change()
                } else {
                    // 按下右键
                    this.itemIndex += 1
                    if (this.itemIndex === itemlen) {
                        if (animateType === "animation") {
                            this.change()
                        }
                        this.itemIndex = 0
                        if (animateType === "fade") {
                            this.change()
                        }
                    } else {
                        this.change()
                    }
                }
            })
            $('.smq-navdisc', this.wrap).click(e => {
                if ($('.smq-navdisc', this.wrap).index($(e.target)) !== -1) {
                    $('.smq-navdisc', this.wrap).eq(this.itemIndex).css({
                        backgroundColor: "transparent"
                    })
                    this.itemIndex = $('.smq-navdisc', this.wrap).index($(e.target))
                    this.change()
                }
            })
        },
        change() {
            let configs = this.settings,
                width = configs.width,
                animateType = configs.animateType,
                itemlen = configs.itemlen;
            if (animateType === "fade") {
                $('.smq-item', this.wrap).fadeOut().eq(this.itemIndex).fadeIn(() => {
                    this.lock = false
                })
            } else if (animateType === "animation") {
                $('.smq-itemlist', this.wrap).animate({
                    left: -this.itemIndex * width
                }, e => {
                    this.lock = false
                    if ($('.smq-itemlist', this.wrap).position().left === -itemlen * width) {
                        $('.smq-itemlist', this.wrap).css({
                            left: 0
                        })
                    }
                })
            }
            if (this.itemIndex === itemlen) {
                this.itemIndex = 0
            }
            $('.smq-navdisc', this.wrap).eq(this.itemIndex).css({
                backgroundColor: "yellow"
            })
        },
        autoPlay() {
            if (this.settings.autoPlay) {
                this.timer = setInterval(
                    () => {
                        $('.smq-sidebtn.right').trigger('click')
                    }, this.settings.autoPlay
                )
            }
        },
        updataSetting(options) {
            for (item in options) {
                if (item in this.settings) {
                    this.settings[item] = options[item]
                }
            }
            this.settings.itemlen = this.settings.item.length
            console.log(this.settings)
            return this.settings
        },
        getDom(name) {
            return $('.smq-' + name, this.wrap)
        }
    }

    function Slide(options, wrap) {
        this.wrap = wrap
        this.settings = {
            animateType: "animation",
            width: 520,
            height: 300,
            sideBtn: "hover",
            navBar: true,
            item: [],
            autoPlay: null,
        }
        this.init(options)
    }

    $.fn.smqSwiper = function (options) {
        if (this[0].smqSlideObj) {
            if (typeof options === "object") {
                // 注意当前不支持任何修改
                if (options.animateType) {
                    delete options.animateType
                }
                this[0].smqSlideObj.init(options)
            } else if (options === "getDom") {
                return this[0].smqSlideObj.getDom
            }
        } else {
            this[0].smqSlideObj = new Slide(options, this)
        }
    }
}(jQuery))

