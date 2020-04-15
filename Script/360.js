/*
获取完cookie注释重写
[rewrite_local]
^https://app.jf.360.cn/signin/index/index url script-request-header 360_cookie.js
[mitm]
hostname = app.jf.360.cn
*/
const isRequest = typeof $request != "undefined";
if (isRequest) {
  var head = $request.headers;
  var cookie = head.Cookie;
  $notify("360Cookie获取成功", "", "");
  $prefs.setValueForKey(cookie, "qihuck");
  $done();
} else {
  var cookie = $prefs.valueForKey("qihuck");
  const url =
    "https://app.jf.360.cn/signin/signin/start?app_id=1014&os_type=h5";
  const method = "POST";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: cookie,
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
  };
  //const data = {"info": "abc"};

  const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers // Optional.
    //body: JSON.stringify(data) // Optional.
  };

  $task.fetch(myRequest).then(
    response => {
      var msg = JSON.parse(response.body).msg;
      if (msg == "SUCCESS") {
        var msg = "签到成功";
      }
      $notify("签到结果", msg, "");
    },
    reason => {
      // reason.error
      $notify("签到失败", "", JSON.parse(reason.error).msg); // Error!
    }
  );
}
