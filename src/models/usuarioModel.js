// tudo pt 3
const db = require("./db");

const registrarUsuario = async (nick) => {
    return await db.insertOne("usuario", { "nick": nick });
}

const buscarUsuario = async (idUser) => {
    return await db.findOne("usuarios", idUser);
}

const alternarUsuario = async (user) => {
    return await db.updateOne("usuarios", user, { _id: user._id });
}

module.exports = {
    registrarUsuario,
    buscarUsuario,
    alternarUsuario
}