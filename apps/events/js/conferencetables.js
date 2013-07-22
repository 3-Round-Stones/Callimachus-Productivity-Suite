// conferencetables.js

// =================================== //
// ===== Code to call both blocks ==== //
// =================================== //
function init() {
    getConferences();
    getPastConferences();
}

// =================================== //
// == Code for Upcoming Conferences == //
// =================================== //
$(document).ready(function() {
    $('#listing').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="conferences"></table>' );
    $('#conferences').dataTable( {
        "aoColumns": [
            { "sTitle": "Facility Name" },
            { "sTitle": "Location" },
            { "sTitle": "Start Date" },
            { "sTitle": "End Date" },
            { "sTitle": "Due Date" },
            { "sTitle": "Submission Type" },
            { "sTitle": "Fees" },
            { "sTitle": "T & E" },
            { "sTitle": "Status" }
        ],
        'fnRowCallback': function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            if (aData[8] == "Attending") {
                $('td:eq(8)', nRow).addClass('attendingRowColor');
            }
            if (aData[8] == "To Discuss") {
                $('td:eq(8)', nRow).addClass('toDiscussRowColor');
            }
            if (aData[8] == "Rejected") {
                $('td:eq(8)', nRow).addClass('rejectedRowColor');
            }
            return nRow;
        },
        "iDisplayLength": 100
    });
});
        
function addRow(name, loc, sdate, edate, ddate, stype, cost, travel, status) {
    $('#conferences').dataTable().fnAddData( [
        name,
        loc,
        sdate,
        edate,
        ddate,
        stype,
        cost,
        travel,
        status
    ]);
}
        
function clearTable() {
    $('#conferences').dataTable().fnClearTable();
}

function formatDate(date) {
    date = date.toString();
    var dateArray = date.split(" ");
    date = dateArray[1] + " " + dateArray[2] + ", " + dateArray[3];
    return date;
}
        
function getConferences() {
    clearTable();
    
    // Set current date for SPARQL Compare
    var now = new Date();
    now.setDate(now.getDate()-1);
    now = now.toISOString();
    now = now.substring(0,10);
    
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("queries/conferences.rq?results&now="+now).send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                if (rows > 0) {
                    for (var i=0; i<rows; i++) {
                        var link = data.getValue(i,0);
                        var name = data.getValue(i,1);
                        var addrLabel = data.getValue(i,2);
                        var streetAddr = data.getValue(i,3);
                        var extAddr = data.getValue(i,4);
                        var zipCode = data.getValue(i,5);
                        var locality = data.getValue(i,6);
                        var region = data.getValue(i,7);
                        var country = data.getValue(i,8);
                        var venueURL = data.getValue(i,9);
                        var sdate = data.getValue(i,10);
                        var edate = data.getValue(i,11);
                        var ddate = data.getValue(i,12);
                        var stype = data.getValue(i,13);
                        var fees = data.getValue(i,14);
                        var travel = data.getValue(i,15);
                        var status = data.getValue(i,16);
                    
                        // Parse dates to make more readable
                        if (sdate != null && sdate != "") {
                            var sdateFormat = formatDate(sdate);
                            sdate = sdate.toISOString();
                        }
                        if (edate != null && sdate != "") {
                            var edateFormat = formatDate(edate);
                            edate = edate.toISOString();
                        }
                        if (ddate != null && ddate != "") {
                            var ddateFormat = formatDate(ddate); 
                            ddate = ddate.toISOString();
                        }
                    
                        // Make name link to individual conference view
                        content = "<a href='" + link + "'>" + name +  "</a>";
                        
                        // Make location link to venueURL
                        loc = "<a href='" + venueURL + "'>" + locality + ", " + country + "</a>";
                    
                        // Format cost
                        if ((fees == null || fees == "") && fees != 0) {
                            fees = "TBD";
                        } else {
                            fees = "$" + fees;
                        }
                        if ((travel == null || travel == "") && travel != 0) {
                            travel = "TBD";    
                        } else {
                            travel = "$" + travel;
                        }

                        if (link != null && link != "") {
                            addRow(content, loc, sdateFormat, edateFormat, ddateFormat, stype, fees, travel, status);    
                        }
                    
                        $('#conferences').dataTable().fnSort( [ [2,'asc'] ] );
                        
                    } // Close for() loop 
                } // Close if(rows > 0)
            } // Close function(result)
        ); // Close google.vis.query
    }}); // Close google.load
} // Close getConferences()

// =================================== //
// ==== Code for past conferences ==== //
// =================================== //

$(document).ready(function() {
    $('#past').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="pastConf"></table>' );
    $('#pastConf').dataTable( {
        "aoColumns": [
            { "sTitle": "Facility Name" },
            { "sTitle": "Location" },
            { "sTitle": "Start Date" },
            { "sTitle": "End Date" },
            { "sTitle": "Due Date" },
            { "sTitle": "Submission Type" },
            { "sTitle": "Fees" },
            { "sTitle": "T & E" },
            { "sTitle": "Status" }
        ],
        "iDisplayLength": 100
    });
});

function addPastRow(name, loc, sdate, edate, ddate, stype, cost, travel, status) {
    $('#pastConf').dataTable().fnAddData( [
        name,
        loc,
        sdate,
        edate,
        ddate,
        stype,
        cost,
        travel,
        status
    ]);
}

function clearPastTable() {
    $('#pastConf').dataTable().fnClearTable();
}

function getPastConferences() {
    clearPastTable();
    
    // Set current date for SPARQL Compare
    var now = new Date();
    now = now.toISOString();
    now = now.substring(0,10);
    
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("queries/past_conferences.rq?results&now="+now).send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                if (rows > 0) {
                    for (var i=0; i<rows; i++) {
                        var link = data.getValue(i,0);
                        var name = data.getValue(i,1);
                        var addrLabel = data.getValue(i,2);
                        var streetAddr = data.getValue(i,3);
                        var extAddr = data.getValue(i,4);
                        var zipCode = data.getValue(i,5);
                        var locality = data.getValue(i,6);
                        var region = data.getValue(i,7);
                        var country = data.getValue(i,8);
                        var venueURL = data.getValue(i,9);
                        var sdate = data.getValue(i,10);
                        var edate = data.getValue(i,11);
                        var ddate = data.getValue(i,12);
                        var stype = data.getValue(i,13);
                        var fees = data.getValue(i,14);
                        var travel = data.getValue(i,15);
                        var status = data.getValue(i,16);
                    
                        // Parse dates to make more readable
                        if (sdate != null && sdate != "") {
                            var sdateFormat = formatDate(sdate);
                            sdate = sdate.toISOString();
                        }
                        if (edate != null && sdate != "") {
                            var edateFormat = formatDate(edate);
                            edate = edate.toISOString();
                        }
                        if (ddate != null && ddate != "") {
                            var ddateFormat = formatDate(ddate); 
                            ddate = ddate.toISOString();
                        }
                    
                        // Make name link to individual conference view
                        content = "<a href='" + link + "'>" + name +  "</a>";
                        
                        // Make location link to venueURL
                        loc = "<a href='" + venueURL + "'>" + locality + ", " + country + "</a>";
                    
                        // Format cost
                        fees = "$" + fees;
                        travel = "$" + travel;
                    
                        if (link != null && link != "") {
                            addPastRow(content, loc, sdateFormat, edateFormat, ddateFormat, stype, fees, travel, status);
                        }
                        
                        $('#pastConf').dataTable().fnSort( [ [2,'asc'] ] );
                        
                    } // Close for() loop
                } // Close if(rows > 0)
            } // Close function(result)
        ); // Close google.vis.query
    }}); // Close google.load
} // Close getConferences()