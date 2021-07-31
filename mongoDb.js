//CRUD

const mongodb = require('mongodb');
const MongoClient = require('mongodb/lib/mongo_client');

const mongoClient = mongodb.mongoClient

const connectionUrl = "mongodb://admin:password@127.0.0.1:27017/admin"
const databaseName = "taskmanager";

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database "+error.toString())
    }

    const db = client.db("admin")

    db.collection('users').insertOne(
        {
            fullname: 'Santanu',
            age: 25
        }
    )
    console.log('Connected')
})
