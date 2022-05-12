$(function() {
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on("click", function() {
        $(".reg-box").hide();
        $(".login-box").show();
    });
    // 注册
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        if ($("#form_reg [name=repassword]").val() !== $("#form_reg [name=password]").val()) return layer.msg("两次密码不一致!");
        $.post("/api/reguser", { username: $('#form_reg [name=username]').val(), password: $("#form_reg [name=repassword]").val() }, function(res) {
            if (res.status == 1) {
                layer.msg(res.message);
            } else {
                layer.msg('注册成功!');
                $("#link_login").click();
            }

        })
    });
    // 登录
    $("#form_login").on('submit', function(e) {
        e.preventDefault();
        $.post("/api/login", { username: $('#form_login [name=username]').val(), password: $("#form_login [name=password]").val() }, function(res) {
            if (res.status == 1) {
                layer.msg(res.message);
            } else {
                layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = "../../index.html";
            }

        })
    });
    // 从layui中获取from对象
    var form = layui.form;
    form.verify({
        //
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    })
})