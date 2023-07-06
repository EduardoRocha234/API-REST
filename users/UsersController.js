const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs')
const crypPassword = require('./genHashFunc')
const jwt = require('jsonwebtoken') // gerar token

const JWTSecret = 'saoseiscachorrosedoisgatos' // chave sercreta que só o desenvolvedor pode saber

router.post("/user/create", (req, res) => {
    const { name, email } = req.body
    const password = crypPassword(req.body.password);
  
    User.findOne({
      where: {
        email,
      },
    }).then((user) => {
        // verifica se não encontra nenhum email no banco, se não houver ai sim o usuario é criado
        console.log(user)
        if (user === null) {
        User.create({
            name,
            email,
            password
        })
          .then(() => {
            res.sendStatus(200)
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(400)
          });
      } else {
        res.sendStatus(400)
      }
    });
});

router.post('/auth', (req, res) => {
  const { email, password } = req.body;

    User.findOne({where: { email }}).then((user) => {

        if(user != null) {
            const isCorrect = bcrypt.compareSync(password, user.password)

            if(isCorrect) {
              // gerarando o token
              jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'}, (err, token) => {
                if(err) {
                  res.status(400).json({errorIn: "Erro ao gerar o token"})
                } else {
                  res.status(200).json({token})
                }
              })

            } else {
                res.status(401).json({err: 'Credenciais Invalidas'})
            }

        } else {
            res.status(400).json({err: 'O E-mail enviado é inválido'})
        }
    })
})

module.exports = router