
import { response } from 'express';

class Response{

    constructor(){}

    createdResponse( res = response, data ){

        let dataresponse =  data || { msg: 'Created ' };
        res.status(201).json( dataresponse );

    }

    internalServerErrorResponse( res = response, data){
        
        res.status(500).json( data );

    }

    notFoundExceptionResponse( res = response, data ){

        let responseNotFound = data || { msg: 'Not Found'}
        res.status(404).json( responseNotFound );

    }

}

module.exports = { Response };