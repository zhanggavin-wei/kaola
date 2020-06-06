    //commodity-title
    let comLink = document.getElementsByClassName("com1");
    for (let i = 0; i < comLink.length; i++) {
        comLink[i].onmouseover = function () {
            this.lastElementChild.previousElementSibling.style.transform = "rotate(180deg)";
            this.lastElementChild.style.display = "block";
        }
        comLink[i].onmouseout = function () {
            this.lastElementChild.previousElementSibling.style.transform = "rotate(360deg)";
            this.lastElementChild.style.display = "none";
        }
    }
    //nav
    let navTitle = document.getElementById("nav_title");
    navTitle.onmouseover = function () {
        this.lastElementChild.style.display = "block";
    }
    navTitle.onmouseout = function () {
        this.lastElementChild.style.display = "none";
    }
    // tab
    let oliTitles = document.getElementById("title").children;
    let oliContents = document.getElementById("content").children;

    for (let i = 0; i < oliTitles.length; i++) {
        oliTitles[i].onclick = function () {
            for (let j = 0; j < oliTitles.length; j++) {
                oliTitles[j].style.backgroundColor = "#eee";
                oliTitles[j].style.borderTop = "0px solid black"
                oliTitles[j].style.color = "black"
            }
            oliTitles[i].style.backgroundColor = "#fff";
            oliTitles[i].style.borderTop = "2px solid red"
            oliTitles[i].style.color = "red"

            for (let j = 0; j < oliContents.length; j++) {
                oliContents[j].style.display = "none";
            }
            oliContents[i].style.display = "block";
        }
    }
    //后端
    // 从后端获取所有的商品
    let goodsId = location.search.split("=")[1];
    function getData() {
        $.get("getGoodsInfo.php", "goodsId=" + goodsId, function (data) {
            showData(data);
        }, "json");
    }
    // 显示商品
    function showData(data) {
        let src = data.goodsImg
        let htmlStr = `
            <div class="buy_l">
                <div id="magnbox" style="background: url(${data.goodsImg});background-size: 400px 400px;">

                </div>
                <div class="mirror-b">
                    <a href="" class="jiantou">《</a>
                    <ul id="img-box">
                        <a href="">
                            <img src="${data.goodsImg}">
                        </a>
                        <a href="">
                            <img src="${data.beiyong1}">
                        </a>
                        <a href="">
                            <img src="${data.beiyong2}">
                        </a>
                        <a href="">
                            <img src="${data.beiyong3}">
                        </a>
                    </ul>
                    <a href="" class="jiantou">》</a>
                </div>
            </div>
            <div class="buy_r">
                <div class="buy-title">
                    <img src="${data.beiyong13}" alt="">
                    <i>${data.beiyong14}|${data.beiyong4}</i>
                </div>
                <h2 class="pro-title">${data.goodsName}</h2>
                <div class="buy-probox">
                    <div class="box_t">
                        <i style="padding-right: 30px;">售价</i><em style="font-size: 25px;color: red;">¥${data.goodsPrice}</em><em style="width: 20px;height: 20px; background-color: rgb(248, 73, 73);color: #fff;margin: 0 5px;">7折</em> <i>参考价 &nbsp; ¥${data.beiyong5}</i>
                    </div>
                    <div class="box_b">
                        <div class="bo-l float_left">
                            分期
                        </div>
                        <div class="bo_r float_left">
                            <i style="font-size: 13px;width: 30px;height: 16px;color:#fff;line-height: 16px;text-align: center;background-color: orange;">3期免息</i>
                            <em style="font-size: 18px;font-weight: bold;">¥${(data.goodsPrice/3).toFixed(2)}</em>
                            <i>×3期免息，预计可免${(data.goodsPrice*0.023).toFixed(2)}元</i><br>
                            <i style="width:20px;height:16px; background-color: black;color: #fff;">v黑卡</i><em>黑卡会员预计可省</em><i>¥${(data.goodsPrice*0.04).toFixed(2)}</i><br>
                            <i style="margin-left: 30px; font-size: 12px; color: #bbb;background-color: blue;">含会员96折</i>
                        </div>
                    </div>
                </div>
                <table style="width:500px; font-size: 12px;">
                    <tr style="color: red;">
                        <td class="t1">活动</td>
                        <td ><i style="color: #fff; width: 60px;background-color: red;">N元任选</i> </td>
                        <td>99元任选14件</td>
                        <td><a style="color: red;" href="">点击凑单></a></td>
                    </tr>
                    <tr>
                        <td class="t1">运费</td>
                        <td>至</td>
                        <td style="width: 100px;"><select id="cit">
                            <option value="江西">江西省新余市渝水区</option>
                        </select></td>
                        <td>88元包邮</td>
                    </tr>
                    <tr>
                        <td class="t1">服务</td>
                        <td>本商品由</td>
                        <td>自营国内仓</td>
                        <td>发货</td>
                    </tr>
                    <tr class="imgb" style="text-align: center;">
                        <td></td>
                        <td><img src="./images/add1.jpg" alt=""></td>
                        <td><img src="./images/add2.png" alt=""></td>
                        <td><img src="./images/add3.png" alt=""></td>
                    </tr>
                    <tr style="text-align: center;">
                        <td></td>
                        <td>正品货源</td>
                        <td>自营国内仓发货</td>
                        <td>新余市</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colspan="3">15:30前完成支付，预计 <i style="font-size: 14px;font-weight: bold;">5月16日(周六)</i> 送至</td>
                    </tr>
                    <tr>
                        <td class="t1">数量</td>
                        <td>
                            <input id="btnReduce" style="width:20px;" type="button" class="reduceBtn" value="-">
                            <input id="count" style="display: inline-block; width: 40px;text-align:center;border: black solid 1px;" type="text" value="1">
                            <input id="btnAdd" style="width:20px;"  type="button" class="addBtn" value="+">
                        </td>
                        <td style="color: red;">单次限购10件</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="t1">说明</td>
                        <td>
                            会员96折
                        </td>
                        <td>正品保障</td>
                        <td>不支持7天无理由退货</td>
                        <td>不可使用优惠券</td>
                    </tr>
                </table>
                <div class="buy-bottom">
                    <div class="bot_t">
                        <i class="a1" >立即购买</i>
                        <i class="a2" id="btnAddShoppingCar">加入购物车</i>
                        <i class="a3" >收藏</i>
                    </div>
                    <div class="bot_b">
                        <p>好评率：99%</p>
                        <p class="p1"> 4874人评价 </p>
                        <p>179人晒单</p>
                    </div>
                </div>
            </div>
        `
        $("#buybox").html(htmlStr);
        // 放大镜  
        let oBox = document.getElementById("magnbox")
        let oImgBox = document.getElementById("img-box")
        let m1 = new Mirror(oBox, oImgBox, {
            width: 200,
            height: 200,
            img: src
        });
        //数量变化
        $("#btnAdd").click(function(){
            let Count=parseInt($("#count").val());
            Count++;
            if(Count>10){
                Count=10
            }
            $("#count").val(Count);
        })
        $("#btnReduce").click(function(){
            let Count=parseInt($("#count").val());
            Count--;
            if(Count<=0){
                Count=1
            }
            $("#count").val(Count);
        })
        //添加到购物车
        $("#btnAddShoppingCar").click(function(){
            addShoppingCar()
        }
        )
    }
    let username = getCookie("username");
    console.log(username)
    function addShoppingCar(){
        $.post("addShoppingCart.php",{
            "vipName":username,
            "goodsId":goodsId,
            "goodsCount":$("#count").val()
        },(data)=>{
            if(data==="1"){
                alert("添加成功")
            }else{
                alert("添加失败")
            }
        })
    }
    $(function () {
        getData();
    })
