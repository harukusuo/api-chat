const db = require("./db");

function listarSalas() {
    return db.findAll("salas");
}

/**
 * 
 * @param {string} nome
 * @returns 
 */
function criarSala(nome) {
    return db.insertOne("salas", { nome });
}

module.exports = { listarSalas, criarSala }

/* VERSAO 1 - PAGINA 7

function listarSalas() {
    return [
        {
            "_id": {
                "$oid": "643ece43ea11e6e5b0421f10"
            },
            "nome": "Guerreiros da InfoCimol",
            "tipo": "publica"
        },{
            "_id": {
                "$oid": "643ecec1ea11e6e5b0421f12"
            },
            "nome": "Só os confirmados da INFO",
            "tipo": "privada",
            "chave": "atat8q4haw"
        },
        {
            "_id": {
                "$oid": "643f22a2ea11e6e5b0421f18"
            },
            "nome": "Guerreiros da INFO",
            "tipo": "publico"
        }
    ];
}*/
