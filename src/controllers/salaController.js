const salaModel = require('../models/salaModel');

exports.get = async () => {
    const salas = await salaModel.listarSalas();
    return salas;
}

exports.create = async () => {
    const nome = req.body.nome;
    const sala = await salaModel.criarSala(nome);
    return sala
}

// pt 3 
exports.entrar = async () => {
    const { iduser, idsala } = req.body;
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
    } else {
        throw new Error("Failed to enter room");
    }
}

exports.enviarMensagem = async (nick, msg, idSala) => {
    const sala = await salaModel.buscarSala(idSala);

    if(!sala) {
        throw new Error("Room not found");
    }

    if (!sala.msgs) {
        sala.msgs = [];
    }
    const timestamp = Date.now();
    sala.msgs.push(
        {
            timestamp: timestamp,
            msg: msg,
            nick: nick
        }
    );
    let resp = await salaModel.atualizarMensagens(sala);
    return { "msg": "OK", "timestamp": timestamp };
}

exports.buscarMensagens = async (idSala, timestamp) => {
    let mensagens = await salaModel.buscarMensagens(idSala, timestamp);

    if (!mensagens || mensagens.length == 0) {
        return {
            "timestamp": timestamp,
            "msgs": []
        }
    }

    return {
        "timestamp": mensagens[mensagens.length - 1].timestamp,
        "msgs": mensagens
    }
}
