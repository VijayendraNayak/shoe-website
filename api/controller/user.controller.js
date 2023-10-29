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

export const getlisting=async (req,res,next)=>{
  if(req.user.id!== req.params.id) return next(errorhandler(402,"You can see only your listings"))
  try {
    await Listing.findById(req.params.id)
    res.status(200).json(
      "Data found"
    )
  } catch (error) {
    next(errpr)
  }
  
}