const express = require('express')
const status = require('./status')
const controller = require('./controller')
const { port, rewardAccount } = require('./config')
const { version } = require('../package.json')
const { isAddress } = require('web3-utils')
const { setup } = require('./relayer')

const app = express()
app.use(express.json())

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Log error to console but don't send it to the client to avoid leaking data
app.use((err, req, res, next) => {
  if (err) {
    console.error(err)
    return res.sendStatus(500)
  }
  next()
})

setup().then(()=>{
  app.get('/', status.status)
  app.get('/status', status.status)
  app.get('/fees', status.fees)
  app.post('/hash', controller.pedersen)
  app.post('/relay', controller.withdraw)
  
  app.listen(port)
  console.log(`Relayer ${version} started on port ${port}`)  

}).catch((err)=>{
  console.log(err)
  process.exit(1)
})
