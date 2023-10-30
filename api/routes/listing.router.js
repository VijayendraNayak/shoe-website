import express from 'express';
import {createlisting, deletelisting,updatelisting} from '../controller/listing.controller.js'
import  {verifyUser}  from "../utils/verifyUser.js";

const router =express.Router();

router.post('/createlisting',createlisting)
router.delete("/delete/:id",verifyUser,deletelisting)
router.post("/update/:id",verifyUser,updatelisting)
export default router;