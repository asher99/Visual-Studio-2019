var app = require('../app');	
var debug = require('debug')('smart:server');	   
var http = require('http');	 
	
var port = normalizePort(process.env.PORT || '3000');	
app.set('port', port);
var server = http.createServer(app);	 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}	

