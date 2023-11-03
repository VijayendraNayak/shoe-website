import express from "express";
import {test, updateuser,deleteuser,getlisting,getUser} from "../controller/user.controller.js" ;
import  {verifyUser}  from "../utils/verifyUser.js";

const router=express.Router();

router.get("/test",test)
router.post("/update/:id",verifyUser,updateuser)
router.delete("/delete/:id",verifyUser,deleteuser)
router.get("/getlisting/:id",verifyUser,getlisting)
router.get("/:id",verifyUser,getUser)


export default router;