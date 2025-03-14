jQuery(document).ready(function($) {
    'use strict';



    
    
    // Fonction pour afficher la popup et l'overlay
    function showPopup() {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('popup-overlay').style.display = 'block';
    }

    // Fonction pour fermer la popup et l'overlay
    function closePopup() {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popup-overlay').style.display = 'none';
    }

    // Événements pour les boutons
    document.getElementById('accept-btn').onclick = closePopup;
    document.getElementById('refuse-btn').onclick = closePopup;

    // Affiche la popup au chargement de la page
    window.onload = showPopup;

    function downloadFile() {
        let selectedFile = document.getElementById("fileSelect").value;
        let link = document.createElement("a");
        link.href = selectedFile;
        link.download = selectedFile.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
                            }
   
        // Hide Header on on scroll down
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();

        $(window).scroll(function(event){
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var st = $(this).scrollTop();
            
            // Make sure they scroll more than delta
            if(Math.abs(lastScrollTop - st) <= delta)
                return;
            
            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight){
                // Scroll Down
                $('header').removeClass('nav-down').addClass('nav-up');
            } else {
                // Scroll Up
                if(st + $(window).height() < $(document).height()) {
                    $('header').removeClass('nav-up').addClass('nav-down');
                }
            }
            
            lastScrollTop = st;
        }


    // Initialisation du slider
    $(".Modern-Slider").slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        dots: true,
        fade: true,
        pauseOnDotsHover: true,
        cssEase: 'linear',
        draggable: false,
        prevArrow: '<button class="PrevArrow"></button>',
        nextArrow: '<button class="NextArrow"></button>'
    });

    // Toggle de la navigation mobile
    $('#nav-toggle').on('click', function(event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });
    

    // Gestion des tabs
    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();

    $('.tabs a').click(function(e) {
        e.preventDefault();
        var $this = $(this),
            tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');

        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
    });

    

    // Carrousel Owl
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        responsive: {
            0: { items: 1, nav: true },
            600: { items: 2, nav: false },
            1000: { items: 3, nav: true, loop: false }
        }
    });

    var contentSection = $('.content-section, .main-banner');
    var navigation = $('nav');

    // Scroll Smooth sur les liens de navigation
    navigation.on('click', 'a', function(event) {
        if (this.hash) {
            event.preventDefault();
            var target = $(this.hash);
            if (target.length) {
                smoothScroll(target);
            
            }
        }
    });

    // Mise à jour de la navigation lors du scroll
    $(window).on('scroll', function() {
        updateNavigation();
    });

    updateNavigation();

    // Fonction de mise à jour de la navigation
    function updateNavigation() {
        contentSection.each(function() {
            var sectionName = $(this).attr('id');
            if (sectionName) {
                var navigationMatch = $('nav a[href="#' + sectionName + '"]');
                if (
                    ($(this).offset().top - $(window).height() / 2 < $(window).scrollTop()) &&
                    ($(this).offset().top + $(this).height() - $(window).height() / 2 > $(window).scrollTop())
                ) {
                    navigationMatch.addClass('active-section');
                } else {
                    navigationMatch.removeClass('active-section');
                }
            }
        });
    }

    // Fonction de scroll fluide avec vérification
    function smoothScroll(target) {
        if (target.length) {
            $('body,html').animate({
                scrollTop: target.offset().top
            }, 800);
        }
    }

    // Animation de scroll pour les boutons
    $('.button a[href*=#]').on('click', function(e) {
        var target = $($(this).attr('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: target.offset().top }, 500, 'linear');
        }
    });

});
