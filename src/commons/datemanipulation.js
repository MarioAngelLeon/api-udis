import moment from 'moment';
import { TZ } from './constants';

const getDayFromMoment = () =>{
    
    const date = moment().tz(TZ).format('YYYY/MM/DD');

    const splitedDate = date.split('/');
  
    const day = splitedDate[splitedDate.length - 1];

    return day ? parseInt(day) : 0;
}

const dateIntervals = ( day ) =>{
    
    let initPeriod;
    let endPeriod;

    if(day >= 10 && day < 25){

        initPeriod = day === 10 ? moment().tz( TZ ).add(1,'days').format('YYYY-MM-DD') : moment().set('date', 10).format('YYYY-MM-DD');
        endPeriod = moment(initPeriod,'YYYY-MM-DD').tz( TZ ).add(15, 'days').format('YYYY-MM-DD');

    }else{

        if( day === 25 ){

            initPeriod = moment().tz( TZ ).add(1,'days').format('YYYY-MM-DD');

        }else{

            if(day < 10){
                
                initPeriod  = moment().tz( TZ ).subtract(1,'month').set('date', 26).format('YYYY-MM-DD');
                
            }else{
                
                initPeriod = moment().tz( TZ ).set('date', 26).format('YYYY-MM-DD');

            }

            endPeriod = moment(initPeriod, 'YYYY-MM-DD').tz( TZ ).add(1, 'month').set('date', 10).format('YYYY-MM-DD');

        }
        
        
    }

    return { initPeriod, endPeriod }
}

module.exports = { getDayFromMoment, dateIntervals }