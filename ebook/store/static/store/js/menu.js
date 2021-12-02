$(document).ready(function() {
    /** code by webdevtrick ( https://webdevtrick.com ) **/

    $('nav ul li a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        $('.dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
    });
    $('#nav-toggle').click(function() {
        console.log($('.nav-dropdown').css('display'));
        if ($('.nav-list').css('display') == "none") {
            $('nav ul').show();
            $('.nav-dropdown').css('display', 'none');
            $('.container').css('top', 335);
        } else {
            $('nav ul').hide();
            $('.container').css('top', 80);
        }
        $('#nav-toggle').on('click', function() {
            this.classList.toggle('active');
        });
    });
});