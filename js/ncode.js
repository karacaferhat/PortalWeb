// by HÜREL - BÜYÜK İHTİMALLE GEÇİCİ
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});
/*
Burada ne yapmaya çalıştığını anlatmam gerekebilir Ferhat'a!!!!!
Yan taraftaki menünün alt kırılımları için, mevcut sayfanın adını refere edip class atadım.
Statik bir isimlendirme olacaksa bu durum işe yarar ama her sayfa için isim verilip tek tek
buraya girilip scripte ek yapmak gerekir. Dinamik bir çözüm bulmak için bir mantık geliştirmek gerekecek.
*/
var theTitle=$('body').attr('class');
if (theTitle=='orders') {
    $('#sideMenu li').removeClass('active');
    $('#orders').addClass('show');
    $('a[href="/Orders"]').parent().addClass('active');
    $('a[href="/Orders"]').parent().parent().addClass('show').siblings('.collapser').removeClass('collapsed');
    $('a[href="/Orders"]').parent().parent().parent().addClass('active');
    $('*[href="#orders"]').addClass('active').removeClass('collapsed');
}
$(document).on('click','#sideMenuCollapser',function(){
    $('#sideMenuCollapser').toggleClass('min');
    $('#sideMenu').addClass('iconizing');
    setTimeout(function(){
        $('#sideMenu').toggleClass('iconizing iconized');
    },300);
    $('.collapse.show').addClass('mini').removeClass('show');
});
$(document).on('click','#sideMenuCollapser.min',function(){
    $('.collapse.mini').addClass('show').removeClass('mini');
});


// Login sayfasına yönlendirmece:::::::::::::
var
url=$(location).attr('href'),
lst=url.substring(url.lastIndexOf('/') + 1);
if (lst=="") {
    console.log('not came from login');
    location.href=lst+'/Login';
}
// END Login sayfasına yönlendirmece:::::::::::::
// Login Form Submit
$(document).on("click","#loginSubmit",function(){
    setTimeout(function(){
        location.href=location.protocol+"//"+location.host + "/"+'?LoggedIn';
    },200);
});
// END Login Form Submit


// Fullscreen Preloader:::::::
$(document).ready(function(){
    $('.login #sideMenu, .login header.header, .login footer.footer').remove();
    setTimeout(function(){
        $(".fs-preloader").fadeOut(function(){
            $(this).remove();
        });
    },100);
});
// END Fullscreen Preloader:::::::

// END by HÜREL