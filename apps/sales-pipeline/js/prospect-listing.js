getProspectsData();
getPastCustomersData();
getPastProspectsData();

$(document).ready(function() {
    // Current prospects
    $('#listing').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="prospects"></table>' );
    $('#prospects').dataTable( {
        "aoColumns": [
            { "sTitle": "Name" },
            { "sTitle": "Status" },
            { "sTitle": "Priority" },
            { "sTitle": "Total Value" },
            { "sTitle": "Estimated Value" }
        ],
        "iDisplayLength": 50
    });
    // Past customers
    $('#past-customers-listing').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="past-customers"></table>' );
    $('#past-customers').dataTable( {
        "aoColumns": [
            { "sTitle": "Name" },
            { "sTitle": "Total Value" }
        ],
        "iDisplayLength": 50
    });
    // Past prospects
    $('#past-prospects-listing').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="past-prospects"></table>' );
    $('#past-prospects').dataTable( {
        "aoColumns": [
            { "sTitle": "Name" }
        ],
        "iDisplayLength": 50
    });
});

///////////////////////////
// For current prospects //
///////////////////////////
function addProspectsRow(widget, name, status, priority, totalValue) {
    var percentageComplete = (status.split(/\%/))[0];
    var estimatedValue = totalValue * percentageComplete * .01;
    $(widget).dataTable().fnAddData( [
        name,
        status,
        priority,
        totalValue,
        estimatedValue
    ]);
}
        
function getProspectsData() {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("queries/prospects.rq?results").send(
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
                        var totalValue;
                        totalValue = data.getValue(i,4);
                    
                        // Make name link to individual task view
                        content = "<a href='" + link + "'>" + name +  "</a>";
                        
                        if ( typeof(totalValue) == 'undefined' || totalValue == null ) {
                            totalValue = "0";
                        }
                        
                        if (link != null && link != "") {
                            addProspectsRow('#prospects', content, status, priority, totalValue);    
                        }
                    
                        $('#prospects').dataTable().fnSort( [ [1,'asc'] ] );
                        
                    } // Close for() loop 
                } // Close if(rows > 0)
            } // Close function(result)
        ); // Close google.vis.query
    }}); // Close google.load
} // Close getData()

////////////////////////
// For past customers //
////////////////////////
function addPastCustomersRow(widget, name, totalValue) {
    $(widget).dataTable().fnAddData( [
        name,
        totalValue
    ]);
}
        
function getPastCustomersData() {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("queries/past-customers.rq?results").send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                if (rows > 0) {
                    for (var i=0; i<rows; i++) {
                        var link = data.getValue(i,0);
                        var name = data.getValue(i,1);
                        var totalValue = data.getValue(i,2);
                    
                        // Make name link to individual task view
                        content = "<a href='" + link + "'>" + name +  "</a>";
                        
                        if ( typeof(totalValue) == 'undefined' || totalValue == null ) {
                            value = "0";
                        }

                        if (link != null && link != "") {
                            addPastCustomersRow('#past-customers', content, totalValue);    
                        }
                    
                        $('#past-customers').dataTable().fnSort( [ [1,'asc'] ] );
                        
                    } // Close for() loop 
                } // Close if(rows > 0)
            } // Close function(result)
        ); // Close google.vis.query
    }}); // Close google.load
} // Close getData()

////////////////////////
// For past prospects //
////////////////////////
function addPastProspectsRow(widget, name) {
    $(widget).dataTable().fnAddData( [
        name
    ]);
}
        
function getPastProspectsData() {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("queries/past-prospects.rq?results").send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                if (rows > 0) {
                    for (var i=0; i<rows; i++) {
                        var link = data.getValue(i,0);
                        var name = data.getValue(i,1);
                    
                        // Make name link to individual task view
                        content = "<a href='" + link + "'>" + name +  "</a>";

                        if (link != null && link != "") {
                            addPastProspectsRow('#past-prospects', content);    
                        }
                    
                        $('#past-prospects').dataTable().fnSort( [ [1,'asc'] ] );
                        
                    } // Close for() loop 
                } // Close if(rows > 0)
            } // Close function(result)
        ); // Close google.vis.query
    }}); // Close google.load
} // Close getData()
