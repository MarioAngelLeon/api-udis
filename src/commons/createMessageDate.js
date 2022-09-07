import moment from "moment";
import { LOG } from '../commons/logger';

export const createMessageDate  = ( dateFounded, dateSearch ) =>{

    let message = {};
    let msg = '';

    LOG.debug('Inicia mensajero');

    let notFoundAction = false;
    LOG.debug(dateFounded);

    

    const foundDate = moment( new Date( dateFounded || '1990-09-12' ));
    const searchDate = moment( new Date( dateSearch ) );
    

    LOG.debug( `Date founded ${ foundDate }`);
    LOG.debug(`Searched Date ${ searchDate }`);

    if (foundDate.isSame(searchDate)) {

        msg = "Udi por fecha encontrada exitosamente";

    } else if ( foundDate < searchDate ) {
        LOG.debug(`Found date: ${foundDate}`)
        msg = "Udi por fecha más cercana";
    
    } else if (foundDate > searchDate) {
    
        notFoundAction = true;
        
        message = {
            msg: "No se encontro el valor para la fecha solicitada",
            date: dateSearch,
        };

    }

      return notFoundAction ? message : msg;
}