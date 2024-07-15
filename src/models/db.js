const { MongoClient, Db} = require("mongodb");

let singleton;

/**
 * Connect to the database
 * @returns {Promise<Db>}
 */
async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

async function findAll(collection) {
    const db = await connect();
    return db.collection(collection).find().toArray();
}

async function insertOne(collection, data) {
    const db = await connect();
    return db.collection(collection).insertOne(data);
}

module.exports = { findAll, insertOne }