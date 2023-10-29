import express from "express";
import {test, updateuser,deleteuser,getlisting} from "../controller/user.controller.js" ;
import  {verifyUser}  from "../utils/verifyUser.js";

const router=express.Router();

router.get("/test",test)
router.post("/update/:id",verifyUser,updateuser)
router.delete("/delete/:id",verifyUser,deleteuser)
router.get("/getlisting/:id",verifyUser,getlisting)

export default router;