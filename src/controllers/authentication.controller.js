import { getConnection }  from '../database/database'

const tableName = 'users_2'
const queryAuthenticate = `SELECT users_2.Id, users_2.Name, users_2.Lastname, users_2.Email, users_2.Phone, users_2.Identify, Rol.RolName as Rol FROM ${tableName} join Rol on users_2.Rol = Rol.Id_Rol`
const authenticateUser = async (req, res) =>{
    try {
        const { Username, Password } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM ${tableName} WHERE Username='${Username}' and Password='${Password}'`);
        if(result.length > 0){
            try{
                const user = await connection.query(`${queryAuthenticate} where Id = ${result[0].Id}`)
                res.json({message:'Bienvenido', success: true, userData: user[0]});
            }
            catch(ex){
                console.log(ex);
            }
        } else {
            res.json({message:'Usuario no encontrado', success: false});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const changeDataUser = async (req, res) =>{
    try {
        const { Id, Password } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`UPDATE ${tableName} set Password = '${Password}' where Id=${Id}`);
        res.json({message:'Contraseña cambiada', success: true,});
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}



export const methods = {
    authenticateUser,
    changeDataUser,
};