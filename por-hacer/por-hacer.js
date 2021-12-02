
const fs = require('fs');

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDb();
    let porHacer = {
        descripcion,
        completado : false
    };
    listadoPorHacer.push(porHacer);
    
    return porHacer;
};
const guardarDb = ()=>{
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile("./db/data.json",data,(err)=>{
        if(err) throw new Error("Ocurrió un error agregando a la bd");
        //return "Creado";
    });
};
const cargarDb = () => {
    try{
        listadoPorHacer = require('../db/data.json');
    }catch(err){
        listadoPorHacer = [];
    }
    
}
const getListado = ()=>{
    cargarDb();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDb();
    let index = listadoPorHacer.findIndex( (tarea) => {return tarea.descripcion === descripcion});
    if(index == -1){
        //Error
        return false;
    }else{
        //Actualiza con el estado
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    }
}
const borrar = (descripcion) => {
    cargarDb();
    let nuevoListado = listadoPorHacer.filter((tarea) => {return tarea.descripcion !== descripcion});
    if(nuevoListado.length === listadoPorHacer.length) {
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDb();
        return true;
    }
    
}

module.exports = {
    crear,
    guardarDb,
    getListado,
    actualizar,
    borrar,
}
