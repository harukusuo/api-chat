const express = require("express");
const salaController = require("./controllers/salaController");
const mensagemController = require("./controllers/mensagemController");

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

app.post("/sala/mensagem", async (req, res) => {
    const msg = req.body; 
    await mensagemController.put(msg);
    const resp = {
        "status": 200,
        "msg": "OK"
    }
    res.status(200).send(resp);
});// 
// 
// 
// 
// 
// 

app.get("/salas", async (req, res) => {
    const resp = await salaController.get(); // this line .. wait for the get thingy to be ready ..
    res.status(200).send(resp);
});





module.exports = app;
