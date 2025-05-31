import { EError } from "./enums.js";

export const handleError = (error, req, res, next) => {
    // console.log(error.cause)
    switch (error.code) {
        case EError.INVALID_TYPES_ERROR:
            return res.send({status: 'error', error: error.name})            
            break;
    
        default:
            return res.send({status: 'error', error: 'Unhandlred error'})
            break;
    }
}