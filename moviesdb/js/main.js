//hook up events here
$(document).on( "ready",hookupEvents);
var movies = new Array();
var unique_genres=[];
function hookupEvents(){
	$('[id="movie_title"]').on( "click",clickedTitleDiv);
	hideInfo();
	
	var genres = $('#movie_title .genre').map(function(i, el) {
            return $(el).text().replace(/^\s+|\s+$/g,"").split(/\s*,\s*/)
        });
	var temp_list = []
	$.each(genres, function(i, el){
   		 if($.inArray(el, temp_list) === -1){ 
				unique_genres.push({id:i,text:el});
				temp_list.push(el)
			}
	});
	$("#search_input2").select2({
			allowClear:true,
                        placeholder: "Genero...",
                        data:{ results: unique_genres},
                        minimumInputLength:2
                }).on("change", function(e) {
					if(e.added)
                                		selected_genre(e.added.text);
					else
						selected_genre('');
                                });

	movies =$('#movie_title .title').map(function(i, el) {
            return {id:$(el).parent().parent().attr('id'),text:$(el).text()};
        });
	$("#search_input").select2({
			allowClear:true,
			placeholder: "Pesquisar titulo...",
			data:{ results: movies},
			minimumInputLength:2 
		}).on("change", function(e) { 
				clickedTitle(e.added.id);
				$('body').scrollTo($('#'+e.added.id));
				});
}

//helper functions
function selected_genre(value){
	$('div .movie_holder').show()
	if(value!=''){
		$('#movie_title .genre').filter(':not(:contains("'+value+'"))').parent().parent().parent().hide();
	}
}
//We start off hidden
var hidden = true;

function hideInfo(){

	
	$( "div[hideable|='true']" ).each(function(t,v){$(v).hide()});
	//add some left padding to keep everything at the same position
	$(".movie_holder>div:not([hideable])").each(
			function(t,v){
				$(v).css('padding-left',140)
			}
		);	
	console.log(self);


}
function clickedTitleDiv(event){
	clickedTitle($(event.currentTarget).parent().attr('id'));
}
function clickedTitle(id){
	var alreadyShown =$('#'+id).children("div[hideable|='true']").is(':visible');
	//hide them all
	hideInfo();
	//show info
	if(!alreadyShown){
		$('#'+id).children("div[hideable|='true']").show();
		$('#'+id).children("div:not([hideable])").css('padding-left',20);
	}
}

$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}
