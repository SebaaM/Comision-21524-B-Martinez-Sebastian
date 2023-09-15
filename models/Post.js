const { sequelize } = require ('../database')
const { DataTypes } = require ('sequelize') 


/*
    post : {
        id: Num,
        tituto: String,
        contenido: String,
        link_imagen: String,
        fecha_creacion: Date,
        autor: String,
        activo: Boolean,
    
        createdAt: Date,
        lastUpdate: Date,
    }

*/

const PostModel = sequelize.define('posts', {
    //Id
    titulo : {
        type: DataTypes.STRING,
        unique: true,
        required: true,
    } ,
    contenido : {
        type : DataTypes.STRING,
        unique: false,
        defaultValue: "Nuevo post...",
        required: false,
    },
    link_imagen : {
        type : DataTypes.STRING,
        required : false,
        defaultValue: "",
        unique: false,
    },
    fecha_creacion : {
        type: DataTypes.DATE,
        unique: false,
        required: false,
    },
    autor : {
        type: DataTypes.STRING,
        required: true,
        unique : false,

    },
    activo : {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        
    }
    // createdAt
    // lastUpdate

}) 

module.exports = { PostModel }


