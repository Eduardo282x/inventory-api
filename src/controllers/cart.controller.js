import { getConnection }  from '../database/database'

const tableName = 'cartinventory'
const queryUser = `SELECT cartinventory.IdCart, invetory.Description, cartinventory.Amount, invetory.Price, cartinventory.Amount * invetory.Price as Total FROM ${tableName} join invetory on cartinventory.IdCode = invetory.IdCode`;
const getCarts = async (req, res) =>{
    try {
        const {IdSheller} = req.query;
        const connection = await getConnection();
        const result = await connection.query(`${queryUser} where IdSheller = '${IdSheller}'`);
        res.json({response: result});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}


const queryAdd = `INSERT INTO ${tableName} (IdCode, IdSheller, Amount) VALUES `
const addCarts = async (req, res) =>{
    try {
        const {Code, Description, Axis, Aloj, Height, Amount, Price, IdCode, IdSheller} = req.body;
        const connection = await getConnection();
        const result = await connection.query(`${queryAdd} ('${IdCode}', '${IdSheller}', '${Amount}')`);
        res.json({message: 'Articulo agregado al carrito.', success: true});
    }
    catch (err) {
        res.status(500);
        res.send(err.message);
    }
}

const editCart = async (req, res) =>{
    try {
        const { IdCart, Amount, Description } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`UPDATE ${tableName} SET Amount='${Amount}' where IdCart= '${IdCart}'`);
        res.json({success: true, message: 'Pedido modificado.'});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

const deleteCart = async (req, res) =>{
    try {
        const { IdCart } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`DELETE FROM ${tableName} where IdCart = '${IdCart}'`);
        res.json({success: true, message: 'Articulo eliminado del carrito.'});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}

export const methods = {
    getCarts,
    addCarts,
    editCart,
    deleteCart
};