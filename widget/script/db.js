var db, dbname = "program_db",
	tbname = "p_login";
// executeSql('drop table p_login')
//打开数据库
function openDatabase() {
	//如果库不存在  则创建
	executeSql("create database if not exists " + dbname);
	var ret = db.openDatabaseSync({
		name: dbname
	});
	return ret;
}
//关闭数据库
function closeDatabase() {
	var ret = db.closeDatabaseSync({
		name: dbname
	});
	return ret;
}

//执行sql语句
function executeSql(sql) {
	//sql : 'drop table if exists xzg_login'  //删除表如果存在
	//sql : 'CREATE TABLE if not exists xzg_login(id char(32), loginName char(32), loginTime datetime)'  //创建登录表
	//sql : 'insert into xzg_login values(7,"13296905340",datetime("now"))' //添加登录数据
	//sql : 'delete from xzg_login' //删除所有数据
	var ret = db.executeSqlSync({
		name: dbname,
		sql: sql
	});
	return ret;
}

//查询sql语句
function selectSql(sql) {
	var status = openDatabase(dbname).status;
	if (status) {
		var ret = db.selectSqlSync({
			name: dbname,
			sql: sql
		});
		return ret.data;
	}
}

//退出登录
function exitLogin() {
	sqliteHeader();
	//清理数据
	executeSql('delete from ' + tbname);
	closeDatabase();
}


function sqliteHeader() {
	db = api.require('db');
	//打开数据库
	openDatabase();
	//如果没有该数据表则创建
	// executeSql("drop table "+tbname);
	var createTableSql = 'CREATE TABLE if not exists ' + tbname + '( uid char(32) )';
	executeSql(createTableSql);
	//执行sql，创建登录表
}

//记住登录状态
function setLogin(uid, uphone, pid, userName, userLevel, userLevelEn) {
	sqliteHeader();
	executeSql('delete from ' + tbname);
	//添加数据，用在服务器端返回登录成功时
	var insertIntoSql = 'insert into ' + tbname + ' (uid) values("' + uid + '")';
	var dd = executeSql(insertIntoSql);
	closeDatabase();
}



//获取登录信息
function sqliteGetLogin() {
	//检索是否登录
	sqliteHeader();
	// executeSql('drop table p_login')
	var selectRowSql = 'select * from p_login';
	var ret = selectSql(selectRowSql);
	if (ret.length > 0) {
		var $return = ret[0];
	} else {
		var $return = false;
	}
	closeDatabase();
	return $return;
}

function getLogin() {
	//检索是否登录
	var data = sqliteGetLogin();
	if (data == false) {
		//退出到登录页
		// H.openWin('login','../html/login/login.html');
	}
	return data;
}

//获取登录信息
function selectData(selectRowSql) {
	//检索是否登录
	sqliteHeader();
	var ret = selectSql(selectRowSql);
	if (ret.data.length > 0) {
		var $return = ret.data[0];
	} else {
		var $return = false;
	}
	closeDatabase();
	return $return;
}
