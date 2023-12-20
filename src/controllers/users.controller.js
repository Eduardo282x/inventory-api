import { getConnection }  from '../database/database'

const getUsers = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM users`);
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

export const methods = {
    getUsers,
};