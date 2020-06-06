
// 在封装函数时，经常会封装通用的函数功能，也会封装特殊用途的函数
// 如：
// 一、以前封装运动函数时：
// 1、封装了通用的运动函数，支持各种运动（包括：水平移动，垂直运动，淡入淡出等等）
// 2、也封装了淡入淡出的函数
// 3、也封装了滑动函数

// 二、ajax封装：

// 1、ajaxFn函数，通用的ajax访问
// 2、getFn函数：只针对get请求，即如果是get请求,你就调用该函数就行（get请求是通用ajax请求的一种特殊情况）
// 3、postFn函数：只针对 post请求，即如果是post请求,你就调用该函数就行是（post请求是通用ajax请求的一种特殊情况）；

class Ajax{
    constructor(){
    }

    ajaxFn(obj){
        let defaultObj = {
            method:"get",
            url:"#",  //loadMore.php
            params:"",//"pageIndex=1"
            callback:null,//show
            isAsync:true
        };
        // 把参数obj和defaultObj进行合并
        for(let key in obj){
            defaultObj[key] = obj[key];
        }
        // ajax步骤
        // 1、创建对象
        let xhr = new XMLHttpRequest();
        // 2、设置请求的参数（请求方式，请求地址，请求参数，是否异步）
        // 1）、处理请求地址和参数
        let urlAndParams = defaultObj.url;
        if(defaultObj.method.toLowerCase()=="get" && defaultObj.params!=""){
            urlAndParams += "?"+defaultObj.params;
        }     
        xhr.open(defaultObj.method,urlAndParams,defaultObj.isAsync);
    
        // 3、设置回调函数
        // xhr.onreadystatechange = function(){
        // if(xhr.readyState==4 && xhr.status==200){
        //         // &&运算符的运算规则； 
        //         // 同真为真，即：前面的表达式为真，那么还需要看看后面的表达式结果。
        //         // 一假为假：前面的表达式结果是假；那么后面的表达式就不参与运算了。
        //         // 此时的callback是show
        //         defaultObj.callback && defaultObj.callback(xhr.responseText);
        //     }
        // }

        // onload触发时，readyState的值已经是4了。
        xhr.onload = function(){
            if(xhr.status==200){
                // &&运算符的运算规则； 
                // 同真为真，即：前面的表达式为真，那么还需要看看后面的表达式结果。
                // 一假为假：前面的表达式结果是假；那么后面的表达式就不参与运算了。
                // 此时的callback是show
                defaultObj.callback && defaultObj.callback(xhr.responseText);
            }
        }
    
        // 4、发送请求
        if(defaultObj.method.toLowerCase()=="get"){
            xhr.send();
        }else if(defaultObj.method.toLowerCase()=="post"){
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send(defaultObj.params);
        }
    
    }


}