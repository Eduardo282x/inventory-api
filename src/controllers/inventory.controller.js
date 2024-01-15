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

const queryAdd = `INSERT INTO ${tableName} (Code, Description, Axis, Aloj, Height, Amount, Price)`
const addArticleInventory = async (req, res) =>{
    try {
        const { Code, Description, Axis, Aloj, Height, Amount, Price, }= req.body;
        const connection = await getConnection();
        const result = await connection.query(`${queryAdd} VALUES ('${Code}','${Description}','${Axis}','${Aloj}','${Height}','${Amount}','${Price}')`);
        res.json({success: true, message: 'Articulo agregado.'});
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const editArticleInventory = async (req, res) =>{
    try {
        const connection = await getConnection();
        const {Code, Description, Axis, Aloj, Height, Amount, Price, IdCode,} = req.body;
        const result = await connection.query(`UPDATE ${tableName} SET Code='${Code}',Description='${Description}',Axis='${Axis}',Aloj='${Aloj}',Height='${Height}',Amount='${Amount}',Price='${Price}' WHERE IdCode='${IdCode}'`);
        res.json({success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

export const methods = {
    getInventory,
    addArticleInventory,
    editArticleInventory,
};