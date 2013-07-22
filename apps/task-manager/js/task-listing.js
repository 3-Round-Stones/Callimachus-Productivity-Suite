getTasks();

$(document).ready(function() {
    $('#listing').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="tasks"></table>' );
    $('#tasks').dataTable( {
        "aoColumns": [
            { "sTitle": "Name" },
            { "sTitle": "Priority" },
            { "sTitle": "Status" }
        ],
        "iDisplayLength": 50
    });
});
        
function addRow(name, status, priority) {
    $('#tasks').dataTable().fnAddData( [
        name,
        status,
        priority
    ]);
}
        
function getTasks() {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("queries/tasks.rq?results").send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                if (rows > 0) {
                    for (var i=0; i<rows; i++) {
                        var link = data.getValue(i,0);
                        var name = data.getValue(i,1);
                        var priority = data.getValue(i,2);
                        var status = data.getValue(i,3);
                    
                        // Make name link to individual task view
                        content = "<a href='" + link + "'>" + name +  "</a>";

                        if (link != null && link != "") {
                            addRow(content, priority, status);    
                        }
                    
                        $('#tasks').dataTable().fnSort( [ [1,'asc'] ] );
                        
                    } // Close for() loop 
                } // Close if(rows > 0)
            } // Close function(result)
        ); // Close google.vis.query
    }}); // Close google.load
} // Close getTasks()