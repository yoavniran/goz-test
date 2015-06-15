(function (win) {
	var doc = win.document;

	// If there's a hash, or addEventListener is undefined, stop here
	if (!win.navigator.standalone && !location.hash && win.addEventListener) {

		//scroll to 1
		win.scrollTo(0, 1);
		var scrollTop = 1,
			getScrollTop = function () {
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function () {
				if (doc.body) {
					clearInterval(bodycheck);
					scrollTop = getScrollTop();
					win.scrollTo(0, scrollTop === 1 ? 0 : 1);
				}
			}, 15);

		win.addEventListener("load", function () {
			setTimeout(function () {
				//at load, if user hasn't scrolled more than 20 or so...
				if (getScrollTop() < 20) {
					//reset to hide addr bar at onload
					win.scrollTo(0, scrollTop === 1 ? 0 : 1);
				}
			}, 0);
		}, false);
	}
})(this);

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

     //   enableFullScreen();
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

    function enableFullScreen() {
    	window.scrollTo(0, 1);
    	//if (!document.fullscreenElement &&    // alternative standard method
		//	!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
    	//	if (document.documentElement.requestFullscreen) {
    	//		document.documentElement.requestFullscreen();
    	//	} else if (document.documentElement.msRequestFullscreen) {
    	//		document.documentElement.msRequestFullscreen();
    	//	} else if (document.documentElement.mozRequestFullScreen) {
    	//		document.documentElement.mozRequestFullScreen();
    	//	} else if (document.documentElement.webkitRequestFullscreen) {
    	//		document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    	//	}
    	//}
    	//else {
    	//	if (document.exitFullscreen) {
    	//		document.exitFullscreen();
    	//	} else if (document.msExitFullscreen) {
    	//		document.msExitFullscreen();
    	//	} else if (document.mozCancelFullScreen) {
    	//		document.mozCancelFullScreen();
    	//	} else if (document.webkitExitFullscreen) {
    	//		document.webkitExitFullscreen();
    	//	}
    	//}
    }

    init();
});