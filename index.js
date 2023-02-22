require('dotenv').config()

const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://apiAdmin:admin@localhost:27017/api');

(async () => {
        await client.connect();
})();

const app = require('express')()
const port = process.env.PORT

//              USERS           //

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
                                let current_perm = current[0].perm.split(';')
                                if (current.length < 1 || current_perm.find(e => e == ':a') != ':a')
                                        res.send('Error@user: auth failed\n')
                                else {
                                        // check if the new user already exists
                                        let check = await client.db('api').collection('users').find({ name: req.headers['x-name'] }).toArray()
                                        if (check.length > 0)
                                                res.send('Error@user: user already exists\n')
                                        else {
                                                client.db('api').collection('users').insertOne({ name: req.headers['x-name'], pwd: req.headers['x-pwd'], perm: req.headers['x-perm'] })
                                                res.send('Success@user: user successfully added\n')
                                        }
                                }
                        } catch {
                                res.send('Error@user: mongo internal error with users collection\n')
                        }
                }
        }
})
app.delete('/user', async (req, res) => {
        if (req.headers['x-name'] == null || req.headers['x-token'] == null)
                res.send('Error@user: missing header\n')
        else {
                let [usr, pwd] = req.headers['x-token'].split('.')
                if (pwd == null || pwd == '')
                        res.send('Error@user: wrong token syntax\n')
                else {
                        try {
                                let current = await client.db('api').collection('users').find({ name: usr, pwd: pwd }).toArray()
                                let current_perm = current[0].perm.split(';')
                                if (current.length < 1 || current_perm.find(e => e == ':a') != ':a')
                                        res.send('Error@user: auth failed\n')
                                else {
                                        if (req.headers['x-name'] != 'apiAdmin') {
                                                let check = await client.db('api').collection('users').find({ name: req.headers['x-name'] }).toArray()
                                                if (check.length > 0) {
                                                        client.db('api').collection('users').deleteOne({ name: req.headers['x-name'] })
                                                        res.send('Success@user: user successfully deleted\n')
                                                }
                                                else
                                                        res.send('Error@user: user to delete doesn\'t exists\n')
                                        }
                                        else
                                                res.send('Error@user: apiAdmin user cannot be deleted from the API\n')
                                }
                        } catch {
                                res.send('Error@user: mongo internal error with users collection\n')
                        }
                }
        }
})
app.patch('/user', async (req, res) => {
        if (req.headers['x-name'] == null || req.headers['x-token'] == null)
                res.send('Error@user: missing header\n')
        else {
                let [usr, pwd] = req.headers['x-token'].split('.')
                if (pwd == null || pwd == '')
                        res.send('Error@user: wrong token syntax\n')
                else {
                        try {
                                let current = await client.db('api').collection('users').find({ name: usr, pwd: pwd }).toArray()
                                let current_perm = current[0].perm.split(';')
                                if (current.length < 1 || current_perm.find(e => e == ':a') != ':a')
                                        res.send('Error@user: auth failed\n')
                                else {
                                        let new_name_exists = req.headers['x-newname'] != null ? await client.db('api').collection('users').find({ name: req.headers['x-newname'] }).toArray().length > 0 : false
                                        if (new_name_exists)
                                                res.send('Error@user: the name you want to change already exists and duplicates aren\'t allowed\n')
                                        else {
                                                let user_exists = await client.db('api').collection('users').find({ name: req.headers['x-name'] }).toArray()
                                                if (user_exists.length > 0) {
                                                        let new_values = { $set: {  } }
                                                        if (req.headers['x-newname'] != null)
                                                                new_values['$set']['name'] = req.headers['x-newname']
                                                        if (req.headers['x-pwd'] != null)
                                                                new_values['$set']['pwd'] = req.headers['x-pwd']
                                                        if (req.headers['x-perm'] != null)
                                                                new_values['$set']['perm'] = req.headers['x-perm']

                                                        client.db('api').collection('users').updateOne({ name: req.headers['x-name'] }, new_values)
                                                        res.send('Success@user: user successfully updated\n')

                                                }
                                                else
                                                        res.send('Error@user: the user to update doesn\'t exists\n')
                                        }
                                }
                        } catch {
                                res.send('Error@user: mongo internal error with users collection\n')
                        }
                }
        }
})

app.get('/', (req, res) => {
        client.db('l').collection('test').insertOne({ test: 'test' })
        res.send('OK\n')
})

app.listen(port, () => {
  console.log(`🥭 Mongo API listening on port ${port}`)
})
