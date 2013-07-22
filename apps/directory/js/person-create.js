$(document).ready(function() {
    $(".initHide").hide();
});

function toggleInput(link) {
    var group = $(link).closest('.control-group');
    group.find('.controls').toggle('slow');
    group.find('.control-label').find('.icon').toggleClass('icon icon-chevron-up').toggleClass('icon icon-chevron-down');
    group.find('.controls').find(":input:visible").first().select();
}