//入口函数
$(function() {
    getUserInfo();
    $(".exit").on("click", function() {
        layer.confirm('确定退出登录吗', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem("token");
            location.href = "../../login.html";
            layer.close(index);
        });
    })
    $(".basics").on("click", function() {
        $("#content").attr("src", "../../user/user.html");

    });
    $(".home").on("click", function() {
        $("#content").attr("src", "../../home/echarts.html");

    })
});
//获取用户信息
function getUserInfo() {

    $.ajax({
        method: "get",
        url: '/my/userinfo',

        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！")
            }
            //渲染头像
            renderAvatar(res.data);
        },

    })
}

function renderAvatar(user) {
    // 获取用户名称
    let name = user.nickname || user.username;
    // 设置欢迎名称
    $(".username").text(name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic);
    }
}