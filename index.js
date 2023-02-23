// setup all configs
require('dotenv').config();

const { exec } = require("child_process");
const { MongoClient } = require('mongodb');

const app = require('express')();

const port = process.env.PORT;
let   entrypoint = process.env.ENTRYPOINT;
const host = process.env.HOST;

if (entrypoint[entrypoint.length - 1] == '/')
    entrypoint = entrypoint.substring(0, entrypoint.length - 1);

// list db
// list col

/*
(async () => {
    const client = new MongoClient(`mongodb://apiAdmin:admin@${host}/`);
    await client.connect();

    console.log(JSON.stringify(await client.db('test').collection('orders').aggregate([
        { $lookup:
           {
             from: 'products',
             localField: 'product_id',
             foreignField: '_id',
             as: 'orderdetails'
           }
         }
        ]).toArray()));
})()
*/

app.post(`${entrypoint}/exec`, async (req, res) => {
    try {
        if (req.headers['x-token'] == null)
                res.send('Error: Missing headers');
        else {
            const token = req.headers['x-token'];
            const [usr, pwd] = token.split('.');

            // url adds on
            let db = req.headers['x-database'] || '';
            let options = req.headers['x-options'] || '';

            if (options != '')
                options = `?${options}`;

            const client = new MongoClient(`mongodb://${usr}:${pwd}@${host}/${db}${options}`);
            await client.connect();

            // run the command

            if (req.headers['x-command'] == null) 
                res.send('Error: Missing command')
            else 
                exec(`mongosh --eval "printjson(${req.headers['x-command']})"`, (error, stdout, stderr) => {
                    if (error) 
                        res.send(`Error: Mongosh says, ${error}`)
                    else if (stderr) 
                        res.send(`Error: Mongosh says, ${stderr}`)
                    else
                        res.send(stdout.split('\n').splice(24).join('\n'))
                });
        }
    } catch(e) {
        console.log(e)
        res.send('Error: Something went wrong..');
    }
})

app.get(`${entrypoint}/api/:database/:collection`, async (req, res) => {
    try {
        if (req.headers['x-token'] == null)
                res.send('Error: Missing headers');
        else {
            const token = req.headers['x-token'];
            const [usr, pwd] = token.split('.');

            // url adds on
            let db = req.headers['x-database'] || '';
            let options = req.headers['x-options'] || '';

            if (options != '')
                options = `?${options}`;

            const client = new MongoClient(`mongodb://${usr}:${pwd}@${host}/${db}${options}`);
            await client.connect();

            // run the query
            let query = JSON.parse(req.headers['x-query']) || {};
            let query_options = JSON.parse(req.headers['x-query-options']) || {};
            let sort = JSON.parse(req.headers['x-query-sort']) || {};
            let limit = JSON.parse(req.headers['x-query-limit']) || {};

            res.send(JSON.stringify(client.db(req.params.database).collection(req.params.collection).find(query, query_options).sort(sort).limit(limit).toArray()));
        }
    } catch {
        res.send('Error: Something went wrong..');
    }
})

app.post(`${entrypoint}/api/:database/:collection`, async (req, res) => {
    try {
        if (req.headers['x-token'] == null)
                res.send('Error: Missing headers');
        else {
            const token = req.headers['x-token'];
            const [usr, pwd] = token.split('.');

            // url adds on
            let db = req.headers['x-database'] || '';
            let options = req.headers['x-options'] || '';

            if (options != '')
                options = `?${options}`;

            const client = new MongoClient(`mongodb://${usr}:${pwd}@${host}/${db}${options}`);
            await client.connect();

            // insert data
            let data = JSON.parse(req.headers['x-data']) || {};

            if (data.length != null)
                client.db(req.params.database).collection(req.params.collection).insertMany(data)
            else 
                client.db(req.params.database).collection(req.params.collection).insertOne(data)

            res.send('Successfully added the data!');
        }
    } catch {
        res.send('Error: Something went wrong..');
    }
})

app.delete(`${entrypoint}/api/:database/:collection`, async (req, res) => {
    try {
        if (req.headers['x-token'] == null)
                res.send('Error: Missing headers');
        else {
            const token = req.headers['x-token'];
            const [usr, pwd] = token.split('.');

            // url adds on
            let db = req.headers['x-database'] || '';
            let options = req.headers['x-options'] || '';

            if (options != '')
                options = `?${options}`;

            const client = new MongoClient(`mongodb://${usr}:${pwd}@${host}/${db}${options}`);
            await client.connect();

            // delete data
            let query = JSON.parse(req.headers['x-query']) || {}
            let type = JSON.parse(req.headers['x-query-type']) || 'single'

            if (type == 'single')
                client.db(req.params.database).collection(req.params.collection).deleteOne(query)
            else
                client.db(req.params.database).collection(req.params.collection).deleteMany(query)

            res.send('Successfully deleted the data!');
        }
    } catch {
        res.send('Error: Something went wrong..');
    }
})

app.listen(port, () => {
    console.log(`🥭 Mongo API listening on port ${port}`);
})
