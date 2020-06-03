//查询是否已经登录
function checkOpenWin(){
	var sql="select count(*) as amount from kltx_login";
	var amount=selectSql('kltx_db',sql)[0].amount;
		if(amount==0){
			// H.openWin('login','../login/login.html',{},{animation : {type : 'movein',subType : 'from_bottom',duration : 300}});
			return true;
		}else{
		//	H.openWin(name,url);
			return false;
		}
}

function checkOpenWins(name,url){
	if(checkOpenWin()){
		H.openWin('login','../login/login.html',{},{animation : {type : 'movein',subType : 'from_bottom',duration : 300}});
	}else{
		H.openWin(name,url);
	}
}
