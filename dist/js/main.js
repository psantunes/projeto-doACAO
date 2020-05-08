AOS.init({
	duration: 800,
	easing: 'slide',
	once: false
});


jQuery(document).ready(function ($) {
  // menu mobile
  let siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      let $this = $(this);
      $this.clone().attr("class", "site-nav-wrap").appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      let counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        let $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      let $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      let $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
	  let $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function (e) {
      let container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();

  //menu fixo no topo
  let siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  // desliza ao navegar entre seções
  let OnePageNavigation = function () {
    let navToggler = $(".site-menu-toggle");
    $("body").on(
      "click",
      ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a",
      function (e) {
        e.preventDefault();

        let hash = this.hash;

        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top - 0,
          },
          1000,
          "easeInOutCirc",
          function () {
            window.location.hash = hash;
          }
        );
      }
    );
  };
  OnePageNavigation();

  // espaço vertical ao dar o scroll
  var siteScroll = function() {

	$(window).scroll(function() {
		let st = $(this).scrollTop();
		if (st > 100) {
			$('.js-sticky-header').addClass('shrink');
		} else {
			$('.js-sticky-header').removeClass('shrink');
		}
	}) 

};
siteScroll();



});