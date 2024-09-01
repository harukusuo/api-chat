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

// pt 3 
exports.entrar = async (iduser, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel = require('../models/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);
    user.sala = {
        _id: sala._id,
        nome: sala.nome,
        tipo: sala.tipo
    };
    if (await usuarioModel.alternarUsuario(user)) {
        return {
            msg: "OK",
            timestamp: Date.now()
        };
    }
    return false;
}

exports.enviarMensagem = async (nick, msg, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    if (!sala.msgs) {
        sala.msgs = [];
    }
    timestamp = Date.now()
    sala.msgs.push(
        {
            timestamp: timestamp,
            msg: msg,
            nick: nick
        }
    )
    let resp = await salaModel.atualizarMensagens(sala);
    return { "msg": "OK", "timestamp": timestamp };
}

exports.buscarMensagens = async (idsala, timestamp) => {
    let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
    return {
        "timestamp": mensagens[mensagens.length - 1].timestamp,
        "msgs": mensagens
    };
}
