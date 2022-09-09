// Valores de Integracion

//Zona horaria
export const {
    env: { TZ = 'America/Mexico_City' }
} = process;


// Operation Status
export const CREATED = 'CREATED'
export const SUCCESS = 'SUCCESS'
export const NOT_FOUND = 'NOT FOUND'
export const BAD_REQUEST = 'BAD REQUEST'
export const CONFLICT = 'CONFLICT'
export const INTERNAL_SERVER_ERROR = 'INTERNAL SERVER ERROR'

// Operation Code
export const CODE_CREATED = 'NMP.CRD.201'
export const CODE_SUCCESS = 'NMP.CRD.200'
export const CODE_BAD_REQUEST = 'NMP.CRD.400'
export const CODE_NOT_FOUND = 'NMP.CRD.404'
export const CODE_CONFLICT = 'NMP.CRD.409'
export const CODE_INTERNAL_SERVER_ERROR = 'NMP.CRD.500'
