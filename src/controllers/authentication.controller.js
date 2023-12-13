import { getConnection }  from '../database/database'
// import { Jwt } from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
// const secretKey = 'my_secret_key';

const authenticateUser = async (req, res) =>{
    try {
        const { Username, Password } = req.body;
        const User = { Username, Password}
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM users WHERE Username='${Username}' and Password='${Password}'`);
        // console.log(result);
        if(result.length > 0){
            // const parseJsonString = JSON.stringify(result[0])
            try{
                // const plainObject = JSON.parse(parseJsonString);
                // const token = jwt.sign(plainObject, secretKey, {
                //     expiresIn: '2m'
                // });
                res.json({message:'Bienvenido', success: true, userData: result[0]});
            }
            catch(ex){
                console.log(ex);
            }

        } else {
            res.json({message:'Usuario no encontrado', success: false});
        }
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

export const methods = {
    authenticateUser
};