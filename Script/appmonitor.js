
//app版本及价格监控
//30 7-22/1 * * * own/quantumultx/task/appmonitor.js

console.log("APP监控运行")
let apps=["1443988620","1312014438","499470113","1314212521","1282297037","932747118","1116905928"]//app跟踪id
let reg="hk"//区域：美国us 中国cn 香港hk
let config={
  url:'https://itunes.apple.com/lookup?id=' + apps + "&country=" + reg,
  method:"post"
}
$task.fetch(config).then((res)=>{
  let results=JSON.parse(res.body).results
  if(results.length>0){
    let app_monitor=$prefs.valueForKey("app_monitor");
    if(app_monitor==""||app_monitor==undefined){
      app_monitor={}
    }
    else{
      app_monitor=JSON.parse(app_monitor)
    }
    let notifys=[]
    let infos={}
    results.forEach((x=>{
      infos[x.trackId]={
        n:x.trackName,
        v:x.version,
        p:x.formattedPrice
      }
      if(app_monitor.hasOwnProperty(x.trackId)){
      if(JSON.stringify(app_monitor[x.trackId])!=JSON.stringify(infos[x.trackId])){
        if(x.version!=app_monitor[x.trackId].version){
          notifys.push(`🧩${x.trackName}:升级【${x.version}】`)
        }
        if(x.formattedPrice!=app_monitor[x.trackId].formattedPrice){
                  notifys.push(`💰${x.trackName}:价格【${x.formattedPrice}】`)
                }
      }}
      else{
        notifys.push(`🧩${x.trackName}:版本【${x.version}】`)
        notifys.push(`💰${x.trackName}:价格【${x.formattedPrice}】`)
      }
    }))
    infos=JSON.stringify(infos)
    $prefs.setValueForKey(infos,"app_monitor")
    if(notifys.length>0){
      notify(notifys)
    }
    else{
      console.log("APP监控：版本及价格无变化")
    }
  }
})
function notify(notifys){
  notifys=notifys.join("\n")
  console.log(notifys)
  $notify("APP监控","",notifys)
}
