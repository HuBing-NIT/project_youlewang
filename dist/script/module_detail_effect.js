"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.detail_effect=void 0;var _createClass=function(){function e(t,o){for(var i=0;i<o.length;i++){var e=o[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),_module_tool=require("./module_tool.js");function _classCallCheck(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}var detail_effect=function(){function t(){_classCallCheck(this,t),this.sid=window.location.search.substr(1).split("=")[1],this.spicimg=(0,_module_tool.$)("#spic img"),this.spic=(0,_module_tool.$)("#spic"),this.sf=(0,_module_tool.$)("#sf"),this.bf=(0,_module_tool.$)("#bf"),this.bpic=(0,_module_tool.$)("#bpic"),this.list=(0,_module_tool.$)("#list"),this.goodsinfo=(0,_module_tool.$)(".goodsinfo"),this.left=(0,_module_tool.$)("#left"),this.right=(0,_module_tool.$)("#right"),this.btn=(0,_module_tool.$)(".btn_add2cart"),this.addcount=(0,_module_tool.$)(".addQuantity"),this.count=(0,_module_tool.$)(".pCount"),this.reducecount=(0,_module_tool.$)(".reduceQuantity")}return _createClass(t,[{key:"init",value:function(){this.fdj(),this.pic_tab(),this.shop_cart(),this.add(),this.reduce()}},{key:"add",value:function(){var t=this;this.addcount.onclick=function(){t.count.value++}}},{key:"reduce",value:function(){var t=this;this.reducecount.onclick=function(){1<t.count.value&&t.count.value--}}},{key:"fdj",value:function(){var o=this;this.spic.onmouseover=function(){o.fdj_show(),o.sf.style.width=o.spic.offsetWidth*o.bf.offsetWidth/o.bpic.offsetWidth+"px",o.sf.style.height=o.spic.offsetHeight*o.bf.offsetHeight/o.bpic.offsetHeight+"px",o.scale=o.bf.offsetWidth/o.sf.offsetWidth,this.onmousemove=function(t){t=t||window.event;o.spic_move(t)}},this.spic.onmouseout=function(){o.fdj_hide()}}},{key:"spic_move",value:function(t){var o=t.clientX-this.goodsinfo.offsetLeft-this.sf.offsetWidth/2,i=t.clientY-this.goodsinfo.offsetTop-this.sf.offsetHeight/2;o<=0?o=0:o>=this.spic.offsetWidth-this.sf.offsetWidth-2&&(o=this.spic.offsetWidth-this.sf.offsetWidth-2),i<=0?i=0:i>=this.spic.offsetHeight-this.sf.offsetHeight-2&&(i=this.spic.offsetHeight-this.sf.offsetHeight-2),this.sf.style.left=o+"px",this.sf.style.top=i+"px",this.bpic.style.left=-o*this.scale+"px",this.bpic.style.top=-i*this.scale+"px"}},{key:"fdj_show",value:function(){this.sf.style.visibility="visible",this.bf.style.visibility="visible"}},{key:"fdj_hide",value:function(){this.sf.style.visibility="hidden",this.bf.style.visibility="hidden"}},{key:"pic_tab",value:function(){var i=this;this.list.onclick=function(t){var o=(t=t||window.event).target||t.srcElement;console.log(o.nodeName),(o.NodeName="IMG")&&(i.spicimg.src=o.src,i.bpic.src=o.src),console.log(i.spicimg.src)}}},{key:"shop_cart",value:function(){var i=this;this.btn.onclick=function(){var t=[],o=[];_module_tool.jstool.getcookie("cookie_sid")&&_module_tool.jstool.getcookie("cookie_num")&&(t=_module_tool.jstool.getcookie("cookie_sid").split(","),o=_module_tool.jstool.getcookie("cookie_num").split(",")),-1!==t.indexOf(i.sid)?o[t.indexOf(i.sid)]=+o[t.indexOf(i.sid)]+ +i.count.value:(t.push(i.sid),o.push(i.count.value),_module_tool.jstool.addcookie("cookie_sid",t,10)),_module_tool.jstool.addcookie("cookie_num",o,10),alert("成功加入购物车")}}}]),t}();exports.detail_effect=detail_effect;