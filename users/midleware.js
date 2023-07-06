const jwt = require('jsonwebtoken')
const JWTSecret = 'saoseiscachorrosedoisgatos' 

const auth = (req, res, next) =>  {
    const authToken = req.headers['authorization'];
    if(authToken != undefined) {
        // separando o tipo do token do token
        const bearer = authToken.split(' ')
        // pegando o token
        const token = bearer[1]

        //verificação do token
        jwt.verify(token, JWTSecret, (err, data) => {
            if(err) {
                res.status(401).json({err: "Token Inválido"})
            } else {
                req.token = token
                req.loggedUser = {id: data.id, email: data.email}
                next()
            }
        })
    } else {
        res.status(401).json({err: "Token Inválido!"})
    }
}

module.exports = auth