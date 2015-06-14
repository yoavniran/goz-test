$(function () {
    
    function init() {
        doIntoAnimation();
        registerEvents();
    }

    function registerEvents() {

        $(".main-menu-item").click(onMenuItemClick);

    }

    function doIntoAnimation() {
        setTimeout(function () {

            var bgImgFilter = "blur(6px) contrast(130%)";
            $("#bgimg").css({ "-webkit-filter": bgImgFilter, "filter": bgImgFilter });
            $("footer").css("opacity", "1");

        }, 200);
    }

    function onMenuItemClick() {

        console.log(this);


    }


    init();
});