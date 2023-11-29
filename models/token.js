import { Sequelize } from "sequelize";
import db from "../config/db.js"

const Token = db.define('Token', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    cpf_proprietario: {
        type: Sequelize.STRING(11),
        allowNull: false
    },
}, {  
    timestamps: false,
    freezeTableName: true 
});

export default Token;
