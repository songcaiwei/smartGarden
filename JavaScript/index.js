window.onload=function(){
    //计算底部的友情链接，7个一行，最左边的元素的marginleft值等于0
    (function(){
        var oFriendship = document.getElementsByClassName("friendship_link")[0];
        var aLi = oFriendship.getElementsByTagName("li");
        for(var i=0,len=aLi.length; i<len; i++){
            aLi[i].index =i ;
            //alert(aLi[i].index)
            if((aLi[i].index%7)==0){
                aLi[i].style.marginLeft = 0;
            }
        }
    })();

    /*菜单控制*/
    var aMenu_list = document.getElementsByClassName('menu_list');
    var aRow = document.getElementsByClassName('row');
    //alert(aRow[1].offsetHeight)
    var rowH=[];
    for(var i=0,len=aMenu_list.length; i<len; i++){
        rowH.push(aRow[i].offsetHeight)
    }
    for(var i=0,len=aMenu_list.length; i<len; i++){
        aRow[i].style.height = 0 + 'px';
        aRow[i].style.top = 46 + 'px';
    }
    //alert(rowH)

    for(var i=0,len=aMenu_list.length; i<len; i++){
        //展开收起
        aMenu_list[i].index = i;
        aMenu_list[i].onmouseover = function(){
            var iMenu = this.index;
            starMove(aRow[iMenu],{height:rowH[iMenu]});
        }
    }
    for(var i=0,len=aMenu_list.length; i<len; i++){
        //展开收起
        aMenu_list[i].onmouseout = function(){
            var iMenu = this.index;
            starMove(aRow[iMenu],{height:0});

        }
    }
    /*for(var i=0,len=aMenu_list.length; i<len; i++){
        //显示和隐藏
        aMenu_list[i].index = i;
        aMenu_list[i].onmouseover = function(){
            var iMenu = this.index;
            for(var i=0,len=aMenu_list.length; i<len; i++){
                aMenu_list[i].style.background = '#0089cc';
                aRow[i].style.display = 'none';
            }
            this.style.background = '#26b3f2';
            aRow[iMenu].style.display = 'block';
        }
        aMenu_list[i].onmouseout = function(){
            var iMenu = this.index;
            for(var i=0,len=aMenu_list.length; i<len; i++){
                aRow[i].style.display = 'none';
                aMenu_list[i].style.background = '#0089cc';
            }
        }

    }
    */
    /*首页banner滚动*/
    var oBanner_img = document.getElementById('banner_img');
    var aBannerLi = oBanner_img.getElementsByTagName('li');
    var oBanner_dot = document.getElementById('banner_dot');
    var oBanner = document.getElementById('banner');
    var oPrev = document.getElementById('prev');
    var oNext =document.getElementById('next');
    var iNow = 0;
    oBanner_img.innerHTML += oBanner_img.innerHTML;
    oBanner_img.style.width = aBannerLi[0].offsetWidth*aBannerLi.length + 'px';
    for(var i=0,len=aBannerLi.length/2; i<len; i++){
        var oDot = document.createElement('li');
        oBanner_dot.appendChild(oDot)
    }

    var aDot = oBanner_dot.getElementsByTagName('li');
    aDot[0].style.background = '#0089cc';

    /*点击白点*/
    for(var i=0,len=aDot.length; i<len; i++){
        aDot[i].index = i;
        aDot[i].onclick = function(){
            iNow = this.index-1;
            bannerScroll();
        }
    }

    oNext.onclick=function(){
        bannerScroll();
    }
    oPrev.onclick=function(){
        if(iNow<=0){
            iNow = aBannerLi.length/2-1;
            oBanner_img.style.left = -1920*(iNow+1) + 'px';
        }else{
            iNow--;
        }
        starMove(oBanner_img,{left:-1920*iNow})
        changeColor();
    }

    /*开始滚动、鼠标移入停止*/
    var timer = null;
    oBanner.onmouseover = function(){
        clearInterval(oBanner_img.timer);
        starMove(oNext,{opacity : 100});
        starMove(oPrev,{opacity : 100});

    }
    oBanner.onmouseout = function(){
        oBanner_img.timer=setInterval(bannerScroll,3000);
        starMove(oNext,{opacity : 0});
        starMove(oPrev,{opacity : 0});
    }
    oBanner_img.timer=setInterval(bannerScroll,3000)


    function bannerScroll(){
        /*banner滚动*/
        if(iNow>aBannerLi.length/2-1){
            oBanner_img.style.left = 0 + 'px';
            iNow=1;
        }else {
            iNow++;
        }
        starMove(oBanner_img,{left:-1920*iNow})

        /*白点变蓝*/
        changeColor();
    }
    /*白点变蓝*/
    function changeColor(){
        for(var i=0,len=aDot.length; i<len; i++){
            aDot[i].style.background = '#ffffff';
        }
        if(iNow>aBannerLi.length/2-1){
            aDot[0].style.background = '#0089cc';
        }else{
            aDot[iNow].style.background = '#0089cc';
        }
    }


    /*新闻图片滚动*/
    var oNewsLeft = document.getElementById('newsLeft');
    var aImg = oNewsLeft.getElementsByTagName('img');
    var aDd = oNewsLeft.getElementsByTagName('dd');
    var oBtnLeft = document.getElementById('btnLeft');
    var oBtnRight = document.getElementById('btnRight');
    //alert(aImg[0])
    var timernews = null;
    var iNews = 0;
    aImg[0].style.opacity = 1;
    aImg[0].style.filter = "alpha(opacity:"+100+")";
    aDd[0].style.opacity = 1;
    aDd[0].style.filter = "alpha(opacity:"+100+")";
    aDd[0].style.bottom = 0 + 'px';
    timernews = setInterval(newsMove,3000);

    oNewsLeft.onmouseover = function(){
        clearInterval(timernews);
        starMove(oBtnLeft,{left:30})
        starMove(oBtnRight,{right:30})
    }
    oNewsLeft.onmouseout = function(){
        timernews = setInterval(newsMove,3000);
        starMove(oBtnLeft,{left:-40})
        starMove(oBtnRight,{right:-40})
    }

    oBtnRight.onclick = function(){
        newsMove();
    }
    oBtnLeft.onclick = function(){
        if(iNews>0){
            iNews--;
        }else {
            iNews = aImg.length-1;
        }

        for(var i=0,len=aImg.length; i<len; i++){
            starMove(aImg[i],{opacity:0})
            //alert(1)
        };
        if(iNews==aImg.length-1){
            //alert(3)
            starMove(aDd[0],{bottom:-40,opacity:0});
        }else {
            starMove(aDd[iNews+1],{bottom:-40,opacity:0});
        };
        starMove(aDd[iNews],{bottom:0,opacity:100});

        starMove(aImg[iNews],{opacity:100});

        for(var i=0,len=aImg.length; i<len; i++){
            if(parseFloat(aDd[i].style.bottom) <= 0){
                aDd[i].style.bottom = 40 + 'px';
                aDd[i].style.opacity = 0;
                aDd[i].style.filter = "alpha(opacity:"+0+")";
                //alert(2)
            }
        }
    }



    /*切换新闻图片显示隐藏的函数*/
    function newsMove(){
        if(iNews<aImg.length-1){
            iNews++;
        }else {
            iNews=0;
        };
        news();
    }
    function news(){
        for(var i=0,len=aImg.length; i<len; i++){
            starMove(aImg[i],{opacity:0})
            //alert(1)
        };
        if(iNews==0){
            //alert(3)
            starMove(aDd[aImg.length-1],{bottom:40,opacity:0});
        }else {
            starMove(aDd[iNews-1],{bottom:40,opacity:0});
        };
        starMove(aDd[iNews],{bottom:0,opacity:100});

        starMove(aImg[iNews],{opacity:100});

        for(var i=0,len=aImg.length; i<len; i++){
            if(parseFloat(aDd[i].style.bottom) >= 40){
                aDd[i].style.bottom = -40 + 'px';
                aDd[i].style.opacity = 0;
                aDd[i].style.filter = "alpha(opacity:"+0+")";
                //alert(2)
            }
        }
    };


    /*点击登录弹出登录层*/
    var oRightBar = document.getElementsByClassName('rightBar')[0];
    var oLogin_wrap = document.getElementById('login_wrap');
    var aLoginBar = oRightBar.getElementsByTagName('span');
    var oLogin = document.getElementsByClassName('login')[0];
    var timerLogin = null;
    var oCloseLogin = document.getElementsByClassName('close_login')[0];

    var saomaH = 0;
    var usernameH = 0;
    var registerH = 0;
    var successH = 0;
    var other_loginH = 0;
    aLoginBar[0].onclick = function(){
        oLogin_wrap.style.display = 'block';

        /*打开之前先获取切换元素高度*/
        saomaH = oSaoma_login.offsetHeight;
        usernameH = oUsername_login.offsetHeight;
        registerH = oRegister.offsetHeight;
        successH = oSuccess_login.offsetHeight;
        other_loginH = oOther_login.offsetHeight;
        //alert(saomaH + '||' + usernameH)
        //oUsername_login.style.opacity = 0;
        //oSaoma_login.style.height = 0 + 'px';
        oUsername_login.style.height = 0 + 'px';
        oRegister.style.height = 0 + 'px';
        oSuccess_login.style.height = 0 + 'px';

        oLogin.style.transform = 'scale(0)';
        var largenNum = 0;
        timerLogin = setInterval(function(){
            if(largenNum>=1){
                clearInterval(timerLogin);
            }else {
                largenNum +=0.05;
            }
            oLogin.style.transform = 'scale('+largenNum+')';
        },20)
    }

    oCloseLogin.onclick = function(){
        /*关闭之前得把登录方式的高度还原，不然不刷新页面再打开登陆界面可就高度为0了*/
        oSaoma_login.style.height = saomaH + 'px';
        oUsername_login.style.height = usernameH + 'px';
        oRegister.style.height = registerH + 'px';
        oSuccess_login.style.height = successH + 'px';
        oOther_login.style.height = other_loginH + 'px';
        aSpan[1].style.display = 'none';
        aSpan[0].style.display = 'block';

        oLogin_wrap.style.display = 'none';
    }


    /*登录方式切换*/
    var oSaoma_login = document.getElementById('saoma_login');
    var oUsername_login = document.getElementById('username_login');
    var oRegister = document.getElementById('register');
    var oSuccess_login = document.getElementById('success_login');
    var oOther_login = document.getElementById('other_login');
    var aSpan = oOther_login.getElementsByTagName('span');
    var oBack_login = document.getElementById('back_login');


    aSpan[0].onclick = function(){
        oUsername_login.style.height = usernameH + 'px';
        oSaoma_login.style.height = 0 + 'px';
        oSuccess_login.style.height = 0 + 'px';

        aSpan[1].style.display = 'block';
        aSpan[0].style.display = 'none';

    }
    aSpan[1].onclick = function(){
        oSuccess_login.style.height = 0 + 'px';
        oUsername_login.style.height = 0 + 'px';
        oSaoma_login.style.height = saomaH + 'px';

        aSpan[1].style.display = 'none';
        aSpan[0].style.display = 'block';

    }
    aSpan[2].onclick = function(){
        oUsername_login.style.height = 0 + 'px';
        oSaoma_login.style.height = 0 + 'px';
        oRegister.style.height = registerH + 'px';
        oSuccess_login.style.height = 0 + 'px';

        oOther_login.style.height = 0 + 'px';

    }
    oBack_login.onclick = function(){
        oRegister.style.height = 0 + 'px';
        oSuccess_login.style.height = 0 + 'px';
        oOther_login.style.height = other_loginH + 'px';
        oSaoma_login.style.height = saomaH + 'px';
    }




    /*ajax验证用户名密码*/
    //定义一个$方法，通过id获取DOM元素
    function $(id) {
        return document.getElementById(id);
    }

    var oVerity_name = document.getElementById('verity_name');
    var oVerity_password = document.getElementById('verity_password');


    var xmlhttp;

    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
        //alert(xmlhttp);
    }else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    };

    /*function checkName(){
        if(xmlhttp){
            /!*用post方法的时候，地址就不需要带数据，数据可以单独写在下面*!/
            var url="/smartGarden/php/verify_username.php";
            var data="username="+$("username").value;
            xmlhttp.open('POST',url,true);
            xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");      //post是要加这句话

            xmlhttp.onreadystatechange=function () {

                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    //alert('数据已返回')

                    oVerity_name.innerText=xmlhttp.responseText;

                }
            };
            xmlhttp.send(data);

        }
    }*/

    /*function checkName(){
        if(xmlhttp){
            /!*用post方法的时候，地址就不需要带数据，数据可以单独写在下面*!/
            var url="/smartGarden/php/verify_username1.php";
            var data="username="+$("username").value+"&password="+$("password").value;
            xmlhttp.open('POST',url,true);
            xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");      //post是要加这句话
            xmlhttp.onreadystatechange=function () {
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    //alert(xmlhttp.responseText)
                    var jsonData=eval("("+xmlhttp.responseText+")");
                    oVerity_name.innerText=jsonData.nameRes;
                    //oVerity_password.innerText=jsonData.paswdRes;
                }
            };
            xmlhttp.send(data);

        }
    }*/
    /*function checkPassword(){
        if(xmlhttp){
            var url="/smartGarden/php/verify_username1.php";
            var data="username="+$("username").value+"&password="+$("password").value;
            xmlhttp.open('POST',url,true);
            xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlhttp.onreadystatechange=function () {
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    //alert(xmlhttp.responseText)
                    var jsonData=eval("("+xmlhttp.responseText+")");
                    //oVerity_name.innerText=jsonData.nameRes;
                    oVerity_password.innerText=jsonData.paswdRes;
                }
            };
            xmlhttp.send(data);

        }
    }
*/



    function submit_msg(url,fn){
        if(xmlhttp){
            /*用post方法的时候，地址就不需要带数据，数据可以单独写在下面*/
            var url=url;
            var data="username="+$("username").value+"&password="+$("password").value;
            xmlhttp.open('POST',url,true);
            xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlhttp.onreadystatechange=fn;
            xmlhttp.send(data);
        }
    }


    $("username").oninput = function(){
        if(!$("username").value){
            oVerity_name.innerText='中英文均可，最长为14个英文或7个汉字';
        }else {
            submit_msg("/smartGarden/php/verify_username.php",function () {
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    //alert(xmlhttp.responseText)
                    var jsonData=eval("("+xmlhttp.responseText+")");
                    oVerity_name.innerText=jsonData.nameRes;
                    //oVerity_password.innerText=jsonData.paswdRes;
                }
            });
        }
    }

    $("password").oninput = function(){
        if(!$("password").value){
            oVerity_password.innerText='长度为6~16个字符，字母、数字及标点符号均可';
        }else{
            submit_msg("/smartGarden/php/verify_username.php",function () {
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    //alert(xmlhttp.responseText)
                    var jsonData=eval("("+xmlhttp.responseText+")");
                    //oVerity_name.innerText=jsonData.nameRes;
                    oVerity_password.innerText=jsonData.paswdRes;
                }
            });
        }
    }

    $('now_register').onclick = function(){
        if($("username").value == "" || $("password").value == ""){
            return;
        }
        submit_msg("/smartGarden/php/add_data.php",function do_data() {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                var jsonData=eval("("+xmlhttp.responseText+")");
                console.log(jsonData)
                if(jsonData.register_num==0){
                    oVerity_name.innerText=jsonData.success_failure;
                }else{
                    $('success_msg').innerText = jsonData.success_failure;
                    oUsername_login.style.height = 0 + 'px';
                    oSaoma_login.style.height = 0 + 'px';
                    oRegister.style.height = 0 + 'px';
                    oSuccess_login.style.height = successH + 'px';
                    oOther_login.style.height = 0 + 'px';
                    $("username").value = "";
                    $("password").value = "";
                    oVerity_password.innerText="长度为6~10个字母、数字均可";
                    oVerity_name.innerText="支持字母或者字母和数字的组合，不能为纯数字";
                }


            }
        });
    }


    //把天气插件放到页面顶端
    var iweather = document.getElementsByClassName('weather')[0];
    (function (){
        iweather.innerHTML = '<iframe allowtransparency="true" frameborder="0" width="410" height="64" scrolling="no" src="http://tianqi.2345.com/plugin/widget/index.htm?s=2&z=3&t=1&v=2&d=2&bd=0&k=&f=&ltf=009944&htf=cc0000&q=0&e=1&a=1&c=54511&w=410&h=64&align=center"></iframe>';
    })();

}

