import { DataType } from 'sequelize-typescript'
import { SequelizeInstance } from './db'
import { typeRole } from './interfaces/enumRole'

const user = SequelizeInstance.define('user', {
    id:{
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login:{
        type: DataType.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    role: {
        type: DataType.STRING,
        defaultValue: typeRole.user
    },
})


export {user}