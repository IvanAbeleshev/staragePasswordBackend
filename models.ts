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

const services = SequelizeInstance.define('services',{
    id:{
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    img:{
        type: DataType.STRING,
        allowNull: true
    },
    name:{
        type: DataType.STRING,
        allowNull: false
    },
    description:{
        type: DataType.STRING,
        allowNull: true
    }
})

export {user, services}