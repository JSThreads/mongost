require('dotenv').config()

const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://apiAdmin:admin@localhost:27017/api');

(async () => {
        await client.connect();
})();

const app = require('express')()
const port = process.env.PORT

//              USERS
//token: <name>:<sha256_password>
/* permissions: {
    default: '<r:read|w:write|x:modify|a:admin>',
    specific_db: {
        permissions: '<r:read|w:write|x:modify>',       <- this one is over the default one for the hole database
        specific_col: '<r:read|w:write|x:modify>'
    }
}*/

app.post('/user', async (req, res) => {
        if (req.headers['x-name'] == null || req.headers['x-pwd'] == null || req.headers['x-perm'] == null || req.headers['x-token'] == null)
                res.send('Error@user: missing header\n')
        else {
                let [usr, pwd] = req.headers['x-token'].split('.')
                if (pwd == null || pwd == '')
                        res.send('Error@user: wrong token syntax\n')
                else {
                        // try to get the user..
                        // if token match and the user has the admin permissions add the new user
                        // else throw auth error

                        try {
                                let current = await client.db('api').collection('users').find({ name: usr, pwd: pwd }).toArray()
                                if (current.length > 0)
                                        res.send('Error@user: auth failed')
                                else {
                                        // check if the new user already exists
                                        let check = await client.db('api').collection('users').find({ name: req.headers['x-name'] }).toArray()
                                        if (check.length > 0)
                                                res.send('Error@user: user already exists')
                                        else {
                                                client.db('api').collection('users').insertOne({ name: req.headers['x-name'], pwd: req.headers['x-pwd'], perm: req.headers['x-perm'] })
                                                res.send('Success@user: user successfully added')
                                        }
                                }
                        } catch {
                                res.send('Error@user: mongo internal error with user collection\n')
                        }
                }
        }
})
app.delete('/user', (req, res) => {

})
app.patch('/user', (req, res) => {

})

app.listen(port, () => {
  console.log(`🥭 Mongo API listening on port ${port}`)
})