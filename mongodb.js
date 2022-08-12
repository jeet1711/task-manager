//CRUD create read update delete
const mongodb = require('mongodb')

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL,{ useUnifiedTopology: true }, (error,client) => {
    if(error) {
        console.log('unable to connect to database');
    }
    const db = client.db(databaseName)
    
    db.collection('tasks').insertMany([
        {
            description: 'Cook',
            completed: true
        },
        {
            description: 'hang out',
            completed: true
        },
        {
            description: 'sleep',
            completed: false
        }
    ], (error, result) => {
        if(error){
            console.log("unable to insert data");
        }
        console.log(result.ops);
    })

})