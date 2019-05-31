var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var author = require('./lib/author');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        topic.home(request, response);
      } else {
        topic.page(request, response);
      }
    } else if(pathname === '/create'){
        topic.create(request, response);
    } else if(pathname === '/create_process'){
        topic.create_process(request, response);
    } else if(pathname === '/update'){
        topic.update(request, response);
    } else if(pathname === '/update_process'){
        topic.update_process(request, response);
    } else if(pathname === '/delete_process'){
        topic.delete_process(request, response);
    } else if(pathname === '/author'){
        author.home(request, response);
    } else if(pathname === '/author/create_process'){
        author.create_process(request, response);
    } else if(pathname === '/author/update'){
        author.update(request, response);
    } else if(pathname === '/author/update_process'){
        author.update_process(request, response);
    } else if(pathname === '/author/delete_process'){
        author.delete_process(request, response);
    } else {
      response.writeHead(404);
      response.end('Not found');
    } 
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Sever On!');
});

/*
CREATE TABLE `topic` (
`id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `author` int(5) NOT NULL,
  PRIMARY KEY (id)
)

CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
*/