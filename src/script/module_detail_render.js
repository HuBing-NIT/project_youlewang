import { $, rannum, jstool, ajax, bufferMove } from './module_tool.js'


class detail_render {
    constructor() {
        this.sid = window.location.search.substr(1).split('=')[1]; //sid号


        // 渲染用的对象
        this.shop_id = $('#itemId'); //商品id
        this.title = $('.shop_detail h1'); //标题
        this.price = $('.goodprice strong'); //价格


        this.spicimg = $('#spic img');
        this.bpic = $('#bpic');
        this.list = $('#list');






    }

    init() {

            let _this = this;
            ajax({
                data: {
                    sid: this.sid
                },
                dataType: 'json',
                url: 'http://10.31.161.142/project_youlewang/php/details_render.php'
            }).then(data => {
                console.log(data);
                _this.render_shop(data);
                _this.render_glass(data);
            })
        }
        // 商品内容渲染
    render_shop(data) {
        //商品详情渲染
        this.title.innerHTML = data.shop_title;
        this.price.innerHTML = data.shop_price;
        this.shop_id.innerHTML = 411222 + data.shop_id;


    }
    render_glass(data) {
        //放大镜渲染
        this.spicimg.src = data.shop_src;
        this.bpic.src = data.shop_src;
        var u_list = data.urls.split(',');
        var str = '';
        for (let value of u_list) {
            str += `
         <li>
         <img src='${value}'>
         </li>
         `
        }
        this.list.innerHTML = str;

        this.list_li = document.querySelectorAll('#list li')
        this.list.style.width = this.list_li.length * this.list_li[0].offsetWidth + 'px';
    }

}
export { detail_render };