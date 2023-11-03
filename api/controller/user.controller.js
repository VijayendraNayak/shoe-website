import bcryptjs from 'bcryptjs';
import Listing from '../models/Listing.models.js';
import User from '../models/User.modles.js';
import { errorhandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateuser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorhandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteuser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorhandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getlisting = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
}
export const getUser=async(req,res,next)=>{
  try {
    const user=await User.findById(req.params.id)
    if(!user) return next(errorhandler(404,"User not found"))
    const {password:pass,...rest}=user._doc;
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

