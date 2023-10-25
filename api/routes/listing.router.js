import express from 'express';
import {createlisting} from '../controller/listing.controller.js'

const router =express.Router();

router.post('/createlisting',createlisting)

export default router;