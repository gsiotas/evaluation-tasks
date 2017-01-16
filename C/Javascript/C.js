 require({
  paths: {
    "jquery-ui": "https://code.jquery.com/ui/1.11.3/jquery-ui.min"
  },
  map: {
    "*" : { "jquery" : "jquery-noconflict" }
  }
}, [ "jquery-noconflict", "jquery-ui"], function($) {

$( function() {
  $( "#sortable" ).sortable({
    placeholder: "ui-state-highlight"
  });
  $( "#sortable" ).disableSelection();
  $( "#sortable" ).on( "sortupdate", function( event, ui ) {
    var temp_array = $( "#sortable" ).sortable( "toArray" );
    $('.rating').val(temp_array.toString());
  } );
    
});
 
});

