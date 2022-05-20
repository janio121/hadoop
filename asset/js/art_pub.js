$(function() {
    initCate();
    // 初始化富文本编辑器
    initEditor()
    var form = layui.form;

    function initCate() {
        $.get("/my/article/cates", function(res) {
            if (res.status !== 0) {
                return layer.msg("获取文章分类失败！");
            }
            console.log(res);
            // 调用模板引擎渲染分类
            let htmlStr = template('tpl-cate', res);

            $("[name=cate_id]").html(htmlStr);
            form.render();
        })
    }
    // // 1. 初始化图片裁剪器
    var $image = $('#image');

    // // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // // 3. 初始化裁剪区域
    $image.cropper(options)
    $(".btn1").on("click", function() {
        $("#coverFile").click();
        $("#coverFile").on("change", function(e) {

            if (e.target.files.length == 0) return
            var file = e.target.files[0];
            var newImgURL = URL.createObjectURL(file);
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                })
        })

    })
    var art_state = '已发布';
    $('#btnSave2').on("click", function() {
        art_state = '草稿'
    })
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        publishArticle(fd);
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg("发布文章成功！");
                location.href = "./art_list.js";
            }
        })
    }
})