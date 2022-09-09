import _ from 'lodash';
import { CODE_CREATED, CODE_INTERNAL_SERVER_ERROR, CODE_BAD_REQUEST, CODE_SUCCESS } from './constants';
import { MESSAGES } from './messages';

export class Response{

    createdResponse( res, data ){

        let info = null;
        let dataresponse =  data || { msg: 'Created ' };

        if(CODE_CREATED){
            const { template: status, description: message } = _.get( MESSAGES,CODE_CREATED );
            info = {status, CODE_CREATED, message };
        }
        
        dataresponse = info ?  {  ...info, ...dataresponse} : dataresponse;
        res.status(201).json( dataresponse );

    }

    internalServerErrorResponse( res, error){
    
        let info = null;

        const { message } = error;

        const { template, description } = _.get( MESSAGES, CODE_INTERNAL_SERVER_ERROR );
        
        const compiled = _.template( template );
        
        info = {
            
            statusCode: CODE_INTERNAL_SERVER_ERROR,
            message: compiled({ text: message }),
            description: description
            
        };
        

        res.status(500).json( info );

    }

    notFoundExceptionResponse( res, data ){

        let responseNotFound = data || { msg: 'Not Found'}
        res.status(404).json( responseNotFound );

    }

    badRequestException( res, errors ){

       let info = null;
       
        const {  template, description } = _.get( MESSAGES, CODE_BAD_REQUEST);

        const compiled = _.template( template );
        
        info = {
            
            statusCode: CODE_BAD_REQUEST,
            message: compiled({ text: 'Bad request' }),
            description: description
            
        };

        res.status(400).json(info);
        
    }

    OkResponse( res, data ){
        let info = null;
       
        const {  template, description } = _.get( MESSAGES, CODE_SUCCESS);

        const compiled = _.template( template );
        
        info = {
            
            statusCode: CODE_SUCCESS,
            message: compiled({ text: 'Bad request' }),
            description: description
            
        };

        res.status(200).json(info);
    }

}
