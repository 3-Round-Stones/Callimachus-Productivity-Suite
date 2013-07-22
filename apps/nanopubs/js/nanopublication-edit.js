// Open dialog box for editing bodies of annotations
function editBody(link) {
    var href = link;
    var title = 'Edit this body';
    var options = {
        onmessage: function(event) {
            if (event.data.indexOf('PUT src\n') == 0) {
                var data = event.data;
                src = data.substring(data.indexOf('\n\n') + 2);
            }
        }
    };
    var dialog = calli.openDialog(href, title, options);
}