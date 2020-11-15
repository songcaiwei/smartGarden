function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr]
    }
}

//用法：starMove(oDiv, {width:100,left:-300}, fn);     //fn写函数名就行，不加小括号，下面40行有调用了  //例子看“starMove用法.html”
function starMove(obj, json, fn){
    var Timer = null;
    clearInterval(obj.Timer);
    obj.Timer = setInterval(function(){
        var bTrue = true;
        for(var attr in json){
            var iCurr = 0;
            if(attr == "opacity"){
                iCurr = parseInt(parseFloat(getStyle(obj, attr)) * 100)
            } else {
                iCurr = parseInt(getStyle(obj, attr));
            }
            var iSpeed = 0;
            iSpeed = (json[attr] - iCurr) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(attr == "opacity"){
                obj.style.opacity = (iCurr + iSpeed) / 100;
                obj.style.filter = "alpha(opacity:" + iCurr + iSpeed + ")";
            } else {
                obj.style[attr] = iCurr + iSpeed + "px";
            }

            if(iCurr != json[attr]){
                bTrue = false;
            }
        }
        if(bTrue){
            console.log(1);
            clearInterval(obj.Timer);
            if(fn){
                fn();
            }
        }
    }, 30)
}