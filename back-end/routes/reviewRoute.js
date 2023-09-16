
import express from "express"
import {getAllReviews, createReview } from "../controllers/reviewCtrl.js"
import {authenticate, allow} from '../auth/verifyToken.js'
const router = express.Router({mergeParams: true})


router
.route('/')
.get(getAllReviews)
.post(authenticate, allow(['patient']), createReview)


export default router