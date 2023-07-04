const express = require('express');
const app = express();
const connection = require('./database/database');
const Game = require('./database/Game');
const cors = require('cors')

app.use(cors())
// db
connection
    .authenticate()
    .then(() => console.log('Banco conectado'))
    .catch(err => console.log(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/games', (req, res) => {
    req.statusCode = 200
    Game.findAll({order: [['id', 'DESC']]})
        .then(games => {
            res.json(games)
        })
})

app.get('/game/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        Game.findByPk(id)
            .then(game => {
                if(game != null || game != undefined) {
                    res.statusCode = 200
                    res.json(game) 
                } else {
                    res.sendStatus(404)
                }
            })
            .catch(err => {
                res.sendStatus(404)
            })
    }
})

app.post('/game', (req, res) => {
    const { title, price, year} = req.body
    Game.create({
        title,
        price,
        year
    })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
})

app.delete('/game/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        Game.destroy({ 
            where: {id}
         })
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(404))
    }
})

app.put('/game/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        const { title, price, year} = req.body
        Game.update(
            {
                title,
                price, 
                year
            },
            {
                where: { id }
            }
        ).then(() => res.sendStatus(200))
        .catch(err => res.sendStatus(404))
    }
})

app.listen(8080, () => {
    console.log('API RODANDO')
})