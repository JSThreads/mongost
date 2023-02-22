// setup all configs
require('dotenv').config();

const { MongoClient } = require('mongodb');

const rsaEngine = require('encrypt-rsa').default;
const ersa = new rsaEngine();

const app = require('express')();

const port = process.env.PORT;
let   entrypoint = process.env.ENTRYPOINT;
const host = process.env.HOST;
const enrsa = process.env.ENRSA;
const dersa = process.env.DERSA;

if (entrypoint[entrypoint.length - 1] == '/')
        entrypoint = entrypoint.substring(0, entrypoint.length - 1);

app.post(`${entrypoint}/exec/:database`, async (req, res) => {
        try {
                if (req.headers['x-token'] == null)
                        res.send('Error: Missing headers');
                else {
                        const token = ersa.decryptStringWithRsaPrivateKey({ text: req.headers['x-token'], dersa });
                        const [usr, pwd] = token.split('.');

                        // url adds on
                        let db = req.headers['x-database'] || '';
                        let options = req.headers['x-options'] || '';

                        if (options != '')
                                options = `?${options}`;

                        const client = new MongoClient(`mongodb://${usr}:${pwd}@${host}/${db}${options}`);
                        await client.connect();

                        // run command
                        let cmd = req.headers['x-command'];
                        const result = await client.db(req.params.database).command(JSON.parse(cmd));

                        await client.close();

                        res.send(JSON.stringify(result));
                }
        } catch {
                await client.close();

                res.send('Error: Something went wrong..');
        }
});

app.get(`${entrypoint}/api/:database/:collection`, async (req, res) => {
        try {
                if (req.headers['x-token'] == null)
                        res.send('Error: Missing headers');
                else if (req.params.database == null || req.params.collection == null)
                        res.send('Error: Wrong query')
                else {
                        const token = ersa.decryptStringWithRsaPrivateKey({ text: req.headers['x-token'], dersa });
                        const [usr, pwd] = token.split('.');

                        // url adds on
                        let db = req.headers['x-database'] || '';
                        let options = req.headers['x-options'] || '';

                        if (options != '')
                                options = `?${options}`;

                        const client = new MongoClient(`mongodb://${usr}:${pwd}@${host}/${db}${options}`);
                        await client.connect();

                        // run the query
                        let query = req.headers['x-query'] || {};
                        let query_options = req.headers['x-query-options'] || {};
                        let query_type = req.headers['x-query-type'] || 'mongoDB';     // mongoDB | graphQL
                        let query_method = req.headers['x-query-method'] || 'find';    // find | aggregate | subscribe | distinct | search => for mongoDB only

                        switch (query_type) {
                                case 'mongoDB':
                                        switch (query_method) {
                                                case 'find':
                                                break;
                                                default:
                                                        res.send('Error: Wrong query method');
                                        }
                                break;
                                default:
                                        res.send('Error: Wrong query type');
                        }
                }
        } catch {
                await client.close();

                res.send('Error: Something went wrong..');
        }
})
