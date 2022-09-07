import { request, response } from 'express';
import { UDIService } from '../services/banxico.service';
import { getDayFromMoment, dateIntervals, formatData, createMessageDate } from '../commons';
import { getUDIByDate, saveBulkUDIS, deleteUDISPeriods } from '../dao/udi.dao';
import { LOG } from '../commons/logger';
import { Response } from '../commons/response';


const customResponse = new Response();

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
        
        customResponse.createdResponse(res, {
            msg: 'UDIS created succesfully',
            from: initPeriod,
            to: endPeriod
        });
    }catch(error){
    
        LOG.debug('*********************');
        LOG.debug('Inicia handler error');

        LOG.error(`message error: ${ error }`);

        let data = {
            status: 500,
            msg: 'Error con la aplicación, contacte al administrador',
        };

        customResponse.internalServerErrorResponse( res, data );
        
        LOG.debug('Termina handler error');
        LOG.debug('*********************');
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

        let udi = await getUDIByDate( date );
        
        const dateFounded = udi?.date;
        
        
        const msg = createMessageDate( dateFounded, date);

        if(!udi){
            return res.status(404).json({
                msg:'UDI not found',
            })
        }

        res.status(200).json({
            msg: 'OK',
            data: udi,
            msg2: msg
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