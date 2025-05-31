import EError from "../../utils/Errors/enums.js"

export const handleErrors =  (err, req, res, next) => {
    // console.log(err)

    switch (err.code) {
        case EError.INVALID_TYPE_ERROR:
            res.send({status: 'error', error: err.message})
            break;
    
        default:
            res.send({status: 'error', error: 'Error server'})
            break;
    }
}