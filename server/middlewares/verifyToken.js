const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(401).send({ message : "Unauthorized Acess"})
    }
    const token = req.headers.authorization.spit(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err,decode) => {
        if(err){
            return res.status(401).send({ message : "Unauthorized Acess"})
        }
        req.decode = decode;
        next()
    })
}

module.exports = verifyToken;