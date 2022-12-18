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

const employees = SequelizeInstance.define('employees',{
    id:{
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataType.STRING,
        allowNull: false   
    },
    jobTitle:{
        type: DataType.STRING,
        allowNull: true    
    },
    employmentDate:{
        type: DataType.DATE,
        allowNull: true     
    },
    dismissDate:{
        type: DataType.DATE,
        allowNull: true   
    },
    img:{
        type: DataType.STRING,
        allowNull: true
    },
    comment:{
        type: DataType.STRING,
        allowNull: true   
    }
})

const passwordStorage = SequelizeInstance.define('passwordStorage',{
    id:{
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login:{
        type: DataType.STRING,
        allowNull: true
    },
    password:{
        type: DataType.STRING,
        allowNull: false
    },
    comment:{
        type: DataType.STRING,
        allowNull: true
    },
    supplementKey:{
        type: DataType.STRING,
        allowNull: false
    }
})

const passwordGroup = SequelizeInstance.define('passwordGroup',{
    id:{
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'Personal'
    },
    icon:{
        type: DataType.STRING,
        allowNull: true
    },
    idOwner:{
        type: DataType.INTEGER,
        allowNull: true
    }
})

employees.hasMany(passwordStorage)
passwordStorage.belongsTo(employees)

services.hasMany(passwordStorage)
passwordStorage.belongsTo(services)

passwordGroup.hasMany(passwordStorage)
passwordStorage.belongsTo(passwordGroup)

export {user, services, employees, passwordStorage, passwordGroup}