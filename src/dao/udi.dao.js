const moment = require('moment');
const { Op } = require('sequelize');

const { UDI } = require('../models');



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

const getUDIByDate = async ( date ) =>{
    const udi = await UDI.findOne({ where: { fecha: moment(date,'YYYY-MM-DD')} });
    
    return udi;
}

module.exports = { saveBulkUDIS, deleteUDISPeriods, getUDIByDate }