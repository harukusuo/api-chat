const express = require("express");
const salaController = require("./controllers/salaController");

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

app.get("/salas", async (req, res) => {
    const resp = await salaController.get();
    res.status(200).send(resp);
});

app.post("/salas", async (req, res) => {
    const nome = req.body.nome;
    console.log(`Criando sala "${nome}"`);

    const resp = await salaController.create(nome);

    res.status(201).send(resp);
});

module.exports = app;
