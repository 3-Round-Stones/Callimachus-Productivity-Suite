// rdf-article-link-create.js

jQuery(function($){
    $('#docForm').bind('calliRedirect', function(event) {
        event.preventDefault();
        // Link the RDF item to the Article
        var docUri = event.location.replace(/\?.*$/,'');
        var span = $('<span />');
        span.attr('resource', docUri);
        $('#article').children().remove();
        $('#article').append(span);
        
        // Once the document is saved, save the RDF
        $('#rdfForm').submit();
        return false;
    });
});