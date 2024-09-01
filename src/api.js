const express = require("express");
const salaController = require("./controllers/salaController");
const mensagemController = require("./controllers/mensagemController");
const tokens = require("./util/token");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>")
});

app.get("/sobre", (req, res) => {
    res.status(200).send({
        "nome": "API CHAT",
        "versão": "0.1.0",
        "autor": "Sarah"
    })
});

// pt 3
app.use("/sala/mensagem/", router.post("/sala/mensagem", async (req, res) => {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp= await salaController.enviarMensagem(req.headers.nick, req.body.msg,req.body.idSala);
    res.status(200).send(resp);
  }))
// .

app.get("/salas", router.get("/salas", async (req, res) => {
    const tokenOk = await tokens.checkToken(req.headers.token, req.headers.iduser, req.headers.nick);
    if (tokenOk) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" });
    }
}))

//pt 3
app.use("/entrar", router.post("/entrar", async (req, res, next) => {
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use("/sala/entrar", router.put("/sala/entrar", async (req, res)=>{
    const tokenOk = await tokens.checkToken(req.headers.token, req.headers.iduser, req.headers.nick);
    if(!tokenOk) {
        return false;
    }
    let resp = await salaController.entrar(req,headers.iduser, req.query.idsala);
    res.status(200).send(resp);
}));

app.use("/sala/mensagens/", router.get("/sala/mensagens", async (req, res) => {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp= await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
  }))  

// .

module.exports = app;
