import moment from 'moment';
import { udiAdapter } from '../dto/udi.adapter';

const formatData = ( data ) =>{

    return data.map( x => udiAdapter(moment(x.fecha, 'DD-MM-YYYY').format('YYYY-MM-DD'), x.dato) );

}

module.exports = { formatData }