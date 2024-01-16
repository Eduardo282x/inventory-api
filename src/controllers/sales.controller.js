import { getConnection }  from '../database/database'

const tableName = 'sales';
const tableNameDetail = 'salesdetails';
const tableNameCart = 'cartinventory';
const tableNameInventory = 'invetory';

const getSale = async (req, res) =>{
    const querySale = `SELECT sales.IdSales, users_2.Name, sales.Total, sales.DateSale FROM ${tableName} join users_2 on sales.IdSheller = users_2.Id `;
    try {
        const connection = await getConnection();
        const {start, end } = req.body;
        const result = await connection.query(`${querySale} WHERE DateSale BETWEEN '${start}' and '${end}'`);
        res.json({response: result});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

const getDetails = async (req, res) =>{
    const queryDetails = `SELECT invetory.Description, salesdetails.CodInventory, salesdetails.Amount, salesdetails.Price, salesdetails.Total FROM ${tableNameDetail} join ${tableNameInventory} on salesdetails.IdInventory = invetory.IdCode`;
    try {
        const connection = await getConnection();
        const {IdSales} = req.query;
        const result = await connection.query(`${queryDetails} WHERE salesdetails.IdSales ='${IdSales }'`);
        res.json({response: result});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

const addSale = async (req, res) =>{
    const queryAdd = `INSERT INTO ${tableName} (IdSheller, Total, DateSale) VALUES `
    try {
        const {total, idSheller, details } = req.body;
        const date = new Date();
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().split('T')[0];

        const connection = await getConnection();
        const result = await connection.query(`${queryAdd} ('${idSheller}', '${total}', '${formattedDate}')`);
        await addDetails(details);
        await updateInventory(details);
        await deletDetailsCart(idSheller);
        res.json({message: 'Pedido realizado.', success: true});
    }
    catch (err) {
        res.status(500);
        res.send(err.message);
    }
}

const addDetails = async (details) =>{
    const queryAddDetail = `INSERT INTO ${tableNameDetail} (IdSales, IdInventory, CodInventory, Amount, Price, Total) VALUES `
    const queryGetLastSale = `SELECT idsales FROM ${tableName} order by IdSales desc limit 1`;
    try {
        const connection = await getConnection();
        const getIdSale = await connection.query(queryGetLastSale);
        let insertDetail = '';

        details.map(det => {
            insertDetail += `('${getIdSale[0].idsales}', '${det.IdCode}', '${det.Code}', '${det.Amount}', '${det.Price}', '${det.Total}'),`
        })
        insertDetail = insertDetail.substring(0, insertDetail.length - 1);
        const result = await connection.query(queryAddDetail + insertDetail);
        const detailr = {
            query: queryAddDetail + insertDetail
        }
        console.log(detailr);
    }
    catch (err) {
        res.status(500);
        res.send(err.message);
        console.log(err.message);
    }
}

const updateInventory = async (details) =>{
    const queryGetInventory = `SELECT * FROM  ${tableNameInventory} WHERE IdCode = `
    const queryUpdateInventory = `UPDATE ${tableNameInventory} SET`
    try {
        const connection = await getConnection();
        details.map(async det => {
            const getArticle = await connection.query(`${queryGetInventory} '${det.IdCode}'`);
            const subtraction = getArticle[0].Amount - det.Amount;
            const updateArticle = await connection.query(`${queryUpdateInventory} Amount = '${subtraction}' WHERE IdCode = '${det.IdCode}'`);
        })
    }
    catch (err) {
        res.status(500);
        res.send(err.message);
        console.log(err.message);
    }
}

const deletDetailsCart = async (idSheller) =>{
    const queryDeleteDetail = `DELETE FROM ${tableNameCart} WHERE`
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
    getDetails,
    addSale,
};