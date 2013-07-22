// Global variables
var docURL = document.location.toString();
var postURL = docURL.replace("?view", "?describe");
var resourceURL = docURL.replace('?view', '');
var user = getUser();

$(document).ready(function() { 
    
    $(".initHide").hide();
    updateVoteCount();
    
    if ($("#annotationList").children().length == 0) {
        $("#annotationHeader").hide();
    }
    
    $('#loading-image').bind('ajaxStart', function(){
        $(this).show();
    }).bind('ajaxStop', function(){
        $(this).hide();
    });
});

//========================================//

function voteHandler(vote) {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("../../productivity-suite/apps/nanopubs/queries/existing-vote.rq?results&nanopub=" + encodeURIComponent(resourceURL) + "&user=" + encodeURIComponent(user)).send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                for (var i=0; i<rows; i++) {
                    var nanopub = data.getValue(i,0);
                    var upVote = data.getValue(i,1);
                    var downVote = data.getValue(i,2);
                    
                    // Handle no existing votes cases
                    if (upVote == undefined && downVote == undefined) {
                        writeVote(user, vote);
                    }
                    
                    // Handle existing upVote cases
                    if (vote == 'up' && upVote == user) {
                        calli.error("You are not allowed to cast more than one vote.");
                        return false;
                    } else if (vote == 'up' && downVote == user) {
                        switchVote('down');
                    }
                        
                    // Handle existing downVote cases
                    if (vote == 'down' && downVote == user) {
                        calli.error("You are not allowed to cast more than one vote.");
                        return false;
                    } else if (vote == 'down' && upVote == user) {
                        switchVote('up');
                    }
                }
            }
        );
    }});
}

//========================================//

function getUser() {
    var user = calli.getUserIri();
    if (user) {
        return user;
    } else {
        calli.error("You must be logged in to cast a vote.");
        return false;
    }
}

//========================================//

function writeVote(user, vote) {
    
    var protocol = document.location.protocol;
    var host = document.location.host;
    var file = 'PREFIX nano: <http://example.com/nanoSchema/> \n\n';
    if (vote == 'up') {
        file += 'INSERT DATA { <' + resourceURL + '> nano:upVotedBy <' + user + '> . } \n';
    } else if (vote == 'down') {
        file += 'INSERT DATA { <' + resourceURL + '> nano:downVotedBy <' + user + '> . } \n';
    }
    
    $.ajax({
        type: "POST",
        url: "/sparql",
        data: {"update": file},
        success: function(data) {
            updateVoteCount();
        },
        error: function(data) {
            calli.error("There was an error casting your vote. Please try again later.");
        }
    });
}

//========================================//

function switchVote(from) {
    var file = 'PREFIX nano: <http://example.com/nanoSchema/>\n\n';
    if (from == "up") {
        file += 'DELETE WHERE { <' + resourceURL + '> nano:upVotedBy <' + user + '> . }\n';
    } else if (from == "down") {
        file += 'DELETE WHERE { <' + resourceURL + '> nano:downVotedBy <' + user + '> . }\n';
    }
    
    $.ajax({
        type: "POST",
        url: "/sparql",
        data: {"update": file},
        success: function(data){
            if (from == "up") {
                writeVote(user, "down");
            } else if (from == "down") {
                writeVote(user, "up");
            }
        },
        error: function(data) {
            calli.error("There was an error changing your vote. Please try again later.");
        }
    });
}

//========================================//

function updateVoteCount() {
    getUpVotes(resourceURL);
    getDownVotes(resourceURL);
    getUpVoteList(resourceURL);
    getDownVoteList(resourceURL);
}

//========================================//

function getUpVotes(nanopub) {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("../../productivity-suite/apps/nanopubs/queries/up-votes-count.rq?results&nanopub=" + encodeURIComponent(nanopub)).send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                for (var i=0; i<rows; i++) {
                    var upVotes = data.getValue(i,0);
                    $("#upVoteCount").html(upVotes);
                }  
            }
        );
    }});
}

//========================================//

function getUpVoteList(nanopub) {
    $("#agreeList").empty();
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("../../productivity-suite/apps/nanopubs/queries/up-votes.rq?results&nanopub=" + encodeURIComponent(nanopub)).send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                for (var i=0; i<rows; i++) {
                    var user = data.getValue(i,0);
                    var label = data.getValue(i,1);
                    
                    $("#agreeList").append('<li><a href="' + user + '">' + label + '</a></li>');
                }  
            }
        );
    }});
}

//========================================//

function getDownVotes(nanopub) {
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("../../productivity-suite/apps/nanopubs/queries/down-votes-count.rq?results&nanopub=" + encodeURIComponent(nanopub)).send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                for (var i=0; i<rows; i++) {
                    var downVotes = data.getValue(i,0);
                    $("#downVoteCount").html(downVotes);
                }  
            }
        );
    }});
}

//========================================//

function getDownVoteList(nanopub) {
    $("#disagreeList").empty();
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("../../productivity-suite/apps/nanopubs/queries/down-votes.rq?results&nanopub=" + encodeURIComponent(nanopub)).send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                for (var i=0; i<rows; i++) {
                    var user = data.getValue(i,0);
                    var label = data.getValue(i,1);
                    
                    $("#disagreeList").append('<li><a href="' + user + '">' + label + '</a></li>');
                }  
            }
        );
    }});
}

//========================================//

function toggleStats() {
    $("#votingStats").toggle('fast');
    $("#votingStatsIcon").toggleClass('icon icon-zoom-in').toggleClass('icon icon-zoom-out');
}

//========================================//