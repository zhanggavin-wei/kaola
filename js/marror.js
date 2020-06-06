// 类：放大镜

function Mirror(oBox, oImgBox, obj) {
    // DOM相关的属性：
    this.oBox = oBox;
    this.oImgBox = oImgBox;

    //属性的默认值：
    let defaultObj = {
        width: 80,
        height: 120,
        multiple: 2,
        color: "red",
        opacity: 0.3,
        left: 0,
        top: 0,
        imgs: "./images/magnifier01"
    }

    // 先把传入的数据（obj）赋给defaultObj; 这是最终的对象的属性值；
    for (let key in obj) {
        defaultObj[key] = obj[key];
    }

    // 把defaultObj里的所有的属性赋给this
    for (let key in defaultObj) {
        this[key] = defaultObj[key];
    }

    this.createDom();
    this.addEvent();
}

// 方法
// 1、创建dom的方法（就是HTML和CSS代码）
Mirror.prototype.createDom = function () {
    let htmlStr = "";

    // 1、放大镜的html代码；
    htmlStr += `
            <div style="
                        position: absolute;
                        left: ${this.left}px;
                        top: ${this.top}px;
                        width: ${this.width}px;
                        height:${this.height}px;
                        background-color: ${this.color};
                        opacity: ${this.opacity};
                        display:none;
            ">
            </div>
        `;
    // 2、可视（放大的效果）
    let boxWidth = this.oBox.offsetWidth;
    let boxHeight = this.oBox.offsetHeight;
    htmlStr += `
            <div style="
                        position: absolute;
                        left: ${boxWidth + 20}px;
                        top: 0;
                        width: ${this.width * this.multiple}px;
                        height: ${this.height * this.multiple}px;
                        border: 1px solid pink;
                        background-image: url(${this.img});
                        background-size: ${boxWidth * this.multiple}px ${boxHeight * this.multiple}px;
                        background-position: -${this.left * this.multiple}px -${this.top * this.multiple}px;
                        display:none;
            ">
            </div>        
        `;

    // 把拼接好的html字符串放到盒子里
    this.oBox.innerHTML = htmlStr;

}


// 2、绑定事件（给盒子绑定onmousemove事件）
Mirror.prototype.addEvent = function () {
    //放大镜： 倒数第二个孩子
    let oMirrorBox = this.oBox.lastElementChild.previousElementSibling;
    // 可视div：倒数第一个孩子
    let oShowBox = this.oBox.lastElementChild;

    // 1、给大盒子增加事件
    this.oBox.onmouseenter = function () {
        oMirrorBox.style.display = "block";
        oShowBox.style.display = "block";
    }

    this.oBox.onmouseleave = function () {
        oMirrorBox.style.display = "none";
        oShowBox.style.display = "none";
    }

    // 2、放大效果       

    let boxOffsetLeft = this.oBox.offsetLeft;
    let boxOffsetTop = this.oBox.offsetTop;
    let boxWidth = this.oBox.offsetWidth;
    let boxHeight = this.oBox.offsetHeight;

    this.oBox.onmousemove = (event) => {
        let e = event || window.event;
        // 一、数据处理
        //1、计算
        this.left = e.pageX - boxOffsetLeft - this.width / 2;
        this.top = e.pageY - boxOffsetTop - this.height / 2;

        // 2、处理边界
        if (this.left < 0) {
            this.left = 0;
        } else if (this.left + this.width > boxWidth) {
            this.left = boxWidth - this.width;
        }

        if (this.top < 0) {
            this.top = 0;
        } else if (this.top + this.height > boxHeight) {
            this.top = boxHeight - this.height;
        }

        // 二、外观呈现
        // 1、移动放大镜
        oMirrorBox.style.left = this.left + "px";
        oMirrorBox.style.top = this.top + "px";

        // 2、改变show-box的背景图片的位置
        oShowBox.style.backgroundPosition = `-${this.left * this.multiple}px -${this.top * this.multiple}px`;
    }

    // 3、给下面的图片列表增加事件
    let oLis = this.oImgBox.children;
    for (let i = 0; i < oLis.length; i++) {
        // 
        oLis[i].onmouseover = () => {
            // 改变img属性的值
            this.img = oLis[i].firstElementChild.src;
            // 大盒子背景图片
            this.oBox.style.backgroundImage = `url(${this.img})`;
            // 可视部分的背景图片
            oShowBox.style.backgroundImage = `url(${this.img})`;
        }
    }
}

