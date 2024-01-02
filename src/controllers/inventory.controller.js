import { getConnection }  from '../database/database';

const tableName = 'invetory';

const getInventory = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM ${tableName}`);
        res.json({response: result});
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

export const methods = {
    getInventory,
};