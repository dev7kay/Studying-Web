var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var Database = require('./DB.js');

var db = Database.handleDisconnect(Database.connect());

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        db.query(`SELECT * FROM topic`, function(error, topics){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(topics);
          var html = template.HTML(title,list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">Create</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      } else {      
       db.query(`SELECT * FROM topic`, function(error, topics){
         if(error){
           throw error;
         }
           db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author = author.id WHERE topic.id=?`,
                    [queryData.id], function(error2, topic){
           if(error2){
             throw error2;
           }
          var title = topic[0].title;
          var description = topic[0].description;
          var list = template.list(topics);
          var html = template.HTML(title,list,
            `<h2>${title}</h2>
            ${description}
            <p>by ${topic[0].name}</p>
            `,
            `<a href="/create">Create</a>
             <a href="/update?id=${queryData.id}">Update</a>
             <form action="delete_process" method="post">
               <input type="hidden" name="id" value="${queryData.id}">
               <input type="submit" value="delete">
             </form>`            
          );
          response.writeHead(200);
          response.end(html);
          })
        });
      }
    } else if(pathname === '/create'){
          db.query(`SELECT * FROM topic`, function(error, topics){
            db.query(`SELECT * FROM author`, function(error2, authors){
              var title = 'Create';
              var list = template.list(topics);
              var html = template.HTML(title, list, `
                <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"</p>
                <p>
                  <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                  ${template.authorSelect(authors)}             
                </p>
                <p><input type="submit"></p>
                </form>
              `, '');
              response.writeHead(200);
              response.end(html);
            });          
        })
   } else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){
          body += data;
        });
        request.on('end', function(){
          var post = qs.parse(body);
          console.log(post);
          db.query(`
            INSERT INTO topic (title, description, created, author) 
            VALUES(?, ?, NOW(), ?)`,
            [post.title, post.description, post.author],
            function(error, result){
              if(error){
                throw error;
              }            
            response.writeHead(302, {Location: `/?id=${encodeURIComponent(result.insertId)}`});
            response.end();    
            }
          )        
        });
   } else if(pathname === '/update'){
      db.query(`SELECT * FROM topic`, function(error, topics){
        if(error){
          throw error;
        }
        db.query(`SELECT *FROM topic WHERE id=${queryData.id}`, function(error2, topic){
         if(error2){
          throw error2;
         }
         db.query('SELECT * FROM author', function(error2, authors){
          var list = template.list(topics);
          var html = template.HTML(topic[0].title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
              <p><textarea name="description" placeholer"dexcription">${topic[0].description}</textarea></p>
              <p>${template.authorSelect(authors, topic[0].author)}</p>
              <p><input type="submit"></p>
            </form>
            `,
            `<a href="/create">Create</a>`
            );
            response.writeHead(200);
            response.end(html);
         })
        });
      });
    } else if(pathname === '/update_process'){
          var body = '';
          request.on('data', function(data){
              body += data;
          });
          request.on('end', function(){
            var post = qs.parse(body);              
            db.query('UPDATE topic SET title=?, description=?, author=? WHERE id=?',
            [post.title, post.description, post.author, post.id], function(error, result){
              response.writeHead(302, {Location: `/?id=${encodeURIComponent(post.id)}`});
              response.end();
            })
          });
    } else if(pathname === '/delete_process'){
          var body = '';
          request.on('data', function(data){
              body += data;
          });
          request.on('end', function(){
              var post = qs.parse(body);
            db.query('DELETE FROM topic WHERE id=?', [post.id], function(error, result){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/`});
              response.end();
            })
          });
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