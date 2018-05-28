function autoScroll() {
    $(".line").animate({
        marginTop: "-39px"
    }, 1000, function() {
        $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
    })
}
var anifun = setInterval('autoScroll()', 3000);