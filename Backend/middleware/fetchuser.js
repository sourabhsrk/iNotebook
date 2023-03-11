const jwt = require('jsonwebtoken');
const JWT_SECRET = "beinghuman";

const fetchuser = (req,res,next) => {
    // get the user from jwt token and add id into to req object
    // take token from header
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token"});
    }
    // takeout data string from token
    try{
        const str = jwt.verify(token,JWT_SECRET);
        req.user = str.user;
        next();
    } catch(error){
        res.status(401).send({error: "please authenticate using a valid token"});
    }
}

module.exports = fetchuser;