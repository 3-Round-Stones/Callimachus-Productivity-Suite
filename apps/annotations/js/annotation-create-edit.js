// annotation-create-edit.js

// Global Variables
var motivations = [];
motivations.push(
    { uri: "http://www.w3.org/ns/oa#bookmarking", label: "Bookmarking" },
    { uri: "http://www.w3.org/ns/oa#classifying", label: "Classifying" },
    { uri: "http://www.w3.org/ns/oa#commenting", label: "Commenting" },
    { uri: "http://www.w3.org/ns/oa#highlighting", label: "Highlighting" },
    { uri: "http://www.w3.org/ns/oa#identifying", label: "Identifying" },
    { uri: "http://www.w3.org/ns/oa#tagging", label: "Tagging" }
);

$(document).ready(function() {

    // Hide certain divs by default
    $(".initHide").hide();

    // Handle annotations opened in dialog box
    if ($("html").hasClass('iframe')) {
    
        // Adjust styling if opened in iFrame
        $(".iFrameStretch6").attr('class', 'well well-small span6');
        $(".iFrameStretch12").attr('class', 'well well-small span12');
        $(".iFrameStretch12NoWell").attr('class', 'span12');
        $("#targetDropZone").removeAttr('dropzone');
        $("#targetDropZone").removeAttr('ondrop');
        
        // Handle controls unnecessary for popup box
        $("#iframeToggleButton").remove();
        $("#submitURLDiv").remove();
        $("#targetRemove").remove();
    }
    
    // Handle different forms of URL submission
    $('.urlSubmit').focusout(function() {
        var url = $(this).val();
        targetHandler(url);
    });

    // Submit all body elements
    $('#pageForm').submit(function() {
        var resource = $(this).attr('resource');
        if (resource) {
        
            // If the div is visible, save all child resources. If not, empty it.
            if ($('#bookmarkBodies').is(":visible")) {
                $('#bookmarkBodies').children('[resource]').each(function(i) {
                    $(this).attr('resource', resource + "#bookmarkBody" + i)
                });    
            } else {
                $('#bookmarkBodies').empty();
            }
            
            if ($('#classificationBodies').is(":hidden")) {
                $('#classificationBodies').empty();
            }
            
            if ($('#commentBodies').is(":visible")) {
                $('#commentBodies').children('[resource]').each(function(i) {
                    $(this).attr('resource', resource + "#commentBody" + i)
                });    
            } else {
                $('#commentBodies').empty();
            }
            
            if ($('#highlightBodies').is(":visible")) { 
                $('#highlightBodies').children('[resource]').each(function(i) {
                    $(this).attr('resource', resource + "#highlightBody" + i)
                });    
            } else {
                $('#highlightBodies').empty();
            }
            
            if ($('#identificationBodies').is(":visible")) {
                $('#identificationBodies').children('[resource]').each(function(i) {
                    $(this).attr('resource', resource + "#identificationBody" + i)
                });    
            } else {
                $('#identificationBodies').empty();
            }
            
            if ($('#tagBodies').is(":visible")) {
                $('#tagBodies').children('[resource]').each(function(i) {
                    $(this).attr('resource', resource + "#tagBody" + i)
                });    
            } else {
                $('#tagBodies').empty();
            }
            
            if ($('#semTagBodies').is(":visible")) {
                $('#semTagBodies').children('[resource]').each(function(i) {
                    $(this).attr('resource', resource + "#semTagBody" + i)
                });    
            } else {
                $('#semTagBodies').empty();
            }
        }
    });
    
    // Check for parameters
    checkForParams();
    
    // Handle motivation changes appropriately
    displayHandler('#motivation');
    $('#motivation').on("change", function() {
        displayHandler('#motivation');
    });
});

// ============================================= //

function displayHandler(element) {
    var motivation = $(element).val();
    if (motivation == "Bookmarking") {
            $("#bookmarkDiv").show();
            // Hide all other divs
            $("#classificationDiv").hide();
            $("#commentDiv").hide();
            $("#highlightDiv").hide();
            $("#highlightButton").hide();
            $("#highlightOutput").hide();
            $("#identificationDiv").hide();
            $("#tagDiv").hide();
        } else if (motivation == "Classifying") {
            $("#classificationDiv").show();
            // Hide all other divs
            $("#bookmarkDiv").hide();
            $("#commentDiv").hide();
            $("#highlightDiv").hide();
            $("#highlightButton").hide();
            $("#highlightOutput").hide();
            $("#identificationDiv").hide();
            $("#tagDiv").hide();
        } else if (motivation == "Commenting") {
            $("#commentDiv").show();
            // Hide all other divs
            $("#bookmarkDiv").hide();
            $("#classificationDiv").hide();
            $("#highlightDiv").hide();
            $("#highlightButton").hide();
            $("#highlightOutput").hide();
            $("#identificationDiv").hide();
            $("#tagDiv").hide();
        } else if (motivation == "Highlighting") {
            $("#highlightDiv").show();
            $("#highlightButton").show();
            // Hide all other divs
            $("#bookmarkDiv").hide();
            $("#classificationDiv").hide();
            $("#commentDiv").hide();
            $("#identificationDiv").hide();
            $("#tagDiv").hide();
        } else if (motivation == "Identifying") {
            $("#identificationDiv").show();
            // Hide all other divs
            $("#bookmarkDiv").hide();
            $("#classificationDiv").hide();
            $("#commentDiv").hide();
            $("#highlightDiv").hide();
            $("#highlightButton").hide();
            $("#highlightOutput").hide();
            $("#tagDiv").hide();
        } else if (motivation == "Tagging") {
            $("#tagDiv").show();
            // Hide all other divs
            $("#bookmarkDiv").hide();
            $("#classificationDiv").hide();
            $("#commentDiv").hide();
            $("#highlightDiv").hide();
            $("#highlightButton").hide();
            $("#highlightOutput").hide();
            $("#classificationDiv").hide();
            $("#identificationDiv").hide();
        }
}

// ============================================= //

function submitHandler(event) {

    // Retrieve relevant values from page
    var slug = calli.slugify($('#label').val());
    var source = $("#targetiFrame").attr('src');

    // Collect appropriate motivation value and save
    var selected = $("#motivation").find("option:selected");
    var id = selected.attr('id');
    for (var obj in motivations) {
        var label = motivations[obj]["label"];
        if (id == label) {
            var uri = motivations[obj]["uri"];
            $("#" + label).attr('about', uri);
            $("#" + label).attr('property', label);
        }
    }
    
    // Handle highlighting saving
    if ($(selected).val() == "Highlighting") {
        
        // Assign text field correct resource attribute for saving
        $("#target").attr('resource', slug + '#target');
        
        // Write triples about specific #target resource
        var baseURL = document.location.protocol + "//" + document.location.host + document.location.pathname;
        var targetURL = "<" + baseURL + slug + "#target>";
        var selectorURL = "<" + baseURL + slug + "#selector>";
        var prefix = $("#beforeSelection").val();
        var exact = $("#currentSelection").val();
        var suffix = $("#afterSelection").val();
       
        var file = "@prefix oa: <http://www.w3.org/ns/oa#> . \n" +
            "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> . \n\n";
        file += targetURL + " oa:hasSelector " + selectorURL + " \n" +
            " ; oa:hasSource \"" + source + "\" . \n\n";
        file += selectorURL + " rdf:type oa:TextQuoteSelector \n" + 
            " ; oa:prefix \"" + prefix + "\" \n" +
            " ; oa:exact \"" + exact + "\" \n" +
            " ; oa:suffix \"" + suffix + "\" . \n";
            
        $.ajax({
            type: "POST",
            url: "/rdf/2013/annotations/annotations/?contents",
            data: file,
            contentType: "text/turtle",
            headers: { 'slug': slug + '-selector.ttl' },
            async: false,
            success: function(data) {
                $("#relatedDoc").attr('content', data);
            },
            error: function(data) {
                alert('Error during AJAX file transaction. Ensure the file was not posted and try again. \n' + data);
            }
        });
    } else {
        calli.saveResourceAs(event, slug);
    }
    
    var attr = $("#relatedDoc").attr('content');
    if (typeof attr !== 'undefined' && attr !== false) {
        calli.saveResourceAs(event, slug);   
    }
    
    return false;
}

// ============================================= //

function targetHandler(url) {
    $("#target").attr('resource', url);
    $("#targetText").text(url);
    $("#targetLink").attr('href', url);
    $("#submitURLDiv").toggle('slow');
    if ($("#targetDisplayDiv").is(':visible')) {
        $("#targetDisplayDiv").hide();
    } else {
        $("#targetDisplayDiv").show();
    }
}

// ============================================= //

function clearTargetHandler() {
    var button = $("#iframeToggleSpan");
    var icon = $("#iframeToggleIcon");
    icon.attr('class', 'icon icon-plus-sign icon-white');  
    button.html("Display");  // Set the iFrame display/hide button back to "Display"
    $("#target").removeAttr('resource');
    $("#submitURLDiv").toggle('slow');
    $("#targetDisplayDiv").toggle('slow');
    $("#targetiFrameDiv").hide();  // Force the iFrame to hide
    $("#targetiFrame").attr('src', ''); // Clear the src attribute of the iFrame
    $("#highlightOutput").hide();
}

// ============================================= //

// Handle drag and drop of resources into Target of annotation
function onDropURL(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    var url = ev.dataTransfer.getData("Text");
    if (url == "" || url == null || url == undefined) {
        alert('URL is blank, please use a resource that can be identified by URL');
    } else {
        targetHandler(url);
    }
}

// ============================================= //

// Retrieve surrounding context for highlight and output to DOM
function highlight() {
    $("#highlightOutput").show();
    
    var iString = $("#targetiFrame").contents().text();
    var selection = getSelText();
    var pinPoint = iString.indexOf(selection);
    var before = iString.substr(pinPoint-10, 10);
    var after = iString.substr(pinPoint+selection.toString().length, 10);
        
    $("#beforeSelection").val(before);
    $("#currentSelection").val(selection);
    $("#afterSelection").val(after);
}

// ============================================= //

// Retrieve highlighted text from target iFrame
function getSelText() {
    var txt = "";
    var iframe = document.getElementById('targetiFrame');
    
    try {
        if (iframe.contentWindow.getSelection()) {
            txt = iframe.contentWindow.getSelection();
        } else {
            alert('Please highlight some text within the document');
        }
    } catch(e) {
        alert('Highlighting cannot be performed on a remote resource. Permission has been denied by the document host. This is a product of the Same Origin Policy.');
    }
    
    return txt.toString();
}

// ============================================= //

function toggleiFrame() {
    var url = $("#target").attr('resource');
    var src = $("#targetiFrame").attr('src');
    if (!src) {
        $("#targetiFrame").attr('src', url);
    }
    $("#targetiFrameDiv").toggle('slow');
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

// ============================================= //

function checkForParams() {

    // Check for target URL passed in as parameter
    var target = getParameterByName('target');
    var motivation = getParameterByName('motivation');
    
    // If target param exists, display appropriately
    if (target) {
        targetHandler(target);
    }
    // If motivation param exsits, assign to select
    if (motivation) {
        $("#motivation").val(motivation);
        $("#motivationHeader").html(motivation + ' ');
        $("#motivationDiv").hide();
    }
}

// ============================================= //

// Search for, parse, and return parameters in URL query string by param name
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1]);
}

// ============================================= //

// Open and close div, change icon appropriately
function toggleControls(button) {
    var group = $(button).closest('.control-group');
    group.find('.controls').toggle('slow');
    group.find('.control-label').find('.icon').toggleClass('icon-chevron-up').toggleClass('icon-chevron-down');
    group.find('.controls').find(":input:visible").first().select();
}

