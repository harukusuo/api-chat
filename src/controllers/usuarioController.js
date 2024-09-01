// tudo pt 3
const token = require("../util/token");
const usuarioModel = require('../models/usuarioModel');

exports.entrar=async(nick)=>{
    let resp = await usuarioModel.registrarUsuario(nick);
    if(response.insertId){
        return {"idUser":resp.insertId,
            "token": await token.setToken(JSON.stringify(resp.insertId).replace(/"/g, ''),nick),
            "nick":nick}
    }
}