jQuery(window).load(function ($) {
    jQuery('.ct_amy_initloader').removeClass('ct_amy_fadeinup').addClass("ct_amy_fadeoutdown");
})
jQuery(document).ready(function () {
    scrollinit = function (sliderID, sliderScroll, sliderPages, sliderPagesFolder, sliderFirstSlide, sliderThumbSize, sliderSlideshow, sliderSlideshowSpeed, sliderParallax) {
        setTimeout(function middleposition() {
            var sliderPosition = jQuery(sliderID + ' ct_amy_section').height() / 2;
            jQuery(sliderID + ' ct_amy_section').css("margin-bottom", '-' + sliderPosition + 'px');
        }, 600);

        var whait = 0,
            count = 2,
            themes,
            selectedThemeIndex;
        if (!sliderPages) {
            sliderPages = 0;
        }

        function initajax() {
            if (count > sliderPages) {
                return false;
            } else {
                if (whait != 1) {
                    loadArticle(count);
                    whait = 1
                } else {
                    return false;
                }
            }
            count++;
        }
        function loadArticle(pageNumber) {
            jQuery(sliderID + ' .ct_amy_initloader').css('display', 'block');
            jQuery(sliderID + ' .ct_as_amy_slider').css('opacity', '0.5');
            jQuery(sliderID + ' .ct_amy_initloader').removeClass("ct_amy_fadeoutdown").addClass('ct_amy_fadeinup');
            jQuery(sliderID + ' .ct_as_amy_slider').removeClass('fadeOutDown').addClass('fadeInUp');
            jQuery('.numpostinfi').removeClass('fadeInUp').addClass("fadeOutDown");
            var n = jQuery(sliderID + ' ct_amy_section').length;
            var nextslidecount = n;
            var noLoaded = jQuery(sliderID + ' .ct_as_amy_slider img').length;
            jQuery.ajax({
                url: sliderPagesFolder + "/" + count + ".html",
                dataType: "html",
                error: function () {
                    jQuery(sliderID + ' .ct_amy_initloader').removeClass('ct_amy_fadeinup').addClass("ct_amy_fadeoutdown");
                    jQuery(sliderID + ' .ct_as_amy_slider').css("opacity", "1");
                },
                success: function (html) {
                    jQuery(sliderID + ' .ct_as_amy_slider').append(html);
                    whait = 0;
                    var noOfImages = jQuery(sliderID + ' .ct_as_amy_slider img').length;
                    jQuery(sliderID + ' .ct_as_amy_slider img').on('load', function () {
                        noLoaded++;
                        if (noOfImages === noLoaded) {
                            jQuery(sliderID + ' .ct_amy_initloader').removeClass('ct_amy_fadeinup').addClass("ct_amy_fadeoutdown");
                            jQuery(sliderID + ' .ct_as_amy_slider').css("opacity", "1");

                            var sliderPosition = jQuery(sliderID + ' ct_amy_section').height() / 2;
                            jQuery(sliderID + ' ct_amy_section').css("margin-bottom", '-' + sliderPosition + 'px');
                            setTimeout(function startslider() {
                                initThemeSwitching(sliderID, sliderScroll, sliderPages, sliderFirstSlide, sliderThumbSize, sliderSlideshow, sliderSlideshowSpeed, sliderParallax, nextslidecount);
                            }, 400);
                        }
                    });
                    //pretty Photo settings( ! Don't change )
                    //==================================================
                    /*jQuery(document).ready(function($){
                            jQuery(document).ready(function($){
                                $("a[rel^='prettyPhotoImages']").prettyPhoto({
                                    theme: 'dark_square',
                                    allow_resize: true
                                });
                            });*/
                }
            });
            return false;
        }
        var waitForFinalEvent = (function () {
            var timers = {};
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout(timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })();
        setTimeout(function () {
            jQuery(sliderID + ' .ct_as_amy_slider .ct_amy_initloader').css('display', 'none');
        }, 1100)
        jQuery(window).resize(function () {
            waitForFinalEvent(function () {
                var sliderPosition = jQuery(sliderID + ' ct_amy_section').height() / 2;
                jQuery(sliderID + ' ct_amy_section').css("margin-bottom", '-' + sliderPosition + 'px');
            }, 1000, "slider resize");

        });
        var n = jQuery(sliderID + ' ct_amy_section').length;
        var nextslidecount = n;
        initThemeSwitching(sliderID, sliderScroll, sliderPages, sliderFirstSlide, sliderThumbSize, sliderSlideshow, sliderSlideshowSpeed, sliderParallax, nextslidecount)
        function initThemeSwitching(sliderID, sliderScroll, sliderPages, sliderFirstSlide, sliderThumbSize, sliderSlideshow, sliderSlideshowSpeed, sliderParallax, nextslidecount) {
            'use strict';
            themes = [
                'ct_amy_circle',
                'ct_amy_cube',
                'ct_amy_carousel',
                'ct_amy_concave',
                'ct_amy_coverflow',
                'ct_amy_coverflow2d',
                'ct_amy_spiraltop',
                'ct_amy_spiralbottom',
                'ct_amy_classic'
            ];

            var deck = bespoke.from(sliderID + ' .ct_as_amy_slider');
            selectedThemeIndex = 0;
            jQuery(sliderID).removeClass().addClass(sliderScroll + ' ' + sliderThumbSize);
            deck.slide(sliderFirstSlide);
            initKeys();
            initButtons();
            initSlideGestures();
            initClickInactive();
            if (sliderParallax == 'yes') {
                var startparallax = function () {
                    var $scene = jQuery(sliderID + ' .ct_as_amy_slider').ct_amy_parallax();
                    $scene.ct_amy_parallax('updateLayers');
                }
                setTimeout(startparallax, 400);
            };
            var n = jQuery(sliderID + ' ct_amy_section').length;
            if (nextslidecount !== n) {
                deck.slide(nextslidecount - 1);
            }
            //Navigation
            //==================================================
            function initButtons() {
                jQuery(sliderID + ' .ct_as_arrow_nav .next-arrow').click(function () {
                    gonext();
                });
                jQuery(sliderID + ' .ct_as_arrow_nav .prev-arrow').click(function () {
                    goprev();
                });
            }
            var stopnextslide = 0;

            function gonext() {
                var stopnextslide = 0;
                var n = jQuery(sliderID + ' ct_amy_section').length;
                jQuery(sliderID + ' ct_amy_section').each(function () {
                    if (jQuery(this).hasClass('bespoke-active') && Number(jQuery(this).attr('rel')) + 2 == n) {
                        if (initajax(sliderID) !== false) {
                            /* deck.slide(0);
					       stopnextslide = 1;*/
                        }
                    }
                });
                if (stopnextslide != 1) {
                    deck.next();
                }
            };
            function goprev() {
                deck.prev();
            };
            //Keyboard navigation
            //==================================================
            function initKeys(e) {
                if (/Firefox/.test(navigator.userAgent)) {
                    document.addEventListener('keydown', function (e) {
                        if (e.which >= 37 && e.which <= 40) {
                            e.preventDefault();
                        }
                    });
                }
                var gokb = function (e) {
                    var key = e.which;

                    if (key === 37) {
                        if (jQuery(sliderID).is(':hover')) {
                            deck.prev();
                        }
                    }
                    if (key === 39) {

                        if (jQuery(sliderID).is(':hover')) {
                            deck.next();
                            var n = jQuery(sliderID + ' ct_amy_section').length;
                            jQuery(sliderID + ' ct_amy_section').each(function () {
                                if ($(this).hasClass('bespoke-active') && Number($(this).attr('rel')) + 1 === n) {

                                    if (initajax(sliderID) !== false) {

                                    }
                                }
                            });
                        }
                    }
                    /*if (key === 38) {
                        if (jQuery(sliderID + ' .ct_as_amy_slider').is(':hover')) {
                            prevTheme();
                        }
                    }
                    if (key === 40) {
                        if (jQuery(sliderID + ' .ct_as_amy_slider').is(':hover')) {
                            nextTheme();
                        }
                    }*/
                };
                document.addEventListener('keydown', gokb);
            }
            function extractDelta(e) {
                if (e.wheelDelta) {
                    return e.wheelDelta;
                }
                if (e.originalEvent.detail) {
                    return e.originalEvent.detail * -40;
                }
                if (e.originalEvent && e.originalEvent.wheelDelta) {
                    return e.originalEvent.wheelDelta;
                }
            }
            //Navigation for touch devices
            //==================================================
            function initSlideGestures() {
                var start = 0;
                var myString = sliderID.replace('#', '');
                var main = document.getElementById(myString),
                    startPosition,
                    delta,
                    singleTouch = function (fn, preventDefault) {
                        return function (e) {
                            if (e.touches.length === 1) {
                                fn(e.touches[0].pageY);
                            }
                        };
                    },
                    touchstart = singleTouch(function (position) {
                        startPosition = position;
                        delta = 0;
                        start = 0;
                        main.addEventListener('touchend', touchend);
                    }),

                    touchmove = singleTouch(function (position) {
                        delta = position - startPosition;
                    }, true),

                    touchend = function () {
                        if (Math.abs(delta) < 50) {
                            return;
                        }
                        if (delta > 0) {
                            deck.prev();
                        } else {
                            deck.next();
                        }
                    };
                window.remvoetuch = function () {
                    main.removeEventListener('touchstart', touchstart);
                    main.removeEventListener('touchmove', touchmove);
                    main.removeEventListener('touchend', touchend);
                };
                window.addtuch = function () {
                    main.addEventListener('touchstart', touchstart);
                    main.addEventListener('touchmove', touchmove);
                    main.addEventListener('touchend', touchend);
                };
                window.addtuch();
            }

            function isTouch() {
                return !!('ontouchstart' in window) || navigator.msMaxTouchPoints;
            }

            function modulo(num, n) {
                return ((num % n) + n) % n;
            }
            //Mouse click navigation
            //==================================================
            function initClickInactive() {
                var n = jQuery(sliderID + ' ct_amy_section').length;
                jQuery(sliderID + ' .ct_amy_cn_style').unbind("click");
                jQuery(sliderID + ' .ct_amy_cn_style').click(function (event) {

                    var whichslide = jQuery(this).parent().attr('rel');
                    var counta = Number(whichslide) + 1;
                    if (jQuery(this).parent().hasClass('bespoke-inactive')) {
                        if (counta === n) {
                            initajax(sliderID);
                        }
                        deck.slide(whichslide);
                    }

                });
            }

            function selectTheme(index) {
                var theme = themes[index];
                var thestyle = theme + ' ' + sliderThumbSize;
                jQuery(sliderID).removeClass();
                jQuery(sliderID).addClass(thestyle);
                selectedThemeIndex = index;
            }

            function nextTheme() {
                offsetSelectedTheme(1);

            }

            function prevTheme() {
                offsetSelectedTheme(-1);

            }

            function offsetSelectedTheme(v) {
                selectTheme(modulo(selectedThemeIndex + v, themes.length));
            }
            if (sliderSlideshow == 'yes') {
                var autoslide = function () {
                    stopnextslide = 0;
                    var n = jQuery(sliderID + ' ct_amy_section').length;

                    jQuery(sliderID + ' ct_amy_section').each(function () {
                        if (jQuery(this).hasClass('bespoke-active') && Number(jQuery(this).attr('rel')) + 1 == n) {
                            deck.slide(0);
                            stopnextslide = 1;
                        }
                    });
                    if (stopnextslide != 1) {
                        deck.next();
                    }
                }
                jQuery(sliderID + ' .ct_as_amy_slider').hover(function () {

                    window.clearInterval(autorotateposts);
                }, function () {
                    window.clearInterval(autorotateposts);
                    autorotateposts = setInterval(autoslide, sliderSlideshowSpeed);
                })
                var autorotateposts = setInterval(autoslide, sliderSlideshowSpeed);
            };
        }
    };
}('scrollinit', this, document));