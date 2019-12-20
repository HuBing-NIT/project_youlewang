// 引入工具模块
import { $, rannum, jstool, ajax, bufferMove } from './module_tool.js'


// 这里放主页的效果
// 以下是轮播图的代码


class Lunbo {
    constructor() {
        // 元素节点获取
        this.lb_pic = $('#lunbo li', 'all');
        this.lb_index = $('.lunbo-index span', 'all');
        this.lb_spic = $('.lb_spic', 'all');
        this.indexq = 0;
        this.indexh = 0;
        this.timer = null;

    }
    init() {
        // 小圆点的切换
        let _this = this;
        for (let i = 0; i < this.lb_index.length; i++) {
            this.lb_index[i].index = i;
            this.lb_index[i].onmouseover = () => {
                //取消自动轮播
                clearInterval(_this.timer)
                    //透明淡入淡出
                this.indexh = i;
                this.click_tab();
                this.indexq = i;
            }
            this.lb_index[i].onmouseout = () => {
                this.play_auto();
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
        // console.log(this.indexh)
        let _this = this;
        for (let i = 0; i < this.lb_pic.length; i++) {
            // this.lb_pic[i].style.display = 'none';
            bufferMove(this.lb_pic[i], { opacity: 0 });
            this.lb_index[i].className = '';
        }
        // if (this.indexh < 6) {
        //     bufferMove(this.lb_spic[this.indexq], { opacity: 0 });
        //     bufferMove(this.lb_spic[this.indexh], { opacity: 100 });
        //     console.log(1);
        // }
        // if (this.indexh == 6) {
        //     bufferMove(this.lb_spic[this.indexq], { opacity: 0 });
        //     console.log(2);
        // }
        // if (this.indexq == 6) {
        //     bufferMove(this.lb_spic[this.indexh], { opacity: 100 });
        //     console.log(3);
        // }

        // 使对应的图片出现
        // this.lb_pic[this.indexh].style.display = 'block';
        bufferMove(this.lb_pic[this.indexh], { opacity: 100 });
        // bufferMove(this.lb_pic[this.indexh], {
        //     opacity: 1
        // }, function() {
        //     _this.lb_pic[_this.indexh].style.display = 'block';
        // })
        // console.log('前' + this.indexq);
        // console.log('后' + this.indexh)


        // 对应的圆点active
        this.lb_index[this.indexh].className = 'active';
    }


    // 自动轮播
    play_auto() {
        let _this = this;
        this.timer = setInterval(function() {

            _this.indexh++;
            if (_this.indexh >= 6) {
                _this.indexh = 0;
                _this.indexq = 6;
            }
            _this.click_tab();
            if (_this.indexq == 6) {
                _this.indexq = 0;
            }
            _this.indexq++;



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
        // console.log(this.slide_index);
        // console.log(this.ul_len);

        let _this = this;
        for (let i = 0; i < this.slide_index.length; i++) {
            // 鼠标移入事件
            this.slide_index[i].onmouseover = () => {
                let top = -(this.ul_len * this.slide_index[i].getAttribute('index'));
                // console.log(top)
                // 清空acitve样式
                for (let j = 0; j < this.slide_index.length; j++) {
                    this.slide_index[j].className = '';
                }

                bufferMove(this.slide_item, {
                    top: top
                })

                // 当前对象添加active
                this.className = 'active';
            }
        }
    }
}


// 以下是楼梯效果和懒加载的代码
class stairs {
    constructor() {
        this.louceng = $('.louceng', 'all'); //5个楼层
        this.louceng_tabq = $('#louti span', 'all'); //5个颜色切换前
        this.louceng_tabh = $('#louti label', 'all'); //5个颜色切换后
        this.louti = $('#louti');
        this.section = $('#shop_list section', 'all'); //5快内容
        this.index = 0;
        this.arr = [];
        this.back = $('.back_top')
        this.count = 0 //懒加载
        this.seeHeight = document.documentElement.clientHeight; //可视区高度
        this.offtop = 0; //滚轮高度



    }
    init() {
        console.log(this.img)
        let _this = this;
        this.offtop = this.getSP();

        // 滚轮事件
        window.onscroll = function() {
            _this.offtop = _this.getSP();
            // 楼梯显示消失判断
            _this.stairs_yz();
            // 楼梯切换
            _this.stairs_tab();

            // 懒加载
            _this.lazyload();



        }

        // 楼层的点击移入移出时间
        for (let i = 0; i < this.louceng_tabq.length; i++) {

            // 每一块的offsettop
            this.arr.push(this.section[i].offsetTop);
            // 移入
            this.louceng[i].onmouseover = () => {

                this.louceng_tabq[i].style.display = 'none';
                this.louceng_tabh[i].style.display = 'block';
            }

            //移出
            this.louceng[i].onmouseout = () => {
                if (i != this.index) {
                    this.louceng_tabq[i].style.display = 'block';
                    this.louceng_tabh[i].style.display = 'none';
                }
            }

            // 点击跳转楼层
            this.louceng[i].onclick = function() {

                // _this.offtop = _this.getSP(); //获取当前的滚轮高度
                _this.louceng_jump(i);
            }

            // 回到顶部
            this.back.onclick = function() {
                _this.back_top();
            }


        }

        this.stairs_yz();
        this.stairs_tab();

    }


    // 懒加载
    lazyload() {

        let oLi = $('.col_main li', 'all');
        // console.log(img);
        for (let i = this.count; i < oLi.length; i++) {

            // if (img[i].getAttribute('data-src')) {
            // if (this.arr[0] + img[i].offsetTop < this.seeHeight + this.offtop - 100) {
            if (oLi[i].offsetTop < this.seeHeight + this.offtop - 200) {

                this.count = i;
                setTimeout(function() {
                    let img = oLi[i].children[0].children[0];
                    img.src = img.getAttribute("data-src");
                    console.log(i);
                }, 50)
            }
            // }
        }
    }


    // 回到顶部
    back_top() {
        const back_top = setInterval(() => {
            document.documentElement.scrollTop = this.offtop -= 100;
            if (this.offtop <= 0) {
                document.documentElement.scrollTop = 0; //修改当前的htmlscrolltop
                clearInterval(back_top);
            }
        }, 15);
    }

    // 楼层点击跳转
    louceng_jump(i) {
        if (this.arr[i] < this.offtop) { //点击的区域的offset小于当前滚轮高度，往上滑动
            const timeTop = setInterval(() => {
                document.documentElement.scrollTop = this.offtop -= 50;
                if (this.offtop <= this.arr[i]) {
                    document.documentElement.scrollTop = this.arr[i]; //修改当前的htmlscrolltop
                    clearInterval(timeTop);
                }
            }, 15);
        } else if (this.arr[i] > this.offtop) { //点击的区域的offset小于当前滚轮高度，往下滑动
            const timeTop = setInterval(() => {
                document.documentElement.scrollTop = this.offtop += 50;
                if (this.offtop >= this.arr[i]) {
                    document.documentElement.scrollTop = this.arr[i]; //修改当前的htmlscrolltop
                    clearInterval(timeTop);
                }
            }, 15);
        }
    }

    // 判断楼梯显示隐藏
    stairs_yz() {

            // let top = this.getSP();
            // console.log(this.offtop)
            if (this.offtop >= 700) {
                this.louti.style.display = 'block';
            } else {
                this.louti.style.display = 'none';
            }
        }
        // 楼梯切换
    stairs_tab() {
        for (let i = 0; i < this.louceng.length; i++) {
            // var top = this.getSP(); //滚轮的高度

            // var off_top = this.section[i].offsetTop;
            // this.st.push(this.section[i].offsetTop);
            // console.log('--------------------');
            // console.log(top);
            // console.log(off_top)


            if (this.arr[i] >= this.offtop) {
                this.index = i;
                // 隐藏所有
                for (let j = 0; j < this.louceng.length; j++) {
                    this.louceng_tabq[j].style.display = 'block';
                    this.louceng_tabh[j].style.display = 'none';
                }
                // 切换
                this.louceng_tabq[i].style.display = 'none';
                this.louceng_tabh[i].style.display = 'block';
                break;
            }
        }
    }

    // 获取滚轮高度
    getSP() {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        return top;
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

// function lazy() {
//     const imgs = document.querySelectorAll('img');
//     let begin = 0;

//     function lazyload() {
//         for (let index = begin; index < imgs.length; index++) {
//             const img = imgs[index];
//             console.log(document.documentElement.clientHeight);
//             console.log(document.documentElement.scrollTop)
//             console.log(img.offsetTop)
//             if ((img.offsetTop) + 10 > document.documentElement.clientHeight + document.documentElement.scrollTop) {
//                 console.log("scroll" + index + "到了")
//                 begin = index; //不去遍历已经加载了得图片
//                 img.src = img.getAttribute("data-src")
//                     // img.src = img.getAttribute("");
//                 break;
//             }
//         }
//         console.log(1);
//     }
//     lazyload() //渲染首屏，先执行一次
//     window.onscroll = lazyload;

//     function throttle(lazyTime, Fuc) {
//         var lastTime = null //记录上次时间
//         return function() {
//             var currentTime = new Date().getTime();
//             if (!lastTime) { //初始化时间
//                 lastTime = currentTime;
//             }
//             if (lastTime + lazyTime < currentTime) {
//                 Fuc();
//                 lastTime = currentTime;
//             }
//         }
//     }
//     window.onscroll = throttle(50, lazyload) //事件回调是个闭包

// }



export { Lunbo, Tab, special_eff, stairs };