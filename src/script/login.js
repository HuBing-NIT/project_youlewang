import { $, rannum, ajax, yzm, jstool } from './toolmodule.js'

// 以下为用户登录验证的代码


class Login {

    constructor() {
        this.yzm = $('.set_yzm');
        this.btn = $('.login-btn');
        this.oInp = $('.inp_yz', 'all');

    }



    init() {
        console.log(this.oInp)
        let _this = this;
        this.yzm.innerHTML = yzm();
        this.yzm.style.background = `rgba(${rannum(0,255)},${rannum(0,255)},${rannum(0,255)},0.5)`


        // 1.点击切换验证码
        this.yzm.onclick = function() {
            this.innerHTML = yzm();
            this.style.background = `rgba(${rannum(0,255)},${rannum(0,255)},${rannum(0,255)},0.5)`;
        }

        // 2.登录信息提交
        this.btn.onclick = function() {
            _this.login_yz();
        }

        //3用户输入
        this.user_inp();


        //4 密码输入
        this.pass_inp();

    }


    // 登录判断
    login_yz() {
        let _this = this;
        if (!this.oInp[0].value) { //用户名为空

            this.oInp[0].nextElementSibling.style.display = 'block';
            this.oInp[0].nextElementSibling.innerHTML = '请输入用户名';
            this.oInp[0].style.border = '1px solid red';
        }
        if (!this.oInp[1].value) { //密码为空

            this.oInp[1].nextElementSibling.style.display = 'block';
            this.oInp[1].nextElementSibling.innerHTML = '请输入密码';
            this.oInp[1].style.border = '1px solid red';
        }
        // 账号密码都不为空
        if (this.oInp[0].value && this.oInp[1]) {
            if (this.yzm.innerHTML == this.oInp[2].value) { //且验证码相同
                ajax({

                    url: '../php/login.php',
                    type: 'post',
                    data: {
                        user: this.oInp[0].value,
                        pass: this.oInp[1].value
                    }

                }).then((res) => {

                    if (res == 1) { //成功的情况

                        // 判断是否记住用户名密码
                        if (this.oInp[3].checked) { //勾选了存入cookie
                            jstool.addcookie('username', this.oInp[0]);
                            jstool.addcookie('userpass', this.oInp[0]);
                            location.href = 'index.html';
                        } else { //未勾选session

                        }
                        alert('登录成功');
                        //location.href = 'index.html';
                    } else {
                        this.oInp[0].nextElementSibling.innerHTML = '用户名或密码错误';
                        this.oInp[0].nextElementSibling.style.display = 'block';
                        this.oInp[0].style.border = '1px solid red';
                    }
                })
            }
        }
    }

    // 用户名输入
    user_inp() {
        this.oInp[0].oninput = function() {
            if (this.value != '') {
                this.nextElementSibling.style.display = 'none';
                this.style.border = '1px solid #cacaca';
            } else {
                this.nextElementSibling.style.display = 'block';
                this.nextElementSibling.innerHTML = '请输入用户名';
                this.style.border = '1px solid red';
            }
        }
    }

    // 密码输入
    pass_inp() {
        this.oInp[1].oninput = function() {
            if (this.value != '') {
                this.nextElementSibling.style.display = 'none';
                this.style.border = '1px solid #cacaca';
            } else {
                this.nextElementSibling.style.display = 'block';
                this.nextElementSibling.innerHTML = '请输入密码';
                this.style.border = '1px solid red';
            }
        }
    }

}







new Login().init();