// 头部
let Ma = document.getElementById("ma");
Ma.onmouseover = function () {
    this.lastElementChild.style.display = "block";
}
Ma.onmouseout = function () {
    this.lastElementChild.style.display = "none";
}
let topLink = document.getElementsByClassName("wo");
for (let i = 0; i < topLink.length - 1; i++) {
    topLink[i].onmouseover = function () {
        this.lastElementChild.previousElementSibling.style.transform = "rotate(180deg)";
        this.lastElementChild.style.display = "block";
    }
    topLink[i].onmouseout = function () {
        this.lastElementChild.previousElementSibling.style.transform = "rotate(360deg)";
        this.lastElementChild.style.display = "none";
    }
}
// logo
//nav
let Links = document.getElementsByClassName("navlinks");
for (let i = 0; i < Links.length; i++) {
    Links[i].onmouseover = function () {
        this.lastElementChild.style.display = "block";
    }
    Links[i].onmouseout = function () {
        this.lastElementChild.style.display = "none";
    }
}
