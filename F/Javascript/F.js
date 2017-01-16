require(['jquery-noconflict'], function($) {
 //Ensure MooTools is where it must be
  Window.implement('$', function(el, nc){
    return document.id(el, nc, this.document);
  });

  var $ = window.jQuery;

$( function() {
  $(".card").each(function() {
  	$(this).find('.bettertranslation').val($(this).find("#ts").text());
  });
  
  var left_or_right = null; //left tags or right tags
  var row_id = null; //type of row-ROWID
  var array_viewable_data = [];
  var array_viewable_data_t = [];

  $('.select').mouseup(function( event ) {
      var selection = window.getSelection().toString();
      if (selection !== "") {
        $('#infoDiv').slideDown();
        $('#infoDiv').css('display', 'block');
        $('#infoDiv').css('position', 'absolute');
        $('#infoDiv').css('left', event.pageX - 10);
        $('#infoDiv').css('top', event.pageY + 25);
        $('.dt').val(selection);
        row_id = $(this).attr("class").match(/row-\d.*/);
        row_id = row_id[0];
        
        if ($(this).hasClass('left-sentence')) {
          left_or_right = "left";
        } else {
          left_or_right = "right";
        }
      } else {
        $('#infoDiv').css('display', 'none');
      }
  });
 
  // appending in the list
  $('#button').click(function(e) {
    $('#infoDiv').slideUp();
    var word = $('.dt').val();
    var selectedVal = "";
	var selected = $(".error_type input[type='radio']:checked");
    if (selected.length > 0) {
      if(word !== ""){
        selectedVal = selected.val();
      if (left_or_right == "left") {
          $('.left-tags.'+row_id).append('<li class="addedTag">"'+ word + '": ' + selectedVal +'<input type="hidden" value="'+word+"|"+selectedVal+'"/></li>');
          if ( array_viewable_data[row_id] == null ) {
          	array_viewable_data[row_id] = [ word+'|'+selectedVal ];
          } else {
          	array_viewable_data[row_id].push(word+'|'+selectedVal);	
          }
          $('.viewabledata.'+row_id).val("");
          for (i = 0; i < array_viewable_data[row_id].length; i++) {
            $('.viewabledata.'+row_id).val($('.viewabledata.'+row_id).val()+'{'+array_viewable_data[row_id][i]+'}');
          }
        } else {
          $('.right-tags.'+row_id).append('<li class="addedTag">"'+ word + '": ' + selectedVal +'<input type="hidden" value="'+word+"|"+selectedVal+'"/></li>');
		  if ( array_viewable_data_t[row_id] == null ) {
          	array_viewable_data_t[row_id] = [ word+'|'+selectedVal ];
          } else {
          	array_viewable_data_t[row_id].push(word+'|'+selectedVal);	
          }
          $('.viewabledata_t.'+row_id).val("");
          for (i = 0; i < array_viewable_data_t[row_id].length; i++) {
            $('.viewabledata_t.'+row_id).val($('.viewabledata_t.'+row_id).val()+'{'+array_viewable_data_t[row_id][i]+'}');
          }
        }
        
      }
    }
  });

    // if you don't like something i will remove it
    $(".left-tags").click(function(obj){
    	var row_id_temp = $(this).attr("class").match(/row-\d.*/);
    	row_id_temp = row_id_temp[0];
        $(obj.target).remove();
        array_viewable_data[row_id_temp].splice(array_viewable_data[row_id_temp].indexOf($(obj.target).find("input").val()),1);
        $('.viewabledata.'+row_id_temp).val("");
        for (i = 0; i < array_viewable_data[row_id_temp].length; i++) {
          $('.viewabledata.'+row_id_temp).val($('.viewabledata.'+row_id_temp).val()+'{'+array_viewable_data[row_id_temp][i]+'}');
        }
    });
    $(".right-tags").click(function(obj){
    	var row_id_temp = $(this).attr("class").match(/row-\d.*/);
    	row_id_temp = row_id_temp[0];
        $(obj.target).remove();
        array_viewable_data_t[row_id_temp].splice(array_viewable_data_t[row_id_temp].indexOf($(obj.target).find("input").val()),1);
        $('.viewabledata_t.'+row_id_temp).val("");
        for (i = 0; i < array_viewable_data_t[row_id_temp].length; i++) {
          $('.viewabledata_t.'+row_id_temp).val($('.viewabledata_t.'+row_id_temp).val()+'{'+array_viewable_data_t[row_id_temp][i]+'}');
        }
    });
    
    $(document).click(function (e) {
      e.stopPropagation();
      //check if the clicked area is dropDown or not
      if (($(".select").has(e.target).length === 0) && ($("#infoDiv").has(e.target).length === 0)) {
          $('#infoDiv').hide();
      }
    });
  
		}); //function

  });


