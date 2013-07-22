// nanopublication-create.js

// Global Variables
var predicates = [];

$(document).ready(function() {
    populatePredicates();
});

// ============================================= //

$(document).bind('DOMNodeInserted', function(e) {
    var element = e.target;
    var parentID = $(element).parent().attr("id");
    if ($(element).is("option")) {
        $("#" + parentID).change();
    }
});

// ============================================= //

function populatePredicates() {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("../../productivity-suite/apps/nanopubs/queries/predicates.rq?results").send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                $("#predicate").append('<option>Select a Predicate</option>');
                for (var i=0; i<rows; i++) {
                    var uri = data.getValue(i,0);
                    var label = data.getValue(i,1);
                    
                    label = label.replace(/\s+/g, '');
                    
                    predicates.push({ uri: uri, label: label });
                    $("#predicate").append('<option id="' + label + '">' + label + '</option>');
                }
            }
        );
    }});
}

// ============================================= //

function submitHandler(event) {

    // Collect appropriate predicate value and assign correct attributes
    var selected = $("#predicate").find("option:selected");
    var id = selected.attr('id');
    for (var obj in predicates) {
        var label = predicates[obj]["label"];
        if (id == label) {
            var uri = predicates[obj]["uri"];
            $("#" + label).attr('about', uri);
            $("#" + label).attr('property', label);
        }
    }
    
    // Make sure values are selected prior to assigning to variables
    if ($('#subject :selected').text() == "Select a Subject") {
        alert('Please select a Subject.');
        return false;
    }
    if ($('#predicate :selected').text() == "Select a Predicate") {
        alert('Please select a Predicate.');
        return false;
    }
    if ($('#object :selected').text() == "Select an Object") {
        alert('Please select an Object.');
        return false;
    }
    
    // Retrieve relevant values from page
    var slug;
    var enteredSlug = calli.slugify($('#label').val());
    var generatedSlug = calli.slugify($('#subject :selected').text() + 
        '-' + $('#predicate :selected').text() + 
        '-' + $('#object :selected').text());
    
    // Determine which label should be used
    if (enteredSlug == "") {
        slug = generatedSlug;
        $("#label").val(slug);
    } else {
        slug = enteredSlug;
    }
    
    // Collect values for nanopub statement and make turtle file
    var subject = $('#subject :selected').attr('about');
    var predicate = $("#predicate :selected").attr('about');
    var object = $('#object :selected').attr('about');
    var file = "<" + subject +"> <" + predicate + "> <" + object + "> ." 
    
    // Post nanopublication turtle file
    if (subject != undefined && predicate != undefined && object != undefined) {
        $.ajax({
            type: "POST",
            url: "/data/nanopublications/?contents",
            data: file,
            contentType: "text/turtle",
            headers: { 'slug': slug + '-statement.ttl' },
            async: false,
            success: function(data) {
                $("#statement").attr('content', data);
            },
            error: function(data) {
                alert('Error during AJAX file transaction. Ensure the file was not posted and try again. \n' + data);
            }
        });    
    } else {
        alert('Either the subject, predicate, or object of your triple is not defined.');
    }
    
    var attr = $("#statement").attr('content');
    if (typeof attr !== 'undefined' && attr !== false) {
        calli.saveResourceAs(event, slug);    
    }
    
    return false;
}

// ============================================= //

function toggleControls(button) {
    var group = $(button).closest('.control-group');
    group.find('.controls').toggle('slow');
    group.find('.control-label').find('.icon').toggleClass('icon-chevron-up').toggleClass('icon-chevron-down');
    group.find('.controls').find(":input:visible").first().select();
}

function toggle(div, icon) {
    $('#' + div).toggle('slow');
    if ($("#" + icon).hasClass('icon-chevron-down')) {
        $("#" + icon).attr('class', 'icon icon-white icon-chevron-up');
    } else {
        $("#" + icon).attr('class', 'icon icon-white icon-chevron-down');
    }
}