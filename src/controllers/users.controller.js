import { getConnection }  from '../database/database'

const tableName = 'users_2'

const queryUser = `SELECT * FROM ${tableName}`;
const getUsers = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query(`${queryUser} where Rol != 1`);
        if(result.length > 0){
            try{
                res.json({success: true, response: result});
            }
            catch(ex){
                console.log(ex);
            }
        } else {
            res.json({success: false});
        }
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}


const queryAdd = `INSERT INTO ${tableName} (Name, Lastname, Username, Email, Phone, Identify, Rol) VALUES `
const addUsers = async (req, res) =>{
    try {
        const { Name, Lastname, Email, Phone, Identify, } = req.body;
        const username = Name + Identify.toString().substr(0,2);
        const connection = await getConnection();
        const result = await connection.query(`${queryAdd} ('${Name}', '${Lastname}', '${username}', '${Email}', '${Phone}', '${Identify}' , 2)`);
        res.json({success: true});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

const editUsers = async (req, res) =>{
    try {
        const { Id, Name, Lastname, Email, Phone, Identify, } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`UPDATE ${tableName} SET Name='${Name}',Lastname='${Lastname}',Email='${Email}',Phone='${Phone}',Identify='${Identify}' where Id= '${Id}'`);
        res.json({success: true});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

const queryDelete = `DELETE FROM ${tableName}`
const deleteUsers = async (req, res) =>{
    try {
        const { Id } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`${queryDelete} WHERE Id = ${Id}`);
        res.json({success: true});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

export const methods = {
    getUsers,
    addUsers,
    editUsers,
    deleteUsers
};