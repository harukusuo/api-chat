const mensagemModel = require('../models/mensagemModel');

exports.put = async (msg) => {
    return await mensagemModel.put(msg);
}
