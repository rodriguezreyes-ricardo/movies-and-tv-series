var  totalPages = null;
var  totalItems = null;
var pageItems = null;
var actualPage = 1;
var resourceTitle = null;
var resourceType = null;
$(document).ready(function() {	
	$("#search-selectorAvdo").click(function(){
		actualPage = 1;
		resourceTitle = $("#resource_title").val();
		resourceType = $("#resource_type").val();
		paginationSearch(actualPage);
		$(".page_first").hide();
		$(".page_previous").hide();
		$(".page_next").show();
		$(".page_last").show();
	});	
	$(".page_first").click(function(){
		actualPage = 1;
		paginationSearch(1);
		$(".page_first").hide();
		$(".page_previous").hide();
		$(".page_next").show();
		$(".page_last").show();
	});
	$(".page_next").click(function(){
		actualPage += 1;
		paginationSearch(actualPage);
		$(".page_first").show();
		$(".page_previous").show();
		if(actualPage == totalPages){
			$(".page_next").hide();
			$(".page_last").hide();
		}
	});
	$(".page_previous").click(function(){
		actualPage -= 1;
		paginationSearch(actualPage);
		if(actualPage >1){
			$(".page_first").show();
			$(".page_previous").show();
		}else{
			$(".page_first").hide();
			$(".page_previous").hide();
		}
		$(".page_next").show();
		$(".page_last").show();
	});
	$(".page_last").click(function(){
		actualPage = totalPages;
		paginationSearch(actualPage);
		$(".page_first").show();
		$(".page_previous").show();
		$(".page_next").hide();
		$(".page_last").hide();
	});
	
	
})

function itemSelected(element){
	$(".minificha3").css( "background-color", "#FFFFFF" );
	$("#"+element.id).css( "background-color", "beige" );
    $.ajax({
    	url: "http://www.omdbapi.com/?i="+element.id+"&apikey=df843528",
        success: function(result){
        var htmlResult = '<div class="listado_items">'+									
							'<div class="minificha3" id="'+result.imdbID+'">'+
								'<div>'+
									'<img style="border: 1px solid #E6E6E6;" id="img'+result.imdbID+'" src="'+(result.Poster=="N/A"?"img/not_image.png":result.Poster)+'" title="'+result.Title+'" width="200">'+
									'<div class="item_description"><div class="item_title">'+
										'<div class="item_rimdb_rating">'+(result.Ratings[0] != undefined?result.Ratings[0].Value:"")+'</div>'+
										'<h3>'+result.Title+' ('+result.Year+')</h3>'+										
									'</div>'+
									'<div class="item_year">'+result.Runtime+' | '+result.Genre+' | '+result.Released+'</div>'+									
									'<div class="item_plot">'+result.Plot+'</div></div>'+
							'</div>'+ 																											
					'</div>';
        $(".detail_area").show();        
        $(".detail_area").html("<div>&nbsp;&nbsp;<b>Detail for \""+result.Title+"\"</b></div>");
        $("#cuadro_central_detail").show();
        
        $("#cuadro_central_detail").html(htmlResult);
    	}
    });   
}

function formEnter(){
	$('#search-selectorAvdo').click();
}

function paginationSearch(page){
    $.ajax({
    	url: "http://www.omdbapi.com/?s="+resourceTitle+"&apikey=df843528&type="+resourceType+"&page="+page,
        success: function(result){
    	if(result.Response == "True"){
    		totalItems = result.totalResults;
    		pageItems = result.Search.length;
    		if(actualPage == 1){
	    		totalPages = parseInt(totalItems/pageItems)
	    		if(totalItems%pageItems >0){
	    			totalPages += 1;
	    		}
    		}
    		if(totalPages==1){
    			$(".page_first").hide();
    			$(".page_previous").hide();
    			$(".page_next").hide();
    			$(".page_last").hide();
    		}
    		var htmlResultList = "";
	    	for(index in result.Search){
	    		htmlResultList += '<div class="listado_items">'+									
										'<a href="#link_detail"><div class="minificha3" id="'+result.Search[index].imdbID+'" onclick="itemSelected(this)">'+
											'<div>'+
												'<img style="border: 1px solid #E6E6E6;" id="img'+result.Search[index].imdbID+'" src="'+(result.Search[index].Poster=="N/A"?"img/not_image.png":result.Search[index].Poster)+'" title="'+result.Search[index].Title+'" width="50">'+
												'<div class="miniFicha3Descripcion">'+
												'<div style="position: absolute;right: 10px;padding-top: 7px;">('+result.Search[index].Type+')</div>'+
												'<h3>'+result.Search[index].Title+' ('+result.Search[index].Year+')</h3>'+
											'</div>'+				
										'</div>'+ 																											
								'</div></a>';
	    	}
	    	$("#cuadro_central2").show();
	    	$(".cabecera_listado").html("<div>&nbsp;&nbsp;<b>Page "+actualPage+" of "+totalPages+"&nbsp;&nbsp;&nbsp;&nbsp;("+result.totalResults+" result(s) for \""+$("#resource_title").val()+"\")</b></div>");
	    	$("#cuadro_central2").html(htmlResultList);
	    	$(".paginador").show();
    	}else{		
    		$(".cabecera_listado").html("<div>&nbsp;&nbsp;<b>Not result available</b></div>");
    		
    		$("#cuadro_central2").html("");
    		$("#cuadro_central2").hide();
    		$(".paginador").hide();
    	}
		$(".detail_area").hide();
		$("#cuadro_central_detail").html("");
		$("#cuadro_central_detail").hide();
    	}
    });
}