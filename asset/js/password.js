(function() {
    // 从layui中获取from对象
    var form = layui.form;
    form.verify({
        //
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });
    $("form").on("submit", function(e) {
        e.preventDefault();
        console.log(typeof this.password.value);
        $.post("/my/updatepwd", {
            oldPwd: this.password.value,
            newPwd: this.repassword.value,
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message + "请重新登录！");
            setTimeout(() => {
                localStorage.removeItem("token");
                window.parent.location.href = "../../login.html";
            }, 2000);

        })
    })

})();