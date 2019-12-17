// 引入工具模块
import { $, rannum, jstool, ajax, bufferMove } from './toolmodule.js'


// 这里放主页的效果
// 以下是轮播图的代码


class Lunbo {

    constructor() {
        // 元素节点获取
        this.lb_pic = $('#lunbo li', 'all');
        this.lb_index = $('.lunbo-index span', 'all');

        this.index = 0;
        this.timer = null;

    }
    init() {
        // 小圆点的切换
        let _this = this;
        for (let i = 0; i < this.lb_index.length; i++) {
            this.lb_index[i].index = i;
            this.lb_index[i].onmouseover = function() {
                setTimeout(function() {
                    _this.index = i;
                    _this.click_tab();
                }, 50)

            }

            // 鼠标移入取消自动轮播
            this.lb_pic[i].onmouseover = function() {
                clearInterval(_this.timer)
            }

            // 鼠标移出开始自动轮播
            this.lb_pic[i].onmouseout = function() {
                _this.play_auto();
            }
        }
        this.play_auto();
    }


    // 点击切换
    click_tab() {
        // 其他图片消失
        // 其他圆点清除背景
        let _this = this;
        for (let i = 0; i < this.lb_pic.length; i++) {
            this.lb_pic[i].style.display = 'none';
            this.lb_index[i].className = '';
        }
        // 使对应的图片出现，
        this.lb_pic[this.index].style.display = 'block';
        // bufferMove(this.lb_pic[this.index], {
        //     opacity: 1
        // }, function() {
        //     _this.lb_pic[_this.index].style.display = 'block';
        // })



        // 对应的圆点active
        this.lb_index[this.index].className = 'active';
    }


    // 自动轮播
    play_auto() {
        let _this = this;
        this.timer = setInterval(function() {
            _this.click_tab(_this.index);
            if (_this.index++ >= 7) {
                _this.index = 0;
            }
        }, 2000)
    }
}


// 以下是tab切换的代码
class Tab {
    constructor() {
        this.slide_index = $('.slide-index h4', 'all');
        this.slide_item = $('#slide-items');
        this.ul_len = +$('.slide-items ul', 'all')[0].offsetHeight;
    }
    init() {
        console.log(this.slide_index);
        console.log(this.ul_len);

        let _this = this;
        for (let i = 0; i < this.slide_index.length; i++) {
            // 鼠标移入事件
            this.slide_index[i].onmouseover = function() {
                let top = -(_this.ul_len * _this.slide_index[i].getAttribute('index'));
                console.log(top)
                    // 清空acitve样式
                for (let j = 0; j < _this.slide_index.length; j++) {
                    _this.slide_index[j].className = '';
                }

                bufferMove(_this.slide_item, {
                    top: top
                })

                // 当前对象添加active
                this.className = 'active';
            }
        }
    }
}


// 以下是页面的零碎效果
class special_eff {

    constructor() {
        this.oDt = $('dt', 'all');
        this.OrightM = $('dd', 'all');
        this.Ohead_drop = $('.dropdown', 'all');
        this.Ohead_dropul = $('.dropdown ul', 'all');

    }



    init() {
        let _this = this
        console.log(this.Ohead_drop);
        console.log(this.Ohead_dropul);

        // menu显示隐藏
        this.menu_op();

        // 头部下拉显示隐藏
        this.header_op();



    }

    menu_op() {
        let _this = this;
        for (let i = 0; i < this.oDt.length; i++) {
            // 鼠标移入显示菜单
            this.oDt[i].onmouseover = function() {
                this.className = 'hover';
                _this.OrightM[i].style.display = 'block';
            }

            // 鼠标移出消失菜单
            this.oDt[i].onmouseout = function() {
                this.className = '';
                _this.OrightM[i].style.display = 'none';
            }
        }
    }


    header_op() {
        let _this = this;
        for (let i = 0; i < this.Ohead_drop.length; i++) {
            console.log(this.Ohead_drop);
            this.Ohead_drop[i].onmouseover = function() {
                console.log(1);
                _this.Ohead_dropul[i].style.display = 'block';
            }


            this.Ohead_drop[i].onmouseout = function() {
                // this.lastChlid.style.display = 'none';
                _this.Ohead_dropul[i].style.display = 'none'
            }
        }
    }



}



export { Lunbo, Tab, special_eff }