/**
 * Created by Administrator on 2017/8/5 0005.
 */
"use strict";
var http = require('http');
var fs=require("fs");
var  base64Data;
var dataBuffer;
var path;
http.createServer(function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.end('Hello World\n');
    if(req.url=="/"){
        fs.readFile("index.html",'utf-8',function(err,data){
            if(err){
                console.log("error");
            }else{
                 res.writeHead(200, {'Content-Type': 'text/html'});
                 res.end(data);
            }
        });
    }
    if(req.url=="/upimg"){

        var post = '';

        // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data', function(chunk){
            post += chunk;
        });

        req.on('end', function(){
            // post = querystring.parse(post);



            var imgdata=JSON.parse(post);

             var dat=imgdata.data;

            for(var i=0;i<dat.length;i++){
                path="images/"+dat[i].name;
                  base64Data = dat[i].base64.replace(/^data:image\/\w+;base64,/, "");
                  dataBuffer = new Buffer(base64Data, 'base64');
                fs.writeFile(path, dataBuffer, function(err) {
                    if(err){
                        console.log(err);
                        res.end(err)
                    }else{
                       console.log("保存成功");
                    }
                });
            }

            res.end("保存成功");

        });
    }

}).listen(8888);
