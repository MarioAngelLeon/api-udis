class Response{

    createdResponse( res, data ){

        let dataresponse =  data || { msg: 'Created ' };
        res.status(201).json( dataresponse );

    }

    internalServerErrorResponse( res, data){
        
        res.status(500).json( data );

    }

    notFoundExceptionResponse( res, data ){

        let responseNotFound = data || { msg: 'Not Found'}
        res.status(404).json( responseNotFound );

    }

}

module.exports = { Response };