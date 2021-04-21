const express = require("express");
const server = express();
const routes = require('./routes');

//usando o template engine

server.set('view engine', 'ejs');

// liberar o req.body 
server.use(express.urlencoded({extend : true}));

// habilitar arquivos estaticos
server.use(express.static("public"));
server.use(routes);




server.listen(3000, () => console.log('rodando'));

