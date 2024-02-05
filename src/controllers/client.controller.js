import { getConnection }  from '../database/database'

const tableName = 'users_2'

const getClients = async (req, res) =>{
    const queryClient = `SELECT * FROM ${tableName}`;
    try {
        const connection = await getConnection();
        const result = await connection.query(`${queryClient} where Rol = 3`);
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


const addClient = async (req, res) =>{
    const queryAdd = `INSERT INTO ${tableName} (Name, Lastname, Email, Phone, Identify, Address, Rol) VALUES `
    try {
        const { Name, Lastname, Email, Phone, Identify, Address } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`${queryAdd} ('${Name}', '${Lastname}','${Email}', '${Phone}', '${Identify}', '${Address}' , 3)`);
        res.json({success: true, message: 'Cliente agregado.'});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

const editClient = async (req, res) =>{
    try {
        const { Id, Name, Lastname, Email, Phone, Identify, Address} = req.body;
        const connection = await getConnection();
        const result = await connection.query(`UPDATE ${tableName} SET Name='${Name}',Lastname='${Lastname}',Email='${Email}',Phone='${Phone}',Identify='${Identify}',Address='${Address}' where Id= '${Id}'`);
        res.json({success: true, message: 'Cliente editado.'});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

const deleteClient = async (req, res) =>{
    const queryDelete = `DELETE FROM ${tableName}`
    try {
        const { Id } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`${queryDelete} WHERE Id = ${Id}`);
        res.json({success: true, message: 'Cliente eliminado.'});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

export const methods = {
    getClients,
    addClient,
    editClient,
    deleteClient
};