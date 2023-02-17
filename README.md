# mongo-api
MongoDB API builded with nodejs

Mongo setup admin all db user (API)

in mongosh

```
use api
db.addUser({ user: "apiAdmin", pwd: "mongoapipassworduptoyou", roles: [{ "role" : "dbAdminAnyDatabase", "db" : "api" }] })
```

node js dep: express, dotenv, mongodb
```js
const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://apiAdmin:mongoapipassworduptoyou@localhost:27017/api')

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
```
