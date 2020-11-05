
//areaDom: 代表轮播图区域
//options: 代表轮播图配置

function createBannerArea (areaDom ,options) {
    var imgArea = document.createElement('div'); //图片区域
    var numberArea = document.createElement('div'); //角标区域
    var curIndex = 0; //默认为0,当前显示的第几张幻灯片
    var changeTimer = null; //自动切换时的计时器
    var changeFrequency = 1000; //切换间隔时间
    var timer = null; //动画计时器

    initImgs();
    //初始化图片，局部函数，防止发生全局变量污染
    function initImgs() {
        imgArea.style.width = "100%";
        imgArea.style.height = "100%";
        imgArea.style.display = "flex";
        imgArea.style.overflow = "hidden";
        for (let i = 0;i < options.length;i++){
            var obj = options[i];
            var img = document.createElement('img');
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.margin = "0";
            img.style.cursor = "pointer";
            img.src = obj.imgUrl;
            img.addEventListener('click',function() {
                location.href = options[i].link;
            })
            imgArea.appendChild(img);
        }
        imgArea.addEventListener('mouseenter',function() {
            clearInterval(changeTimer)
            changeTimer = null;
        })
        imgArea.addEventListener('mouseleave', function () {
            autoChangeBanner();
        })
        areaDom.appendChild(imgArea);
    }

    initNumbers()
    // 显示角标
    function initNumbers() {
        numberArea.style.textAlign = "center";
        numberArea.style.marginTop = "-20px";
        for (let i = 0;i < options.length;i++) {
            var sp = document.createElement('span');
            sp.style.display = "inline-block";
            sp.style.width = "12px";
            sp.style.height = "12px";
            sp.style.backgroundColor = "lightgray";
            sp.style.borderRadius = "50%";
            sp.style.margin = "0 7px";
            sp.style.cursor = 'pointer';
            sp.addEventListener('click',function () {
                curIndex = i;
                setStatus();
            })
            numberArea.appendChild(sp);
        }
        areaDom.appendChild(numberArea);
    }
    // 或者利用闭包传递索引值
    // function initNumbers() {
    //     numberArea.style.textAlign = "center";
    //     numberArea.style.marginTop = "-20px";
    //     for (var i = 0;i < options.length;i++) {
    //         var sp = document.createElement('span');
    //         sp.style.display = "inline-block";
    //         sp.style.width = "12px";
    //         sp.style.height = "12px";
    //         sp.style.backgroundColor = "lightgray";
    //         sp.style.borderRadius = "50%";
    //         sp.style.margin = "0 7px";
    //         sp.style.cursor = 'pointer';
    //         (function (index) {
    //             sp.addEventListener('click',function () {
    //                 curIndex = index;
    //                 setStatus();
    //             })
    //         })(i)
    //         numberArea.appendChild(sp);
    //     }
    //     areaDom.appendChild(numberArea);
    // }

    setStatus();

    //设置区域状态
    function setStatus () {
        //设置角标背景
        for (let i = 0;i < numberArea.children.length; i++) {
            if (i === curIndex) {
                // 当前显示的图片与角标对应,为选中状态
                numberArea.children[i].style.backgroundColor = "#be926f";
            }else {
                numberArea.children[i].style.backgroundColor = "lightgray";
            }
        }

        var start = parseInt(imgArea.children[0].style.marginLeft);
        // 相应的显示图片
        var end = curIndex * -100;
        var dis = end - start;
        var during = 500;
        var speed = dis / during;

        if(timer){
            clearInterval(timer)
        }
        timer = setInterval(function () {
            start += speed * 20;
            imgArea.children[0].style.marginLeft = start + '%';
            if (Math.abs(end - start) < 1) {
                imgArea.children[0].style.marginLeft = end + '%';
                clearInterval(timer);
            }
        }, 20)
    }

    autoChangeBanner()

    // 自动切换轮播图
    function autoChangeBanner (){
        if (changeTimer) {
            return;
        }
        changeTimer = setInterval (function () {
           if (curIndex === options.length - 1) {
               curIndex = 0;
           } else{
               curIndex++;
           }
           setStatus();
        },changeFrequency)
    }
}