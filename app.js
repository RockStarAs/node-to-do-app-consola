const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');
//console.log(argv);

let comando = argv._[0];
switch(comando) {
    case "crear":
        let respuesta = porHacer.crear(argv.descripcion);
        porHacer.guardarDb();
        console.log(`La tarea : "${respuesta.descripcion}" ha sido creada.`);
        break;
    case "listar":
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log("=========POR HACER==========".green);
            console.log("Tarea: " + tarea.descripcion);
            console.log("Estado: " , tarea.completado == true ? 'Completado': 'No Completado' );
            console.log("============================".green);
        }
        break;
    case "actualizar":
        let actualizado = porHacer.actualizar(argv.descripcion,argv.compleado);
        console.log(actualizado == true ? 'Actualizado': 'No se pudo actualizar');
        break;
    case "borrar":
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado == true ? 'Actualizado': 'No se pudo actualizar');
        break;
    default:
        console.log("Comando no reconocido");
        break;
}