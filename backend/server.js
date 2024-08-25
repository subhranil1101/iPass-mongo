const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cors = require('cors')

dotenv.config()
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors());


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'iPass';


client.connect();

//Get all the password
app.get('/', async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      const findResult = await collection.find({}).toArray();
      res.json(findResult)
})

//Save a password
app.post('/', async (req, res) => {
      const password = req.body
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      await collection.insertOne(password);
      res.send({ success: true })
})
//delete a password
app.delete('/', async (req, res) => {
      const password = req.body
      const db = client.db(dbName);
      const collection = db.collection('passwords');
      await collection.deleteOne(password);
      res.send({ success: true })
})

app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`)
})