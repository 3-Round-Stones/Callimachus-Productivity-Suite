// rdf-article-link-edit.js

jQuery(function($){
    var deleted = false;
    $('#docForm').bind('calliDelete', function(event){
        deleted = true;
    });
    $('#docForm').bind('calliRedirect', function(event) {
        event.preventDefault();
        if (deleted) {
            deleted = false;
            // Once the document is deleted, delete the RDF
            calli.deleteResource($('#rdfForm'));
        } else {
            // Once the document is saved, save the RDF
            $('#rdfForm').submit();
        }
        return false;
    });
});