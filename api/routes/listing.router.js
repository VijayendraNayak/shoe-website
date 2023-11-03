import express from 'express';
import {createlisting, deletelisting,updatelisting,getlisting,getlistings} from '../controller/listing.controller.js'
import  {verifyUser}  from "../utils/verifyUser.js";

const router =express.Router();

router.post('/createlisting',createlisting)
router.delete("/delete/:id",verifyUser,deletelisting)
router.post("/update/:id",verifyUser,updatelisting)
router.get("/get/:id",getlisting)
router.get("/get",getlistings)
export default router;