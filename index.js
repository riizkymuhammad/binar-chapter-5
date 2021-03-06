require('dotenv').config()
const express = require('express')
const fs = require('fs') // core module
const { v4: uuidv4 } = require('uuid')
const app = express()
const port = 3000

app.use(express.static('assets'))

app.set('view engine', 'ejs')
app.set('views', './public/views')

app.use(express.json()) // parse json

app.use(express.urlencoded({ extended: true })) // parse x-www-form-urlencoded


const apiRouter = express.Router()
const v1 = express.Router()

app.use('/api', apiRouter)
apiRouter.use('/v1', v1)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})


app.get('/play', (req, res) => {
  res.render('play')
})

v1.post("/register", (req, res) => {

  const { username, password } = req.body
  const data = fs.readFileSync('data/data.json') // disini data masih bentuk string
  const parsedData = JSON.parse(data)
  const newUser = {
    id: uuidv4(),
    username,
    password
  }
  parsedData.push(newUser)
  fs.writeFileSync('data/data.json', JSON.stringify(parsedData, null, 2))
  res.status(201)
  console.log(newUser, 'new user created')
  res.redirect('/play')
})

v1.post("/login", (req, res) => {

  const { username, password } = req.body
  const data = fs.readFileSync('data/data.json', "utf-8") // disini data masih bentuk string
  const parsedData = JSON.parse(data)
  console.log(parsedData)
  console.log(username)
  const checkUser = parsedData.find((user) => user.username == username);
  console.log(checkUser)
  if(!checkUser){
    res.status(401)
    res.redirect('/login')
    console.log('Username tidak ditemukan')
  }else if (checkUser.password == password){
    res.status(200)
    res.redirect('/play')
    console.log('Berhasil Masuk')
  }else{
    res.status(401)
    res.redirect('/login')
    console.log('Password salah')
    alert("Password anda salah")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})