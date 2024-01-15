import mysql from "promise-mysql";
import config from "../config";

const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
});

const getConnection = () => {
    return connection;
};

const endConnection = () => {
    return connection.end();
};

module.exports = {
    getConnection
};
