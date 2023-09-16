
import express from "express"

import {
    updateDoctor, 
    deleteDoctor, 
    getAllDoctors, 
    getSingleDoctor
} from "../controllers/doctorCtrl.js"

import reviewRoute from './reviewRoute.js'

import {authenticate, allow} from '../auth/verifyToken.js'

const router = express.Router()

router.use('/:doctorId/review', reviewRoute)

router.get('/:id', authenticate, getSingleDoctor)
router.get('/',authenticate, getAllDoctors)
router.put('/:id', authenticate, allow(["patient"]),updateDoctor)
router.delete('/:id', authenticate, allow(["admin", "patient"]), deleteDoctor)

export default router