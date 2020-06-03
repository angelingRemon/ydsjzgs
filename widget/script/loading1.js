var loading='<div class="overlazy"><div class="loading">';
	loading+='<span class="loadicon"></span>';
	loading+='<div class="loadname">数据可视化</div>';
	loading+='<div class="loaddian"><em></em><em></em><em></em> </div>';
	loading+='</div></div>';

function showLoading(){
	if($('.overlazy').length==0){
		$("body").append(loading);
	}
	$('.overlazy').show();

}
function hideLoading(){
	$('.overlazy').hide();

}
