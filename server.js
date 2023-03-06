const express = require('express')
const app = express()
const sqlite = require('sqlite3').verbose()
const port = 5000
const cors = require('cors')
app.use(express.json())
app.use(cors())

const db = new sqlite.Database('newdata.db' , (err) => {
    if(err){
      console.log(err)
    }else {
      console.log("ok")
    }
})

app.get('/' , (req,res) => {
  db.all('SELECT * FROM suits' , [] , (err,data) => {
    res.send(data)
  })
})


app.get('/:suit_id', (req, res) => {
  const id = req.body.suit_id
  db.get('SELECT * FROM suits WHERE suit_id = ? ', [id],(err, data) => {
      res.send(data)
  })
})

app.post('/', (req, res) => {
  const name = req.body.name
  const oldprice = req.body.oldprice
  const price = req.body.price
  const image = req.body.image
  db.run('INSERT INTO suits (name, oldprice, price, image) VALUES (?,?,?,?)',[name, oldprice, price, image] , (err) => {
      res.send("Done!")
  })
})

app.delete('/:suit_id', (req, res) => {
  const id = req.body.suit_id
  db.delete('DELETE FROM suits WHERE suit_id = ?', [id], (err, data) => {
    req.send(data)
  })
})

app.put('/:suit_id' , (req, res) =>  {
  const id = req.params.suit_id
  const name = req.body.name
  const oldprice = req.body.oldprice
  const price = req.body.price
  const image = req.body.image
  db.put('UPDATE suits SET name = ? oldprice = ? newprice = ? image = ? WHERE suit_id = ?', [id, name, oldprice, newprice, price, image], (err) => {
    res('Changes done!')
  })
})

app.listen(port)