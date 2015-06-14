$(function () {
    
    function init() {
        doIntoAnimation();
        registerEvents();
    }

    function registerEvents() {

        $(".main-menu-item").click(onMenuItemClick);
        $("#mobile-menu").click(onMobileMenuClick);
    }

    function doIntoAnimation() {
        setTimeout(function () {

            var bgImgFilter = "blur(6px) contrast(60%) drop-shadow(16px 16px 10px rgb(159, 92, 231)) ";
            $("#bgimg").css({ "-webkit-filter": bgImgFilter, "filter": bgImgFilter });
            $(".intro-delayed").css("opacity", "1");

        }, 200);
    }

    function onMenuItemClick() {

        console.log(this);


    }

    function onMobileMenuClick() {
        console.log("mobile click!");
    }

    init();
});