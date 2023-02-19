# Temp 

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

# Mongo API 

## Usage

To use Mongo API, use the official container or install NodeJs and run Mongo DB with the `initial.sh` script.

## Structure

The Mongo API use one table named `povajs-api` where is the Mongo all databases administrator that is used by the API. Inside this database are two tables: `users` and `databases`. One store all the users with their permissions for databases and other one store the databases create by Mongo API because those are only accessible from Mongo API for security.

## API

### Users

⚠ To use with the Mongo API default main admin user, it cannot be deleted, or updated from the API for security.

| Entrypoint | Headers data | Description |
| - | - | - |
| ***/users/add*** | **X-name**: name, **X-password**: hashed password, **X-permissions**: json object with permissions | add a user to the database |
| ***/users/remove*** | **X-name**: name | remove a user from the database |
| ***/users/update*** | (**X-name**: name), (**X-password**: hashed password), (**X-permissions**: json object with permissions) | update a user in the database |

### Databases

| Entrypoint | Headers data | Description |
| - | - | - |
| ***/databases/add*** | **X-name**: name |  |
| ***/databases/create*** |  |  |
| ***/databases/update*** |  |  |
| ***/databases/drop*** |  |  |
| ***/databases/copy*** |  |  |
| ***/databases/&lt;database>/add*** |  |  |
| ***/databases/&lt;database>/create*** |  |  |
| ***/databases/&lt;database>/update*** |  |  |
| ***/databases/&lt;database>/drop*** |  |  |
| ***/databases/&lt;database>/&lt;collection>/create*** |  |  |
| ***/databases/&lt;database>/&lt;collection>/update*** |  |  |
| ***/databases/&lt;database>/&lt;collection>/delete*** |  |  |
| ***/databases/&lt;database>/&lt;collection>/get*** |  |  |
