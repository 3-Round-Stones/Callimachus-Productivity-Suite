var resource = document.location;
$(document).ready(function() {
    $("#bookmarkDropdown").attr('href', '/data/annotations/?create=/productivity-suite/apps/annotations/classes/Annotation&target=' + resource + '&motivation=Bookmarking');
    $("#taggingDropdown").attr('href', '/data/annotations/?create=/productivity-suite/apps/annotations/classes/Annotation&target=' + resource + '&motivation=Tagging');
    $("#commentingDropdown").attr('href', '/data/annotations/?create=/productivity-suite/apps/annotations/classes/Annotation&target=' + resource + '&motivation=Commenting');
    $("#classifyingDropdown").attr('href', '/data/annotations/?create=/productivity-suite/apps/annotations/classes/Annotation&target=' + resource + '&motivation=Classifying');
    $("#describingDropdown").attr('href', '/data/annotations/?create=/productivity-suite/apps/annotations/classes/Annotation&target=' + resource + '&motivation=Describing'); 
    $("#identifyingDropdown").attr('href', '/data/annotations/?create=/productivity-suite/apps/annotations/classes/Annotation&target=' + resource + '&motivation=Identifying');
    $("#highlightingDropdown").attr('href', '/data/annotations/?create=/productivity-suite/apps/annotations/classes/Annotation&target=' + resource + '&motivation=Highlighting');
});

/*function highlight(event) {
    var selText = encodeURIComponent(GetSelectedText());
    alert('selText = ' + selText);
    $("#highlightingDropdown").attr('href', '/rdf/2013/annotations/annotations/?create=/rdf/2013/annotations/classes/Annotation&target=' + resource + '&motivation=Highlighting&selText=' + selText);
    return calli.createResource(event)
}
function GetSelectedText() {
  var selectedText=(
        window.getSelection
        ?
            window.getSelection()
        :
            document.getSelection
            ?
                document.getSelection()
            :
                document.selection.createRange().text
     );
     
 if(!selectedText || selectedText=="") {
    if(document.activeElement.selectionStart) {
     selectedText = document.activeElement.value.substring(
          document.activeElement.selectionStart
          . document.activeElement.selectionEnd);
    }
 }
 return selectedText;
}*/