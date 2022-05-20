(function() {
    // 初始化数据
    function initCategory() {
        $.get("/my/article/cates", function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            let htmlStr = template('tpl-table', res);
            $("tbody").html(htmlStr);
        })
    }
    initCategory();
    // 添加
    $("#add").on("click", function() {
        let index = null;
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: "添加文章类别",
            content: $("#dialog-add").html()
        })
    });
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault();
        $.post("/my/article/addcates", $(this).serialize(), function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            initCategory();
            layer.close(index)
        })
    });
    // 编辑
    $("tbody").on("click", ".btn_edit", function() {
        let indexEdit = null;
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: "修改文章类别",
            content: $("#dialog-edit").html()
        })
        let id = $(this).attr("data-id");
        $.get(`/my/article/cates/${id}`, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            $($("#form-edit")[0].name).val(res.data.name);
            $($("#form-edit")[0].alias).val(res.data.alias);
            $($("#form-edit")[0].Id).val(res.data.Id);

        });
        //修改提交
        $("body").on("submit", "#form-edit", function(e) {
            e.preventDefault();
            $.post("/my/article/updatecate", $(this).serialize(), function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                initCategory();
                layer.close(indexEdit)
            })
        })
    });
    //删除
    $("tbody").on("click", ".btn_remove", function() {
        let id = $(this).attr("data-id");
        $.get(`/my/article/deletecate/${id}`, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            initCategory();
            layer.msg(res.message);
        })
    })
})()