//$(document).ready(function() { });

function submitHandler(event) {
    // Create full name triple
    $("#fullName").attr('content', $("#givenName").val() + ' ' + $("#familyName").val());
    $(".controls").each(function( groupIndex ) {
        var group = $(this);
        var empty = true;
        
        group.find('input').each(function( inputIndex ) {
            if ($(this).attr('type') == "text" || $(this).attr('type') == "date" || $(this).attr('type') == "number" 
                || $(this).attr('type') == "tel" || $(this).attr('type') == "email" || $(this).attr('type') == "url") {
                if ($(this).val()) {
                    empty = false;
                    //alert('Group: ' + groupIndex + '. Input: ' + inputIndex + '. Has value: ' + $(this).val() + ' and ID: ' + $(this).attr('id'));
                }
            } else if ($(this).attr('type') == "radio") {
                if ($(this).checked) {
                    empty = false;
                }
            }
        });
        if (empty == true) {
            group.empty();
        }
    });
    return calli.saveResourceAs(event,calli.slugify($('#givenName').val() + ' ' + $('#familyName').val()))
}

function toggleInput(link) {
    var group = $(link).closest('.control-group');
    group.find('.controls').toggle('slow');
    group.find('.control-label').find('.icon').toggleClass('icon icon-chevron-up').toggleClass('icon icon-chevron-down');
    group.find('.controls').find(":input:visible").first().select();
}