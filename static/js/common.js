$('.nav-btn').on('click', function (e) {
    var $this = $(this);
     $this.find('.icon').toggleClass('hidden');
     $('.header').toggleClass('is-open');
     $('.header-logo').toggleClass('hidden');
     $('.header-btn .btn').toggleClass('btn-white').toggleClass('btn-red');
     $('body').toggleClass('scroll');
});


$('.step-btn').on('click', function (e) {
    var $this = $(this);
    var $thisData = $this.data('step');
    if($('input, textarea').hasClass('required')){
        $('.required').addClass('error').next().show();
    }else{
        $('.input').next().hide();
        $('.form-step__item').removeClass('active');
        $('.step-item').removeClass('active');
        $('div[data-step = '+$thisData+']').addClass('active');
    }
});

$('.btn-popup').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $thisData = $this.data('popup');
    $('.popup').removeClass('active');
    $('div[data-popup = '+$thisData+']').addClass('active');
    $('body').addClass('scroll');
});

$('.input, .textarea').on('change', function (e) {
    var $this = $(this);
    if($this.val().length !== 0){
        $this.removeClass('required error');
        $this.next().hide();
    }else {
        $this.addClass('required error');
        $this.next().show();
    }
});

$('.btn-popup-info').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $thisParentPopup = $this.parents('.item-models');
    var $thisData = $this.data('popup');
    var $thisText = $this.parent().parent().find('.item-models__text').text();
    var $thisInfo = $this.parent().parent().find('.item-models__info').html();
    var $thisPopup = $('div[data-popup = '+$thisData+']');
    $('.popup').removeClass('active active-special');
    $thisPopup.find('.popup-image__info').html($thisInfo);
    $thisPopup.find('.popup-image__text').html($thisText);

    if($thisParentPopup.hasClass('item-special')){
        $thisPopup.addClass('active  active-special');
    }else {
        $thisPopup.addClass('active');
    }
    initSlider();
    $('body').addClass('scroll');

});

function initSlider(){
    $('.popup-image__slider').slick({
        prevArrow:"<button type='button' class='slick-prev'><svg class=\"icon\"><use xlink:href=\"#ic-chevron\"></use></svg></button>",
        nextArrow:"<button type='button' class='slick-next'><svg class=\"icon\"><use xlink:href=\"#ic-chevron\"></use></svg></button>",
    });
}
$('.location-list').slick({
    prevArrow:"<button type='button' class='slick-prev'><svg class=\"icon\"><use xlink:href=\"#ic-arrow\"></use></svg></button>",
    nextArrow:"<button type='button' class='slick-next'><svg class=\"icon\"><use xlink:href=\"#ic-arrow\"></use></svg></button>",
    infinite: false,
    variableWidth: true,
    slidesToShow: 8,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                variableWidth: true,
            }
        },
    ]
});

$('.models-slider').slick({
    prevArrow:"<button type='button' class='slick-prev'><svg class=\"icon\"><use xlink:href=\"#ic-chevron\"></use></svg></button>",
    nextArrow:"<button type='button' class='slick-next'><svg class=\"icon\"><use xlink:href=\"#ic-chevron\"></use></svg></button>",
});
$('.popup-close').on('click', function (e) {

    $('.popup').removeClass('active');
    $('body').removeClass('scroll');
    $('.popup-image__slider').slick("unslick");
});
$('.popup').mouseup(function (e){
    var overlay = $('.popup .popup-centered');
    if (!overlay.is(e.target)
        && overlay.has(e.target).length === 0) {
        $('.popup').removeClass('active');
        $('body').removeClass('scroll');
    }
});

$('.file-input').change(function(){
    var curElement = $(this).parent().parent().find('.image');
    var curDel = $(this).parent().parent().find('.custom-file-preview-del');
    console.log(curElement);
    var reader = new FileReader();
    reader.onload = function (e) {
        curElement.attr('src', e.target.result).removeClass('hidden');
        curDel.removeClass('hidden');
        $('.photo-main').css('background-image', 'url('+ e.target.result +')').find('.icon').addClass('hidden');
    };
    reader.readAsDataURL(this.files[0]);
});
$('.custom-file-preview-del').on('click', function (e) {
    var $thisImage = $(this).next();
    var $thisParent = $(this).parent().prev().find('img').attr('src');
    $(this).addClass('hidden');
    $thisImage.attr('src', '').addClass('hidden');
    $('.photo-main').css('background-image', 'url('+ $thisParent +')').find('.icon').addClass('hidden');
});
$('.upload-photo, .photo-main').on('click', function (e) {
    $('.photo-wrap .photo-item:first-child .file-input').trigger('click');
});