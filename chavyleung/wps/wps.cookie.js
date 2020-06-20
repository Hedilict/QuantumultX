<<<<<<< HEAD
const $ = new Env('WPS')

!(async () => {
  $.log('', `🔔 ${$.name}, 获取会话: 开始!`, '')
  const VAL_url = $request.url
  const VAL_headers = JSON.stringify($request.headers)
  $.log('', `❌ ${$.name}`, `url: ${$request.url}`, `headers: ${JSON.stringify($request.headers)}`, '')

  if (VAL_url && VAL_headers && /act_list/.test(VAL_url)) {
    $.setdata(VAL_url, 'chavy_signhomeurl_wps')
    $.setdata(VAL_headers, 'chavy_signhomeheader_wps')
    $.subt = '获取会话: 成功 (签到)!'
  } else if (VAL_url && VAL_headers && /clock_in/.test(VAL_url)) {
    $.setdata(VAL_url, 'chavy_signwxurl_wps')
    $.setdata(VAL_headers, 'chavy_signwxheader_wps')
    $.subt = '获取会话: 成功 (打卡)!'
  }
})()
  .catch((e) => {
    $.subt = '获取会话: 失败!'
    $.desc = `原因: ${e}`
    $.log(`❌ ${$.name}, 获取会话: 失败! 原因: ${e}!`)
  })
  .finally(() => {
    $.msg($.name, $.subt, $.desc), $.log('', `🔔 ${$.name}, 获取会话: 结束!`, ''), $.done()
  })

// prettier-ignore
function Env(t){this.name=t,this.logs=[],this.isSurge=(()=>"undefined"!=typeof $httpClient),this.isQuanX=(()=>"undefined"!=typeof $task),this.log=((...t)=>{this.logs=[...this.logs,...t],t?console.log(t.join("\n")):console.log(this.logs.join("\n"))}),this.msg=((t=this.name,s="",i="")=>{this.isSurge()&&$notification.post(t,s,i),this.isQuanX()&&$notify(t,s,i);const e=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t&&e.push(t),s&&e.push(s),i&&e.push(i),console.log(e.join("\n"))}),this.getdata=(t=>this.isSurge()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):void 0),this.setdata=((t,s)=>this.isSurge()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):void 0),this.get=((t,s)=>this.send(t,"GET",s)),this.wait=((t,s=t)=>i=>setTimeout(()=>i(),Math.floor(Math.random()*(s-t+1)+t))),this.post=((t,s)=>this.send(t,"POST",s)),this.send=((t,s,i)=>{if(this.isSurge()){const e="POST"==s?$httpClient.post:$httpClient.get;e(t,(t,s,e)=>{s&&(s.body=e,s.statusCode=s.status),i(t,s,e)})}this.isQuanX()&&(t.method=s,$task.fetch(t).then(t=>{t.status=t.statusCode,i(null,t,t.body)},t=>i(t.error,t,t)))}),this.done=((t={})=>$done(t))}
=======
const $ = new Env('WPS')

!(async () => {
  $.log('', `🔔 ${$.name}, 获取会话: 开始!`, '')
  const VAL_url = $request.url
  const VAL_headers = JSON.stringify($request.headers)
  $.log('', `❕ ${$.name}`, `url: ${$request.url}`, `headers: ${JSON.stringify($request.headers)}`, '')
  $.setdata(VAL_url, 'chavy_signhomeurl_wps')
  $.setdata(VAL_headers, 'chavy_signhomeheader_wps')
  $.subt = '获取会话: 成功!'
})()
  .catch((e) => {
    $.subt = '获取会话: 失败!'
    $.desc = `原因: ${e}`
    $.log(`❌ ${$.name}, 获取会话: 失败! 原因: ${e}!`)
  })
  .finally(() => {
    $.msg($.name, $.subt, $.desc), $.log('', `🔔 ${$.name}, 获取会话: 结束!`, ''), $.done()
  })

// prettier-ignore
<<<<<<< HEAD
function Env(t){this.name=t,this.logs=[],this.isSurge=(()=>"undefined"!=typeof $httpClient),this.isQuanX=(()=>"undefined"!=typeof $task),this.log=((...t)=>{this.logs=[...this.logs,...t],t?console.log(t.join("\n")):console.log(this.logs.join("\n"))}),this.msg=((t=this.name,s="",i="")=>{this.isSurge()&&$notification.post(t,s,i),this.isQuanX()&&$notify(t,s,i);const e=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t&&e.push(t),s&&e.push(s),i&&e.push(i),console.log(e.join("\n"))}),this.getdata=(t=>this.isSurge()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):void 0),this.setdata=((t,s)=>this.isSurge()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):void 0),this.get=((t,s)=>this.send(t,"GET",s)),this.wait=((t,s=t)=>i=>setTimeout(()=>i(),Math.floor(Math.random()*(s-t+1)+t))),this.post=((t,s)=>this.send(t,"POST",s)),this.send=((t,s,i)=>{if(this.isSurge()){const e="POST"==s?$httpClient.post:$httpClient.get;e(t,(t,s,e)=>{s&&(s.body=e,s.statusCode=s.status),i(t,s,e)})}this.isQuanX()&&(t.method=s,$task.fetch(t).then(t=>{t.status=t.statusCode,i(null,t,t.body)},t=>i(t.error,t,t)))}),this.done=((t={})=>$done(t))}
>>>>>>> d24362379430c267c4ea9cc111a18b3c06bce668
=======
function Env(s){this.name=s,this.data=null,this.logs=[],this.isSurge=(()=>"undefined"!=typeof $httpClient),this.isQuanX=(()=>"undefined"!=typeof $task),this.isNode=(()=>"undefined"!=typeof module&&!!module.exports),this.log=((...s)=>{this.logs=[...this.logs,...s],s?console.log(s.join("\n")):console.log(this.logs.join("\n"))}),this.msg=((s=this.name,t="",i="")=>{this.isSurge()&&$notification.post(s,t,i),this.isQuanX()&&$notify(s,t,i);const e=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];s&&e.push(s),t&&e.push(t),i&&e.push(i),console.log(e.join("\n"))}),this.getdata=(s=>{if(this.isSurge())return $persistentStore.read(s);if(this.isQuanX())return $prefs.valueForKey(s);if(this.isNode()){const t="box.dat";return this.fs=this.fs?this.fs:require("fs"),this.fs.existsSync(t)?(this.data=JSON.parse(this.fs.readFileSync(t)),this.data[s]):null}}),this.setdata=((s,t)=>{if(this.isSurge())return $persistentStore.write(s,t);if(this.isQuanX())return $prefs.setValueForKey(s,t);if(this.isNode()){const i="box.dat";return this.fs=this.fs?this.fs:require("fs"),!!this.fs.existsSync(i)&&(this.data=JSON.parse(this.fs.readFileSync(i)),this.data[t]=s,this.fs.writeFileSync(i,JSON.stringify(this.data)),!0)}}),this.wait=((s,t=s)=>i=>setTimeout(()=>i(),Math.floor(Math.random()*(t-s+1)+s))),this.get=((s,t)=>this.send(s,"GET",t)),this.post=((s,t)=>this.send(s,"POST",t)),this.send=((s,t,i)=>{if(this.isSurge()){const e="POST"==t?$httpClient.post:$httpClient.get;e(s,(s,t,e)=>{t&&(t.body=e,t.statusCode=t.status),i(s,t,e)})}this.isQuanX()&&(s.method=t,$task.fetch(s).then(s=>{s.status=s.statusCode,i(null,s,s.body)},s=>i(s.error,s,s))),this.isNode()&&(this.request=this.request?this.request:require("request"),s.method=t,s.gzip=!0,this.request(s,(s,t,e)=>{t&&(t.status=t.statusCode),i(null,t,e)}))}),this.done=((s={})=>this.isNode()?null:$done(s))}
>>>>>>> fa3f46d0488431062ffb5704e81af6480a439cc0
