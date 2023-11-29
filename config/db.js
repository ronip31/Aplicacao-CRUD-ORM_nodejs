// db.js
import { createPool } from 'mysql2';
import { Sequelize } from 'sequelize';


const pool = createPool({
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'appveiculo',
    port: 3306, // ou a porta que você está usando
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 2
});

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root', // Alterado de 'user' para 'username' de acordo com a documentação do Sequelize
    password: 'root',
    database: 'appveiculo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export { sequelize };
