//mam
var version;
var versionDes;
var closeTip;
var updateTip;
var source;
var time;
function mam(){
  var mam = api.require('mam');
      mam.addEvent({
          name: '支付合伙人'
      });
      mam.checkUpdate(function( ret, err ){
          if (ret) {
            //  alert( JSON.stringify( ret ) );
              if(ret.status){
                /*
                {
                  status:true,                //操作成功状态值
                  result:
                  {
                      update:true,            //是否有更新
                      closed:true,            //设备上当前版本是否被强行关闭
                      version:'1.0',            //新版本版本号
                      versionDes:'',            //新版本更新描述
                      closeTip:'',            //提示用户应用版本被强行关闭时弹框的提示语
                      updateTip:'',            //提示用户有更新时弹框的提示语
                      source:'',                //新版本安装包的下载地址
                      time:''                    //新版本的发布时间
                  }
                }
                */
                var updates=ret.result.update;
                version=ret.result.version;
                versionDes=ret.result.versionDes;
                closeTip=ret.result.closeTip;
                updateTip=ret.result.updateTip;
                source=ret.result.source;
                time=ret.result.time;
                if(updates==true){
                  //提示更新
                //  H.toast('更新');
                    aupdate();
                }else{
                  //H.toast("已经是最新版本了");
                }
              }
          } else{
              //alert( JSON.stringify( err ) );
          }
      });
}
//更新提醒
function aupdate(){
  var dialogBox = api.require('dialogBox');
  dialogBox.alert({
      texts: {
          title: '有新的版本啦',
          content: updateTip,
          leftBtnTitle: '关闭',
          rightBtnTitle: '更新'
      },
      styles: {
          bg: '#fff',
          w: 300,
          title: {
              marginT: 20,
              //icon: 'widget://res/gou.png',
              iconSize: 40,
              titleSize: 14,
              titleColor: '#000'
          },
          content: {
              color: '#000',
              size: 14
          },
          left: {
              marginB: 7,
              marginL: 20,
              w: 130,
              h: 35,
              corner: 2,
              bg: '#eee',
              size: 14
          },
          right: {
              marginB: 7,
              marginL: 10,
              w: 130,
              h: 35,
              corner: 2,
              bg: '#eee',
              size: 14
          }
      }
  }, function(ret) {
    if (ret.eventType == 'right'){
      var dialogBox = api.require('dialogBox');
          dialogBox.close({
              dialogName: 'alert'
          });
          var interText = doT.template($("#updatePress").text());
          if($(".updatePress").length==0){
            $("body").append(interText());
          }
          if (api.systemType == 'ios') {
            api.installApp({
              appUri : source //安装包对应plist地址
            });
            exit_app();
          } else {
          //  location.href = source;
            api.download({
                  url: source,
                  report: true,
                  cache: true,
                  allowResume: true
              }, function(ret, err) {
                  $("#press").html(ret.percent);
                  $(".jdt").css({width:ret.percent+'%'});
                  if(ret.percent=='100'){
                    $(".updatePress").remove();
                  }
                  if (ret.state == 1) {
                      //下载成功
                      var savePath=ret.savePath;
                      api.installApp({
                          appUri: savePath
                      });
                  } else {
                  }
              });
          }
    }else{
       H.closeWidget();
    }

  });
}
