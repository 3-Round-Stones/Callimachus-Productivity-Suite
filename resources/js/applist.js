/*
 * Create the application slider on the productivity suite home page.
 */

$(document).ready(function() {
    getApplications();
});

function getApplications() {
    clearSliderDiv();
    
    google.load("visualization", "1.0", {callback:function() {
        new google.visualization.Query("resources/queries/apps.rq?results").send(
            function(result){
                var data = result.getDataTable();
                var rows = data.getNumberOfRows();
                var content = "";
                if (rows > 0) {
                    for (var i=0; i<rows; i++) {
                        var label = data.getValue(i,0);
                        var comment = data.getValue(i,1);
                        var link = data.getValue(i,2);
                        var image = data.getValue(i,3);
                        
                        //alert("Row " + i + ":\n" + label + "\n" + comment + "\n" + link + "\n" + image);
                    
                        var appDiv = "<div>";
    			        appDiv += "<a href=\"" + link + "?view\">";
				        appDiv += "<img src=\"" + image + "\" alt=\"Icon for " + label + "\" />";
				        appDiv += "<h2><span>" + label + "</span></h2>";
				        appDiv += "<p>" + comment + "</p>";
				        appDiv += "</a>";
			            appDiv += "</div>";
                        
                        $('#slider')
                        // divs appended here, assuming you are using the DIV layout
                        .append(appDiv);
                    } // Close for() loop
                } // Close if(rows > 0)
                initMovingBoxes();
            } // Close function(result)
        ); // Close google.vis.query
    }}); // Close google.load
} // Close getApplications()

function clearSliderDiv () {
    $('#slider').innerHTML = "";
}

function initMovingBoxes() {

	$('#slider').movingBoxes({
		startPanel   : 1,      // start with this panel
		reducedSize  : 0.8,    // non-current panel size: 80% of panel size
		buildNav     : true,   // if true, navigation links will be added
		navFormatter : function(index, panel){ return panel.find('h2 span').text(); } // function which gets nav text from span inside the panel header

		// width and panelWidth options removed in v2.2.2, but still backwards compatible
		// width        : 500,    // overall width of movingBoxes (not including navigation arrows)
		// panelWidth   : 0.7,    // current panel width

	});

	// Examples of how to move the panel from outside the plugin.
	// get (all 3 examples do exactly the same thing):
	//  var currentPanel = $('#slider-one').data('movingBoxes').currentPanel(); // returns # of currently selected/enlarged panel
	//  var currentPanel = $('#slider-one').data('movingBoxes').curPanel; // get the current panel number directly
	//  var currentPanel = $('#slider-one').getMovingBoxes().curPanel; // use internal function to return the object (essentially the same as the line above)

	// set (all 4 examples do exactly the same thing):
	//  var currentPanel = $('#slider-one').data('movingBoxes').currentPanel(2, function(){ alert('done!'); }); // returns and scrolls to 2nd panel
	//  var currentPanel = $('#slider-one').getMovingBoxes().currentPanel(2, function(){ alert('done!'); }); // just like the line above
	//  var currentPanel = $('#slider-one').movingBoxes(2, function(){ alert('done!'); }); // scrolls to 2nd panel, runs callback & returns 2.
	//  var currentPanel = $('#slider-one').getMovingBoxes().change(2, function(){ alert('done!'); }); // internal change function is the main function

	$('.dlinks').delegate('a', 'click', function(){
		// slider # stored in the text
		slider.movingBoxes( $(this).text() );
		return false;
	});

	// Report events to console
	$('.mb-slider').bind('initialized.movingBoxes initChange.movingBoxes beforeAnimation.movingBoxes completed.movingBoxes',function(e, slider, tar){
		// show object ID + event in the console
		// namespaced events: e.g. e.type = "completed", e.namespace = "movingBoxes"
		if (window.console && window.console.log){
			var txt = slider.$el[0].id + ': ' + e.type + ', now on panel #' + slider.curPanel + ', targeted panel is ' + tar;
			console.log( txt );
		}
	});

}
