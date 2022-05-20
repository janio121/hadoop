$(function() {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    var form = layui.form;
    var laypage = layui.laypage;
    (function() {

        getList();
        initCate();
    })()



    function getList() {
        //定义美化时间的过滤器
        template.defaults.imports.dataFormat = function(date) {
                const dt = new Date(date);
                let y = dt.getFullYear();
                let m = dt.getMonth() + 1;
                let d = dt.getDate();
                let hh = dt.getHours();
                let mm = dt.getMinutes();
                let ss = dt.getSeconds();
                return `${y}-${m}-${d} ${padZero(hh)}:${padZero(mm)}:${padZero(ss)}`;
            }
            // 定义补零的函数
        function padZero(n) {
            return n > 9 ? n : "0" + n;
        }

        $.get("/my/article/list", q, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            let htmlStr = template("tpl-table", res);
            console.log(htmlStr);
            $("tbody").html(htmlStr);
            renderPage(res.total);
        })

    }

    function initCate() {
        $.get("/my/article/cates", function(res) {
            if (res.status !== 0) {
                return layer.msg("获取分类数据失败！");
            }
            console.log(res);
            var htmlStr = template('tpl-cate', res);
            $("[name=cate_id]").html(htmlStr);
            form.render();
        })

    }
    $("#form-search").on("submit", function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $("[name=state]").val();
        q.cate_id = cate_id;
        q.state = state;
        console.log(q);
        getList();
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum
        })
    }
});