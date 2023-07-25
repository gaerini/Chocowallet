// server.js

// 서버 사용을 위해 http모듈을 http라는 변수에 담는다.
var http = require('http');

// http모듈로 서버를 생성한다. 
var app = http.createServer(function(req,res){
  // 사용자에게 요청이 들어오면 응답해준다.
  // 콘텐츠타입은 텍스트, html형식!
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end('server is running...');
});

// listen 함수로 3000 포트에 서버를 실행한다.
app.listen(8000, function(){
  console.log("server is running.")
});