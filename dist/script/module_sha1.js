"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var hexcase=0,b64pad="",chrsz=8;function hex_sha1(r){return binb2hex(core_sha1(str2binb(r),r.length*chrsz))}function b64_sha1(r){return binb2b64(core_sha1(str2binb(r),r.length*chrsz))}function str_sha1(r){return binb2str(core_sha1(str2binb(r),r.length*chrsz))}function hex_hmac_sha1(r,a){return binb2hex(core_hmac_sha1(r,a))}function b64_hmac_sha1(r,a){return binb2b64(core_hmac_sha1(r,a))}function str_hmac_sha1(r,a){return binb2str(core_hmac_sha1(r,a))}function sha1_vm_test(){return"a9993e364706816aba3e25717850c26c9cd0d89d"==hex_sha1("abc")}function core_sha1(r,a){r[a>>5]|=128<<24-a%32,r[15+(a+64>>9<<4)]=a;for(var n=Array(80),e=1732584193,t=-271733879,h=-1732584194,s=271733878,c=-1009589776,o=0;o<r.length;o+=16){for(var _=e,b=t,f=h,u=s,i=c,d=0;d<80;d++){n[d]=d<16?r[o+d]:rol(n[d-3]^n[d-8]^n[d-14]^n[d-16],1);var l=safe_add(safe_add(rol(e,5),sha1_ft(d,t,h,s)),safe_add(safe_add(c,n[d]),sha1_kt(d)));c=s,s=h,h=rol(t,30),t=e,e=l}e=safe_add(e,_),t=safe_add(t,b),h=safe_add(h,f),s=safe_add(s,u),c=safe_add(c,i)}return Array(e,t,h,s,c)}function sha1_ft(r,a,n,e){return r<20?a&n|~a&e:r<40?a^n^e:r<60?a&n|a&e|n&e:a^n^e}function sha1_kt(r){return r<20?1518500249:r<40?1859775393:r<60?-1894007588:-899497514}function core_hmac_sha1(r,a){var n=str2binb(r);16<n.length&&(n=core_sha1(n,r.length*chrsz));for(var e=Array(16),t=Array(16),h=0;h<16;h++)e[h]=909522486^n[h],t[h]=1549556828^n[h];var s=core_sha1(e.concat(str2binb(a)),512+a.length*chrsz);return core_sha1(t.concat(s),672)}function safe_add(r,a){var n=(65535&r)+(65535&a);return(r>>16)+(a>>16)+(n>>16)<<16|65535&n}function rol(r,a){return r<<a|r>>>32-a}function str2binb(r){for(var a=Array(),n=(1<<chrsz)-1,e=0;e<r.length*chrsz;e+=chrsz)a[e>>5]|=(r.charCodeAt(e/chrsz)&n)<<24-e%32;return a}function binb2str(r){for(var a="",n=(1<<chrsz)-1,e=0;e<32*r.length;e+=chrsz)a+=String.fromCharCode(r[e>>5]>>>24-e%32&n);return a}function binb2hex(r){for(var a=hexcase?"0123456789ABCDEF":"0123456789abcdef",n="",e=0;e<4*r.length;e++)n+=a.charAt(r[e>>2]>>8*(3-e%4)+4&15)+a.charAt(r[e>>2]>>8*(3-e%4)&15);return n}function binb2b64(r){for(var a="",n=0;n<4*r.length;n+=3)for(var e=(r[n>>2]>>8*(3-n%4)&255)<<16|(r[n+1>>2]>>8*(3-(n+1)%4)&255)<<8|r[n+2>>2]>>8*(3-(n+2)%4)&255,t=0;t<4;t++)8*n+6*t>32*r.length?a+=b64pad:a+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e>>6*(3-t)&63);return a}exports.hex_sha1=hex_sha1;