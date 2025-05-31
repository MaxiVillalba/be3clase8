import { adoptionsService, petsService, usersService } from "../services/index.js"

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
    res.send({status:"success",payload:adoption})
}

/**
 * The function `createAdoption` handles the process of adopting a pet by updating user and pet
 * information and creating a new adoption record.
 * @param req - The `req` parameter typically represents the HTTP request that is being made to the
 * server. It contains information about the request such as the URL, headers, parameters, and body
 * data. In this context, `req` is being used to extract the `uid` and `pid` parameters from the
 * @param res - The `res` parameter in the `createAdoption` function is the response object that will
 * be used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with status codes, headers, and data back to the client. In this function, `res
 * @returns The function `createAdoption` is returning a response object with a status of "success" and
 * a message indicating that the pet has been adopted. The response object looks like this:
 */
const createAdoption = async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) return res.status(404).send({status:"error", error:"user Not found"});
    const pet = await petsService.getBy({_id:pid});
    if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
    if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id})
    res.send({status:"success",message:"Pet adopted"})
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}