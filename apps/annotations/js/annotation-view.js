$(document).ready(function() {
        
    // Remove headers for childless divs
    if ($(".annotationList").children().length == 0) {
        $(".annotationHeader").hide();
    }
    if ($(".highlightList").children().length == 0) {
        $(".highlightHeader").hide();
    }
    
    // Hide certain divs
    $(".initHide").hide();
    
    // Only display bodies div with content
    $(".bodies").each(function() {
        var num = $(this).children().length;
        var group = $(this).closest('.control-group');
        // Special case with classification div that is slowly killing me
        if ($(group).attr('id') == 'classificationDiv') {
            if (num == 1) {
                $(group).hide();    
            }
        } else {
            if (num == 0) {
                $(group).hide();    
            }    
        }
    });
    
    // Display target or target-source if available
    $("#targetIframe").toggle();
    $("#sourceIframe").toggle();
    if ($("#sourceAnchor").val() == undefined) {
        $("#sourceWrap").empty();
    } else {
        $("#targetWrap").empty();
    }
        
    // Higlight text within page - NOT CURRENTLY WORKING
    var highlightedText = $("#exact").text();
    if (highlightedText) {
        $("span:contains('" + highlightedText + "')").css("background-color", "yellow");    
    }
});

// ============================================= //

function toggleTargetFrame() {
    if ($("#sourceAnchor").val() == undefined) {
        var url = $("#targetAnchor").html();
        var src = $("#targetIframe").attr('src');
        if (!src) {
            $("#targetIframe").attr('src', url);    
        }
        $("#targetIframe").toggle('slow');
    } else {
        var url = $("#sourceAnchor").html();
        var src = $("#sourceIframe").attr('src');
        if (!src) {
            $("#sourceIframe").attr('src', url);    
        }
        $("#sourceIframe").toggle('slow');
    }
    
    // Handle button display
    var icon = $("#iframeToggleIcon");
    var button = $("#iframeToggleSpan");
    if (icon.hasClass('icon icon-plus-sign icon-white')) {
        icon.attr('class', 'icon icon-minus-sign icon-white');
        button.html("Hide");
    } else {
        icon.attr('class', 'icon icon-plus-sign icon-white');  
        button.html("Display");
    }
}

// ============================================= //

function highlightToggle() {
    var label = $('#selectionLink');
    $('.highlightContext').toggle();
    if (label.html() == "Show context") {
        label.html("Hide context");
    } else {
        label.html("Show context");
    }
}