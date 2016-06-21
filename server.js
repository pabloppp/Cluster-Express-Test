var cluster = require('cluster');
var express = require('express');
var app = express();

var improvePerformance = process.argv[2] != undefined ? JSON.parse(process.argv[2]) : true;

if (improvePerformance && cluster.isMaster) {

  var CPUCount = require('os').cpus().length;
  for (var i = 0; i < CPUCount; i++) {
    cluster.fork();
  }

  for(var index in cluster.workers){
      console.log("New process created with PID: "+cluster.workers[index].process.pid);
  }

}
else{

  app.get('/', function (req, res) {
    var initT = (new Date()).getTime();
    var addme = 2;
    for(var i = 0; i < 999999; i++){
      addme = Math.sqrt(addme);
    }
    var finalT = (new Date()).getTime() - initT;
    res.send(`Answered by ${process.pid} in ${finalT}ms`);
  });
  app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
  });

}
