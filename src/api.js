const express = require("express");
const cors = require("cors");
const salaController = require("./controllers/salaController");
const mensagemController = require("./controllers/mensagemController");
const tokens = require("./util/token");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>")
});

app.get("/sobre", (req, res) => {
    res.status(200).send({
        "nome": "API CHAT",
        "versão": "0.1.0",
        "autor": "Sarah"
    });
});

// pt 3
app.post("/sala/mensagem", async (req, res) => {
    if(!tokens.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) return res.status(401).send({ msg: "Usuário não autorizado" });
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
});

// .

app.get("/salas", async (req, res) => {
    const tokenOk = await tokens.checkToken(req.headers.token, req.headers.iduser, req.headers.nick);
    if (tokenOk) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" });
    }
});

// pt 3
app.post("/entrar", async (req, res) => {
    const usuarioController = require("./controllers/usuarioController");
    console.log("Requisição recebida para /entrar:", req.body);
    try {
        let resp = await usuarioController.entrar(req.body.nick);
        console.log("Resposta do usuarioController.entrar:", resp);
        res.status(200).send(resp);
    } catch (error) {
        console.error("Erro ao entrar:", error);
        res.status(500).send({ msg: "Erro no servidor" });
    }
});

app.put("/sala/entrar", async (req, res) => {
    const tokenOk = await tokens.checkToken(req.headers.token, req.headers.iduser, req.headers.nick);
    if (!tokenOk) {
        return res.status(401).send({ msg: "Usuário não autorizado" });
    }
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
});

app.get("/sala/mensagens", async (req, res) => {
    if(!tokens.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) return res.status(401).send({ msg: "Usuário não autorizado" });
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
});

module.exports = app;
