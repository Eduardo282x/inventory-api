import { getConnection }  from '../database/database'

const tableName = 'cartinventory'
const queryCart = `SELECT cartinventory.IdCart, invetory.Description, cartinventory.Amount, invetory.Amount as AmountMax, invetory.IdCode, invetory.Code, invetory.Price, cartinventory.Amount * invetory.Price as Total FROM ${tableName} join invetory on cartinventory.IdCode = invetory.IdCode`;
const getCarts = async (req, res) =>{
    try {
        const {IdSheller} = req.query;
        const connection = await getConnection();
        const result = await connection.query(`${queryCart} where IdSheller = '${IdSheller}'`);
        res.json({response: result});
    }
    catch (err) {
        res.status(500)
        res.send(err.message)
    }
}


const queryAdd = `INSERT INTO ${tableName} (IdCode, IdSheller, Amount) VALUES `
const queryExist = `SELECT * FROM  ${tableName} WHERE IdCode`
const addCarts = async (req, res) =>{
    try {
        const {Code, Description, Axis, Aloj, Height, Amount, Price, IdCode, IdSheller} = req.body;
        const connection = await getConnection();
        const exist = await connection.query(`${queryExist} = '${IdCode}'`);
        if(exist && exist.length> 0){
            res.json({message: 'El articulo ya esta en el carrito.', success: true});
            return
        }
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