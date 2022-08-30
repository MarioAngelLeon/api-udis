import axios from 'axios';

const BASE_URL = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP68257/datos/';

const UDIService = (initDate = '2022-01-01', endDate='2022-05-20') =>{
    try{
        
        const config = {
            headers: {
                'Bmx-Token' : 'cdd45065175b050725f7bd8b0ee3744144741b851a25f335d4461e9da47c29f6'
            }
        }
        
        const url = BASE_URL + `${initDate}/${endDate}`
        
        return axios.get(url, config);
    }catch(error){
        console.error('Error trying to build UDIService', error);
    }
}

module.exports = { UDIService };