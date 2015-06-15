$("document").ready(function () {

    var siteContent = {
            about: {
                title: "אודותנו",
                textElement: "#about-content"
            }
        },

        ui = {},
        selectedContent = null,
        mobileMenuItemsCopied = false;

    function init() {
        doIntroAnimation();
        initUi();
        copyMobileMenuItems();
        registerEvents();

        $("#screen-res").append("height=" + screen.height + " - width=" + screen.width);
    }

    function copyMobileMenuItems() {

        if (!mobileMenuItemsCopied) {
            var items = ui.menuItems.clone();

            items.addClass("mobile");
            items.appendTo(ui.mobileMenuItems);

            ui.menuItems = ui.menuItems.add(items);

            mobileMenuItemsCopied = true;
        }
    }

    function initUi() {
        ui.menuItems = $(".main-menu-item");
        ui.mobileMenuItems = $("#mobile-menu-items");
        ui.mobileMenuContainer = $("#mobile-menu-container");
        ui.contentTitle = $("#page-content-container h2");
        ui.homeContent = $("#home-content-container");
        ui.mobileMenu = $("#mobile-menu");
    }

    function registerEvents() {

        ui.menuItems.click(onMenuItemClick);
        ui.mobileMenu.click(onMobileMenuClick);

        $("#site-logo").click(onLogoClick);
        $("body").click(onBodyClick);
    }

    function doIntroAnimation() {
        setTimeout(function () {

            var bgImgFilter = "blur(6px) contrast(60%) drop-shadow(16px 16px 10px rgb(159, 92, 231)) ";
            $("#bgimg").css({"-webkit-filter": bgImgFilter, "filter": bgImgFilter});

            toggleDelayedElement(".intro-delayed", true);

        }, 200);
    }  

    function toggleDelayedElement(selector, show, quickHide){
        selector = (selector instanceof jQuery) ? selector : $(selector);

        if (quickHide) {
        	selector.hide();
        	setTimeout(function () {
        		selector.show();
        	}, 1);
        }
		
		selector.toggleClass("delayed-visible", show);
    }

    function onBodyClick(e) {
        var target = e.target || e.srcElement;

        if (target !== ui.mobileMenu[0]) {
        	ui.mobileMenuContainer.toggleClass("mobile-menu-open", false);
        	e.stopPropagation();
        }
    }

    function onMenuItemClick() {
      
        var contentId = this.dataset.menuItem;

        setActiveMenuItem(contentId);
        showPageContent(contentId);
    }

    function setActiveMenuItem(contentId) {

        ui.menuItems.each(function (idx, item) {

            if (item.dataset.menuItem === contentId) {
                item.classList.add("active");
            }
            else {
                item.classList.remove("active");
            }
        });
    }

    function showPageContent(contentId) {
        var contentItem = siteContent[contentId];

        if (contentItem) {
            toggleDelayedElement(ui.homeContent, false);
            toggleDelayedElement("#page-container", true);

            ui.contentTitle.text(contentItem.title);
            selectedContent = $(contentItem.textElement);
            toggleDelayedElement(selectedContent, true);
        }
        else {
            console.error("couldnt find content item: " + contentId);
        }
    }

    function onMobileMenuClick(e) {
    	ui.mobileMenuContainer.toggleClass("mobile-menu-open");

    	e.stopPropagation();
    }

    function onLogoClick() {
        toggleDelayedElement(ui.homeContent, true);
        toggleDelayedElement("#page-container", false, true);
        setActiveMenuItem(null);
    }

    init();
});