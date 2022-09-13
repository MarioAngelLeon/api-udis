import { request, response } from 'express';
import { UDIService } from '../services/banxico.service';
import { getDayFromMoment, dateIntervals, formatData, createMessageDate } from '../commons';
import { getUDIByDate, saveBulkUDIS, deleteUDISPeriods } from '../dao/udi.dao';
import { LOG } from '../commons/logger';
import { Response } from '../commons/response';



const customResponse = new Response();

const { createdResponse, internalServerErrorResponse, notFoundExceptionResponse, OkResponse } = customResponse;

const udisCreate = async ( req = request, res = response) =>{
    
    try{
        
        LOG.debug('Inicia guardado de udis \n');
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
        
        LOG.debug(`Inicia borrado de registros existentes para el periodo ${initPeriod} - ${endPeriod}`);
        //Eliminamos registros en el periodo para que no se dupliquen
        await deleteUDISPeriods(initPeriod, endPeriod);
        LOG.debug(`Termina borrado de registros existentes para el periodo ${initPeriod} - ${endPeriod}`);

        LOG.debug('------------------------------------------------------');

        LOG.debug(`Inicia guardado de registros existentes para el periodo ${initPeriod} - ${endPeriod}`);
        //Insertamos todos los registros obtenidos y formateados desde banxico, 
        //con bulkCreate, llamado desde el dao
        const bulkData = formatData( datos );
        await saveBulkUDIS( bulkData );
        LOG.debug(`Termina guardado de registros existentes para el periodo ${initPeriod} - ${endPeriod}`);
        
        LOG.debug('Terminó todo el proceso en el controlador');
        LOG.debug('Finaliza guardado de udis \n');
        
        createdResponse(res, {
            periodo: {
                from: initPeriod,
                to: endPeriod
            }
        });
    }catch(error){
    
        LOG.debug('*********************');
        LOG.debug('Inicia handler error');

        LOG.error(`message error: ${ error }`);

        internalServerErrorResponse(res, error);
        
        LOG.debug('Termina handler error');
        LOG.debug('*********************');
    }

}

const udisGet = async (req = request, res = response) =>{

    try{

        const { date } = req.params;
        
        let udi = await getUDIByDate( date );
        
        const dateFounded = udi?.date;
        
        
        const msg = createMessageDate( dateFounded, date);

        if( typeof msg === 'object' ){
            return notFoundExceptionResponse( res, msg );
        }


        const { date: fecha, dato} = udi;

        const responseData = { msg, fecha, dato };

        OkResponse( res, responseData);

    }catch(e){

        LOG.error(`Entrando handler error GET ${e.message}`);
        internalServerErrorResponse( res, e);
        LOG.error(`Finaliza handler error GET ${e.message}`);
        
    }

}

module.exports = { udisCreate, udisGet }