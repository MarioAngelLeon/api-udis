import { Model, DataTypes } from 'sequelize';
import { DBConnection } from '../commons';


class UDI extends Model {}

UDI.init({
    
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true, 
        primaryKey: true, 
    }
    ,
    is_active:{
        type: DataTypes.TINYINT,
        allowNull:false,
        defaultValue: 1,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    dato: {
        type: DataTypes.STRING,
        allowNull: false, 
        defaultValue: 'N/A'
    }

}, {
    // Options
    sequelize: DBConnection,
    modelName: 'udis',
    
});

module.exports =  UDI;