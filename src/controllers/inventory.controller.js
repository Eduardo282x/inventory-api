import { getConnection } from '../database/database';
import XlsxPopulate from 'xlsx-populate';
import fs from 'fs';

const tableName = 'invetory';

const getInventory = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM ${tableName}`);
        res.json({ response: result });
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const queryAdd = `INSERT INTO ${tableName} (Code, Description, Axis, Aloj, Height, Amount, Price)`
const addArticleInventory = async (req, res) => {
    try {
        const { Code, Description, Axis, Aloj, Height, Amount, Price, } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`${queryAdd} VALUES ('${Code}','${Description}','${Axis}','${Aloj}','${Height}','${Amount}','${Price}')`);
        res.json({ success: true, message: 'Articulo agregado.' });
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const editArticleInventory = async (req, res) => {
    try {
        const connection = await getConnection();
        const { Code, Description, Axis, Aloj, Height, Amount, Price, IdCode, } = req.body;
        const result = await connection.query(`UPDATE ${tableName} SET Code='${Code}',Description='${Description}',Axis='${Axis}',Aloj='${Aloj}',Height='${Height}',Amount='${Amount}',Price='${Price}' WHERE IdCode='${IdCode}'`);
        res.json({ success: true, message: 'Articulo editado.' });
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const setABC = (amount) => {
    if (amount > 200) return 'A';
    if (amount > 75) return 'B';
    return 'C';
}

const getInventoryABCExcel = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM ${tableName} order by Amount desc`);
        const parseResult = [];
        if (result && result.length > 0) {
            result.map(row => {
                parseResult.push([row.Code, row.Description, row.Amount, row.Price, setABC(row.Amount)])
            })
        }

        const workbook = await XlsxPopulate.fromBlankAsync();
        workbook.sheet(0).cell('A1').value('Codigo');
        workbook.sheet(0).cell('B1').value('Descripcion');
        workbook.sheet(0).cell('C1').value('Cantidad');
        workbook.sheet(0).cell('D1').value('Precio');
        workbook.sheet(0).cell('E1').value('Clasificacion ABC');
        workbook.sheet(0).cell('A2').value(parseResult);
        workbook.toFileAsync('./InventarioABC.xlsx')

        try {
            const filePath = './InventarioABC.xlsx';
            const fileBuffer = await fs.promises.readFile(filePath);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=InventarioABC.xlsx`);
            res.send(fileBuffer);
        } catch (err) {
            res.json({message: 'Ha ocurrido un error inesperado.'})
        }


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
    getInventoryABCExcel,
};