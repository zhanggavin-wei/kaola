function banner(counts, oImgs,objbox, OLi, oSpan,objul) {
    // 拆分
    // 定义变量保存当前图片的序号
    var ord = 0; //从0开始，0表示第一张图片；
    var myTimer;
    // 1、每隔一秒钟换一张图片（同时豆豆发生变化）
    function autoPlay() {
        myTimer = setInterval(function () {
            // 跳转到下一张图片
            goImg(ord + 1);
        }, 2000);
    }
    // 2、点击豆豆换图片     
    // 其实goImg函数就是显示指定的图片(让一张出去，让另外一张进来)
    function goImg(transOrd) { //4
        // 一、数据处理
        // 1、计算数据
        if (transOrd == ord) {
            return;
        }
        var outOrd = ord; //2
        ord = transOrd;
        //  2、边界处理
        if (ord < 0) {
            ord = counts;
        }
        if (ord > counts) {
            ord = 0;
        }

        //二、外观呈现
        // 1、图片进入和离开
        // 1）、出去
        mover03(oImgs[outOrd], "opacity", 0, 10);
        // 2）、进入
        mover03(oImgs[ord], "opacity", 1, 10);
        //   2、让豆豆的颜色发生变化
        // 1）、出去
        OLi[outOrd].style.backgroundColor = "#fff";
        // 2）、进入
        OLi[ord].style.backgroundColor = "red";
    }

    // 3、点击箭头换图片
    // 后退
    function backImg() {
        stopPlay();
        goImg(ord - 1);
    }

    // 前进
    function forwardImg() {
        stopPlay();
        goImg(ord + 1);
    }

    // 4、鼠标放上去停止，
    function stopPlay() {
        window.clearInterval(myTimer);
    }

    // 6、超链
    autoPlay();
    objbox.onmouseover = function () {
        stopPlay();
    }

    objbox.onmouseout = function () {
        autoPlay();
    }
    objul.onmouseover = function () {
        stopPlay();
    }

    objul.onmouseout = function () {
        autoPlay();
    }
    // 给每个豆豆绑定事件
    for (let i = 0; i < OLi.length; i++) {
        OLi[i].onclick = function () {
            goImg(i);
        }
    }

    // 左箭头绑定事件
    oSpan[0].onclick = backImg;
    // 右箭头绑定事件
    oSpan[1].onclick = forwardImg

}
function banner02(counts,oImgs,objbox){
    // 拆分
    // 定义变量保存当前图片的序号
    var ord = 0; //从0开始，0表示第一张图片；
    var myTimer;
    // 1、每隔一秒钟换一张图片（同时豆豆发生变化）
    function autoPlay() {
        myTimer = setInterval(function () {
            // 跳转到下一张图片
            goImg(ord + 1);
        }, 2000);
    }
    // 2、点击豆豆换图片     
    // 其实goImg函数就是显示指定的图片(让一张出去，让另外一张进来)
    function goImg(transOrd) { //4
        // 一、数据处理
        // 1、计算数据
        if (transOrd == ord) {
            return;
        }
        var outOrd = ord; //2
        ord = transOrd;
        //  2、边界处理
        if (ord < 0) {
            ord = counts;
        }
        if (ord > counts) {
            ord = 0;
        }

        //二、外观呈现
        // 1、图片进入和离开
        // 1）、出去
        mover03(oImgs[outOrd], "opacity", 0, 10);
        // 2）、进入
        mover03(oImgs[ord], "opacity", 1, 10);
        //   2、让豆豆的颜色发生变化
        // 1）、出去
        OLi[outOrd].style.backgroundColor = "#fff";
        // 2）、进入
        OLi[ord].style.backgroundColor = "red";
    }
    function stopPlay() {
        window.clearInterval(myTimer);
    }
    autoPlay()
    objbox.onmouseover = function () {
        stopPlay();
    }

    objbox.onmouseout = function () {
        autoPlay();
    }
}