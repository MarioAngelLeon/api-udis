import { Model, DataTypes} from 'sequelize';
import { DBConnection } from '../commons';

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