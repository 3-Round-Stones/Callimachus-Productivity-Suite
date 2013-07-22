$(document).ready(function() {
    $('#table').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="nanopubs"></table>' );
    $('#nanopubs').dataTable( {
        "aoColumns": [
            { "sTitle": "Label", "sClass": "text-align: center"},
            { "sTitle": "Creator", "sClass": "text-align: center"},
            { "sTitle": "Annotations", "sClass": "text-align: center" },
            { "sTitle": "Up Votes", "sClass": "text-align: center" },
            { "sTitle": "Down Votes", "sClass": "text-align: center" }
        ]
    });
            
    getNanoPubs();
});
        
function getNanoPubs() {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("queries/landing-page.rq").send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                for (var i=0; i<rows; i++) {
                    var link = data.getValue(i,0);
                    var label = data.getValue(i,1);
                    var creator = data.getValue(i,2);
                    var annotations = data.getValue(i,3);
                    var upVotes = data.getValue(i,4);
                    var downVotes = data.getValue(i,5);
                        
                    content = '<a href="' + link + '">' + label +  '</a>';
                    if (label != null) {
                        addRow(content, creator, annotations, upVotes, downVotes);
                    }
                }
                $('#nanopubs').dataTable().fnSort( [ [3,'desc'] ] );
            }
        );
    }});
}
        
function addRow(content, creator, annotations, upVotes, downVotes) {
    $('#nanopubs').dataTable().fnAddData( [
        content,
        creator,
        annotations,
        upVotes,
        downVotes
    ]);
}
        
function clearTable() {
    $('#nanopubs').dataTable().fnClearTable();
}