import Listing from '../models/Listing.models.js'
import { errorhandler } from '../utils/error.js'

export const createlisting=async(req,res,next)=>{
    try {
        const listing= await Listing.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}
export const deletelisting=async(req,res,next)=>{
  const listing=await Listing.findById(req.params.id)
  if(!listing){
    return next(errorhandler(404,"listing not found"))
  }
  if(req.user.id !== listing.userRef){
    return next(errorhandler(404,"User not found"))
  }
  try {
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json("User deleted successfully")
  } catch (error) {
    next(error)
  }
}