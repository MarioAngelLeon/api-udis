const { request, response } = require('express');

const { UDIService } = require('../services/banxico.service');
const { getDayFromMoment, dateIntervals, formatData } = require('../commons');
const { getUDIByDate, saveBulkUDIS, deleteUDISPeriods} = require('../dao/udi.dao');
const { LOG } = require('../commons/logger');

const udisCreate = async ( req = request, res = response) =>{
    
    try{
        
        LOG.debug('Entrando al controlador');
        const day = getDayFromMoment();
     
        const { initPeriod, endPeriod } = dateIntervals( day ); 
        LOG.debug('Entrando al servicio');
        const response = await UDIService(initPeriod, endPeriod);
        LOG.debug('Terminando consulta de servicio - Empieza desestructuración de respuesta')
        const data = response?.data;
        const { bmx } = data;
        const { series } = bmx;

        const { datos } = series[0];
        LOG.debug('Termina desestructuración de respuesta del servicio');

        LOG.debug('------------------------------------------------------');
        
        LOG.debug('Inicia borrado de registros existentes para el periodo');
        //Eliminamos registros en el periodo para que no se dupliquen
        await deleteUDISPeriods(initPeriod, endPeriod);
        LOG.debug('Termina borrado de registros existentes para el periodo');

        LOG.debug('Inicia guardado de registros existentes para el periodo');
        //Insertamos todos los registros obtenidos y formateados desde banxico, 
        //con bulkCreate, llamado desde el dao
        const bulkData = formatData( datos );
        await saveBulkUDIS( bulkData );
        LOG.debug('Termina guardado de registros existentes para el periodo');
        
        LOG.debug('Terminó todo el proceso en el controlador');
        res.status(201).json({
            msg: 'UDIS created succesfully',
            from: initPeriod,
            to: endPeriod
        });
        
    }catch(error){
    
        LOG.debug('Ocurrió un error ', error);
        res.status(500).json({
            status: 500,
            msg: 'Error con la aplicación, contacte al administrador',
        });
        
    }

}

const udisGet = async (req = request, res = response) =>{

    try{

        const { date } = req.params;
        
        if( !date ){
            return res.status(400).json({
                msg: 'No date provided'
            })
        }


        const udi = await getUDIByDate( date );
        

        if(!udi){
            return res.status(404).json({
                msg:'UDI not found',
            })
        }

        res.status(200).json({
            msg: 'OK',
            data: udi,
        });

    }catch(e){

        console.error('Error in udis.controller.js file in udisGet ', e);
        res.status(500).json({
            status: 500,
            msg: 'Error con la aplicación, contacte al administrador',
        });
        
    }

}

module.exports = { udisCreate, udisGet }