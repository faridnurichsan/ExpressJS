import UserController from "../controller/UserController"
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";

const login = async (req, res,)=> {
    let body = req.body;
    await UserController.findByUsername(body.username).then(async items =>{
        if(items.username){
            if(await bcrypt.compare(body.password, items.password)){
                delete items.password;

                let token = jwt.sign(items,process.env.SECRET_KEY,{
                    expiresIn: '1m'
                })

                res.status(200).json({
                    message : 'Logged In',
                    token : token
            })}else{
                let result = "Incorrect Password";
                return res.status(403).json(result)
            }
        }else{
            let result = "User not Found";
            return res.status(403).json(result);
        }
    }).catch(err => {res.status(403).json(err)})
}

const checkToken = (req, res, next) =>{
    if(!req.headers.authorization){
        return res.statuts(403).json('you are not authorized')
    }else{
        let token = req.headers.authorization;
        try {
            jwt.verify(token,process.env.SECRET_KEY)
            return next();
        } catch (error) {
            return res.send('Invalid Token')
        }
    }
}

export default {
    login,
    checkToken
}