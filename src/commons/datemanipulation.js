const moment = require('moment');

const getDayFromMoment = () =>{
    
    const date = moment().format('YYYY/MM/DD');

    const splitedDate = date.split('/');
  
    const day = splitedDate[splitedDate.length - 1];

    return day ? parseInt(day) : 0;
}

const dateIntervals = ( day ) =>{
    
    let initPeriod;
    let endPeriod;

    if(day >= 10 && day < 25){
        console.log('Entró')
        initPeriod = day === 10 ? moment().add(1,'days').format('YYYY-MM-DD') : moment().set('date', 10).format('YYYY-MM-DD');
        endPeriod = moment(initPeriod,'YYYY-MM-DD').add(15, 'days').format('YYYY-MM-DD');
    }else{
        initPeriod = day === 25 ?  moment().add(1,'days').format('YYYY-MM-DD') : moment().set('date', 26).format('YYYY-MM-DD');
        endPeriod = moment(initPeriod, 'YYYY-MM-DD').add(1, 'month').set('date', 10).format('YYYY-MM-DD');
    }

    return { initPeriod, endPeriod }
}

module.exports = { getDayFromMoment, dateIntervals }