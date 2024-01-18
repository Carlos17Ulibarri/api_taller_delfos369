const mysql = require('mysql');
const {promisify} = require('util');

const conexion = mysql.createConnection({
    host: 'localhost',
    user:'root',
    database:'beca',
    port:3306,
    passwaord:''
});


conexion.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('La base de datos se conectado correctamente');
    }
});

conexion.query = promisify(conexion.query);
module.exports = conexion; 