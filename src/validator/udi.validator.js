import { Validator } from "jsonschema";


const validator = new Validator();

const dateSchema = {
    type: 'string',
    format: 'date',
    required: true
}


validator.addSchema( dateSchema );

module.exports = { validator, dateSchema }

