var mysql = require('mysql');

var db_config = {
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b146bb005f0339',
    password: '3860ba3e',
    database: 'heroku_3492c0ae37ea14e',
  };

var pool = mysql.createPool(db_config);
function handleDisconnect(){
  pool.getConnection(function(err, connection){
    if(err) { return; }
    connection.ping();
    connection.release();
  });
  /*
  var db;
  function handleDisconnect(){
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
  */
}

handleDisconnect();

module.exports = pool;