import { validator, dateSchema } from '../validator/udi.validator';
import {  Response } from '../commons/response';

const response = new Response();

const { badRequestException, internalServerErrorResponse } = response;

export const validateDateMiddleware = (req, res, next) =>{

    try{

        const { date } = req.params;
        
        const validationResult = validator.validate( date, dateSchema );

        const { errors } = validationResult;

        if(errors.length != 0 ){
            return badRequestException( res, errors);
        }

        next();
    }catch(e){
        
        internalServerErrorResponse( res, e);

    }

}
