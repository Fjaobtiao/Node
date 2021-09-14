$(document).ready(function () {
    $("#topo").hide()
    window.addEventListener("scroll", function () {
        if ($(window).scrollTop() > 400) {
            $("#topo").show();
        } else {
            $("#topo").hide();
        }
    });
})