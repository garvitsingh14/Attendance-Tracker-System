
//jshint esversion:9
var express	=	require("express");
var multer	=	require('multer');
var fs=require("fs");
var app	=	express();






const { exec, spawn } = require("child_process");


/*exec("g++ hello.cpp", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }*/
function filep(thefile) {
  const child = spawn("./a"); //where a is the exe file generated on compiling the code.
  child.stdin.write(`./uploads/${thefile}`);
  child.stdin.end();
  /*child.stdout.on("data", (data) => {
    console.log(`child stdout:\n${data}`);
  });*/
}
//});





var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('myfile');

app.get('/',function(req,res){
  fs.stat('./convertedAttendance.txt', function (err, stats) {
  //console.log(stats);//here we got all information of file in stats variable

if (err) {
   return console.error(err);
}

fs.unlink('./convertedAttendance.txt',function(err){
    if(err) return console.log(err);
    console.log('file deleted successfully');
});

});
      res.sendFile(__dirname + "/main.html");
});

app.get("/output",function(req,res) {
  res.sendFile(__dirname+"/convertedAttendance.txt");
});

app.post('/uploadjavatpoint',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
    console.log(req.file.filename);
    filep(req.file.filename);
   res.end("File is uploaded successfully!");
});
});

app.listen(2000,function(){
    console.log("Server is running on port 2000");
});
