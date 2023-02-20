require('dotenv').config()

const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://apiAdmin:mongoapipassworduptoyou@localhost:27017/api')

const app = require('express')()
const port = process.env.PORT

async function run() {
        try {
                await client.connect();
                await client.db('api').collection('test').insertOne({ content: 'test' })
                var content = await client.db('api').collection('test').find().toArray(function (err, res) {
                        console.log(res);
                });
        } finally {
                await client.close();
        }
}

//              USERS
// token: <name>:<sha256_password>
/* permissions: {
    default: '<r:read|w:write|x:modify|a:admin>',
    specific_db: {
        permissions: '<r:read|w:write|x:modify>',       <- this one is over the default one for the hole database
        specific_col: '<r:read|w:write|x:modify>'
    }
}*/ 
app.post('/user', (req, res) => {
    
})
app.delete('/user', (req, res) => {
    
})
app.patch('/user', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`🥭 Mongo API listening on port ${port}`)
})
