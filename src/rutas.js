const express = require('express');
const router = express.Router();
const conn = require('./conexionBD');

// const bienvenido = async(req, res) =>{
//     res.json('Bienvenido a mi API');
// };

// router.get('/bienvenido',bienvenido);

// Rutas para la tabla escuelas
//----------------------Insertando datos - Create
const insertarEscuelas = async(req,res)=>{
    const nuevosdatos = req.body;
    nuevosdatos.escuelas_nombre = 'IPN';
    await conn.query('INSERT INTO escuelas set ?',[nuevosdatos]);
    console.log('Se ha insertado correctamente la escuela');
    res.json({
        mensaje: 'Se ha insertado correctamente la escuela'
    })
};

router.post('/insertarEscuela', insertarEscuelas);


//------------------ Leer datos - Read
const verEscuelas = async(req,res)=>{
    
    const respuesta = await conn.query('SELECT * FROM escuelas');
    console.log(respuesta);
    res.json({
        datos: respuesta
    })
};

router.get('/verEscuelas', verEscuelas);

module.exports = router;

//------------------ Actualizar datos - Update
const actualizarEscuelas = async(req,res)=>{
    const nuevosdatos = req.body;
    const {id} = req.params;
    nuevosdatos.escuelas_nombre = 'UAM';

    await conn.query('UPDATE escuelas set ? WHERE escuelas_id = ?',[nuevosdatos,id]);
    console.log('Se ha actualizado correctamente la escuela');
    res.json({
        mensaje: 'Se ha actualizado correctamente la escuela'
    })
};

router.put('/actualizarEscuela/:id',actualizarEscuelas);

//------------------ Eliminar datos - Delete
const eliminarEscuelas = async(req,res)=>{
    const {id} = req.params;

    await conn.query('DELETE FROM escuelas WHERE escuelas_id = ?',[id]);
    console.log('Se ha eliminado correctamente la escuela');
    res.json({
        mensaje: 'Se ha eliminado correctamente la escuela'
    })
};

router.delete('/eliminarEscuela/:id',eliminarEscuelas);


//Rutas la tabla estudiantes

//-----------------Create - Insertar 
const insertarEstudiantes = async (req,res) =>{
    const nuevosDatos =  req.body;

    nuevosDatos.estudiantes_nombre = 'Fernando';  
    nuevosDatos.estudiantes_apellido_paterno = 'Gonzales';
    nuevosDatos.estudiantes_apellido_materno = 'Herrera';
    nuevosDatos.estudiantes_id_escuela = 4;
    nuevosDatos.estudiantes_promedio = 8.5; 

    await conn.query('INSERT INTO estudiantes set ? ', [nuevosDatos]);
    //console.log(respuesta);
    console.log('Se ha insertado correctamente el Estudiante');
    res.json({
        mensaje: 'Se ha insertado correctamente el Estudiante'
    });
}

router.post('/insertarEstudiante', insertarEstudiantes); 

//-------------- Read - Leer
const verEstudiantes = async (req,res) =>{

    const respuesta = await conn.query(
         'SELECT estudiantes_nombre, estudiantes_promedio, escuelas_nombre FROM estudiantes '
        +'INNER JOIN escuelas ON escuelas_id = estudiantes_id_escuela'
        );
    console.log(respuesta);
    res.json({
        datos:respuesta
    });
}

router.get('/verEstudiantes', verEstudiantes); 


//-------------- Update - Actualizar 
const actualizarEstudiantes = async (req,res) =>{
    const nuevosDatos =  req.body;
    const {id} = req.params;
    
    nuevosDatos.estudiantes_nombre = 'Carlos';  
    nuevosDatos.estudiantes_apellido_paterno = 'Ulibarri';
   
    await conn.query('UPDATE estudiantes set ? WHERE estudiantes_id = ?', [nuevosDatos, id]);
    console.log('Se ha actualizado correctamente el Estudiante');
    res.json({
        mensaje: 'Se ha actualizado correctamente el Estudiante'
    });
}
router.put('/actualizarEstudiante/:id', actualizarEstudiantes); 

// ------- Delete -Eliminar 

const eliminarEstudiantes = async (req,res) =>{
    const {id} = req.params;

    await conn.query('DELETE FROM estudiantes WHERE estudiantes_id = ?', [id]);
    //console.log(respuesta);
    console.log('Se ha eliminado correctamente el Estudiante');
    res.json({
        mensaje: 'Se ha eliminado correctamente la Estudiante'
    });
}
router.delete('/eliminarEstudiante/:id', eliminarEstudiantes); 