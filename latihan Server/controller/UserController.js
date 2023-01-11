import models, { sequelize } from "../models/init-models";
import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
    const result = await sequelize.query('select * from users',{
        type: sequelize.QueryTypes.SELECT,
        model: sequelize.models.User,
        mapToModel: true,
    });
    return res.status(200).json(result);
}

const CreateUser = async (req, res) =>{
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(req.body.password, salt);
    await models.users.create({
        first_name : req.body.fname,
        last_name : req.body.lname,
        username : req.body.username,
        password : passHash
    }).then(result =>{
        return res.send('Berhasil' + result)
    }).catch(err =>{
        return res.send('gagal' + err)
    })
}

const findByUsername = async (username) => {
    let result = await models.users.findOne({
        where : {
            username : username
        }
    }).catch(err => {
        return err
    });
    return result.toJSON();
}

export default {
    getUser,
    CreateUser,
    findByUsername
};