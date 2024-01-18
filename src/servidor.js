const express = require('express');
const morgan = require('morgan');

const app = express();

//Configuración del servidor
app.set('puerto',8000);

app.listen(app.get('puerto'), () =>{
    console.log('El servdor esta corriendo en el puerto', app.get('puerto'));
})


//Formaton en que traera los datos
app.use(express.json());

//Tipo metodo 
app.use(morgan('dev'));

// ruta genreal 
app.use('/api/taller', require('./rutas'));