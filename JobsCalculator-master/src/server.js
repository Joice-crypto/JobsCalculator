const express = require("express");
const server = express();
const routes = require('./routes');
const path = require('path');

//usando o template engine

server.set('view engine', 'ejs');

// mudando a localização da views 
server.set('views', path.join(__dirname, 'views'));

// liberar o req.body 
server.use(express.urlencoded({extend : true}));

// habilitar arquivos estaticos
server.use(express.static("public"));
server.use(routes);




server.listen(3000, () => console.log('rodando'));

