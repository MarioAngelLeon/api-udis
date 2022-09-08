import moment from 'moment';
import { Op } from 'sequelize';
import { UDI } from '../models';

const saveBulkUDIS = async ( udis = [] ) =>{
    
    const udisSaved = await UDI.bulkCreate( udis );
    
    return udisSaved;
}

const deleteUDISPeriods = async ( initPeriod = '2022-08-10', endPeriod = '2022-08-25') =>{

    const deletedUdis = await UDI.destroy({ where: { 
        date: 
        {
           [Op.between]: [ moment(initPeriod), moment(endPeriod) ]
        }
    }});

    return deletedUdis;
}

const getUDIByDate = async ( dateParam ) =>{

    let udi = await UDI.findOne({ where: { date: moment(dateParam) } });
    
    if( !udi ){

        udi = await UDI.findAll({ limit: 1, order: [['date', 'DESC']] });
        if(udi[0]){
            udi = udi[0];
        }

    }
    
    return udi;
}

module.exports = { saveBulkUDIS, deleteUDISPeriods, getUDIByDate }