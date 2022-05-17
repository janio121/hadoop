$(function() {
    layui.form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间！'
            }
        }
    })
    $.get("/my/userinfo", function(res) {
        $("#username").val(res.data.username);
        $("#nickname").val(res.data.nickname);
        $("#userEmail").val(res.data.email);
        updateUserInfo(res.data.id);
    })

})

function updateUserInfo(id) {
    $("form").on("submit", function(e) {
        e.preventDefault();

        $.post("/my/userinfo", {
            id,
            username: this.username.value,
            nickname: this.nickname.value,
            email: this.userEmail.value
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg('修改信息失败！');
            }
            layer.msg('修改信息成功！');
            window.parent.getUserInfo();
            $("#nickname").val("");
            $("#userEmail").val("");
        })

    })
};