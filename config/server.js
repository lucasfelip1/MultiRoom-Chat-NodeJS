/*PRIMEIRO IMPORTAR MODULO do FRAMEWORK EXPRESS*/
var express = require('express');
/*IMPORTAR MODULO do CONSIGN*/
var consign = require('consign');
/*IMPORTAR MODULO do body-parser*/
var bodyparser = require('body-parser');
/*IMPORTAR MODULO do express-validator*/
var expressValidator = require('express-validator');

/* Iniciar objeto do express*/
var app = express();

/* setar as variaveis 'view engine' e 'views' do express  */
app.set('view engine', 'ejs'); //engine utilizada para processamento
app.set('views', './app/views');

/* Configurando os middleware express.static */
app.use(express.static('./app/public'));
/* Configurando os middleware body-parser */
app.use(bodyparser.urlencoded({extended: true}));
/* Configurando os middleware express-validator */
app.use(expressValidator());

/* Efetua o auto load das rotas e controlers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controlers')
	.into(app);

/* Exportar o objeto APP */
module.exports = app;

