// tudo pt 3
const jwt = require('jsonwebtoken');
const { set } = require('../api');

const checkToken = async (token, id, key) => jwt.verify(token, key, (err, decoded) => {
    if (err) {
        return false;
    }
    return decoded.id === id;
});

const setToken = async (id, key) => {
    console.log(id);
    if (id) {
        return jwt.sign({id }, key, { expiresIn: 23300 });
    }
    return false;
};
    
module.exports = {
    checkToken,
    setToken,
};
