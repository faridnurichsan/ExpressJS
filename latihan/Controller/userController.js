import e from 'express';
import models from '../models/init-models';

const UpdateUser = async (req, res) => {
    await models.users.update({
        first_name: req.body.first_name
    },{
        where: {
            user_id: req.params.id
        }
    }).then(result =>{
        return res.send(result)
    })
}
const GetAll = async (req, res) => {
    await models.users.findAll(

    ).then(result =>{
        return res.send(result)
    })
}

export default {UpdateUser, GetAll};