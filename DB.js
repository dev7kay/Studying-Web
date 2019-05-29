var mysql = require('mysql');

module.exports = {
    connect:function(){
        var db_config = {
            host: 'us-cdbr-iron-east-02.cleardb.net',
            user: 'b146bb005f0339',
            password: '3860ba3e',
            database: 'heroku_3492c0ae37ea14e'
          };
        return db_config;                 
    },handleDisconnect:function (db_config){
        var db;
        db = mysql.createConnection(db_config);
        db.connect(function(err){
          if(err){
            console.log('error when connection to db', err);
            setTimeout(handleDisconnect, 2000);
          }
        });
      
        db.on('error', function(err){
          console.log('db error', err);
          if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleDisconnect();
          }else{
            throw err;
          }
        });

        return db;
      }
}