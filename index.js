const express = require('express');
const app = express();
const connection = require('./database/database');
const Game = require('./database/Game');
const cors = require('cors')
const auth = require('./users/midleware')

const usersController = require('./users/UsersController')
const User = require('./users/User');

app.use(cors())
// db
connection
    .authenticate()
    .then(() => console.log('Banco conectado'))
    .catch(err => console.log(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', usersController)

app.get('/games', auth, (req, res) => {
    const HATEOAS = [
        {
            href: "http://localhost:8080/game/0",
            method: 'DELETE',
            rel: "delete_game",
        },
        {
            href: "http://localhost:8080/game/0",
            method: 'GET',
            rel: "get_game",
        },
        {
            href: "http://localhost:8080/auth",
            method: 'POST',
            rel: "login",
        },
    ]
    req.statusCode = 200
    Game.findAll()
        .then(games => {
            res.json({games, _links: HATEOAS})
        })
})

app.get('/game/:id', auth, (req, res) => {
    const id = parseInt(req.params.id)

    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        const HATEOAS = [
            {
                href: `http://localhost:8080/game/${id}`,
                method: 'DELETE',
                rel: "delete_game",
            },
            {
                href: `http://localhost:8080/game/${id}`,
                method: 'PUT',
                rel: "edit_game",
            },
            {
                href: `http://localhost:8080/game/${id}`,
                method: 'GET',
                rel: "get_game",
            },
            {
                href: `http://localhost:8080/games`,
                method: 'GET',
                rel: "get_all_games",
            },
        ]

        Game.findByPk(id)
            .then(game => {
                if(game != null || game != undefined) {
                    res.statusCode = 200
                    res.json({game, _links: HATEOAS}) 
                } else {
                    res.sendStatus(404)
                }
            })
            .catch(err => {
                res.sendStatus(404)
            })
    }
})

app.post('/game', auth, (req, res) => {
    const { title, price, year} = req.body

    Game.create({
        title,
        price,
        year
    })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
})

app.delete('/game/:id', auth, (req, res) => {
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

app.put('/game/:id', auth, (req, res) => {
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