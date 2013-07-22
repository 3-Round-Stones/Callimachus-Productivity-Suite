$(document).ready(function() {
    $('#table').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="anno"></table>' );
    $('#anno').dataTable( {
        "aoColumns": [
            { "sTitle": "Label", "sClass": "text-align: center"},
            { "sTitle": "Motivation", "sClass": "text-align: center"},
            { "sTitle": "Creator", "sClass": "text-align: center" },
            { "sTitle": "Timestamp", "sClass": "text-align: center" }
        ]
    });
            
    getAnnos();
});
        
function getAnnos() {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("queries/readme.rq").send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                for (var i=0; i<rows; i++) {
                    var link = data.getValue(i,0);
                    var label = data.getValue(i,1);
                    var motivation = data.getValue(i,2);
                    var creator = data.getValue(i,3);
                    var timestamp = data.getValue(i,4);
                        
                    content = '<a href="' + link + '">' + label +  '</a>';
                    motivation = '<a href="' + motivation + '">' + motivation + '</a>';
                    if (label != null) {
                        addRow(content, motivation, creator, timestamp);
                    }
                }
                $('#anno').dataTable().fnSort( [ [3,'desc'] ] );
            }
        );
    }});
}
        
function addRow(content, motivation, creator, timestamp) {
    $('#anno').dataTable().fnAddData( [
        content,
        motivation,
        creator,
        timestamp
    ]);
}
        
function clearTable() {
    $('#anno').dataTable().fnClearTable();
}