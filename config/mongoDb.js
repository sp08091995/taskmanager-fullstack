//CRUD

// const mongodb = require('mongodb');
// const MongoClient = require('mongodb/lib/mongo_client');
// const mongoClient = mongodb.mongoClient

const { MongoClient, ObjectId }=require('mongodb');

/**Learning on Id's */
const id = new ObjectId();
console.log(id.id)
console.log(id.id.length)
console.log(id.getTimestamp())
console.log(id.toHexString())
console.log(id.toHexString().length)

const connectionUrl = "mongodb://admin:password@127.0.0.1:27017/admin"
const databaseName = "taskmanager";

MongoClient.connect(connectionUrl, { useNewUrlParser: true },async (error, client) => {
    if (error) {
        return console.log("Unable to connect to database "+error.toString())
    }

    const db = client.db("taskmanager")

    // db.collection('users').insertOne(
    //     {   
    //         _id: id,
    //         fullname: 'Vikram',
    //         age: 26
    //     }
    // )
    
    try {
        const result = await db.collection("users").find({
        });
        console.log(await result.count());

    } catch (error) {
        console.log("Unable to fetch: "+error.toString())
    }

    console.log('Connected')
})
