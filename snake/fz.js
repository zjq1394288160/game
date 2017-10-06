/**
 * Created by qingqing on 2017/6/22.
 */
    function $(selector,flag=true) {
        if(typeof selector=='function'){
            window.onload=function (){
                selector();
            }
        }else  if(typeof selector=='string'){
           if(selector.startsWith('<')&&selector.endsWith('>')){
               return document.createElement(selector.slice(1,-1));
           }else {
               if(flag){
                   return document.querySelectorAll(selector);

               }else{
                   return document.querySelector(selector);
               }
           }

        }
    }





//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
    if(parent.contains){
        return parent.contains(child) && parent!=child;
    }else{
        return (parent.compareDocumentPosition(child)===20);
    }
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
    if(getEvent(e).type=="mouseover"){
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
    }else{
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
    if(overfun){
        obj.onmouseover=function  (e) {
            if(checkHover(e,obj)){
                overfun.call(obj,[e]);
            }
        }
    }
    if(outfun){
        obj.onmouseout=function  (e) {
            if(checkHover(e,obj)){
                outfun.call(obj,[e]);
            }
        }
    }
}
function getEvent (e) {
    return e||window.event;
}


//cookie
function setCookie(key,value,time) {
    if(time){
        let now=new Date();
        now.setTime(now.getTime()+20000);
        document.cookie=key+"="+value+";expires="+now.toGMTString();
        // a+"ghghghg"+b
    }else {
        document.cookie=key+"="+value;
    }
}

function getCookie(key) {
    var cookies = document.cookie;
    var arr = cookies.split('; ');
    console.log(arr)
    for(let i = 0; i < arr.length; i++){
        var brr = arr[i].split('=');
        if(brr[0]==key){
            return brr[1];
        }
    }
    return false;
}

function delCookie(key) {
    let now = new Date();
    now.setTime(now.getTime()-1);
    document.cookie=key+'=1111;expires'+now.toGMTString();
}