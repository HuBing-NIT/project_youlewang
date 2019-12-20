// 主页
import { $ } from './module_tool.js'

import { Lunbo, Tab, special_eff, stairs } from './module_index_effect.js' //主页效果
import {} from './module_index_render.js' //主页渲染
import { Login } from './module_login.js' //登录模块
import { register } from './module_register.js' //注册模块
import { detail_render } from './module_detail_render.js'
import { detail_effect } from './module_detail_effect.js'

// 主页
if ($('#index_mod')) {
    new Lunbo().init();
    new Tab().init();
    new special_eff().init();
    new stairs().init();
}




// 登录
if ($('#login_mod')) {
    new Login().init();
}





// 注册
if ($('#register_mod')) {
    new register().init();
}


// 详情
if ($('#detail_mod')) {
    new detail_render().init();
    new detail_effect().init();
}