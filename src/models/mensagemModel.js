const db = require("./db");

function put(msg) {
    return db.insertOne("mensagens", msg);
}


module.exports = { put }