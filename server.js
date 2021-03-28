const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var configDB = require('./config/database.js')

var db, collection;
const url = configDB.url
const dbName = config.dbName

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('list').find().toArray((err, result) => {
    db.collection('list').countDocuments({ done:false },
    (error, count) => {
      if (err) return console.log(err)
      res.render('index.ejs', {list: result, counter: count})
    })
  })
})

app.post('/newTask', (req, res) => {
  db.collection('list').insertOne({task: req.body.task, done: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/completed', (req, res) => {
  db.collection('list')
  .findOneAndUpdate({task: req.body.task}, {
    $set: {
      done: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/deleteItem', (req, res) => {
  db.collection('list').findOneAndDelete({task: req.body.task}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.delete('/deleteCompleted', (req, res) => {
  db.collection('list').deleteMany({done: true}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.delete('/deleteAll', (req, res) => {
  db.collection('list').deleteMany({}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
