const { MongoClient, Db, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

let singleton;

/**
 * Connect to the database
 * @returns {Promise<Db>}
 */
async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(uri);
    await client.connect();

    singleton = client.db('chat');
    return singleton;
}

async function findAll(collection) {
    const db = await connect();
    return db.collection(collection).find().toArray();
}

async function insertOne(collection, data) {
    const db = await connect();
    const result = await db.collection(collection).insertOne(data);
    return result;
}

// pt 3
let findOne = async (collection, _id) => {
    const db = await connect();
    let obj = await db.collection(collection).find({ '_id': new ObjectId(_id) }).toArray();
    if (obj)
        return obj[0];
    return false;
}

let updateOne = async (collection, object, param) => {
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, { $set: object });
    return result;
}

// .

module.exports = {
    findAll,
    insertOne,
    findOne,
    updateOne
}