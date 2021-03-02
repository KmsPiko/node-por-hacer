const fs = require('fs');
let listadoPorHacer=[];

const guardarDB=()=>{
    let data=JSON.stringify(listadoPorHacer);

    fs.writeFile("db/data.json",data,(err)=>{
        if(err) throw new Error("no se pudo grabar");
        console.log("El documento ha sido guardado");
    })
}

const cargarDB=()=>{
    try{
            listadoPorHacer= require('../db/data.json');
    }catch{
            listadoPorHacer=[];
    }

    
 
}
const getListado=()=>{
    cargarDB();

    return listadoPorHacer;

}

const crear=(descripcion)=>{
    cargarDB();
    
    let porHacer={
        descripcion,
        completado:false
    };
    listadoPorHacer.push(porHacer);
    //console.log(porHacer);
    //console.log(listadoPorHacer);
    guardarDB()
    return porHacer;
}

const actualiza=(descripcion,completado=true)=>{
    cargarDB();
     

    let index=listadoPorHacer.findIndex(tarea=>tarea.descripcion===descripcion)

        if(index>=0){
            listadoPorHacer[index].completado=completado;
            guardarDB();
            return true;
        }else{
            return false;
        }
    
}
const borrar=(descripcion)=>{
    cargarDB();

    let index=listadoPorHacer.findIndex(tarea=>tarea.descripcion===descripcion)

    if(index>=0){
        listadoPorHacer.splice(index,1)
        guardarDB();
        return true;
    }else{
        return false;
    }

}

module.exports={
    crear,
    guardarDB,
    getListado,
    actualiza,
    borrar

}

