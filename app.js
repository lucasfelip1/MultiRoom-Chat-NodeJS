/*PRIMEIRO IMPORTAR AS CONFIGURACOES DO SERVIDOR*/
var app = require('./config/server');

/*PARAMETRIZAR PORTA DE ESCUTA*/
var server = app.listen(80, function(){
	console.log("SERVIDOR ONLINE");
})

var io = require('socket.io').listen(server);
app.set('ioVar',io); //VARIAVEL GLOBAL NO EXPRESS app

/*Criar a conexão por websocket */
//Evento de escuta Connection con callback
io.on('connection', function(socket){
	console.log("Usuario conectou socket");

	socket.on('disconnect',function(){
		console.log("Usuario desconectou");
	});

	socket.on('msgParaServidor',function(data){
		console.log("Mensagem para Servidor");
		/*DIALOGOS */
		//EMITE PARA QUEM ENVIOU
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido,mensagem:data.mensagem}
		);
		//EMITE PARA TODOS MENOS QUEM ENVIOU
		socket.broadcast.emit(
			'msgParaCliente',
			{apelido: data.apelido,mensagem:data.mensagem}
		);
		/*PARTICIPANTES */
		if(parseInt(data.apelido_atualizado_cliente)==0){
				socket.emit(
					'participantesParaCliente',
					{apelido: data.apelido}
				);
				//EMITE PARA TODOS MENOS QUEM ENVIOU
				socket.broadcast.emit(
					'participantesParaCliente',
					{apelido: data.apelido}
				);
		}
		
	});
})

