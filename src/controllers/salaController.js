/* VERSAO 1

const salaModel= require('../models/salaModel');

exports.get=async(req,res)=>{
    return {"status":"OK", "controller":"Sala"};
} */

/* VERSAO 2 - PAGINA 7 

exports.get=()=>{
    let salaModel = require('../models/salaModel');
    return salaModel.listarSalas();

}*/

const salaModel = require('../models/salaModel');

exports.get = async () => {
    return await salaModel.listarSalas();
}

exports.create = async (nome) => {
    return await salaModel.criarSala(nome);
}