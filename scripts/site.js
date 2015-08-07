$("document").ready(function () {

	var ui = {
        	selectedContent : null
        },        
        mobileMenuItemsCopied = false,
		selectedContentId, siteContent;

	function init() {
		initSiteContent();
		doIntroAnimation();
		initUi();
		copyMobileMenuItems();
		registerEvents();

		//$("#screen-res").append("height=" + screen.height + " - width=" + screen.width);
	}

	function initSiteContent() {

		siteContent = {
			about: {
				title: "על גוזלי",
				textElement: "#about-content"
			},
			mandu: {
				title: "מונטסורי ויונג",
				textElement: "#mandu-content"
			},
			aboutus: {
				title: "קצת עלינו",
				textElement: "#us-content"
			},
			meals: {
				title: "מה אוכלים",
				textElement: "#meals-content"
			},
			vacations: {
				title: "לוח חופשות",
				textElement: "#vacations-content"
			},
			day: {
				title: "פעילות הפעוטון",
				textElement: "#day-content"
			},
			contact: {
				title: "צור קשר",
				textElement: "#contact-content"
			}
		};
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
		ui.overlay = {
			container:   $("#overlay"),
			content: $("#overlay #overlay-content"),
			close: $("#overlay #overlay-close")
		};

		ui.pageContentContainer = $("#page-content-container");
		ui.menuItems = $(".main-menu-item");
		ui.mobileMenuItems = $("#mobile-menu-items");
		ui.mobileMenuContainer = $("#mobile-menu-container");
		ui.contentTitle = $("#page-content-container h2");
		ui.homeContent = $("#home-content-container");
		ui.mobileMenu = $("#mobile-menu");
		ui.contactButton = $(".phone-container");
		ui.contactMap = $("#contact-map-img");
	}

	function registerEvents() {

		ui.menuItems.click(onMenuItemClick);
		ui.mobileMenu.click(onMobileMenuClick);
		ui.contactButton.click(onContactClick);
		ui.contactMap.click(onContactMapClick);

		ui.overlay.close.click(onOverlayCloseClick);

		$("#site-logo").click(onLogoClick);
		$("body").click(onBodyClick);
	}

	function doIntroAnimation() {
		setTimeout(function () {

			var bgImgFilter = "blur(6px) contrast(60%) drop-shadow(6px 10px 4px rgb(20, 220, 55)) ";
			$("#bgimg").css({ "-webkit-filter": bgImgFilter, "filter": bgImgFilter });

			toggleDelayedElement(".intro-delayed", true);

		}, 200);
	}

	function toggleDelayedElement(selector, show, quickHide) {
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

	function onContactClick(){
		onMenuItemClick.call(this);
	}

	function onMenuItemClick() {

		var contentId = this.dataset.menuItem;
		
		showPageContent(contentId);
		setActiveMenuItem(contentId);
	}

	function showOverlay(contentId, content){

		if (ui.overlay.content.data("contentId")!== contentId){
			ui.overlay.content
			.data("contentId", contentId)
			.html(content);
		}	

		ui.overlay.container.css({"opacity": "1", "left": "0", "width": "100%"});
	}

	function hideOverlay(){

		ui.overlay.container.css({"opacity": "0", "left": "-110px", "width": "100px"}); //, "width": "100%"});

	}

	function onContactMapClick(){

			showOverlay("contactMap", "<span class=\"map-loading\">טוען...</span><iframe " 
						  + "width=\"300\" "  
						  + "height=\"150\" "
						  + "frameborder=\"0\" " 
						  + "src=\"https://www.google.com/maps/embed/v1/place?key=AIzaSyDy2owgl0qFFsLhcSyyFDW_YqsOuhynzWg&q=Neve Amirim, Hertsliya&zoom=15\" allowfullscreen> " 
						+ "</iframe>");

			var mapLoadingIndicator = ui.overlay.content.find(".map-loading").css("font-size", "2em");
			
			$("#overlay iframe").on("load", function(){
				mapLoadingIndicator.remove();
			});
	}

	function onOverlayCloseClick(){
		hideOverlay();
	}

	function setActiveMenuItem(contentId) {

		if (selectedContentId) {
			ui.pageContentContainer.removeClass("active-content-" + selectedContentId); //remove previous
		}

		ui.menuItems.each(function (idx, item) {

			if (item.dataset.menuItem === contentId) {

				ui.pageContentContainer.addClass("active-content-" + contentId);
				item.classList.add("active");
			}
			else {
				item.classList.remove("active");
			}
		});

		selectedContentId = contentId;
	}	

	function showPageContent(contentId) {

		var contentItem = siteContent[contentId],
			alreadyShowingContent = !!ui.selectedContent;

		if (contentItem) {

			hideSelectedContent(alreadyShowingContent);

			if (!alreadyShowingContent) {
				toggleDelayedElement(ui.homeContent, false);
				toggleDelayedElement("#page-container", true);
			}

			ui.contentTitle.text(contentItem.title);
			ui.selectedContent = $(contentItem.textElement);
			ui.selectedContent.toggleClass("content-visible", true);

			ga("send", "pageview",{page: "/"+contentId, title: contentItem.title});

			toggleDelayedElement(ui.selectedContent, true);
		}
		else {
			console.error("couldnt find content item: " + contentId);
		}
	}

	function hideSelectedContent(dontHideContainer) {

		if (ui.selectedContent) {

			if (!dontHideContainer) {
				toggleDelayedElement("#page-container", false, true);
			}

			ui.selectedContent.toggleClass("content-visible", false);
			ui.pageContentContainer.removeClass("active-content-" + selectedContentId);

			setActiveMenuItem(null);
			ui.selectedContent = null;
		}
	}

	function onMobileMenuClick(e) {
		ui.mobileMenuContainer.toggleClass("mobile-menu-open");

		if (ui.selectedContent) {
			if (ui.mobileMenuContainer.hasClass("mobile-menu-open")) {
				$(".main-menu-item.mobile.active")[0].scrollIntoView();
			}
		}
		
		e.stopPropagation();
	}

	function onLogoClick() {
		hideSelectedContent();
		toggleDelayedElement(ui.homeContent, true);		
	}

	init();
});