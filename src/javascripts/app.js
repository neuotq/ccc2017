import './modules';
window.$ = window.jQuery = require('jquery');
window.Tether = require('tether');

require('bootstrap');

// require('jarallax');

$("document").ready(function() {
    $(".cc-soglasen-checkbox").change(function(e) {
    	var regBtn = $(e.target).closest("form").find(".cc-regbtn");
        if ($(e.target).prop('checked')) {
            $(regBtn).prop('disabled', false);
        } else {
            $(regBtn).prop('disabled', true);
        }
    });

    $(".cc-popup-toggle").on("click", function() {
        $(".cc-popup.regform").addClass("open");
        $(document).scrollTop(0);
        $(".cc-popup-overlay").show(0, function() {
            $(this).addClass("open");
        });
    });

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

        $(parentEl).addClass("cc-loading");

        $.ajax({
            type: "POST",
            url: 'domail.php',
            data: {
                name: name,
                email: email,
                phone: phone
            },
            success: function(msg) {
        		$(parentEl).removeClass("cc-loading").addClass("thanks-active");
            }
        });

    });


    // var heights = $(".testimonial").map(function ()
    //    {
    //        return $(this).height();
    //    }).get(),

    //    maxHeight = Math.max.apply(null, heights);
    // $("#carousel-testimonials").css("height", 340);
})