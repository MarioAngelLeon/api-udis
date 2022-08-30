const { Model, DataTypes } = require('sequelize');
const DBConnection = require('../commons/DBConnection');

class Error extends Model{}

Error.init({
    period: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
},{
    sequelize: DBConnection,
    modelName:'error'
});


module.exports = Error;