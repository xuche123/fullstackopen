import express from 'express'

const app = express()
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
