"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.stairs=exports.special_eff=exports.Tab=exports.Lunbo=void 0;var _createClass=function(){function l(t,o){for(var e=0;e<o.length;e++){var l=o[e];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(t,l.key,l)}}return function(t,o,e){return o&&l(t.prototype,o),e&&l(t,e),t}}(),_module_tool=require("./module_tool.js");function _classCallCheck(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}var Lunbo=function(){function t(){_classCallCheck(this,t),this.lb_pic=(0,_module_tool.$)("#lunbo li","all"),this.lb_index=(0,_module_tool.$)(".lunbo-index span","all"),this.lb_spic=(0,_module_tool.$)(".lb_spic","all"),this.indexq=0,this.indexh=0,this.timer=null}return _createClass(t,[{key:"init",value:function(){for(var o=this,e=this,t=function(t){o.lb_index[t].index=t,o.lb_index[t].onmouseover=function(){clearInterval(e.timer),o.indexh=t,o.click_tab(),o.indexq=t},o.lb_index[t].onmouseout=function(){o.play_auto()},o.lb_pic[t].onmouseover=function(){clearInterval(o.timer)},o.lb_pic[t].onmouseout=function(){o.play_auto()}},l=0;l<this.lb_index.length;l++)t(l);this.play_auto()}},{key:"click_tab",value:function(){for(var t=0;t<this.lb_pic.length;t++)(0,_module_tool.bufferMove)(this.lb_pic[t],{opacity:0}),this.lb_index[t].className="";(0,_module_tool.bufferMove)(this.lb_pic[this.indexh],{opacity:100}),this.lb_index[this.indexh].className="active"}},{key:"play_auto",value:function(){var t=this;this.timer=setInterval(function(){t.indexh++,6<=t.indexh&&(t.indexh=0,t.indexq=6),t.click_tab(),6==t.indexq&&(t.indexq=0),t.indexq++},2e3)}}]),t}(),Tab=function(){function t(){_classCallCheck(this,t),this.slide_index=(0,_module_tool.$)(".slide-index h4","all"),this.slide_item=(0,_module_tool.$)("#slide-items"),this.ul_len=+(0,_module_tool.$)(".slide-items ul","all")[0].offsetHeight}return _createClass(t,[{key:"init",value:function(){for(var l=this,t=function(e){l.slide_index[e].onmouseover=function(){for(var t=-l.ul_len*l.slide_index[e].getAttribute("index"),o=0;o<l.slide_index.length;o++)l.slide_index[o].className="";(0,_module_tool.bufferMove)(l.slide_item,{top:t}),l.slide_index[e].className="active"}},o=0;o<this.slide_index.length;o++)t(o)}}]),t}(),stairs=function(){function t(){_classCallCheck(this,t),this.louceng=(0,_module_tool.$)(".louceng","all"),this.louceng_tabq=(0,_module_tool.$)("#louti span","all"),this.louceng_tabh=(0,_module_tool.$)("#louti label","all"),this.louti=(0,_module_tool.$)("#louti"),this.section=(0,_module_tool.$)("#shop_list section","all"),this.index=0,this.arr=[],this.back=(0,_module_tool.$)(".back_top"),this.count=0,this.seeHeight=document.documentElement.clientHeight,this.offtop=0}return _createClass(t,[{key:"init",value:function(){var o=this;console.log(this.img);var e=this;this.offtop=this.getSP(),window.onscroll=function(){o.offtop=o.getSP(),o.stairs_yz(),o.stairs_tab(),o.lazyload()};for(var t=function(t){o.arr.push(o.section[t].offsetTop),o.louceng[t].onmouseover=function(){o.louceng_tabq[t].style.display="none",o.louceng_tabh[t].style.display="block"},o.louceng[t].onmouseout=function(){t!=o.index&&(o.louceng_tabq[t].style.display="block",o.louceng_tabh[t].style.display="none")},o.louceng[t].onclick=function(){e.louceng_jump(t)},o.back.onclick=function(){e.back_top()}},l=0;l<this.louceng_tabq.length;l++)t(l);this.stairs_yz(),this.stairs_tab()}},{key:"lazyload",value:function(){for(var t=this,e=(0,_module_tool.$)(".col_main li","all"),o=function(o){e[o].offsetTop<t.seeHeight+t.offtop-200&&(t.count=o,setTimeout(function(){var t=e[o].children[0].children[0];t.src=t.getAttribute("data-src"),console.log(o)},50))},l=this.count;l<e.length;l++)o(l)}},{key:"back_top",value:function(){var t=this,o=setInterval(function(){document.documentElement.scrollTop=t.offtop-=100,t.offtop<=0&&(document.documentElement.scrollTop=0,clearInterval(o))},15)}},{key:"louceng_jump",value:function(t){var o=this;if(this.arr[t]<this.offtop)var e=setInterval(function(){document.documentElement.scrollTop=o.offtop-=50,o.offtop<=o.arr[t]&&(document.documentElement.scrollTop=o.arr[t],clearInterval(e))},15);else if(this.arr[t]>this.offtop)var l=setInterval(function(){document.documentElement.scrollTop=o.offtop+=50,o.offtop>=o.arr[t]&&(document.documentElement.scrollTop=o.arr[t],clearInterval(l))},15)}},{key:"stairs_yz",value:function(){700<=this.offtop?this.louti.style.display="block":this.louti.style.display="none"}},{key:"stairs_tab",value:function(){for(var t=0;t<this.louceng.length;t++)if(this.arr[t]>=this.offtop){this.index=t;for(var o=0;o<this.louceng.length;o++)this.louceng_tabq[o].style.display="block",this.louceng_tabh[o].style.display="none";this.louceng_tabq[t].style.display="none",this.louceng_tabh[t].style.display="block";break}}},{key:"getSP",value:function(){return document.documentElement.scrollTop||document.body.scrollTop}}]),t}(),special_eff=function(){function t(){_classCallCheck(this,t),this.oDt=(0,_module_tool.$)("dt","all"),this.OrightM=(0,_module_tool.$)("dd","all"),this.Ohead_drop=(0,_module_tool.$)(".dropdown","all"),this.Ohead_dropul=(0,_module_tool.$)(".dropdown ul","all")}return _createClass(t,[{key:"init",value:function(){console.log(this.Ohead_drop),console.log(this.Ohead_dropul),this.menu_op(),this.header_op()}},{key:"menu_op",value:function(){for(var o=this,e=this,t=function(t){o.oDt[t].onmouseover=function(){this.className="hover",e.OrightM[t].style.display="block"},o.oDt[t].onmouseout=function(){this.className="",e.OrightM[t].style.display="none"}},l=0;l<this.oDt.length;l++)t(l)}},{key:"header_op",value:function(){for(var o=this,e=this,t=function(t){console.log(o.Ohead_drop),o.Ohead_drop[t].onmouseover=function(){console.log(1),e.Ohead_dropul[t].style.display="block"},o.Ohead_drop[t].onmouseout=function(){e.Ohead_dropul[t].style.display="none"}},l=0;l<this.Ohead_drop.length;l++)t(l)}}]),t}();exports.Lunbo=Lunbo,exports.Tab=Tab,exports.special_eff=special_eff,exports.stairs=stairs;