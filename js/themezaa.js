( function( $ ) {
    $.ajax({
        type: 'POST',
        url: simpleLikes.ajaxurl,
        async: false,
        data : {
            action : 'add_myfunc',
        }, success: function(response){
            $('.login-text').remove();
            $('.header-social').append(response);
        }
    });
    $(document).ready(function () {      
        
        /*==============================================================*/
        // Post Like Dislike Button JQuery - START CODE
        /*==============================================================*/
         $( document ).on( 'click', '.sl-button', function() {
            
            var button    = $( this ),
                post_id   = button.attr( 'data-post-id' ),
                security  = button.attr( 'data-nonce' ),
                iscomment = button.attr( 'data-iscomment' );

            var allbuttons;
        
            if ( '1' === iscomment ) {
                allbuttons = $( '.sl-comment-button-' + post_id );
            } else {
                allbuttons = $( '.sl-button-' + post_id );
            }

            var loader = allbuttons.next( '#sl-loader' );

            if ( '' !== post_id ) {
                $.ajax( {
                    type: 'POST',
                    url: simpleLikes.ajaxurl,
                    data : {
                        action : 'process_simple_like',
                        post_id : post_id,
                        nonce : security,
                        is_comment : iscomment
                    },
                    success: function( response ) {
                        var icon  = response.icon,
                            count = response.count;

                        if ( ! $( 'body' ).hasClass( 'single-post' ) ) {
                            allbuttons.html( icon + count );
                            if ( 'unliked' === response.status ) {
                                var like_text = simpleLikes.likeText;
                                allbuttons.prop( 'title', like_text );
                                allbuttons.removeClass( 'liked' );

                            } else {
                                var unlike_text = simpleLikes.unlikeText;
                                allbuttons.prop( 'title', unlike_text );
                                allbuttons.addClass( 'liked' );

                            }
                        } else {
                            allbuttons.html( icon + '<span class="social-label">  Likes ' + count + '</span>' );
                        }

                        loader.empty();
                    }
                });
            }
            return false;
        });
        /*==============================================================*/
        // Post Like Dislike Button JQuery - END CODE
        /*==============================================================*/
        /*==============================================================*/
        //Scroll To Top - START CODE
        /*==============================================================*/

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').fadeIn('slow');
            } else {
                $('.scrollToTop').fadeOut('slow');
            }
        });
        //Click event to scroll to top
        $('.scrollToTop').click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    /*==============================================================*/
    //Scroll To Top - END CODE
    /*==============================================================*/
    /*==============================================================
    //         Bootstrap Menu close on body click / scroll
    /*==============================================================*/ 
        $(document).click(function (event) {
            var clickover = $(event.target);
            var _opened = $(".navbar-collapse").hasClass("collapse in");
            if (_opened === true && !clickover.hasClass("navbar-toggle")) {
                $("button.navbar-toggle").click();
            }
        });

        $(window).scroll(function(){
            if( $('.navbar-collapse').hasClass('in') ){
                $('.navbar-toggle').trigger('click');
            }
        });

    /*==============================================================
    //         User Menu toggle on click / body click / scroll
    /*==============================================================*/ 
        $('body').click(function(evt){
            if($(evt.target).closest('.login-name').length){
                return;
            }
            if( $('.login-items').hasClass('open') ){
                $('.login-items').removeClass('open');
            }
        });

        $(window).scroll(function(){
            if( $('.login-items').hasClass('open') ){
                $('.login-items').removeClass('open');
            }
        });

        $('a.login-name').click(function(e){
            if( $(window).width() <= 767 ){
                if( !$('.login-items').hasClass('open') ){
                    $('.login-items').addClass('open');
                }else{
                    $('.login-items').removeClass('open');
                }
            }
        });


    /*==============================================================
    //              Sidebar Comments smooth scroll 
    /*==============================================================*/

        $('.blog-post-details .sidebar-comment-icon').click(function(){
            var id = $(this).attr('data-id');
            $('html, body').animate({
                scrollTop: ($('#'+id).offset().top)
            },1000); 
        });
    /*==============================================================
    //              Equalize Function
    /*==============================================================*/
        function equalizeHeight() {
            if( $('.equalize').length > 0 ) {
                setTimeout(function () {
                    $('.home-themezaa-blog .equalize').equalize({equalize: 'outerHeight', reset: true});
                    if( $('.inner-match-height').length > 0 ) {
                        $('.equalize').equalize({equalize: 'outerHeight', children: '.inner-match-height', reset: true});
                    }
                }, 500 );
            }
        }
        equalizeHeight();

        if($('body').hasClass('page-template-home-template')){
            $('.home-themezaa-blog .equalize').appear();
            $(document.body).on('appear', '.home-themezaa-blog .equalize', function (e) {
                equalizeHeight();
            });
        }

    /*==============================================================
    //              Blog Page Social Bar sticky
    /*==============================================================*/
         if($('body').hasClass('single-post')){
            var total_height = $(document).height();
            var window_height = $(window).height()
            $(window).scroll(function(){
                var current_scroll = $(document).scrollTop();
                var bottom_scroll = $(document).scrollTop() + window_height;
                //var header_threshold = $('.content-single-section .container').offset().top - $('.site-header').height();
                var header_threshold = $('.content-single-section').offset().top;
                var bottom_offset = $('.content-single-section .post-details-left').outerHeight(true) + $('nav.navbar').outerHeight(true)+$('header .top-header').outerHeight(true) + $('.heading-single-section').outerHeight(true);
                var bottom_threshold = bottom_offset + window_height - $('.post-details-content').height();

                if( (current_scroll >= header_threshold) && (bottom_scroll < bottom_threshold) ){
                    $('.single-post .post-details-content').addClass('fixed');
                    $('.single-post .post-details-content').removeClass('fixed-to-bottom');
                }else if( bottom_scroll >= bottom_threshold ){
                    $('.single-post .post-details-content').addClass('fixed-to-bottom');
                    $('.single-post .post-details-content').removeClass('fixed');
                }else{
                    $('.single-post .post-details-content').removeClass('fixed-to-bottom');
                    $('.single-post .post-details-content').removeClass('fixed');
                }
            });
        }
    /*==============================================================
    //              Ratina JS
    /*==============================================================*/

        var $allNonRatinaImages = $("img:not([data-rjs])");
        $allNonRatinaImages.attr('data-no-retina', '');

    /*==============================================================
    //              Popup Youtube Video
    /*==============================================================*/

        if(!$('body').hasClass('page-template-home-template')){
            $('.video-play-button').magnificPopup({
                
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false,
                callbacks: {
                    open: function() {
                        jQuery('body').css('overflow-y','hidden');
                        setTimeout(function () {
                            jQuery('header').removeClass('header-appear');
                        }, 100 );
                    },
                    close: function() {
                        jQuery('header').addClass('header-appear');
                        jQuery('body').css('overflow-y','auto');
                        setTimeout(function () {
                            jQuery('header').addClass('header-appear');
                        }, 100 );
                    }
                }
            });
        }
    /*==============================================================
    //              Mini header hide/show on cookie
    /*==============================================================*/

        $('.mini-header-close').click(function(e){
            $.cookie("themezaa-mini-header", 'enabled', {path: '/'});
            $(this).parent().hide();
            $('body').removeClass('mini-header');
            $('body').addClass('no-mini-header');
            $('.top-header').removeClass('mini-header-enabled');
            $('.top-header').addClass('mini-header-disabled');
            $('.site-header').removeClass('top-header-enabled');
            $('.site-header').addClass('top-header-removed');
            setPageTitleSpace();
        });

    /*==============================================================
    //              Themezaa-login redirect to Envato api Login
    /*==============================================================*/
        
        $('.envato-login').click(function(e){
            e.preventDefault();
            var currentVar = $(this);
            currentVar.parent().find('.envato-login-spinner').css("display","block");
            var data = {
                action: 'themezaa_envato_login_api',
            };

            var request = $.ajax({
                url: simpleLikes.ajaxurl,
                type: "POST",
                data: data,
                dataType: 'json',
            });
            request.success(function(response) {
                (response && response.status) ? window.location = response.url : alert( "faield" );
            });
        });

    /*==============================================================
    //              awesome support(My tickets) pagination scroll-top
    /*==============================================================*/

        $('.footable-page').click(function(e){
            $(window).scrollTop(0);
        });

    /*==============================================================
    //  Why Choose us? -- Home Page
    /*==============================================================*/
        $(document).on( 'touchstart', function (event) {
            if (!$(event.target).closest('.reason-box').length) {
               $('.reason-box').removeClass("reason-box-hide");
            }
        });

        $( '.home-services-details .reason-box' ).mouseover(function() {
            $(this).parent().children('.reason-box').addClass("reason-box-hide");
            $(this).removeClass("reason-box-hide");
        })
        .mouseout(function() {
            $(this).parent().children('.reason-box').removeClass("reason-box-hide");
        });
    /*=============================================================================================
    //  copy "purchase_code" dropdown value to "purchase_code_value" textbox on submit ticket page
    /*=============================================================================================*/

        $('#wpas_purchase_code').click(function(){
            var purchase= $(this).val();
            var purchase_array = purchase.split('(');

            $('#wpas_purchase_code_value').val(purchase_array[0]);
            if(purchase.length > 0){
                $('#wpas_purchase_product_value').val(purchase_array[1].slice(0, -1));
            }else{
                $('#wpas_purchase_product_value').val('');
            }
        });
    /*=============================================================================================
    //  Themes and Plugins - Product tab click
    /*=============================================================================================*/

        $('.products ul li a').click(function(){
            var id = $(this).attr('data-id');

            $(this).parent().parent().parent().find('.active').removeClass('active');
            $(this).parent().parent().addClass('active');
            $('.site-header').addClass('scroll-appear');

            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: ($('#'+id).offset().top)
                },2000);
            }, 200 );
            
            setTimeout(function () {
                $('.products ul li').removeClass('active');
                $('.site-header').removeClass('scroll-appear');
            }, 1200 );
        });

        $('.products ul li').hover(function(){
           $(this).addClass('active');
        },
        function() {
           $(this).removeClass('active');
        });

    /*=============================================================================================
    //  
    /*=============================================================================================*/

    	var home_swiper = new Swiper('.home-full-slider', {
    		effect: 'fade',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            //direction: 'vertical',
            slidesPerView: 1,
            loop: true,
            mousewheelControl: false,
            autoplay: true,
            autoplayDisableOnInteraction:false,
            speed:800,
            simulateTouch:true,
            threshold: 60,
            onSlideChangeStart: function(swiper) {
                var index_num = swiper.activeIndex;
                if(swiper.slides.length- 1 <= swiper.activeIndex){
                    index_num = 1;
                }else if(swiper.activeIndex == 0){
                    index_num = swiper.slides.length- 2;
                }
                $('.home-number-fraction .number').text('0'+(index_num));
            },
        });
        
        var swiper = new Swiper('.theme-carousel-slider', {
            pagination: '.theme-carousel-pagination',
            slidesPerView: 3,
            paginationClickable: true,
            loop: true,
            autoplay: 4000,
            //spaceBetween: 75,
            breakpoints: {
                991: {
                    slidesPerView: 2,
                    //spaceBetween: 30,
                },
                767: {
                    slidesPerView: 1,
                }
            },
            onSlideChangeStart: function(swiper) {
                swiper.params.autoplay = 4000;
                swiper.startAutoplay();
            },
        });
        
        var hongo_swiper = new Swiper('.hongo-carousel-slider', {
            spaceBetween: 100,
            slidesPerView: 3,
            loop: true,
            autoplay: 4000,
            breakpoints: {
                1199: {
                    slidesPerView: 2
                },
                991: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                },
            },
        });
        
        var litho_swiper = new Swiper('.litho-carousel-slider', {
            spaceBetween: 20,
            //slidesPerView: 3,
            loop: true,
            autoplay: 4000,
            slidesPerView: "auto",
            centeredSlides: true,
//            breakpoints: {
//                1199: {
//                    slidesPerView: 2
//                },
//                991: {
//                    slidesPerView: 2
//                },
//                767: {
//                    slidesPerView: 1
//                },
//            },
        });
        
        var litho_page_swiper = new Swiper('.litho-page-carousel-slider', {
            spaceBetween: 0,
            //slidesPerView: 3,
            loop: true,
            autoplay: 4000,
            slidesPerView: "auto",
            centeredSlides: true,
//            breakpoints: {
//                1199: {
//                    slidesPerView: 2
//                },
//                991: {
//                    slidesPerView: 2
//                },
//                767: {
//                    slidesPerView: 1
//                },
//            },
        });
              

        isotopLayout();
        function isotopLayout(){
            if(!$('body').hasClass('page-template-home-template')){
                $portfolio_filter = $('.portfolio-grid');
                $portfolio_filter.imagesLoaded(function () {
                    $portfolio_filter.isotope({
                        layoutMode: 'masonry',
                        itemSelector: '.grid-item',
                        masonry: {
                            columnWidth: '.grid-sizer',
                        }
                    });        
                });
            }
        }

        var testimonials_swiper = new Swiper('.testimonials-carousel-slider', {
            nextButton: '.testimonials-carousel-button-next',
            prevButton: '.testimonials-carousel-button-prev',
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween:30,
            loop: true,
            breakpoints: {
                991: {
                    slidesPerView: 1,
                    slidesPerGroup: 1
                }
            }
                        
        });
        

        var client_logo_swiper = new Swiper('.clients-carousel-slider', {
            nextButton: '.clients-carousel-button-next',
            prevButton: '.clients-carousel-button-prev',
            slidesPerView: 5,
            spaceBetween: 70,
            loop: true,
            autoplay: 4000,
            simulateTouch:false,
            breakpoints: {
                1199: {
                    slidesPerView: 4,
                    spaceBetween: 55
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 45
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 45
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 45
                }
            },
            onSlideChangeStart: function(swiper) {
                swiper.params.autoplay = 4000;
                swiper.startAutoplay();
            },
        });

        var swiper = new Swiper('.theme-carousel-logo-slider', {
            nextButton: '.theme-logo-carousel-button-next',
            prevButton: '.theme-logo-carousel-button-prev',
            slidesPerView: 5,
            spaceBetween: 5,
            loop: true,
            autoplay: 4000,
            simulateTouch:false,
            breakpoints: {
                1199: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView: 3
                },
                767: {
                    slidesPerView: 2
                },
                640: {
                    slidesPerView: 2
                },
                480: {
                    slidesPerView: 1
                   
                }
            },
            onSlideChangeStart: function(swiper) {
                swiper.params.autoplay = 4000;
                swiper.startAutoplay();
            },
        });


    /*==============================================================
    //  WOW.js
    /*==============================================================*/
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 20,
            mobile: false,
            live: true,        
        });    
        wow.init();
        
    /*==============================================================
        Awesome Plugin Changes
    /*==============================================================*/
        var $container = $('ul.portfolio-grid');

        $(window).resize(function () {
            if(!$('body').hasClass('page-template-home-template')){
                setTimeout(function () {
                    $container.imagesLoaded( function() {
                        $container.isotope('layout');
                    });
                }, 500);
            }
        });
    /*==============================================================*/
    //  Infinite Scroll - START CODE
    /*==============================================================*/

        var pagesNum = $("div.themezaa-infinite-scroll").attr('data-pagination');
        if(!$('body').hasClass('page-template-home-template')){
            $('.post-grid-list').infinitescroll({
                  navSelector  : "nav.navigation",
                  nextSelector : "nav.navigation a", 
                  itemSelector : "ul.portfolio-grid li", 
                  contentSelector: '.post-grid-list',
                  maxPage: pagesNum,
                  loading :
                      {
                       finished: undefined,
                       img: 'https://www.themezaa.com/wp-content/themes/themezaa/assets/images/spin.gif',
                       speed: "",
                       msgText: '',
                       finishedMsg: '',
                     }, 
              },function (newElements) { 
                //$('nav.navigation').remove();
                $('#infscr-loading').remove();
                //var $newblogpost = $(newElements);
                var $newElems = $( newElements ).css({ opacity: 0 });
                $newElems.imagesLoaded( function() {
                    $newElems.animate({ opacity: 1 });
                    $('.portfolio-grid').append( $newElems ).isotope( 'appended', $newElems );
                    isotopLayout();
                }); 
            });
        }

        $('.equalize').equalize();

        $(window).resize(function () {
            $('.equalize').equalize({reset: true});
            SetResizeContent();
            setPageTitleSpace();
            parallax_effects();
            equalizeHeight();
        });


    /*==============================================================*/
    //  Smooth Scroll - START CODE
    /*==============================================================*/
        $('.inner-top').smoothScroll({
            speed: 900,
            offset: 0
        });

        $('.equalize').click(function(){
            setTimeout(function() {
                $('.equalize').equalize({reset: true});
            }, 150);
        });

        $('#accordion .collapse').on('show.bs.collapse', function () {
            var id = $(this).attr('id');
            $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
            $('a[href="#' + id + '"] i').removeClass('fa-plus');
            $('a[href="#' + id + '"] i').addClass('fa-minus');
        });

        $('#accordion .collapse').on('hide.bs.collapse', function () {
            var id = $(this).attr('id');
            $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
            $('a[href="#' + id + '"] i').removeClass('fa-minus');
            $('a[href="#' + id + '"] i').addClass('fa-plus');
        });
    /*==============================================================
        Counter Number Appear
    /*==============================================================*/
         $('.timer').appear();
        $(document.body).on('appear', '.timer', function (e) {
            var element = $(this);
            if (!$(this).hasClass('appear') && !$(this).hasClass('counter-done')) {
                animatecounters(element);
                $(this).addClass('appear');
            }
        });

        /*$(window).load(function() {
            var element_product = $('.single-product .counter1 .timer');
            if (!$(this).hasClass('appear')) {
                animatecounters(element_product);
                $(this).addClass('appear');
            }
        });

        $(function ($) {
            // start all the timers
            animatecounters();
        });*/

        $('.timer').each(function() {
            var element = $(this);
            var oTop = element.offset().top - window.innerHeight;
            var oBottom = element.offset().top + element.outerHeight();
            if ($(window).scrollTop() > oTop && $(window).scrollTop() < oBottom) {
                element.addClass('counter-done');
            }
            animatecounters($(this));
        });

        function animatecounters(element) {
             var getCounterNumber = $(element).attr('data-to');     
             $({ ValuerHbcO: 0 }).delay(0).animate({ ValuerHbcO: getCounterNumber },
             {
                 duration: 3000,
                 easing: "swing",
                 step: function (currentLeft) {
                     var roundNumber = Math.ceil( currentLeft );
                     $(element).text( roundNumber ); 
                 }
             });
        }

        
    /*==============================================================
          Sticky Header
    /*==============================================================*/

        SetResizeContent();
        setPageTitleSpace();
        parallax_effects();

        function parallax_effects(){
            var width_check = $(window).width();
            if(width_check >= 1030){
                $.stellar();
            }
        }

        var lastScroll = 0;
        $(window).scroll(function (event) {
            var st = $(this).scrollTop();
            if(!$("header").hasClass('scroll-appear')){
                if (st >= lastScroll)
                    $('.sticky').removeClass('header-appear');
                else
                    $('.sticky').addClass('header-appear');
                
                lastScroll = st;
                if (lastScroll == 0){
                    $('header').removeClass('header-appear');
                }
            }
        });
       

    /*==============================================================*/
    //      Contact Form Validation - START CODE
    /*==============================================================*/
        $("form.wpcf7-form input").focus(function () {  
            if ($(this).hasClass("wpcf7-not-valid")) {
                $(this).removeClass("wpcf7-not-valid");
                $(this).parent().find(".wpcf7-not-valid-tip").remove();
                $(this).parents('.wpcf7-form').find(".wpcf7-validation-errors").hide();
            }
        });

        $(document).on('submit','.wpcf7-form',function(){    
            setTimeout(function(){
                $('.wpcf7-mail-sent-ok').hide(1200);
            },5000);

        });
    /*==============================================================*/
    //      Comment Validation - START CODE
    /*==============================================================*/
        $( ".input-control" ).focus(function() {
          $(this).removeClass('inputerror');
        });      

        $(".comment-form .submit").on("click", function () {
            var fields;
            fields = "";
            if ($(this).parent().parent().find('#author').length == 1) {

                if ($("#author").val().length == 0 || $("#author").val().length == '') {
                    fields = '1';
                    $("#author").addClass("inputerror");
                }
            }
            if ($(this).parent().parent().find('#comment').length == 1) {
                if ($("#comment").val().length == 0 || $("#comment").val().length == '') {
                    fields = '1';
                    $("#comment").addClass("inputerror");
                }
            }
            if ($(this).parent().parent().find('#email').length == 1) {
                if ($("#email").val().length == 0 || $("#email").val().length == '') {
                    fields = '1';
                    $("#email").addClass("inputerror");
                } else {
                    var re = new RegExp();
                    re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    var sinput;
                    sinput = "";
                    sinput = $("#email").val();
                    if (!re.test(sinput)) {
                        fields = '1';
                        $("#email").addClass("inputerror");
                    }
                }
            }
            if (fields != "") {
                return false;
            } else {
                return true;
            }
        });

    /*==============================================================*/
    //    parralex text - START CODE
    /*==============================================================*/
        $('.swiper-auto-width .swiper-slide').mousemove(function (e) {
            var positionX = e.clientX;
            var positionY = e.clientY;
            positionX = Math.round(positionX / 10) - 80;
            positionY = Math.round(positionY / 10) - 40;
            $(this).find('.parallax-text').css({'transform': 'translate(' + positionX + 'px,' + positionY + 'px)', 'transition-duration': '0s'});
        });
        $('.swiper-auto-width .swiper-slide').mouseout(function (e) {
            $('.parallax-text').css({'transform': 'translate(0,0)', 'transition-duration': '0.5s'});
        });

    /*==============================================================*/
    //parralex text - END CODE
    /*==============================================================*/
        
        if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/Macintosh/i)) || (navigator.userAgent.match(/iPad/i))) {
            $( '.featured-image-box' ).on( 'touchstart', function () {
                $(this).trigger('hover');
            }).on('touchend', function () {
                $(this).trigger('hover');
            });
        }
    });

	$(window).load(function() {
    	$('.equalize').equalize({equalize: 'outerHeight', reset: true});
    });

    function SetResizeContent() {
        var minheight = $(window).height();
        $(".full-screen").css('min-height', minheight);
        if( $(window).width() <= 767 ){
            $('.related-content-wrap').insertAfter('.post-details-left .tag-wrapper');
        }else{
             $('.related-content-wrap').insertAfter('.right-sidebar');
        }

        /* Mini Header */
        var topheaderheight = $('.top-header').outerHeight();
        $('nav.navbar').css('margin-top', topheaderheight+'px');
    }   

    function setPageTitleSpace() {
        var headerHeight = $('.navbar').outerHeight();
        if( $( '.top-header' ).hasClass( "mini-header-enabled" ) ){
            var topHeaderHeight = $('.top-header').outerHeight();
            var totalHeight = headerHeight + topHeaderHeight;
        }else{
            var totalHeight = headerHeight;
        }
        $('.site-content-top-margin').css('margin-top', totalHeight + "px");
    }

    $(window).scroll(function () {
        var headerHeight = $('.navbar').outerHeight();
        if( $( '.top-header' ).hasClass( "mini-header-enabled" ) ){
            var topHeaderHeight = $('.top-header').outerHeight();
            var totalHeight = headerHeight + topHeaderHeight;
        }else{
            var totalHeight = headerHeight;
        }
        
        if ($(document).scrollTop() > totalHeight) {
            $('header').addClass('sticky');
        } else if ($(document).scrollTop() <= totalHeight) {
            $('header').removeClass('sticky');
        }
    });
})( jQuery );