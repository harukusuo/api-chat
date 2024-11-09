const salaModel = require('../models/salaModel');

exports.get = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const salas = await salaModel.listarSalas();
    res.json(salas);
}

exports.create = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const nome = req.body.nome;
    const sala = await salaModel.criarSala(nome);
    res.json(sala);
}

// pt 3 
exports.entrar = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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
        res.json({
            msg: "OK",
            timestamp: Date.now()
        });
    } else {
        res.status(500).json({ error: "Failed to enter room" });
    }
}

exports.enviarMensagem = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { nick, msg, idsala } = req.body;
    const sala = await salaModel.buscarSala(idsala);
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
    res.json({ "msg": "OK", "timestamp": timestamp });
}

exports.buscarMensagens = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { idsala, timestamp } = req.query;
    let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
    res.json({
        "timestamp": mensagens[mensagens.length - 1].timestamp,
        "msgs": mensagens
    });
}
