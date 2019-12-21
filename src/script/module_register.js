import { $, rannum, ajax, yzm, removeClass, addClass } from './module_tool.js'
import { hex_sha1 } from './module_sha1.js'
// 以下为表单验证的代码


class register {
    constructor() {
        this.oInput = $('.item input', 'all'); //获取5个input输入框
        this.oInp_res = $('.iteminput span', 'all') //获取5个对应的结果显示框
        this.yzm = $('.set_yzm'); //放验证码
        this.pass = [true, true, true, true, true, false];
        this.oForm = $('.reg-form');

    }


    init() {
        this.yzm.innerHTML = yzm();
        this.yzm.style.background = `rgba(${rannum(0,255)},${rannum(0,255)},${rannum(0,255)},0.5)`


        let _this = this;


        // 1.用户名验证
        //1.1获得焦点
        this.oInput[0].onfocus = () => {
            if (this.oInput[0].value === '') {
                this.oInp_res[0].className = 'tip wram';
                // addClass(this.oInp_res[0], wram)
                this.oInp_res[0].innerHTML = '设置你的登录名'
                this.pass[0] = false;
            }
        }


        //1.2失去焦点
        this.oInput[0].onblur = function() {
            if (this.value === '') { //失去焦点时候为空
                _this.oInp_res[0].className = 'tip error';
                _this.oInp_res[0].innerHTML = '设置你的登录名'
                _this.pass[0] = false;
            } else { //失去焦点不为空做重名判断
                ajax({
                    type: 'post',
                    url: '../php/register.php',
                    data: {
                        username: this.value
                    }
                }).then((res) => {
                    console.log(res)
                    if (!res) { //存在
                        _this.oInp_res[0].className = 'tip success';
                        _this.oInp_res[0].innerHTML = ''
                        _this.pass[0] = true;
                    } else {
                        _this.oInp_res[0].className = 'tip error';
                        _this.oInp_res[0].innerHTML = '用户名已存在'
                        _this.pass[0] = false;
                    }
                })
            }
        }










        // 2.密码验证
        // 2.1获得焦点
        this.oInput[1].onfocus = () => {
            if (this.oInput[1].value === '') {
                this.oInp_res[1].className = 'tip wram';
                this.oInp_res[1].innerHTML = '设置你的密码'
            }
        }

        // 2.2失去焦点
        this.oInput[1].onblur = () => {
            if (this.oInput[1].value === '') {
                this.oInp_res[1].className = 'tip error';
                this.oInp_res[1].innerHTML = '密码不能为空'
                this.pass[1] = false;
            }

        }

        // 2.3input内容改变
        this.oInput[1].oninput = function() {
            _this.pass_input();
        }








        // 3.确认密码验证
        // 3.1获得焦点
        this.oInput[2].onfocus = () => {

            if (this.oInput[2].value === '') { //获得焦点为空
                this.oInp_res[2].innerHTML = '请确认您刚输入的密码';
                this.oInp_res[2].className = 'tip wram';
                this.pass[2] = false;
            }

        }

        // 3.2失去焦点
        this.oInput[2].onblur = () => {

            if (this.oInput[2].value === '') { //获得焦点为空
                this.oInp_res[2].innerHTML = '请确认密码';
                this.oInp_res[2].className = 'tip error';
                this.pass[2] = false;
            }

        }

        // 3.3input内容改变
        this.oInput[2].oninput = function() {
            _this.check_pass_input();



        }






        //4.邮箱验证
        //4.1获得焦点
        this.oInput[3].onfocus = () => {

            if (this.oInput[3].value === '') { //起始为空的状态
                this.oInp_res[3].innerHTML = '请输入邮箱'
                this.oInp_res[3].className = 'tip wram'
                this.pass[3] = false;
            }

        }

        //4.2失去焦点
        this.oInput[3].onblur = () => {
            var reg_email = /^(\w+[\+\-\_\.]*\w+)\@(\w+[\+\-\_\.]*\w+)\.(\w+[\+\-\_\.]*\w+)$/;
            if (this.oInput[3].value !== '') { //内容不为空
                if (reg_email.test(this.oInput[3].value)) { //为true通过
                    this.oInp_res[3].className = 'tip success'
                    this.oInp_res[3].innerHTML = '';
                    this.pass[3] = true;
                } else { //不通过
                    this.oInp_res[3].innerHTML = '邮箱格式有问题';
                    this.oInp_res[3].className = 'tip error'
                    this.pass[3] = false;
                }
            } else {
                this.oInp_res[3].innerHTML = '邮箱不能为空'
                this.oInp_res[3].className = 'tip error'
                this.pass[3] = false;
            }

        }




        // 5.验证码验证

        // 5.1点击切换验证码
        this.yzm.onclick = function() {
            this.innerHTML = yzm();
            this.style.background = `rgba(${rannum(0,255)},${rannum(0,255)},${rannum(0,255)},0.5)`
        }


        //5.2获得焦点
        this.oInput[4].onfocus = () => {
            if (this.oInput[4].value === '') { //为空
                this.oInp_res[4].innerHTML = '请输入验证码';
                this.oInp_res[4].className = 'tip error'
                this.pass[4] = false;

            }
        };

        //5.3失去焦点
        this.oInput[4].onblur = () => {
            if (this.oInput[4].value !== '') { //验证码不为空
                if (this.yzm.innerHTML == this.oInput[4].value) { //验证码相同
                    this.oInp_res[4].className = 'tip success'
                    this.oInp_res[4].innerHTML = '';
                    this.pass[4] = true;
                }
            } else { //为空
                this.oInp_res[4].innerHTML = '验证码不能为空';
                this.oInp_res[4].className = 'tip error'
                this.pass[4] = false;


            }
        }

        // 6我接收点击事件
        this.oInput[5].onclick = function() {
            if (this.checked) { //选中状态
                _this.pass[5] = true
            } else {
                _this.pass[5] = false;
            }
        }



        // 表单提交
        this.oForm.onsubmit = () => {
            if (this.oInput[0].value === '') {
                this.oInp_res[0].innerHTML = '用户名不能为空';
                this.oInp_res[0].className = 'tip error'
                this.pass[0] = false;
            }
            if (this.oInput[1].value === '') {
                this.oInp_res[1].innerHTML = '密码不能为空';
                this.oInp_res[1].className = 'tip error'
                this.pass[1] = false;
            }
            if (this.oInput[2].value === '') {
                this.oInp_res[2].innerHTML = '';
                this.pass[2] = false;
            }
            if (this.oInput[3].value === '') {
                this.oInp_res[3].innerHTML = '手机号码不能为空';
                this.oInp_res[3].className = 'tip error'
                this.pass[3] = false;
            }
            if (this.oInput[4].value === '') {
                this.oInp_res[4].innerHTML = '验证码不能为空';
                this.oInp_res[4].className = 'tip error'
                this.pass[4] = false;
            }
            if (this.pass[0] && this.pass[1] && this.pass[2] && this.pass[3] && this.pass[4]) {
                if (!this.pass[5]) {
                    window.alert('请查看并接收用户服务条款')
                }
            }
            //如果所有的条件都通过了，允许跳转。否则不允许。
            var flag = 1;
            for (var i = 0; i < this.pass.length; i++) {
                if (this.pass.indexOf(false) !== -1) {
                    return false;
                } else {
                    flag = 2;
                    break;
                }
            }
            if (flag == 2) {
                alert('注册成功');
                // location.href = 'index.html';
                // return false;
            }


        }


    }




    // 密码输入框改变事件
    pass_input() {
        let obj = this.oInput[1];
        if (obj.value.length >= 6 && obj.value.length <= 16) {
            var reg_num = /[0-9]+/; //数字
            var reg_lower = /[a-z]+/; //小写
            var reg_upper = /[A-Z]+/; //大写
            var reg_char = /[\W\_]+/; //字符(含_)
            var num = 0;
            // 密码强弱判断
            if (reg_char.test(obj.value)) {
                num++;
            }
            if (reg_num.test(obj.value)) {
                num++;
            }
            if (reg_lower.test(obj.value)) {
                num++;
            }
            if (reg_char.test(obj.value)) {
                num++;
            }
            switch (num) {
                case 1:
                    this.oInp_res[1].className = 'tip success';
                    this.oInp_res[1].innerHTML = '弱';
                    this.oInp_res[1].style.color = 'red';
                    this.pass[1] = true;
                    break;
                case 2:
                case 3:
                    this.oInp_res[1].className = 'tip success';
                    this.oInp_res[1].innerHTML = '中';
                    this.oInp_res[1].style.color = 'orange';
                    this.pass[1] = true;

                    break;
                case 4:
                    this.oInp_res[1].className = 'tip success';
                    this.oInp_res[1].innerHTML = '强';
                    this.oInp_res[1].style.color = 'green';
                    this.pass[1] = true;
                    break;
            }

        } else {
            this.oInp_res[1].innerHTML = '密码长度为8-16位';
            this.oInp_res[1].className = 'tip error';
            this.pass[1] = false;
        }
    }


    //确认密码输入框改变事件
    check_pass_input() {

        if (this.oInput[2].value !== '') { //确认密码不为空
            if (this.oInput[2].value == this.oInput[1].value) { //密码相等
                this.oInp_res[2].className = 'tip success'; //成功的情况
                this.oInp_res[2].innerHTML = '';
                this.pass[2] = true;
            } else { //密码不相等
                this.oInp_res[2].innerHTML = '两次输入不相等';
                this.oInp_res[2].className = 'tip error';
                this.pass[2] = false;
            }
        } else { //输入为空
            this.oInp_res[2].innerHTML = '请确认您输入的密码';
            this.pass[2] = false;
        }
    }

}
// addclass






export { register }