import { getConnection }  from '../database/database'

const tableName = 'sales'
const tableNameDetail = 'sales'
const tableNameCart = 'cartinventory'

const querySale = `SELECT * from ${tableName}`;
const getSale = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query(`${querySale}`);
        res.json({response: result});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}


const queryAdd = `INSERT INTO ${tableName} (IdSheller, Total, DateSale) VALUES `
const addSale = async (req, res) =>{
    try {
        const {total, idSheller, details } = req.body;
        const date = new Date().toISOString().split('T')[0];
        const connection = await getConnection();
        const result = await connection.query(`${queryAdd} ('${idSheller}', '${total}', '${date}')`);
        res.json({message: 'Pedido realizado.', success: true});
        await addDetails(details);
        // await deletDetailsCart(idSheller);
    }
    catch (err) {
        res.status(500);
        res.send(err.message);
    }
}

const queryAddDetail = `INSERT INTO ${tableNameDetail} (IdSales, IdInventory, CodInventory, Amount, Price, Total) VALUES `
const queryGetLastSale = `SELECT idsales FROM ${tableName} order by IdSales desc limit 1`;
const addDetails = async (details) =>{
    try {
        const connection = await getConnection();
        console.log(details);
        const getIdSale = await connection.query(queryGetLastSale);
        let insertDetail = '';

        details.map(det => {
            insertDetail += `('${getIdSale}', '${det.IdCode}', '${det.Code}', '${det.Amount}', '${det.Price}', '${det.Total}',),`
        })
        // const result = await connection.query(`${queryAddDetail} ${insertDetail}`);
        const detailr = {
            detail: insertDetail,
            query: queryAddDetail + insertDetail
        }
        console.log(detailr);
    }
    catch (err) {
        res.status(500);
        res.send(err.message);
    }
}

const queryDeleteDetail = `DELETE FROM ${tableNameCart} WHERE`
const deletDetailsCart = async (idSheller) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query(`${queryDeleteDetail} IdSheller = '${idSheller}'`);
    }
    catch (err) {
        res.status(500);
        res.send(err.message);
    }
}


export const methods = {
    getSale,
    addSale,
};