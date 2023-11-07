import Listing from '../models/Listing.models.js'
import { errorhandler } from '../utils/error.js'

export const createlisting = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body)
    res.status(201).json(listing)
  } catch (error) {
    next(error)
  }
}
export const deletelisting = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) {
    return next(errorhandler(404, "listing not found"))
  }
  if (req.user.id !== listing.userRef) {
    return next(errorhandler(404, "User not found"))
  }
  try {
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json("User deleted successfully")
  } catch (error) {
    next(error)
  }
}
export const updatelisting = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) {
    return next(errorhandler(404, "Listings not found"))
  }
  if (req.user.id !== listing.userRef) {
    return next(errorhandler(404, "User doesnot exist"))
  }
  try {
    await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}

export const getlisting = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorhandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}
export const getlistings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9
    const startIndex = parseInt(req.query.startIndex) || 0
    let offer = req.query.offer
    if (offer === "false" || offer === undefined) {
      offer = { $in: [false, true] }
    }
    let furnished = req.query.furnished
    if (furnished === "false" || furnished === undefined) {
      furnished = { $in: [false, true] }
    }
    let parking = req.query.parking
    if (parking === "false" || parking === undefined) {
      parking = { $in: [false, true] }
    }
    let type = req.query.type
    if (type === undefined | type === "all") {
      type = { $in: ['sale', 'rent'] }
    }
    const searchTerm = req.query.searchTerm || " "
    const sort = req.query.sort || "createdAt"
    const order = req.query.order || "desc"
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
      return res.status(200).json(listings)
  } catch (error) {
    next(error)
  }
}