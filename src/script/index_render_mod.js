import { $, rannum, jstool, ajax, bufferMove } from './toolmodule.js'


//5块区域渲染
ajax({

    type: 'get',
    url: 'http://10.31.161.142/project_youlewang/php/index_render.php',
    dataType: 'json'
}).then(function(data) {;

    var data = data;
    // console.log(data.d1)
    let col_main = $('.col_main', 'all');
    for (let i = 0; i < col_main.length; i++) { //外层5次
        let d = 'd' + `${i+1}`;
        d = data[d];
        let html = '';

        for (let j = 0; j < d.length; j++) { //内层循环

            // console.log(d[j].shop_src)
            html += `
            <li>
                <a href="">
                    <img src="${d[j].shop_src}" alt="" data-src='${d[j].shop_src}'>
                </a>
                <p>
                  ${d[j].shop_title}  
                </p>
                <p>¥${d[j].shop_price}</p>
            </li>
            `
        }
        col_main[i].innerHTML = html;

    }


})