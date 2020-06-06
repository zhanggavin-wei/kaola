//显示购物车
let username = getCookie("username");
console.log(username);
function getShoppingCar(cb) {
    $.get("getShoppingCart.php", { "vipName": username}, function (datas) {
        let htmlStr =`
        <ul class="shopingcar-title">
            <li class="check"><input type="checkbox">全选</li>
            <li class="msg1">商品信息</li>
            <li class="msg2">单价(元)</li>
            <li class="msg3">数量</li>
            <li class="msg4">金额(元)</li>
            <li class="msg5">操作</li>
        </ul>
        `
        datas.forEach(goods => {
            htmlStr += `
        <div class="pro-list" id="${goods.goodsId}">
        <div class="pro_title">
            <input type="checkbox">
            <i>自营</i>
            <em>自营国内仓</em>
        </div>
        <div class="pro_con" id="bbbbbb">
            <div class="con-title">
                <p>N元任选</p>
                <span>再购<b style="color: red;">16</b>件立享【99元任选16件】</span>
                <a href="">去凑单 ></a>
            </div>
            <div class="ulbox">
                <ul class="con-con ${goods.goodsId}">
                    <li class="con1"><input class="con-check" type="checkbox" class="float_left"></li>
                    <li class="con2">
                        <dl class="imgbox float_left">
                            <dd>
                                <img src="${goods.goodsImg}" alt="">
                            </dd>
                            <dt class="float_left">
                                <a href="">${goods.goodsName}</a>
                                <em class="goodsId" style="overflow:hidden">${goods.goodsId}</em>
                                <span><img src="./images/7day.png" alt=""> 不支持7天无理由退货</span>
                                <div class="monma">支持3期免息 <span class="iconfont icon-xiajiantou"></span>
                                </div>
                            </dt>
                        </dl>
                    </li>
                    <li class="con3">
                        <p style="text-decoration: line-through;color: gray;">20</p>
                        <p><b style="font-size: 16px; font-weight: bold;">${goods.goodsPrice}</b></p>
                    </li>
                    <li class="con4">
                        <input type="button" class="reduceBtn" value="-">
                        <span>${goods.goodsCount}</span>
                        <input type="button" class="addBtn" value="+">
                    </li>
                    <li class="con5" style="text-align: center;">${goods.goodsPrice*goods.goodsCount}</li>
                    <li class="con6" style="line-height: 20px;">
                        <a class="delBtn">删除</a>
                        <a href="">移入我的收藏</a>
                    </li>
                </ul>
            </div>
            <div class="pro-jiesuan clear_fix">
                <p>预估税费：<b>-￥0</b></p>
                <p>活动优惠：<b>-￥0</b></p>
                <p class="child-totalmoney">商品应付总计：<b>-￥0</b></p>
            </div>
        </div>
    </div>
    `;
    $("#shoppingcarbox").html(htmlStr);
    $("#table :checkbox:eq(0)").check($("#table :checkbox:gt(0)"));
    $("#01001 :checkbox:eq(0)").check($("#01001 :checkbox:gt(0)"));
    $("#01002 :checkbox:eq(0)").check($("#01002 :checkbox:gt(0)"));
    $("#01003 :checkbox:eq(0)").check($("#01003 :checkbox:gt(0)"));
    $("#01004 :checkbox:eq(0)").check($("#01004 :checkbox:gt(0)"));
    $("#01005 :checkbox:eq(0)").check($("#01005 :checkbox:gt(0)"));
    $("#02001 :checkbox:eq(0)").check($("#02001 :checkbox:gt(0)"));
    $("#02002 :checkbox:eq(0)").check($("#02002 :checkbox:gt(0)"));
    $("#02003 :checkbox:eq(0)").check($("#02003 :checkbox:gt(0)"));
    $("#02004 :checkbox:eq(0)").check($("#02004 :checkbox:gt(0)"));
    $("#02005 :checkbox:eq(0)").check($("#02005 :checkbox:gt(0)"));
    $("#03001 :checkbox:eq(0)").check($("#03001 :checkbox:gt(0)"));
    $("#03002 :checkbox:eq(0)").check($("#03002 :checkbox:gt(0)"));
    $("#03003 :checkbox:eq(0)").check($("#03003 :checkbox:gt(0)"));
    $("#03004 :checkbox:eq(0)").check($("#03004 :checkbox:gt(0)"));
    $("#03005 :checkbox:eq(0)").check($("#03005 :checkbox:gt(0)"));
    $("#04001 :checkbox:eq(0)").check($("#04001 :checkbox:gt(0)"));
    $("#04002 :checkbox:eq(0)").check($("#04002 :checkbox:gt(0)"));
    $("#04003 :checkbox:eq(0)").check($("#04003 :checkbox:gt(0)"));
    $("#04004 :checkbox:eq(0)").check($("#04004 :checkbox:gt(0)"));
    $("#04005 :checkbox:eq(0)").check($("#04005 :checkbox:gt(0)"));
    cb();
        });
        
    },"json")
}
//修改数量
function updataCount(goodsId,goodsCount,ev){
    $.get("updateGoodsCount.php",{
        "vipName":username,
        "goodsId":goodsId,
        "goodsCount":goodsCount
    },function(data){
        if(data=="0"){
            alter("出错了");
        }else{
            ev();
        }
    })
}
//删除商品
function removeGoods(goodsId,goodsCount,ev){
    $.get("deleteGoods.php",{
        "vipName":username,
        "goodsId":goodsId
    },function(data){
        if(data=="0"){
            alter("出错了");
        }else{
            location.reload(true);
        }
    })
}

$(function () {
    getShoppingCar(cb);
    totalMoney()
})

//数量及删除变化
function cb(){
    //计算金额
    $(":checkbox").click(function () {
        totalMoney();
    });

    $(".addBtn").click(function () {
        //后端修改
        // 数量
        let count = $(this).prev().html();
        let goodsId=$(this).parent().parent().find(".goodsId").html();
        count++;
        $(this).prev().html(count);
        updataCount(goodsId,count,()=>{
            //一、前端修改
            $(this).prev().html(count);
            // 单价
            let price = $(this).parent().prev().find("b").html();
            // 计算金额
            let money = price * count;
            $(this).parent().next().html(money);
            // 同时改变当前行的复选框的状态
            if (count >= 1) {
                $(this).parent().parent().find(":checkbox").prop("checked", true);
                // $(this).parent().parent().remove();
            }
            // 总金额
            totalMoney();
        })


    });

    $(".reduceBtn").click(function () {
        //后端修改
        // 数量
        let count = $(this).next().html();
        let goodsId=$(this).parent().parent().find(".goodsId").html();
        count--;
        if (count < 1) {
            count = 0;
        }
        $(this).next().html(count);
        updataCount(goodsId,count,()=>{
            $(this).next().html(count);
            // 单价
            let price = $(this).parent().prev().find("b").html();
            // 计算金额
            let money = price * count;
            $(this).parent().next().html(money);
            // 同时改变当前行的复选框的状态
            if (count == 0) {
                $(this).parent().parent().find(":checkbox").prop("checked", false);
                // $(this).parent().parent().remove();
            }else{
                $(this).parent().parent().find(":checkbox").prop("checked", true);
            }
    
            // 总金额
            totalMoney();
        })
    });
    //删除
    $(".delBtn").click(function () {
        if (confirm("亲，您真的要删除吗？")) {
            let goodsId=$(this).parent().parent().find(".goodsId").html();
            removeGoods(goodsId,()=>{
                $(this).parent().parent().remove();
                location.reload(true);
                totalMoney();
                let ul = $(".ulbox").find("ul");
                console.log(ul.length);
                if (ul.length == 0) {
                    $(".ulbox").parent().parent().remove();
                }
            })
            
        }
    });
}
// 计算总金额
function totalMoney() {
    //同一店铺
    let childmoney = 0;
    let $ul=[".01001",".01002",".01003",".01004",".01005",".02001",".02002",".02003",".02003",".02004",".02005",".03001",".03002",".03003",".03004",".03005",".04001",".04002",".04003",".04004",".04005"]
    for(let i=0;i<=$ul.length;i++){
        if ($($ul[i]).find(":checkbox").prop("checked") == true) {
            childmoney= parseFloat($($ul[i]).find("li").eq(4).html());
        }
        $($ul[i]).parent().next().find("b").last().html(childmoney.toFixed(2));
    }
    
    //全部商品
    let tatalcount=0;
    let money = 0;
    let $tr = $(".pro-list");
    $tr.each(function () {
        // 复选框是不是选中了
        if ($(this).find(":checkbox").prop("checked") == true) {
            money += parseFloat($(this).find(".child-totalmoney b").html());
            tatalcount +=parseFloat($(this).find(".con4 span").html());
        }
    });
    $("#Total-price").html(money);
    $("#Total-count").html(tatalcount);
    if($("#Total-price").html()!=0){
        $("#go-pay").css("background","red")
    }else{
        $("#go-pay").css("background","gray")
    }
}