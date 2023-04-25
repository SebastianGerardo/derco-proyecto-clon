const express = require('express')
const path = require('path')
const { URLSearchParams } = require('url')

const app = express()

app.use(express.static('../dist'))


app.get('/*', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../dist/index.html'),
        err => console.error(err)
    )
})

app.listen(3000)