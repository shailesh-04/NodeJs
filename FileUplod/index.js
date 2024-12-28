var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
http.createServer(function (req, res) {
  if (req.url == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Using Form Submit</h1>');
    res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="text" name="userName"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    
    form.parse(req, function (err, fields, files) {
        console.log(fields);
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error parsing the file');
        return res.end();
      }
      var oldpath = files.filetoupload[0].filepath;
      var newpath = __dirname + '/' + files.filetoupload[0].originalFilename;
      fs.copyFile(oldpath, newpath, function (err) {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.write('Error uploading the file');
          return res.end();
        }
        fs.unlink(oldpath, function (err) {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('Error cleaning up temporary file');
            return res.end();
          }

          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write('File uploaded and moved!');
          res.end();
        });
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);
