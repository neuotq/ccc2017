import './modules';
require('bootstrap');
require('./jquery.accordion.js');

require('./jarallax.min.js');

$("document").ready(function() {
    $(".cc-soglasen-checkbox").change(function(e) {
    	var regBtn = $(e.target).closest("form").find(".cc-regbtn");
        if ($(e.target).prop('checked')) {
            $(regBtn).prop('disabled', false);
        } else {
            $(regBtn).prop('disabled', true);
        }
    });

    // $(".cc-popup-toggle").on("click", function() {
    //     $(".cc-popup.regform").addClass("open");
    //     $(document).scrollTop(0);
    //     $(".cc-popup-overlay").show(0, function() {
    //         $(this).addClass("open");
    //     });
    // });

    function closeCCPopup() {
        $(".cc-popup").removeClass("open");
        $(".cc-popup-overlay").removeClass("open").hide();
    }

    $(".cc-popup-close, .cc-popup-overlay").on("click", closeCCPopup);

    $(document).on('keyup', function(evt) {
        if (evt.keyCode == 27) {
            return closeCCPopup();
        }
    });


    $(".cc-tab").on("click", function() {
        if ($(this).hasClass("active")) return;
        $(".cc-tab").toggleClass("active");
        $(".cc-tab-form").toggle();
        // var fid = $( this ).attr("id")+"_form";
        // $("#"+fid).hide();
    });


    $('.cc-regbtn').click(function(e) {
        e.preventDefault();
        var parentEl = e.target.closest('.cc-form');

        var name = $(parentEl).find("input[name='name']").val();
        var email = $(parentEl).find("input[name='email']").val();
        var phone = $(parentEl).find("input[name='phone']").val();
        var promocode = $(parentEl).find("input[name='promocode']").val();

        $(parentEl).addClass("cc-loading");

        $.ajax({
            type: "POST",
            url: 'domail.php',
            data: {
                name: name,
                email: email,
                phone: phone,
                promocode: promocode
            },
            success: function(msg) {
        		$(parentEl).removeClass("cc-loading").addClass("thanks-active");
            }
        });

    });


  $('.accordion').accordion({
              "transitionSpeed": 400
          });


    // var heights = $(".testimonial").map(function ()
    //    {
    //        return $(this).height();
    //    }).get(),

    //    maxHeight = Math.max.apply(null, heights);
    // $("#carousel-testimonials").css("height", 340);
});

function carouselNormalization() {
var items = $('#carouselExampleIndicators .carousel-item'), //grab all slides
    heights = [], //create empty array to store height values
    tallest; //create variable to make note of the tallest slide

if (items.length) {
    function normalizeHeights() {
        items.each(function() { //add heights to array
            heights.push($(this).height()); 
        });
        tallest = Math.max.apply(null, heights); //cache largest value
        items.each(function() {
            $(this).css('min-height',tallest + 'px');
        });
    };
    normalizeHeights();

    $(window).on('resize orientationchange', function () {
        tallest = 0, heights.length = 0; //reset vars
        items.each(function() {
            $(this).css('min-height','0'); //reset min-height
        }); 
        normalizeHeights(); //run it again 
    });
}
}



$("document").ready(function() {
var maxHeight = -1;
$('#carousel-testimonials .carousel-item').each(function() {
    if ($(this).height() > maxHeight) {
        maxHeight = $(this).height();
    }
});
$('.cc-testimonialsbox').height(maxHeight);

carouselNormalization();

});


$("iframe").contents().find("#u_0_0 > div:nth-child(1) > div").css("width", "100%");


