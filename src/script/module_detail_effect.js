// 引入工具模块
import { $, rannum, jstool, ajax, bufferMove } from './module_tool.js'




class detail_effect {
    constructor() {
        this.sid = window.location.search.substr(1).split('=')[1];


        this.spicimg = $('#spic img');
        this.spic = $('#spic');
        this.sf = $('#sf');
        this.bf = $('#bf');
        this.bpic = $('#bpic');
        this.list = $('#list');

        this.goodsinfo = $('.goodsinfo');

        this.left = $('#left')
        this.right = $('#right')
        this.btn = $('.btn_add2cart') //加入购物车
        this.addcount = $('.addQuantity'); //增加
        this.count = $('.pCount') //数量
        this.reducecount = $('.reduceQuantity'); //减少
    }

    init() {

        let _this = this;



        // 放大镜功能
        this.fdj();

        // 缩略图切换功能
        this.pic_tab();


        // 添加购物车功能
        this.shop_cart();


        // 数量增加
        this.add();

        // 数量减少
        this.reduce();
    }


    // 数量增加
    add() {
        this.addcount.onclick = () => {
            this.count.value++;
        }
    }



    // 数量减少
    reduce() {
        this.reducecount.onclick = () => {
            if (this.count.value > 1) {
                this.count.value--;
            }

        }
    }


    // 放大镜效果
    fdj() {
        let _this = this;
        // 1.移入显示
        this.spic.onmouseover = function() {
            // var e = e || window.event;
            _this.fdj_show();
            //设置小放大镜大小
            _this.sf.style.width = _this.spic.offsetWidth * _this.bf.offsetWidth / _this.bpic.offsetWidth + 'px';
            _this.sf.style.height = _this.spic.offsetHeight * _this.bf.offsetHeight / _this.bpic.offsetHeight + 'px';
            _this.scale = _this.bf.offsetWidth / _this.sf.offsetWidth;
            // 小放大镜的移动
            this.onmousemove = function(e) {
                var e = e || window.event;
                _this.spic_move(e);
            }
        };
        // 2.移出消失
        this.spic.onmouseout = function() {
            _this.fdj_hide();
        };




    }

    // 1.小放大镜移动
    spic_move(e) {

        let l = e.clientX - this.goodsinfo.offsetLeft - this.sf.offsetWidth / 2;
        let t = e.clientY - this.goodsinfo.offsetTop - this.sf.offsetHeight / 2;
        if (l <= 0) {
            l = 0;
        } else if (l >= this.spic.offsetWidth - this.sf.offsetWidth - 2) {
            l = this.spic.offsetWidth - this.sf.offsetWidth - 2
        }

        if (t <= 0) {
            t = 0;
        } else if (t >= this.spic.offsetHeight - this.sf.offsetHeight - 2) {
            t = this.spic.offsetHeight - this.sf.offsetHeight - 2
        }
        this.sf.style.left = l + 'px';
        this.sf.style.top = t + 'px';
        this.bpic.style.left = -l * this.scale + 'px';
        this.bpic.style.top = -t * this.scale + 'px';
    }

    // 2.鼠标移入放大镜显示
    fdj_show() {
        this.sf.style.visibility = 'visible';

        this.bf.style.visibility = 'visible';
    }

    // 3.鼠标移出放大镜消失
    fdj_hide() {
        this.sf.style.visibility = 'hidden';
        this.bf.style.visibility = 'hidden';
    }





    //  缩略图的点击切换效果
    pic_tab() {

            let _this = this;
            // 点击切换图片
            this.list.onclick = function(e) {
                var e = e || window.event;
                let ele = e.target || e.srcElement;
                console.log(ele.nodeName);
                if (ele.NodeName = 'IMG') {
                    _this.spicimg.src = ele.src;
                    _this.bpic.src = ele.src;
                }
                console.log(_this.spicimg.src)
            }

            var num = 6;
            // console.log(this.list_li)
            // let li_width = this.list_li[0].offsetWidth;
            // 右侧点击
            // this.right.onclick = function() {
            //         // _this.right_click(num);
            //         let li_width = _this.list_li[0].offsetWidth;
            //         if (_this.list_li.length > num) {
            //             console.log(num)
            //             num++;
            //             if (_this.list_li.length == num) {
            //                 _this.right.style.color = '#fff';
            //             }
            //             bufferMove(_this.list, {
            //                 left: -(num - 6) * li_width
            //             });
            //             _this.left.style.color = "#333";
            //         }
            //     }
            //     // 右侧点击
            // this.left.onclick = function() {
            //     // _this.left_click(num);
            //     let li_width = _this.list_li[0].offsetWidth;
            //     if (num > 6) {
            //         num--;
            //         if (num === 6) {
            //             _this.left.style.color = '#fff';
            //         }
            //         bufferMove(_this.list, {
            //             left: -(num - 6) * li_width
            //         });
            //         _this.right.style.color = "#333";
            //     }
            // }
        }
        // right_click(num) {
        //     let li_width = this.list_li[0].offsetWidth;
        //     if (this.list_li.length > num) {
        //         console.log(num)
        //         num++;
        //         if (this.list_li.length == num) {
        //             this.right.style.color = '#fff';
        //         }
        //         bufferMove(this.list, {
        //             left: -(num - 6) * li_width
        //         });
        //         this.left.style.color = "#333";

    //     }
    // }



    shop_cart() {
        // var str = '1,2,3,4,5,6';
        // console.log([...str])

        let _this = this;
        this.btn.onclick = function() {
            var sidarr = []; //存放sid
            var numarr = []; //存放sid对应的数量
            // 如果cookie存在，取出来给数组
            if (jstool.getcookie('cookie_sid') && jstool.getcookie('cookie_num')) {
                sidarr = jstool.getcookie('cookie_sid').split(',');
                numarr = jstool.getcookie('cookie_num').split(',');
            }

            if (sidarr.indexOf(_this.sid) !== -1) { //当前商品是不第一次  更新num
                // 取出索引追加数量
                numarr[sidarr.indexOf(_this.sid)] = +numarr[sidarr.indexOf(_this.sid)] + (+_this.count.value);
                jstool.addcookie('cookie_num', numarr, 10);
            } else { //当前商品是第一次  添加
                //添加sid和num
                sidarr.push(_this.sid);
                numarr.push(_this.count.value);
                // 写入cookie
                jstool.addcookie('cookie_sid', sidarr, 10);
                jstool.addcookie('cookie_num', numarr, 10);
            }
            alert('成功加入购物车');


        }



    }
}



export { detail_effect };