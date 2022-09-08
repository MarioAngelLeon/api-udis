import { validator, dateSchema } from '../validator/udi.validator';


export const validateDateMiddleware = (req, res, next) =>{
    try{

        const { date } = req.params;
        
        const validationResult = validator.validate( date, dateSchema );

        const { errors } = validationResult;

        if(errors.length != 0 ){
            return res.status(400).json({
                msg: `Bad request ${ errors[0]  }`
            })
        }

        next();
    }catch(e){
        res.status(500).json({ msg: 'Error'});
    }
}
